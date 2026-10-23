import type { Metadata } from "next";
import { shareMetadata } from "@/lib/seo";
import Link from "next/link";
import clsx from "clsx";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile, categoryCounts, projectsInCategory, industries, categoryOf } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";
import { Item, Stagger } from "@/components/site/MotionPrimitives";
import { CompactCard } from "@/components/site/ProjectCard";
import WorkExplorer, { type ExplorerIndustry } from "@/components/site/WorkExplorer";

const title = "Find a project by industry";
const description = `Search ${profile.name}'s ${profile.projects.length} projects by industry, sector or need — retail, manufacturing, healthcare, travel, SaaS and more.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  ...shareMetadata({ title, description, path: "/work" }),
};

const LIST_ID = "work-results";
/** Cards shown before "Show all" when no filter is active (all show without JavaScript). */
const FIRST_PAGE = 12;

export default function WorkHub() {
  const total = profile.projects.length;

  // Only what the explorer needs is passed to the client; profile.ts itself stays on the server.
  const explorerIndustries: ExplorerIndustry[] = industries.map((ind) => {
    const sectors = ind.sectors.map((s) => ({
      slug: s.slug,
      title: s.title,
      count: profile.projects.filter((p) => p.industry === ind.slug && p.sector === s.slug).length,
    }));
    return { slug: ind.slug, title: ind.title, short: ind.short, sectors, count: sectors.reduce((n, s) => n + s.count, 0) };
  });
  const whatsappNumber = profile.whatsapp.match(/wa\.me\/(\d+)/)?.[1] ?? "";

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <Link prefetch={false} href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <header className="mx-auto mt-8 max-w-2xl text-center sm:mx-0 sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lilac">The work</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            {total} projects. Find yours.
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted">
            Search by your industry or what you need. No match yet? I&apos;ll build you a free demo.
          </p>
        </header>

        <WorkExplorer
          industries={explorerIndustries}
          types={categoryCounts.map((c) => ({ slug: c.slug, short: c.short, count: c.count }))}
          items={profile.projects.map((p) => ({ slug: p.slug, industry: p.industry, sector: p.sector, type: categoryOf(p).slug }))}
          listId={LIST_ID}
          firstPage={FIRST_PAGE}
          demo={{ offer: profile.demoOffer, whatsappNumber, email: profile.email }}
        />

        {/* Every project, server-rendered (and crawlable); WorkExplorer only hides and reorders items. */}
        <h2 className="sr-only">All projects</h2>
        {/* One compact card per project at every size: half the DOM of phone + desktop variants,
            which keeps hydration of 59 results fast on phones. */}
        <ul id={LIST_ID} data-collapsed="" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profile.projects.map((p, i) => (
            <li key={p.slug} data-slug={p.slug} data-industry={p.industry} data-sector={p.sector} data-type={categoryOf(p).slug} data-extra={i >= FIRST_PAGE ? "" : undefined} className="h-full">
              <CompactCard project={p} className="h-full" priority={i < 3} />
            </li>
          ))}
        </ul>
        {/* WorkExplorer puts its "Show all" button here. */}
        <div id={`${LIST_ID}-more`} />

        <section className="mt-20" aria-labelledby="by-type">
          <h2 id="by-type" className="text-center font-display text-2xl font-semibold sm:text-left sm:text-3xl">
            Browse by type
          </h2>
          <p className="mt-2 text-center text-muted sm:text-left">
            Or browse{" "}
            <Link prefetch={false} href="/industries" className="font-semibold text-lilac hover:underline">
              all industries
            </Link>
            .
          </p>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
            {categoryCounts.map((c) => {
              const a = accentStyles[c.accent];
              const sample = projectsInCategory(c.slug).slice(0, 4);
              return (
                <Item key={c.slug} className="h-full sm:odd:last:col-span-2">
                  <Link prefetch={false}
                    href={`/work/${c.slug}`}
                    className="clay group relative flex h-full flex-col overflow-hidden rounded-[32px] p-6 transition hover:-translate-y-1 sm:p-8"
                  >
                    <div aria-hidden className={clsx("absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-3xl transition group-hover:opacity-50", a.bg)} />
                    <div className="relative flex items-start justify-between gap-4">
                      <div>
                        <p className={clsx("text-xs font-semibold uppercase tracking-[0.22em]", a.text)}>{c.count} projects</p>
                        <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{c.title}</h3>
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
        </section>
      </div>
    </div>
  );
}
