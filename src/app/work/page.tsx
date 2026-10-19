import type { Metadata } from "next";
import { shareMetadata } from "@/lib/seo";
import Link from "next/link";
import clsx from "clsx";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile, categoryCounts, projectsInCategory } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";
import { Item, Stagger } from "@/components/site/MotionPrimitives";

export const metadata: Metadata = {
  title: "Work by category",
  description: `Browse ${profile.name}'s projects by category — web apps & SaaS, e-commerce stores, business sites and creative builds.`,
  alternates: { canonical: "/work" },
  ...shareMetadata({
    title: "Work by category",
    description: `Browse ${profile.name}'s projects by category — web apps & SaaS, e-commerce stores, business sites and creative builds.`,
    path: "/work",
  }),
};

export default function WorkHub() {
  const total = profile.projects.length;

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <header className="mx-auto mt-8 max-w-2xl text-center sm:mx-0 sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lilac">The work</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            {total} projects, by category.
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted">
            Pick the kind of product you&apos;re hiring for — each category opens a page of the real builds in it.
          </p>
        </header>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {categoryCounts.map((c) => {
            const a = accentStyles[c.accent];
            const sample = projectsInCategory(c.slug).slice(0, 4);
            return (
              <Item key={c.slug} className="h-full sm:odd:last:col-span-2">
                <Link
                  href={`/work/${c.slug}`}
                  className="clay group relative flex h-full flex-col overflow-hidden rounded-[32px] p-6 transition hover:-translate-y-1 sm:p-8"
                >
                  <div aria-hidden className={clsx("absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-3xl transition group-hover:opacity-50", a.bg)} />
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <p className={clsx("text-xs font-semibold uppercase tracking-[0.22em]", a.text)}>{c.count} projects</p>
                      <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{c.title}</h2>
                    </div>
                    <Clip3D name={c.clip} size={72} float className="h-14 w-14 sm:h-16 sm:w-16" />
                  </div>
                  <p className="relative mt-3 text-pretty text-muted">{c.tagline}</p>
                  <div className="relative mt-5 flex flex-wrap gap-1.5">
                    {sample.map((p) => (
                      <span key={p.slug} className={clsx("rounded-full border px-3 py-1 text-xs text-white/85", a.border, a.soft)}>
                        {p.title}
                      </span>
                    ))}
                    {c.count > sample.length ? (
                      <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">+{c.count - sample.length} more</span>
                    ) : null}
                  </div>
                  <p className={clsx("relative mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold", a.text)}>
                    View {c.short} <ArrowUpRight size={15} />
                  </p>
                </Link>
              </Item>
            );
          })}
        </Stagger>
      </div>
    </div>
  );
}
