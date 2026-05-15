/**
 * 飞书招聘官网公开职位（与社招门户列表对齐）。
 * 门户：https://p130box8iy5.jobs.feishu.cn/838328
 * 更新：可对照官网列表改文案与链接，或运行 scripts/sync-feishu-openings.mjs 重新抓取首屏职位。
 */
export const FEISHU_RECRUIT_PORTAL_URL = "https://p130box8iy5.jobs.feishu.cn/838328";

export type CareerOpening = {
  /** 职位名称 */
  k: string;
  /** 一句话摘要（官网 JD 提炼） */
  v: string;
  /** 地点 / 学历等 */
  loc: string;
  /** 飞书职位详情（投递入口） */
  href: string;
};

export const CAREERS_OPENINGS: CareerOpening[] = [
  {
    k: "用户增长总监（线下）",
    v: "渠道开拓与连锁药房合作，推动 CX 用药推荐落地，沉淀可全国推广的增长 SOP。",
    loc: "上海 · 本科及以上",
    href: `${FEISHU_RECRUIT_PORTAL_URL}/position/7639924482806958355/detail`,
  },
  {
    k: "全栈开发工程师—AI智能体",
    v: "智能体架构与多智能体协同、疗效数据处理与强化学习优化，支撑患者端疗效交付。",
    loc: "上海 · 本科及以上",
    href: `${FEISHU_RECRUIT_PORTAL_URL}/position/7639247040082102534/detail`,
  },
  {
    k: "产品经理（Px）",
    v: "围绕医生临床工作流做产品规划与 PRD 落地，数据驱动迭代与跨部门协同。",
    loc: "上海 · 本科及以上",
    href: `${FEISHU_RECRUIT_PORTAL_URL}/position/7638909920512330035/detail`,
  },
  {
    k: "全栈开发工程师-Px",
    v: "前后端一体化开发，深度集成 AI 中台能力，优化架构与性能。",
    loc: "上海",
    href: `${FEISHU_RECRUIT_PORTAL_URL}/position/7637085998443317530/detail`,
  },
  {
    k: "技术组长",
    v: "Dx 技术团队管理、技术方案与跨部门协同，推动产品技术升级。",
    loc: "上海 · 硕士及以上",
    href: `${FEISHU_RECRUIT_PORTAL_URL}/position/7637085880902240562/detail`,
  },
  {
    k: "AI技术专家",
    v: "全员 AI 个人助手与多智能体架构支持，制定标准化技术支持流程。",
    loc: "上海 · 本科及以上",
    href: `${FEISHU_RECRUIT_PORTAL_URL}/position/7637085565414967578/detail`,
  },
  {
    k: "AI组织专家",
    v: "AI 医疗数字化员工与全员助手普及的组织规划、节奏与跨部门协同。",
    loc: "上海 · 本科及以上",
    href: `${FEISHU_RECRUIT_PORTAL_URL}/position/7637085185838975275/detail`,
  },
  {
    k: "资深会计",
    v: "全盘账务、纳税申报与合同财务审核，协助预算与流程优化。",
    loc: "上海",
    href: `${FEISHU_RECRUIT_PORTAL_URL}/position/7637047728413296905/detail`,
  },
  {
    k: "融资经理",
    v: "融资计划与银行对接、战略项目资金与资本结构优化配合。",
    loc: "上海",
    href: `${FEISHU_RECRUIT_PORTAL_URL}/position/7637047414394063110/detail`,
  },
  {
    k: "全栈开发工程师",
    v: "Agent 工具集成与插件体系、对话与多模态交互前端与任务结果呈现。",
    loc: "上海 · 本科及以上",
    href: `${FEISHU_RECRUIT_PORTAL_URL}/position/7637042709366180147/detail`,
  },
];
