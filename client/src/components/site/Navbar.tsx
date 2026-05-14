/**
 * Senz · v1.5 Navbar — 多页面 + 二级下拉
 * 一级：首页 / 平台技术 / 解决方案 / 关于深至 / 新闻中心 / 加入我们 / 联系我们
 * 玻璃白 + 极光下划线 hover；下拉浮卡显示二级
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { SENZ_LOGO } from "@/lib/assets";

type SubItem = { label: string; href: string; desc?: string };
type NavItem = { label: string; href: string; sub?: SubItem[] };

const NAV: NavItem[] = [
  { label: "首页", href: "/" },
  {
    label: "平台技术",
    href: "/platform",
    sub: [
      { label: "原生 AI 终端体系", href: "/platform#terminal", desc: "硬件 × 算法 × 模型 × 用户 四位一体" },
      { label: "健康管理协同系统", href: "/platform#neuro", desc: "Neuro AI 大脑驱动三大智能体" },
    ],
  },
  {
    label: "解决方案",
    href: "/products",
    sub: [
      { label: "慢病管理业务", href: "/products#patient", desc: "橙欣健康 Cx · 个性化结果交付" },
      { label: "医生临床业务", href: "/products#doctor", desc: "暖欣健康 Dx · AI 共智 / 共训" },
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
      { label: "知识产权", href: "/about#ip" },
      { label: "专家合作伙伴", href: "/about#experts" },
    ],
  },
  {
    label: "新闻中心",
    href: "/news",
    sub: [
      { label: "深至故事", href: "/news#stories" },
      { label: "媒体报道", href: "/news#media" },
      { label: "社会责任", href: "/news#csr" },
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
  {
    label: "联系我们",
    href: "/contact",
    sub: [
      { label: "联系邮箱", href: "/contact#emails" },
      { label: "联系方式", href: "/contact#phones" },
      { label: "公司地址 · 地图", href: "/contact#address" },
      { label: "公众号", href: "/contact#wechat" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [loc] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setHover(null);
  }, [loc]);

  const isActive = (href: string) => {
    if (href === "/") return loc === "/";
    return loc === href || loc.startsWith(href + "/");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/75 backdrop-blur-xl backdrop-saturate-150 border-b border-white/60 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-20px_rgba(80,70,180,0.2)]"
          : "bg-white/40 backdrop-blur-md"
      }`}
      onMouseLeave={() => setHover(null)}
    >
      <nav className="container flex h-16 lg:h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img
            src={SENZ_LOGO}
            alt="深至科技 Senz"
            className="h-7 lg:h-8 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-1 text-[13.5px] font-medium text-foreground/80">
          {NAV.map((item) => (
            <li
              key={item.href}
              className="relative"
              onMouseEnter={() => setHover(item.href)}
            >
              <Link
                href={item.href}
                className={`relative inline-flex items-center gap-1 px-3 py-2 rounded-full transition-colors ${
                  isActive(item.href)
                    ? "text-[#1E6BFF]"
                    : "hover:text-foreground"
                }`}
              >
                <span>{item.label}</span>
                {item.sub && (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                )}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full transition-all duration-300 ${
                    isActive(item.href)
                      ? "opacity-100 bg-gradient-to-r from-[#1E6BFF] via-[#8A6BFF] via-[#FF77C3] to-[#2AC58E]"
                      : "opacity-0"
                  }`}
                />
              </Link>

              {/* dropdown */}
              {item.sub && hover === item.href && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-40">
                  <div className="min-w-[280px] max-w-[360px] rounded-2xl border border-white/70 bg-white/90 backdrop-blur-2xl shadow-[0_24px_60px_-20px_rgba(60,50,160,0.25)] overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1E6BFF] via-[#8A6BFF] via-[#FF77C3] to-[#2AC58E]" />
                    <ul className="p-2">
                      {item.sub.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-[#1E6BFF]/5 hover:to-[#FF77C3]/5 transition-colors"
                          >
                            <div className="text-[13.5px] font-bold text-foreground font-zh">
                              {s.label}
                            </div>
                            {s.desc && (
                              <div className="mt-0.5 text-[12px] text-foreground/55 leading-snug font-zh">
                                {s.desc}
                              </div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/80"
            aria-label="menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* mobile */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-400 ${
          open ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
        } bg-white/95 backdrop-blur-xl border-b border-border`}
      >
        <ul className="container py-4 grid gap-1">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-3 py-3 rounded-lg text-[15px] font-medium ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-[#1E6BFF]/10 to-[#FF77C3]/10 text-[#1E6BFF]"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
              {item.sub && (
                <ul className="pl-4 pb-2 grid gap-0.5">
                  {item.sub.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="block px-3 py-2 rounded-md text-[13px] text-foreground/70 hover:text-[#1E6BFF]"
                      >
                        — {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
