/**
 * StrategySection
 *  · 上：战略主张（CORE_VALUE 的 title / intro / bullets / closing）
 *  · 中：三阶段 — 横向箭头三联步（病种深耕 → 智能体复制 → 生态平台扩展）
 *  · 下：CHALLENGES — 我们解决什么样的问题（保留原三栏卡）
 */
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { CHALLENGES, CORE_VALUE } from "@/lib/copy";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const FOUR = ["#1E6BFF", "#8A6BFF", "#FF77C3", "#2AC58E"] as const;
const STAGE_COLORS = ["#1E6BFF", "#8A6BFF", "#FF77C3"] as const;

export default function StrategySection() {
  return (
    <>
      {/* 1. 战略主张 + 三阶段箭头 */}
      <section
        id="strategy"
        className="relative bg-gradient-to-b from-white via-[#F8F6FF] to-white py-24 lg:py-32 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute -top-40 left-1/4 h-[680px] w-[680px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(96,165,250,0.20), rgba(255,255,255,0))",
          }}
        />
        <div className="relative container">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="text-[12px] font-medium uppercase tracking-[0.25em] text-foreground/55 font-display">
                01 · Strategy
              </div>
              <h2 className="mt-3 font-zh text-[34px] lg:text-[48px] leading-[1.15] font-black tracking-tight">
                {CORE_VALUE.title}
              </h2>
              <p className="mt-6 text-[15px] lg:text-[16px] leading-[1.95] text-foreground/70 max-w-2xl font-zh">
                {CORE_VALUE.intro}
              </p>
              <ul className="mt-4 space-y-2 text-[14.5px] text-foreground/75 font-zh">
                {CORE_VALUE.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1E6BFF] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-foreground/10 bg-white/70 backdrop-blur p-6 shadow-[0_30px_70px_-50px_rgba(80,70,180,0.45)]">
                <div className="font-display text-[11px] uppercase tracking-[0.28em] text-foreground/45">
                  Outcome Loop · Self-Evolving
                </div>
                <p className="mt-3 font-zh text-[14.5px] leading-[1.95] text-foreground/70">
                  {CORE_VALUE.closing}
                </p>
              </div>
            </div>
          </div>

          {/* 三阶段 — 横向箭头三联步 */}
          <div className="mt-16">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div className="font-display text-[11px] uppercase tracking-[0.28em] text-foreground/55">
                Three Stages · Self-Evolving Path
              </div>
              <div className="text-[12.5px] text-foreground/55 font-zh">
                病种深耕 → 智能体复制 → 生态平台扩展
              </div>
            </div>

            {/* 桌面：横向箭头 chevron */}
            <div className="mt-8 hidden lg:flex items-stretch gap-0 -mx-1">
              {CORE_VALUE.stages.map((s, i) => {
                const c = STAGE_COLORS[i % STAGE_COLORS.length];
                const isFirst = i === 0;
                return (
                  <motion.div
                    key={s.stage}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.12, duration: 0.55 }}
                    className="relative flex-1 mx-1"
                    style={{ zIndex: 10 - i }}
                  >
                    <div
                      className="relative h-[210px] px-9 py-7 transition-transform hover:-translate-y-0.5"
                      style={{
                        background: `linear-gradient(135deg, ${c}14 0%, ${c}06 60%, transparent 100%)`,
                        border: `1px solid ${c}33`,
                        clipPath: isFirst
                          ? "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)"
                          : "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 8% 50%)",
                      }}
                    >
                      <div
                        className="font-display text-[10.5px] uppercase tracking-[0.28em]"
                        style={{ color: c }}
                      >
                        Stage 0{i + 1}
                      </div>
                      <div className="mt-1 font-zh text-[14px] font-semibold text-foreground/70">
                        {s.stage}
                      </div>
                      <div className="mt-2 font-zh text-[22px] font-black text-foreground leading-[1.15] tracking-tight">
                        {s.title}
                      </div>
                      <div className="mt-2.5 font-zh text-[13px] leading-[1.75] text-foreground/65 max-w-[88%]">
                        {s.desc}
                      </div>
                      <div
                        className="absolute bottom-5 right-12 h-px w-10"
                        style={{ background: c }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* 移动 / 小屏：纵向阶梯 + 中线 */}
            <div className="mt-8 lg:hidden">
              <div className="relative pl-6">
                <div
                  className="absolute left-2 top-2 bottom-2 w-px"
                  style={{
                    background:
                      "linear-gradient(to bottom, #1E6BFF55, #8A6BFF55, #FF77C355)",
                  }}
                />
                {CORE_VALUE.stages.map((s, i) => {
                  const c = STAGE_COLORS[i % STAGE_COLORS.length];
                  return (
                    <motion.div
                      key={s.stage}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.08 }}
                      className="relative pb-6"
                    >
                      <span
                        className="absolute -left-[1.55rem] top-1.5 h-3 w-3 rounded-full ring-4 ring-white"
                        style={{ background: c }}
                      />
                      <div
                        className="font-display text-[10.5px] uppercase tracking-[0.28em]"
                        style={{ color: c }}
                      >
                        Stage 0{i + 1} · {s.stage}
                      </div>
                      <div className="mt-1 font-zh text-[18px] font-black text-foreground leading-tight">
                        {s.title}
                      </div>
                      <div className="mt-1.5 font-zh text-[13px] leading-[1.7] text-foreground/65">
                        {s.desc}
                      </div>
                      {i < CORE_VALUE.stages.length - 1 && (
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-foreground/45 font-display tracking-[0.18em] uppercase">
                          <ArrowRight className="h-3.5 w-3.5" />
                          下一阶段
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHALLENGES — 我们解决什么样的问题 */}
      <section
        id="abilities"
        className="relative bg-[#F7F5FF] py-24 lg:py-32 overflow-hidden"
      >
        <div className="container">
          <div>
            <h3 className="font-zh text-[26px] lg:text-[34px] font-black tracking-tight">
              我们解决什么样的问题
            </h3>
            <div className="mt-2 text-[12px] font-medium uppercase tracking-[0.25em] text-foreground/55 font-display">
              03 · Real-World Pain Points
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {CHALLENGES.map((c, i) => (
                <motion.div
                  key={c.audience}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="relative overflow-hidden rounded-2xl bg-white border border-border p-6"
                  style={{ boxShadow: `0 22px 50px -32px ${FOUR[i % 4]}66` }}
                >
                  <div aria-hidden className="absolute inset-x-0 -top-px h-[2px] pulse-line opacity-80" />
                  <div
                    className="flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] font-display"
                    style={{ color: FOUR[i % 4] }}
                  >
                    0{i + 1}
                    <ChevronRight className="h-3.5 w-3.5" />
                    {c.audience}
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {c.items.map((it) => (
                      <li
                        key={it}
                        className="text-[13.5px] leading-[1.75] text-foreground/75 font-zh flex gap-2"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ background: FOUR[i % 4] }}
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
