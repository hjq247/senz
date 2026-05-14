/**
 * 服务端链接预览：抓取目标页 HTML，解析 Open Graph / Twitter Card 等 meta。
 * 用于首页新闻卡片等场景；须配合主机白名单以防 SSRF。
 *
 * 内存缓存（进程内）：成功结果默认保留 7 天，失败结果短缓存 10 分钟，避免每次打开页面都请求微信。
 * 可调环境变量：LINK_PREVIEW_CACHE_TTL_MS（成功，毫秒）、LINK_PREVIEW_ERROR_CACHE_TTL_MS（失败）。
 */

import net from "node:net";

/** 单页 HTML 硬上限（防内存）；公众号文章正文极长，元数据在 <head> 内即可解析 */
const MAX_HTML_BYTES = 1_500_000;
/** 若始终找不到 </head>，最多读到此字节再解析（仍可能含 og:image） */
const MAX_HTML_BYTES_FALLBACK = 2_000_000;
const FETCH_TIMEOUT_MS = 12_000;
const MAX_REDIRECTS = 5;

const DEFAULT_ALLOWED_HOSTS = new Set(["mp.weixin.qq.com", "weixin.qq.com"]);

function allowedHosts(): Set<string> {
  const extra = process.env.LINK_PREVIEW_ALLOWED_HOSTS;
  if (!extra?.trim()) return DEFAULT_ALLOWED_HOSTS;
  const merged = new Set(DEFAULT_ALLOWED_HOSTS);
  for (const h of extra.split(",")) {
    const t = h.trim().toLowerCase();
    if (t) merged.add(t);
  }
  return merged;
}

function decodeBasicEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'");
}

function isBlockedHostname(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (net.isIP(h)) {
    if (h === "0.0.0.0") return true;
    if (h.startsWith("127.")) return true;
    if (h.startsWith("10.")) return true;
    if (h.startsWith("192.168.")) return true;
    if (h.startsWith("169.254.")) return true;
    const m = /^172\.(\d+)\./.exec(h);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n >= 16 && n <= 31) return true;
    }
  }
  return false;
}

export function assertPreviewableUrl(urlStr: string): URL {
  let u: URL;
  try {
    u = new URL(urlStr);
  } catch {
    throw new Error("INVALID_URL");
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error("INVALID_PROTOCOL");
  if (u.username || u.password) throw new Error("URL_CREDENTIALS_NOT_ALLOWED");
  const host = u.hostname.toLowerCase();
  if (isBlockedHostname(host)) throw new Error("HOST_NOT_ALLOWED");
  if (!allowedHosts().has(host)) throw new Error("HOST_NOT_ALLOWLISTED");
  return u;
}

function extractMeta(html: string, key: string, attr: "property" | "name"): string | null {
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta\\s+[^>]*${attr}=["']${esc}["'][^>]*content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta\\s+[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${esc}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) {
      const v = decodeBasicEntities(m[1].trim());
      if (v) return v;
    }
  }
  return null;
}

function pickImage(html: string): string | null {
  const og =
    extractMeta(html, "og:image", "property") ||
    extractMeta(html, "og:image:url", "property") ||
    extractMeta(html, "og:image:secure_url", "property");
  if (og) return og;
  const tw = extractMeta(html, "twitter:image", "name") || extractMeta(html, "twitter:image:src", "name");
  if (tw) return tw;
  return extractMeta(html, "twitter:image", "property");
}

export type LinkPreviewOk = {
  ok: true;
  url: string;
  finalUrl: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
};

export type LinkPreviewErr = { ok: false; url: string; error: string };

export type LinkPreviewResult = LinkPreviewOk | LinkPreviewErr;

type CachedPreview = { storedAt: number; ttlMs: number; result: LinkPreviewResult };

const previewCache = new Map<string, CachedPreview>();

const DEFAULT_OK_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const DEFAULT_ERR_TTL_MS = 10 * 60 * 1000;
const MAX_CACHE_ENTRIES = 600;

function cacheTtlOkMs(): number {
  const raw = process.env.LINK_PREVIEW_CACHE_TTL_MS;
  if (!raw?.trim()) return DEFAULT_OK_TTL_MS;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 60_000 ? n : DEFAULT_OK_TTL_MS;
}

