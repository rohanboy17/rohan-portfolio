import type { CSSProperties, ReactNode } from "react";

/*
 * Scroll-reveal primitives with zero client JavaScript of their own.
 * They render plain divs marked with `data-reveal`; <RevealObserver /> (mounted once in the
 * layout) adds `data-shown` when each enters the viewport and CSS in globals.css animates it.
 * Content stays visible if JavaScript never runs.
 */

type Props = { children: ReactNode; className?: string; delay?: number };

export function Reveal({ children, className, delay = 0 }: Props) {
  return (
    <div data-reveal="" className={className} style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}>
      {children}
    </div>
  );
}

/** Children marked with <Item> reveal one after another. */
export function Stagger({ children, className }: Omit<Props, "delay">) {
  return (
    <div data-stagger="" className={className}>
      {children}
    </div>
  );
}

export function Item({ children, className }: Omit<Props, "delay">) {
  return (
    <div data-reveal="" className={className}>
      {children}
    </div>
  );
}
