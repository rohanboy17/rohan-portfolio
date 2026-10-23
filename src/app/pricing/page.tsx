import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/content/profile";
import { plans, changesPlan, pricingFaqs } from "@/content/pricing";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/site/Faq";
import QuoteCta from "@/components/site/QuoteCta";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd, { breadcrumbs, faqPage } from "@/components/site/JsonLd";
import { shareMetadata } from "@/lib/seo";

const title = "Website Design Prices in Kolkata & India from ₹4,999";
const description =
  "Website from ₹4,999, online store ₹19,999, app from ₹34,999. Custom-built in days, with a free homepage demo before you pay. No hidden charges.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/pricing" },
  ...shareMetadata({ title, description, path: "/pricing" }),
};

export default function PricingPage() {
  const num = (s: string) => s.replace(/[^\d.]/g, "");
  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <JsonLd
        data={[
          breadcrumbs([["Pricing", "/pricing"]]),
          faqPage(pricingFaqs),
          {
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Website, online store and app development packages",
            itemListElement: plans.map((p) => ({
              "@type": "Offer",
              name: p.name,
              description: p.forWho,
              price: num(p.inr),
              priceCurrency: "INR",
              url: `${profile.siteUrl}/pricing`,
              seller: { "@id": `${profile.siteUrl}/#business` },
            })).concat({
              "@type": "Offer",
              name: changesPlan.name,
              description: changesPlan.forWho,
              price: num(changesPlan.inr),
              priceCurrency: "INR",
              url: `${profile.siteUrl}/pricing`,
              seller: { "@id": `${profile.siteUrl}/#business` },
            }),
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
            Websites from ₹4,999. Live in days.
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted">
            Custom-designed websites, online stores and apps for businesses in Kolkata, across India and worldwide. See a free
            homepage demo before you pay anything.
          </p>
        </header>

        <div className="mt-12">
          <Pricing full asPage />
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
