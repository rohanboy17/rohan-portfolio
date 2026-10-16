"use client";

import { useRef, type ReactNode } from "react";

/**
 * Card that tilts toward the pointer with a soft spotlight. Pure CSS variables,
 * no re-renders; touch devices simply get a static card.
 */
export default function TiltSpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--ry", `${(x / rect.width - 0.5) * 10}deg`);
      el.style.setProperty("--rx", `${(0.5 - y / rect.height) * 10}deg`);
    });
  }

  function onPointerLeave() {
    cancelAnimationFrame(frame.current);
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`tilt-card group relative rounded-[28px] border border-line bg-white/[0.03] transition-[border-color,transform] duration-300 ease-out hover:border-lilac/30 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgb(196 181 253 / 0.14), transparent 80%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
