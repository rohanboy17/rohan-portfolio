import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Check, Clock } from "lucide-react";
import { profile } from "@/content/profile";
import { plans, suites, suiteCare, ongoingPlans, planGuide, everyPlan, comparison, internationalMarkup, type Plan } from "@/content/pricing";
import { usdFromInr, usdPerInr } from "@/lib/fx";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialIcon from "@/components/ui/SocialIcon";
import { Item, Reveal, Stagger } from "@/components/site/MotionPrimitives";
import MobileCollapse from "@/components/site/MobileCollapse";

const waNumber = profile.whatsapp.match(/wa\.me\/(\d+)/)?.[1] ?? "";
const wa = (text: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

const allPlans = [...plans, ...suites, ...ongoingPlans];
function planBySlug(slug: string) {
  const plan = allPlans.find((p) => p.slug === slug);
  // Fail the build on a typo rather than linking to a plan that doesn't exist.
  if (!plan) throw new Error(`Pricing refers to unknown plan "${slug}"`);
  return plan;
}

/**
 * Pricing plans. Server component (no client JS). `full` adds the "which plan fits" guide and
 * the market comparison table, used on /pricing; the homepage shows the plans and promises only.
 */
export default async function Pricing({ full = false, asPage = false }: { full?: boolean; asPage?: boolean }) {
  const rate = await usdPerInr();
  const usd = (inr: string) => usdFromInr(inr, rate, internationalMarkup);
  // Headings one level deeper on the homepage, where the section title is the h2.
  const GroupHeading = asPage ? "h2" : "h3";
  const cardHeading = asPage ? "h3" : "h4";
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
              <PlanCard plan={p} usd={usd} heading="h3" />
            </Item>
          ))}
        </Stagger>
        <p className="mt-4 text-center text-xs text-muted sm:text-left">International prices are in US dollars and follow the daily exchange rate.</p>

        <div id="suites" className="mt-16 scroll-mt-28">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-lilac sm:text-left">Web + App Suites</p>
            <GroupHeading className="mt-2 text-center font-display text-2xl font-semibold sm:text-left sm:text-3xl">
              Secure web app and mobile app, built and run for you.
            </GroupHeading>
            <p className="mt-2 text-center text-sm text-muted sm:text-left">
              One backend powers your web app and your Android and iOS apps. Pay once to build it, get 6 to 12 months of free
              support, then {suiteCare.name} keeps it running for {suiteCare.inr} a month.
            </p>
          </Reveal>
          <Stagger className="mt-8 grid gap-5 md:gap-4 lg:grid-cols-3">
            {suites.map((p) => (
              <Item key={p.slug} className="h-full">
                <SuiteCard plan={p} usd={usd} heading={cardHeading} />
              </Item>
            ))}
          </Stagger>
          <Reveal>
            <div id="suite-care" className="clay mt-4 flex scroll-mt-28 flex-col gap-4 rounded-3xl p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="lg:max-w-sm">
                <p className="font-semibold text-white">
                  {suiteCare.name}: {suiteCare.inr} <span className="text-muted">{suiteCare.period}</span>{" "}
                  <span className="text-xs font-normal text-muted">({usd(suiteCare.inr)} international)</span>
                </p>
                <p className="mt-1 text-sm text-muted">Starts when a suite&apos;s free support ends. {suiteCare.note}</p>
              </div>
              <ul className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
                {suiteCare.features.map((f) => (
                  <li key={f} className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-white/80">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {full ? (
          <Reveal>
            <div id="which-plan" className="mt-16 scroll-mt-28">
              <h2 className="text-center font-display text-2xl font-semibold sm:text-left sm:text-3xl">Which plan fits your business?</h2>
              <p className="mt-2 text-center text-sm text-muted sm:text-left">
                Find your kind of business below. Not listed? Tell me what you do and I&apos;ll recommend the cheapest plan that does the job.
              </p>
              <ul className="clay mt-6 overflow-hidden rounded-3xl">
                {planGuide.map((row) => {
                  const plan = planBySlug(row.plan);
                  return (
                    <li
                      key={row.business}
                      className="flex flex-col gap-3 border-b border-line px-4 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
                    >
                      <div>
                        <p className="font-semibold text-white">{row.business}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{row.why}</p>
                      </div>
                      <a
                        href={`#plan-${plan.slug}`}
                        className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-lilac/40 bg-lilac/10 px-4 py-1.5 text-sm font-semibold text-lilac transition hover:bg-lilac/20"
                      >
                        {plan.name} <ArrowRight size={14} aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ) : null}

        <Reveal>
          <div className={clsx("swipe-sm grid gap-3 sm:grid-cols-2 lg:grid-cols-4", full ? "mt-10" : "mt-6")}>
            {everyPlan.map((e) => (
              <div key={e.title} className="rounded-3xl border border-line bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{e.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{e.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <GroupHeading className="text-center font-display text-2xl font-semibold sm:text-left sm:text-3xl">
              Already live? Keep it running, or make it better.
            </GroupHeading>
            <p className="mt-2 text-center text-sm text-muted sm:text-left">
              Monthly care once your free support ends, or one-off fixes and upgrades for any website, whoever built it.
            </p>
          </Reveal>
          <Stagger className="mt-6 grid gap-5 md:grid-cols-2 md:gap-4">
            {ongoingPlans.map((p) => (
              <Item key={p.slug} className="h-full">
                <PlanCard plan={p} usd={usd} heading={cardHeading} />
              </Item>
            ))}
          </Stagger>
        </div>

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
            <p className="mt-10 text-center text-sm sm:text-left">
              <Link prefetch={false} href="/pricing#which-plan" className="font-semibold text-lilac hover:underline">
                See which plan fits your business, compare agency prices & read the FAQ →
              </Link>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function PlanCard({ plan: p, usd, heading: Heading }: { plan: Plan; usd: (inr: string) => string; heading: "h3" | "h4" }) {
  return (
    <article
      id={`plan-${p.slug}`}
      className={clsx("clay relative flex h-full scroll-mt-28 flex-col rounded-[28px] p-6", p.popular && "border-lilac/60 ring-1 ring-lilac/40")}
    >
      {p.popular ? <PopularBadge /> : null}
      <Heading className="font-display text-xl font-semibold">{p.name}</Heading>
      <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted md:min-h-[3.75rem]">{p.forWho}</p>
      <p className="mt-4 flex items-baseline gap-2">
        {p.from ? <span className="text-sm text-muted">from</span> : null}
        <span className="font-display text-4xl font-semibold tracking-tight">{p.inr}</span>
      </p>
      <p className="mt-1 text-xs text-muted">
        {p.priceNote} · {usd(p.inr)} for international clients
      </p>
      {p.delivery ? <DeliveryBadge text={p.delivery} /> : null}
      <BestFor items={p.bestFor} />
      <FeatureList plan={p} />
      <PlanActions plan={p} />
    </article>
  );
}

/**
 * A Web + App Suite: one card split into the one-time build and the monthly run that follows,
 * so the full cost of owning the product is visible at a glance.
 */
function SuiteCard({ plan: p, usd, heading: Heading }: { plan: Plan; usd: (inr: string) => string; heading: "h3" | "h4" }) {
  return (
    <article
      id={`plan-${p.slug}`}
      className={clsx("clay relative flex h-full scroll-mt-28 flex-col rounded-[28px] p-6", p.popular && "border-lilac/60 ring-1 ring-lilac/40")}
    >
      {p.popular ? <PopularBadge /> : null}
      <Heading className="font-display text-xl font-semibold">{p.name}</Heading>
      <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted lg:min-h-[5rem]">{p.forWho}</p>
      <BestFor items={p.bestFor} />

      {/* flex-1 stretches the build panel so the run panels and buttons line up across cards */}
      <div className="mt-5 flex-1 rounded-3xl border border-line bg-white/[0.03] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lilac">Build · {p.priceNote}</p>
        <p className="mt-2 font-display text-4xl font-semibold tracking-tight">{p.inr}</p>
        <p className="mt-1 text-xs text-muted">{usd(p.inr)} for international clients</p>
        {p.delivery ? <DeliveryBadge text={p.delivery} /> : null}
        <FeatureList plan={p} />
      </div>

      <div className="mt-3 rounded-3xl border border-mint/25 bg-mint/[0.06] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">Run · monthly</p>
        <p className="mt-2 font-display text-2xl font-semibold">{p.freeSupport} free support</p>
        <p className="mt-1 text-sm text-white/85">
          Then {suiteCare.inr} {suiteCare.period}{" "}
          <span className="text-xs text-muted">({usd(suiteCare.inr)} international)</span>
        </p>
        <a href="#suite-care" className="mt-2 inline-block text-xs font-semibold text-mint hover:underline">
          What&apos;s in {suiteCare.name} ↓
        </a>
      </div>

      <PlanActions plan={p} />
    </article>
  );
}

function PopularBadge() {
  return <p className="absolute -top-3 left-6 rounded-full bg-lilac px-3 py-1 text-xs font-semibold text-ink">Most popular</p>;
}

function DeliveryBadge({ text }: { text: string }) {
  return (
    <p className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-medium text-mint">
      <Clock size={12} /> {text}
    </p>
  );
}

function BestFor({ items }: { items: string[] }) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Best for</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {items.map((b) => (
          <li key={b} className="rounded-full border border-line bg-white/5 px-2.5 py-1 text-xs text-white/80">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Feature checklist and small print; behind "See all" on phones. */
function FeatureList({ plan: p }: { plan: Plan }) {
  return (
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
  );
}

/** "Choose X instead" pointer and the WhatsApp / question buttons, pinned to the card's foot. */
function PlanActions({ plan: p }: { plan: Plan }) {
  const instead = p.instead ? planBySlug(p.instead.slug) : null;
  return (
    <div className="mt-auto grid gap-2 pt-5 md:pt-6">
      {p.instead && instead ? (
        // Same height on every card so the buttons below line up.
        <div className="mb-2 flex items-center rounded-2xl border border-line bg-white/[0.03] px-3.5 py-2.5 md:min-h-[5rem]">
          <p className="text-xs leading-relaxed text-muted">
            {p.instead.when}{" "}
            <a href={`#plan-${instead.slug}`} className="font-semibold text-lilac hover:underline">
              Choose {instead.name} →
            </a>
          </p>
        </div>
      ) : null}
      <a
        href={wa(p.whatsapp)}
        target="_blank"
        rel="noreferrer"
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition",
          p.popular ? "btn-clay bg-lilac text-ink" : "border border-[#25D366]/40 bg-[#25D366]/15 text-[#5be38f] hover:bg-[#25D366]/25",
        )}
      >
        <SocialIcon icon="whatsapp" size={16} /> {p.cta}
      </a>
      <Link prefetch={false} href="/#contact" className="inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2 text-sm text-muted transition hover:text-white">
        Ask a question <ArrowRight size={14} />
      </Link>
    </div>
  );
}
