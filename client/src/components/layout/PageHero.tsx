/**
 * PageHero — 子页统一大 Hero（真人实拍视频背景版）
 *  · 文案左下角；视频蒙层与首页 Hero 一致
 *  · 视频缺省时回落到 AuroraBackdrop
 */
import { useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import AuroraBackdrop from "./AuroraBackdrop";
import { handleInPageHashNav } from "@/lib/inPageHashNav";
import { HeroVideoLightOverlays } from "@/lib/hero-video-overlays";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";

type SubItem = {
  id: string;
  label: string;
  en?: string;
  fullHref?: string;
};

export default function PageHero({
  index,
  en,
  title,
  desc,
  subs,
  variant,
  rightSlot,
  videoSrc,
  posterSrc,
  tone = "dark",
  subAnchorBase,
}: {
  index: string;
  en: string;
  title: string;
  desc?: string;
  subs?: readonly SubItem[];
  variant?: "blue" | "purple" | "pink" | "green" | "mix";
  rightSlot?: React.ReactNode;
  videoSrc?: string;
  posterSrc?: string;
  tone?: "dark" | "light";
  subAnchorBase?: string;
}) {
  const [loc] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = !!videoSrc;
  useAutoplayVideo(videoRef);
  void tone;

  return (
    <section
      className={
        "relative isolate overflow-hidden min-h-screen flex flex-col " +
        (isVideo ? "bg-[#F4F1EA] text-foreground" : "bg-white pt-28 lg:pt-36 pb-16 lg:pb-24")
      }
    >
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 55%" }}
          />
          <HeroVideoLightOverlays />
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
        </>
      ) : (
        <AuroraBackdrop variant={variant ?? "mix"} />
      )}

      <div
        className={
          "relative z-10 flex flex-col flex-1 " +
          (isVideo ? "pt-28 lg:pt-36 pb-16 lg:pb-20" : "")
        }
      >
        <motion.div
          className={`container flex flex-1 flex-col ${isVideo ? "justify-end" : "justify-start"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <motion.div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 xl:col-span-7">
              <div
                className={
                  "inline-flex items-center gap-2 rounded-full backdrop-blur px-3 py-1 text-[11px] tracking-[0.28em] uppercase font-display " +
                  (isVideo
                    ? "border border-foreground/12 bg-white/70 text-foreground/65"
                    : "border border-foreground/10 bg-white/60 text-foreground/65")
                }
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#1E6BFF] to-[#FF77C3]" />
                {index} · {en}
              </div>
              <h1 className="mt-5 font-zh text-[34px] sm:text-[40px] lg:text-[56px] xl:text-[64px] leading-[1.08] font-black tracking-tight text-foreground">
                {title}
              </h1>
              {desc && (
                <p className="mt-5 max-w-2xl text-[15px] lg:text-[17px] leading-[1.9] font-zh text-foreground/72">
                  {desc}
                </p>
              )}

              {subs && subs.length > 0 && (
                <ul className="mt-7 flex flex-wrap gap-2">
                  {subs.map((s, i) => {
                    const subHref =
                      "fullHref" in s && s.fullHref
                        ? s.fullHref
                        : subAnchorBase
                          ? `${subAnchorBase.replace(/\/$/, "")}#${s.id}`
                          : `#${s.id}`;
                    return (
                      <li key={s.id}>
                        <a
                          href={subHref}
                          onClick={(e) =>
                            subAnchorBase && handleInPageHashNav(e, subHref, loc)
                          }
                          className={
                            "group inline-flex items-center gap-2 rounded-full backdrop-blur px-4 py-2 text-[13px] font-medium transition-colors border border-foreground/12 bg-white/75 text-foreground/75 hover:text-[#1E6BFF] hover:border-[#1E6BFF]/40"
                          }
                        >
                          <span className="font-display text-[10.5px] tracking-[0.18em] text-foreground/40">
                            0{i + 1}
                          </span>
                          <span className="font-zh">{s.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {rightSlot && (
              <div className="lg:col-span-4 relative hidden lg:block">{rightSlot}</div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
