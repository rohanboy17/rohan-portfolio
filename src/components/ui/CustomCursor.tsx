"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function CustomCursor() {
  // Server render (and hydration) always sees `false`, so markup matches; the client then upgrades.
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );

  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const outerSpringConfig = { damping: 35, stiffness: 200, mass: 0.8 };
  const outerXSpring = useSpring(cursorX, outerSpringConfig);
  const outerYSpring = useSpring(cursorY, outerSpringConfig);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const nextHovering =
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        !!target.closest("button") ||
        !!target.closest("a") ||
        target.classList.contains("magnetic");
      setIsHovering((prev) => (prev === nextHovering ? prev : nextHovering));
    };

    window.addEventListener("mousemove", mouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-lilac rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-lilac/60 rounded-full pointer-events-none z-[9998]"
        style={{
          x: outerXSpring,
          y: outerYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? "rgba(196, 181, 253, 0.12)" : "rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
