import clsx from "clsx";
import { profile } from "@/content/profile";
import SocialIcon from "./SocialIcon";

/** Round icon links to Rohan's accounts. `primaryOnly` keeps the row short (hero). */
export default function SocialRow({
  primaryOnly = false,
  withEmail = false,
  size = 16,
  className,
}: {
  primaryOnly?: boolean;
  withEmail?: boolean;
  size?: number;
  className?: string;
}) {
  const links = [
    ...profile.socials.filter((s) => !primaryOnly || s.primary),
    ...(withEmail ? [{ label: "Email", href: `mailto:${profile.email}`, icon: "mail" }] : []),
  ];

  return (
    <ul className={clsx("flex flex-wrap items-center gap-2", className)}>
      {links.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/5 text-white/80 transition hover:-translate-y-0.5 hover:border-lilac/40 hover:text-white"
          >
            <SocialIcon icon={s.icon} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
