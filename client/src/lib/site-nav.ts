/** 全站主导航（顶栏、页脚等共用） */
export type SubItem = { label: string; href: string; desc?: string };
export type NavItem = { label: string; href: string; sub?: SubItem[] };

export const SITE_NAV: NavItem[] = [
  { label: "首页", href: "/" },
  {
    label: "平台技术",
    href: "/platform",
    sub: [
      { label: "原生 AI 终端体系", href: "/platform#terminal" },
      { label: "健康管理协同系统", href: "/platform#neuro" },
      { label: "知识产权", href: "/platform#ip" },
    ],
  },
  {
    label: "解决方案",
    href: "/products",
    sub: [
      { label: "慢病管理业务", href: "/products#patient", desc: "橙欣健康 Cx · 个性化结果交付" },
      { label: "医生临床业务", href: "/products#doctor", desc: "暖欣健康 Dx · 专业能力增强伙伴" },
      { label: "药企业务", href: "/products#industry", desc: "信欣健康 Px · 真实世界数据闭环" },
    ],
  },
  {
    label: "关于深至",
    href: "/about",
    sub: [
      { label: "公司介绍", href: "/about#intro" },
      { label: "公司文化", href: "/about#culture" },
      { label: "发展历程", href: "/about#history" },
      { label: "资质荣誉", href: "/about#honors" },
      { label: "新闻中心", href: "/about#news" },
      { label: "总部地址", href: "/about#address" },
    ],
  },
  {
    label: "加入我们",
    href: "/careers",
    sub: [
      { label: "办公环境", href: "/careers#office" },
      { label: "员工活动", href: "/careers#life" },
      { label: "开放职位", href: "/careers#openings" },
    ],
  },
];
