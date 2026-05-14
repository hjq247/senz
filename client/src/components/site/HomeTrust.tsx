/**
 * 首页 · 合作与信任
 * 资质 / 合作规模 badge 滚动条 + 大数字
 */
import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Building2, Hospital } from "lucide-react";
import { TRUST } from "@/lib/copy";
import CountUp from "./CountUp";

const STATS = [
  { to: 30000, suffix: "+", label: "基层医疗机构合作", color: "#1E6BFF", icon: <Hospital className="h-5 w-5" /> },
  { to: 10000, suffix: "",  label: "战略聚焦院外品质终端", color: "#8A6BFF", icon: <Building2 className="h-5 w-5" /> },
  { to: 6,     suffix: "+", label: "项国家级 / 行业核心资质", color: "#FF77C3", icon: <BadgeCheck className="h-5 w-5" /> },
  { to: 8,     suffix: "+ 年", label: "全链路 RWD 沉淀", color: "#2AC58E", icon: <ShieldCheck className="h-5 w-5" /> },
];

export default function HomeTrust() {
  const badges = [...TRUST.badges, ...TRUST.badges];
  return (
    <section id="trust" className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="text-[12px] font-medium uppercase tracking-[0.28em] text-foreground/55 font-display">
              03 · {TRUST.en}
            </div>
            <h2 className="mt-4 font-zh text-[32px] lg:text-[46px] leading-[1.12] font-black tracking-tight">
              {TRUST.title}
            </h2>
            <p className="mt-5 max-w-2xl text-[14.5px] lg:text-[15.5px] leading-[1.95] text-foreground/65 font-zh">
              {TRUST.desc}
            </p>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" as const }}
              whileHover={{ y: -4 }}
              className="relative rounded-3xl border border-border bg-gradient-to-br from-white to-[#F8F6FF] p-6 overflow-hidden"
              style={{ boxShadow: `0 24px 60px -36px ${s.color}55` }}
            >
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white"
                style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}AA)` }}
              >
                {s.icon}
              </div>
              <div className="mt-5 font-display text-[42px] lg:text-[48px] font-black leading-none" style={{ color: s.color }}>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-[12.5px] text-foreground/65 leading-snug font-zh">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 relative">
        <div className="flex gap-3 animate-marquee w-max px-2">
          {badges.map((b, i) => (
            <div
              key={i}
              className="shrink-0 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-5 py-2.5 text-[13px] font-medium text-foreground/75 font-zh"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#1E6BFF] to-[#FF77C3]" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
