import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import clsx from "clsx";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { profile, categoryOf, serviceForProject } from "@/content/profile";
import Clip3D from "@/components/ui/Clip3D";
import BrandIcon from "@/components/ui/BrandIcon";
import ProjectMedia from "@/components/site/ProjectMedia";
import { accentStyles } from "@/components/ui/accent";
import { Reveal } from "@/components/site/MotionPrimitives";
import QuoteCta from "@/components/site/QuoteCta";
import JsonLd, { breadcrumbs } from "@/components/site/JsonLd";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return profile.projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

function getProject(slug: string) {
  return profile.projects.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.tagline}. ${project.solution}`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const a = accentStyles[project.accent];
  const index = profile.projects.indexOf(project);
  const next = profile.projects[(index + 1) % profile.projects.length];
  const category = categoryOf(project);
  const service = serviceForProject(project);
  const sections = project.caseStudy?.sections ?? [
    { heading: "The problem", body: project.problem },
    { heading: "What I built", body: project.solution },
  ];

  return (
    <article className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <JsonLd
        data={breadcrumbs([
          ["Work", "/work"],
          [category.title, `/work/${category.slug}`],
          [project.title, `/projects/${project.slug}`],
        ])}
      />
      <div className="mx-auto max-w-5xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
          <ArrowLeft size={16} /> All projects
        </Link>

        {/* Centered on mobile (clip above title), left-aligned from sm up — matches the homepage sections */}
        <header className="mt-8 flex flex-col items-center gap-6 text-center sm:flex-row-reverse sm:items-end sm:justify-between sm:text-left">
          <Clip3D name={project.clip} size={120} float priority className="h-20 w-20 shrink-0 sm:h-28 sm:w-28" />
          <div>
            <p className={clsx("text-xs font-semibold uppercase tracking-[0.28em]", a.text)}>{project.category}</p>
            <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">{project.title}</h1>
            <p className="mx-auto mt-3 max-w-xl text-lg text-white/85 sm:mx-0 sm:max-w-2xl sm:text-xl">{project.tagline}</p>
          </div>
        </header>

        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:justify-start">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-clay inline-flex items-center gap-2 rounded-full bg-lilac px-5 py-2.5 font-semibold text-ink"
            >
              Visit live site <ExternalLink size={16} />
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="clay inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold"
            >
              <BrandIcon slug="github" size={16} /> View code
            </a>
          ) : null}
        </div>

        <div className="mt-10">
          <ProjectMedia project={project} priority />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            {sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.05}>
                <section className="clay rounded-[28px] p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-semibold">{s.heading}</h2>
                  <p className="mt-3 leading-relaxed text-white/85">{s.body}</p>
                </section>
              </Reveal>
            ))}
            <Reveal>
              <section className="clay rounded-[28px] p-6 sm:p-8">
                <h2 className="font-display text-2xl font-semibold">Highlights</h2>
                <ul className="mt-4 space-y-3 text-white/85">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className={clsx("mt-2 h-2 w-2 shrink-0 rounded-full", a.bg)} />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            {project.caseStudy ? (
              <div className="clay rounded-[28px] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">My role</p>
                <p className="mt-2 text-white/90">{project.caseStudy.role}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-muted">Year</p>
                <p className="mt-2 text-white/90">{project.caseStudy.timeline}</p>
              </div>
            ) : null}
            <div className="clay rounded-[28px] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Tech stack</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <li key={t} className={clsx("rounded-full border px-3 py-1.5 text-sm", a.border, a.soft)}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {category.slug === "replicas" ? null : (
          <>
            <QuoteCta
              title="Want something like this?"
              body={`I build projects like ${project.title} for businesses worldwide. Tell me what you need and get a free, fixed quote.`}
            />
            <p className="mt-4 text-center text-sm text-muted">
              Learn more about my{" "}
              <Link href={`/services/${service.slug}`} className="font-semibold text-lilac hover:underline">
                {service.title.toLowerCase()} services
              </Link>
              .
            </p>
          </>
        )}

        <Link
          href={`/projects/${next.slug}`}
          className="clay group mt-16 flex items-center justify-between gap-4 rounded-[32px] p-6 transition hover:bg-white/[0.05] sm:p-8"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Next project</p>
            <p className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{next.title}</p>
          </div>
          <Clip3D name={next.clip} size={80} className="transition duration-500 group-hover:-rotate-6 group-hover:scale-110" />
        </Link>
      </div>
    </article>
  );
}
