/**
 * 产品与解决方案
 * 3 个 sub-section：慢病（Cx）/ 医生（Dx）/ 药企（Px）
 * 每个 sub 沿用文档原文：headline / desc / pillars / challenges
 * 末尾 CTA 进入对应 SolutionDetail 子页（/solutions/...）
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Briefcase, Stethoscope, User } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import { PRODUCTS_SECTIONS, SYNERGY, LIFECYCLE } from "@/lib/copy";
import { SOLUTION_DETAILS, type Audience } from "@/lib/solutions";
import { HERO_VIDEOS, HERO_POSTERS } from "@/lib/videos";

const ORDER: { audience: Audience; id: string; en: string; index: string; color: string; icon: React.ReactNode; href: string }[] = [
  { audience: "patient",  id: "patient",  en: "Chronic Care · Cx", index: "02.1", color: "#FF77C3", icon: <User className="h-5 w-5" />,        href: "/solutions/patient"  },
  { audience: "doctor",   id: "doctor",   en: "Clinical · Dx",     index: "02.2", color: "#1E6BFF", icon: <Stethoscope className="h-5 w-5" />, href: "/solutions/doctor"   },
  { audience: "industry", id: "industry", en: "Pharma · Px",       index: "02.3", color: "#2AC58E", icon: <Briefcase className="h-5 w-5" />,   href: "/solutions/industry" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

export default function ProductsPage() {
  return (
    <PageShell>
      <PageHero
        index="02"
        en="Products & Solutions"
        title="面向医疗产业的智能解决方案"
        desc="面向患者、医生与药企三端，深至以 Neuro AI 大脑驱动 Cx / Dx / Px 智能体协同，构成可持续进化的健康结果管理生态。"
        subs={PRODUCTS_SECTIONS}
        variant="green"
        videoSrc={HERO_VIDEOS.products}
        posterSrc={HERO_POSTERS.products}
        tone="dark"
      />

      {/* 三端协同 */}
      <section id="synergy" className="relative scroll-mt-24 bg-white py-24 lg:py-32 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(138,107,255,0.20), transparent)" }}
        />
        <div className="relative container">
          <SectionHeader index="02.0" en="Three-End Synergy" title={SYNERGY.title} desc={SYNERGY.desc} />
          <div className="mt-12 grid lg:grid-cols-3 gap-5">
            {SYNERGY.items.map((it: { k: string; v: string }, i: number) => (
              <motion.div
                key={it.k}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl border border-border bg-gradient-to-br from-white to-[#FBF8FF] p-7 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1" style={{ background: "linear-gradient(90deg,#FF77C3,#8A6BFF,#1E6BFF)" }} />
                <div className="font-display text-[12px] tracking-[0.22em] text-foreground/45 uppercase">Step 0{i + 1}</div>
                <h4 className="mt-2 font-zh text-[18px] font-black text-foreground leading-snug">{it.k}</h4>
                <p className="mt-3 text-[13px] leading-[1.85] text-foreground/65 font-zh">{it.v}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-[13.5px] leading-[1.95] text-foreground/70 font-zh italic">
            “{SYNERGY.summary}”
          </p>
        </div>
      </section>

      {/* 全生命周期闭环 */}
      <section id="lifecycle" className="relative scroll-mt-24 bg-[#0B0F1E] text-white py-24 lg:py-32 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 -right-40 h-[680px] w-[680px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(122,109,255,0.45), transparent)" }}
        />
        <div className="relative container">
          <SectionHeader index="02.∞" en="Full Lifecycle Loop" title={LIFECYCLE.title} desc={LIFECYCLE.desc} light />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-3">
            {LIFECYCLE.items.map((it: { k: string; v: string }, i: number) => (
              <motion.div
                key={it.k}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="font-display text-[10.5px] tracking-[0.22em] text-white/55 uppercase">Step 0{i + 1}</div>
                <div className="mt-2 font-zh text-[15.5px] font-black text-white">{it.k}</div>
                <p className="mt-2 text-[12.5px] leading-[1.85] text-white/70 font-zh">{it.v}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-[13.5px] leading-[1.95] text-white/65 font-zh italic">
            “{LIFECYCLE.summary}”
          </p>
        </div>
      </section>

      {ORDER.map((seg, idx) => {
        const d = SOLUTION_DETAILS[seg.audience];
        const altBg = idx % 2 === 1;
        return (
          <section
            key={seg.id}
            id={seg.id}
            className={`relative scroll-mt-24 py-24 lg:py-32 overflow-hidden ${altBg ? "bg-gradient-to-b from-[#F7F5FF] to-white" : "bg-white"}`}
          >
            <div
              aria-hidden
              className="absolute -top-32 right-0 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
              style={{ background: `radial-gradient(closest-side, ${seg.color}33, transparent)` }}
            />
            <div className="relative container">
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7">
                  <SectionHeader
                    index={seg.index}
                    en={seg.en}
                    title={d.headline}
                  />
                  <p className="mt-6 max-w-2xl text-[14.5px] lg:text-[15.5px] leading-[1.95] text-foreground/70 font-zh">
                    {d.intro}
                  </p>

                  <div className="mt-9 grid sm:grid-cols-2 gap-3">
                    {d.pillars.map((p, i) => (
                      <motion.div
                        key={p.k}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        custom={i}
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        className="rounded-2xl border border-border bg-white p-5"
                        style={{ boxShadow: `0 18px 50px -34px ${seg.color}55` }}
                      >
                        <div className="text-[13.5px] font-bold font-zh" style={{ color: seg.color }}>· {p.k}</div>
                        <div className="mt-1.5 text-[12.5px] leading-[1.85] text-foreground/65 font-zh">{p.v}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <Link
                      href={seg.href}
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-semibold text-white transition-shadow"
                      style={{
                        background: `linear-gradient(135deg, ${seg.color}, ${seg.color}AA)`,
                        boxShadow: `0 14px 40px -14px ${seg.color}99`,
                      }}
                    >
                      进入 {d.audienceLabel} 详情页
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, ease: "easeOut" as const }}
                    className="relative rounded-3xl border border-border bg-white p-7 overflow-hidden"
                  >
                    <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, ${seg.color}, transparent)` }} />
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                      style={{ background: `linear-gradient(135deg, ${seg.color}, ${seg.color}AA)` }}
                    >
                      {seg.icon}
                    </div>
                    <div className="mt-4 text-[12px] tracking-[0.22em] uppercase text-foreground/45 font-display">
                      面向{d.audienceLabel.replace("面向", "")} · {d.code}
                    </div>
                    <div className="mt-1 font-zh text-[22px] font-black text-foreground leading-snug">
                      {d.productName}
                    </div>

                    <div className="mt-6 text-[12px] uppercase tracking-[0.22em] text-foreground/45 font-display">
                      真实困境 · Pain Points
                    </div>
                    <ul className="mt-3 space-y-2.5">
                      {d.challenges.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-[13px] text-foreground/75 font-zh">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: seg.color }} />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </PageShell>
  );
}
