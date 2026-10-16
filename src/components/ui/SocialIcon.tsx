import { Mail, Phone } from "lucide-react";
import BrandIcon from "./BrandIcon";

/** Brand icons come from simple-icons; LinkedIn is no longer in simple-icons, so it is drawn here. */
export default function SocialIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  if (icon === "mail") return <Mail size={size} aria-hidden />;
  if (icon === "phone") return <Phone size={size} aria-hidden />;
  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.6h.06c.53-.95 1.84-1.95 3.78-1.95 4.04 0 4.79 2.5 4.79 5.76v5.59h-4v-4.96c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.96 1.28-1.96 2.61v5.05h-4v-11Z" />
      </svg>
    );
  }
  return <BrandIcon slug={icon} size={size} />;
}
