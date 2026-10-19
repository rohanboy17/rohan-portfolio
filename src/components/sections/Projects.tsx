import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { featuredProjects, otherProjects, type Project } from "@/content/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Clip3D from "@/components/ui/Clip3D";
import ProjectMedia from "@/components/site/ProjectMedia";
import { ProjectLinks, MiniCard } from "@/components/site/ProjectCard";
import CategoryPills from "@/components/site/CategoryPills";
import { accentStyles } from "@/components/ui/accent";
import { Reveal } from "@/components/site/MotionPrimitives";
import ShowMoreGrid from "@/components/site/ShowMoreGrid";

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const a = accentStyles[project.accent];
  const flip = index % 2 === 1;

  return (
    <Reveal>
      <article className="clay relative overflow-hidden rounded-[32px] p-3 sm:rounded-[36px] sm:p-6">
        <div aria-hidden className={clsx("absolute -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl", a.bg, flip ? "-left-16" : "-right-16")} />
        <div className={clsx("relative grid items-center gap-5 lg:grid-cols-2 lg:gap-10", flip && "lg:[&>*:first-child]:order-2")}>
          <ProjectMedia project={project} priority={index === 0} />
          <div className="min-w-0 px-2 pb-3 sm:px-2 lg:px-0 lg:pb-2">
            <div className="flex items-center gap-3">
              <Clip3D name={project.clip} size={44} className="h-9 w-9 sm:h-11 sm:w-11" />
              <p className={clsx("text-xs font-semibold uppercase tracking-[0.2em]", a.text)}>
                {String(index + 1).padStart(2, "0")} · {project.category}
              </p>
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
            <p className="mt-2 text-white/85 sm:text-lg">{project.tagline}</p>

            {/* The full story lives on the case-study page; phones get the short version */}
            <dl className="mt-5 hidden space-y-3 text-sm leading-relaxed sm:block">
              <div>
                <dt className="font-semibold text-white">Problem</dt>
                <dd className="text-muted">{project.problem}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">What I built</dt>
                <dd className="text-muted">{project.solution}</dd>
              </div>
            </dl>

            {/* Highlights live on the case-study page on phones, keeping cards under a screen tall */}
            <ul className="mt-4 hidden space-y-1.5 text-sm text-white/85 sm:block">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className={clsx("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", a.bg)} />
                  {h}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((t, i) => (
                <li
                  key={t}
                  className={clsx(
                    "rounded-full border px-2.5 py-1 text-xs text-white/85 sm:px-3",
                    a.border,
                    a.soft,
                    i >= 4 && "hidden sm:inline-block",
                  )}
                >
                  {t}
                </li>
              ))}
              {project.stack.length > 4 ? (
                <li className="rounded-full border border-line px-2.5 py-1 text-xs text-muted sm:hidden">+{project.stack.length - 4}</li>
              ) : null}
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

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Real products, live in production."
          description="SaaS platforms, marketplaces and e-commerce stores — chosen from 50+ builds, each designed, built and shipped by me."
          clip="rocket"
        />

        {/* Browse by business category */}
        <Reveal>
          <div className="mt-8">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-muted sm:text-left">
              Browse by category
            </p>
            <CategoryPills className="justify-center sm:justify-start" />
          </div>
        </Reveal>

        <div className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
          {featuredProjects.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        {otherProjects.length ? (
          <>
            <Reveal>
              <div className="mt-16 flex items-end justify-between gap-4 sm:mt-20">
                <h3 className="font-display text-2xl font-semibold">More work</h3>
                <p className="text-sm text-muted sm:hidden">Swipe →</p>
              </div>
            </Reveal>
            <ShowMoreGrid>
              {otherProjects.map((p) => (
                <MiniCard key={p.slug} project={p} />
              ))}
            </ShowMoreGrid>
            <Reveal>
              <div className="mt-10 flex justify-center">
                <Link
                  href="/work"
                  className="btn-clay inline-flex items-center gap-2 rounded-full bg-lilac px-6 py-3 font-semibold text-ink"
                >
                  Explore all work by category <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>
          </>
        ) : null}
      </div>
    </section>
  );
}
