/**
 * 首页 · 深至正在做的（Now Doing） — 杂志混排版式
 *  · 顶部大字宣言（左字右数字浮标）
 *  · 中部 4 条做事拆为 4 种异构模块：
 *    1) 图文叠加大卡（图为底 + 字压字面）
 *    2) 引文卡（quote 风格）
 *    3) 数据 + 描述卡
 *    4) 进度条 / 节点卡
 *  · 底部图文穿插大图条 + 双 CTA
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Quote, Activity, Sparkles, Repeat } from "lucide-react";
import { NOW_DOING, DOING } from "@/lib/copy";
import { AI_FLOWLIGHT_SQUARE } from "@/lib/assets";

const COLORS = ["#1E6BFF", "#8A6BFF", "#FF77C3", "#2AC58E"];

export default function HomeNowDoing() {
  const lines = DOING.lines || [];
  const items = NOW_DOING.items || [];

  return (
    <section
      id="now-doing"
      className="relative bg-white py-24 lg:py-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-40 right-0 h-[700px] w-[700px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,119,195,0.18), transparent)",
        }}
      />
      <div className="relative container">
        {/* 顶部宣言 */}
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="text-[12px] font-medium uppercase tracking-[0.28em] text-foreground/55 font-display">
              05 · {NOW_DOING.en}
            </div>
            <h2 className="mt-4 font-zh text-[34px] lg:text-[52px] leading-[1.08] font-black tracking-tight">
              {NOW_DOING.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-foreground/10 bg-white/80 backdrop-blur p-5 shadow-[0_22px_50px_-40px_rgba(80,70,180,0.4)]">
              <div className="font-display text-[10.5px] uppercase tracking-[0.28em] text-foreground/50">
                Live Status
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <div className="font-zh text-[28px] font-black bg-clip-text text-transparent bg-gradient-to-r from-[#1E6BFF] via-[#8A6BFF] to-[#FF77C3]">
                  35,000+
                </div>
                <div className="text-[12.5px] text-foreground/65 font-zh">
                  院外医疗影像终端
                </div>
              </div>
              <div className="mt-1 text-[12.5px] text-foreground/60 font-zh">
                持续接入 · 持续反馈 · 持续进化
              </div>
            </div>
          </div>
        </div>

        {/* 杂志混排 4 模块 */}
        <div className="mt-12 grid lg:grid-cols-12 gap-5">
          {/* 模块一：图为底 + 字压面（占 7 列 · 横宽） */}
          {items[0] && (
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="relative lg:col-span-7 rounded-3xl overflow-hidden h-[360px] border border-foreground/10"
            >
              <img
                src={AI_FLOWLIGHT_SQUARE}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,12,30,0.0) 0%, rgba(10,12,30,0.55) 70%, rgba(10,12,30,0.85) 100%)",
                }}
              />
              <div className="relative h-full flex flex-col justify-end p-7 lg:p-9 text-white">
                <div className="flex items-center gap-2 font-display text-[10.5px] uppercase tracking-[0.28em] text-white/70">
                  <Sparkles className="h-3.5 w-3.5" />
                  Now 01
                </div>
                <div className="mt-2 font-zh text-[26px] lg:text-[30px] font-black leading-tight">
                  {items[0].k}
                </div>
                <p className="mt-2 max-w-2xl text-[13.5px] leading-[1.85] text-white/80 font-zh">
                  {items[0].v}
                </p>
              </div>
            </motion.div>
          )}

          {/* 模块二：引文卡（占 5 列） */}
          {items[1] && (
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="lg:col-span-5 relative rounded-3xl border border-foreground/10 bg-gradient-to-br from-[#FFF7FB] via-white to-[#F4F8FF] p-7 lg:p-9 overflow-hidden"
            >
              <Quote
                className="absolute -top-2 -left-2 h-24 w-24 text-[#FF77C3]/15"
                strokeWidth={1.4}
              />
              <div className="relative">
                <div
                  className="font-display text-[10.5px] uppercase tracking-[0.28em]"
                  style={{ color: COLORS[1] }}
                >
                  Now 02
                </div>
                <div className="mt-3 font-zh text-[22px] lg:text-[26px] font-black text-foreground leading-snug">
                  「{items[1].k}」
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.95] text-foreground/70 font-zh">
                  {items[1].v}
                </p>
              </div>
            </motion.div>
          )}

          {/* 模块三：数据卡 — 跨 4 列 */}
          {items[2] && (
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="lg:col-span-4 relative flex min-h-[200px] flex-col items-start justify-center rounded-3xl text-white p-7 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #0E1330 0%, #2B2870 70%, #4D2A88 100%)",
              }}
            >
              <div
                aria-hidden
                className="absolute -top-20 -right-20 h-60 w-60 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,119,195,0.4), transparent)",
                }}
              />
              <div className="relative flex flex-col items-start">
                <div className="flex items-center gap-2 font-display text-[10.5px] uppercase tracking-[0.28em] text-white/70">
                  <Activity className="h-3.5 w-3.5" />
                  Now 03
                </div>
                <div className="mt-3 font-zh text-[22px] font-black leading-snug">
                  {items[2].k}
                </div>
              </div>
            </motion.div>
          )}

          {/* 模块四：进度节点卡 — 跨 8 列横长 */}
          {items[3] && (
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="lg:col-span-8 relative rounded-3xl border border-foreground/10 bg-white p-7 lg:p-9 overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-1.5"
                style={{
                  background:
                    "linear-gradient(180deg, #2AC58E, transparent)",
                }}
              />
              <div className="grid sm:grid-cols-12 gap-6 items-start">
                <div className="sm:col-span-5">
                  <div className="flex items-center gap-2 font-display text-[10.5px] uppercase tracking-[0.28em] text-[#2AC58E]">
                    <Repeat className="h-3.5 w-3.5" />
                    Now 04
                  </div>
                  <div className="mt-3 font-zh text-[24px] font-black text-foreground leading-tight">
                    {items[3].k}
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.85] text-foreground/65 font-zh">
                    {items[3].v}
                  </p>
                </div>
                <div className="sm:col-span-7">
                  <div className="space-y-3">
                    {lines.slice(0, 4).map((l, i) => (
                      <div
                        key={l}
                        className="flex items-center gap-3 rounded-2xl border border-foreground/8 bg-[#F8FBF9] px-4 py-3"
                      >
                        <span
                          className="font-display text-[11px] uppercase tracking-[0.22em] text-foreground/40"
                          style={{ minWidth: 28 }}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: COLORS[i % COLORS.length] }}
                        />
                        <span className="text-[13px] leading-[1.7] text-foreground/80 font-zh">
                          {l}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* 底部图文条 + CTA */}
        <div className="mt-12 grid lg:grid-cols-12 gap-5 items-stretch">
          <div className="relative lg:col-span-8 h-[180px] rounded-3xl overflow-hidden border border-foreground/10">
            <img
              src={AI_FLOWLIGHT_SQUARE}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0.0) 100%)",
              }}
            />
            <div className="relative h-full flex flex-col justify-center px-8">
              <div className="font-display text-[10.5px] uppercase tracking-[0.28em] text-foreground/50">
                Outcome Loop · Living
              </div>
              <div className="mt-1 font-zh text-[20px] lg:text-[24px] font-black text-foreground max-w-2xl">
                持续叠加 · 校验 · 进化 — 让健康结果可被追踪、可被解释、可被复用。
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex items-stretch">
            <Link
              href="/about"
              className="group flex w-full items-center justify-between rounded-3xl bg-foreground px-6 py-5 text-background transition-colors hover:bg-[#1E6BFF]"
            >
              <span className="font-zh text-[14px] font-medium">了解 关于深至</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
