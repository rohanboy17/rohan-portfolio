import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { articles, formatDate, readingMinutes } from "@/content/articles";
import SectionHeading from "@/components/ui/SectionHeading";
import { Item, Reveal, Stagger } from "@/components/site/MotionPrimitives";

/** Homepage "From the blog": the three newest build stories. Server component, no client JS. */
export default function LatestArticles() {
  const latest = [...articles].sort((a, b) => b.published.localeCompare(a.published)).slice(0, 3);
  const posterOf = (slug: string) => profile.projects.find((p) => p.slug === slug)?.poster;

  return (
    <section id="blog" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="From the blog"
          title="How real projects get built."
          description="Short build stories: the problem, the architecture and the trade-offs, from projects you can see live."
          clip="bulb"
        />
        <Stagger className="swipe-md mt-10 grid gap-4 sm:mt-12 md:grid-cols-3">
          {latest.map((a) => {
            const poster = posterOf(a.project);
            return (
              <Item key={a.slug} className="h-full">
                <Link
                  prefetch={false}
                  href={`/blog/${a.slug}`}
                  className="clay group flex h-full flex-col overflow-hidden rounded-[28px] p-3 transition hover:-translate-y-1"
                >
                  {poster ? (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] border border-line">
                      <Image src={poster} alt="" fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover object-top" />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                    <p className="text-xs text-muted">
                      {formatDate(a.published)} · {readingMinutes(a)} min read
                    </p>
                    <h3 className="mt-2 text-balance font-display text-lg font-semibold">{a.title}</h3>
                    <p className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-lilac">
                      Read the story <ArrowUpRight size={15} />
                    </p>
                  </div>
                </Link>
              </Item>
            );
          })}
        </Stagger>
        <Reveal>
          <div className="mt-8 flex justify-center sm:justify-start">
            <Link prefetch={false} href="/blog" className="clay inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition hover:bg-white/10">
              All {articles.length} build stories <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
