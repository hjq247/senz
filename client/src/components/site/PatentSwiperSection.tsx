/**
 * 知识产权 · 专利展示
 *
 * thumbSwiper (中间) — virtualTranslate + GSAP 扇形叠放
 *   navigation → prevEl / nextEl 绑在左栏按钮
 *   pagination  → custom 序号文字
 *   controller  → 控制 infoSwiper
 *
 * infoSwiper (右侧) — parallax 文案渐显
 *   allowTouchMove: false
 *   onTransitionStart → updateThumbLayout (GSAP 叠放动画)
 */
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, Pagination, Parallax } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/parallax";
import SectionHeader from "@/components/layout/SectionHeader";

/* ─── 专利数据 ─── */
const PATENT_FILES = [
  "专利证书-深专0001-发明-2019113208231-超声图像的处理方法及系统.pdf",
  "专利证书-深专0004-发明-2019113208123-一种实现信息交互功能的超声检测方法及超声检测系统.pdf",
  "专利证书-深专0009.2-USPTO-17145805-神经网络模型及基于神经网络模型的超声波束形成方法.pdf",
  "专利证书-深专0010-发明-2020101007075-胎儿头围实时测量方法及装置.pdf",
  "专利证书-深专0011.1-EPO-211675582-一种接触式柔性适形超声探头的超声系统及方法.pdf",
  "专利证书-深专0011.2-USPTO-17222649-一种接触式柔性适形超声探头的超声系统及方法.pdf",
  "专利证书-深专0012-发明-2020102383723-甲状腺结节超声图像实时识别方法及装置.pdf",
  "专利证书-深专0013-发明-202010266734X-一种基于深度学习的射血分数计算方法及系统.pdf",
  "专利证书-深专0014-发明-202010398439X-一种云平台超声成像系统.pdf",
  "专利证书-深专0016-发明-2020103984258-一种基于眼部超声图像的处理方法.pdf",
  "专利证书-深专0017-发明-2020103983471-一种基于弹性超声成像的甲状腺结节分析系统.pdf",
  "专利证书-深专0018-发明-2020103992856-一种医学图像的质量监控系统及方法.pdf",
  "专利证书-深专0020-发明-2020103984385-一种基于双目视觉的超声定位方法及系统.pdf",
  "专利证书-深专0021-发明-2020103983467-一种基于增强现实的超声辅助扫查系统及方法.pdf",
  "专利证书-深专0022-发明-2020104093212-一种超声人工智能模型的分布式部署决策系统及方法.pdf",
  "专利证书-深专0023-发明-2020104084035-一种标准超声图像训练集的生成方法及系统.pdf",
  "专利证书-深专0024-发明-2020104093246-一种超声影像模型的自训练及自部署系统及方法.pdf",
  "专利证书-深专0025-发明-2020104093335-一种基于区块链的超声数据管理系统及方法.pdf",
  "专利证书-深专0026-发明-2020104084088-一种基于小程序的超声教学系统.pdf",
  "专利证书-深专0027-发明-2020104084073-一种基于深度学习的超声图像二尖瓣的定位方法及系统.pdf",
  "专利证书-深专0028-发明-202010409334X-一种肺部超声图像识别方法和系统.pdf",
  "专利证书-深专0030-发明-202110350472X-一种分布式波束成像方法.pdf",
  "专利证书-深专0031-发明-2021103504715-一种超声数据传输方法及系统.pdf",
  "专利证书-深专0034-发明-202110352575X-一种超声扫查引导系统及方法.pdf",
  "专利证书-深专0035-发明-2021103525745-一种颈动脉内中膜分割模型的生成系统及方法.pdf",
  "专利证书-深专0040-发明-2021103694071-一种平面图标注系统.pdf",
  "专利证书-深专0045-发明-2021103683819-一种基于生成式对抗网络的超声检查操作引导方法.pdf",
  "专利证书-深专0046-发明-2021103764977-一种B超图像选取方法及系统.pdf",
  "专利证书-深专0047-发明-2021106159191-一种图像增强系统及便携式多普勒成像仪.pdf",
  "专利证书-深专0048-发明-2021106386867-一种甲状腺结节自动分级方法和系统.pdf",
  "专利证书-深专0049-发明-2021106690890-一种图像分割模型的准确度评价系统及方法.pdf",
  "专利证书-深专0051-发明-2021106736288-一种甲状腺结节分类模型的生成方法及系统.pdf",
  "专利证书-深专0054-发明-2021107909496-一种颈动脉超声扫查视频的质量筛查方法和系统.pdf",
  "专利证书-深专0055-发明-2021107921182-一种甲状腺超声扫查视频质量筛选方法和系统.pdf",
  "专利证书-深专0061-发明-2021108735646-一种基于深度学习的颈动脉管径比测量方法和系统.pdf",
  "专利证书-深专0066-发明-2021110286950-一种基于人工智能的超声图像改进方法.pdf",
  "专利证书-深专0068-发明-2021111633756-一种结节钙化医学图像的处理方法.pdf",
  "专利证书-深专0072-发明-202111452303.3-一种甲状腺扫查方法及系统.pdf",
  "专利证书-深专0075-发明-2021112773072-一种基于特征信息检索的图像诊断方法和系统.pdf",
  "专利证书-深专0076-发明-2021113491783-一种超声扫查设备的耦合剂涂抹方法.pdf",
  "专利证书-深专0077-发明-2021113583658-一种掌上超声终端的连接方法及系统.pdf",
  "专利证书-深专0078-实用新型-2021229666730-一种便携式超声设备.pdf",
  "专利证书-深专0079-发明-202111446877X-一种超声设备的扫查方法及设备.pdf",
  "专利证书-深专0085-发明-2021115566411-一种基于超声扫查视频的动脉斑块识别方法及系统.pdf",
  "专利证书-深专0086-发明-2021115739904-一种甲状腺扫查完整性的判断方法及装置.pdf",
  "专利证书-深专0087-发明-2021116627959-一种超声三维重建方法及系统.pdf",
  "专利证书-深专0097-发明-2022101929819-一种医疗数据库系统.pdf",
  "专利证书-深专0101-发明-202210303343X-一种基于深度学习的可调节图像优化系统和方法.pdf",
  "专利证书-深专0102-发明-2022103338086-一种人工智能模型的训练系统.pdf",
  "专利证书-深专0103-发明-2022102134734-一种超声扫查视频的打包方法.pdf",
  "专利证书-深专0105-发明-2022102659766-一种超声人工智能模型的自训练系统.pdf",
  "专利证书-深专0108-发明-2022103260861-一种人工智能模型的训练方法及训练系统.pdf",
  "专利证书-深专0112-发明-2022107353742-一种自定义流程的超声检查方法.pdf",
  "专利证书-深专0113-发明-2022107388826-一种前端字段的更新方法.pdf",
  "专利证书-深专0129-实用新型-2023213649842-一种颈部超声扫描设备.pdf",
  "专利证书-深专0130-发明-202310654567X-一种基于深度学习的超声病灶标准切面选取方法及系统.pdf",
  "专利证书-深专0138-实用新型-2023215476231-一种手持式医疗扫描装置.pdf",
  "专利证书-深专0141-实用新型-202321581959X-一种磁共振用滑移承载装置.pdf",
  "专利证书-深专0147-实用新型-2023217007248-一种磁共振成像装置.pdf",
  "专利证书-深专0155-实用新型-2023218300448-一种穿戴式磁共振设备.pdf",
  "专利证书-深专0157-实用新型-2023219842504-一种超声探头消毒装置.pdf",
  "专利证书-深专0158-实用新型-2023219842491-一种超声探头收纳装置.pdf",
  "专利证书-深专0159-实用新型-2023219842487-一种新型便携式超声.pdf",
  "专利证书-深专0160-实用新型-2023220143411-一种掌上超声设备.pdf",
  "专利证书-深专0167-实用新型-2023220786717-一种永磁磁共振磁体的温控装置.pdf",
  "专利证书-深专0173-发明-2023110200179-一种基于磁共振的病灶识别系统及方法.pdf",
  "专利证书-深专0176-实用新型-2023221936586-一种磁共振成像系统的调试装置.pdf",
  "专利证书-深专0177-实用新型-2023221936800-一种磁共振病床运输轨道.pdf",
  "专利证书-深专0178-实用新型-2023222488996-一种磁共振诊断床.pdf",
  "专利证书-深专0191-实用新型-2023225018808-一种超声探头恒温器.pdf",
  "专利证书-深专0210-实用新型-2023230718006-一种新型超声台车.pdf",
  "专利证书-深专0227-实用新型-2024201376764-一种振动传感器.pdf",
  "专利证书-深专0228-实用新型-2024203490073-一种芯片测试装置.pdf",
  "专利证书-深专0335-发明-202411250887X-一种基于掌上超声设备的血管穿刺系统及穿刺针定位控制方法.pdf",
  "专利证书-深专0340-发明-2024112653943-一种超声智能频段切换和多频段联合成像系统.pdf",
  "专利证书-深专0353-发明-2024118023463-一种基于;AI;辅助的扫查甲状腺系统及方法.pdf",
];

