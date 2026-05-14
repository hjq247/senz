/**
 * 根据 scripts/.cache/news-covers.json 给 client/src/lib/news-data.ts 每条写入 cover。
 * 用法：node scripts/apply-news-covers-from-cache.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CACHE = join(ROOT, "scripts", ".cache", "news-covers.json");
const TARGET = join(ROOT, "client", "src", "lib", "news-data.ts");

const FALLBACK_COVER = "/manus-storage/news-cover-02_119f0eb9.png";

const cache = JSON.parse(readFileSync(CACHE, "utf8"));
const imageByUrl = new Map(
  cache.rows.filter((r) => r.image).map((r) => [r.url, r.image])
);

function coverForLink(link) {
  return imageByUrl.get(link) ?? FALLBACK_COVER;
}

function extractLinkFromLine(line) {
  const m = line.match(/link:\s*("(https?:[^"]+)")/);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

let text = readFileSync(TARGET, "utf8");

/* 单行：{ title, date, link } 或已有 cover */
text = text
  .split("\n")
  .map((line) => {
    const link = extractLinkFromLine(line);
    if (!link || !link.includes("mp.weixin.qq.com")) return line;
    const cover = coverForLink(link);
    const lit = JSON.stringify(cover);

    if (/\bcover:\s*"/.test(line)) {
      return line.replace(/\bcover:\s*"[^"]*"/, `cover: ${lit}`);
    }
    if (/link:\s*"https?:\/\/[^"]+"/.test(line)) {
      return line.replace(/(link:\s*"https?:\/\/[^"]+")(\s*)(,?\s*\}\,?)/, `$1, cover: ${lit}$2$3`);
    }
    return line;
  })
  .join("\n");

/* 媒体报道：多行 cover */
const mediaCover = coverForLink("https://mp.weixin.qq.com/s/4Zzzk-h4HMXwkRfHPEFyhg");
text = text.replace(
  /(link:\s*"https:\/\/mp\.weixin\.qq\.com\/s\/4Zzzk-h4HMXwkRfHPEFyhg",\s*\n\s*)cover:\s*\n\s*("[^"]*")/,
  `$1cover:\n      ${JSON.stringify(mediaCover)}`
);

writeFileSync(TARGET, text, "utf8");
console.log("Updated", TARGET);
