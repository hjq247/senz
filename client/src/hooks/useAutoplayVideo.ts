import { useEffect, type RefObject } from "react";

const INTRO_ENDED_EVENT = "senz:intro-ended";

type Options = {
  /** 桌面端慢放（移动端强制 1，避免 WebKit 阻断静音自动播放） */
  desktopSlowMo?: boolean;
  slowRate?: number;
  enabled?: boolean;
};

/** 移动端/iOS 静音内联自动播放：属性 + 可见性/触摸/开屏结束后重试 play() */
export function useAutoplayVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  options?: Options
) {
  const { desktopSlowMo = false, slowRate = 0.7, enabled = true } =
    options ?? {};

  useEffect(() => {
    if (!enabled) return;
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("disableRemotePlayback", "");

    // 不要在这里强行覆盖 preload：页面可能希望用 metadata/none 来避免一次性拉很多视频。
    // iOS 的 autoplay 失败更多来自策略限制，靠重试/解锁即可。

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
    // 有少量缓冲即可尝试播放，不必等 canplaythrough
    v.addEventListener("canplaythrough", tryPlay, { once: true });

    const onVis = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    const unlock = () => tryPlay();
    document.addEventListener("touchstart", unlock, { once: true, passive: true });
    document.addEventListener("click", unlock, { once: true });
    window.addEventListener(INTRO_ENDED_EVENT, unlock);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) tryPlay();
      },
      { threshold: 0.15 }
    );
    io.observe(v);

    return () => {
      v.removeEventListener("loadedmetadata", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVis);
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
      window.removeEventListener(INTRO_ENDED_EVENT, unlock);
      io.disconnect();
    };
  }, [videoRef, desktopSlowMo, slowRate, enabled]);
}
