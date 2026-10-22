"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Sparkles } from "lucide-react";

// The form is only downloaded when someone asks for it.
const DemoRequestForm = dynamic(() => import("./DemoRequestForm"), {
  ssr: false,
  loading: () => <p className="mt-6 text-sm text-muted">Loading form…</p>,
});

export type DemoOffer = { title: string; body: string; smallPrint: string; whatsapp: string };

/**
 * "No project like yours yet? Get a free demo" card. All copy comes in as props
 * (from profile.demoOffer) so this client component never bundles profile.ts.
 */
export default function DemoRequest({
  business,
  offer,
  whatsappNumber,
  email,
  className,
}: {
  /** What the visitor is looking for, e.g. "hotel". */
  business: string;
  offer: DemoOffer;
  /** Digits only, with country code. */
  whatsappNumber: string;
  email: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const label = business.trim() || "business";
  const fill = (text: string) => text.replaceAll("{business}", label);
  const whatsapp = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fill(offer.whatsapp))}`;

  return (
    <section id="demo" aria-labelledby="demo-title" className={`clay relative scroll-mt-28 overflow-hidden rounded-[28px] p-6 sm:p-8 ${className ?? ""}`}>
      <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lilac/25 blur-3xl" />
      <div className="relative">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-lilac">
          <Sparkles size={14} /> Free demo
        </p>
        <h2 id="demo-title" className="mt-3 text-balance font-display text-2xl font-semibold sm:text-3xl">
          {fill(offer.title)}
        </h2>
        <p className="mt-3 max-w-2xl text-pretty text-muted">{offer.body}</p>
        {open ? (
          <DemoRequestForm business={label} email={email} />
        ) : (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn-clay inline-flex items-center justify-center gap-2 rounded-full bg-lilac px-6 py-3 font-semibold text-ink"
            >
              Request free demo
            </button>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/15 px-6 py-3 font-semibold text-[#5be38f] transition hover:bg-[#25D366]/25"
            >
              Ask on WhatsApp
            </a>
          </div>
        )}
        <p className="mt-4 text-xs text-muted">{offer.smallPrint}</p>
      </div>
    </section>
  );
}
