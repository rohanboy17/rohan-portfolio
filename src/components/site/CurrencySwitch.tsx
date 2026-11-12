"use client";

import { useSyncExternalStore } from "react";
import clsx from "clsx";

type Currency = "inr" | "usd";
const OPTIONS: { value: Currency; label: string }[] = [
  { value: "inr", label: "₹ INR" },
  { value: "usd", label: "$ USD" },
];

// The current currency lives on <html data-currency>, set before paint by the inline script in
// app/layout.tsx (saved choice, else the visitor's timezone). Every switch on the page reads and
// writes it through this tiny store, so they stay in sync.
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
const read = (): Currency => (document.documentElement.dataset.currency === "usd" ? "usd" : "inr");
function write(next: Currency) {
  document.documentElement.dataset.currency = next;
  try {
    localStorage.setItem("currency", next);
  } catch {
    // Private mode or blocked storage: the choice still applies to this page.
  }
  listeners.forEach((listener) => listener());
}

/** ₹/$ toggle for <Price>. Hidden without JavaScript, where rupees show. */
export default function CurrencySwitch({ className }: { className?: string }) {
  const currency = useSyncExternalStore(subscribe, read, () => null);
  return (
    <div role="group" aria-label="Show prices in" className={clsx("js-only inline-flex rounded-full border border-line bg-white/5 p-1", className)}>
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={currency === o.value}
          onClick={() => write(o.value)}
          className={clsx(
            "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
            currency === o.value ? "bg-lilac text-ink" : "text-muted hover:text-white",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
