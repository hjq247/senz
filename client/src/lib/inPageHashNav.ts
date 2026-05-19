import type { MouseEvent } from "react";

/** 移动端菜单关闭（锚点跳转前需先解锁 body 滚动） */
export const MOBILE_NAV_CLOSE_EVENT = "senz:close-mobile-nav";

/** 跨页导航时 wouter 可能丢失 hash，先记下目标锚点 */
let pendingHashId: string | null = null;

export function parseHashHref(
  href: string
): { path: string; id: string } | null {
  const hashIdx = href.indexOf("#");
  if (hashIdx < 0) return null;
  const path = href.slice(0, hashIdx) || "/";
  const id = href.slice(hashIdx + 1);
  if (!id) return null;
  return { path, id };
}

export function normalizeHashId(id: string): string {
  return ["stories", "csr", "media"].includes(id) ? "news" : id;
}

function stripHash(path: string): string {
  return path.split("#")[0] || "/";
}

function isSamePath(currentPath: string, targetPath: string): boolean {
  const current = stripHash(currentPath);
  const target = stripHash(targetPath);
  if (current === target) return true;
  return current.startsWith(target + "/");
}

function getCurrentBrowserPath(fallbackPath: string): string {
  if (typeof window === "undefined") return fallbackPath;
  return window.location.pathname || fallbackPath;
}

/** 测量固定顶栏高度，用于锚点偏移 */
export function getSiteNavOffset(): number {
  if (typeof document === "undefined") return 72;
  const topNav = document.querySelector("header > nav");
  if (topNav) return Math.ceil(topNav.getBoundingClientRect().height);
  const header = document.querySelector("header");
  if (!header) return 72;
  return Math.min(Math.ceil(header.getBoundingClientRect().height), 72);
}

/** 若手机菜单用 position:fixed 锁了滚动，先恢复再返回当时的 scrollY */
export function releaseMobileNavScrollLock(): number {
  const body = document.body;
  if (body.style.position !== "fixed") return window.scrollY;

  const y = Math.abs(parseInt(body.style.top || "0", 10) || 0);
  body.style.position = "";
  body.style.top = "";
  body.style.width = "";
  body.style.overflow = "";
  window.scrollTo(0, y);
  return y;
}

/**
 * 滚到锚点并扣除顶栏高度（兼容 iOS Safari + 手机菜单锁滚动）。
 */
export function scrollToAnchor(
  id: string,
  options?: { behavior?: ScrollBehavior }
): boolean {
  if (typeof window === "undefined") return false;

  if (!document.getElementById(id)) return false;

  const behavior = options?.behavior ?? ("instant" as ScrollBehavior);

  window.dispatchEvent(
    new CustomEvent(MOBILE_NAV_CLOSE_EVENT, { detail: { scrollToId: id } })
  );

  const run = () => {
    const el = document.getElementById(id);
    if (!el) return;
    releaseMobileNavScrollLock();
    const offset = getSiteNavOffset();
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior });
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      run();
      if (behavior === "instant") {
        setTimeout(run, 80);
        setTimeout(run, 240);
      }
    });
  });

  return true;
}

/** 路由切换后应用 URL hash 或跨页待滚锚点 */
export function applyHashAfterRoute(
  loc: string,
  options?: { behavior?: ScrollBehavior }
): void {
  if (typeof window === "undefined") return;

  const behavior = options?.behavior ?? ("instant" as ScrollBehavior);
  const hashFromUrl = window.location.hash.slice(1);
  const pending = pendingHashId;
  pendingHashId = null;

  const rawId = pending || hashFromUrl;
  if (!rawId) {
    window.scrollTo({ top: 0, left: 0, behavior });
    return;
  }

  const id = normalizeHashId(rawId);
  const basePath = loc.split("#")[0] || loc;
  const targetUrl = `${basePath}#${id}`;

  if (`${window.location.pathname}${window.location.hash}` !== targetUrl) {
    window.history.replaceState(null, "", targetUrl);
  }

  const tryScroll = (attempt = 0) => {
    if (scrollToAnchor(id, { behavior })) return;
    if (attempt < 24) {
      setTimeout(() => tryScroll(attempt + 1), 50);
    }
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => tryScroll());
  });
}

/**
 * 统一处理带 # 的导航（同页 + 跨页）。
 * 子菜单、页脚等应一律使用此函数，并传入 wouter 的 setLocation。
 */
export function handleHashNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  currentPath: string,
  navigate: (to: string) => void
): void {
  const parsed = parseHashHref(href);
  if (!parsed) return;

  const { path, id } = parsed;
  e.preventDefault();

  if (isSamePath(getCurrentBrowserPath(currentPath), path)) {
    window.history.pushState(null, "", `${path}#${id}`);
    scrollToAnchor(normalizeHashId(id), { behavior: "instant" });
    return;
  }

  pendingHashId = id;
  navigate(path);
}

/**
 * 处理不带 # 的普通页面导航。
 * 已在同一路径时也要回到页面顶部，避免点击「首页」仍停在页面中段。
 */
export function handlePathNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  currentPath: string,
  navigate: (to: string) => void
): void {
  if (parseHashHref(href)) {
    handleHashNavClick(e, href, currentPath, navigate);
    return;
  }

  const current = getCurrentBrowserPath(currentPath);
  if (!isSamePath(current, href)) return;

  e.preventDefault();
  window.dispatchEvent(new CustomEvent(MOBILE_NAV_CLOSE_EVENT));
  releaseMobileNavScrollLock();
  window.history.pushState(null, "", href);

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  });
}

/** @deprecated 使用 handleHashNavClick */
export function handleInPageHashNav(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  currentPath: string,
  navigate?: (to: string) => void
) {
  if (navigate) {
    handleHashNavClick(e, href, currentPath, navigate);
    return;
  }
  const parsed = parseHashHref(href);
  if (!parsed) return;
  if (!isSamePath(currentPath, parsed.path)) return;
  e.preventDefault();
  window.history.pushState(null, "", href);
  scrollToAnchor(normalizeHashId(parsed.id), { behavior: "instant" });
}
