/** 与首页 Hero 一致的视频蒙层：左侧 + 底部白雾，保证左下角文案可读 */
export function HeroVideoLightOverlays() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.42) 28%, rgba(255,255,255,0.15) 48%, rgba(255,255,255,0.0) 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%]"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 60%, rgba(255,255,255,0.0) 100%)",
        }}
      />
    </>
  );
}
