/**
 * 平台技术页 · Spline 超声设备 3D 滚动动画
 *
 * 架构：
 *  - position:fixed 透明叠层，pointer-events:none，不占文档流、不推挤现有内容
 *  - mix-blend-mode:screen —— 深色/黑色背景变不可见，模型（白色/高亮材质）完整显示
 *  - GSAP ScrollTrigger scrub 绑定整个页面文档，把总滚动进度映射到 baseState 插值
 *  - onUpdate 每帧把 baseState.position/rotation/scale 写回 Spline "机身"
 *  - canvas top:50vh + translateY(-50%) 使模型始终对齐视口垂直中心
 */

import { useEffect, useRef } from "react";
import { Application, type SPEObject } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── 关键帧（移植自 project-spline-state.ts） ───────────────────── */
const step1 = 0.1565274580730023;
const step2 = 0.3701085169352187;
const step3 = 0.604735284445906;
const step4 = 0.7035452322738386;
const step5 = 0.8280358948582122;
const step6 = 0.9553789821966214;
const step7 = 1;

function makeBaseState() {
  return {
    positionX: 0.0,
    positionY: -262.25,
    positionZ: 807.82,
    scaleX: 1.0,
    scaleY: 1.0,
    scaleZ: 1.0,
    rotationX: -76,
    rotationY: 0,
    rotationZ: 0,
  };
}

const progressState = [
  {
    positionX: 0, positionY: 0, positionZ: 0,
    scaleX: 1, scaleY: 1, scaleZ: 1,
    rotationX: -76, rotationY: 0, rotationZ: 0,
    duration: step1,
  },
  {
    positionX: 0, positionY: 0, positionZ: 0,
    scaleX: 1, scaleY: 1, scaleZ: 1,
    rotationX: 0, rotationY: -360, rotationZ: 0,
    duration: step2 - step1,
  },
  {
    positionX: 0, positionY: 0, positionZ: -500,
    scaleX: 1, scaleY: 1, scaleZ: 1,
    rotationX: 0, rotationY: -180, rotationZ: 0,
    duration: step3 - step2,
  },
  {
    positionX: 0, positionY: 0, positionZ: 0,
    scaleX: 1, scaleY: 1, scaleZ: 1,
    rotationX: -51, rotationY: 53, rotationZ: 38,
    duration: step4 - step3,
  },
  {
    positionX: 0, positionY: 0, positionZ: 0,
    scaleX: 1, scaleY: 1, scaleZ: 1,
    rotationX: -21, rotationY: 43, rotationZ: 18,
    duration: step5 - step4,
  },
  {
    positionX: 350, positionY: -100, positionZ: -300,
    scaleX: 1, scaleY: 1, scaleZ: 1,
    rotationX: 0, rotationY: -360, rotationZ: 0,
    duration: step6 - step5,
  },
  {
    positionX: 350, positionY: -100, positionZ: -300,
    scaleX: 1, scaleY: 1, scaleZ: 1,
    rotationX: 0, rotationY: -360, rotationZ: 0,
    duration: step7 - step6,
  },
];

function getRatio() {
  const w = window.innerWidth;
  if (w < 1560) return 1;
  if (w <= 1920) return 0.83;
  return 1 / (w / 1920);
}