function cacheTtlErrMs(): number {
  const raw = process.env.LINK_PREVIEW_ERROR_CACHE_TTL_MS;
  if (!raw?.trim()) return DEFAULT_ERR_TTL_MS;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 10_000 ? n : DEFAULT_ERR_TTL_MS;
}

function getCachedPreview(urlStr: string): LinkPreviewResult | null {
  const row = previewCache.get(urlStr);
  if (!row) return null;
  if (Date.now() - row.storedAt > row.ttlMs) {
    previewCache.delete(urlStr);
    return null;
  }
  return row.result;
}

function setCachedPreview(urlStr: string, result: LinkPreviewResult): void {
  const ttlMs = result.ok ? cacheTtlOkMs() : cacheTtlErrMs();
  previewCache.set(urlStr, { storedAt: Date.now(), ttlMs, result });
  while (previewCache.size > MAX_CACHE_ENTRIES) {
    const first = previewCache.keys().next().value;
    if (first === undefined) break;
    previewCache.delete(first);
  }
}

function parseHead(html: string, baseUrl: string): Omit<LinkPreviewOk, "ok" | "url"> {
  const title =
    extractMeta(html, "og:title", "property") ||
    extractMeta(html, "twitter:title", "name") ||
    (() => {
      const m = html.match(/<title[^>]*>([^<]{1,500})<\/title>/i);
      return m?.[1] ? decodeBasicEntities(m[1].trim()) : null;
    })();

  const description =
    extractMeta(html, "og:description", "property") || extractMeta(html, "twitter:description", "name");

  const siteName = extractMeta(html, "og:site_name", "property");

  let image = pickImage(html);
  if (image) {
    try {
      image = new URL(image, baseUrl).href;
    } catch {
      image = null;
    }
  }

  return { finalUrl: baseUrl, title, description, image, siteName };
}

async function fetchTextFollowingRedirects(startUrl: string): Promise<{ finalUrl: string; html: string }> {
  let current = assertPreviewableUrl(startUrl).href;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    for (let hop = 0; hop < MAX_REDIRECTS; hop++) {
      assertPreviewableUrl(current);

      const res = await fetch(current, {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        },
      });

      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location");
        if (!loc) throw new Error("REDIRECT_NO_LOCATION");
        current = new URL(loc, current).href;
        continue;
      }

      if (!res.ok) throw new Error(`HTTP_${res.status}`);

      const reader = res.body?.getReader();
      if (!reader) throw new Error("NO_BODY");

      const chunks: Uint8Array[] = [];
      let total = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done && !value) break;
        if (value) {
          total += value.length;
          chunks.push(value);
        }

        const buf = Buffer.concat(chunks.map(c => Buffer.from(c)));
        const htmlSoFar = buf.toString("utf8");

        const headClose = htmlSoFar.search(/<\/head>/i);
        if (headClose !== -1) {
          reader.cancel().catch(() => {});
          const html = htmlSoFar.slice(0, headClose + "</head>".length);
          return { finalUrl: current, html };
        }

        if (total > MAX_HTML_BYTES_FALLBACK) {
          reader.cancel().catch(() => {});
          let html = htmlSoFar;
          if (html.length > MAX_HTML_BYTES_FALLBACK) html = html.slice(0, MAX_HTML_BYTES_FALLBACK);
          return { finalUrl: current, html };
        }

        if (done) break;
      }

      const buf = Buffer.concat(chunks.map(c => Buffer.from(c)));
      let html = buf.toString("utf8");
      if (html.length > MAX_HTML_BYTES) html = html.slice(0, MAX_HTML_BYTES);

      return { finalUrl: current, html };
    }
    throw new Error("TOO_MANY_REDIRECTS");
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchLinkPreview(urlStr: string): Promise<LinkPreviewResult> {
  const hit = getCachedPreview(urlStr);
  if (hit) return hit;

  try {
    const { finalUrl, html } = await fetchTextFollowingRedirects(urlStr);
    const parsed = parseHead(html, finalUrl);
    const ok: LinkPreviewResult = { ok: true, url: urlStr, ...parsed };
    setCachedPreview(urlStr, ok);
    return ok;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "UNKNOWN";
    const err: LinkPreviewResult = { ok: false, url: urlStr, error: msg };
    setCachedPreview(urlStr, err);
    return err;
  }
}

export async function fetchLinkPreviews(urls: string[]): Promise<LinkPreviewResult[]> {
  return Promise.all(urls.map(u => fetchLinkPreview(u)));
}
