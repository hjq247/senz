/**
 * Senz · v1.5 共用页面外壳
 * - 顶部导航：首页 / 平台技术 / 解决方案 / 关于深至 / 加入我们
 * - 页脚：横向多列，每列一级入口 + 纵向子链（与顶栏一致）
 * - 路由切换后同步滚顶（useLayoutEffect + instant，避免跨页先闪一帧再跳）
 */
import { ReactNode, useEffect, useLayoutEffect } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/site/Navbar";
import { handleInPageHashNav } from "@/lib/inPageHashNav";
import { SITE_NAV, type NavItem } from "@/lib/site-nav";
import { HERO_VIDEOS, HERO_POSTERS, type HeroKey } from "@/lib/videos";

/** 页脚不重复「首页」（Logo 已可回首页） */
const FOOTER_NAV = SITE_NAV.filter((item) => item.href !== "/");

function routeToHero(loc: string): HeroKey | null {
  if (loc === "/") return "home";
  if (loc.startsWith("/platform")) return "platform";
  if (loc.startsWith("/products/patient") || loc.startsWith("/solutions/patient")) return "patient";
  if (loc.startsWith("/products/doctor") || loc.startsWith("/solutions/doctor")) return "doctor";
  if (loc.startsWith("/products/industry") || loc.startsWith("/solutions/industry")) return "industry";
  if (loc.startsWith("/products")) return "products";
  if (loc.startsWith("/about")) return "about";
  if (loc.startsWith("/careers")) return "careers";
  return null;
}

/** 在路由切换后，为当前页的 Hero 视频 + poster 插入 <link rel="preload"> 以预热下一跨页之前的加载 */
function usePreloadHero(loc: string) {
  useEffect(() => {
    const key = routeToHero(loc);
    if (!key) return;
    const v = HERO_VIDEOS[key];
    const p = HERO_POSTERS[key];
    const links: HTMLLinkElement[] = [];

    const mkLink = (as: string, href: string, type?: string) => {
      const exists = document.head.querySelector(
        `link[rel="preload"][as="${as}"][href="${href}"]`
      );
      if (exists) return;
      const l = document.createElement("link");
      l.rel = "preload";
      l.as = as;
      l.href = href;
      if (type) l.type = type;
      if (as === "image") l.setAttribute("fetchpriority", "high");
      document.head.appendChild(l);
      links.push(l);
    };

    const imageType = p.endsWith(".png") ? "image/png" : "image/webp";
    mkLink("image", p, imageType);
    mkLink("video", v, "video/mp4");

    return () => {
      links.forEach((l) => l.remove());
    };
  }, [loc]);
}

export default function PageShell({ children }: { children: ReactNode }) {
  const [loc] = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    const id = window.location.hash.slice(1);
    if (id) {
      queueMicrotask(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "instant" as ScrollBehavior,
          block: "start",
        });
      });
    }
  }, [loc]);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      queueMicrotask(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "instant" as ScrollBehavior,
          block: "start",
        });
      });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  usePreloadHero(loc);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  const [loc] = useLocation();
  return (
    <footer className="relative mt-0 border-t border-border bg-white">
      <div className="container py-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5 flex flex-row items-start gap-4 sm:gap-6">
          <img
            src="/images/wechat-official-account.png"
            alt="深至科技微信公众号"
            className="w-[88px] sm:w-[100px] h-auto rounded-lg border border-border shadow-sm shrink-0"
            width={100}
          />
          <div className="min-w-0">
            <div className="font-display text-[12px] tracking-[0.32em] uppercase text-foreground/45">
              Senz · 深至科技
            </div>
            <div className="mt-3 font-zh text-[18px] font-bold text-foreground/85 max-w-md leading-snug">
              让全球每一位医生都能用上医学影像。
            </div>
          </div>
        </div>

        <nav
          aria-label="页脚导航"
          className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10 sm:gap-x-8"
        >
          {FOOTER_NAV.map((item) => (
            <FootSection key={item.href} item={item} loc={loc} />
          ))}
        </nav>
      </div>
    </footer>
  );
}

function FootSection({ item, loc }: { item: NavItem; loc: string }) {
  return (
    <div className="min-w-0">
      <Link
        href={item.href}
        className="text-[14px] font-bold font-zh text-foreground/90 hover:text-[#1E6BFF] transition-colors"
      >
        {item.label}
      </Link>
      {item.sub && item.sub.length > 0 ? (
        <ul className="mt-3 space-y-2.5">
          {item.sub.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                onClick={(e) => handleInPageHashNav(e, s.href, loc)}
                className="text-[12.5px] leading-snug text-foreground/65 hover:text-[#1E6BFF] transition-colors font-zh"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
