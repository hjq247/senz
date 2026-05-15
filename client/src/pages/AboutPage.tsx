/**
 * 关于深至
 *  · 公司介绍 / 公司文化 / 发展历程 / 资质荣誉 / 新闻中心 / 公司地址
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Building2, Navigation } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import NewsStoriesGrid from "@/components/site/NewsStoriesGrid";
import {
  ABOUT_SECTIONS,
  ABOUT_INTRO,
  MISSION,
  VALUES,
  TIMELINE_STAGES,
  CONTACT_INFO,
  HQ_MAP,
} from "@/lib/copy";
import { AI_FLOWLIGHT_SQUARE } from "@/lib/assets";
import { HERO_VIDEOS, HERO_POSTERS } from "@/lib/videos";
import { buildNewsFeed } from "@/lib/news-data";
import HonorsSection from "@/components/site/HonorsSection";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: "easeOut" as const },
  }),
};

const VALUE_COLORS = ["#1E6BFF", "#8A6BFF", "#FF77C3", "#2AC58E", "#1E6BFF"];

export default function AboutPage() {
  const newsFeed = useMemo(() => buildNewsFeed(), []);

  return (
    <PageShell>
      <PageHero
        index="03"
        en="About Senz"
        title="一家基于 AI Native 与 RWD 的医疗科技公司"
        desc="深至致力于构建下一代“健康结果管理”的智能基础设施 — 为患者交付确定性的健康结果，为医生实现诊疗能力的智能跃迁，为医疗产业提供稀缺高价值的商业证据。"
        subs={ABOUT_SECTIONS}
        variant="blue"
        videoSrc={HERO_VIDEOS.about}
        posterSrc={HERO_POSTERS.about}
        tone="light"
        subAnchorBase="/about"
      />

      {/* 1. 公司介绍 */}
      <section id="intro" className="relative scroll-mt-24 bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <SectionHeader index="03.1" en="Company" title="公司介绍" />
            <div className="mt-8 space-y-5 text-[14.5px] lg:text-[15.5px] leading-[1.95] text-foreground/75 font-zh">
              {ABOUT_INTRO.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="relative aspect-square rounded-[28px] overflow-hidden border border-border"
            >
              <img src={AI_FLOWLIGHT_SQUARE} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1E6BFF] via-[#8A6BFF] via-[#FF77C3] to-[#2AC58E]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-4">
                <div className="font-display text-[10.5px] tracking-[0.2em] uppercase text-foreground/50">
                  Senz · 深至科技
                </div>
                <div className="mt-1 font-zh text-[15px] font-bold text-foreground leading-snug">
                  从医学影像出发，交付确定性的健康结果。
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. 公司文化 */}
      <section id="culture" className="relative scroll-mt-24 bg-gradient-to-b from-[#F7F5FF] to-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="03.2" en="Culture" title="使命 · 愿景 · 价值主张" />
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {MISSION.map((m, i) => (
              <motion.div
                key={m.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-border bg-white p-7"
              >
                <div className="font-display text-[11px] tracking-[0.22em] uppercase text-foreground/45">
                  {m.label}
                </div>
                <div className="mt-3 font-zh text-[20px] font-black text-foreground leading-snug">
                  {m.text}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/45 font-display">
              价值观 · Values
            </div>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.k}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="relative rounded-2xl border border-border bg-white p-5 overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${VALUE_COLORS[i]}, transparent)` }} />
                  <div className="font-zh text-[16px] font-black text-foreground">{v.k}</div>
                  <div className="mt-2 text-[12.5px] leading-[1.8] text-foreground/65 font-zh">{v.v}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. 发展历程 — 纵向时间线 */}
      <section id="history" className="relative scroll-mt-24 bg-[#0B0F1E] text-white py-24 lg:py-32 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-[680px] w-[680px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(122,109,255,0.45), transparent)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-40 h-[640px] w-[640px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(255,119,195,0.30), transparent)" }}
        />
        <div className="relative container">
          <SectionHeader index="03.3" en="Milestones" title="发展历程 · 四大阶段" light />

          {/* 纵向时间线：中轴阁底 + 左右交错卸货（lg+） / 移动端其轴在左 */}
          <div className="mt-14 relative">
            {/* 中轴线 */}
            <div
              aria-hidden
              className="absolute top-0 bottom-0 left-5 lg:left-1/2 lg:-translate-x-1/2 w-px bg-gradient-to-b from-white/10 via-white/35 to-white/10"
            />
            <ol className="space-y-12 lg:space-y-16">
              {TIMELINE_STAGES.map((s, i) => {
                const isRight = i % 2 === 0; // lg+ 左右交错
                return (
                  <li key={s.stage} className="relative">
                    {/* 节点圆点 */}
                    <span
                      aria-hidden
                      className="absolute top-3 left-5 lg:left-1/2 lg:-translate-x-1/2 -translate-x-1/2 z-10 inline-flex h-3.5 w-3.5 items-center justify-center"
                    >
                      <span className="absolute h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#FF77C3] via-[#8A6BFF] to-[#1E6BFF] opacity-50 blur-[6px]" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
                    </span>

                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.55, ease: "easeOut" as const, delay: 0.05 }}
                      className={
                        "relative ml-12 lg:ml-0 lg:w-[calc(50%-2.25rem)] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 lg:p-7 " +
                        (isRight ? "lg:ml-[calc(50%+2.25rem)]" : "lg:mr-[calc(50%+2.25rem)]")
                      }
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-[11px] tracking-[0.22em] text-white/55 uppercase">
                          {s.stage}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
                      </div>
                      <h4 className="mt-3 font-display text-[22px] font-bold text-white">{s.title}</h4>
                      <p className="mt-2 text-[13px] leading-[1.85] text-white/70 font-zh">{s.desc}</p>
                      <ul className="mt-5 space-y-3">
                        {s.events.map((ev: { year: string; text: string }) => (
                          <li key={ev.year} className="flex gap-4 items-start">
                            <span className="min-w-[64px] font-display text-[14px] font-bold text-[#6B8BFF]">{ev.year}</span>
                            <span className="text-[12.5px] leading-[1.85] text-white/75 font-zh">{ev.text}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* 4. 资质荣誉 */}
      <HonorsSection />

      {/* 5. 新闻中心 */}
      <section id="news" className="relative scroll-mt-24 bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="03.5" en="News Center" title="新闻中心" />
          <NewsStoriesGrid stories={newsFeed} />
        </div>
      </section>

      {/* 6. 公司地址（地图内嵌） */}
      <section id="address" className="relative scroll-mt-24 bg-gradient-to-b from-[#F7F5FF] to-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="03.8" en="Company Address" title="公司地址" />

          <div className="mt-12 grid lg:grid-cols-12 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-border bg-white shadow-[0_24px_60px_-40px_rgba(30,107,255,0.2)]"
            >
              <iframe
                title="深至科技 · 总部位置地图"
                src={HQ_MAP.embedSrc}
                className="block h-[min(52vh,520px)] w-full min-h-[360px] border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <div className="flex items-center justify-between gap-3 border-t border-border bg-[#FAFAFA] px-4 py-2.5 text-[11px] text-foreground/55">
                <span className="font-zh">地图数据 © OpenStreetMap 贡献者</span>
                <a
                  href={HQ_MAP.fullMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 font-medium text-[#1E6BFF] hover:underline"
                >
                  放大查看
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" as const }}
              className="lg:col-span-4 lg:self-start rounded-2xl border border-border bg-white p-5 shadow-[0_16px_40px_-32px_rgba(30,107,255,0.15)]"
            >
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E6BFF] to-[#8A6BFF] text-white">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.22em] text-foreground/45 font-display">
                Senz · Shanghai HQ
              </div>
              <div className="mt-1 font-zh text-[17px] font-black text-foreground leading-snug">
                上海 · 浦东新区 · 前滩
              </div>
              <p className="mt-3 flex items-start gap-2 text-[12.5px] font-zh text-foreground/75 leading-relaxed">
                <MapPin className="h-3.5 w-3.5 text-[#1E6BFF] mt-0.5 shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </p>
              <a
                href={HQ_MAP.fullMap}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#1E6BFF] px-3.5 py-2 text-[12px] font-medium text-white hover:bg-[#1858D9] transition-colors"
              >
                <Navigation className="h-3.5 w-3.5" />
                导航前往
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
