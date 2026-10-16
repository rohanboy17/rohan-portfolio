"use client";

import { useEffect } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/media";

/**
 * Lenis smooth scrolling for mouse/trackpad users only. It is loaded on demand,
 * so phones and reduced-motion visitors never download it and keep native scrolling.
 */
export function SmoothScroll() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!fine || reduce) return;
    let lenis: { destroy: () => void } | undefined;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 0.9, anchors: { offset: -88 } });
    });
    return () => {
      cancelled = true;
      lenis?.destroy();
    };
  }, [fine, reduce]);

  return null;
}
