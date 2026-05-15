import type { MouseEvent } from "react";

/** 已在目标路径上时，用 pushState + scroll 处理带 hash 的链接（避免 wouter 不重载导致不跳锚点）。 */
export function handleInPageHashNav(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  currentPath: string
) {
  const hashIdx = href.indexOf("#");
  if (hashIdx <= 0) return;
  const path = href.slice(0, hashIdx);
  const id = href.slice(hashIdx + 1);
  if (!path || !id) return;
  if (currentPath !== path && !currentPath.startsWith(path + "/")) return;
  e.preventDefault();
  window.history.pushState(null, "", href);
  queueMicrotask(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "instant" as ScrollBehavior,
      block: "start",
    });
  });
}
