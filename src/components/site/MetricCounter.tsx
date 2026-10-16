"use client";

import { useEffect, useRef } from "react";

/** Counts "25+" up from 0 when scrolled into view. Writes to the DOM directly; SSR shows the final value. */
export default function MetricCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const end = Number(match[1]);
    const suffix = match[2];
    let raf = 0;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 900);
        el.textContent = `${Math.round(end * (1 - Math.pow(1 - p, 3)))}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
