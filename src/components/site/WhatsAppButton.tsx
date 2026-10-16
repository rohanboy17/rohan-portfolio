import { profile } from "@/content/profile";
import BrandIcon from "@/components/ui/BrandIcon";

/** Floating "chat on WhatsApp" button. Plain link, no JavaScript; sits above the iOS home indicator. */
export default function WhatsAppButton() {
  if (!profile.whatsapp) return null;

  return (
    <a
      href={profile.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with ${profile.firstName} on WhatsApp`}
      className="group fixed right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_14px_34px_-10px_rgb(37_211_102/0.7),inset_0_-4px_0_rgb(0_0_0/0.15),inset_0_2px_0_rgb(255_255_255/0.45)] transition hover:-translate-y-0.5 sm:right-6 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6"
    >
      <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.4s] motion-reduce:hidden" />
      <BrandIcon slug="whatsapp" size={26} />
      {/* Label slides out on hover for mouse users */}
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width] duration-300 group-hover:max-w-40 group-focus-visible:max-w-40 md:inline">
        Chat on WhatsApp
      </span>
    </a>
  );
}
