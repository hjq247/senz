import { useEffect, useState } from "react";

const MOBILE_MQL = "(max-width: 767px)";

export type ResponsiveVideoAttrs = {
  preload: "auto" | "metadata" | "none";
  objectFit: "cover" | "contain";
  objectPosition: string;
  isMobile: boolean;
};

type Options = {
  objectPositionDesktop?: string;
  /** desktop preload strategy (default: metadata) */
  preloadDesktop?: ResponsiveVideoAttrs["preload"];
  /** mobile preload strategy (default: metadata) */
  preloadMobile?: ResponsiveVideoAttrs["preload"];
};

/** 手机 contain 完整画面；桌面 cover 铺满 */
export function useResponsiveVideo(options?: Options): ResponsiveVideoAttrs {
  const desktopPos = options?.objectPositionDesktop ?? "50% 55%";
  const preloadDesktop = options?.preloadDesktop ?? "metadata";
  const preloadMobile = options?.preloadMobile ?? "metadata";

  const [attrs, setAttrs] = useState<ResponsiveVideoAttrs>(() => ({
    preload: preloadDesktop,
    objectFit: "cover",
    objectPosition: desktopPos,
    isMobile: false,
  }));

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MQL);
    const apply = () => {
      const mobile = mql.matches;
      setAttrs({
        preload: mobile ? preloadMobile : preloadDesktop,
        objectFit: mobile ? "contain" : "cover",
        objectPosition: mobile ? "center top" : desktopPos,
        isMobile: mobile,
      });
    };
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, [desktopPos, preloadDesktop, preloadMobile]);

  return attrs;
}
