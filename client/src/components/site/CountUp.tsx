import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  to: number;
  duration?: number; // seconds
  prefix?: string;
  suffix?: string;
  separator?: boolean; // 千位分隔
  className?: string;
  decimals?: number;
}

export default function CountUp({
  to,
  duration = 1.6,
  prefix = "",
  suffix = "",
  separator = true,
  className,
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(eased * to);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const fmt = (n: number) => {
    const fixed = n.toFixed(decimals);
    if (!separator) return fixed;
    const [a, b] = fixed.split(".");
    const withSep = a.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return b ? `${withSep}.${b}` : withSep;
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {fmt(val)}
      {suffix}
    </span>
  );
}
