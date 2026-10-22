import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { articles, readingMinutes, formatDate } from "@/content/articles";
import { Item, Stagger } from "@/components/site/MotionPrimitives";
import QuoteCta from "@/components/site/QuoteCta";
import JsonLd, { breadcrumbs } from "@/components/site/JsonLd";
import { shareMetadata } from "@/lib/seo";

const title = "Build stories: how I build websites & apps";
const description = `Case studies from ${profile.name}: how real marketplaces, SaaS products, mobile apps and B2B stores were planned, built and shipped.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  ...shareMetadata({ title, description, path: "/blog" }),
};

export default function BlogIndex() {
  const posts = [...articles].sort((a, b) => b.published.localeCompare(a.published));
  const posterOf = (slug: string) => profile.projects.find((p) => p.slug === slug)?.poster;

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <JsonLd data={breadcrumbs([["Blog", "/blog"]])} />
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <header className="mx-auto mt-8 max-w-2xl text-center sm:mx-0 sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lilac">Blog</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">Build stories.</h1>
          <p className="mt-4 text-pretty text-lg text-muted">
            How real products were planned, built and shipped: the architecture, the trade-offs and what I&apos;d do for your project.
          </p>
        </header>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {posts.map((a, i) => {
            const poster = posterOf(a.project);
            return (
              <Item key={a.slug} className="h-full">
                <Link href={`/blog/${a.slug}`} className="clay group flex h-full flex-col overflow-hidden rounded-[28px] p-3 transition hover:-translate-y-1">
                  {poster ? (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-line">
                      <Image src={poster} alt="" fill priority={i < 2} sizes="(min-width: 640px) 560px, 100vw" className="object-cover object-top transition duration-500 group-hover:scale-[1.02]" />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                    <p className="text-xs text-muted">
                      {formatDate(a.published)} · {readingMinutes(a)} min read
                    </p>
                    <h2 className="mt-2 text-balance font-display text-xl font-semibold sm:text-2xl">{a.title}</h2>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{a.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {a.tags.slice(0, 4).map((t) => (
                        <li key={t} className="rounded-full border border-line bg-white/5 px-2.5 py-1 text-xs text-white/80">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-lilac">
                      Read the story <ArrowUpRight size={15} />
                    </p>
                  </div>
                </Link>
              </Item>
            );
          })}
        </Stagger>

        <QuoteCta title="Planning something similar?" />
      </div>
    </div>
  );
}
