import { useEffect, useState } from "react";
import { NEWS_COVERS } from "@/lib/assets";

/** 列表行缩略图：固定外框（px），图片绝对定位铺满，不参与布局流 */
const ROW_THUMB_FRAME =
  "relative box-border h-[64px] w-[96px] shrink-0 grow-0 overflow-hidden rounded-xl lg:h-[72px] lg:w-[112px]";

/** 站内占坑图（与 news-data 无效链接占位、抓取脚本兜底一致） */
const PLACEHOLDER_COVER = NEWS_COVERS.cover02;

/** 数据里的 cover 优先；否则 OG；无图或加载失败则用占坑图 */
export function PreviewStoryMedia({
  title,
  link,
  dataCover,
  ogImage,
  layout,
  tone: _tone = "news",
}: {
  title: string;
  link: string;
  dataCover?: string;
  ogImage: string | null;
  layout: "featured" | "row";
  tone?: "news" | "csr";
}) {
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [ogImage, link, dataCover]);

  const primary = dataCover ?? ogImage ?? null;
  const src = loadFailed || !primary ? PLACEHOLDER_COVER : primary;

  const img = (
    <img
      src={src}
      alt={title}
      referrerPolicy="no-referrer"
      loading={layout === "row" ? "lazy" : undefined}
      draggable={false}
      onError={() => {
        if (src === PLACEHOLDER_COVER) return;
        setLoadFailed(true);
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
