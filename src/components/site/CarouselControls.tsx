"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Index of the slide nearest the track's left edge. */
function slideIndex(el: HTMLElement, count: number) {
  const first = el.firstElementChild as HTMLElement | null;
  const step = first ? first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth;
  return Math.min(count - 1, Math.round(el.scrollLeft / Math.max(step, 1)));
}

/**
 * Arrows + dots (or a counter) for a server-rendered `.carousel` track with the given id.
 * The track is plain CSS scroll-snap, so it still swipes without this; this just adds buttons.
 *
 * Optional autoplay: "step" moves one slide every `interval` ms (the active dot fills up as a
 * timer); "drift" glides the track slowly and continuously. Either way it pauses on hover,
 * focus, touch, off-screen or in a background tab, rewinds at the end, has a pause button,
 * stops for good once the visitor uses the arrows or dots, and never runs under reduced motion.
 */
export default function CarouselControls({
  target,
  labels,
  dots = true,
  autoplay,
  interval = 7000,
  speed = 25,
  className,
}: {
  /** id of the `.carousel` element. */
  target: string;
  /** One label per slide (used for the dots' accessible names). */
  labels: string[];
  dots?: boolean;
  autoplay?: "step" | "drift";
  /** "step": ms per slide. */
  interval?: number;
  /** "drift": pixels per second. */
  speed?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [playing, setPlaying] = useState(true);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => true);
  const active = Boolean(autoplay) && playing && !reduced;
  const timerDot = useRef<HTMLSpanElement>(null);
  const count = labels.length;

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setIndex(slideIndex(el, count));
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
      });
    };
    // No initial measurement: at load the track sits at the first slide, and measuring here
    // would force a layout while the page is still painting.
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, [target, count]);

  useEffect(() => {
    const el = document.getElementById(target);
    if (!active || !el) return;

    let hover = false;
    let focus = false;
    let touch = false;
    let visible = false;
    let running = false;
    let waiting = false;
    let resumeAt = 0; // after a touch or a rewind, wait a moment before moving again
    let rewindAt = 0; // reached the end: rewind at this time
    let raf = 0;
    let last = 0;
    let elapsed = 0; // "step": time spent on the current slide
    let pos = 0; // "drift": fractional position (scrollLeft rounds)
    let max = 0;

    // Drifting fights scroll-snap, so snap is off while it runs.
    if (autoplay === "drift") el.style.scrollSnapType = "none";

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(t - last, 64) : 0;
      last = t;
      if (t < resumeAt) {
        waiting = true;
        return;
      }
      if (waiting) {
        waiting = false;
        pos = el.scrollLeft;
      }
      if (rewindAt) {
        if (t >= rewindAt) {
          rewindAt = 0;
          resumeAt = t + 1600;
          elapsed = 0;
          el.scrollTo({ left: 0, behavior: "smooth" });
        }
        return;
      }
      if (autoplay === "drift") {
        pos = Math.min(max, pos + (speed * dt) / 1000);
        el.scrollLeft = pos;
        if (pos >= max - 1) rewindAt = t + 1200;
      } else {
        elapsed += dt;
        timerDot.current?.style.setProperty("--p", String(Math.min(1, elapsed / interval)));
        if (elapsed >= interval) {
          elapsed = 0;
          const next = slideIndex(el, count) + 1;
          if (next >= count || el.scrollLeft >= max - 4) rewindAt = t;
          else {
            const slide = el.children[next] as HTMLElement;
            el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
          }
        }
      }
    };

    // The loop only runs while the track is on screen and nobody is using it, so it costs
    // nothing during page load or while the visitor reads elsewhere.
    const sync = () => {
      const run = visible && !hover && !focus && !touch && !document.hidden;
      if (run && !running) {
        running = true;
        last = 0;
        pos = el.scrollLeft;
        max = el.scrollWidth - el.clientWidth;
        raf = requestAnimationFrame(tick);
      } else if (!run && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    const on = (type: string, fn: (e: Event) => void) => {
      const handler = (e: Event) => {
        fn(e);
        sync();
      };
      el.addEventListener(type, handler, { passive: true });
      return () => el.removeEventListener(type, handler);
    };
    const offs = [
      on("pointerenter", (e) => (hover = (e as PointerEvent).pointerType === "mouse")),
      on("pointerleave", () => (hover = false)),
      on("touchstart", () => (touch = true)),
      on("touchend", () => {
        touch = false;
        resumeAt = performance.now() + 2500;
        elapsed = 0;
      }),
      on("focusin", () => (focus = true)),
      on("focusout", () => (focus = false)),
    ];
    document.addEventListener("visibilitychange", sync);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      offs.forEach((off) => off());
      document.removeEventListener("visibilitychange", sync);
      el.style.scrollSnapType = "";
    };
  }, [active, autoplay, target, count, interval, speed]);

  const go = (i: number) => {
    const el = document.getElementById(target);
    const slide = el?.children[Math.max(0, Math.min(count - 1, i))] as HTMLElement | undefined;
    if (!el || !slide) return;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  };
  // The visitor took over: stop autoplay for good.
  const choose = (i: number) => {
    setPlaying(false);
    go(i);
  };

  const round =
    "grid h-11 w-11 place-items-center rounded-full border border-line bg-white/5 text-white transition hover:border-lilac/50 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5";

  return (
    <div className={clsx("flex items-center justify-between gap-4", className)}>
      {dots ? (
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Choose slide">
          {labels.map((label, i) => (
            <button
              key={label + i}
              type="button"
              onClick={() => choose(i)}
              aria-label={`Show ${label}`}
              aria-current={i === index}
              className={clsx(
                "relative h-2 overflow-hidden rounded-full transition-all",
                i === index ? "w-7 bg-lilac/35" : "w-2 bg-white/25 hover:bg-white/50",
              )}
            >
              {i === index ? (
                // Fills up while autoplay waits on this slide; full when paused.
                <span
                  ref={timerDot}
                  aria-hidden
                  className="absolute inset-0 origin-left rounded-full bg-lilac"
                  style={{ transform: active && autoplay === "step" ? "scaleX(var(--p, 0))" : undefined }}
                />
              ) : null}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm tabular-nums text-muted" aria-live={active ? "off" : "polite"}>
          {index + 1} / {count}
        </p>
      )}
      <div className="flex gap-2">
        {autoplay && !reduced ? (
          <button
            type="button"
            className={round}
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            aria-controls={target}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        ) : null}
        <button type="button" className={round} onClick={() => choose(index - 1)} disabled={index === 0} aria-label="Previous" aria-controls={target}>
          <ChevronLeft size={20} />
        </button>
        <button type="button" className={round} onClick={() => choose(index + 1)} disabled={atEnd} aria-label="Next" aria-controls={target}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
