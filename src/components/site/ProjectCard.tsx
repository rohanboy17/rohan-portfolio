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
export function MiniCard({ project }: { project: Project }) {
  const a = accentStyles[project.accent];
  return (
    <article className="clay group relative flex h-full flex-col overflow-hidden rounded-[28px] p-3 transition hover:-translate-y-1">
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
