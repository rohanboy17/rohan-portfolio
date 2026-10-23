import Link from "next/link";
import { Quote } from "lucide-react";
import { profile } from "@/content/profile";
import { Item, Reveal, Stagger } from "@/components/site/MotionPrimitives";

/**
 * Social proof from real clients: a "Trusted by" strip (always) and testimonials (only once
 * real quotes are added to profile.testimonials). Server component, no client JS.
 */
export default function ClientProof() {
  const clients = profile.trustedBy
    .map((c) => ({ ...c, project: profile.projects.find((p) => p.slug === c.project) }))
    .filter((c) => c.project);
  const countries = [...new Set(clients.map((c) => c.country))];
  const { testimonials } = profile;

  return (
    <section id="clients" aria-labelledby="clients-title" className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 id="clients-title" className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            Trusted by businesses in {countries.length} countries
          </h2>
        </Reveal>
        {/* One auto-scrolling row instead of several wrapped rows. The second copy only closes the
            loop: it is hidden from screen readers and skipped by Tab, and dropped under reduced motion. */}
        <div className="marquee mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex w-max [--marquee-duration:40s]">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy ? true : undefined} className={copy ? "marquee-copy flex gap-2.5 pr-2.5" : "flex gap-2.5 pr-2.5"}>
                {clients.map((c) => (
                  <li key={c.project!.slug}>
                    <Link
                      prefetch={false}
                      tabIndex={copy ? -1 : undefined}
                      href={`/projects/${c.project!.slug}`}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-lilac/40 hover:text-white"
                    >
                      <span className="font-semibold">{c.project!.title}</span>
                      <span className="text-xs text-muted">{c.country}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {testimonials.length ? (
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => {
              const project = profile.projects.find((p) => p.slug === t.project);
              return (
                <Item key={t.name + t.company} className="h-full">
                  <figure className="clay flex h-full flex-col rounded-[28px] p-6">
                    <Quote size={22} className="text-lilac" aria-hidden />
                    <blockquote className="mt-3 flex-1 text-pretty leading-relaxed text-white/90">“{t.quote}”</blockquote>
                    <figcaption className="mt-5 text-sm">
                      <span className="block font-semibold text-white">{t.name}</span>
                      <span className="block text-muted">
                        {t.role}, {t.company}
                        {t.country ? ` · ${t.country}` : ""}
                      </span>
                      {project ? (
                        <Link prefetch={false} href={`/projects/${project.slug}`} className="mt-2 inline-block text-xs font-semibold text-lilac hover:underline">
                          See the project →
                        </Link>
                      ) : null}
                    </figcaption>
                  </figure>
                </Item>
              );
            })}
          </Stagger>
        ) : null}
      </div>
    </section>
  );
}
