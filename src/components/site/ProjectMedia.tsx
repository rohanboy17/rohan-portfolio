"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useLite, useReducedMotion } from "@/lib/media";
import type { MediaProject } from "@/lib/media-props";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";

/**
 * Browser-framed project preview. Plays a muted demo loop while on screen,
 * falls back to the poster, and finally to a 3D clip-art cover.
 */
export default function ProjectMedia({ project, priority = false }: { project: MediaProject; priority?: boolean }) {
  const reduce = useReducedMotion();
  // Phones and low-end devices: no autoplay (each loop is 0.2–0.8 MB and costly to decode).
  // The poster stays, with a tap-to-preview button.
  const lite = useLite();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const a = accentStyles[project.accent];
  const host = project.liveUrl ? new URL(project.liveUrl).host : (project.mediaLabel ?? "Private build · launching soon");

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce || lite) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduce, lite]);

  return (
    <div className={clsx("overflow-hidden rounded-[24px] border bg-ink", a.border)}>
      <div className="flex items-center gap-2 border-b border-line bg-white/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-pink/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-butter/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
        <span className="ml-3 truncate rounded-full bg-white/5 px-3 py-0.5 text-xs text-muted">{host}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.poster ? (
          <Image
            src={project.poster}
            alt={`${project.title} screenshot`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 560px, 100vw"
            className={clsx("object-cover object-top transition-opacity duration-500", playing && "opacity-0")}
          />
        ) : (
          <div className={clsx("absolute inset-0 grid place-items-center bg-gradient-to-br to-transparent", a.from)}>
            <Clip3D name={project.clip} size={160} float className="h-32 w-32 sm:h-40 sm:w-40" />
          </div>
        )}
        {project.video && !reduce ? (
          <video
            ref={ref}
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : null}
        {project.video && lite && !reduce && !playing ? (
          <button
            type="button"
            onClick={() => {
              ref.current?.play().then(() => setPlaying(true)).catch(() => {});
            }}
            aria-label={`Play ${project.title} preview`}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-semibold text-white"
          >
            ▶ Preview
          </button>
        ) : null}
      </div>
    </div>
  );
}
