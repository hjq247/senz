import type { Express, Request, Response } from "express";
import { articleCategories, type ArticleCategory } from "../../drizzle/schema";
import { getArticleById, listArticles } from "../db/articles";
import { syncWechatArticles } from "../wechat/sync";

function parsePositiveInt(value: unknown, fallback: number): number {
  const n = typeof value === "string" ? parseInt(value, 10) : Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function isArticleCategory(value: string): value is ArticleCategory {
  return (articleCategories as readonly string[]).includes(value);
}

function corsOrigin(): string | string[] | true {
  const raw = process.env.CORS_ORIGIN?.trim();
  if (!raw) return true;
  if (raw === "*") return true;
  return raw.split(",").map(s => s.trim()).filter(Boolean);
}

function applyCors(req: Request, res: Response): void {
  const origin = req.headers.origin;
  const allowed = corsOrigin();
  if (allowed === true) {
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    }
  } else if (origin && allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function requireSyncSecret(req: Request, res: Response): boolean {
  const expected = process.env.WECHAT_SYNC_SECRET?.trim();
  if (!expected) {
    res.status(503).json({
      error: "WECHAT_SYNC_SECRET is not configured on the server",
    });
    return false;
  }

  const header = req.headers.authorization;
  const token =
    typeof header === "string" && header.startsWith("Bearer ")
      ? header.slice(7).trim()
      : "";

  if (!token || token !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

function sendDbError(res: Response, err: unknown): void {
  const message = err instanceof Error ? err.message : "Database error";
  if (message.includes("DATABASE_URL")) {
    res.status(503).json({ error: message });
    return;
  }
  res.status(500).json({ error: message });
}

export function registerArticlesApi(app: Express): void {
  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      service: "senz-api",
      time: new Date().toISOString(),
    });
  });

  app.use("/api", (req, res, next) => {
    applyCors(req, res);
    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }
    next();
  });

  app.get("/api/articles", async (req, res) => {
    try {
      const categoryParam = typeof req.query.category === "string" ? req.query.category : undefined;
      const category =
        categoryParam && isArticleCategory(categoryParam) ? categoryParam : undefined;
      if (categoryParam && !category) {
        res.status(400).json({
          error: `Invalid category. Use one of: ${articleCategories.join(", ")}`,
        });
        return;
      }

      const result = await listArticles({
        page: parsePositiveInt(req.query.page, 1),
        pageSize: parsePositiveInt(req.query.pageSize, 20),
        category,
      });
      res.json(result);
    } catch (err) {
      sendDbError(res, err);
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id) || id < 1) {
      res.status(400).json({ error: "Invalid article id" });
      return;
    }

    try {
      const article = await getArticleById(id);
      if (!article) {
        res.status(404).json({ error: "Article not found" });
        return;
      }
      res.json(article);
    } catch (err) {
      sendDbError(res, err);
    }
  });

  app.post("/api/wechat/sync", async (req, res) => {
    if (!requireSyncSecret(req, res)) return;

    const categoryParam =
      typeof req.body?.category === "string" ? req.body.category : undefined;
    const category =
      categoryParam && isArticleCategory(categoryParam) ? categoryParam : "stories";
    if (categoryParam && !isArticleCategory(categoryParam)) {
      res.status(400).json({
        error: `Invalid category. Use one of: ${articleCategories.join(", ")}`,
      });
      return;
    }

    try {
      const result = await syncWechatArticles({ category });
      res.json(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sync failed";
      if (message.includes("WECHAT_APP")) {
        res.status(503).json({ error: message });
        return;
      }
      if (message.includes("errcode") || message.includes("WeChat")) {
        res.status(502).json({ error: message });
        return;
      }
      sendDbError(res, err);
    }
  });
}
