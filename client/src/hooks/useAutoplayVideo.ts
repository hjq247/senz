import { useEffect, type RefObject } from "react";

type Options = {
  /** 桌面端慢放（移动端强制 1，避免 WebKit 阻断静音自动播放） */
  desktopSlowMo?: boolean;
  slowRate?: number;
};

/** 移动端/iOS 静音内联自动播放：属性 + 多次 play() 重试 */
export function useAutoplayVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  options?: Options
) {
  const { desktopSlowMo = false, slowRate = 0.7 } = options ?? {};

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const applyRate = () => {
      if (!desktopSlowMo) return;
      const allowSlowMo = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      v.playbackRate = allowSlowMo ? slowRate : 1;
    };

    const tryPlay = () => {
      applyRate();
      const p = v.play();
      if (p !== undefined) void p.catch(() => {});
    };

    tryPlay();
    v.addEventListener("loadedmetadata", tryPlay);
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);

    const onVis = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      v.removeEventListener("loadedmetadata", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [videoRef, desktopSlowMo, slowRate]);
}
