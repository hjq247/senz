/**
 * RibbonFlow — 高饱和多色丝带交织动效
 *
 * 设计要点：
 *  · 4 条独立"色带"：粉(#FF4DA6) · 紫(#7B5BFF) · 蓝(#1E6BFF) · 绿(#22D39E)
 *  · 每条色带由 ~22 根平行细线构成，整体走 sin/cos 复合波形
 *  · 4 条带相位 / 振幅 / 中线各不相同，在画面上自然「交织」
 *  · canvas globalCompositeOperation = 'screen' → 多色叠加发光（不会变浊）
 *  · 每条带额外画一根「核心高亮线」+ 主色光晕（shadowBlur）
 *  · 50+ 浮动粒子按位置取样色带颜色，强化空间深度
 *  · DPR 自适应；ResizeObserver 监听容器
 */
import { useEffect, useRef } from "react";

type Particle = {
  x: number; y: number; r: number;
  vx: number; vy: number; a: number; ax: number;
  band: number;
};

type Band = {
  /** 主色 */
  color: [number, number, number];
  /** 中线 y 偏移 (相对 height) */
  midOffset: number;
  /** 主振幅 / 副振幅（相对 height） */
  amp: number;
  amp2: number;
  /** 主波长系数（越大波越长） */
  k1: number;
  k2: number;
  /** 相位速度 */
  speed: number;
  /** 相位偏移 */
  phase0: number;
  /** 丝带方向：1=向右流，-1=向左流 */
  dir: 1 | -1;
};

const BANDS: Band[] = [
  { color: [255,  77, 166], midOffset: 0.42, amp: 0.20, amp2: 0.06, k1: 1.15, k2: 0.55, speed: 0.00055, phase0: 0,    dir:  1 }, // pink
  { color: [123,  91, 255], midOffset: 0.50, amp: 0.24, amp2: 0.07, k1: 1.05, k2: 0.62, speed: 0.00045, phase0: 1.2,  dir:  1 }, // purple
  { color: [ 30, 107, 255], midOffset: 0.60, amp: 0.18, amp2: 0.08, k1: 1.30, k2: 0.50, speed: 0.00065, phase0: 2.4,  dir: -1 }, // blue
  { color: [ 34, 211, 158], midOffset: 0.55, amp: 0.16, amp2: 0.05, k1: 1.45, k2: 0.70, speed: 0.00040, phase0: 3.6,  dir:  1 }, // green
];

export default function RibbonFlow({
  className,
  /** 每条色带的细线数量 */
  strandsPerBand = 36,
}: {
  className?: string;
  strandsPerBand?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const makeParticle = (W: number, H: number): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.6 + 0.8,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.55 + 0.25,
      ax: Math.random() * Math.PI * 2,
      band: Math.floor(Math.random() * BANDS.length),
    });

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.max(40, Math.round((w * h) / 16000));
      const list: Particle[] = [];
      for (let i = 0; i < target; i++) list.push(makeParticle(w, h));
      particlesRef.current = list;
    };

    const rgba = (c: [number, number, number], a: number) =>
      `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    const draw = (time: number) => {
      // 清空（透明，让父容器/页面背景透出）
      ctx.clearRect(0, 0, w, h);

      // 关键：screen 混合 → 多色叠加更亮、更通透
      ctx.globalCompositeOperation = "screen";

      const segCount = Math.max(110, Math.floor(w / 5));
      const stepX = w / segCount;

      for (let bi = 0; bi < BANDS.length; bi++) {
        const b = BANDS[bi];
        const midY = h * b.midOffset;
        const amp = h * b.amp;
        const amp2 = h * b.amp2;
        const k1 = (Math.PI * 2) / Math.max(700, w * 0.85) * b.k1;
        const k2 = (Math.PI * 2) / Math.max(380, w * 0.40) * b.k2;
        const phase1 = b.phase0 + time * b.speed * b.dir;
        const phase2 = b.phase0 * 0.7 + time * b.speed * 1.6 * b.dir;

        // 多根平行细线
        const half = strandsPerBand / 2;
        ctx.lineCap = "round";

        for (let s = 0; s < strandsPerBand; s++) {
          const offset = (s - half) * 2.6; // 每条线垂直偏移 (加粗丝带)
          // 中间最亮，两侧渐隐 → 形成"丝带"边缘柔化
          const edge = 1 - Math.abs(s - half) / half; // 0..1
          const alpha = 0.04 + edge * 0.22;

          ctx.beginPath();
          for (let i = 0; i <= segCount; i++) {
            const x = i * stepX;
            const localPhase = phase1 + s * 0.05;
            const localPhase2 = phase2 + s * 0.035;
            // 让丝带在中段产生轻微"翻转"扭曲：sin(x*k1*0.5+phase)*0.6
            const twist = Math.sin(x * k1 * 0.5 + localPhase * 1.1) * 0.65;
            const y =
              midY +
              offset * (1.4 + twist) +
              amp * Math.sin(x * k1 + localPhase) +
              amp2 * Math.sin(x * k2 + localPhase2);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          ctx.lineWidth = 1.1 + edge * 0.9;
          ctx.strokeStyle = rgba(b.color, alpha);
          ctx.stroke();
        }

        // 核心高亮线（带 shadowBlur 辉光）
        ctx.beginPath();
        for (let i = 0; i <= segCount; i++) {
          const x = i * stepX;
          const localPhase = phase1;
          const localPhase2 = phase2;
          const y =
            midY +
            amp * Math.sin(x * k1 + localPhase) +
            amp2 * Math.sin(x * k2 + localPhase2);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = 2.6;
        ctx.shadowColor = rgba(b.color, 0.55);
        ctx.shadowBlur = 18;
        ctx.strokeStyle = rgba(b.color, 0.6);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 粒子（仍 screen 混合，叠加更亮）
      const list = particlesRef.current;
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        p.ax += 0.006;
        p.x += p.vx + Math.sin(p.ax) * 0.08;
        p.y += p.vy + Math.cos(p.ax * 0.7) * 0.06;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const c = BANDS[p.band].color;
        ctx.beginPath();
        ctx.fillStyle = rgba(c, p.a * 0.45);
        ctx.shadowColor = rgba(c, 0.45);
        ctx.shadowBlur = 6;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 复位混合模式（防止下次帧外影响）
      ctx.globalCompositeOperation = "source-over";

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [strandsPerBand]);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
