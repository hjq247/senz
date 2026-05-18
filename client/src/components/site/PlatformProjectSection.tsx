/**
 * 平台页产品背景叙事区
 * homepage-project-background-reproduction.md §4 网页层效果
 *
 * Group-1  首屏顶光（蓝色）：circle.png + lighter-1~4（hue-rotate 去紫） + 粒子 + "原生AI终端体系"
 * Group-4  大气蓝光：bg-1/bg-2 plus-lighter + SENZ（仅 bg.splinecode 背景 + Group-2 金属字；不配 project-2* PNG，避免与 Spline 叠画）
 */
import { useEffect, useRef } from "react";
import { Application, type SPEObject } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── 数据 ─────────────────────────────────────────────────────────── */
const GROUP4_ITEMS = [
  {
    title: "Senz physics",
    desc: "Redefining the transducer is the physical foundation of the product.",
  },
  {
    title: "Senz Intelligence",
    desc: "Redefining the examination to make ultrasound examination simple and intelligent.",
  },
  {
    title: "Senz uFlow",
    desc: "Redefine usage to make ultrasound work more customizable and open.",
  },
];


/* ── 粒子 ─────────────────────────────────────────────────────────── */
function initParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let raf = 0;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; da: number };

  function mkParticle(): P {
    return {
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  0.8 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.35 - Math.random() * 0.55,
      a:  0.2 + Math.random() * 0.6,
      da: (Math.random() - 0.5) * 0.006,
    };
  }

  const N = 70;
  const particles: P[] = Array.from({ length: N }, mkParticle);

  function tick() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.a = Math.max(0.05, Math.min(0.85, p.a + p.da));
      if (p.y < -4 || p.x < -4 || p.x > canvas.width + 4) {
        Object.assign(p, mkParticle());
        p.y = canvas.height + 4;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,210,255,${p.a})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  };
}

