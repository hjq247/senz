import { useEffect, useState, type RefObject } from "react";

/** 从 video 元数据读取宽高比，供 contain 布局动态适配 */
export function useVideoAspectRatio(
  videoRef: RefObject<HTMLVideoElement | null>,
  src?: string
) {
  const [aspectRatio, setAspectRatio] = useState<string | undefined>();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const apply = () => {
      const { videoWidth, videoHeight } = v;
      if (videoWidth > 0 && videoHeight > 0) {
        setAspectRatio(`${videoWidth} / ${videoHeight}`);
      }
    };

    apply();
    v.addEventListener("loadedmetadata", apply);
    return () => v.removeEventListener("loadedmetadata", apply);
  }, [videoRef, src]);

  return aspectRatio;
}
