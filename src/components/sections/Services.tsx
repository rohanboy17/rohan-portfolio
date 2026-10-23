import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";
import SectionHeading from "@/components/ui/SectionHeading";
import { Item, Reveal, Stagger } from "@/components/site/MotionPrimitives";

export default function Services() {
  return (
    <section id="services" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Services"
          title="What I can build for your business."
          description="Websites, online stores, web apps and mobile apps — designed, built and launched by one developer, for clients anywhere in the world."
          clip="briefcase"
        />

        <Stagger className="swipe-sm mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {services.map((s) => {
            const a = accentStyles[s.accent];
            return (
              <Item key={s.slug} className="h-full">
                <Link prefetch={false}
                  href={`/services/${s.slug}`}
                  className="clay group relative flex h-full items-start gap-4 overflow-hidden rounded-[28px] p-5 transition hover:-translate-y-1 sm:flex-col sm:p-6"
                >
                  <div aria-hidden className={clsx("absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-20 blur-3xl transition group-hover:opacity-45", a.bg)} />
                  <Clip3D name={s.clip} size={56} className="relative h-11 w-11 shrink-0 transition duration-500 group-hover:-rotate-6 group-hover:scale-110 sm:h-12 sm:w-12" />
                  <div className="relative">
                    <h3 className="font-display text-lg font-semibold sm:text-xl">{s.title}</h3>
                    <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">{s.tagline}</p>
                    <p className={clsx("mt-3 hidden items-center gap-1.5 text-sm font-semibold sm:flex", a.text)}>
                      Learn more <ArrowUpRight size={15} />
                    </p>
                  </div>
                </Link>
              </Item>
            );
          })}
          <Item className="h-full">
            <Link prefetch={false}
              href="/#contact"
              className="group flex h-full flex-col items-center justify-center gap-3 rounded-[28px] border border-dashed border-lilac/40 bg-lilac/5 p-6 text-center transition hover:bg-lilac/10"
            >
              <p className="font-display text-lg font-semibold sm:text-xl">Have something else in mind?</p>
              <p className="text-sm text-muted">Tell me about it — free quote within 24 hours.</p>
              <span className="btn-clay mt-1 inline-flex items-center gap-2 rounded-full bg-lilac px-5 py-2.5 text-sm font-semibold text-ink">
                Get a free quote <ArrowRight size={16} />
              </span>
            </Link>
          </Item>
        </Stagger>

        <Reveal>
          <p className="mt-6 text-center text-sm text-muted sm:text-left">
            <Link prefetch={false} href="/services" className="font-semibold text-lilac hover:underline">
              See all services, process &amp; FAQs →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
