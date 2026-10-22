import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import clsx from "clsx";
import { ArrowLeft, Check } from "lucide-react";
import { profile, liveIndustries, projectsInIndustry, services, type IndustrySlug } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";
import SectionHeading from "@/components/ui/SectionHeading";
import { CompactCard, MiniCard } from "@/components/site/ProjectCard";
import { Item, Reveal, Stagger } from "@/components/site/MotionPrimitives";
import DemoRequest from "@/components/site/DemoRequest";
import JsonLd, { breadcrumbs } from "@/components/site/JsonLd";
import { metaDescription, shareMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return liveIndustries.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

const getIndustry = (slug: string) => liveIndustries.find((i) => i.slug === slug);
// Industry pages show client work only; practice replicas stay on /work/replicas.
const clientWork = (slug: IndustrySlug) => projectsInIndustry(slug).filter((p) => p.category !== "UI replica");

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const ind = getIndustry((await params).slug);
  if (!ind) return {};
  const title = `${ind.short} Website & App Development — ${profile.name}`;
  const description = metaDescription(ind.intro);
  const path = `/industries/${ind.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    ...shareMetadata({ title, description, path }),
  };
}

export default async function IndustryPage({ params }: Params) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();

  const a = accentStyles[ind.accent];
  const projects = clientWork(ind.slug);
  const sectorCounts = ind.sectors.map((s) => ({ ...s, count: projects.filter((p) => p.sector === s.slug).length }));
  const whatsappNumber = profile.whatsapp.match(/wa\.me\/(\d+)/)?.[1] ?? "";
  const path = `/industries/${ind.slug}`;

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <JsonLd
        data={[
          breadcrumbs([
            ["Industries", "/industries"],
            [ind.title, path],
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${ind.title} projects`,
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
        <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
          <ArrowLeft size={16} /> All industries
        </Link>

        {/* Centered on mobile (clip above title), left-aligned from sm up — matches the homepage sections */}
        <header className="mt-8 flex flex-col items-center gap-5 text-center sm:flex-row-reverse sm:items-end sm:justify-between sm:text-left">
          <Clip3D name={ind.clip} size={120} float priority className="h-20 w-20 shrink-0 sm:h-28 sm:w-28" />
          <div className="max-w-3xl">
            <p className={clsx("text-xs font-semibold uppercase tracking-[0.28em]", a.text)}>{projects.length} projects</p>
            <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              {`${ind.title} websites & apps`}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted sm:mx-0">{ind.intro}</p>
          </div>
        </header>

        <Reveal>
          <nav aria-label="Sectors" className="mt-8 flex flex-wrap justify-center gap-2 sm:justify-start">
            {sectorCounts.map((s) => (
              <Link
                key={s.slug}
                href={`/work?industry=${ind.slug}&sector=${s.slug}${s.count ? "" : "#demo"}`}
                className={clsx(
                  "rounded-full border px-3.5 py-2 text-sm transition",
                  s.count ? clsx(a.border, a.soft, "text-white/90 hover:text-white") : "border-line bg-white/5 text-muted hover:text-white",
                )}
              >
                {s.title} <span className="text-xs opacity-70">{s.count || "· free demo"}</span>
              </Link>
            ))}
          </nav>
        </Reveal>

        {/* Phones: compact rows. sm and up: full preview cards in a grid. */}
        <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {projects.map((p) => (
            <Item key={p.slug} className="h-full">
              <CompactCard project={p} className="sm:hidden" />
              <MiniCard project={p} className="hidden sm:flex" />
            </Item>
          ))}
        </Stagger>

        <section className="mt-20">
          <SectionHeading eyebrow="What I build" title={`For ${ind.short.toLowerCase()} businesses.`} clip="package" />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <ul className="clay space-y-3 rounded-[28px] p-6 sm:p-8">
                {ind.builds.map((b) => (
                  <li key={b} className="flex gap-3 text-white/90">
                    <Check size={18} className={clsx("mt-0.5 shrink-0", a.text)} />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="clay h-full rounded-[28px] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Services</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="inline-flex rounded-full border border-line bg-white/5 px-3 py-1.5 text-sm text-white/85 transition hover:border-lilac/40 hover:text-white">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <DemoRequest
          business={ind.label}
          offer={profile.demoOffer}
          whatsappNumber={whatsappNumber}
          email={profile.email}
          className="mt-16"
        />
      </div>
    </div>
  );
}
