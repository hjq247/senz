import { motion } from "framer-motion";
import { ArrowUpRight, Activity, Brain, Stethoscope, Briefcase } from "lucide-react";
import { Link } from "wouter";
import { PRODUCTS, PRODUCT_SYSTEM_TITLE, TERMINAL, NEURO } from "@/lib/copy";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const HARDWARE_ICONS: Record<string, React.ReactNode> = {
  超声: <Activity className="h-5 w-5" />,
  MR: <Brain className="h-5 w-5" />,
  CT: <Stethoscope className="h-5 w-5" />,
};

const NEURO_AGENTS = [
  {
    name: "Neuro AI 数据中台",
    tag: "底层大脑",
    desc: "数据治理与智能引擎，驱动洞察与决策。",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    name: "橙欣健康 Cx",
    tag: "面向患者",
    desc: "连接患者的智能触点，提供持续陪伴服务。",
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    name: "暖欣健康 Dx",
    tag: "面向医生",
    desc: "赋能医生临床决策与科研协作，提升专业效能。",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    name: "信欣健康 Px",
    tag: "面向药企",
    desc: "对接药企与商业生态，驱动价值闭环。",
    icon: <Briefcase className="h-5 w-5" />,
  },
];

export default function PlatformSection() {
  return (
    <>
      {/* 3. 产品体系 — 三端并排 */}
      <section id="products" className="relative bg-white py-24 lg:py-32 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 right-1/4 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(244,158,207,0.25), rgba(255,255,255,0))",
          }}
        />
        <div className="relative container">
          <div className="text-[12px] font-medium uppercase tracking-[0.25em] text-foreground/55 font-display">
            03 · Products
          </div>
          <h2 className="mt-3 font-zh text-[34px] lg:text-[48px] leading-[1.1] font-black tracking-tight">
            {PRODUCT_SYSTEM_TITLE}
          </h2>
          <p className="mt-4 text-[14.5px] lg:text-[15.5px] leading-[1.9] text-foreground/65 max-w-3xl font-zh">
            面向患者、医生与产业的三端协同解决方案，由统一的 Neuro AI 大脑驱动，构成深至科技的"价值闭环"。
          </p>

          {/* 三端并排：患者 → 医生 → 药企 */}
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.code}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl border border-border bg-gradient-to-br from-white via-[#F8F6FF] to-white p-7 lg:p-8 overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 h-56 w-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
                  style={{
                    background:
                      i === 0
                        ? "radial-gradient(closest-side, rgba(244,158,207,0.55), transparent)"
                        : i === 1
                        ? "radial-gradient(closest-side, rgba(96,165,250,0.55), transparent)"
                        : "radial-gradient(closest-side, rgba(167,139,250,0.55), transparent)",
                  }}
                />
                <div className="relative">
                  <div className="text-[12px] uppercase tracking-[0.22em] text-foreground/45 font-display">
                    面向{p.audience} · {p.code}
                  </div>
                  <h3 className="mt-3 font-zh text-[24px] lg:text-[26px] font-black text-foreground leading-snug">
                    {p.name}
                  </h3>
                  <div className="mt-2 font-zh text-[14px] font-bold text-[#1E6BFF]">
                    {p.headline}
                  </div>
                  <p className="mt-5 text-[13.5px] leading-[1.85] text-foreground/70 font-zh">
                    {p.desc}
                  </p>
                  <Link
                    href={p.href}
                    className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#1E6BFF] hover:text-[#0F4EE0]"
                  >
                    {p.cta}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 平台与技术 — 原生 AI 终端 + Neuro AI 协同 */}
      <section
        id="platform"
        className="relative bg-[#0B0F1E] text-white overflow-hidden py-24 lg:py-32"
      >
        <div
          aria-hidden
          className="absolute -top-40 -left-40 h-[680px] w-[680px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(122,109,255,0.45), rgba(11,15,30,0))",
          }}
        />
        <div className="relative container">
          <div className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#8FB3FF] font-display">
            04 · Platform & Technology
          </div>
          <h2 className="mt-3 font-zh text-[34px] lg:text-[48px] leading-[1.1] font-black tracking-tight">
            原生 AI 终端体系 + Neuro AI 协同
          </h2>

          {/* 原生 AI 终端体系 */}
          <div className="mt-14 rounded-[28px] border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="p-8 lg:p-12">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#8FB3FF] font-display">
                  数据获取层 · 感知与入口
                </div>
                <h3 className="mt-3 font-zh text-[26px] lg:text-[32px] font-black leading-snug">
                  {TERMINAL.title}
                </h3>
                <div className="mt-5 text-[13.5px] leading-[1.95] text-white/75 font-zh whitespace-pre-line">
                  <span className="font-bold text-white">{TERMINAL.claimTitle}</span>
                  {TERMINAL.claim}
                </div>
                <ul className="mt-6 space-y-3">
                  {TERMINAL.pillars.map((p) => (
                    <li key={p.k} className="text-[13px] leading-[1.85] text-white/80 font-zh">
                      <span className="font-bold text-white">· {p.k}：</span>
                      {p.v}
                    </li>
                  ))}
                </ul>
            </div>

            {/* 多模态影像终端矩阵 */}
            <div className="border-t border-white/10 grid md:grid-cols-3">
              {TERMINAL.matrix.map((m, i) => (
                <motion.div
                  key={m.hardware}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className={`p-7 lg:p-9 ${i !== 2 ? "md:border-r border-white/10" : ""}`}
                >
                  <div className="flex items-center gap-2 text-[#8FB3FF]">
                    {HARDWARE_ICONS[m.hardware]}
                    <div className="font-zh text-[20px] font-bold text-white">
                      {m.hardware}
                    </div>
                  </div>
                  <div className="mt-2 text-[12px] tracking-wider uppercase text-white/45 font-display">
                    {m.status}
                  </div>
                  <div className="mt-5 font-zh text-[15px] font-bold text-white">
                    {m.feature}
                  </div>
                  <p className="mt-3 text-[12.5px] leading-[1.85] text-white/65 font-zh">
                    {m.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Neuro AI 协同系统 */}
          <div className="mt-14 lg:mt-20">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#8FB3FF] font-display">
              智能协同层 · 认知 / 决策 / 交付
            </div>
            <h3 className="mt-3 font-zh text-[26px] lg:text-[32px] font-black leading-snug">
              {NEURO.title}
            </h3>
            <p className="mt-4 text-[13.5px] lg:text-[14.5px] leading-[1.95] text-white/70 max-w-4xl font-zh">
              {NEURO.claim}
            </p>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {NEURO_AGENTS.map((n, i) => (
                <motion.div
                  key={n.name}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="text-[#8FB3FF]">{n.icon}</div>
                  <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/45 font-display">
                    {n.tag}
                  </div>
                  <div className="mt-1 font-zh text-[17px] font-bold text-white leading-snug">
                    {n.name}
                  </div>
                  <div className="mt-3 text-[12.5px] leading-[1.8] text-white/60 font-zh">
                    {n.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
