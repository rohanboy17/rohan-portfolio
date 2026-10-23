import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { profile, services, getService, projectsForService } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";
import SectionHeading from "@/components/ui/SectionHeading";
import { CompactCard, MiniCard } from "@/components/site/ProjectCard";
import { Item, Reveal, Stagger } from "@/components/site/MotionPrimitives";
import ProcessSteps from "@/components/site/ProcessSteps";
import Faq from "@/components/site/Faq";
import QuoteCta from "@/components/site/QuoteCta";
import JsonLd, { breadcrumbs, faqPage } from "@/components/site/JsonLd";
import { shareMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const url = `/services/${service.slug}`;
  return {
    // `absolute` skips the "· Rohan Mondal" suffix; these titles are already written for search.
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: url },
    ...shareMetadata({ title: service.metaTitle, description: service.metaDescription, path: url }),
  };
}

export default async function ServicePage({ params }: Params) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const a = accentStyles[service.accent];
  const projects = projectsForService(service);
  const others = services.filter((s) => s.slug !== service.slug);
  const url = `${profile.siteUrl}/services/${service.slug}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url,
    areaServed: "Worldwide",
    provider: { "@id": `${profile.siteUrl}/#person` },
  };

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <JsonLd
        data={[
          serviceJsonLd,
          breadcrumbs([
            ["Services", "/services"],
            [service.title, `/services/${service.slug}`],
          ]),
          faqPage(service.faqs),
        ]}
      />
      <div className="mx-auto max-w-6xl">
        <Link prefetch={false} href="/services" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
          <ArrowLeft size={16} /> All services
        </Link>

        {/* Centered on mobile (clip above title), left-aligned from sm up — matches the homepage sections */}
        <header className="mt-8 flex flex-col items-center gap-5 text-center sm:flex-row-reverse sm:items-end sm:justify-between sm:text-left">
          <Clip3D name={service.clip} size={120} float eager className="h-20 w-20 shrink-0 sm:h-28 sm:w-28" />
          <div className="max-w-3xl">
            <p className={clsx("text-xs font-semibold uppercase tracking-[0.28em]", a.text)}>{service.title}</p>
            <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">{service.heading}</h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-white/85 sm:mx-0">{service.tagline}</p>
          </div>
        </header>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link prefetch={false}
            href="/#contact"
            className="btn-clay inline-flex items-center gap-2 rounded-full bg-lilac px-6 py-3 font-semibold text-ink"
          >
            Get a free quote <ArrowRight size={18} />
          </Link>
          <a href="#work" className="clay inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition hover:bg-white/10">
            See related work
          </a>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal>
            <section className="clay h-full rounded-[28px] p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold">What I do</h2>
              <div className="mt-3 space-y-4 leading-relaxed text-white/85">
                {service.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          </Reveal>
          <Reveal delay={0.05}>
            <aside className="clay h-full rounded-[28px] p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold">Ideal for</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/85">
                {service.idealFor.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Check size={16} className={clsx("mt-0.5 shrink-0", a.text)} />
                    {x}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>

        <section className="mt-20">
          <SectionHeading eyebrow="What you get" title="Everything you need to launch." clip="package" />
          <Stagger className="swipe-sm mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {service.deliverables.map((d) => (
              <Item key={d.title} className="h-full">
                <div className="clay h-full rounded-3xl p-5 sm:p-6">
                  <span aria-hidden className={clsx("block h-2 w-8 rounded-full", a.bg)} />
                  <h3 className="mt-4 font-display text-lg font-semibold">{d.title}</h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">{d.body}</p>
                </div>
              </Item>
            ))}
          </Stagger>
          <Reveal>
            <ul aria-label="Technologies" className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
              {service.stack.map((t) => (
                <li key={t} className={clsx("rounded-full border px-3 py-1.5 text-sm", a.border, a.soft)}>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section id="work" className="mt-20 scroll-mt-28">
          <SectionHeading
            eyebrow="Proof"
            title="Projects I've delivered."
            description="Real builds, live in production — open any one for the full case study."
            clip="trophy"
          />
          {/* Phones: compact rows. sm and up: full preview cards in a grid. */}
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {projects.map((p) => (
              <Item key={p.slug} className="h-full">
                <CompactCard project={p} className="sm:hidden" />
                <MiniCard project={p} className="hidden sm:flex" />
              </Item>
            ))}
          </Stagger>
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="How it works" title="From first call to launch." clip="target" />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="FAQ" title={`${service.title}: common questions`} clip="bulb" />
          <div className="mt-10">
            <Faq items={service.faqs} />
          </div>
        </section>

        <QuoteCta title={`Need ${service.title.toLowerCase()}?`} />

        <nav aria-label="Other services" className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-muted sm:text-left">Other services</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2.5 sm:justify-start">
            {others.map((s) => (
              <li key={s.slug}>
                <Link prefetch={false}
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-sm font-medium text-muted transition hover:text-white"
                >
                  <Clip3D name={s.clip} size={18} className="h-4 w-4" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
