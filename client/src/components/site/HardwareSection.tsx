/**
 * Senz Aurora — Hardware / 原生 AI 终端体系
 * 风格：深色嵌入子版块（对应 demo.senz.cloud 的视觉语言），
 *       鼠标滚动驱动 —— 超声探头随滚动旋转、缩放、位移；大字"senz 330"背景浮现；
 *       之后切换到 MR/CT 硬件矩阵。
 *
 * 实现：使用 sticky pin + scroll progress，配合 transform/opacity 插值（不依赖 GSAP）。
 */
import { useEffect, useRef, useState } from "react";
import { ULTRASOUND_PROBE, MR_SCANNER } from "@/lib/assets";

// 当滚动 progress 在 [start, end] 区间时，返回 0~1 的线性插值
function mapRange(p: number, start: number, end: number) {
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / (end - start);
}

const HARDWARE_MATRIX = [
  {
    name: "超声 · Ultrasound",
    status: "已拿证 · 规模化落地",
    feature: "成本最低、覆盖最广",
    desc: "深度嵌入泛临床多场景工作流，作为高频影像入口，确立真实世界数据的广度与密度优势。",
    color: "#1E6BFF",
  },
  {
    name: "MR · 磁共振",
    status: "已拿证 · 行业先发",
    feature: "最低场强、最优画质",
    desc: "突破物理与场地限制，解锁床旁 / 急重症等稀缺数据场景，以算法重新定义成像标准。",
    color: "#A58BFF",
  },
  {
    name: "CT · 计算机断层",
    status: "开放合作 · 推进中",
    feature: "多模态补全、流程重构",
    desc: "连接主流厂商设备，以 AI 工作流重构诊疗与健康管理流程，补齐多模态数据闭环。",
    color: "#F6A1C9",
  },
];

