/**
 * 资质荣誉 — 合并版
 * 左：Swiper fade 粘性图区（hover 驱动切换）
 * 右：可滚动 / 可触控划动的列表（overflow-y scroll）
 */
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

/* ─── 数据 ─── */
type AwardItem = { label: string; thumb: string; category: "荣誉" | "资质" };

function img(folder: "honors" | "qualifications", file: string) {
  return `/assets/${folder}/${encodeURIComponent(file)}`;
}

const HONORS: AwardItem[] = [
  { label: "AIIA杯人工智能医疗大赛优胜奖", thumb: img("honors", "image.png"), category: "荣誉" },
  { label: "2020大健康项目路演优质企业奖", thumb: img("honors", "02.JPG"), category: "荣誉" },
  { label: "2020第四届SATOL生命科技创新创业大赛 创业奖TOP10", thumb: img("honors", "03.JPG"), category: "荣誉" },
  { label: "2021年中国最具社会影响力的20家创业公司", thumb: img("honors", "image(1).png"), category: "荣誉" },
  { label: "微软创业加速器 2021年春季 ScaleUp计划成员", thumb: img("honors", "image(2).png"), category: "荣誉" },
  { label: "2020-2021未来医疗100强 · 中国数字医疗榜TOP100", thumb: img("honors", "image(3).png"), category: "荣誉" },
  { label: "第五届英特尔AI百佳创新激励计划优秀团队", thumb: img("honors", "image(4).png"), category: "荣誉" },
  { label: "第十届创新创业大赛全国赛 成长组优秀企业", thumb: img("honors", "image(5).png"), category: "荣誉" },
  { label: "2021年数字医疗解决方案创新挑战赛最佳商业模式奖", thumb: img("honors", "image(6).png"), category: "荣誉" },
  { label: "2021 人工智能医疗创新 TOP50", thumb: img("honors", "image(7).png"), category: "荣誉" },
  { label: "2021AIWIN（秋季）应用创新赛 数字赋能奖", thumb: img("honors", "11.JPG"), category: "荣誉" },
  { label: "投中榜2021年度中国医疗服务产业最佳医疗服务领域投资案例TOP10", thumb: img("honors", "image(8).png"), category: "荣誉" },
  { label: "2022未来医疗100强 · 中国创新医疗器械榜TOP100", thumb: img("honors", "13.JPG"), category: "荣誉" },
  { label: "2022未来医疗100强 · 价值领域榜", thumb: img("honors", "image(9).png"), category: "荣誉" },
  { label: "行业展示 · 优秀企业 / 卓越企业", thumb: img("honors", "15-1.JPG"), category: "荣誉" },
  { label: "实时解决方案奖 Real-time Solution Award", thumb: img("honors", "image(10).png"), category: "荣誉" },
  { label: "2022年中国大健康数字医疗 · 中国AI医疗企业TOP20", thumb: img("honors", "17.JPG"), category: "荣誉" },
  { label: "医疗器械年度优秀创新案例", thumb: img("honors", "18.JPG"), category: "荣誉" },
  { label: "2023未来医疗100强 · 中国创新医疗器械榜TOP100", thumb: img("honors", "19.JPG"), category: "荣誉" },
  { label: "《麻省理工科技评论》中国AI+创业大赛总决赛三等奖", thumb: img("honors", "20.JPG"), category: "荣誉" },
  { label: "2023中国AI医疗企业TOP20", thumb: img("honors", "21.JPG"), category: "荣誉" },
  { label: "2023年度中国医疗器械企业新锐100强", thumb: img("honors", "image(11).png"), category: "荣誉" },
  { label: "2023年度医疗器械产业专项奖", thumb: img("honors", "DSC_2221.JPG"), category: "荣誉" },
  { label: "「预见·2023」创业榜TOP30", thumb: img("honors", "image(12).png"), category: "荣誉" },
  { label: "2024未来医疗100强 · 中国创新器械与智能制造榜TOP100", thumb: img("honors", "25.JPG"), category: "荣誉" },
  { label: "2024中国生物医药领跑者TOP100", thumb: img("honors", "26.JPG"), category: "荣誉" },
  { label: "2024医疗器械行业医学影像领域创新指数TOP10", thumb: img("honors", "image(13).png"), category: "荣誉" },
  { label: "2025未来医疗100强 · 中国创新器械与智能制造榜TOP100", thumb: img("honors", "28.JPG"), category: "荣誉" },
  { label: "2025中国生物医药领跑者100", thumb: img("honors", "29.JPG"), category: "荣誉" },
];

