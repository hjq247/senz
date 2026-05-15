#!/usr/bin/env node
/**
 * 使用本机 Chrome（无头）抓取飞书招聘门户首屏职位，打印为 CAREERS_OPENINGS 草稿。
 * 需 macOS 且已安装 Google Chrome：/Applications/Google Chrome.app/...
 *
 *   node scripts/sync-feishu-openings.mjs
 */
import { execFileSync } from "node:child_process";

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = "https://p130box8iy5.jobs.feishu.cn/838328";
const ORIGIN = "https://p130box8iy5.jobs.feishu.cn";

let s;
try {
  s = execFileSync(
    CHROME,
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--virtual-time-budget=60000",
      "--dump-dom",
      URL,
    ],
    { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 },
  );
} catch {
  console.error("Chrome 执行失败。请设置 CHROME_PATH 或安装 Google Chrome。");
  process.exit(1);
}

const re =
  /<a data-id="(\d+)"[^>]*href="(\/838328\/position\/\d+\/detail)"[^>]*>[\s\S]*?<span class="positionItem-title-text">([^<]+)<\/span>[\s\S]*?<div class="subTitle__fca8c0 positionItem-subTitle">([\s\S]*?)<\/div><div class="jobDesc__fca8c0 positionItem-jobDesc">([\s\S]*?)<\/div><\/div><\/a>/g;

const items = [];
let m;
while ((m = re.exec(s))) {
  const id = m[1];
  const path = m[2];
  const title = m[3].trim();
  const subHtml = m[4];
  const desc = m[5]
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const locSpans = [...subHtml.matchAll(/<span>([^<]*)<\/span>/g)]
    .map((x) => x[1])
    .filter(
      (t) =>
        t &&
        !t.includes("本科") &&
        !t.includes("硕士") &&
        !t.includes("博士") &&
        !t.includes("学历"),
    );
  const edu = [...subHtml.matchAll(/infoText__fca8c0">([^<]+)/g)].map((x) => x[1]);
  const loc = [locSpans.join(" · "), edu.join(" · ")].filter(Boolean).join(" · ") || "—";
  items.push({
    title,
    loc,
    desc: desc.slice(0, 220) + (desc.length > 220 ? "…" : ""),
    href: ORIGIN + path,
    id,
  });
}

console.log(JSON.stringify({ count: items.length, items }, null, 2));