/* ─── 主组件 ─────────────────────────────────────────────────────── */
export default function PlatformSpline3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Spline ───────────────────────────────────────────────── */
    const app = new Application(canvas);
    let animateObj: SPEObject | undefined;

    app
      .load("/spline/project.splinecode")
      .then(() => {
        animateObj = app.findObjectByName("机身") ?? undefined;
      })
      .catch(console.error);

    /* ── 写回物体 ─────────────────────────────────────────────── */
    const baseState = makeBaseState();

    function updateModel() {
      if (!animateObj) return;
      const ratio = getRatio();
      const {
        positionX, positionY, positionZ,
        scaleX, scaleY, scaleZ,
        rotationX, rotationY, rotationZ,
      } = baseState;

      animateObj.scale.x    = scaleX * ratio;
      animateObj.scale.y    = scaleY * ratio;
      animateObj.scale.z    = scaleZ * ratio;
      animateObj.position.x = positionX * ratio;
      animateObj.position.y = positionY * ratio;
      animateObj.position.z = positionZ;
      animateObj.rotation.x = rotationX * (Math.PI / 180);
      animateObj.rotation.y = rotationY * (Math.PI / 180);
      animateObj.rotation.z = rotationZ * (Math.PI / 180);
    }

    /* ── GSAP ScrollTrigger：
     *   - 开始：#platform-project-section 接近视口下方时提前出现，但首屏初始仍隐藏
     *   - 结束：#neuro-video 顶部到达视口底部（3D 停在此姿态）
     *   - 初始透明 → 进入时淡入；#neuro-video 底边掠过视口中下段后即淡出（早于整块离开）
     */
    const startEl = document.getElementById("platform-project-section") ?? document.documentElement;
    const endEl   = document.getElementById("neuro-video") ?? document.documentElement;
    const wrapEl  = wrapRef.current;

    /* 初始隐藏 */
    if (wrapEl) gsap.set(wrapEl, { opacity: 0 });
    const show3D = () => {
      if (wrapEl) gsap.to(wrapEl, { opacity: 1, duration: 0.5, ease: "power2.out" });
    };
    const hide3D = () => {
      if (wrapEl) gsap.to(wrapEl, { opacity: 0, duration: 0.4, ease: "power2.in" });
    };

    const tl = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: {
        trigger: startEl,
        start: () => {
          const isMobile = window.matchMedia("(max-width: 767px)").matches;
          return isMobile ? "top 78%" : "top top+=76";
        },
        endTrigger: endEl,
        end: "top bottom",     /* 动画结束，3D 物体保持停在当前姿态 */
        scrub: 4,
        onRefresh: (self) => {
          if (!wrapEl) return;
          gsap.set(wrapEl, { opacity: self.isActive ? 1 : 0 });
        },
        onUpdate: (self) => {
          if (!wrapEl || !self.isActive) return;
          if (Number.parseFloat(getComputedStyle(wrapEl).opacity) < 0.1) {
            gsap.set(wrapEl, { opacity: 1 });
          }
        },
        /* 进入动画区间 → 淡入 */
        onEnter: show3D,
        onLeave: hide3D,
        /* 从开始点往回滚出 → 隐藏 */
        onLeaveBack: hide3D,
        /* 从结束点往回滚入 → 恢复 */
        onEnterBack: show3D,
      },
    });

    tl.to(baseState, {
      keyframes: progressState,
      onUpdate: updateModel,
    });

    /* #neuro-video 仍可见时已尽早淡出（比「整块滚没」更早）*/
    ScrollTrigger.create({
      trigger: endEl,
      start: "bottom 42%", /* neuro-video 底边刚过视口中下段即开始淡出 */
      onEnter: () => {
        if (wrapEl) gsap.to(wrapEl, { opacity: 0, duration: 0.5, ease: "power2.in" });
      },
      onLeaveBack: () => {
        if (wrapEl) gsap.to(wrapEl, { opacity: 1, duration: 0.45, ease: "power2.out" });
      },
    });

    function onResize() {
      updateModel();
      ScrollTrigger.refresh();
    }
    window.addEventListener("resize", onResize);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    /**
     * position:fixed + pointer-events:none
     *  → 悬浮于所有页面内容之上，不影响布局和交互
     *  → z-index:30：高于普通内容，低于 header/modal（z-50+）
     */
    <div
      ref={wrapRef}
      className="spline3d-wrap fixed inset-0 pointer-events-none"
      style={{ zIndex: 30, opacity: 0 }}
      aria-hidden
    >
      {/*
       * 内层保持与原项目 spline-box 一致的宽高比（100vw × 60.14vw）
       * 绝对居中后，canvas 的 top:50vh 使渲染中心对齐视口垂直中点
       */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          maxWidth: "1920px",
          height: "60.142857vw",
          overflow: "visible",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            position: "relative",
            top: "50vh",
            transform: "translateY(-50%)",
            /*
             * screen 混合模式：
             *  黑色(0,0,0) → 恒等元素，完全透明
             *  模型高光/白色材质 → 正常叠加显示
             * 使 Spline 场景的深色背景在页面上不可见
             */
            mixBlendMode: "screen",
          }}
        />
      </div>
    </div>
  );
}
