"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function parseCounter(value: string): { start: number; end: number; suffix: string } | null {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { start: 0, end: Number(match[1]), suffix: (match[2] || "").trim() };
}

export default function MetricCounter({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const parsed = useMemo(() => parseCounter(value), [value]);
  const [animated, setAnimated] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || reduce || !parsed) return;

    const durationMs = 700;
    const start = performance.now();

    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = parsed.end * eased;
      const rounded = parsed.end % 1 === 0 ? Math.round(n) : Number(n.toFixed(1));
      setAnimated(`${rounded}${parsed.suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, reduce]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {animated ?? value}
    </span>
  );
}
