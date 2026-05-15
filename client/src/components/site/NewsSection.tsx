/**
 * 首页新闻模块；「查看全部动态」跳转关于页 #news。
 * 风格：大封面 featured + 右侧三篇小卡 + 底部装饰带（无占位新闻图）
 */
import { ArrowUpRight, Calendar, Newspaper } from "lucide-react";
import { Link } from "wouter";
import { NEWS_ITEMS } from "@/lib/news-data";

type News = { title: string; tag: string; date: string; cover?: string; link: string };

const FEATURED: News = {
  title: NEWS_ITEMS[0].title,
  tag: "新闻动态",
  date: NEWS_ITEMS[0].date,
  cover: NEWS_ITEMS[0].cover,
  link: NEWS_ITEMS[0].link,
};

const LIST: News[] = NEWS_ITEMS.slice(1, 4).map((n) => ({
  title: n.title,
  tag: "新闻动态",
  date: n.date,
  cover: n.cover,
  link: n.link,
}));

export default function NewsSection() {
  return (
    <section id="news" className="relative py-24 lg:py-32 bg-gradient-to-b from-white to-[#F7F5FF] overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#A58BFF]">
              Newsroom
            </div>
            <h2 className="mt-4 font-zh text-[36px] lg:text-[52px] leading-[1.1] font-black text-foreground tracking-tight">
              深至科技
              <span className="text-aurora">头条新闻</span>
            </h2>
            <p className="mt-4 text-[14.5px] text-foreground/60 max-w-lg">
              最新融资、产品发布、技术洞察与生态合作动态。让全球每一位医生都能用上医学影像。
            </p>
          </div>
          <Link
            href="/about#news"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-foreground/15 px-5 text-[13px] font-medium text-foreground hover:border-foreground/40 transition-colors w-fit"
          >
            查看全部动态
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* featured */}
          <a
            href={FEATURED.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group lg:col-span-7 rounded-[24px] overflow-hidden bg-white border border-border hover:shadow-[0_40px_80px_-40px_rgba(80,70,180,0.35)] transition-all"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#EAE4FF] via-[#F7F3FF] to-[#FFE8F4]">
              {FEATURED.cover ? (
                <img
                  src={FEATURED.cover}
                  alt={FEATURED.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl bg-white/75 p-8 shadow-sm backdrop-blur-sm ring-1 ring-white/80">
                    <Newspaper className="h-14 w-14 text-[#8A6BFF]" strokeWidth={1.25} aria-hidden />
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-medium text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1E6BFF]" />
                {FEATURED.tag}
              </div>
            </div>
            <div className="p-7 lg:p-9">
              <div className="flex items-center gap-2 text-[12px] text-foreground/50">
                <Calendar className="h-3.5 w-3.5" />
                {FEATURED.date}
              </div>
              <h3 className="mt-3 font-zh text-[22px] lg:text-[28px] font-black leading-snug text-foreground">
                {FEATURED.title}
              </h3>
              <div className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground group-hover:gap-2.5 transition-all">
                阅读原文
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </a>

          {/* list */}
          <div className="lg:col-span-5 grid gap-5">
            {LIST.map((n) => (
              <a
                key={n.link}
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 rounded-2xl bg-white border border-border p-4 hover:border-foreground/30 hover:shadow-[0_20px_40px_-25px_rgba(80,70,180,0.3)] transition-all"
              >
                {n.cover ? (
                  <div className="relative h-24 w-32 lg:h-28 lg:w-36 shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={n.cover}
                      alt={n.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                ) : (
                  <div
                    className="inline-flex h-24 w-32 lg:h-28 lg:w-36 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6B8CFF] to-[#B89BFF] text-white shadow-sm"
                    aria-hidden
                  >
                    <Newspaper className="h-8 w-8 lg:h-9 lg:w-9" strokeWidth={1.5} />
                  </div>
                )}
                <div className="flex-1 py-0.5">
                  <div className="flex items-center gap-2 text-[11px] text-foreground/50">
                    <span className="font-medium text-[#A58BFF]">{n.tag}</span>
                    <span>·</span>
                    <span>{n.date}</span>
                  </div>
                  <h4 className="mt-1.5 font-zh text-[15px] lg:text-[16px] font-bold text-foreground leading-snug line-clamp-2">
                    {n.title}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 装饰带：品牌渐变块循环，不冒充文章配图 */}
      <div className="mt-20 relative overflow-hidden" aria-hidden>
        <div className="flex gap-5 animate-marquee w-max opacity-[0.55]">
          {[...Array(10), ...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-40 lg:h-48 w-[380px] lg:w-[460px] shrink-0 rounded-2xl border border-border/60 bg-gradient-to-br from-[#EAE4FF] via-[#F5EEFF] to-[#FFE8F4]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
