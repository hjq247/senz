import { motion } from "framer-motion";
import { ArrowUpRight, User, Stethoscope, Briefcase } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

// 严格按文档：三端协同 — 顺序 患者 → 医生 → 药企
const SOLUTIONS = [
  {
    audience: "患者",
    code: "Cx",
    name: "橙欣健康 Cx",
    icon: <User className="h-6 w-6" />,
    accent: "from-[#FF77C3] to-[#FFD8E8]",
    color: "#FF77C3",
    headline: "慢病管理解决方案：橙欣健康 Cx",
    desc:
      "面向慢病人群的数字化健康管理平台，提供持续随访与个性化干预服务,打造患者长期健康管理体系",
    cta: "了解慢病管理服务",
    href: "/solutions/patient",
  },
  {
    audience: "医生",
    code: "Dx",
    name: "暖欣健康 Dx",
    icon: <Stethoscope className="h-6 w-6" />,
    accent: "from-[#1E6BFF] to-[#BCD2FF]",
    color: "#1E6BFF",
    headline: "医生临床智能伙伴：暖欣健康 Dx",
    desc:
      "面向医生的 AI 临床智能平台，融合真实世界数据与循证医学，辅助诊疗决策与患者全流程管理",
    cta: "了解专业能力增强伙伴",
    href: "/solutions/doctor",
  },
  {
    audience: "药企",
    code: "Px",
    name: "信欣健康 Px",
    icon: <Briefcase className="h-6 w-6" />,
    accent: "from-[#2AC58E] to-[#BFE9D7]",
    color: "#2AC58E",
    headline: "药企解决方案：信欣健康 Px",
    desc:
      "面向药企的真实世界研究与患者管理平台，提供可验证的疗效数据与商业洞察",
    cta: "了解药企解决方案",
    href: "/solutions/industry",
  },
];

export default function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="relative bg-white py-24 lg:py-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-40 left-1/3 h-[680px] w-[680px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(167,139,250,0.20), rgba(255,255,255,0))",
        }}
      />
      <div className="relative container">
        <div className="text-[12px] font-medium uppercase tracking-[0.25em] text-foreground/55 font-display">
          05 · Solutions
        </div>
        <h2 className="mt-3 font-zh text-[34px] lg:text-[48px] leading-[1.1] font-black tracking-tight max-w-3xl">
          面向患者、医生与产业
          <br className="hidden lg:block" /> 的三端协同解决方案
        </h2>
        <p className="mt-5 max-w-3xl text-[14.5px] lg:text-[15.5px] leading-[1.95] text-foreground/65 font-zh">
          从慢病管理到临床决策，从科研协作到产业洞察，深至以 Neuro AI 大脑驱动三端协同，构成可持续进化的健康结果管理生态。
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {SOLUTIONS.map((s, i) => (
            <motion.div
              key={s.code}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl border border-border bg-white p-7 lg:p-8 overflow-hidden"
              style={{ boxShadow: `0 24px 60px -36px ${s.color}55` }}
            >
              {/* gradient header + animated pulse */}
              <div
                className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${s.accent}`}
              />
              <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] pulse-line opacity-70" />
              <div
                aria-hidden
                className={`absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-0 group-hover:opacity-90 transition-opacity duration-500 blur-3xl bg-gradient-to-br ${s.accent}`}
              />
              <div className="relative">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-foreground/85 bg-gradient-to-br ${s.accent}`}
                >
                  {s.icon}
                </div>
                <div className="mt-5 text-[12px] uppercase tracking-[0.22em] text-foreground/45 font-display">
                  面向{s.audience} · {s.code}
                </div>
                <h3 className="mt-2 font-zh text-[22px] lg:text-[24px] font-black text-foreground leading-snug">
                  {s.name}
                </h3>
                <div className="mt-2 font-zh text-[13.5px] font-bold" style={{ color: s.color }}>
                  {s.headline}
                </div>
                <p className="mt-5 text-[13.5px] leading-[1.85] text-foreground/70 font-zh">
                  {s.desc}
                </p>
                <Link
                  href={s.href}
                  className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors"
                  style={{ color: s.color }}
                >
                  了解详情
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
