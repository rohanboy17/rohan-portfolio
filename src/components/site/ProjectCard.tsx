import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";
import BrandIcon from "@/components/ui/BrandIcon";
import ProjectMedia from "@/components/site/ProjectMedia";
import { mediaProps } from "@/lib/media-props";

const pill = "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition";

export function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={clsx("flex gap-2", compact ? "flex-wrap" : "flex-wrap [&>*]:flex-1 sm:[&>*]:flex-none")}>
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className={clsx(pill, "btn-clay bg-white text-ink [--glow:rgb(255_255_255/0.25)]")}
        >
          Live <ExternalLink size={14} />
        </a>
      ) : null}
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className={clsx(pill, "border border-line bg-white/5 hover:bg-white/10")}
        >
          <BrandIcon slug="github" size={14} /> Code
        </a>
      ) : null}
      <Link prefetch={false} href={`/projects/${project.slug}`} className={clsx(pill, "border border-line bg-white/5 hover:bg-white/10")}>
        Case study <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}

/**
 * Static browser-framed screenshot: the same look as ProjectMedia, but no video and no client
 * JavaScript. For long lists (/work) where dozens of video players would block the main thread.
 */
function PosterFrame({ project, priority = false }: { project: Project; priority?: boolean }) {
  const a = accentStyles[project.accent];
  const host = project.liveUrl ? new URL(project.liveUrl).host : (project.mediaLabel ?? "Private build · launching soon");
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
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className={clsx("absolute inset-0 grid place-items-center bg-gradient-to-br to-transparent", a.from)}>
            <Clip3D name={project.clip} size={120} className="h-24 w-24" />
          </div>
        )}
      </div>
    </div>
  );
}

/** Compact project card with the demo preview on top. `lite` swaps the video player for a static screenshot. */
export function MiniCard({
  project,
  className,
  lite = false,
  priority = false,
}: {
  project: Project;
  className?: string;
  lite?: boolean;
  priority?: boolean;
}) {
  const a = accentStyles[project.accent];
  return (
    <article className={clsx("clay group relative flex h-full flex-col overflow-hidden rounded-[28px] p-3 transition hover:-translate-y-1", className)}>
      <div aria-hidden className={clsx("absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40", a.bg)} />
      {lite ? <PosterFrame project={project} priority={priority} /> : <ProjectMedia project={mediaProps(project)} priority={priority} />}
      <div className="relative flex flex-1 flex-col px-2 pb-2 pt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold">{project.title}</h3>
          <Clip3D name={project.clip} size={40} className="h-9 w-9 shrink-0 transition duration-500 group-hover:-rotate-6 group-hover:scale-110" />
        </div>
        <p className="mt-1 text-sm text-muted">{project.tagline}</p>
        <p className="mt-3 text-xs text-white/60">{project.stack.join(" · ")}</p>
        <div className="mt-auto pt-5">
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </article>
  );
}

/**
 * Phone-sized project row: poster thumbnail on the left, key facts and two small actions on the right.
 * About a third of the height of MiniCard, so long category lists stay scannable.
 */
export function CompactCard({ project, className, priority = false }: { project: Project; className?: string; priority?: boolean }) {
  const a = accentStyles[project.accent];
  return (
    <article className={clsx("clay relative flex gap-3 overflow-hidden rounded-[22px] p-2.5", className)}>
      <Link prefetch={false}
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} case study`}
        className="relative min-h-[112px] w-[38%] shrink-0 self-stretch overflow-hidden rounded-2xl border border-line bg-ink"
      >
        {project.poster ? (
          <Image src={project.poster} alt="" fill sizes="150px" priority={priority} className="object-cover object-left-top" />
        ) : (
          <div className={clsx("absolute inset-0 grid place-items-center bg-gradient-to-br to-transparent", a.from)}>
            <Clip3D name={project.clip} size={64} className="h-12 w-12" />
          </div>
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col py-0.5 pr-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-display text-[15px] font-semibold leading-snug">{project.title}</h3>
          <Clip3D name={project.clip} size={28} className="h-6 w-6 shrink-0" />
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{project.tagline}</p>
        <p className={clsx("mt-1 line-clamp-1 text-[11px] font-medium", a.text)}>{project.stack.slice(0, 3).join(" · ")}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2.5">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-semibold text-ink"
            >
              Live <ExternalLink size={12} />
            </a>
          ) : null}
          <Link prefetch={false}
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 rounded-full border border-line bg-white/5 px-3 py-2 text-xs font-semibold"
          >
            Details <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}
