/**
 * Senz · v1.5 共用页面外壳
 * - 顶部导航 6 个一级
 * - 页脚（精简）
 * - 路由切换后同步滚顶（useLayoutEffect + instant，避免跨页先闪一帧再跳）
 */
import { ReactNode, useEffect, useLayoutEffect } from "react";
import { Link, useLocation } from "wouter";
import { Mail } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import { HERO_VIDEOS, HERO_POSTERS, type HeroKey } from "@/lib/videos";

function routeToHero(loc: string): HeroKey | null {
  if (loc === "/") return "home";
  if (loc.startsWith("/platform")) return "platform";
  if (loc.startsWith("/products/patient") || loc.startsWith("/solutions/patient")) return "patient";
  if (loc.startsWith("/products/doctor") || loc.startsWith("/solutions/doctor")) return "doctor";
  if (loc.startsWith("/products/industry") || loc.startsWith("/solutions/industry")) return "industry";
  if (loc.startsWith("/products")) return "products";
  if (loc.startsWith("/about")) return "about";
  if (loc.startsWith("/news")) return "news";
  if (loc.startsWith("/careers")) return "careers";
  if (loc.startsWith("/contact")) return "contact";
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
  }, [loc]);
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
  return (
    <footer className="relative mt-0 border-t border-border bg-white">
      <div className="container py-14 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="font-display text-[12px] tracking-[0.32em] uppercase text-foreground/45">
            Senz · 深至科技
          </div>
          <div className="mt-3 font-zh text-[18px] font-bold text-foreground/85 max-w-md leading-snug">
            让全球每一位医生都能用上医学影像。
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-[13px] text-foreground/70">
            <Mail className="h-4 w-4 text-[#1E6BFF]" />
            business@senzco.com
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
          <FootCol title="Platform" links={[["平台技术", "/platform"]]} />
          <FootCol
            title="Products"
            links={[
              ["药企业务", "/products#industry"],
              ["医生临床业务", "/products#doctor"],
              ["慢病管理业务", "/products#patient"],
            ]}
          />
          <FootCol
            title="Company"
            links={[
              ["关于深至", "/about"],
              ["新闻中心", "/news"],
              ["加入我们", "/careers"],
              ["联系我们", "/contact"],
            ]}
          />
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[12px] text-foreground/55 font-display">
          <div>© {new Date().getFullYear()} Senz · 深至科技. All rights reserved.</div>
          <div>沪 ICP 备案号待补充 · 沪公网安备号待补充</div>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="font-display text-[11px] tracking-[0.3em] uppercase text-foreground/45">
        {title}
      </div>
      <ul className="mt-4 space-y-3">
        {links.map(([k, href]) => (
          <li key={k}>
            <Link
              href={href}
              className="text-[13.5px] text-foreground/80 hover:text-[#1E6BFF] transition-colors font-zh"
            >
              {k}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
