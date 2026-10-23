import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Check, Clock } from "lucide-react";
import { profile } from "@/content/profile";
import { plans, carePlan, everyPlan, comparison } from "@/content/pricing";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialIcon from "@/components/ui/SocialIcon";
import { Item, Reveal, Stagger } from "@/components/site/MotionPrimitives";
import MobileCollapse from "@/components/site/MobileCollapse";

const waNumber = profile.whatsapp.match(/wa\.me\/(\d+)/)?.[1] ?? "";
const wa = (text: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

/**
 * Pricing plans. Server component (no client JS). `full` adds the market comparison table,
 * used on /pricing; the homepage shows the plans and promises only.
 */
export default function Pricing({ full = false, asPage = false }: { full?: boolean; asPage?: boolean }) {
  return (
    <section id="pricing" aria-labelledby={asPage ? undefined : "pricing-title"} className={clsx(!asPage && "px-4 py-16 sm:px-6 sm:py-24")}>
      <div className={clsx(!asPage && "mx-auto max-w-6xl")}>
        {asPage ? (
          <h2 className="sr-only">Plans</h2>
        ) : (
          <SectionHeading
            eyebrow="Pricing"
            title="Simple prices. Fast delivery."
            description="Custom websites, stores and apps at prices that beat most local agencies, delivered in days, with a free demo before you pay."
            clip="money"
          />
        )}

        {/* Plans stack on phones (prices compared at a glance, features behind "See all"), 2-up on tablets, 4-up on desktop. */}
        <Stagger className={clsx("grid gap-5 md:grid-cols-2 md:gap-4 xl:grid-cols-4", !asPage && "mt-10 sm:mt-12")}>
          {plans.map((p) => (
            <Item key={p.slug} className="h-full">
              <article
                className={clsx(
                  "clay relative flex h-full flex-col rounded-[28px] p-6",
                  p.popular && "border-lilac/60 ring-1 ring-lilac/40",
                )}
              >
                {p.popular ? (
                  <p className="absolute -top-3 left-6 rounded-full bg-lilac px-3 py-1 text-xs font-semibold text-ink">Most popular</p>
                ) : null}
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted md:min-h-[3.75rem]">{p.forWho}</p>
                <p className="mt-4 flex items-baseline gap-2">
                  {p.priceNote === "starting price" ? <span className="text-sm text-muted">from</span> : null}
                  <span className="font-display text-4xl font-semibold tracking-tight">{p.inr}</span>
                </p>
                <p className="mt-1 text-xs text-muted">
                  {p.priceNote} · {p.usd} for international clients
                </p>
                <p className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-medium text-mint">
                  <Clock size={12} /> {p.delivery}
                </p>
                <MobileCollapse more={`See all ${p.features.filter((f) => !f.endsWith(":")).length} features`}>
                  <ul className="mt-5 space-y-2.5 text-sm">
                    {p.features.map((f) =>
                      f.endsWith(":") ? (
                        <li key={f} className="font-semibold text-white">
                          {f}
                        </li>
                      ) : (
                        <li key={f} className="flex gap-2.5 text-white/85">
                          <Check size={16} className="mt-0.5 shrink-0 text-lilac" aria-hidden />
                          {f}
                        </li>
                      ),
                    )}
                  </ul>
                  {p.note ? <p className="mt-4 text-xs leading-relaxed text-muted">{p.note}</p> : null}
                </MobileCollapse>
                <div className="mt-auto grid gap-2 pt-5 md:pt-6">
                  <a
                    href={wa(p.whatsapp)}
                    target="_blank"
                    rel="noreferrer"
                    className={clsx(
                      "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition",
                      p.popular ? "btn-clay bg-lilac text-ink" : "border border-[#25D366]/40 bg-[#25D366]/15 text-[#5be38f] hover:bg-[#25D366]/25",
                    )}
                  >
                    <SocialIcon icon="whatsapp" size={16} /> {p.slug === "app" ? "Book a free call" : "Get my free demo"}
                  </a>
                  <Link prefetch={false} href="/#contact" className="inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2 text-sm text-muted transition hover:text-white">
                    Ask a question <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </Item>
          ))}
        </Stagger>

        <Reveal>
          <div className="swipe-sm mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {everyPlan.map((e) => (
              <div key={e.title} className="rounded-3xl border border-line bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{e.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{e.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="clay mt-6 flex flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="font-semibold text-white">
                {carePlan.name}: {carePlan.inr}
                <span className="text-muted">{carePlan.period}</span>{" "}
                <span className="text-xs font-normal text-muted">({carePlan.usd} international)</span>
              </p>
              <p className="mt-1 text-sm text-muted">After your free support period. Cancel anytime.</p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {carePlan.features.map((f) => (
                <li key={f} className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-white/80">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {full ? (
          <Reveal>
            <div className="mt-16">
              <h2 className="text-center font-display text-2xl font-semibold sm:text-left sm:text-3xl">How this compares</h2>
              <p className="mt-2 text-center text-sm text-muted sm:text-left">
                A typical low-cost web-design agency in Kolkata, from their published price lists (October 2026).
              </p>
              <div className="clay mt-6 overflow-hidden rounded-3xl">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-line text-xs uppercase tracking-[0.18em] text-muted">
                      <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                        <span className="sr-only">Feature</span>
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold sm:px-6">Typical agency</th>
                      <th scope="col" className="px-4 py-3 font-semibold text-lilac sm:px-6">Working with me</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.label} className="border-b border-line last:border-0">
                        <th scope="row" className="px-4 py-3 font-semibold text-white sm:px-6">
                          {row.label}
                        </th>
                        <td className="px-4 py-3 text-muted sm:px-6">{row.them}</td>
                        <td className="px-4 py-3 text-white sm:px-6">{row.me}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <p className="mt-6 text-center text-sm sm:text-left">
              <Link prefetch={false} href="/pricing" className="font-semibold text-lilac hover:underline">
                Compare with typical agency prices & read the pricing FAQ →
              </Link>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
