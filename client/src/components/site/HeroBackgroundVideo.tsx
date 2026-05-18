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
  desktopStyle?: CSSProperties;
  objectPositionDesktop?: string;
  letterboxClassName?: string;
  videoClassName?: string;
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
  letterboxClassName = "bg-[#F4F1EA]",
  videoClassName,
  desktopSlowMo = false,
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayVideo(videoRef, { desktopSlowMo });
  const { preload, objectFit, objectPosition } = useResponsiveVideo({
    objectPositionDesktop,
  });
  const aspectRatio = useVideoAspectRatio(videoRef, src);

  const isContain = objectFit === "contain";

  return (
    <div
      className={cn(
        isContain
          ? cn(
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
        preload={preload}
        className={cn(
          isContain
            ? "max-h-full max-w-full object-contain object-top"
            : "h-full w-full object-cover",
          videoClassName
        )}
        style={{
          aspectRatio: isContain && aspectRatio ? aspectRatio : undefined,
          objectPosition,
          width: isContain ? "auto" : undefined,
          height: isContain ? "auto" : undefined,
        }}
      />
    </div>
  );
}
