"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/media";

/** Soft trailing cursor ring for mouse users. One rAF loop, no React re-renders. */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };
    const onOver = (e: PointerEvent) => {
      const hovering = !!(e.target as HTMLElement).closest("a, button, select, input, textarea, label");
      ring.current?.toggleAttribute("data-hover", hovering);
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full bg-lilac" />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border border-lilac/60 transition-[width,height,background-color] duration-300 data-[hover]:h-14 data-[hover]:w-14 data-[hover]:bg-lilac/10"
      />
    </>
  );
}
