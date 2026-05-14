/**
 * 招贤纳士
 *  · 办公环境 / 员工活动 / 开放职位
 */
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import CareersCultureCarousel from "@/components/site/CareersCultureCarousel";
import { CAREERS, CAREERS_SECTIONS } from "@/lib/copy";
import { NEWS_COVERS } from "@/lib/assets";
import {
  WECHAT_CULTURE_ARTICLE_URL,
  WECHAT_CULTURE_VISION_QUOTE,
} from "@/lib/careers-culture";
import { HERO_VIDEOS, HERO_POSTERS } from "@/lib/videos";

const OFFICE_PHOTOS = [
  "/manus-storage/DSC09169_9007c2f5.webp",
  "/manus-storage/DSC09177_675f7bd2.webp",
  "/manus-storage/DSC09222_e67d9ed7.webp",
  "/manus-storage/DSC09218_93b9f715.webp",
  "/manus-storage/DSC09206_06e365cd.webp",
  "/manus-storage/DSC09240_9e0b1472.webp",
  "/manus-storage/DSC09269_5a5bf0c6.webp",
  "/manus-storage/DSC09255_e93a65fe.webp",
];

const OFFICE_PLACES_LEGACY = [
  { city: "上海 · 总部",       desc: "浦东张江产研一体化园区，1500m² 研发与办公空间。",  cover: NEWS_COVERS.cover01 },
  { city: "杭州 · 创新实验室", desc: "面向影像 AI 与硬件迭代的核心实验室。",            cover: NEWS_COVERS.cover02 },
  { city: "广州 · 深至医联",   desc: "国家药品批发资质 GSP 与院外网络运营总部。",        cover: NEWS_COVERS.cover06_1 },
];

