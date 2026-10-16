"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import Clip3D from "@/components/ui/Clip3D";

const ClayScene = dynamic(() => import("./ClayScene"), { ssr: false });

/** If WebGL is unavailable or crashes, keep showing the static poster. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static 3D clip-art composition: first paint, reduced-motion and no-WebGL fallback. */
function Poster({ hidden }: { hidden: boolean }) {
  return (
    <div
      aria-hidden
      className={clsx(
        "absolute inset-0 transition-opacity duration-700",
        hidden ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <Clip3D name="laptop" size={260} className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2" />
      <Clip3D name="rocket" size={140} float tilt={8} className="absolute right-[6%] top-[8%] w-[24%]" />
      <Clip3D name="sparkles" size={110} float delay={1.2} className="absolute left-[8%] top-[12%] w-[18%]" />
      <Clip3D name="database" size={110} float delay={0.6} className="absolute bottom-[10%] right-[10%] w-[18%]" />
      <Clip3D name="bolt" size={100} float delay={1.8} tilt={-10} className="absolute bottom-[12%] left-[10%] w-[16%]" />
    </div>
  );
}

export default function ClayStage({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  // Three.js is heavy to boot, so start it on the visitor's first interaction.
  // Until then the static poster shows, keeping first paint and LCP fast.
  useEffect(() => {
    if (reduce || !hasWebGL()) return;
    const events = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;
    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      setLoad(true);
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, start));
  }, [reduce]);

  return (
    <div ref={ref} className={clsx("relative aspect-square w-full", className)}>
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-lilac/20 blur-3xl" />
      <Poster hidden={ready} />
      {load ? (
        <div className={clsx("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}>
          <SceneBoundary>
            <ClayScene active={inView} onReady={() => setReady(true)} />
          </SceneBoundary>
        </div>
      ) : null}
    </div>
  );
}
