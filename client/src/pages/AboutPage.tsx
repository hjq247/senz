/**
 * 关于深至
 *  · 公司介绍 / 公司文化（mission+values）/ 发展历程（timeline）/ 资质荣誉 / 知识产权 / 专家合作伙伴
 */
import * as React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkle, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import {
  ABOUT_SECTIONS,
  ABOUT_INTRO,
  MISSION,
  VALUES,
  TIMELINE_STAGES,
  EXPERTS_NOTE,
} from "@/lib/copy";
import { AI_FLOWLIGHT_SQUARE } from "@/lib/assets";
import { HERO_VIDEOS, HERO_POSTERS } from "@/lib/videos";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import HonorsSection from "@/components/site/HonorsSection";
import PatentSwiperSection from "@/components/site/PatentSwiperSection";

/* ─── 荣誉图片 ─── */
const HONOR_IMAGES = [
  "02.JPG", "03.JPG", "11.JPG", "13.JPG", "15-1.JPG", "15-2.JPG",
  "17.JPG", "18.JPG", "19.JPG", "20.JPG", "21.JPG", "25.JPG", "26.JPG",
  "28.JPG", "29.JPG", "DSC_2221.JPG",
  "image.png", "image(1).png", "image(2).png", "image(3).png", "image(4).png",
  "image(5).png", "image(6).png", "image(7).png", "image(8).png", "image(9).png",
  "image(10).png", "image(11).png", "image(12).png", "image(13).png", "image(14).png",
  "img_v3_02sf_3e2f5cf0-1278-4ba8-89e6-c67b8f53954g.jpg",
  "img_v3_02si_08827296-c44a-43e4-af8b-c9d5d7c1f5dg.jpg",
];

/* ─── 资质图片 ─── */
const QUALIFICATION_IMAGES = [
  "1-02.JPG", "1-03.JPG", "1-04.JPG", "1-05.JPG", "1-13.JPG", "1-14.JPG",
  "image.png", "image(1).png", "image(2).png", "image(3).png", "image(4).png",
];

/* ─── 专利 PDF ─── */
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

type Patent = { filename: string; id: string; type: string; title: string };

function parsePatent(filename: string): Patent {
  const base = filename.replace(".pdf", "");
  const parts = base.split("-");
  const id = parts[1] ?? base;
  const type = parts[2] ?? "";
  const title = parts.slice(4).join("-") || parts[parts.length - 1];
  return { filename, id, type, title };
}

const PATENTS: Patent[] = PATENT_FILES.map(parsePatent);