const OPENINGS = [
  { k: "AI 算法工程师 · 影像/多模态", v: "Senz Brain · 深小至 / Neuro AI · 中高级", loc: "上海 / 杭州" },
  { k: "临床医学顾问 · 慢病方向",     v: "联合产品共建临床路径与疗效评估方案",       loc: "上海" },
  { k: "高级产品经理 · 医生侧",       v: "暖欣 Dx · 智能伙伴与科研协作方向",         loc: "上海 / 远程" },
  { k: "企业 BD · 药企",              v: "信欣 Px · 药企真实世界研究 / 商业证据网络", loc: "上海 / 北京 / 广州" },
  { k: "前端 / 设计 · 全平台",        v: "构建 web / app / 工作站统一体验",          loc: "上海 / 远程" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero
        index="05"
        en="Careers"
        title={CAREERS.title}
        desc={CAREERS.ending[0] + " — " + CAREERS.ending[1]}
        subs={CAREERS_SECTIONS}
        variant="mix"
        videoSrc={HERO_VIDEOS.careers}
        posterSrc={HERO_POSTERS.careers}
        tone="light"
      />

      {/* 三组文化 */}
      <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="05.0" en="Culture · Hiring Spirit" title="医疗 AI 赛道寻破局者，敢想敢干你就来" />
          <div className="mt-12 grid lg:grid-cols-3 gap-5">
            {CAREERS.groups.map((g, gi) => (
              <motion.div
                key={g.heading}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={gi}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-border bg-gradient-to-br from-white via-[#F8F6FF] to-white p-7"
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-display">
                  0{gi + 1}
                </div>
                <h3 className="mt-2 font-zh text-[20px] font-black text-foreground">{g.heading}</h3>
                <ul className="mt-5 space-y-4">
                  {g.items.map((it) => (
                    <li key={it.k}>
                      <div className="text-[13.5px] font-bold text-[#1E6BFF] font-zh">· {it.k}</div>
                      <div className="mt-1.5 text-[13px] leading-[1.85] text-foreground/70 font-zh">{it.v}</div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. 办公环境 — 纯图横向无限滚动 */}
      <section id="office" className="relative scroll-mt-24 bg-gradient-to-b from-[#F7F5FF] to-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="05.1" en="Workspace" title="办公环境" desc="上海总部与各研发中心的真实场景。" />
        </div>
        {/* full-bleed marquee */}
        <div className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max gap-5 px-5 animate-office-marquee hover:[animation-play-state:paused]">
            {[...OFFICE_PHOTOS, ...OFFICE_PHOTOS].map((src, i) => (
              <div
                key={i}
                className="relative shrink-0 h-[260px] sm:h-[320px] lg:h-[400px] aspect-[3/2] overflow-hidden rounded-3xl border border-border bg-white shadow-[0_30px_60px_-50px_rgba(30,107,255,0.45)]"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 员工活动：左愿景文案 + 右原文轮播图（Fade） */}
      <section id="life" className="relative scroll-mt-24 bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader
            index="05.2"
            en="Team Life"
            title="员工活动"
            desc="以患者第一为原点，交付确定性的健康结果"
          />

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center"
          >
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/45 font-display">
                Mission & Vision
              </div>
              <p className="mt-4 font-zh text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.95] text-foreground/80">
                {WECHAT_CULTURE_VISION_QUOTE}
              </p>
              <div className="mt-2 h-px w-16 bg-gradient-to-r from-[#1E6BFF] via-[#8A6BFF] to-[#FF77C3] rounded-full" aria-hidden />
              <a
                href={WECHAT_CULTURE_ARTICLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-[#1E6BFF] shadow-sm transition-colors hover:bg-[#F8F6FF] hover:border-[#1E6BFF]/30"
              >
                阅读原文：深至科技企业文化
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="order-1 lg:order-2 max-w-xl lg:max-w-none mx-auto w-full lg:mx-0">
              <CareersCultureCarousel />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. 开放职位 */}
      <section id="openings" className="relative scroll-mt-24 bg-gradient-to-b from-white to-[#F4F1FF] py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <SectionHeader index="05.3" en="Openings" title="开放职位" desc="AI 算法、临床医学、产品工程、销售与市场等持续招募中。" />
            <button
              onClick={() => toast("欢迎投递至 JoinUs@senzco.com")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1E6BFF] via-[#8A6BFF] to-[#FF77C3] px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_10px_30px_-12px_rgba(30,107,255,0.55)] hover:shadow-[0_14px_36px_-10px_rgba(138,107,255,0.55)] transition-shadow"
            >
              一键投递
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <ul className="mt-12 divide-y divide-border rounded-3xl border border-border bg-white overflow-hidden">
            {OPENINGS.map((o, i) => (
              <motion.li
                key={o.k}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="grid grid-cols-12 gap-4 items-center px-6 lg:px-8 py-5 hover:bg-[#F8F6FF] transition-colors"
              >
                <div className="col-span-12 lg:col-span-5 flex items-center gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E6BFF] to-[#8A6BFF] text-white shrink-0">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="font-zh text-[15.5px] font-bold text-foreground">{o.k}</div>
                </div>
                <div className="col-span-8 lg:col-span-5 text-[13px] text-foreground/70 font-zh">
                  {o.v}
                </div>
                <div className="col-span-4 lg:col-span-2 inline-flex items-center justify-end gap-1 text-[12.5px] text-foreground/60 font-zh">
                  <MapPin className="h-3.5 w-3.5" />
                  {o.loc}
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-12 rounded-3xl border border-border bg-gradient-to-r from-[#F4F1FF] via-[#FFF1F6] to-[#EAF2FF] px-8 lg:px-14 py-10 lg:py-14">
            <div className="font-display text-[20px] lg:text-[24px] font-bold text-foreground/85 leading-snug">
              {CAREERS.ending[0]}
            </div>
            <div className="mt-2 font-zh text-[20px] lg:text-[24px] font-bold text-foreground">
              {CAREERS.ending[1]}
            </div>
            <div className="mt-5 font-zh text-[14.5px] text-foreground/65">
              {CAREERS.ending[2]}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