/* ── 组件 ─────────────────────────────────────────────────────────── */
export default function PlatformProjectSection() {
  const particleRef       = useRef<HTMLCanvasElement>(null);
  const senzInteractRef   = useRef<HTMLDivElement>(null);
  const senzBgCanvasRef   = useRef<HTMLCanvasElement>(null);
  const introDescRef      = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let stopParticles: (() => void) | undefined;
    if (particleRef.current) stopParticles = initParticles(particleRef.current);

    /* Group-3 intro-desc：线性渐变字 + scrub backgroundPositionY 扫亮 */
    let introTween: gsap.core.Tween | undefined;
    const descEl = introDescRef.current;
    if (descEl) {
      gsap.set(descEl, { backgroundPositionY: "70%" });
      introTween = gsap.to(descEl, {
        backgroundPositionY: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: descEl,
          scrub: true,
          start: "center center+=300",
          end: "center center-=200",
        },
      });
    }

    /* 桌面 projectGroupAnimate2：#bgPreview + bg.splinecode + ScrollTrigger + Ellipse / click */
    let splineST: ScrollTrigger | undefined;
    let splineApp: Application | null = null;
    let onRootClick = () => {};

    const interactRoot = senzInteractRef.current;
    const bgCanvas = senzBgCanvasRef.current;
    let bgResizeObserver: ResizeObserver | undefined;

    const syncBgSplineSize = () => {
      if (!bgCanvas) return;
      const wrap = bgCanvas.parentElement;
      if (!wrap) return;
      const { width, height } = wrap.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      /* 手机：正方形容器 + 等比 setSize，避免霓虹被拉成椭圆 */
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const renderSize = isMobile ? Math.min(width, height) : undefined;
      const w = renderSize ?? width;
      const h = renderSize ?? height;
      const appWithSize = splineApp as unknown as {
        setSize?: (w: number, h: number) => void;
      };
      appWithSize.setSize?.(w, h);
    };

    if (interactRoot && bgCanvas) {
      splineApp = new Application(bgCanvas);

      const emitEllipse = () => {
        const layer = splineApp?.findObjectByName("Ellipse") as SPEObject | undefined;
        layer?.emitEvent?.("mouseDown");
      };

      splineST = ScrollTrigger.create({
        trigger: interactRoot,
        start: "center center+=100",
        /* 勿加 scrub / anticipatePin：无 tween 时 scrub 会与整页滚动「叠一层」手感 */
        onEnter: emitEllipse,
      });

      splineApp
        .load("/spline/bg.splinecode")
        .then(() => {
          onRootClick = () => emitEllipse();
          interactRoot.addEventListener("click", onRootClick);
          emitEllipse();
          syncBgSplineSize();
          if (bgCanvas.parentElement) {
            bgResizeObserver = new ResizeObserver(syncBgSplineSize);
            bgResizeObserver.observe(bgCanvas.parentElement);
          }
        })
        .catch(console.error);

      window.addEventListener("resize", syncBgSplineSize);
    }

    return () => {
      stopParticles?.();
      introTween?.scrollTrigger?.kill();
      introTween?.kill();
      splineST?.kill();
      window.removeEventListener("resize", syncBgSplineSize);
      bgResizeObserver?.disconnect();
      if (interactRoot && onRootClick) {
        interactRoot.removeEventListener("click", onRootClick);
      }
      try {
        (splineApp as unknown as { dispose?: () => void })?.dispose?.();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <div id="platform-project-section" className="relative overflow-x-hidden" style={{ backgroundColor: "#020202" }}>

      {/* ══════════════════════════════════════════════════════════
          Group-1  首屏顶光（蓝色）
          ══════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ minHeight: "100vh", paddingTop: 144 }}>

        {/* circle.png 圆盘底图 */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(1221px, 100vw)",
            height: "calc(min(1221px, 100vw) * 581 / 1221)",
            backgroundImage: "url(/images/module-project/group1/circle.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundSize: "contain",
            mixBlendMode: "plus-lighter",
            opacity: 0.70,
            pointerEvents: "none",
          }}
        />

        {/* lighter-1~4 SVG 顶光层：无 hue-rotate（颜色已是 #A6AFFF→#5821F5 蓝紫），stretch 填满 */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(1558px, 100vw)",
            height: "calc(min(1558px, 100vw) * 1005 / 1558)",
            pointerEvents: "none",
          }}
        >
          {[1, 2, 3, 4].map((n) => (
            <img
              key={n}
              src={`/images/module-project/group1/lighter-${n}.svg`}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                mixBlendMode: "plus-lighter",
              }}
            />
          ))}
        </div>

        {/* 粒子 canvas — 覆盖整个 Group-1 */}
        <canvas
          ref={particleRef}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* "原生AI终端体系" — 蓝光区域内，偏上 1/4 处居中 */}
        <div
          style={{
            position: "absolute",
            top: "22%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            textAlign: "center",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <p
            style={{
              fontSize: "clamp(13px, 1.1vw, 16px)",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(140,190,255,0.65)",
              fontFamily: "var(--font-display, sans-serif)",
              marginBottom: 14,
            }}
          >
            AI-Native Terminal System
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 3.8vw, 52px)",
              fontWeight: 900,
              letterSpacing: "0.05em",
              color: "#fff",
              fontFamily: "var(--font-zh, sans-serif)",
              textShadow: "0 0 48px rgba(60,120,255,0.55), 0 2px 8px rgba(0,0,0,0.5)",
              lineHeight: 1.15,
            }}
          >
            原生AI终端体系
          </h2>
        </div>

        {/* 空白高度：供 3D 动画悬浮通过，缩短以减少整体滚动距离 */}
        <div style={{ minHeight: "45vh" }} />
      </div>

      {/* ══════════════════════════════════════════════════════════
          Group-4  大气蓝光 + SENZ + 三列文案
          ══════════════════════════════════════════════════════════ */}
      <div className="relative overflow-visible" style={{ minHeight: "60vh" }}>
        {/* bg-1 右侧光柱 */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -1600,
            right: 0,
            pointerEvents: "none",
            backgroundImage: "url(/images/module-project/bg-1.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right top",
            backgroundSize: "contain",
            mixBlendMode: "plus-lighter",
            width: "65%",
            height: 2400,
          }}
        />
        {/* bg-2 左侧光柱：外层裁剪，避免 height+top 撑大整页 scrollHeight；内层 top 越大光柱越靠下 */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 220,
              pointerEvents: "none",
              backgroundImage: "url(/images/module-project/bg-2.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left top",
              backgroundSize: "contain",
              mixBlendMode: "plus-lighter",
              width: "65%",
              height: 2400,
            }}
          />
        </div>

        {/* ── SENZ：对齐桌面 Group-2「Spline + 字」—— 仅用 bg.splinecode，不配 project-2 / project-2-bg（会与场景叠冗） */}
        <style>{`
          .senz-g2-block {
            margin-top: -120px;
          }
          .senz-g2-inner {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: min(72vw, 540px);
            transform: translateY(-56px);
          }
          /* 字 + 霓虹共用锚点，水平垂直居中叠放 */
          .senz-g2-stage {
            position: relative;
            display: grid;
            place-items: center;
            width: min(960px, 100%);
            height: clamp(300px, 62vw, 560px);
          }
          .senz-g2-spline-wrap {
            position: absolute;
            inset: -10% -6%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            pointer-events: none;
            overflow: visible;
          }
          #senzBgPreview {
            display: block;
            width: 100%;
            height: 100%;
            max-width: min(118vw, 960px);
            pointer-events: none;
            mix-blend-mode: screen;
          }
          .senz-g2-title {
            position: relative;
            z-index: 20;
            pointer-events: none;
            display: inline-block;
            font-family: var(--font-display, sans-serif);
            font-weight: 700;
            font-size: clamp(72px, 14vw, 200px);
            letter-spacing: 0.12em;
            line-height: 1.3;
            background: radial-gradient(83.93% 68.11% at 49.92% 20.6%, #fff 0%, #9c9c9c 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          @media (max-width: 767px) {
            #platform-project-section {
              overflow-x: clip;
            }
            .senz-g2-block {
              margin-top: -56px;
              padding-left: 0;
              padding-right: 0;
              max-width: 100%;
              overflow: visible;
            }
            .senz-g2-inner {
              min-height: clamp(260px, 72vw, 380px);
              transform: translateY(-20px);
              width: 100%;
            }
            .senz-g2-stage {
              width: 100%;
              max-width: 100%;
              height: clamp(260px, 78vw, 400px);
              margin-left: auto;
              margin-right: auto;
            }
            /* 霓虹：正方形、等比缩小，居中叠在 SENZ 字上 */
            .senz-g2-spline-wrap {
              inset: auto;
              left: 50%;
              top: 50%;
              right: auto;
              bottom: auto;
              width: min(68vw, 280px);
              aspect-ratio: 1;
              height: auto;
              transform: translate(-50%, -50%);
            }
            #senzBgPreview {
              width: 100%;
              height: 100%;
              max-width: none;
              aspect-ratio: 1;
            }
            .senz-g2-title {
              font-size: clamp(52px, 16.5vw, 88px);
              letter-spacing: 0.08em;
            }
          }
          /* 对齐 desktop .m-project .group-3 .intro-desc：渐变透明字 + background-size 供 scrub 扫亮 */
          .platform-intro-desc {
            margin: 0 auto;
            max-width: 860px;
            font-size: clamp(15px, 1.35vw, 20px);
            font-weight: 400;
            line-height: 1.75;
            text-align: center;
            font-family: var(--font-zh, sans-serif);
            transform: translateY(-12px);
            background: linear-gradient(
              178deg,
              #fff 17%,
              rgb(255 255 255 / 0.57) 27%,
              rgb(255 255 255 / 0.14) 37%,
              rgb(255 255 255 / 0) 50%
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% 400%;
            background-repeat: no-repeat;
            background-position: center 70%;
          }
        `}</style>

        <div
          ref={senzInteractRef}
          className="senz-g2-block relative z-10 text-center px-6 max-md:px-0 senz-group-2 cursor-default"
          style={{
            paddingTop: 0,
            paddingBottom: 16,
            maxWidth: "min(100%, 980px)",
            marginLeft: "auto",
            marginRight: "auto",
            touchAction: "manipulation",
          }}
        >
          <div className="senz-g2-inner mx-auto">
            <div className="senz-g2-stage">
              <div className="senz-g2-spline-wrap" aria-hidden>
                <canvas id="senzBgPreview" ref={senzBgCanvasRef} />
              </div>
              <span className="senz-g2-title">SENZ</span>
            </div>
          </div>
        </div>

        {/* ── SENZ 下方说明：Group-3 intro-desc 扫亮（仅 CSS+GSAP，无 plus-lighter 图） ── */}
        <div
          className="relative mx-auto px-6 text-center"
          style={{ zIndex: 10, paddingTop: 450, paddingBottom: 40 }}
        >
          <p ref={introDescRef} className="platform-intro-desc">
            深至科技从根本上重塑了影像设备的价值——超声、MR、CT 等终端，已从传统的影像工具，进化为统一的 AI 原生数据入口与智能工作流节点。
          </p>
        </div>

        {/* ── 三条交错叙事（统一接入 / 数据进化 / 结果交付） ─────── */}
        <div
          className="relative mx-auto px-6"
          style={{ zIndex: 10, maxWidth: 1200, paddingTop: 388, paddingBottom: 160 }}
        >
          {/* 1. 统一接入 — 贴左缘（margin 越小离左越近 = 离中线越远） */}
          <div style={{ maxWidth: 480, marginLeft: "clamp(0px, 1vw, 12px)" }}>
            <div style={{ fontFamily: "var(--font-zh, sans-serif)", fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.05 }}>
              统一接入
            </div>
            <p style={{ marginTop: 14, fontSize: "clamp(13px, 1vw, 16px)", lineHeight: 1.9, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-zh, sans-serif)", maxWidth: 360 }}>
              不同影像模态均通过统一的 AI 原生工作流体系接入与赋能
            </p>
          </div>

          {/* 2. 数据进化 — 偏右 */}
          <div
            style={{
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: 0,
              marginTop: 110,
              textAlign: "justify",
              transform: "translateX(clamp(12px, 2vw, 40px))",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-zh, sans-serif)",
                fontSize: "clamp(32px, 5vw, 72px)",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
                width: "100%",
                textAlign: "justify",
              }}
            >
              数据进化
            </div>
            <p
              style={{
                marginTop: 14,
                fontSize: "clamp(13px, 1vw, 16px)",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.55)",
                fontFamily: "var(--font-zh, sans-serif)",
                maxWidth: "100%",
                textAlign: "justify",
              }}
            >
              多模态影像数据在真实世界场景中持续叠加、校验与进化
            </p>
          </div>

          {/* 3. 结果交付 — 偏左 */}
          <div style={{ maxWidth: 480, marginLeft: "clamp(0px, 1vw, 12px)", marginTop: 110 }}>
            <div style={{ fontFamily: "var(--font-zh, sans-serif)", fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.05 }}>
              结果交付
            </div>
            <p style={{ marginTop: 14, fontSize: "clamp(13px, 1vw, 16px)", lineHeight: 1.9, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-zh, sans-serif)", maxWidth: 360 }}>
              共同服务于结果导向的健康管理与疗效确定性评估
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