/* ─── 图片轮播 ─── */
function ImageCarousel({ images, label, folder }: { images: string[]; label: string; folder: string }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const autoplayPlugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1 w-6 rounded-full bg-gradient-to-r from-[#1E6BFF] to-[#8A6BFF]" />
          <span className="font-zh text-[15px] font-bold text-foreground">{label}</span>
          <span className="ml-1 font-display text-[11px] tracking-[0.15em] text-foreground/40 uppercase">
            {images.length} items
          </span>
        </div>
        <span className="font-display text-[12px] text-foreground/40">
          {current + 1} / {count}
        </span>
      </div>

      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          plugins={[autoplayPlugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {images.map((filename, i) => (
              <CarouselItem key={i} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-[#F8F8F8] flex items-center justify-center">
                  <img
                    src={`/assets/${folder}/${encodeURIComponent(filename)}`}
                    alt={`${label} ${i + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <button
            onClick={() => api?.scrollPrev()}
            className="absolute top-1/2 -left-5 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-30"
            disabled={count === 0}
          >
            <ChevronLeft className="h-4 w-4 text-foreground/70" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="absolute top-1/2 -right-5 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-30"
            disabled={count === 0}
          >
            <ChevronRight className="h-4 w-4 text-foreground/70" />
          </button>
        </Carousel>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex justify-center gap-1.5 flex-wrap">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current
                ? "w-5 bg-[#1E6BFF]"
                : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── 专利 PDF 轮播 ─── */
function PatentCarousel({ patents }: { patents: Patent[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const autoplayPlugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1 w-6 rounded-full bg-gradient-to-r from-[#FF77C3] to-[#8A6BFF]" />
          <span className="font-zh text-[15px] font-bold text-foreground">专利证书</span>
          <span className="ml-1 font-display text-[11px] tracking-[0.15em] text-foreground/40 uppercase">
            {patents.length} patents
          </span>
        </div>
        <span className="font-display text-[12px] text-foreground/40">
          {current + 1} / {count}
        </span>
      </div>

      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          plugins={[autoplayPlugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {patents.map((p, i) => (
              <CarouselItem key={p.filename} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] bg-[#F5F5F5] overflow-hidden">
                    {Math.abs(i - current) <= 2 ? (
                      <iframe
                        src={`/assets/patents/${encodeURIComponent(p.filename)}`}
                        className="w-full h-full border-0"
                        title={p.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-foreground/25">
                        <FileText className="h-14 w-14" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] text-[#1E6BFF] font-semibold">{p.id}</span>
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-zh bg-[#F0F4FF] text-[#1E6BFF]">{p.type}</span>
                    </div>
                    <p className="font-zh text-[13px] leading-[1.65] text-foreground/80 line-clamp-2">{p.title}</p>
                    <a
                      href={`/assets/patents/${encodeURIComponent(p.filename)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] text-foreground/40 hover:text-[#1E6BFF] transition-colors"
                    >
                      <FileText className="h-3 w-3" />
                      查看原文
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <button
            onClick={() => api?.scrollPrev()}
            className="absolute top-[40%] -left-5 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-foreground/70" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="absolute top-[40%] -right-5 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-foreground/70" />
          </button>
        </Carousel>
      </div>

      {/* Progress bar indicator */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full bg-foreground/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF77C3] to-[#8A6BFF] transition-all duration-300"
            style={{ width: count > 0 ? `${((current + 1) / count) * 100}%` : "0%" }}
          />
        </div>
        <span className="font-display text-[11px] text-foreground/35 shrink-0">
          {current + 1} / {count}
        </span>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: "easeOut" as const },
  }),
};

const VALUE_COLORS = ["#1E6BFF", "#8A6BFF", "#FF77C3", "#2AC58E", "#1E6BFF"];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        index="03"
        en="About Senz"
        title="一家基于 AI Native 与 RWD 的医疗科技公司"
        desc="深至致力于构建下一代“健康结果管理”的智能基础设施 — 为患者交付确定性的健康结果，为医生实现诊疗能力的智能跃迁，为医疗产业提供稀缺高价值的商业证据。"
        subs={ABOUT_SECTIONS}
        variant="blue"
        videoSrc={HERO_VIDEOS.about}
        posterSrc={HERO_POSTERS.about}
        tone="light"
      />

      {/* 1. 公司介绍 */}
      <section id="intro" className="relative scroll-mt-24 bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <SectionHeader index="03.1" en="Company" title="公司介绍" />
            <div className="mt-8 space-y-5 text-[14.5px] lg:text-[15.5px] leading-[1.95] text-foreground/75 font-zh">
              {ABOUT_INTRO.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="relative aspect-square rounded-[28px] overflow-hidden border border-border"
            >
              <img src={AI_FLOWLIGHT_SQUARE} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1E6BFF] via-[#8A6BFF] via-[#FF77C3] to-[#2AC58E]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-4">
                <div className="font-display text-[10.5px] tracking-[0.2em] uppercase text-foreground/50">
                  Senz · 深至科技
                </div>
                <div className="mt-1 font-zh text-[15px] font-bold text-foreground leading-snug">
                  从医学影像出发，交付确定性的健康结果。
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. 公司文化 */}
      <section id="culture" className="relative scroll-mt-24 bg-gradient-to-b from-[#F7F5FF] to-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="03.2" en="Culture" title="使命 · 愿景 · 价值主张" />
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {MISSION.map((m, i) => (
              <motion.div
                key={m.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-border bg-white p-7"
              >
                <div className="font-display text-[11px] tracking-[0.22em] uppercase text-foreground/45">
                  {m.label}
                </div>
                <div className="mt-3 font-zh text-[20px] font-black text-foreground leading-snug">
                  {m.text}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/45 font-display">
              价值观 · Values
            </div>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.k}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="relative rounded-2xl border border-border bg-white p-5 overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${VALUE_COLORS[i]}, transparent)` }} />
                  <div className="font-zh text-[16px] font-black text-foreground">{v.k}</div>
                  <div className="mt-2 text-[12.5px] leading-[1.8] text-foreground/65 font-zh">{v.v}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. 发展历程 — 纵向时间线 */}
      <section id="history" className="relative scroll-mt-24 bg-[#0B0F1E] text-white py-24 lg:py-32 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-[680px] w-[680px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(122,109,255,0.45), transparent)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-40 h-[640px] w-[640px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(255,119,195,0.30), transparent)" }}
        />
        <div className="relative container">
          <SectionHeader index="03.3" en="Milestones" title="发展历程 · 四大阶段" light />

          {/* 纵向时间线：中轴阁底 + 左右交错卸货（lg+） / 移动端其轴在左 */}
          <div className="mt-14 relative">
            {/* 中轴线 */}
            <div
              aria-hidden
              className="absolute top-0 bottom-0 left-5 lg:left-1/2 lg:-translate-x-1/2 w-px bg-gradient-to-b from-white/10 via-white/35 to-white/10"
            />
            <ol className="space-y-12 lg:space-y-16">
              {TIMELINE_STAGES.map((s, i) => {
                const isRight = i % 2 === 0; // lg+ 左右交错
                return (
                  <li key={s.stage} className="relative">
                    {/* 节点圆点 */}
                    <span
                      aria-hidden
                      className="absolute top-3 left-5 lg:left-1/2 lg:-translate-x-1/2 -translate-x-1/2 z-10 inline-flex h-3.5 w-3.5 items-center justify-center"
                    >
                      <span className="absolute h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#FF77C3] via-[#8A6BFF] to-[#1E6BFF] opacity-50 blur-[6px]" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
                    </span>

                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.55, ease: "easeOut" as const, delay: 0.05 }}
                      className={
                        "relative ml-12 lg:ml-0 lg:w-[calc(50%-2.25rem)] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 lg:p-7 " +
                        (isRight ? "lg:ml-[calc(50%+2.25rem)]" : "lg:mr-[calc(50%+2.25rem)]")
                      }
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-[11px] tracking-[0.22em] text-white/55 uppercase">
                          {s.stage}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
                      </div>
                      <h4 className="mt-3 font-display text-[22px] font-bold text-white">{s.title}</h4>
                      <p className="mt-2 text-[13px] leading-[1.85] text-white/70 font-zh">{s.desc}</p>
                      <ul className="mt-5 space-y-3">
                        {s.events.map((ev: { year: string; text: string }) => (
                          <li key={ev.year} className="flex gap-4 items-start">
                            <span className="min-w-[64px] font-display text-[14px] font-bold text-[#6B8BFF]">{ev.year}</span>
                            <span className="text-[12.5px] leading-[1.85] text-white/75 font-zh">{ev.text}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* 4. 资质荣誉 */}
      <HonorsSection />

      {/* 5. 知识产权 */}
      <PatentSwiperSection />

      {/* 6. 专家合作伙伴 */}
      <section id="experts" className="relative scroll-mt-24 bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="03.6" en="Expert Partners" title="专家合作伙伴" />
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" as const }}
            className="mt-10 rounded-3xl border border-border bg-gradient-to-r from-[#F4F1FF] via-[#FFF1F6] to-[#EAF2FF] px-8 lg:px-14 py-12"
          >
            <div className="flex items-start gap-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E6BFF] to-[#FF77C3] text-white shrink-0">
                <Sparkle className="h-5 w-5" />
              </div>
              <p className="text-[14.5px] lg:text-[15.5px] leading-[1.95] text-foreground/75 font-zh">
                {EXPERTS_NOTE}
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              {["临床医学 · 一线三甲", "医学影像 · 顶级专家", "AI / 公共卫生 · 学术机构"].map((k, i) => (
                <div
                  key={k}
                  className="rounded-2xl border border-foreground/10 bg-white px-4 py-3 flex items-center gap-2 text-[13px] font-zh"
                >
                  <ShieldCheck className="h-4 w-4 text-[#1E6BFF]" />
                  <span className="text-foreground/75">{k}</span>
                  <span className="ml-auto font-display text-[10.5px] tracking-[0.2em] text-foreground/35">
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