const QUALIFICATIONS: AwardItem[] = [
  { label: "上海专精特新中小企业", thumb: img("qualifications", "1-02.JPG"), category: "资质" },
  { label: "上海创新型中小企业", thumb: img("qualifications", "1-03.JPG"), category: "资质" },
  { label: '专精特新"小巨人"企业', thumb: img("qualifications", "1-04.JPG"), category: "资质" },
  { label: "上海专家工作站", thumb: img("qualifications", "1-05.JPG"), category: "资质" },
  { label: "上海高新技术企业", thumb: img("qualifications", "image.png"), category: "资质" },
  { label: "浙江高新技术企业", thumb: img("qualifications", "image(1).png"), category: "资质" },
  { label: "长三角医药创新服务联盟成员", thumb: img("qualifications", "image(2).png"), category: "资质" },
  { label: "中国国际投资促进会扶贫与发展委员会战略合作伙伴", thumb: img("qualifications", "image(3).png"), category: "资质" },
  { label: "上海市人工智能行业协会会员单位", thumb: img("qualifications", "1-13.JPG"), category: "资质" },
  { label: "基层医学影像中心 · 远程超声医联体合作单位", thumb: img("qualifications", "1-14.JPG"), category: "资质" },
  { label: "中国非公立医疗机构协会超声专业委员会会员单位", thumb: img("qualifications", "image(4).png"), category: "资质" },
];

const ALL_AWARDS: AwardItem[] = [...HONORS, ...QUALIFICATIONS];

