/**
 * 深至故事：大屏 5 列 × 2 行（每页 10 条）+ 分页；上图下文，无帘幕。
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export type StoryItem = {
  title: string;
  date: string;
  link: string;
  cover: string;
};

const PAGE_SIZE = 10;

export default function NewsStoriesGrid({ stories }: { stories: StoryItem[] }) {
  const totalPages = Math.max(1, Math.ceil(stories.length / PAGE_SIZE));
  const [page, setPage] = useState(0);

  const pageStories = useMemo(() => {
    const start = page * PAGE_SIZE;
    return stories.slice(start, start + PAGE_SIZE);
  }, [stories, page]);

  return (
    <div className="mt-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
        {pageStories.map((n, i) => (
          <motion.a
            key={`${n.link}-${page}`}
            href={n.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (i % PAGE_SIZE) * 0.04 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_10px_32px_-24px_rgba(30,107,255,0.22)] transition-all hover:border-[#1E6BFF]/25 hover:shadow-[0_16px_40px_-20px_rgba(80,70,180,0.28)]"
          >
            <div className="relative h-[76px] w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#F0E8FF]/50 via-[#EEF6FF]/45 to-[#FFE8F4]/50 sm:h-[84px]">
              <img
                src={n.cover}
                alt=""
                referrerPolicy="no-referrer"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-1 flex-col justify-start border-t border-border/50 bg-gradient-to-b from-white to-[#FAFAFC] px-2.5 py-2 sm:px-3 sm:py-2.5">
              <p className="font-zh text-[11.5px] sm:text-[12.5px] font-bold leading-snug text-foreground line-clamp-2 min-h-[2.5rem]">
                {n.title}
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] text-foreground/45">
                <Calendar className="h-3 w-3 shrink-0" />
                {n.date}
              </div>
            </div>
          </motion.a>
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
