/**
 * IntroSplash — 首次进入网站的品牌开屏动画
 * 步骤：极光光带从两侧滑入 → Logo + 品牌字逐字出现 → 进度条 → 整屏向上扯起淡出
 * 仅在每个 sessionStorage 周期首次进入首页时播放
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SENZ_LOGO } from "@/lib/assets";

const KEY = "senz_intro_v1_played";

export default function IntroSplash() {
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (window.location.pathname !== "/") return false;
    return sessionStorage.getItem(KEY) !== "1";
  });

  useEffect(() => {
    if (!show) return;
    // 锁定滚动
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setShow(false);
    }, 2600);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] overflow-hidden bg-[#070A1A] text-white"
          aria-hidden
        >
          {/* 背景星点 */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.6), transparent 50%), radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.5), transparent 50%), radial-gradient(1.4px 1.4px at 80% 20%, rgba(255,255,255,0.5), transparent 50%), radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.45), transparent 50%)",
            }}
          />

          {/* 4 条极光光带从两侧滑入并交错 */}
          {[
            { color: "#1E6BFF", from: "-100%", top: "16%", delay: 0.05, dur: 1.6 },
            { color: "#8A6BFF", from: "-100%", top: "38%", delay: 0.18, dur: 1.7 },
            { color: "#FF77C3", from: "100%", top: "56%", delay: 0.1, dur: 1.7 },
            { color: "#22D39E", from: "100%", top: "74%", delay: 0.22, dur: 1.8 },
          ].map((b, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-[2px]"
              style={{
                top: b.top,
                background: `linear-gradient(90deg, transparent, ${b.color}, transparent)`,
                filter: `drop-shadow(0 0 16px ${b.color})`,
              }}
              initial={{ x: b.from, opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              transition={{ delay: b.delay, duration: b.dur, ease: [0.22, 0.61, 0.36, 1] }}
            />
          ))}

          {/* 中央光晕 */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(138,107,255,0.45), rgba(255,119,195,0.25) 40%, transparent 70%)",
              filter: "blur(20px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Logo + 品牌句 */}
          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center">
            <motion.img
              src={SENZ_LOGO}
              alt="Senz"
              className="h-10 lg:h-12 w-auto"
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
              style={{ filter: "brightness(0) invert(1)" }}
            />

            <motion.div
              className="mt-6 text-[12px] tracking-[0.45em] uppercase text-white/60 font-display"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.45em" }}
              transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
            >
              AI Native · Real-World Data
            </motion.div>

            <motion.h1
              className="mt-4 font-zh text-[28px] lg:text-[34px] font-black tracking-tight text-center"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.85, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-[#FF77C3] via-[#8A6BFF] to-[#1E6BFF] bg-clip-text text-transparent">
                确定性
              </span>
              <span className="text-white/90">的健康结果</span>
            </motion.h1>

            {/* 进度条 */}
            <div className="mt-10 h-[2px] w-[220px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, #1E6BFF, #8A6BFF 40%, #FF77C3 70%, #22D39E)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: [0.22, 0.61, 0.36, 1], delay: 0.5 }}
              />
            </div>

            <motion.div
              className="mt-3 text-[10.5px] tracking-[0.32em] uppercase text-white/45 font-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              Initializing Senz Intelligence
            </motion.div>
          </div>

          {/* 顶部 + 底部细线 */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
