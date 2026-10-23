import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile, liveIndustries, projectsInIndustry } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";
import { Item, Stagger } from "@/components/site/MotionPrimitives";
import DemoRequest from "@/components/site/DemoRequest";
import JsonLd, { breadcrumbs } from "@/components/site/JsonLd";
import { shareMetadata } from "@/lib/seo";

const title = "Websites & apps by industry";
const description = `Retail, manufacturing, healthcare, travel, finance, SaaS and more: see the websites and apps ${profile.name} has built for businesses like yours.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/industries" },
  ...shareMetadata({ title, description, path: "/industries" }),
};

export default function IndustriesHub() {
  const whatsappNumber = profile.whatsapp.match(/wa\.me\/(\d+)/)?.[1] ?? "";

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <JsonLd data={breadcrumbs([["Industries", "/industries"]])} />
      <div className="mx-auto max-w-6xl">
        <Link prefetch={false} href="/work" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
          <ArrowLeft size={16} /> Search all work
        </Link>

        <header className="mx-auto mt-8 max-w-2xl text-center sm:mx-0 sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lilac">Industries</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            Websites &amp; apps for your industry.
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted">
            See what I&apos;ve built for businesses like yours, in {liveIndustries.length} industries and counting.
          </p>
        </header>

        <Stagger className="swipe-sm mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveIndustries.map((ind) => {
            const a = accentStyles[ind.accent];
            const projects = projectsInIndustry(ind.slug).filter((p) => p.category !== "UI replica");
            return (
              <Item key={ind.slug} className="h-full">
                <Link prefetch={false}
                  href={`/industries/${ind.slug}`}
                  className="clay group relative flex h-full flex-col overflow-hidden rounded-[28px] p-6 transition hover:-translate-y-1"
                >
                  <div aria-hidden className={clsx("absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-25 blur-3xl transition group-hover:opacity-50", a.bg)} />
                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <p className={clsx("text-xs font-semibold uppercase tracking-[0.22em]", a.text)}>{projects.length} projects</p>
                      <h2 className="mt-2 font-display text-xl font-semibold">{ind.title}</h2>
                    </div>
                    <Clip3D name={ind.clip} size={56} className="h-11 w-11 shrink-0 transition duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                  </div>
                  <p className="relative mt-2 line-clamp-3 text-pretty text-sm leading-relaxed text-muted">{ind.intro}</p>
                  <p className="relative mt-4 line-clamp-1 text-xs text-white/70">{projects.slice(0, 3).map((p) => p.title).join(" · ")}</p>
                  <p className={clsx("relative mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold", a.text)}>
                    View {ind.short} work <ArrowUpRight size={15} />
                  </p>
                </Link>
              </Item>
            );
          })}
        </Stagger>

        <DemoRequest
          business="business"
          offer={{ ...profile.demoOffer, title: "Don't see your industry? Get a free homepage demo in 3–4 hours" }}
          whatsappNumber={whatsappNumber}
          email={profile.email}
          className="mt-16"
        />
      </div>
    </div>
  );
}
