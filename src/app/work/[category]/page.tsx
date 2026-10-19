import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { profile, categories, projectsInCategory } from "@/content/profile";
import Clip3D from "@/components/ui/Clip3D";
import { CompactCard, MiniCard } from "@/components/site/ProjectCard";
import CategoryPills from "@/components/site/CategoryPills";
import { Item, Reveal, Stagger } from "@/components/site/MotionPrimitives";
import JsonLd, { breadcrumbs } from "@/components/site/JsonLd";
import { shareMetadata, metaDescription } from "@/lib/seo";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return {
    title: category.title,
    description: metaDescription(`${category.tagline} — ${projectsInCategory(category.slug).length} projects by ${profile.name}.`),
    alternates: { canonical: `/work/${category.slug}` },
    ...shareMetadata({
      title: `${category.title} — ${profile.name}`,
      description: category.tagline,
      path: `/work/${category.slug}`,
    }),
  };
}

export default async function CategoryPage({ params }: Params) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const projects = projectsInCategory(category.slug);

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <JsonLd
        data={[
          breadcrumbs([
            ["Work", "/work"],
            [category.title, `/work/${category.slug}`],
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: category.title,
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${profile.siteUrl}/projects/${p.slug}`,
              name: p.title,
            })),
          },
        ]}
      />
      <div className="mx-auto max-w-6xl">
        <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
          <ArrowLeft size={16} /> All categories
        </Link>

        {/* Centered on mobile (clip above title), left-aligned from sm up — matches the homepage sections */}
        <header className="mt-8 flex flex-col items-center gap-5 text-center sm:flex-row-reverse sm:items-end sm:justify-between sm:text-left">
          <Clip3D name={category.clip} size={120} float priority className="h-20 w-20 shrink-0 sm:h-28 sm:w-28" />
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lilac">{projects.length} projects</p>
            <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">{category.title}</h1>
            <p className="mx-auto mt-4 max-w-md text-pretty text-lg text-muted sm:mx-0 sm:max-w-none">{category.tagline}</p>
          </div>
        </header>

        <Reveal>
          <CategoryPills active={category.slug} className="mt-8 justify-center sm:justify-start" />
        </Reveal>

        {/* Phones: compact rows. sm and up: full preview cards in a grid. */}
        <Stagger className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {projects.map((p) => (
            <Item key={p.slug} className="h-full">
              <CompactCard project={p} className="sm:hidden" />
              <MiniCard project={p} className="hidden sm:flex" />
            </Item>
          ))}
        </Stagger>

        <div className="mt-16 rounded-[32px] border border-line bg-white/[0.03] p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            {category.cta?.title ?? `Need a ${category.short.toLowerCase()} project built?`}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            {category.cta?.body ?? "This is the kind of work I ship end to end. Let’s talk about yours."}
          </p>
          <Link
            href="/#contact"
            className="btn-clay mt-6 inline-flex items-center gap-2 rounded-full bg-lilac px-6 py-3 font-semibold text-ink"
          >
            Get a free quote
          </Link>
        </div>
      </div>
    </div>
  );
}
