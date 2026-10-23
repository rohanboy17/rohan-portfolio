"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const root = () => document.documentElement;
const stop = () => {
  if (root().dataset.loading === "nav") delete root().dataset.loading;
};

/**
 * Turns the top loading bar on when a link to another page is clicked (or Back/Forward
 * changes page) and off once the new route renders. Renders nothing itself.
 */
export default function NavProgress() {
  const pathname = usePathname();
  const current = useRef(pathname);

  useEffect(() => {
    current.current = pathname;
    stop();
  }, [pathname]);

  useEffect(() => {
    let timer = 0;
    const start = () => {
      root().dataset.loading = "nav";
      clearTimeout(timer);
      timer = window.setTimeout(stop, 15000);
    };
    // Capture phase: runs before next/link handles the click.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      // Same page (hash or filter links) and files like /resume.pdf don't navigate.
      if (url.origin !== location.origin || url.pathname === location.pathname || /\.\w+$/.test(url.pathname)) return;
      start();
    };
    const onPop = () => {
      if (location.pathname !== current.current) start();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  return null;
}
