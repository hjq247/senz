/**
 * 平台与技术
 * - PageHero
 * - 原生 AI 终端体系（多模态影像终端矩阵）
 * - 健康管理协同系统：Neuro AI（4 智能体）
 */
import { motion } from "framer-motion";
import { Activity, Brain, Stethoscope, Briefcase, ArrowUpRight } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import PlatformSpline3D from "@/components/site/PlatformSpline3D";
import PlatformProjectSection from "@/components/site/PlatformProjectSection";
import { TERMINAL, NEURO, PLATFORM_SECTIONS } from "@/lib/copy";
import { HERO_VIDEOS, HERO_POSTERS, VIDEOS } from "@/lib/videos";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

const HW_ICONS: Record<string, React.ReactNode> = {
  超声: <Activity className="h-5 w-5" />,
  MR: <Brain className="h-5 w-5" />,
  CT: <Stethoscope className="h-5 w-5" />,
};

const AGENT_META = [
  { code: "Cx", color: "#FF77C3", icon: <Stethoscope className="h-5 w-5" /> },
  { code: "Dx", color: "#1E6BFF", icon: <Activity className="h-5 w-5" /> },
  { code: "Px", color: "#2AC58E", icon: <Briefcase className="h-5 w-5" /> },
];

export default function PlatformPage() {
  return (
    <PageShell>
      {/* Spline 3D 叠层：position:fixed，不占文档流，悬浮于所有内容之上 */}
      <PlatformSpline3D />

      <PageHero
        index="01"
        en="Platform & Technology"
        title="原生 AI 终端体系 + Neuro AI 协同"
        desc="从感知与入口的多模态影像终端，到驱动认知与决策的 Neuro AI 大脑，深至构建一条从数据采集、智能分析、专业协同到商业价值转化的全链路闭环。"
        subs={PLATFORM_SECTIONS}
        variant="purple"
        videoSrc={HERO_VIDEOS.platform}
        posterSrc={HERO_POSTERS.platform}
        tone="light"
        subtitleShield
      />

      {/* ── 产品背景叙事区：Group-1 顶光 / Group-4 大气光 / Group-5 使用场景 ── */}
      <PlatformProjectSection />

      {/* ============== 1. 原生 AI 终端体系 ============== */}
      <section id="terminal" className="relative scroll-mt-24 bg-[#0B0F1E] text-white overflow-hidden py-24 lg:py-32">
        <div
          aria-hidden
          className="absolute -top-40 -left-40 h-[680px] w-[680px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(122,109,255,0.45), transparent)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -right-40 h-[720px] w-[720px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(255,119,195,0.30), transparent)" }}
        />
        <div className="relative container">
          {/* 多模态影像终端矩阵 — 3D 动画在此处停止 */}
          <div id="terminal-matrix" className="mt-0">
            <div className="text-[40px] leading-none uppercase tracking-[0.22em] text-[#8FB3FF] font-display">
              多模态影像终端矩阵
            </div>
            <div className="mt-5 grid md:grid-cols-3 gap-4">
              {TERMINAL.matrix.map((m, i) => (
                <motion.div
                  key={m.hardware}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-center gap-2 text-[#8FB3FF]">
                    {HW_ICONS[m.hardware]}
                    <div className="font-zh text-[20px] font-bold text-white">{m.hardware}</div>
                  </div>
                  <div className="mt-2 text-[12px] tracking-wider uppercase text-white/45 font-display">
                    {m.status}
                  </div>
                  <div className="mt-5 font-zh text-[15px] font-bold text-white">{m.feature}</div>
                  <p className="mt-3 text-[12.5px] leading-[1.85] text-white/65 font-zh">{m.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== 1.5 全宽视频条：Neuro AI 数据流 ============== */}
      <section id="neuro-video" className="relative bg-[#0B0F1E] py-0 overflow-hidden">
        <div className="relative h-[280px] sm:h-[360px] lg:h-[440px] w-full overflow-hidden">
          <video
            src={VIDEOS.neuroFlow}
            poster={HERO_POSTERS.platform}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1E]/85 via-transparent to-[#0B0F1E]/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1E]/40 via-transparent to-[#0B0F1E]/60" />
          <div className="relative h-full container flex flex-col justify-center">
            <div className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/65 font-display">
              Neuro AI · In Motion
            </div>
            <h3 className="mt-3 font-zh text-[26px] sm:text-[34px] lg:text-[44px] leading-[1.1] font-black text-white max-w-3xl">
              数据 · 知识 · 决策 — 在一颗大脑里被实时编织
            </h3>
            <p className="mt-4 max-w-xl text-[13.5px] sm:text-[14.5px] leading-[1.85] text-white/75 font-zh">
              Neuro AI 是健康管理协同系统的中枢：把多源临床数据、影像、随访行为整合成可追踪的疗效证据。
            </p>
          </div>
        </div>
      </section>

      {/* ============== 2. 健康管理协同系统：Neuro AI ============== */}
      <section id="neuro" className="relative scroll-mt-24 bg-white py-24 lg:py-32 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 left-1/3 h-[640px] w-[640px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(138,107,255,0.20), transparent)" }}
        />
        <div className="relative container">
          <SectionHeader
            index="01.2"
            en="Neuro AI · Network"
            title={NEURO.title}
            desc={NEURO.claim}
          />

          {/* Neuro AI 大脑：能力 + 护城河 */}
          <div className="mt-14 rounded-3xl border border-border bg-gradient-to-br from-[#F4F1FF] via-white to-[#EAF2FF] p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white bg-gradient-to-br from-[#8A6BFF] to-[#1E6BFF] shrink-0">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/45 font-display">Neuro AI · Brain</div>
                <div className="font-zh text-[20px] font-black text-foreground leading-snug">{NEURO.brain.title}</div>
              </div>
            </div>
            <p className="mt-5 text-[14px] lg:text-[15px] leading-[1.95] text-foreground/75 font-zh">{NEURO.brain.desc}</p>
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              {NEURO.brain.abilities.map((a: { k: string; v: string }, i: number) => (
                <motion.div
                  key={a.k}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-border bg-white p-6"
                >
                  <div className="font-zh text-[15.5px] font-black text-foreground">{a.k}</div>
                  <p className="mt-2 text-[13px] leading-[1.85] text-foreground/65 font-zh">{a.v}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/45 font-display">三大技术护城河 · Moats</div>
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                {NEURO.brain.moats.map((m: { k: string; v: string }, i: number) => (
                  <motion.div
                    key={m.k}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    custom={i}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="relative rounded-2xl border border-border bg-white p-6 overflow-hidden"
                  >
                    <div className="absolute inset-x-0 top-0 h-1" style={{ background: "linear-gradient(90deg,#1E6BFF,#8A6BFF,#FF77C3)" }} />
                    <div className="font-zh text-[15px] font-black text-foreground">{m.k}</div>
                    <p className="mt-2 text-[12.5px] leading-[1.85] text-foreground/65 font-zh">{m.v}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* 三智能体 — 精简可视化卡片：图标 + 一句主诉求 + 3 个能力 chip */}
          <div className="mt-14">
            <div className="flex items-baseline justify-between gap-4">
              <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/45 font-display">三大智能体 · Agents</div>
              <div className="text-[11.5px] text-foreground/55 font-zh">点击卡片可跳转对应业务详情</div>
            </div>
            <div className="mt-5 grid lg:grid-cols-3 gap-5">
              {NEURO.agents.map((agent: { name: string; tech: string; value: string; roles: { k: string; v: string }[] }, i: number) => {
                const meta = AGENT_META[i] ?? AGENT_META[0];
                const slug = i === 0 ? "patient" : i === 1 ? "doctor" : "industry";
                const chips = agent.roles.slice(0, 3).map((r) => r.k);
                return (
                  <motion.a
                    key={agent.name}
                    href={`/solutions/${slug}`}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    custom={i}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-3xl border border-border bg-white p-7 overflow-hidden flex flex-col min-h-[300px]"
                    style={{ boxShadow: `0 30px 60px -40px ${meta.color}55` }}
                  >
                    {/* 顶部彩条 + 背景光晕 */}
                    <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, ${meta.color}, transparent)` }} />
                    <div
                      aria-hidden
                      className="absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-25 group-hover:opacity-40 transition-opacity blur-3xl"
                      style={{ background: `radial-gradient(closest-side, ${meta.color}, transparent)` }}
                    />
                    {/* 顶部图标 + 代码 */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}AA)` }}>
                        {meta.icon}
                      </div>
                      <div className="font-display text-[11px] tracking-[0.22em] uppercase text-foreground/45">{meta.code}</div>
                    </div>
                    {/* 名称 + 一句主诉求 */}
                    <h4 className="mt-5 font-zh text-[19px] font-black text-foreground leading-snug">{agent.name}</h4>
                    <p className="mt-2 text-[12.5px] leading-[1.7] text-foreground/65 font-zh line-clamp-2">{agent.value}</p>
                    {/* 能力 chips */}
                    <div className="mt-auto pt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {chips.map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] font-zh"
                            style={{ borderColor: `${meta.color}55`, color: meta.color, background: `${meta.color}10` }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium font-zh transition-colors" style={{ color: meta.color }}>
                        进入业务详情
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
