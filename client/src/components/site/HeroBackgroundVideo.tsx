import { useRef, type CSSProperties } from "react";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";
import { useResponsiveVideo } from "@/hooks/useResponsiveVideo";
import { useVideoAspectRatio } from "@/hooks/useVideoAspectRatio";
import { cn } from "@/lib/utils";

type HeroBackgroundVideoProps = {
  src: string;
  poster?: string;
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
};

/**
 * Hero / 全幅背景视频
 * - 手机：object-contain + 视频 intrinsic 宽高比，完整画面、尺寸随视口变化
 * - 桌面：object-cover
 */
export default function HeroBackgroundVideo({
  src,
  poster,
  desktopClassName = "absolute inset-0",
  desktopStyle,
  objectPositionDesktop = "50% 55%",
  mobileInsetTopClassName = "top-16",
  mobileClassName,
  letterboxClassName = "bg-[#F4F1EA]",
  videoClassName,
  mobileObjectFit = "contain",
  desktopSlowMo = false,
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayVideo(videoRef, { desktopSlowMo });
  const { preload, objectFit, objectPosition } = useResponsiveVideo({
    objectPositionDesktop,
    // Hero 是首屏主视觉：桌面允许更积极的预取；移动端仍保持轻量。
    preloadDesktop: "auto",
    preloadMobile: "metadata",
  });
  const aspectRatio = useVideoAspectRatio(videoRef, src);

  const isContain = objectFit === "contain";

  return (
    <div
      className={cn(
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
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        autoPlay
        playsInline
        disablePictureInPicture
        preload={preload}
        className={cn(
          isContain && mobileObjectFit === "cover"
            ? "h-full w-full object-cover object-top"
            : isContain
              ? "h-auto w-full max-h-full object-contain object-top"
            : "h-full w-full object-cover",
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
