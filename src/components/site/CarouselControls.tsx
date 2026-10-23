"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Arrows + dots (or a counter) for a server-rendered `.carousel` track with the given id.
 * The track is plain CSS scroll-snap, so it still swipes without this; this just adds buttons.
 * Visitor-driven only: no autoplay.
 */
export default function CarouselControls({
  target,
  labels,
  dots = true,
  className,
}: {
  /** id of the `.carousel` element. */
  target: string;
  /** One label per slide (used for the dots' accessible names). */
  labels: string[];
  dots?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const count = labels.length;

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const first = el.firstElementChild as HTMLElement | null;
        const step = first ? first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth;
        setIndex(Math.min(count - 1, Math.round(el.scrollLeft / Math.max(step, 1))));
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
      });
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, [target, count]);

  const go = (i: number) => {
    const el = document.getElementById(target);
    const slide = el?.children[Math.max(0, Math.min(count - 1, i))] as HTMLElement | undefined;
    if (!el || !slide) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "grid h-11 w-11 place-items-center rounded-full border border-line bg-white/5 text-white transition hover:border-lilac/50 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5";

  return (
    <div className={clsx("flex items-center justify-between gap-4", className)}>
      {dots ? (
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Choose slide">
          {labels.map((label, i) => (
            <button
              key={label + i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${label}`}
              aria-current={i === index}
              className={clsx("h-2 rounded-full transition-all", i === index ? "w-7 bg-lilac" : "w-2 bg-white/25 hover:bg-white/50")}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm tabular-nums text-muted" aria-live="polite">
          {index + 1} / {count}
        </p>
      )}
      <div className="flex gap-2">
        <button type="button" className={arrow} onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous" aria-controls={target}>
          <ChevronLeft size={20} />
        </button>
        <button type="button" className={arrow} onClick={() => go(index + 1)} disabled={atEnd} aria-label="Next" aria-controls={target}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
