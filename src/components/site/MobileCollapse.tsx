"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/**
 * On phones, hides its children behind a "show more" button; from md up they're always open.
 * The content is server-rendered either way (crawlable), and stays open without JavaScript
 * (see `.mobile-collapse` in globals.css).
 */
export default function MobileCollapse({ more, less = "Show less", children }: { more: string; less?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <div id={id} className="mobile-collapse" data-open={open || undefined}>
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="js-only mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-lilac md:hidden"
      >
        {open ? less : more}
        <ChevronDown size={16} className={open ? "rotate-180 transition" : "transition"} aria-hidden />
      </button>
    </>
  );
}
