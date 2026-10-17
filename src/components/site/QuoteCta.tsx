import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import SocialIcon from "@/components/ui/SocialIcon";

/** Closing call to action on client-facing pages: free quote + WhatsApp. */
export default function QuoteCta({
  title = "Tell me about your project",
  body = "Share a few details and within 24 hours I'll send ideas, a timeline and a free, fixed quote.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <div className="clay relative mt-16 overflow-hidden rounded-[32px] p-8 text-center sm:p-12">
      <div aria-hidden className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-lilac/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-peach/20 blur-3xl" />
      <h2 className="relative text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="relative mx-auto mt-3 max-w-lg text-pretty text-muted sm:text-lg">{body}</p>
      <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/#contact"
          className="btn-clay inline-flex items-center gap-2 rounded-full bg-lilac px-6 py-3.5 font-semibold text-ink"
        >
          Get a free quote <ArrowRight size={18} />
        </Link>
        <a
          href={profile.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/15 px-6 py-3.5 font-semibold text-[#5be38f] transition hover:bg-[#25D366]/25"
        >
          <SocialIcon icon="whatsapp" size={18} /> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
