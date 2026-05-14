/**
 * 首页 · 最新动态（teaser）
 * 静态展示「新闻动态 + 社会责任」中日期最近的 3 条，点击卡片在新标签页打开原文链接。
 * 缩略图与新闻中心列表（PreviewStoryMedia · row）同尺寸与逻辑：og:image → cover → 图标占位。
 */
import { useMemo } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Link } from "wouter";
import { PreviewStoryMedia } from "@/components/site/PreviewStoryMedia";
import { trpc } from "@/lib/trpc";
import { NEWS_ITEMS, CSR_ITEMS } from "@/lib/news-data";

type Item = {
  title: string;
  tag: string;
  date: string;
  anchor: string;
  ord: number;
  kind: "news" | "csr";
  cover?: string;
};

function parseYearMonth(dateStr: string): number {
  const m = dateStr.match(/^(\d{4})\s*·\s*(\d{2})/);
  return m ? parseInt(m[1], 10) * 100 + parseInt(m[2], 10) : 0;
}

function buildLatestThree(): Item[] {
  const stories: Item[] = NEWS_ITEMS.map((n, i) => ({
    title: n.title,
    tag: "新闻动态",
    date: n.date,
    anchor: n.link,
    ord: i,
    kind: "news" as const,
    cover: n.cover,
  }));
  const media: Item[] = CSR_ITEMS.map((n, i) => ({
    title: n.title,
    tag: "社会责任",
    date: n.date,
    anchor: n.link,
    ord: i,
    kind: "csr" as const,
    cover: n.cover,
  }));
  return [...stories, ...media]
    .sort((a, b) => {
      const ka = parseYearMonth(a.date);
      const kb = parseYearMonth(b.date);
      if (kb !== ka) return kb - ka;
      if (a.kind !== b.kind) return a.kind === "news" ? -1 : 1;
      return a.ord - b.ord;
    })
    .slice(0, 3);
}

const LATEST = buildLatestThree();

function Card({
  item,
  ogImage,
}: {
  item: Item;
  ogImage: string | null;
}) {
  return (
    <a
      href={item.anchor}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 lg:gap-6 overflow-hidden rounded-2xl border border-border bg-white px-5 lg:px-8 py-4 transition-all hover:shadow-[0_30px_60px_-30px_rgba(80,70,180,0.35)] ${
        item.kind === "csr" ? "hover:bg-[#FFF8FB]" : "hover:bg-[#F8F6FF]"
      }`}
    >
      <PreviewStoryMedia
        title={item.title}
        link={item.anchor}
        dataCover={item.cover}
        ogImage={ogImage}
        layout="row"
        tone={item.kind === "csr" ? "csr" : "news"}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F2EEFF] px-2.5 py-1 text-[11px] font-medium text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1E6BFF]" />
            {item.tag}
          </div>
          <div className="flex items-center gap-2 text-[11.5px] text-foreground/50">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {item.date}
          </div>
        </div>
        <h3
          className={`font-zh text-[15.5px] font-bold leading-snug line-clamp-3 transition-colors ${
            item.kind === "csr"
              ? "text-foreground group-hover:text-[#FF77C3]"
              : "text-foreground group-hover:text-[#1E6BFF]"
          }`}
        >
          {item.title}
        </h3>
      </div>
      <ArrowUpRight
        className={`h-4 w-4 shrink-0 transition-colors ${
          item.kind === "csr"
            ? "text-foreground/25 group-hover:text-[#FF77C3]"
            : "text-foreground/30 group-hover:text-[#1E6BFF]"
        }`}
      />
    </a>
  );
}

export default function HomeNewsTeaser() {
  const urls = useMemo(() => LATEST.map((i) => i.anchor), []);
  const previewQuery = trpc.linkPreview.batch.useQuery(
    { urls },
    {
      staleTime: 60 * 60 * 1000,
      gcTime: 2 * 60 * 60 * 1000,
      retry: 1,
    }
  );

  const ogByUrl = useMemo(() => {
    const rows = previewQuery.data;
    if (!rows) return new Map<string, string | null>();
    const m = new Map<string, string | null>();
    rows.forEach((row, i) => {
      const u = urls[i];
      if (!u) return;
      if (row.ok && row.image) m.set(u, row.image);
      else m.set(u, null);
    });
    return m;
  }, [previewQuery.data, urls]);

  return (
    <section
      id="news-teaser"
      className="relative bg-gradient-to-b from-[#F7F5FF] to-white pt-16 pb-10 lg:pt-20 lg:pb-14 overflow-hidden"
    >
      <div className="container">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <div className="text-[12px] font-medium uppercase tracking-[0.28em] text-foreground/55 font-display">
              04 · Newsroom
            </div>
            <h2 className="mt-4 font-zh text-[32px] lg:text-[46px] leading-[1.12] font-black tracking-tight">
              最新动态
            </h2>
          </div>
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white px-5 py-2.5 text-[13px] font-medium text-foreground hover:border-[#1E6BFF] hover:text-[#1E6BFF] transition-colors"
          >
            进入 新闻中心
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div className="mt-10 container">
        <div className="grid gap-5 grid-cols-1">
          {LATEST.map((item) => (
            <Card
              key={`${item.kind}-${item.ord}-${item.anchor}`}
              item={item}
              ogImage={ogByUrl.get(item.anchor) ?? null}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
