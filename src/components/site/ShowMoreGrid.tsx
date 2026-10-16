"use client";

import { Children, useState, type ReactNode } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

/**
 * Phones: a horizontal swipe rail with every item.
 * `sm` and up: a grid showing the first `initial` items, with a button to reveal the rest.
 */
export default function ShowMoreGrid({ children, initial = 9 }: { children: ReactNode; initial?: number }) {
  const [expanded, setExpanded] = useState(false);
  const items = Children.toArray(children);
  const hidden = items.length - initial;

  return (
    <>
      <div className="rail -mx-4 mt-6 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {items.map((item, i) => (
          <div key={i} className={clsx("w-[82%] shrink-0 sm:w-auto", !expanded && i >= initial && "sm:hidden")}>
            {item}
          </div>
        ))}
      </div>
      {hidden > 0 ? (
        <div className="mt-8 hidden justify-center sm:flex">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="clay inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            {expanded ? "Show fewer" : `Show ${hidden} more projects`}
            <ChevronDown size={18} className={clsx("transition-transform", expanded && "rotate-180")} />
          </button>
        </div>
      ) : null}
    </>
  );
}
