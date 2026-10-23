import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { profile, services } from "@/content/profile";
import { articles, articleBySlug, readingMinutes, formatDate, type ArticleBlock } from "@/content/articles";
import QuoteCta from "@/components/site/QuoteCta";
import JsonLd, { breadcrumbs } from "@/components/site/JsonLd";
import { shareMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = articleBySlug((await params).slug);
  if (!a) return {};
  const project = profile.projects.find((p) => p.slug === a.project);
  const path = `/blog/${a.slug}`;
  const title = a.metaTitle ?? a.title;
  return {
    title: { absolute: title },
    description: a.description,
    alternates: { canonical: path },
    authors: [{ name: profile.name, url: profile.siteUrl }],
    ...shareMetadata({ title, description: a.description, path, image: project?.poster, imageAlt: `${project?.title} screenshot` }),
  };
}

function Block({ block }: { block: ArticleBlock }) {
  if (typeof block === "string") return <p>{block}</p>;
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-lilac">
      {block.list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default async function ArticlePage({ params }: Params) {
  const a = articleBySlug((await params).slug);
  if (!a) notFound();

  const project = profile.projects.find((p) => p.slug === a.project);
  const related = services.filter((s) => a.services.includes(s.slug));
  const others = articles.filter((o) => o.slug !== a.slug).slice(0, 3);
  const path = `/blog/${a.slug}`;

  return (
    <article className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <JsonLd
        data={[
          breadcrumbs([
            ["Blog", "/blog"],
            [a.title, path],
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: a.title,
            description: a.description,
            datePublished: a.published,
            dateModified: a.updated ?? a.published,
            image: project?.poster ? `${profile.siteUrl}${project.poster}` : undefined,
            author: { "@id": `${profile.siteUrl}/#person` },
            publisher: { "@id": `${profile.siteUrl}/#person` },
            mainEntityOfPage: `${profile.siteUrl}${path}`,
            keywords: a.tags.join(", "),
            about: project ? { "@type": "CreativeWork", name: project.title, url: `${profile.siteUrl}/projects/${project.slug}` } : undefined,
          },
        ]}
      />
      <div className="mx-auto max-w-3xl">
        <Link prefetch={false} href="/blog" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
          <ArrowLeft size={16} /> All build stories
        </Link>

        <header className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-lilac">{a.tags.slice(0, 3).join(" · ")}</p>
          <h1 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{a.title}</h1>
          <p className="mt-4 text-sm text-muted">
            By{" "}
            <Link prefetch={false} href="/#about" className="text-white/85 hover:underline">
              {profile.name}
            </Link>{" "}
            · <time dateTime={a.published}>{formatDate(a.published)}</time> · {readingMinutes(a)} min read
          </p>
        </header>

        {project?.poster ? (
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[24px] border border-line">
            <Image src={project.poster} alt={`${project.title} screenshot`} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover object-top" />
          </div>
        ) : null}

        <p className="mt-8 text-pretty text-lg leading-relaxed text-white/90 sm:text-xl">{a.intro}</p>

        <nav aria-label="In this article" className="clay mt-8 rounded-3xl p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">In this article</p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm marker:text-muted">
            {a.sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${anchor(s.heading)}`} className="text-white/85 hover:text-lilac">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-4 space-y-12">
          {a.sections.map((s) => (
            <section key={s.heading} id={anchor(s.heading)} className="scroll-mt-28">
              <h2 className="mt-8 font-display text-2xl font-semibold sm:text-3xl">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-pretty leading-relaxed text-white/85">
                {s.body.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-12 rounded-3xl border border-lilac/30 bg-lilac/10 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-lilac">The takeaway</p>
          <p className="mt-3 text-pretty leading-relaxed text-white/90">{a.takeaway}</p>
        </aside>

        {project ? (
          <aside className="clay mt-6 flex flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">About this project</p>
              <p className="mt-2 font-display text-xl font-semibold">{project.title}</p>
              <p className="mt-1 text-sm text-muted">{project.tagline}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Link prefetch={false} href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10">
                Case study <ArrowUpRight size={14} />
              </Link>
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">
                  Live site <ExternalLink size={14} />
                </a>
              ) : null}
            </div>
          </aside>
        ) : null}

        {related.length ? (
          <p className="mt-6 text-sm text-muted">
            Related services:{" "}
            {related.map((s, i) => (
              <span key={s.slug}>
                {i ? " · " : ""}
                <Link prefetch={false} href={`/services/${s.slug}`} className="font-semibold text-lilac hover:underline">
                  {s.title}
                </Link>
              </span>
            ))}
          </p>
        ) : null}

        <QuoteCta title="Want something like this built?" />

        {others.length ? (
          <nav aria-label="More build stories" className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">More build stories</p>
            <ul className="mt-4 space-y-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link prefetch={false} href={`/blog/${o.slug}`} className="clay group flex items-center justify-between gap-4 rounded-2xl p-4 transition hover:bg-white/[0.05]">
                    <span className="font-semibold">{o.title}</span>
                    <ArrowUpRight size={16} className="shrink-0 text-muted transition group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </article>
  );
}
