/**
 * Senz · HomeStatsBand
 * 紧接 Hero 之后的浅底统计条，承接电影开屏后的"硬数据"印象。
 * 与 Hero 解耦：Hero 是纯电影画面 + 文案，统计放到这里，避免压住视频。
 */
import { motion } from "framer-motion";
import CountUp from "./CountUp";

const STATS = [
  { to: 35000, suffix: "+", color: "#1E6BFF", label: "院外医疗影像终端网络" },
  { to: 1000, suffix: "万+", color: "#8A6BFF", label: "医疗数据闭环路径" },
  {
    to: 0,
    suffix: "",
    color: "#FF77C3",
    label: "深度场景医疗模型",
    textTop: "Senz · Models",
  },
  { to: 3, suffix: "×", color: "#2AC58E", label: "商业效益 UE（LTV / CAC）" },
];

export default function HomeStatsBand() {
  return (
    <section className="relative isolate bg-[#F4F1EA] text-foreground py-16 lg:py-20 border-y border-foreground/5">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(176,200,255,0.55), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] left-[-6%] h-[380px] w-[380px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,182,213,0.55), transparent)",
        }}
      />

      <div className="container relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <div className="font-display text-[11px] tracking-[0.22em] uppercase text-foreground/45">
              Outcome · By the Numbers
            </div>
            <h2 className="mt-2 font-zh font-black text-[24px] lg:text-[30px] leading-tight text-foreground">
              以真实世界数据，沉淀确定性的健康结果
            </h2>
          </div>
          <p className="max-w-md text-[13.5px] leading-[1.85] text-foreground/65 font-zh">
            通过疗效覆盖，数据覆盖及生态重塑，在2030年让1亿人拥有确定性的健康
          </p>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.1,
                ease: "easeOut" as const,
              }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-white/85 backdrop-blur-md px-5 py-5 shadow-[0_2px_18px_-8px_rgba(15,23,42,0.18)]"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 -top-px h-[2px] pulse-line"
              />
              <dt
                className="font-display text-[11px] tracking-[0.18em]"
                style={{ color: s.color }}
              >
                {String(i + 1).padStart(2, "0")}
              </dt>
              <dd
                className="mt-1 font-display text-[24px] lg:text-[32px] font-black leading-none"
                style={{ color: s.color }}
              >
                {s.to > 0 ? (
                  <CountUp to={s.to} suffix={s.suffix} duration={1.8} />
                ) : (
                  <span>{s.textTop}</span>
                )}
              </dd>
              <dd className="mt-2 text-[12.5px] text-foreground/65 leading-snug font-zh">
                {s.label}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
