/**
 * Senz 视频素材集中管理
 * - HERO_VIDEOS：每个页面的真人实拍 Hero 背景（已重新打包 +faststart：moov atom 在文件头部）
 * - HERO_POSTERS：与之同帧、同色系的静态首帧 webp，用于第一时间填充
 * - VIDEOS：业务循环 b-roll
 */
export const VIDEOS = {
  brandReel: "/manus-storage/senz_brand_reel_ec8890d0.mp4",
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
  /** 首页视频4.mp4 → manus-storage 规范命名（v10） */
  home: "/manus-storage/senz_hero_home_v10_e42264da.mp4",
  /** 飞书20260512-112037.mp4 截取 0:51–1:09（18s），H.264 + faststart */
  platform: "/manus-storage/hero_platform_feishu_51_69_8c4e2a91.mp4",
  products: "/manus-storage/hero_products_live_90fb4cd2.mp4",
  patient: "/manus-storage/hero_patient_live_375d336e.mp4",
  doctor: "/manus-storage/hero_doctor_live_acf70466.mp4",
  industry: "/manus-storage/hero_industry_live_b2bffbd0.mp4",
  about: "/manus-storage/hero_about_live_106baeda.mp4",
  news: "/manus-storage/senz_hero_news_v2_69e2baa6.mp4",
  careers: "/manus-storage/hero_careers_live_e1fcceb7.mp4",
  contact: "/manus-storage/senz_hero_contact_v2_fbe942c4.mp4",
} as const;

/** 与 HERO_VIDEOS 一一对应的同色系首帧 webp 静态图（~40-80KB） */
export const HERO_POSTERS = {
  home: "/manus-storage/senz_hero_home_v10_e42264da.png",
  platform: "/manus-storage/hero_platform_feishu_51_69_8c4e2a91.webp",
  products: "/manus-storage/hero_products_live_31494b85.webp",
  patient: "/manus-storage/hero_patient_live_a334c03e.webp",
  doctor: "/manus-storage/hero_doctor_live_97013ef3.webp",
  industry: "/manus-storage/hero_industry_live_817e244e.webp",
  about: "/manus-storage/hero_about_live_7751f73f.webp",
  news: "/manus-storage/senz_hero_news_v2_9d780267.webp",
  careers: "/manus-storage/hero_careers_live_3568f430.webp",
  contact: "/manus-storage/senz_hero_contact_v2_b52ca8c3.webp",
} as const;

export type HeroKey = keyof typeof HERO_VIDEOS;

/** 首页 Hero 主视频（首页视频4 素材 · v10）；双字段同址，保留 leftVideo 字段名兼容旧调用
 * 若仅更换 mp4，请从新视频截取首帧覆盖 `senz_hero_home_v10_e42264da.png`，与 `client/index.html` preload 一致。 */
export const HERO_SPLIT = {
  leftVideo: "/manus-storage/senz_hero_home_v10_e42264da.mp4",
  leftPoster: "/manus-storage/senz_hero_home_v10_e42264da.png",
  rightVideo: "/manus-storage/senz_hero_home_v10_e42264da.mp4",
  rightPoster: "/manus-storage/senz_hero_home_v10_e42264da.png",
} as const;