/* ─── 渐变标题 ─── */
const gradientTextStyle: React.CSSProperties = {
  background: "radial-gradient(circle at 20% 50%, #9333ea 0%, #7c3aed 40%, #db2777 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

/* ─── 类目徽标颜色（浅色背景版） ─── */
const CATEGORY_COLOR: Record<AwardItem["category"], string> = {
  荣誉: "rgba(168,85,247,0.12)",
  资质: "rgba(59,130,246,0.12)",
};
const CATEGORY_TEXT_COLOR: Record<AwardItem["category"], string> = {
  荣誉: "#9333ea",
  资质: "#2563eb",
};

/* ─── 导出 Section ─── */
export default function HonorsSection() {
  const leftSwiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  const handleActivate = (i: number) => {
    setActive(i);
    leftSwiperRef.current?.slideTo(i);
  };

  return (
    <section
      id="honors"
      className="relative scroll-mt-24 py-24 lg:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FDF4FF 0%, #F5F0FF 35%, #FFF0F7 70%, #F0F4FF 100%)",
      }}
    >
      {/* 背景光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 -left-48 h-[640px] w-[640px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(192,132,252,0.35), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(244,114,182,0.30), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-1/4 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.25), transparent)" }}
      />

      <div className="relative container">
        {/* ── Section 标签 ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="font-display text-[11px] tracking-[0.28em] uppercase text-foreground/35 mb-4">
            03.4 · Honors &amp; Qualifications
          </div>

          {/* 大标题 + 总数 */}
          <div className="flex items-baseline gap-4">
            <h2
              className="font-zh text-[52px] lg:text-[72px] font-black leading-none tracking-tight"
              style={gradientTextStyle}
            >
              资质荣誉
            </h2>
            <span className="text-foreground/25 text-[16px] font-display tracking-[0.15em]">
              {ALL_AWARDS.length}
            </span>
          </div>
        </motion.div>

        {/* ── 横幅：自动轮播（透明底，无白色背景） ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
          className="mb-14 rounded-2xl overflow-hidden"
          style={{ height: "280px" }}
        >
          <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 2200, disableOnInteraction: false }}
            speed={1000}
            loop
            allowTouchMove={false}
            className="w-full h-full"
          >
            {ALL_AWARDS.map((item, i) => (
              <SwiperSlide key={i} className="flex items-center justify-center">
                <img
                  src={item.thumb}
                  alt={item.label}
                  className="h-full object-contain mx-auto"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* ── 双栏主体 ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid gap-10 items-start"
          style={{ gridTemplateColumns: "1fr auto" }}
        >
          {/* 左侧：粘性 Fade Swiper */}
          <div className="hidden lg:block" style={{ position: "sticky", top: "100px" }}>
            <div
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ width: "490px", aspectRatio: "4/3" }}
            >
              <Swiper
                modules={[EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={1400}
                allowTouchMove={false}
                onSwiper={(s) => { leftSwiperRef.current = s; }}
                className="w-full h-full"
              >
                {ALL_AWARDS.map((item, i) => (
                  <SwiperSlide key={i} className="!flex h-full items-center justify-center">
                    <img
                      src={item.thumb}
                      alt={item.label}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* 右侧：可滚动列表（mouse wheel + touch swipe） */}
          <div style={{ width: "547px", maxWidth: "100%" }}>
            {/* 提示文字 */}
            <div className="mb-3 flex items-center gap-2 text-foreground/30 text-[11px] font-display tracking-wider select-none">
              <span>上下滑动浏览</span>
              <span className="flex-1 h-px bg-foreground/10" />
              <span>
                <span style={{ color: CATEGORY_TEXT_COLOR["荣誉"] }}>荣誉</span>
                {" · "}
                <span style={{ color: CATEGORY_TEXT_COLOR["资质"] }}>资质</span>
              </span>
            </div>

            {/* 滚动容器 */}
            <div
              className="overflow-y-auto overscroll-contain
                [&::-webkit-scrollbar]:w-[2px]
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-foreground/15"
              style={{ height: "520px" }}
            >
              {ALL_AWARDS.map((item, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={i}
                    className="relative py-[14px] cursor-pointer select-none"
                    onMouseEnter={() => handleActivate(i)}
                    onClick={() => handleActivate(i)}
                  >
                      {/* 常态分割线 */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/8" />

                      {/* 活跃高亮线（紫色渐变） */}
                      <div
                        className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
                        style={{
                          width: isActive ? "100%" : "60%",
                          opacity: isActive ? 1 : 0,
                          background: "linear-gradient(90deg, #9333ea, #db2777)",
                        }}
                      />

                      <div className="flex items-center gap-3">
                        {/* 序号 */}
                        <span
                          className="font-mono text-[11px] shrink-0 transition-colors duration-300 w-6 text-right"
                          style={{
                            color: isActive ? "#9333ea" : "rgba(0,0,0,0.2)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* 类目徽标 */}
                        <span
                          className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-zh leading-none"
                          style={{
                            background: CATEGORY_COLOR[item.category],
                            color: CATEGORY_TEXT_COLOR[item.category],
                          }}
                        >
                          {item.category}
                        </span>

                        {/* 标题 */}
                        <span
                          className="font-zh text-[14px] lg:text-[15px] leading-snug transition-colors duration-300"
                          style={{
                            color: isActive ? "#1a0533" : "rgba(0,0,0,0.45)",
                          }}
                        >
                          {item.label}
                        </span>
                      </div>

                      {/* 移动端缩略图 */}
                      {isActive && (
                        <div className="lg:hidden mt-3 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                          <img
                            src={item.thumb}
                            alt={item.label}
                            className="max-w-full max-h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
