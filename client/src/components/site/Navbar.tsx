/**
 * Senz · v1.5 Navbar — 多页面 + 二级下拉
 * 一级：首页 / 平台技术 / 解决方案 / 关于深至 / 加入我们（深至故事等锚点在「关于深至」页）
 * 玻璃白 + 极光下划线 hover；下拉浮卡显示二级
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { SENZ_LOGO } from "@/lib/assets";
import { handleInPageHashNav } from "@/lib/inPageHashNav";
import { SITE_NAV } from "@/lib/site-nav";

const NAV = SITE_NAV;

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
                            onClick={(e) => handleInPageHashNav(e, s.href, loc)}
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
                        onClick={(e) => handleInPageHashNav(e, s.href, loc)}
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
