/**
 * Senz · Home Hero (v8 — 视频为主、文字让位)
 *
 * 设计意图：
 *  · 视频是绝对主角，全幅 16:9 占满
 *  · 文字克制：标题缩小至 28~44px，宽度限制在左侧 5/12 栏内
 *  · 蒙层：仅在左侧 + 顶部 + 底部薄薄的白雾，不再压视频中央人物
 *  · 整页 100% 缩放下，视频中央仍清晰可见，无文字遮挡
 */
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { HERO } from "@/lib/copy";
import { HERO_SPLIT } from "@/lib/videos";
import HeroBackgroundVideo from "@/components/site/HeroBackgroundVideo";
import { HeroVideoLightOverlays } from "@/lib/hero-video-overlays";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#F4F1EA] text-foreground min-h-[860px] flex flex-col lg:min-h-[100dvh] lg:h-screen"
    >
      <HeroBackgroundVideo
        src={HERO_SPLIT.rightVideo}
        poster={HERO_SPLIT.rightPoster}
        objectPositionDesktop="50% 65%"
        mobileClassName="absolute inset-x-0 top-16 flex h-[360px] items-start justify-center sm:h-[420px] lg:inset-x-0 lg:bottom-0 lg:top-[88px] lg:h-[calc(100%-88px)]"
        mobileObjectFit="cover"
        desktopClassName="absolute inset-x-0 bottom-0 top-[88px] h-[calc(100%-88px)] w-full"
        desktopSlowMo
      />

      <HeroVideoLightOverlays />

      {/* 彩色光晕 — 关于深至同款多彩，但放在两侧不遮中央 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full opacity-55 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,182,213,0.55), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[12%] left-[-160px] h-[380px] w-[380px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(176,200,255,0.55), transparent)",
        }}
      />

      {/* ============== 顶部细字幕条 ============== */}
      <div className="relative z-10 pt-[455px] lg:pt-24">
        <div className="container flex items-center justify-between text-[11px] tracking-[0.22em] uppercase font-display text-foreground/65">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/12 bg-white/70 backdrop-blur-md px-3 py-1.5 shadow-[0_4px_18px_-8px_rgba(40,30,90,0.18)]"
          >
            <Sparkles className="h-3 w-3 text-[#FF77C3]" />
            <span className="text-foreground/75">
              Senz · An AI-Native Healthcare Company
            </span>
          </motion.div>
        </div>
      </div>

      {/* ============== 文案：左下角，给视频最大可视面积 ============== */}
      <div className="relative z-10 flex flex-none items-start pb-10 pt-6 lg:flex-1 lg:items-end lg:pb-20 lg:pt-0">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-9 md:col-span-7 lg:col-span-5 xl:col-span-5">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18 }}
                className="font-zh font-black tracking-tight text-foreground text-[24px] sm:text-[28px] md:text-[34px] lg:text-[38px] xl:text-[44px] leading-[1.14]"
              >
                从医学影像出发，
                <br className="hidden sm:block" />
                交付
                <span className="text-senz-grad-ppb inline-block animate-grad-breath">
                  确定性
                </span>
                的健康结果
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.32 }}
                className="mt-4 max-w-[480px] text-[13px] lg:text-[14.5px] leading-[1.8] text-foreground/72 font-zh"
              >
                {HERO.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.42 }}
                className="mt-6 flex flex-wrap items-center gap-2.5"
              >
                <Button
                  size="default"
                  className="h-10 px-5 rounded-full bg-foreground text-white hover:bg-foreground/85 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)] text-[13px]"
                  onClick={() =>
                    document
                      .getElementById("solutions")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  了解我们的产品体系
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="h-10 px-5 rounded-full border-foreground/20 bg-white/70 text-foreground backdrop-blur hover:bg-white text-[13px]"
                  onClick={() =>
                    document
                      .getElementById("capabilities")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  了解平台技术
                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ============== 底栏 marquee ============== */}
      <div className="relative z-10">
        <div className="overflow-hidden border-t border-foreground/10 bg-white/65 backdrop-blur">
          <div className="flex gap-14 py-3 whitespace-nowrap animate-marquee text-foreground/60 text-[11.5px] tracking-[0.22em] font-display uppercase">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-14 shrink-0">
                <span>· AI Native × Real-World Data</span>
                <span>· From Imaging to Outcome</span>
                <span>· 35,000+ Terminals</span>
                <span>· Neuro AI</span>
                <span>· 信欣健康 Px</span>
                <span>· 橙欣健康 Cx</span>
                <span>· 暖欣健康 Dx</span>
                <span>· 国家级专精特新</span>
                <span>· 健康结果管理</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
