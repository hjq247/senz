/**
 * 一次性：从公众号页抓取 og:image，写入 scripts/.cache/news-covers.json
 * 用法：pnpm exec tsx scripts/bake-news-covers.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { NEWS_ITEMS, CSR_ITEMS, MEDIA_ITEMS } from "../client/src/lib/news-data.ts";
import { fetchLinkPreview } from "../server/_core/linkPreview.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, ".cache", "news-covers.json");

const DELAY_MS = 450;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

function collectUrls(): string[] {
  const set = new Set<string>();
  for (const arr of [NEWS_ITEMS, CSR_ITEMS, MEDIA_ITEMS]) {
    for (const n of arr) {
      try {
        const u = new URL(n.link);
        if (u.hostname.includes("weixin.qq.com")) set.add(n.link);
      } catch {
        /* skip bad link */
      }
    }
  }
  return [...set];
}

async function main() {
  const urls = collectUrls();
  const rows: { url: string; ok: boolean; image: string | null; error?: string }[] = [];
  let i = 0;
  for (const url of urls) {
    i += 1;
    process.stderr.write(`[${i}/${urls.length}] ${url.slice(0, 72)}…\n`);
    const r = await fetchLinkPreview(url);
    if (r.ok) rows.push({ url, ok: true, image: r.image });
    else rows.push({ url, ok: false, image: null, error: r.error });
    await sleep(DELAY_MS);
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 2), "utf8");
  const ok = rows.filter(r => r.image).length;
  process.stderr.write(`\nWrote ${OUT} (${ok}/${rows.length} with image)\n`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
