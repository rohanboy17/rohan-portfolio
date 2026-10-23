import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile, services, whyHire, generalFaqs } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";
import SectionHeading from "@/components/ui/SectionHeading";
import { Item, Stagger } from "@/components/site/MotionPrimitives";
import ProcessSteps from "@/components/site/ProcessSteps";
import Faq from "@/components/site/Faq";
import QuoteCta from "@/components/site/QuoteCta";
import JsonLd, { breadcrumbs, faqPage } from "@/components/site/JsonLd";
import { shareMetadata } from "@/lib/seo";

const title = "Web & Mobile App Development Services";
const description = `Hire ${profile.name}, a freelance full-stack developer, for websites, mobile apps, e-commerce stores, web apps and WordPress, worldwide. Free quote.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  ...shareMetadata({ title, description, path: "/services" }),
};

export default function ServicesPage() {
  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <JsonLd data={[breadcrumbs([["Services", "/services"]]), faqPage(generalFaqs)]} />
      <div className="mx-auto max-w-6xl">
        <Link prefetch={false} href="/" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
          <ArrowLeft size={16} /> Back to home
        </Link>

        {/* Centered on mobile (clip above title), left-aligned from sm up — matches the homepage sections */}
        <header className="mt-8 flex flex-col items-center gap-5 text-center sm:flex-row-reverse sm:items-end sm:justify-between sm:text-left">
          <Clip3D name="briefcase" size={120} float priority className="h-20 w-20 shrink-0 sm:h-28 sm:w-28" />
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lilac">Services</p>
            <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              Web &amp; mobile app development services
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted sm:mx-0">
              I&apos;m {profile.name}, a freelance full-stack developer. I design, build and launch websites, online stores,
              web apps and mobile apps for businesses around the world.
            </p>
          </div>
        </header>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const a = accentStyles[s.accent];
            return (
              <Item key={s.slug} className="h-full">
                <Link prefetch={false}
                  href={`/services/${s.slug}`}
                  className="clay group relative flex h-full flex-col overflow-hidden rounded-[28px] p-6 transition hover:-translate-y-1"
                >
                  <div aria-hidden className={clsx("absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-25 blur-3xl transition group-hover:opacity-50", a.bg)} />
                  <Clip3D name={s.clip} size={60} className="relative h-12 w-12 transition duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                  <h2 className="relative mt-4 font-display text-xl font-semibold">{s.title}</h2>
                  <p className="relative mt-2 text-pretty text-sm leading-relaxed text-muted">{s.tagline}</p>
                  <p className={clsx("relative mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold", a.text)}>
                    Learn more <ArrowUpRight size={15} />
                  </p>
                </Link>
              </Item>
            );
          })}
        </Stagger>

        <section className="mt-20">
          <SectionHeading eyebrow="Why work with me" title="One developer, start to finish." clip="star" />
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {whyHire.map((w) => (
              <Item key={w.title} className="h-full">
                <div className="clay h-full rounded-3xl p-5 sm:p-6">
                  <h3 className="font-display text-lg font-semibold">{w.title}</h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">{w.body}</p>
                </div>
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
          <SectionHeading eyebrow="FAQ" title="Questions clients ask." clip="bulb" />
          <div className="mt-10">
            <Faq items={generalFaqs} />
          </div>
        </section>

        <QuoteCta />
      </div>
    </div>
  );
}
