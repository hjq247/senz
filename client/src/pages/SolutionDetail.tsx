import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Sparkle } from "lucide-react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/site/Navbar";
import { SOLUTION_DETAILS, type Audience } from "@/lib/solutions";
import { AI_FLOWLIGHT_SQUARE } from "@/lib/assets";
import { HERO_VIDEOS, HERO_POSTERS } from "@/lib/videos";

// 三个 Solution 子页 hero 资源 + tone（黑/白交错）
const SOLUTION_HERO_VIDEO: Record<Audience, string> = {
  patient: HERO_VIDEOS.patient,
  doctor: HERO_VIDEOS.doctor,
  industry: HERO_VIDEOS.industry,
};
const SOLUTION_HERO_POSTER: Record<Audience, string> = {
  patient: HERO_POSTERS.patient,
  doctor: HERO_POSTERS.doctor,
  industry: HERO_POSTERS.industry,
};
// 项目创意：患者=浅底，医生=深底，药企=浅底
const SOLUTION_HERO_TONE: Record<Audience, "dark" | "light"> = {
  patient: "light",
  doctor: "dark",
  industry: "light",
};

export default function SolutionDetail({ audience }: { audience: Audience }) {
  const d = SOLUTION_DETAILS[audience];
  const pillarCountZh =
    d.pillars.length === 3 ? "三" : d.pillars.length === 4 ? "四" : d.pillars.length === 5 ? "五" : String(d.pillars.length);
  const [loc] = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [loc]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO — 真人实拍视频背景（按 audience 黑白交错） */}
      {(() => {
        const tone = SOLUTION_HERO_TONE[audience];
        // 全站统一明亮彩调：禁用 dark 蒙层
        void tone;
        const isDark = false;
        return (
      <section
        className={
          "relative isolate overflow-hidden min-h-[78vh] lg:min-h-[82vh] " +
          (isDark ? "bg-[#0B0F1E] text-white" : "bg-[#F4F1EA] text-foreground")
        }
      >
        <video
          src={SOLUTION_HERO_VIDEO[audience]}
          poster={SOLUTION_HERO_POSTER[audience]}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.92]"
        />
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1E]/90 via-[#0B0F1E]/55 to-[#0B0F1E]/25" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1E]/55 via-transparent to-[#0B0F1E]/85" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/65 to-white/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-transparent to-white/85" />
          </>
        )}
        <div
          aria-hidden
          className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${d.accent}66, transparent)` }}
        />
        <div className="relative container pt-28 lg:pt-36 pb-20 lg:pb-28">
          <Link
            href="/"
            className={
              "inline-flex items-center gap-1.5 text-[13px] mb-8 " +
              (isDark ? "text-white/65 hover:text-white" : "text-foreground/55 hover:text-[#1E6BFF]")
            }
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] tracking-[0.22em] uppercase font-display backdrop-blur"
              style={{
                color: isDark ? "#fff" : d.accent,
                background: isDark ? `${d.accent}33` : `${d.accent}1A`,
                border: `1px solid ${d.accent}99`,
              }}
            >
              <Sparkle className="h-3 w-3" />
              {d.audienceLabel} · {d.code}
            </div>
            <h1
              className={
                "mt-5 font-zh text-[40px] lg:text-[64px] leading-[1.1] font-black tracking-tight " +
                (isDark
                  ? "text-white [text-shadow:_0_2px_24px_rgba(0,0,0,0.45)]"
                  : "text-foreground")
              }
            >
              {d.productName}
            </h1>
            <div
              className="mt-4 font-zh text-[18px] lg:text-[20px] font-bold"
              style={{ color: d.accent }}
            >
              {d.headline}
            </div>
            <p
              className={
                "mt-6 max-w-2xl text-[15px] lg:text-[16px] leading-[1.95] font-zh " +
                (isDark
                  ? "text-white/80 [text-shadow:_0_1px_10px_rgba(0,0,0,0.35)]"
                  : "text-foreground/70")
              }
            >
              {d.intro}
            </p>
          </div>
        </div>
      </section>
        );
      })()}

      {/* CHALLENGES — 直接复用文档原文 */}
      <section className="relative bg-[#F7F5FF] py-20 lg:py-28">
        <div className="container">
          <div className="text-[12px] font-medium uppercase tracking-[0.25em] text-foreground/55 font-display">
            01 · 我们解决什么样的问题
          </div>
          <h2 className="mt-3 font-zh text-[28px] lg:text-[40px] font-black leading-tight max-w-3xl">
            {d.audienceLabel}的真实困境
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {d.challenges.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" as const }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="mt-1 h-8 w-8 shrink-0 rounded-lg grid place-items-center font-display font-bold text-white"
                    style={{ background: d.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-[14.5px] leading-[1.85] text-foreground/80 font-zh">
                    {c}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS — 我们如何解决 */}
      <section className="relative bg-white py-20 lg:py-28 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 right-1/4 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
          style={{
            background: `radial-gradient(closest-side, ${d.accent}33, transparent)`,
          }}
        />
        <div className="container relative">
          <div className="text-[12px] font-medium uppercase tracking-[0.25em] text-foreground/55 font-display">
            02 · 我们如何解决
          </div>
          <h2 className="mt-3 font-zh text-[28px] lg:text-[40px] font-black leading-tight max-w-3xl">
            {d.productName} 的{pillarCountZh}个核心支柱
          </h2>
          <div className="mt-10 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              {d.pillars.map((p, i) => (
                <motion.div
                  key={p.k}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" as const }}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-border bg-gradient-to-br from-white via-[#FAF8FF] to-white p-6 lg:p-7"
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-display font-black text-[22px]"
                      style={{ color: d.accent }}
                    >
                      0{i + 1}
                    </span>
                    <h3 className="font-zh text-[18px] lg:text-[20px] font-bold text-foreground">
                      {p.k}
                    </h3>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-[1.85] text-foreground/70 font-zh">
                    {p.v}
                  </p>
                </motion.div>
              ))}
            </div>
            {/* big visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
              className="lg:col-span-5 relative rounded-[28px] overflow-hidden bg-[#0B0F1E] min-h-[420px]"
            >
              <img
                src={AI_FLOWLIGHT_SQUARE}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-95"
              />
              <motion.div
                aria-hidden
                animate={{ y: ["-30%", "130%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/15 to-transparent"
              />
              <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-[11px] tracking-[0.18em] uppercase text-white/85 font-display">
                <Sparkle className="h-3 w-3" />
                Neuro AI · scanning
              </div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/55 font-display">
                  价值闭环
                </div>
                <div className="mt-2 font-zh text-[18px] font-bold leading-snug">
                  以 {d.code} 为产品驱动，{d.audienceLabel}与生态协同进化
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FLOW — 业务流水 */}
      {d.flow && d.flow.length > 0 && (
        <section className="relative bg-gradient-to-b from-white to-[#F7F5FF] py-20 lg:py-28">
          <div className="container">
            <div className="text-[12px] font-medium uppercase tracking-[0.25em] text-foreground/55 font-display">
              03 · 业务闭环
            </div>
            <h2 className="mt-3 font-zh text-[28px] lg:text-[40px] font-black leading-tight max-w-3xl">
              {d.audienceLabel}的完整服务流程
            </h2>
            <div className="relative mt-12">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8A6BFF]/40 to-transparent" aria-hidden />
              <ol className="space-y-6">
                {d.flow.map((step, i) => (
                  <motion.li
                    key={step.k}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: i * 0.06, ease: "easeOut" as const }}
                    className="relative pl-12"
                  >
                    <div
                      className="absolute left-0 top-1 h-9 w-9 rounded-xl grid place-items-center text-white font-display font-black text-[13px]"
                      style={{ background: `linear-gradient(135deg, ${d.accent}, ${d.accent}AA)` }}
                    >
                      0{i + 1}
                    </div>
                    <div className="rounded-2xl border border-border bg-white p-5 lg:p-6">
                      <div className="font-zh text-[16px] font-bold text-foreground">{step.k}</div>
                      <p className="mt-2 text-[13px] leading-[1.85] text-foreground/65 font-zh">{step.v}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* USE CASE — 三款智能体产品的用户案例（严格依据文档原文） */}
      {d.persona && d.caseSteps && d.caseSteps.length > 0 && (
        <section className="relative bg-white py-20 lg:py-28 overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-32 -left-20 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${d.accent}33, transparent)` }}
          />
          <div className="container relative">
            <div className="text-[12px] font-medium uppercase tracking-[0.25em] text-foreground/55 font-display">
              04 · USE CASE
            </div>
            <h2 className="mt-3 font-zh text-[28px] lg:text-[40px] font-black leading-tight max-w-3xl">
              {d.caseTitle}
            </h2>
            <div className="mt-8 grid lg:grid-cols-12 gap-8">
              <motion.aside
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: "easeOut" as const }}
                className="lg:col-span-4 rounded-3xl border border-border bg-gradient-to-br from-[#FBF8FF] via-white to-[#EAF2FF] p-7 self-start lg:sticky lg:top-24"
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/45 font-display">Persona</div>
                <div className="mt-2 font-zh text-[18px] font-black text-foreground leading-snug">
                  {d.audienceLabel.replace("面向", "")} · 真实场景
                </div>
                <p className="mt-4 text-[13.5px] leading-[1.95] text-foreground/75 font-zh">
                  {d.persona}
                </p>
              </motion.aside>
              <div className="lg:col-span-8 space-y-4">
                {d.caseSteps.map((s, i) => (
                  <motion.div
                    key={s.k}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" as const }}
                    whileHover={{ y: -4 }}
                    className="relative rounded-2xl border border-border bg-white p-6 lg:p-7"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${d.accent}, transparent)` }} />
                    <div className="flex items-baseline gap-3">
                      <span className="font-display font-black text-[22px]" style={{ color: d.accent }}>
                        Step 0{i + 1}
                      </span>
                      <h3 className="font-zh text-[17px] lg:text-[18px] font-bold text-foreground leading-snug">
                        {s.k}
                      </h3>
                    </div>
                    <p className="mt-3 text-[13.5px] leading-[1.95] text-foreground/70 font-zh">{s.v}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="mt-12 rounded-[32px] border border-border bg-gradient-to-r from-white via-[#FAF8FF] to-[#EAF2FF] px-8 py-10 lg:px-16 lg:py-14 shadow-[0_24px_60px_-40px_rgba(80,70,180,0.2)]"
            >
              <div
                className="text-[12px] uppercase tracking-[0.28em] font-display font-semibold"
                style={{ color: d.accent }}
              >
                {d.caseFeelLabel}
              </div>
              <p className="mt-5 font-zh text-[20px] sm:text-[24px] lg:text-[32px] leading-[1.45] text-foreground font-semibold tracking-tight">
                “{d.caseFeel}”
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container">
          <div className="rounded-[32px] border border-border bg-gradient-to-r from-[#F4F1FF] via-[#FFF1F6] to-[#EAF2FF] px-8 lg:px-14 py-12 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="text-[12px] font-medium uppercase tracking-[0.25em] text-foreground/55 font-display">
                下一步
              </div>
              <h3 className="mt-2 font-zh text-[24px] lg:text-[30px] font-black text-foreground leading-snug">
                与深至一起，把"健康结果"变成可交付的确定性
              </h3>
            </div>
            <Link
              href={d.next.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#1E6BFF] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#0F4EE0] transition-colors shadow-[0_10px_30px_-10px_rgba(30,107,255,0.6)]"
            >
              {d.next.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
