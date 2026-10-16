import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";
import BrandIcon from "@/components/ui/BrandIcon";
import ProjectMedia from "@/components/site/ProjectMedia";

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
      <Link href={`/projects/${project.slug}`} className={clsx(pill, "border border-line bg-white/5 hover:bg-white/10")}>
        Case study <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}

/** Compact project card with the demo preview on top. Used on the homepage and category pages. */
export function MiniCard({ project, className }: { project: Project; className?: string }) {
  const a = accentStyles[project.accent];
  return (
    <article className={clsx("clay group relative flex h-full flex-col overflow-hidden rounded-[28px] p-3 transition hover:-translate-y-1", className)}>
      <div aria-hidden className={clsx("absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40", a.bg)} />
      <ProjectMedia project={project} />
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
export function CompactCard({ project, className }: { project: Project; className?: string }) {
  const a = accentStyles[project.accent];
  return (
    <article className={clsx("clay relative flex gap-3 overflow-hidden rounded-[22px] p-2.5", className)}>
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} case study`}
        className="relative min-h-[112px] w-[38%] shrink-0 self-stretch overflow-hidden rounded-2xl border border-line bg-ink"
      >
        {project.poster ? (
          <Image src={project.poster} alt="" fill sizes="150px" className="object-cover object-left-top" />
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
          <Link
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
