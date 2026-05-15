/**
 * HomeAudienceVideos —— 合并后的「面向医疗产业的智能解决方案 / 三端协同」整段
 * ─────────────────────────────────────────────────────────────────────────
 * 设计哲学：
 *   · 浅色 band，紧接 HomeCapabilities 深色条之下，构成"深 → 浅"节奏
 *   · 标题保留官方主标题「面向医疗产业的智能解决方案」+ 副标「三端协同 — 患者 · 医生 · 药企」
 *   · 三段 1:1 真人实拍循环视频（Cx / Dx / Px），按原始比例方形展示，不裁切、不变形
 *   · 每段都跳转到对应 solution 详情页
 *   · 文案：每端给出"角色 + 价值主张 + 一句话差异化"，避免与上方 02 三能力条重复
 */
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import VideoCard from "./VideoCard";
import { VIDEOS, VIDEO_POSTERS } from "@/lib/videos";
import { PRODUCT_SYSTEM_TITLE } from "@/lib/copy";

const ITEMS = [
  {
    code: "Cx",
    en: "Patients",
    zh: "面向患者",
    title: "橙欣健康 Cx",
    tagline: "做方案依从率最高的患者健康伙伴",
    desc: "面向慢病人群的数字化健康管理平台，提供持续随访与个性化干预服务，打造患者长期健康管理体系。",
    cta: "深入了解 慢病管理解决方案",
    href: "/solutions/patient",
    video: VIDEOS.patientLoop,
    poster: VIDEO_POSTERS.patientLoop,
    accent: "from-[#FF77C3] to-[#FFB8DC]",
    text: "#A23A78",
  },
  {
    code: "Dx",
    en: "Doctors",
    zh: "面向医生",
    title: "暖欣健康 Dx",
    tagline: "做临床采纳率最高的医生临床伙伴",
    desc: "面向医生的AI临床智能平台，融合真实世界数据与循证医学，辅助诊疗决策与患者全流程管理。",
    cta: "深入了解 医生临床智能伙伴",
    href: "/solutions/doctor",
    video: VIDEOS.doctorLoop,
    poster: VIDEO_POSTERS.doctorLoop,
    accent: "from-[#8A6BFF] to-[#B6A8FF]",
    text: "#5340C9",
  },
  {
    code: "Px",
    en: "Pharma",
    zh: "面向药企",
    title: "信欣健康 Px",
    tagline: "做疗效改善投资回报率最高的药企价值引擎",
    desc: "面向药企的真实世界研究与患者管理平台，提供可验证的疗效数据与商业洞察。",
    cta: "深入了解 药企解决方案",
    href: "/solutions/industry",
    video: VIDEOS.pharmaLoop,
    poster: VIDEO_POSTERS.pharmaLoop,
    accent: "from-[#1E6BFF] to-[#2AC58E]",
    text: "#0E5BCC",
  },
];

export default function HomeAudienceVideos() {
  return (
    <section
      id="solutions"
      className="relative bg-gradient-to-b from-white via-[#FAF7FF] to-white pt-20 lg:pt-28 pb-24 lg:pb-32 overflow-hidden"
    >
      {/* 背景装饰 */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/4 h-[560px] w-[560px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(138,107,255,0.16), transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[-200px] right-[-100px] h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,119,195,0.14), transparent)",
        }}
      />

      <div className="relative container">
        {/* ============== 区块标题 ============== */}
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div className="max-w-3xl">
            <div className="text-[12px] font-medium uppercase tracking-[0.28em] text-foreground/55 font-display">
              03 · Solutions · Cx / Dx / Px
            </div>
            <h2
              className="mt-4 font-zh font-black leading-[1.06] tracking-tight text-foreground whitespace-nowrap"
              style={{ fontSize: "clamp(20px, 5.4vw, 60px)" }}
            >
              {PRODUCT_SYSTEM_TITLE}
            </h2>
            <div className="mt-3 font-zh text-[16px] lg:text-[18px] font-medium tracking-wide text-foreground/70">
              三端协同 &nbsp;—&nbsp; 患者 · 医生 · 药企
            </div>
            <p className="mt-5 text-[14.5px] leading-[1.85] text-foreground/65 font-zh max-w-2xl">
              我们以多模态医学影像等客观医疗数据为核心入口，贯通诊断、治疗、随访与疗效评估全流程，构建基于真实世界数据闭环持续进化的医疗智能体体系，让医疗从“过程服务”走向“健康结果的确定性”。
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1E6BFF] via-[#8A6BFF] to-[#FF77C3] px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_10px_30px_-12px_rgba(30,107,255,0.55)] hover:shadow-[0_14px_36px_-10px_rgba(138,107,255,0.55)] transition-shadow"
          >
            查看 产品矩阵
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ============== 三端视频卡 ============== */}
        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative rounded-[22px] border border-border bg-white overflow-hidden hover:shadow-[0_40px_80px_-40px_rgba(80,70,180,0.35)] transition-shadow"
            >
              {/* 顶部彩条 */}
              <div className={`h-[3px] w-full bg-gradient-to-r ${it.accent}`} />
              <Link href={it.href} className="block">
                <VideoCard
                  src={it.video}
                  poster={it.poster}
                  aspect="1 / 1"
                  radius="rounded-none"
                  border=""
                  className="border-0"
                  label={`${it.title} 业务视频`}
                  softWash
                />
              </Link>
              <div className="p-6 lg:p-7">
                <div className="flex items-center justify-between">
                  <div className="font-display text-[11px] uppercase tracking-[0.24em] text-foreground/45">
                    {it.en} · {it.code}
                  </div>
                  <div
                    className="text-[11px] font-medium font-display tracking-[0.18em] uppercase"
                    style={{ color: it.text }}
                  >
                    {it.zh}
                  </div>
                </div>
                <h3 className="mt-3 font-zh text-[22px] lg:text-[24px] font-black leading-tight text-foreground">
                  {it.title}
                </h3>
                <div
                  className={
                    "mt-1 font-zh text-[13.5px] font-medium min-w-0 " +
                    (it.code === "Px"
                      ? "text-[11.5px] sm:text-[12.5px] lg:text-[13.5px] leading-snug whitespace-nowrap overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                      : "")
                  }
                  style={{ color: it.text }}
                >
                  {it.tagline}
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.85] text-foreground/65 font-zh">
                  {it.desc}
                </p>
                <Link
                  href={it.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium font-zh text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5"
                >
                  {it.cta}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