export default function HardwareSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 across the scroll pin

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      // scroll distance == height - viewport
      const total = el.offsetHeight - viewport;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // animation keyframes across progress
  // 0.00 ~ 0.15 : senz 330 text fade in
  // 0.15 ~ 0.45 : probe rises from below + rotates
  // 0.45 ~ 0.65 : probe settles center
  // 0.65 ~ 1.00 : matrix of MR/CT slides in
  const titleOp = mapRange(progress, 0.02, 0.15);
  const probeOp = mapRange(progress, 0.1, 0.35);
  const probeY = 120 - 120 * mapRange(progress, 0.1, 0.45); // translateY px
  const probeRot = -20 + 50 * mapRange(progress, 0.15, 0.55); // rotate deg
  const probeScale = 0.85 + 0.25 * mapRange(progress, 0.2, 0.6);
  const lmutOp = mapRange(progress, 0.45, 0.6) * (1 - mapRange(progress, 0.7, 0.85));
  const matrixOp = mapRange(progress, 0.7, 0.9);
  const matrixY = 60 - 60 * mapRange(progress, 0.7, 0.92);
  const titleFade = 1 - mapRange(progress, 0.55, 0.75);

  return (
    <section id="hardware" className="relative bg-[#05070F] text-white">
      {/* intro */}
      <div className="container pt-24 lg:pt-32 pb-10 relative">
        <div className="aurora-ribbon opacity-60 mb-12" />
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#8FB3FF]">
              Native AI Terminals
            </div>
            <h2 className="mt-4 font-zh text-[36px] lg:text-[56px] leading-[1.08] font-black tracking-tight">
              原生 AI 终端体系
              <br />
              <span className="bg-gradient-to-r from-[#6B8BFF] via-[#A58BFF] to-[#F6A1C9] bg-clip-text text-transparent">
                感知与入口
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-[1.85] text-white/70">
              超声、MR、CT 等终端，已从传统影像工具进化为
              <span className="text-white font-medium"> 统一的 AI 原生数据入口与智能工作流节点 </span>
              。
              我们重构从采集到分析的完整链路，使真实世界数据 (RWD) 客观连续、可直接驱动算法进化、支持临床决策。
            </p>
          </div>
        </div>
      </div>

      {/* Scroll-pinned probe showcase (viewport * 3) */}
      <div ref={containerRef} style={{ height: "260vh" }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* starfield + radial glow bg */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 55%, rgba(74,95,220,0.45) 0%, rgba(30,22,80,0.25) 35%, #05070F 72%)",
              }}
            />
            {/* tiny star dots */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
                backgroundSize: "120px 120px",
                backgroundPosition: "0 0",
              }}
            />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                backgroundPosition: "20px 30px",
              }}
            />
          </div>

          {/* BIG word 'senz 330' */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: titleOp * titleFade,
              transform: `scale(${0.9 + 0.1 * titleOp})`,
            }}
          >
            <div className="text-center">
              <div className="font-display text-[clamp(80px,15vw,240px)] font-bold tracking-tight leading-none text-white/90">
                senz 330
              </div>
              <div className="mt-4 text-[14px] lg:text-[18px] tracking-[0.3em] text-white/50 uppercase">
                轻型 MEMS 超声换能器
              </div>
            </div>
          </div>

          {/* LMUT secondary label */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: lmutOp,
              transform: `scale(${0.96 + 0.08 * lmutOp})`,
            }}
          >
            <div className="text-center">
              <div className="font-display text-[clamp(80px,14vw,200px)] font-bold tracking-tight leading-none text-white/80">
                LMUT
              </div>
              <div className="mt-4 text-[13px] tracking-[0.3em] text-white/45 uppercase">
                Lightweight MEMS Ultrasound Transducer
              </div>
            </div>
          </div>

          {/* Probe */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: probeOp,
              transform: `translateY(${probeY}px) rotate(${probeRot}deg) scale(${probeScale})`,
              transition: "none",
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 aurora-glow opacity-70" />
              <img
                src={ULTRASOUND_PROBE}
                alt="senz 330 轻型 MEMS 超声换能器"
                className="relative h-[68vh] w-auto max-h-[680px] drop-shadow-[0_40px_60px_rgba(107,139,255,0.35)]"
              />
            </div>
          </div>

          {/* Matrix (MR/CT + 超声) */}
          <div
            className="absolute inset-x-0 bottom-0 px-6 lg:px-10 pb-14 lg:pb-20"
            style={{
              opacity: matrixOp,
              transform: `translateY(${matrixY}px)`,
            }}
          >
            <div className="max-w-[1320px] mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/50">
                  Multimodal Imaging Terminal Matrix
                </div>
                <div className="text-[11px] text-white/40 font-display">
                  {String(Math.round(progress * 100)).padStart(2, "0")} /
                  100
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {HARDWARE_MATRIX.map((h) => (
                  <div
                    key={h.name}
                    className="rounded-2xl glass-dark p-6"
                    style={{ borderColor: `${h.color}33` }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          background: h.color,
                          boxShadow: `0 0 12px ${h.color}`,
                        }}
                      />
                      <span className="text-[11px] tracking-[0.22em] text-white/60 uppercase font-medium">
                        {h.status}
                      </span>
                    </div>
                    <div className="mt-3 font-zh text-[19px] font-bold text-white">
                      {h.name}
                    </div>
                    <div className="mt-1 text-[13px] text-white/60">
                      {h.feature}
                    </div>
                    <div className="mt-3 h-px bg-white/10" />
                    <p className="mt-3 text-[12.5px] leading-[1.7] text-white/55">
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* scroll hint */}
          <div
            className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ opacity: 1 - progress * 1.5 }}
          >
            <div className="text-[10px] tracking-[0.3em] text-white/60 uppercase font-display">
              Scroll
            </div>
            <div className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* Hardware detail — three cards outside pin */}
      <div className="container py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <div className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#8FB3FF]">
              Across Modalities
            </div>
            <h3 className="mt-4 font-zh text-[30px] lg:text-[42px] leading-[1.1] font-black tracking-tight">
              重新定义床旁的
              <br />
              <span className="bg-gradient-to-r from-[#6B8BFF] via-[#A58BFF] to-[#F6A1C9] bg-clip-text text-transparent">
                成像标准
              </span>
            </h3>
            <p className="mt-6 text-[14.5px] leading-[1.85] text-white/65">
              不同影像模态通过统一的 AI 原生工作流体系接入与赋能；
              多模态影像数据在真实世界场景中持续叠加、校验与进化；
              共同服务于结果导向的健康管理与疗效确定性评估。
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { n: "330", l: "超声自产注册证" },
                { n: "510", l: "MR 自产注册证" },
                { n: "GSP", l: "国家药品批发资质" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-[#6B8BFF]/60 pl-3">
                  <div className="font-display text-[22px] lg:text-[26px] font-semibold text-white leading-none">
                    {s.n}
                  </div>
                  <div className="mt-1.5 text-[11.5px] text-white/50">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-[24px] overflow-hidden ring-1 ring-white/10 bg-[#0D0F1C]">
              <img
                src={MR_SCANNER}
                alt="senz MR 紧凑型磁共振"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-6 glass-dark rounded-2xl px-5 py-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-display">
                MR · Ultra-compact
              </div>
              <div className="mt-1 font-zh text-[18px] font-bold text-white">
                突破场地限制的床旁磁共振
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
