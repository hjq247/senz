/**
 * Senz 视频素材集中管理
 * - HERO_VIDEOS：每个页面的真人实拍 Hero 背景（已重新打包 +faststart：moov atom 在文件头部）
 * - HERO_POSTERS：与之同帧、同色系的静态首帧 webp，用于第一时间填充
 * - VIDEOS：业务循环 b-roll
 */
export const VIDEOS = {
  /** 患者端品牌（v2 真人出镜温暖电影感 6s） */
  patientLoop: "/manus-storage/senz_cx_v2_6f6a9e80.mp4",
  /** 医生端 AI 临床伙伴（v2 真人出镜虚实结合 5s） */
  doctorLoop: "/manus-storage/senz_dx_v2_0714fc59.mp4",
  /** 药企端品牌（v2 真人出镜虚实结合 5s） */
  pharmaLoop: "/manus-storage/senz_px_v2_2aab0102.mp4",
  /** AI 能力展示（HomeBrandReel 右侧） */
  aiCapability: "/manus-storage/senz_ai_capability_34dce694.mp4",
  neuroFlow: "/manus-storage/senz_neuro_flow_17709288.mp4",
} as const;

/** 与 VIDEOS 同帧 webp poster */
export const VIDEO_POSTERS = {
  patientLoop: "/manus-storage/senz_cx_v2_ce16ad54.webp",
  doctorLoop: "/manus-storage/senz_dx_v2_2adf9926.webp",
  pharmaLoop: "/manus-storage/senz_px_v2_c0e28c64.webp",
  aiCapability: "/manus-storage/senz_ai_capability_71ee1f45.webp",
} as const;

/** 各页面 Hero 真人实拍背景视频（faststart 版本） */
export const HERO_VIDEOS = {
  /** 首页 Hero（13s）· v12 lite：720p / CRF 28 / faststart，约 2MB */
  home: "/manus-storage/senz_hero_home_v12_lite_de2b59ad.mp4",
  /** 飞书20260512-112037.mp4 截取 0:51–1:09（18s），H.264 + faststart */
  platform: "/manus-storage/hero_platform_feishu_51_69_8c4e2a91.mp4",
  products: "/manus-storage/hero_products_live_90fb4cd2.mp4",
  patient: "/manus-storage/hero_patient_live_375d336e.mp4",
  doctor: "/manus-storage/hero_doctor_live_acf70466.mp4",
  industry: "/manus-storage/hero_industry_live_b2bffbd0.mp4",
  about: "/manus-storage/hero_about_live_106baeda.mp4",
  news: "/manus-storage/senz_hero_news_v2_69e2baa6.mp4",
  careers: "/manus-storage/hero_careers_live_e1fcceb7.mp4",
} as const;

/** 与 HERO_VIDEOS 一一对应的同色系首帧 webp 静态图（~40-80KB） */
export const HERO_POSTERS = {
  home: "/manus-storage/senz_hero_home_v12_lite_de2b59ad.webp",
  platform: "/manus-storage/hero_platform_feishu_51_69_8c4e2a91.webp",
  products: "/manus-storage/hero_products_live_31494b85.webp",
  patient: "/manus-storage/hero_patient_live_a334c03e.webp",
  doctor: "/manus-storage/hero_doctor_live_97013ef3.webp",
  industry: "/manus-storage/hero_industry_live_817e244e.webp",
  about: "/manus-storage/hero_about_live_7751f73d.webp",
  news: "/manus-storage/senz_hero_news_v2_9d780267.webp",
  careers: "/manus-storage/hero_careers_live_3568f430.webp",
} as const;

export type HeroKey = keyof typeof HERO_VIDEOS;

/** Hero 低清首播层：480w / no-audio / faststart，先动起来，再切高清 */
export const HERO_PREVIEWS = {
  home: "/manus-storage/senz_hero_home_v12_preview_480p.mp4",
  platform: "/manus-storage/hero_platform_feishu_51_69_8c4e2a91_preview_480p.mp4",
  products: "/manus-storage/hero_products_live_90fb4cd2_preview_480p.mp4",
  patient: "/manus-storage/hero_patient_live_375d336e_preview_480p.mp4",
  doctor: "/manus-storage/hero_doctor_live_acf70466_preview_480p.mp4",
  industry: "/manus-storage/hero_industry_live_b2bffbd0_preview_480p.mp4",
  about: "/manus-storage/hero_about_live_106baeda_preview_480p.mp4",
  news: "/manus-storage/senz_hero_news_v2_69e2baa6_preview_480p.mp4",
  careers: "/manus-storage/hero_careers_live_e1fcceb7_preview_480p.mp4",
} as const;

export function getHeroPreview(videoSrc?: string) {
  if (!videoSrc) return undefined;
  const found = Object.entries(HERO_VIDEOS).find(([, src]) => src === videoSrc);
  return found ? HERO_PREVIEWS[found[0] as HeroKey] : undefined;
}

/** 首页 Hero 主视频（v12 lite）；双字段同址，保留 leftVideo 字段名兼容旧调用 */
export const HERO_SPLIT = {
  /** 低清首播层：480w / faststart / ~160KB，用于立即动起来 */
  previewVideo: HERO_PREVIEWS.home,
  leftVideo: "/manus-storage/senz_hero_home_v12_lite_de2b59ad.mp4",
  /** 首屏占位：webp ~32KB，先于视频显示 */
  leftPoster: "/manus-storage/senz_hero_home_v12_lite_de2b59ad.webp",
  rightVideo: "/manus-storage/senz_hero_home_v12_lite_de2b59ad.mp4",
  rightPoster: "/manus-storage/senz_hero_home_v12_lite_de2b59ad.webp",
  /** video[poster] 兜底（Safari 等对 webp poster 支持不稳时用 PNG） */
  rightPosterFallback: "/manus-storage/senz_hero_home_v12_lite_de2b59ad.png",
} as const;
