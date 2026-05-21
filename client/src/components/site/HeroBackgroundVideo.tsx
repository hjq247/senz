import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";
import { useResponsiveVideo } from "@/hooks/useResponsiveVideo";
import { useVideoAspectRatio } from "@/hooks/useVideoAspectRatio";
import { cn } from "@/lib/utils";

type HeroBackgroundVideoProps = {
  src: string;
  /** 极小低清视频：先播放，高清可播后淡入替换 */
  previewSrc?: string;
  poster?: string;
  /** video[poster] 属性兜底图（如 PNG），与 poster 分层显示时可选 */
  posterFallback?: string;
  /** 首屏 Hero：叠一层 poster 图，视频开始播放后再淡出 */
  eager?: boolean;
  /** 桌面端视频容器定位 */
  desktopClassName?: string;
  /** 手机 contain 时顶部偏移（避让固定导航），默认 top-16 */
  mobileInsetTopClassName?: string;
  /** 手机 contain 容器自定义定位与尺寸 */
  mobileClassName?: string;
  desktopStyle?: CSSProperties;
  objectPositionDesktop?: string;
  letterboxClassName?: string;
  videoClassName?: string;
  mobileObjectFit?: "contain" | "cover";
  desktopSlowMo?: boolean;
  preloadDesktop?: "auto" | "metadata" | "none";
  preloadMobile?: "auto" | "metadata" | "none";
};

/**
 * Hero / 全幅背景视频
 * - 手机：object-contain + 视频 intrinsic 宽高比，完整画面、尺寸随视口变化
 * - 桌面：object-cover
 * - eager：首屏先显示 poster 图，视频可播后立即淡入，避免长时间空白
 */
export default function HeroBackgroundVideo({
  src,
  previewSrc,
  poster,
  posterFallback,
  eager = false,
  desktopClassName = "absolute inset-0",
  desktopStyle,
  objectPositionDesktop = "50% 55%",
  mobileInsetTopClassName = "top-16",
  mobileClassName,
  letterboxClassName = "bg-[#F4F1EA]",
  videoClassName,
  mobileObjectFit = "contain",
  desktopSlowMo = false,
  preloadDesktop = "metadata",
  preloadMobile = "metadata",
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const hasPreview = !!previewSrc;
  useAutoplayVideo(videoRef, {
    desktopSlowMo,
    enabled: !hasPreview || isPreviewPlaying,
  });
  useAutoplayVideo(previewVideoRef, { enabled: hasPreview });
  const { preload, objectFit, objectPosition } = useResponsiveVideo({
    objectPositionDesktop,
    preloadDesktop,
    preloadMobile,
  });
  const aspectRatio = useVideoAspectRatio(videoRef, src);

  const isContain = objectFit === "contain";

  useLayoutEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (eager && !hasPreview) {
      v.setAttribute("fetchpriority", "high");
      try {
        v.load();
      } catch {
        /* ignore */
      }
    }
  }, [eager, hasPreview, src]);

  useLayoutEffect(() => {
    const v = videoRef.current;
    if (!v || !hasPreview || !isPreviewPlaying) return;
    v.setAttribute("fetchpriority", "low");
    v.preload = preload;
    try {
      v.load();
      void v.play().catch(() => {});
    } catch {
      /* ignore */
    }
  }, [hasPreview, isPreviewPlaying, preload, src]);

  const fitClass =
    isContain && mobileObjectFit === "cover"
      ? "h-full w-full object-cover object-top"
      : isContain
        ? "h-full w-full object-contain object-top"
        : "h-full w-full object-cover";
  const layerClass = "absolute inset-0";

  return (
    <div
      className={cn(
        "z-0 overflow-hidden",
        isContain
          ? mobileClassName
            ? cn(mobileClassName, letterboxClassName)
            : cn(
                "absolute inset-x-0 bottom-0 flex items-start justify-center",
                mobileInsetTopClassName,
                letterboxClassName
              )
          : cn(desktopClassName, letterboxClassName)
      )}
      style={isContain ? undefined : desktopStyle}
    >
      {eager && poster ? (
        <img
          src={poster}
          alt=""
          decoding="async"
          fetchPriority="high"
          className={cn(
            layerClass,
            "transition-opacity duration-300",
            fitClass,
            isPlaying || isPreviewPlaying
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          )}
          style={{ objectPosition }}
        />
      ) : null}
      {hasPreview ? (
        <video
          ref={previewVideoRef}
          src={previewSrc}
          poster={poster}
          muted
          loop
          autoPlay
          playsInline
          disablePictureInPicture
          preload="auto"
          onPlaying={() => setIsPreviewPlaying(true)}
          className={cn(
            layerClass,
            fitClass,
            "transition-opacity duration-500",
            isPlaying ? "opacity-0" : "opacity-100",
            videoClassName
          )}
          style={{
            aspectRatio:
              isContain && mobileObjectFit === "contain" && aspectRatio
                ? aspectRatio
                : undefined,
            objectPosition,
            filter: isPlaying ? undefined : "saturate(0.92) blur(0.25px)",
          }}
          aria-hidden
        />
      ) : null}
      <video
        ref={videoRef}
        src={src}
        poster={hasPreview ? undefined : posterFallback ?? poster}
        muted
        loop
        autoPlay
        playsInline
        disablePictureInPicture
        preload={hasPreview && !isPreviewPlaying ? "metadata" : preload}
        onPlaying={() => setIsPlaying(true)}
        className={cn(
          layerClass,
          fitClass,
          (eager || hasPreview) && !isPlaying && "opacity-0",
          (eager || hasPreview) &&
            isPlaying &&
            "opacity-100 transition-opacity duration-500",
          videoClassName
        )}
        style={{
          aspectRatio:
            isContain && mobileObjectFit === "contain" && aspectRatio
              ? aspectRatio
              : undefined,
          objectPosition,
        }}
      />
    </div>
  );
}
