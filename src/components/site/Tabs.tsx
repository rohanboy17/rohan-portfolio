"use client";

import { Children, useId, useState, type ReactNode } from "react";
import clsx from "clsx";

/**
 * Accessible tabs: one panel visible at a time, so long sections become one screen.
 * Panels are server-rendered children (all stay in the HTML for search engines);
 * only the active one is shown. Arrow keys move between tabs.
 */
export default function Tabs({ labels, children, className }: { labels: string[]; children: ReactNode; className?: string }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const panels = Children.toArray(children);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + labels.length) % labels.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div className={className}>
      <div role="tablist" aria-orientation="horizontal" onKeyDown={onKey} className="flex flex-wrap justify-center gap-1.5 sm:justify-start sm:gap-2">
        {labels.map((label, i) => (
          <button
            key={label}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={clsx(
              "rounded-full border px-3.5 py-2 text-sm font-semibold transition sm:px-5 sm:py-2.5",
              i === active ? "border-lilac/60 bg-lilac/15 text-white" : "border-line bg-white/5 text-muted hover:text-white",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {panels.map((panel, i) => (
        <div
          key={i}
          id={`${id}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
          className="mt-8"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
