"use client";

import { useSyncExternalStore } from "react";

// One stable subscribe function per query, so React doesn't resubscribe on every render.
const subscribers = new Map<string, (onChange: () => void) => () => void>();

function subscribeTo(query: string) {
  let fn = subscribers.get(query);
  if (!fn) {
    fn = (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    };
    subscribers.set(query, fn);
  }
  return fn;
}

/**
 * Live media-query match. Server render and hydration always see `serverValue`,
 * so markup never mismatches; the client updates right after.
 */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(subscribeTo(query), () => window.matchMedia(query).matches, () => serverValue);
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
/** Mouse or trackpad on a large enough screen: where hover effects and WebGL make sense. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine) and (min-width: 768px)");
