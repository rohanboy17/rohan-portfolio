"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Clip3D from "@/components/ui/Clip3D";
import { useFinePointer, useLite, useReducedMotion } from "@/lib/media";

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

/** Floating 3D clip-art composition: first paint, the whole experience on phones, and the no-WebGL fallback. */
function Poster({ hidden }: { hidden: boolean }) {
  return (
    <div
      aria-hidden
      className={clsx(
        "absolute inset-0 transition-opacity duration-700",
        hidden ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <Clip3D name="laptop" size={260} priority float delay={0.3} className="absolute left-1/2 top-1/2 w-[50%] -translate-x-1/2 -translate-y-1/2" />
      <Clip3D name="rocket" size={140} eager float tilt={8} className="absolute right-[6%] top-[6%] w-[24%]" />
      <Clip3D name="sparkles" size={110} eager float delay={1.2} className="absolute left-[8%] top-[10%] w-[18%]" />
      <Clip3D name="database" size={110} eager float delay={0.6} className="absolute bottom-[8%] right-[10%] w-[18%]" />
      <Clip3D name="bolt" size={100} eager float delay={1.8} tilt={-10} className="absolute bottom-[10%] left-[10%] w-[16%]" />
    </div>
  );
}

/**
 * Hero visual. Desktop (mouse/trackpad): the WebGL clay scene, booted on first interaction so it never
 * delays the first paint. Phones and reduced-motion: the lightweight floating clip-art poster only.
 */
export default function ClayStage({ className }: { className?: string }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  // Low-end desktops keep the static poster too: WebGL is the heaviest thing on the page.
  const lite = useLite();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!fine || reduce || lite || !hasWebGL()) return;
    const events = ["pointermove", "pointerdown", "wheel", "scroll", "keydown"] as const;
    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      setLoad(true);
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, start));
  }, [fine, reduce, lite]);

  const show3D = load && fine && !reduce && !lite;

  return (
    <div ref={ref} className={clsx("relative aspect-square w-full", className)}>
      <div aria-hidden className="absolute inset-[14%] rounded-full bg-lilac/20 blur-3xl" />
      <Poster hidden={show3D && ready} />
      {show3D ? (
        <div className={clsx("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}>
          <SceneBoundary>
            <ClayScene active={inView} onReady={() => setReady(true)} />
          </SceneBoundary>
        </div>
      ) : null}
    </div>
  );
}
