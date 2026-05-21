/**
 * VideoCard
 * - autoplay + muted + loop + playsInline 静默循环播放
 * - 出视口自动暂停（节能）
 * - 可选 poster 海报兜底
 *  · 设计哲学：参考 Tempus，视频不是装饰，而是内容本身。
 *  · 动效：仅靠视频自身循环 + 容器淡入上移，不堆砌额外动画。
 */
import { useEffect, useRef, useState } from "react";
import { useResponsiveVideo } from "@/hooks/useResponsiveVideo";
import { useVideoAspectRatio } from "@/hooks/useVideoAspectRatio";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  src: string;
  previewSrc?: string;
  poster?: string;
  className?: string;
  /** object-fit, default cover */
  fit?: "cover" | "contain";
  /** aspect ratio override, e.g. "16 / 9", "1 / 1", "4 / 3" */
  aspect?: string;
  /** 圆角 tailwind 类，默认 rounded-3xl */
  radius?: string;
  /** Tailwind border 类，默认 border border-border */
  border?: string;
  /** 视频标题 alt 用，纯视觉装饰可省略 */
  label?: string;
  /** 上叠白透明蒙层与降饱和、让画面更柔和（默认 false） */
  softWash?: boolean;
}

export default function VideoCard({
  src,
  previewSrc,
  poster,
  className = "",
  fit = "cover",
  aspect = "16 / 9",
  radius = "rounded-3xl",
  border = "border border-border",
  label,
  softWash = false,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const [activated, setActivated] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [highPlaying, setHighPlaying] = useState(false);
  const { objectFit } = useResponsiveVideo();
  const aspectRatio = useVideoAspectRatio(videoRef, src);
  const effectiveFit = fit === "contain" ? "contain" : objectFit;
  const hasPreview = !!previewSrc;

  useEffect(() => {
    const v = videoRef.current;
    const pv = previewVideoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!activated) {
              // 非首屏视频：先不预加载，进入视口再开始取元数据/拉流，避免一上来多路抢资源。
              setActivated(true);
              try {
                if (hasPreview && pv) {
                  pv.preload = "auto";
                  pv.load();
                } else {
                  v.preload = "metadata";
                  v.load();
                }
              } catch {}
            }
            if (hasPreview && !highPlaying) {
              pv?.play().catch(() => {});
            } else {
              v.play().catch(() => {});
            }
          } else {
            v.pause();
            pv?.pause();
          }
        }
      },
      { threshold: 0.1 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [activated, hasPreview, highPlaying]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !hasPreview || !previewPlaying) return;
    try {
      v.preload = "metadata";
      v.load();
      v.play().catch(() => {});
    } catch {}
  }, [hasPreview, previewPlaying]);

  const fitClass =
    effectiveFit === "contain"
      ? "h-full w-full object-contain object-top"
      : "h-full w-full object-cover";
  const layerClass = "absolute inset-0";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#F5F2FF]",
        effectiveFit === "contain" && "flex items-start justify-center",
        radius,
        border,
        className
      )}
      style={{ aspectRatio: aspect }}
      aria-label={label}
    >
      {hasPreview ? (
        <video
          ref={previewVideoRef}
          src={previewSrc}
          poster={poster}
          muted
          loop
          playsInline
          preload={activated ? "auto" : "none"}
          onPlaying={() => setPreviewPlaying(true)}
          className={cn(
            layerClass,
            fitClass,
            "transition-opacity duration-500",
            highPlaying ? "opacity-0" : "opacity-100"
          )}
          style={{
            aspectRatio:
              effectiveFit === "contain" && aspectRatio ? aspectRatio : undefined,
            ...(softWash
              ? { filter: "saturate(0.78) brightness(1.04) contrast(0.96)" }
              : {}),
          }}
          aria-hidden
        />
      ) : null}
      <video
        ref={videoRef}
        src={src}
        poster={hasPreview ? undefined : poster}
        muted
        loop
        playsInline
        preload={
          hasPreview && !previewPlaying
            ? "none"
            : activated
              ? "metadata"
              : "none"
        }
        onPlaying={() => setHighPlaying(true)}
        className={cn(
          layerClass,
          fitClass,
          hasPreview && !highPlaying && "opacity-0",
          hasPreview && highPlaying && "opacity-100 transition-opacity duration-500"
        )}
        style={{
          aspectRatio:
            effectiveFit === "contain" && aspectRatio ? aspectRatio : undefined,
          ...(softWash
            ? { filter: "saturate(0.78) brightness(1.04) contrast(0.96)" }
            : {}),
        }}
      />
      {/* 柔和蒙层：白色微透明渐变，降低色彩对比强度 */}
      {softWash && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(248,244,255,0.10) 50%, rgba(255,238,247,0.16) 100%)",
          }}
        />
      )}
      {/* 顶部细高光线，呼应 Tempus 风格 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
}
