import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/content/profile";
import { plans, suites, ongoingPlans, pricingFaqs, launchOffer, offerActive, offerPrice } from "@/content/pricing";
import { inrPerUsd, inrFromUsd } from "@/lib/fx";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/site/Faq";
import QuoteCta from "@/components/site/QuoteCta";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd, { breadcrumbs, faqPage } from "@/components/site/JsonLd";
import { shareMetadata } from "@/lib/seo";

const title = "Website & App Development Prices — Websites from $249";
const description =
  "Websites from $249, stores $899, apps from $1,799, secure web + app suites from $3,999. 50% off every plan until 31 Dec 2026. Free demo first.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/pricing" },
  ...shareMetadata({ title, description, path: "/pricing" }),
};

export default async function PricingPage() {
  const rate = await inrPerUsd();
  const onOffer = offerActive();
  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <JsonLd
        data={[
          breadcrumbs([["Pricing", "/pricing"]]),
          faqPage(pricingFaqs),
          {
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Website, online store, app and secure web + app suite packages",
            // One offer per plan per currency, at the price a client pays today (the launch offer
            // while it runs, valid until its end date). Rupees are converted at the day's rate.
            itemListElement: [...plans, ...suites, ...ongoingPlans].flatMap((p) =>
              (["USD", "INR"] as const).map((currency) => {
                const usd = onOffer ? offerPrice(p.usd) : p.usd;
                const price = String(currency === "USD" ? usd : inrFromUsd(usd, rate));
                // Care plans are billed monthly and Fix & Upgrade hourly.
                const unitCode = p.priceNote === "per month" ? "MON" : p.priceNote === "per hour" ? "HUR" : null;
                return {
                  "@type": "Offer",
                  name: p.name,
                  description: p.forWho,
                  price,
                  priceCurrency: currency,
                  ...(unitCode ? { priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: currency, unitCode } } : {}),
                  ...(onOffer ? { priceValidUntil: launchOffer.endsAt.slice(0, 10) } : {}),
                  url: `${profile.siteUrl}/pricing#plan-${p.slug}`,
                  seller: { "@id": `${profile.siteUrl}/#business` },
                };
              }),
            ),
          },
        ]}
      />
      <div className="mx-auto max-w-6xl">
        <Link prefetch={false} href="/" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <header className="mx-auto mt-8 max-w-3xl text-center sm:mx-0 sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lilac">Pricing</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            From a simple website to a secure web + app suite.
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted">
            Custom websites, online stores, apps and secure, custom-designed web + mobile app suites for businesses in India and
            worldwide. Every plan shows what you pay to build it, how long support is free, and what care costs after that.
          </p>
        </header>

        <div className="mt-12">
          <Pricing />
        </div>

        <section className="mt-20">
          <SectionHeading eyebrow="FAQ" title="Pricing questions." clip="bulb" />
          <div className="mt-10">
            <Faq items={pricingFaqs} />
          </div>
        </section>

        <QuoteCta title="Not sure which plan fits?" body="Tell me what you need and I'll suggest the right plan, with a fixed quote within 24 hours." />
      </div>
    </div>
  );
}
