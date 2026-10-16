import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { featuredProjects, otherProjects, type Project } from "@/content/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Clip3D from "@/components/ui/Clip3D";
import BrandIcon from "@/components/ui/BrandIcon";
import ProjectMedia from "@/components/site/ProjectMedia";
import { accentStyles } from "@/components/ui/accent";
import { Reveal } from "@/components/site/MotionPrimitives";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-clay inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink [--glow:rgb(255_255_255/0.25)]"
        >
          Live site <ExternalLink size={14} />
        </a>
      ) : null}
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
        >
          <BrandIcon slug="github" size={14} /> Code
        </a>
      ) : null}
      <Link
        href={`/projects/${project.slug}`}
        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
      >
        Case study <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const a = accentStyles[project.accent];
  const flip = index % 2 === 1;

  return (
    <Reveal>
      <article className="clay relative overflow-hidden rounded-[36px] p-4 sm:p-6">
        <div aria-hidden className={clsx("absolute -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl", a.bg, flip ? "-left-16" : "-right-16")} />
        <div className={clsx("relative grid items-center gap-6 lg:grid-cols-2 lg:gap-10", flip && "lg:[&>*:first-child]:order-2")}>
          <ProjectMedia project={project} priority={index === 0} />
          <div className="px-2 pb-2 lg:px-0">
            <div className="flex items-center gap-3">
              <Clip3D name={project.clip} size={44} />
              <p className={clsx("text-xs font-semibold uppercase tracking-[0.24em]", a.text)}>
                {String(index + 1).padStart(2, "0")} · {project.category}
              </p>
            </div>
            <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
            <p className="mt-2 text-lg text-white/85">{project.tagline}</p>

            <dl className="mt-5 space-y-3 text-sm leading-relaxed">
              <div>
                <dt className="font-semibold text-white">Problem</dt>
                <dd className="text-muted">{project.problem}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">What I built</dt>
                <dd className="text-muted">{project.solution}</dd>
              </div>
            </dl>

            <ul className="mt-4 space-y-1.5 text-sm text-white/85">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className={clsx("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", a.bg)} />
                  {h}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <li key={t} className={clsx("rounded-full border px-3 py-1 text-xs text-white/85", a.border, a.soft)}>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function MiniCard({ project }: { project: Project }) {
  const a = accentStyles[project.accent];
  return (
    <Reveal>
      <article className="clay group relative h-full overflow-hidden rounded-[28px] p-6 transition hover:-translate-y-1">
        <div aria-hidden className={clsx("absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40", a.bg)} />
        <div className="relative flex items-start justify-between">
          <Clip3D name={project.clip} size={56} className="transition duration-500 group-hover:-rotate-6 group-hover:scale-110" />
          <span className={clsx("rounded-full border px-3 py-1 text-xs", a.border, a.text)}>{project.category}</span>
        </div>
        <h3 className="relative mt-5 font-display text-xl font-semibold">{project.title}</h3>
        <p className="relative mt-1 text-sm text-muted">{project.tagline}</p>
        <p className="relative mt-4 text-xs text-white/60">{project.stack.join(" · ")}</p>
        <div className="relative mt-5">
          <ProjectLinks project={project} />
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Real products, live in production."
          description="Marketplaces, payment platforms and storefronts — each one designed, built and deployed by me."
          clip="rocket"
        />

        <div className="mt-12 space-y-6">
          {featuredProjects.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        {otherProjects.length ? (
          <>
            <Reveal>
              <h3 className="mt-20 font-display text-2xl font-semibold">More client work</h3>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((p) => (
                <MiniCard key={p.slug} project={p} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
