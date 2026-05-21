import path from "node:path";
import express, { type Express } from "express";
import { ENV } from "./env";

/** Matches Vite `publicDir` + URL prefix used in `client/src/lib/videos.ts` etc. */
function localManusStorageDir(): string {
  const coreDir = import.meta.dirname;
  if (process.env.NODE_ENV === "production") {
    // Production bundle is dist/index.js — static assets live in dist/public/ (see serveStatic in vite.ts).
    return path.resolve(coreDir, "public/manus-storage");
  }
  return path.resolve(coreDir, "../../client/public/manus-storage");
}

export function registerStorageProxy(app: Express) {
  // Serve files from disk first; Forge presign below is only a fallback.
  app.use(
    "/manus-storage",
    express.static(localManusStorageDir(), {
      index: false,
      fallthrough: true,
      maxAge: "1y",
      immutable: true,
      setHeaders(res) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      },
    })
  );

  app.get("/manus-storage/*", async (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(404).send("Not found");
      return;
    }

    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", key);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
      });

      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url: string };
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }

      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}
