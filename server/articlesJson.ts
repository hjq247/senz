import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ArticleCategory, InsertArticle } from "../drizzle/schema";

export type JsonArticle = {
  id: number;
  wechatArticleId: string;
  title: string;
  summary: string | null;
  coverUrl: string | null;
  cover: string;
  link: string;
  category: ArticleCategory;
  publishedAt: string;
  date: string;
};

export type ArticlesJson = {
  updatedAt: string | null;
  total: number;
  items: JsonArticle[];
};

export type ArticleListQuery = {
  page?: number;
  pageSize?: number;
  category?: ArticleCategory;
};

const EMPTY_ARTICLES: ArticlesJson = {
  updatedAt: null,
  total: 0,
  items: [],
};

function articlesJsonPath(): string {
  return process.env.ARTICLES_JSON_PATH
    ? path.resolve(process.env.ARTICLES_JSON_PATH)
    : path.resolve(process.cwd(), "data", "articles.json");
}

function formatDisplayDate(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(d);
  const y = parts.find(p => p.type === "year")?.value ?? "0000";
  const m = parts.find(p => p.type === "month")?.value ?? "01";
  return `${y} · ${m}`;
}

function normalizeArticle(row: InsertArticle, id: number): JsonArticle {
  const publishedAt =
    row.publishedAt instanceof Date ? row.publishedAt : new Date(row.publishedAt);
  const coverUrl = row.coverUrl ?? null;
  return {
    id,
    wechatArticleId: row.wechatArticleId,
    title: row.title,
    summary: row.summary ?? null,
    coverUrl,
    cover: coverUrl || "/manus-storage/news-cover-01_45c30059.png",
    link: row.link,
    category: row.category ?? "stories",
    publishedAt: publishedAt.toISOString(),
    date: formatDisplayDate(publishedAt),
  };
}

async function writeArticlesFile(data: ArticlesJson): Promise<void> {
  const filePath = articlesJsonPath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function readArticlesJson(): Promise<ArticlesJson> {
  try {
    const raw = await readFile(articlesJsonPath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<ArticlesJson>;
    const items = Array.isArray(parsed.items) ? parsed.items : [];
    return {
      updatedAt: parsed.updatedAt ?? null,
      total: items.length,
      items,
    };
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return EMPTY_ARTICLES;
    throw error;
  }
}

export async function listArticlesFromJson(
  query: ArticleListQuery = {},
): Promise<{ items: JsonArticle[]; total: number; page: number; pageSize: number }> {
  const data = await readArticlesJson();
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, query.pageSize ?? 20));
  const filtered = query.category
    ? data.items.filter(item => item.category === query.category)
    : data.items;
  const offset = (page - 1) * pageSize;

  return {
    items: filtered.slice(offset, offset + pageSize),
    total: filtered.length,
    page,
    pageSize,
  };
}

export async function getArticleFromJson(id: number): Promise<JsonArticle | null> {
  const data = await readArticlesJson();
  return data.items.find(item => item.id === id) ?? null;
}

export async function upsertArticlesJson(
  batch: InsertArticle[],
): Promise<{ created: number; updated: number }> {
  const current = await readArticlesJson();
  const byWechatId = new Map(current.items.map(item => [item.wechatArticleId, item]));
  let nextId = current.items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  let created = 0;
  let updated = 0;

  for (const row of batch) {
    const existing = byWechatId.get(row.wechatArticleId);
    if (existing) {
      byWechatId.set(row.wechatArticleId, normalizeArticle(row, existing.id));
      updated += 1;
    } else {
      byWechatId.set(row.wechatArticleId, normalizeArticle(row, nextId));
      nextId += 1;
      created += 1;
    }
  }

  const items = Array.from(byWechatId.values()).sort((a, b) => {
    const byDate = Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
    return byDate || b.id - a.id;
  });
  const data: ArticlesJson = {
    updatedAt: new Date().toISOString(),
    total: items.length,
    items,
  };

  await writeArticlesFile(data);
  return { created, updated };
}
