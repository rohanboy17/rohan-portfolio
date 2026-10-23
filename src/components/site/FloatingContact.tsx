import { Phone } from "lucide-react";
import { profile } from "@/content/profile";
import BrandIcon from "@/components/ui/BrandIcon";

const pill =
  "group flex items-center gap-2 rounded-full p-3.5 transition hover:-translate-y-0.5";
/** Label slides out on hover for mouse users. */
const label =
  "hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width] duration-300 group-hover:max-w-56 group-focus-visible:max-w-56 md:inline";

/**
 * Floating "call" and "chat on WhatsApp" buttons, stacked bottom-right (call above WhatsApp).
 * Plain links, no JavaScript; the stack sits above the iOS home indicator.
 */
export default function FloatingContact() {
  if (!profile.whatsapp && !profile.phoneHref) return null;

  return (
    <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {profile.phoneHref ? (
        <a
          href={profile.phoneHref}
          aria-label={`Call ${profile.firstName}: ${profile.phone}`}
          className={`${pill} bg-lilac text-ink shadow-[0_14px_34px_-10px_rgb(196_181_253/0.55),inset_0_-4px_0_rgb(0_0_0/0.15),inset_0_2px_0_rgb(255_255_255/0.45)]`}
        >
          <Phone size={22} strokeWidth={2.4} className="m-0.5" aria-hidden />
          <span className={label}>Call {profile.phone}</span>
        </a>
      ) : null}
      {profile.whatsapp ? (
        <a
          href={profile.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label={`Chat with ${profile.firstName} on WhatsApp`}
          className={`${pill} relative bg-[#25D366] text-white shadow-[0_14px_34px_-10px_rgb(37_211_102/0.7),inset_0_-4px_0_rgb(0_0_0/0.15),inset_0_2px_0_rgb(255_255_255/0.45)]`}
        >
          <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.4s] motion-reduce:hidden" />
          <BrandIcon slug="whatsapp" size={26} />
          <span className={label}>Chat on WhatsApp</span>
        </a>
      ) : null}
    </div>
  );
}
