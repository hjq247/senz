/**
 * AuroraBackdrop — 通用极光背景：四色漂浮 orb + 网格 + 顶部细线
 * 用在每个详情页的 page hero 区，提供"很大块"的动态视觉。
 */
import { motion } from "framer-motion";

export default function AuroraBackdrop({
  variant = "blue",
}: {
  variant?: "blue" | "purple" | "pink" | "green" | "mix";
}) {
  const map = {
    blue:   ["#1E6BFF", "#8A6BFF"],
    purple: ["#8A6BFF", "#FF77C3"],
    pink:   ["#FF77C3", "#8A6BFF"],
    green:  ["#2AC58E", "#1E6BFF"],
    mix:    ["#1E6BFF", "#FF77C3"],
  } as const;
  const [c1, c2] = map[variant];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 70% 30%, #000 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 30%, #000 0%, transparent 70%)",
        }}
      />
      {/* aurora top hairline */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#1E6BFF] via-[#8A6BFF] via-[#FF77C3] to-[#2AC58E]" />

      {/* orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[640px] w-[640px] rounded-full blur-3xl opacity-60"
        style={{ background: `radial-gradient(closest-side, ${c1}66, transparent)` }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 right-[-120px] h-[560px] w-[560px] rounded-full blur-3xl opacity-55"
        style={{ background: `radial-gradient(closest-side, ${c2}55, transparent)` }}
        animate={{ x: [0, -50, 30, 0], y: [0, 60, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-160px] left-1/3 h-[460px] w-[460px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(closest-side, #2AC58E55, transparent)" }}
        animate={{ x: [0, 40, -40, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
