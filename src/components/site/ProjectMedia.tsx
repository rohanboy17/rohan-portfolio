"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import clsx from "clsx";
import type { Project } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";

/**
 * Browser-framed project preview. Plays a muted demo loop while on screen,
 * falls back to the poster, and finally to a 3D clip-art cover.
 */
export default function ProjectMedia({ project, priority = false }: { project: Project; priority?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const a = accentStyles[project.accent];
  const host = project.liveUrl ? new URL(project.liveUrl).host : `${project.slug}.app`;

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;
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
  }, [reduce]);

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
      </div>
    </div>
  );
}
