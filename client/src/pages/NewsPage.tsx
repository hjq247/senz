/**
 * 新闻中心
 *  · 深至故事 / 社会责任：同网格分页；媒体报道为列表
 */
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import { PreviewStoryMedia } from "@/components/site/PreviewStoryMedia";
import NewsStoriesGrid from "@/components/site/NewsStoriesGrid";
import { NEWS_SECTIONS } from "@/lib/copy";
import { HERO_VIDEOS, HERO_POSTERS } from "@/lib/videos";
import { NEWS_ITEMS, CSR_ITEMS, MEDIA_ITEMS } from "@/lib/news-data";

const STORIES = NEWS_ITEMS.map((n) => ({
  title: n.title,
  date: n.date,
  link: n.link,
  cover: n.cover,
}));

const CSR_STORIES = CSR_ITEMS.map((n) => ({
  title: n.title,
  date: n.date,
  link: n.link,
  cover: n.cover,
}));

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

export default function NewsPage() {
  return (
    <PageShell>
      <PageHero
        index="04"
        en="Newsroom"
        title="新闻中心"
        subs={NEWS_SECTIONS}
        variant="pink"
        videoSrc={HERO_VIDEOS.news}
        posterSrc={HERO_POSTERS.news}
        tone="dark"
        subAnchorBase="/news"
      />

      {/* 1. 深至故事：4×2 网格 + 分页 */}
      <section id="stories" className="relative scroll-mt-24 bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="04.1" en="Stories" title="深至故事" />
          <NewsStoriesGrid key="stories" stories={STORIES} />
        </div>
      </section>

      {/* 2. 社会责任：与深至故事同版式（网格 + 分页） */}
      <section id="csr" className="relative scroll-mt-24 bg-gradient-to-b from-[#FFF1F6] to-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="04.2" en="Social Responsibility" title="社会责任" />
          <NewsStoriesGrid key="csr" stories={CSR_STORIES} />
        </div>
      </section>

      {/* 3. 媒体报道（与社会责任同版式） */}
      <section id="media" className="relative scroll-mt-24 bg-gradient-to-b from-[#FFF1F6] to-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="04.3" en="Media Coverage" title="媒体报道" />

          <ul className="mt-12 divide-y divide-border rounded-3xl border border-border bg-white overflow-hidden">
            {MEDIA_ITEMS.map((n, i) => (
              <motion.li
                key={n.link}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={fadeUp}
                whileHover={{ x: 6 }}
              >
                <a
                  href={n.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 lg:gap-6 px-5 lg:px-8 py-4 hover:bg-[#FFF8FB] transition-colors group"
                >
                  <PreviewStoryMedia
                    title={n.title}
                    link={n.link}
                    dataCover={n.cover}
                    ogImage={null}
                    layout="row"
                    tone="csr"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-foreground/45">
                      <Calendar className="h-3 w-3 shrink-0" />
                      {n.date}
                    </div>
                    <div className="mt-1 font-zh text-[14.5px] lg:text-[15.5px] font-bold text-foreground leading-snug line-clamp-2">
                      {n.title}
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-foreground/25 group-hover:text-[#FF77C3] shrink-0 transition-colors" />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
