/**
 * PageHero — 子页统一大 Hero（真人实拍视频背景版）
 *  · 支持 tone="dark" | "light" 两套蒙层与文字色，按页面交错排布
 *  · 视频缺省时回落到 AuroraBackdrop（旧风格）
 *  · 同时支持 poster（同色系首帧静态图），避免弱网/未播放时黑场
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import AuroraBackdrop from "./AuroraBackdrop";
import { handleInPageHashNav } from "@/lib/inPageHashNav";

type SubItem = { id: string; label: string; en?: string };
type Tone = "dark" | "light";

export default function PageHero({
  index,
  en,
  title,
  desc,
  subs,
  variant,
  rightSlot,
  videoSrc,
  posterSrc,
  tone = "dark",
  subAnchorBase,
}: {
  index: string;
  en: string;
  title: string;
  desc?: string;
  subs?: readonly SubItem[];
  variant?: "blue" | "purple" | "pink" | "green" | "mix";
  rightSlot?: React.ReactNode;
  videoSrc?: string;
  posterSrc?: string;
  tone?: Tone;
  /** 若传入（如 "/news"），子导航链为 `/news#stories`，便于站内锚点与 wouter 协同。 */
  subAnchorBase?: string;
}) {
  const [loc] = useLocation();
  const isVideo = !!videoSrc;
  // 全站统一明亮彩调：保留 tone 参数但内部一律按 light 渲染
  // （历史上 dark tone 会压深色，现在所有页面都使用浅亮多彩蒙层）
  const dark = false;
  const light = isVideo;
  void tone;

  return (
    <section
      className={
        "relative isolate overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24 " +
        (dark
          ? "bg-[#0B0F1E] text-white min-h-screen"
          : light
            ? "bg-[#F4F1EA] text-foreground min-h-screen"
            : "bg-white")
      }
    >
      {isVideo ? (
        <>
          <video
            src={videoSrc}
            poster={posterSrc}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.92]"
          />
          {dark && (
            <>
              {/* 深底蒙层：左暗右淡 + 上下渐黑 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1E]/90 via-[#0B0F1E]/55 to-[#0B0F1E]/25" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1E]/55 via-transparent to-[#0B0F1E]/85" />
              <div
                aria-hidden
                className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(138,107,255,0.45), transparent)" }}
              />
              <div
                aria-hidden
                className="absolute bottom-[10%] right-[6%] h-[380px] w-[380px] rounded-full opacity-35 blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(255,119,195,0.35), transparent)" }}
              />
            </>
          )}
          {light && (
            <>
              {/* 浅底蒙层：左白右透 + 上下白雾 */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/65 to-white/30" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-transparent to-white/85" />
              <div
                aria-hidden
                className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full opacity-55 blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(255,182,213,0.55), transparent)" }}
              />
              <div
                aria-hidden
                className="absolute bottom-[10%] left-[6%] h-[420px] w-[420px] rounded-full opacity-45 blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(176,200,255,0.55), transparent)" }}
              />
            </>
          )}
        </>
      ) : (
        <AuroraBackdrop variant={variant ?? "mix"} />
      )}

      <div className="relative container">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <div
                className={
                  "inline-flex items-center gap-2 rounded-full backdrop-blur px-3 py-1 text-[11px] tracking-[0.28em] uppercase font-display " +
                  (dark
                    ? "border border-white/25 bg-white/10 text-white/80"
                    : light
                      ? "border border-foreground/12 bg-white/70 text-foreground/65"
                      : "border border-foreground/10 bg-white/60 text-foreground/65")
                }
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#1E6BFF] to-[#FF77C3]" />
                {index} · {en}
              </div>
              <h1
                className={
                  "mt-6 font-zh text-[40px] lg:text-[64px] leading-[1.05] font-black tracking-tight " +
                  (dark
                    ? "text-white [text-shadow:_0_2px_24px_rgba(0,0,0,0.45)]"
                    : "text-foreground")
                }
              >
                {title}
              </h1>
              {desc && (
                <p
                  className={
                    "mt-6 max-w-2xl text-[15px] lg:text-[17px] leading-[1.95] font-zh " +
                    (dark
                      ? "text-white/80 [text-shadow:_0_1px_10px_rgba(0,0,0,0.35)]"
                      : "text-foreground/70")
                  }
                >
                  {desc}
                </p>
              )}

              {subs && subs.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-2">
                  {subs.map((s, i) => {
                    const subHref = subAnchorBase
                      ? `${subAnchorBase.replace(/\/$/, "")}#${s.id}`
                      : `#${s.id}`;
                    return (
                    <li key={s.id}>
                      <a
                        href={subHref}
                        onClick={(e) =>
                          subAnchorBase && handleInPageHashNav(e, subHref, loc)
                        }
                        className={
                          "group inline-flex items-center gap-2 rounded-full backdrop-blur px-4 py-2 text-[13px] font-medium transition-colors " +
                          (dark
                            ? "border border-white/25 bg-white/10 text-white/85 hover:bg-white/20 hover:border-white/50"
                            : light
                              ? "border border-foreground/12 bg-white/75 text-foreground/75 hover:text-[#1E6BFF] hover:border-[#1E6BFF]/40"
                              : "border border-foreground/10 bg-white/70 text-foreground/75 hover:text-[#1E6BFF] hover:border-[#1E6BFF]/40")
                        }
                      >
                        <span
                          className={
                            "font-display text-[10.5px] tracking-[0.18em] " +
                            (dark ? "text-white/55" : "text-foreground/40")
                          }
                        >
                          0{i + 1}
                        </span>
                        <span className="font-zh">{s.label}</span>
                      </a>
                    </li>
                    );
                  })}
                </ul>
              )}
            </motion.div>
          </div>
          {rightSlot && (
            <div className="lg:col-span-4 relative">{rightSlot}</div>
          )}
        </div>
      </div>
    </section>
  );
}
