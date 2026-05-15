/**
 * 新闻中心：大屏 4 列 × 2 行（每页 8 条）+ 分页，按发布时间倒序；
 * 卡片标题前展示分类 tag（深至故事 / 社会责任 / 媒体报道）。
 */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsCategory } from "@/lib/news-data";

export type StoryItem = {
  title: string;
  date: string;
  link: string;
  cover: string;
  tag: NewsCategory;
};

const TAG_CLASS: Record<NewsCategory, string> = {
  深至故事: "bg-[#EEF4FF] text-[#1E6BFF]",
  社会责任: "bg-[#FFF0F6] text-[#DB2777]",
  媒体报道: "bg-[#F3EEFF] text-[#7C3AED]",
};

const PAGE_SIZE = 8;

export default function NewsStoriesGrid({ stories }: { stories: StoryItem[] }) {
  const totalPages = Math.max(1, Math.ceil(stories.length / PAGE_SIZE));
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [stories]);

  const pageStories = useMemo(() => {
    const start = page * PAGE_SIZE;
    return stories.slice(start, start + PAGE_SIZE);
  }, [stories, page]);

  return (
    <div className="mt-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 justify-items-center">
        {pageStories.map((n, i) => (
          <motion.div
            key={`${n.link}-${page}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (i % PAGE_SIZE) * 0.04 }}
            className="w-full max-w-[12.25rem] sm:max-w-[12.75rem] lg:max-w-[13.125rem]"
          >
            <a
              href={n.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative isolate flex w-full flex-col overflow-hidden border border-[#EDE4F0] p-1 shadow-[0_6px_22px_-18px_rgba(140,100,180,0.1)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#FDF2F8] to-[#F5F3FF]"
              />
              <span aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                <span className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-[#FBCFE8] via-[#EDE9FE] to-[#DDD6FE] transition-transform duration-500 ease-out will-change-transform group-hover:scale-y-100" />
              </span>
              <div className="relative z-10 flex flex-col">
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden p-3 sm:p-3.5">
                  <img
                    src={n.cover}
                    alt=""
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="relative z-10 max-h-full max-w-full object-contain object-center"
                  />
                </div>

                <div className="relative z-10 w-full pt-1.5 pb-1 sm:pt-2 sm:pb-1.5">
                  <p className="font-zh text-[11px] leading-relaxed text-foreground/45 sm:text-[12px] transition-colors duration-300 group-hover:text-[#9333EA]/75">
                    {n.date}
                  </p>
                  <div className="mt-1 flex items-start gap-1">
                    <div className="min-w-0 flex-1">
                      <span
                        className={`mb-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-medium font-zh sm:text-[10px] ${TAG_CLASS[n.tag]}`}
                      >
                        {n.tag}
                      </span>
                      <p className="font-zh text-[13px] font-bold leading-snug text-foreground sm:text-[14px] line-clamp-2 transition-colors duration-300 group-hover:text-[#7E22CE]">
                        {n.title}
                      </p>
                    </div>
                    <ChevronRight
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/30 transition-colors duration-300 group-hover:text-[#8B5CF6] sm:h-4 sm:w-4"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-foreground/80 shadow-sm transition-colors hover:border-[#1E6BFF]/40 hover:text-[#1E6BFF] disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" />
            上一页
          </button>
          <span className="text-[13px] text-foreground/55 font-zh tabular-nums px-2">
            {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-foreground/80 shadow-sm transition-colors hover:border-[#1E6BFF]/40 hover:text-[#1E6BFF] disabled:opacity-40 disabled:pointer-events-none"
          >
            下一页
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
