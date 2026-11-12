import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Check, Clock } from "lucide-react";
import { profile } from "@/content/profile";
import { plans, suites, suiteDesignExamples, ongoingPlans, planGuide, everyPlan, comparison, comparisonGlobal, type Plan } from "@/content/pricing";
import SocialIcon from "@/components/ui/SocialIcon";
import { Item, Reveal, Stagger } from "@/components/site/MotionPrimitives";
import MobileCollapse from "@/components/site/MobileCollapse";
import Price from "@/components/site/Price";
import CurrencySwitch from "@/components/site/CurrencySwitch";

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
 * Everything on /pricing below the page header. Server component; only the ₹/$ switch is client JS.
 * Order: main plans → Web + App Suites → monthly care and one-off changes → promises →
 * "which plan fits" guide → agency comparison.
 */
export default function Pricing() {
  const suiteCare = planBySlug("suite-care");
  return (
    <section id="pricing">
      <h2 className="sr-only">Plans</h2>
      <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted">Prices in ₹ for India and $ everywhere else. Switch any time.</p>
        <CurrencySwitch />
      </div>

      {/* Plans stack on phones (prices compared at a glance, features behind "See all"), 2-up on tablets, 4-up on desktop. */}
      <Stagger className="grid gap-5 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
        {plans.map((p) => (
          <Item key={p.slug} className="h-full">
            <PlanCard plan={p} />
          </Item>
        ))}
      </Stagger>

      <div id="suites" className="mt-16 scroll-mt-28">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-lilac sm:text-left">Web + App Suites</p>
          <GroupHeading>Secure, custom-designed web app and mobile app, built and run for you.</GroupHeading>
          <GroupIntro>
            One backend powers your web app and your Android and iOS apps, designed from scratch for your brand and built to be
            secure. Pay once to build it, get 6 to 12 months of free support, then {suiteCare.name} keeps it running for{" "}
            <Price inr={suiteCare.inr} usd={suiteCare.usd} /> a month.
          </GroupIntro>
          <p className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-muted sm:justify-start">
            <span>See the design quality:</span>
            {suiteDesignExamples.map((e) => (
              <Link key={e.href} prefetch={false} href={e.href} className="font-semibold text-lilac hover:underline">
                {e.label}
              </Link>
            ))}
          </p>
        </Reveal>
        <Stagger className="mt-8 grid gap-5 md:gap-4 lg:grid-cols-3">
          {suites.map((p) => (
            <Item key={p.slug} className="h-full">
              <SuiteCard plan={p} />
            </Item>
          ))}
        </Stagger>
      </div>

      <div id="care" className="mt-16 scroll-mt-28">
        <Reveal>
          <GroupHeading>Already live? Keep it running, or make it better.</GroupHeading>
          <GroupIntro>
            Monthly care once your free support ends: Care for websites, stores and apps, Suite Care for the Web + App Suites. Or
            one-off fixes and upgrades for a website another developer built.
          </GroupIntro>
        </Reveal>
        <Stagger className="mt-6 grid gap-5 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {ongoingPlans.map((p) => (
            <Item key={p.slug} className="h-full">
              <PlanCard plan={p} />
            </Item>
          ))}
        </Stagger>
      </div>

      <Reveal>
        <div className="swipe-sm mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {everyPlan.map((e) => (
            <div key={e.title} className="rounded-3xl border border-line bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">{e.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{e.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div id="which-plan" className="mt-16 scroll-mt-28">
          <GroupHeading>Which plan fits your business?</GroupHeading>
          <GroupIntro>Find your kind of business below. Not listed? Tell me what you do and I&apos;ll recommend the cheapest plan that does the job.</GroupIntro>
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

      <Reveal>
        <div className="mt-16">
          <GroupHeading>How this compares</GroupHeading>
          <div data-cur="inr">
            <GroupIntro>Typical Kolkata agencies, from their published price lists and directory listings (October–November 2026).</GroupIntro>
            <ComparisonTable rows={comparison} them="Typical agency" />
          </div>
          <div data-cur="usd">
            <GroupIntro>Typical freelancers and agencies in the US, UK and Europe, from 2026 pricing guides and marketplace rates.</GroupIntro>
            <ComparisonTable rows={comparisonGlobal} them="Typical freelancer or agency" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ComparisonTable({ rows, them }: { rows: { label: string; them: string; me: string }[]; them: string }) {
  return (
    <div className="clay mt-6 overflow-hidden rounded-3xl">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-[0.18em] text-muted">
            <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
              <span className="sr-only">Feature</span>
            </th>
            <th scope="col" className="px-4 py-3 font-semibold sm:px-6">{them}</th>
            <th scope="col" className="px-4 py-3 font-semibold text-lilac sm:px-6">Working with me</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
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
  );
}

function GroupHeading({ children }: { children: ReactNode }) {
  return <h2 className="mt-2 text-center font-display text-2xl font-semibold sm:text-left sm:text-3xl">{children}</h2>;
}

function GroupIntro({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-center text-sm text-muted sm:text-left">{children}</p>;
}

function PlanCard({ plan: p }: { plan: Plan }) {
  return (
    <article
      id={`plan-${p.slug}`}
      className={clsx("clay relative flex h-full scroll-mt-28 flex-col rounded-[28px] p-6", p.popular && "border-lilac/60 ring-1 ring-lilac/40")}
    >
      {p.popular ? <PopularBadge /> : null}
      <h3 className="font-display text-xl font-semibold">{p.name}</h3>
      <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted md:min-h-[4.25rem]">{p.forWho}</p>
      <p className="mt-4 flex items-baseline gap-2">
        {p.from ? <span className="text-sm text-muted">from</span> : null}
        <span className="font-display text-4xl font-semibold tracking-tight">
          <Price inr={p.inr} usd={p.usd} />
        </span>
      </p>
      <p className="mt-1 text-xs text-muted">{p.priceNote}</p>
      {p.delivery ? <DeliveryBadge text={p.delivery} /> : null}
      <BestFor items={p.bestFor} />
      {/* flex-1 lets the feature list absorb spare height, so run panels and buttons line up across a row */}
      <div className="flex-1">
        <FeatureList plan={p} />
      </div>
      <RunPanel plan={p} />
      <PlanActions plan={p} />
    </article>
  );
}

/**
 * A Web + App Suite: one card split into the one-time build and the monthly run that follows,
 * so the full cost of owning the product is visible at a glance.
 */
function SuiteCard({ plan: p }: { plan: Plan }) {
  return (
    <article
      id={`plan-${p.slug}`}
      className={clsx("clay relative flex h-full scroll-mt-28 flex-col rounded-[28px] p-6", p.popular && "border-lilac/60 ring-1 ring-lilac/40")}
    >
      {p.popular ? <PopularBadge /> : null}
      <h3 className="font-display text-xl font-semibold">{p.name}</h3>
      <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted lg:min-h-[5rem]">{p.forWho}</p>
      <BestFor items={p.bestFor} />

      {/* flex-1 stretches the build panel so the run panels and buttons line up across cards */}
      <div className="mt-5 flex-1 rounded-3xl border border-line bg-white/[0.03] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lilac">Build · {p.priceNote}</p>
        <p className="mt-2 font-display text-4xl font-semibold tracking-tight">
          <Price inr={p.inr} usd={p.usd} />
        </p>
        {p.delivery ? <DeliveryBadge text={p.delivery} /> : null}
        <FeatureList plan={p} />
      </div>

      <RunPanel plan={p} />
      <PlanActions plan={p} />
    </article>
  );
}

/** The free support a plan includes, and the monthly care plan that takes over afterwards. */
function RunPanel({ plan: p }: { plan: Plan }) {
  if (!p.freeSupport || !p.care) return null;
  const care = planBySlug(p.care);
  return (
    <div className="mt-5 rounded-3xl border border-mint/25 bg-mint/[0.06] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">Run · monthly</p>
      <p className="mt-2">
        <span className="font-display text-2xl font-semibold">{p.freeSupport}</span> <span className="text-sm text-white/85">free support</span>
      </p>
      <p className="mt-1 text-sm text-white/85">
        Then <Price inr={care.inr} usd={care.usd} /> {care.priceNote}
      </p>
      <a href={`#plan-${care.slug}`} className="mt-2 inline-block text-xs font-semibold text-mint hover:underline">
        What&apos;s in {care.name} ↓
      </a>
    </div>
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
