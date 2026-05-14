/**
 * 通用版块头：编号 / 英文 / 中文标题 / 副文案
 */
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionHeader({
  index,
  en,
  title,
  desc,
  align = "left",
  light = false,
  className,
  titleClassName,
}: {
  index?: string;
  en: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
  light?: boolean;
  /** 追加到外层容器，例如居中时加宽 max-w */
  className?: string;
  /** 覆盖标题字号等，例如 text-[36px] lg:text-[52px] */
  titleClassName?: string;
}) {
  const t = light ? "text-white" : "text-foreground";
  const sub = light ? "text-white/60" : "text-foreground/65";
  const tag = light ? "text-[#8FB3FF]" : "text-foreground/55";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" as const }}
      className={cn(
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className,
      )}
    >
      <div className={`text-[12px] font-medium uppercase tracking-[0.28em] font-display ${tag}`}>
        {index && <span className="mr-2">{index}</span>}
        {en}
      </div>
      <h2
        className={cn(
          "mt-4 font-zh leading-[1.12] font-black tracking-tight",
          t,
          titleClassName ?? "text-[32px] lg:text-[46px]",
        )}
      >
        {title}
      </h2>
      {desc && (
        <p className={`mt-5 text-[14.5px] lg:text-[15.5px] leading-[1.95] font-zh ${sub}`}>
          {desc}
        </p>
      )}
    </motion.div>
  );
}
