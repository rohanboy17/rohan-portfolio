"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const coarsePointer =
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches;

  if (reduce || coarsePointer) {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        // Smoothly scroll to #section links, offset for the fixed header.
        anchors: { offset: -88 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