type Patent = { filename: string; id: string; type: string; title: string; link: string };

function parsePatent(filename: string): Patent {
  const base = filename.replace(".pdf", "");
  const parts = base.split("-");
  const id = parts[1] ?? base;
  const type = parts[2] ?? "";
  const title = parts.slice(4).join("-") || parts[parts.length - 1];
  const link = `/assets/patents/${encodeURIComponent(filename)}`;
  return { filename, id, type, title, link };
}

const PATENTS: Patent[] = PATENT_FILES.map(parsePatent);

/* ─── 渐变标题 ─── */
const gradientTextStyle: React.CSSProperties = {
  background: "radial-gradient(circle at 20% 50%, #c084fc 0%, #818cf8 50%, #38bdf8 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

/* ─── GSAP：完全照搬参考实现的几何逻辑 ─── */
// init / resize：将所有 slide 叠到同一视觉位置（x=-i*w），
// 再用 rotate + opacity + zIndex 形成扇形叠放感
function initThumbLayout(swiper: SwiperType) {
  const w = swiper.width || 320;
  const slides = Array.from(swiper.slides);
  slides.forEach((slide, i) => {
    gsap.set(slide, {
      x: -i * w,
      opacity: 1 - i * 0.2,
      zIndex: slides.length - i,
      rotate: i * 3,
    });
  });
}

function resizeThumbLayout(swiper: SwiperType) {
  const w = swiper.width || 320;
  Array.from(swiper.slides).forEach((slide, i) => {
    gsap.set(slide, { x: -i * w });
  });
}

// updateSwiper：由 infoSwiper.transitionStart 触发，三组分别处理
function updateSwiper(infoSwiper: SwiperType, thumbSwiper: SwiperType) {
  const tl = gsap.timeline({ defaults: { duration: 1 } });
  const slides = Array.from(thumbSwiper.slides);
  const activeIndex = infoSwiper.activeIndex;

  const previousSlides = slides.filter((_, i) => i < activeIndex);
  const currentSlide   = slides[activeIndex];
  const nextSlides     = slides.filter((_, i) => i > activeIndex);

  if (previousSlides.length) {
    tl.to(previousSlides, { rotate: -3, opacity: 0 }, 0);
  }
  if (currentSlide) {
    tl.to(currentSlide, { rotate: 0, opacity: 1 }, 0);
  }
  if (nextSlides.length) {
    tl.to(
      nextSlides,
      {
        rotate: (j: number) => (j + 1) * 3,
        opacity: (j: number) => 1 - (j + 1) * 0.2,
      },
      0,
    );
  }

  tl.pause();
  tl.duration((infoSwiper.params.speed as number) / 1000).play(0);
}

/* ─── 主组件 ─── */
export default function PatentSwiperSection() {
  const thumbSwiperRef = useRef<SwiperType | null>(null);
  const [infoSwiperInst, setInfoSwiperInst] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="ip"
      className="relative scroll-mt-24 py-20 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #2a1f4a 0%, #1b2d52 55%, #1e1e3a 100%)" }}
    >
      {/* 背景装饰 */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #7C3AED, transparent)" }}
      />

      <div className="container">
        <SectionHeader index="01.3" en="Intellectual Property" title="知识产权" light />

        {/* 专利总标题 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10 mb-12 flex items-baseline gap-4"
        >
          <h3
            className="font-zh text-[52px] lg:text-[72px] font-black leading-none tracking-tight"
            style={gradientTextStyle}
          >
            专利
          </h3>
          <span className="text-white/50 text-[16px] font-display tracking-[0.15em]">
            {PATENTS.length}
          </span>
        </motion.div>

        {/* ── 三栏主体：1fr | 中证书叠放 | 1fr （对称，确保证书居中） ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid items-center gap-8 lg:gap-10"
          style={{ gridTemplateColumns: "1fr 320px 1fr" }}
        >
          {/* ── 左栏：infoSwiper（parallax 文案） ── */}
          <div className="min-w-0">
            <Swiper
              modules={[Parallax]}
              parallax
              speed={460}
              allowTouchMove={false}
              onSwiper={setInfoSwiperInst}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onTransitionStart={(s: any) => {
                const sw = s as SwiperType;
                setActiveIndex(sw.activeIndex);
                if (thumbSwiperRef.current) {
                  updateSwiper(sw, thumbSwiperRef.current);
                }
              }}
              style={{ overflow: "visible" }}
            >
              {PATENTS.map((patent, i) => (
                <SwiperSlide
                  key={patent.filename}
                  style={{ pointerEvents: i === activeIndex ? "auto" : "none" }}
                >
                  <div className="py-2">
                    {/* ID + 类型 */}
                    <div
                      className="flex items-center gap-2 mb-5"
                      data-swiper-parallax-x="-60"
                      data-swiper-parallax-opacity="0"
                    >
                      <span className="font-display text-[12px] font-semibold tracking-[0.12em] text-[#c4b5fd]">
                        {patent.id}
                      </span>
                      {patent.type && (
                        <span className="rounded-full px-2.5 py-0.5 text-[10px] font-zh bg-white/15 text-white/80">
                          {patent.type}
                        </span>
                      )}
                    </div>

                    {/* 专利名称 */}
                    <h4
                      className="font-zh text-[20px] lg:text-[26px] font-bold leading-[1.45] text-white mb-6"
                      data-swiper-parallax-x="-100"
                      data-swiper-parallax-opacity="0"
                    >
                      {patent.title}
                    </h4>

                    {/* 查看原文 */}
                    <a
                      href={patent.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-[13px] font-zh text-white/70 transition hover:bg-white/10 hover:text-white hover:border-white/30"
                      data-swiper-parallax-x="-60"
                      data-swiper-parallax-opacity="0"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      查看原文
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 移动端导航 */}
            <div className="lg:hidden mt-8 flex items-center gap-4">
              <button className="patent-swiper-prev group flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15">
                <ChevronLeft className="h-4 w-4 text-white/90" />
              </button>
              <div className="patent-swiper-pagination font-display text-[12px]" />
              <button className="patent-swiper-next group flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15">
                <ChevronRight className="h-4 w-4 text-white/90" />
              </button>
            </div>
          </div>

          {/* ── 中栏：thumbSwiper（GSAP 叠放，overflow:visible 必须）── */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: "440px", height: "580px", overflow: "visible" }}
          >
            <Swiper
              modules={[Thumbs, Navigation, Pagination]}
              virtualTranslate
              watchSlidesProgress
              allowTouchMove={false}
              speed={460}
              thumbs={{ swiper: infoSwiperInst }}
              navigation={{
                prevEl: ".patent-swiper-prev",
                nextEl: ".patent-swiper-next",
              }}
              pagination={{
                el: ".patent-swiper-pagination",
                type: "custom",
                renderCustom: (_, curr, total) =>
                  `<span style="color:rgba(255,255,255,0.85);font-weight:600">${String(curr).padStart(2, "0")}</span>` +
                  `<span style="color:rgba(255,255,255,0.25);margin:0 4px">/</span>` +
                  `<span style="color:rgba(255,255,255,0.4)">${String(total).padStart(2, "0")}</span>`,
              }}
              onSwiper={(s) => { thumbSwiperRef.current = s; }}
              onInit={initThumbLayout}
              onResize={resizeThumbLayout}
              style={{ overflow: "visible", width: "320px" }}
            >
              {PATENTS.map((patent, i) => (
                <SwiperSlide key={patent.filename}>
                  {/* 证书卡片，A4 竖版比例 */}
                  <div
                    className="rounded-xl overflow-hidden bg-white"
                    style={{
                      width: "320px",
                      aspectRatio: "210 / 297",
                      pointerEvents: i === activeIndex ? "auto" : "none",
                      boxShadow: i === activeIndex
                        ? "0 24px 60px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.3)"
                        : "0 8px 24px rgba(0,0,0,0.35)",
                    }}
                  >
                    {Math.abs(i - activeIndex) <= 2 ? (
                      <iframe
                        src={patent.link}
                        className="w-full h-full border-0"
                        loading="lazy"
                        title={patent.title}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#F5F6FF]">
                        <FileText className="h-14 w-14 text-[#C4C7E8]" />
                        <span className="font-display text-[11px] text-[#C4C7E8] tracking-wide">
                          {patent.id}
                        </span>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ── 右栏：导航 + 计数（居中对齐） ── */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-5">
            <button
              className="patent-swiper-prev group flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/15 transition hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="上一项"
            >
              <ChevronLeft className="h-4 w-4 text-white/90 transition-colors" />
            </button>

            <div
              className="patent-swiper-pagination font-display text-center text-[12px] leading-relaxed"
              style={{ minWidth: "44px" }}
            />

            <button
              className="patent-swiper-next group flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/15 transition hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="下一项"
            >
              <ChevronRight className="h-4 w-4 text-white/90 transition-colors" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
