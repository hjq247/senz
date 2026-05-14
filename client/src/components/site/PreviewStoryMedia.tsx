import { useEffect, useState } from "react";
import { Heart, Newspaper } from "lucide-react";

/** 列表行缩略图：固定外框（px），图片绝对定位铺满，不参与布局流 */
const ROW_THUMB_FRAME =
  "relative box-border h-[64px] w-[96px] shrink-0 grow-0 overflow-hidden rounded-xl lg:h-[72px] lg:w-[112px]";

/** 数据里的 cover 优先；否则用 OG；再失败则 null → 默认图标区 */
export function PreviewStoryMedia({
  title,
  link,
  dataCover,
  ogImage,
  layout,
  tone = "news",
}: {
  title: string;
  link: string;
  dataCover?: string;
  ogImage: string | null;
  layout: "featured" | "row";
  tone?: "news" | "csr";
}) {
  const [ogBroken, setOgBroken] = useState(false);

  useEffect(() => {
    setOgBroken(false);
  }, [ogImage, link, dataCover]);

  const src: string | null = dataCover ?? (ogImage && !ogBroken ? ogImage : null);

  if (!src) {
    if (layout === "featured") {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl bg-white/75 p-8 shadow-sm backdrop-blur-sm ring-1 ring-white/80">
            <Newspaper className="h-14 w-14 text-[#8A6BFF]" strokeWidth={1.25} aria-hidden />
          </div>
        </div>
      );
    }
    if (tone === "csr") {
      return (
        <div
          className={`${ROW_THUMB_FRAME} flex items-center justify-center bg-gradient-to-br from-[#FF77C3] to-[#8A6BFF] text-white shadow-sm`}
          aria-hidden
        >
          <Heart className="h-7 w-7 lg:h-8 lg:w-8" strokeWidth={1.5} />
        </div>
      );
    }
    return (
      <div
        className={`${ROW_THUMB_FRAME} flex items-center justify-center bg-gradient-to-br from-[#6B8CFF] to-[#B89BFF] text-white shadow-sm`}
        aria-hidden
      >
        <Newspaper className="h-7 w-7 lg:h-8 lg:w-8" strokeWidth={1.5} />
      </div>
    );
  }

  const img = (
    <img
      src={src}
      alt={title}
      referrerPolicy="no-referrer"
      loading={layout === "row" ? "lazy" : undefined}
      draggable={false}
      onError={() => {
        if (ogImage && src === ogImage) setOgBroken(true);
      }}
      className={
        layout === "featured"
          ? "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          : "pointer-events-none absolute inset-0 h-full w-full max-h-none max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.05]"
      }
    />
  );

  if (layout === "featured") {
    return img;
  }

  return <div className={ROW_THUMB_FRAME}>{img}</div>;
}
