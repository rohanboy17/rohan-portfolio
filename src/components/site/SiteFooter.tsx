import Link from "next/link";
import { profile } from "@/content/profile";
import SocialIcon from "@/components/ui/SocialIcon";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">
            {profile.name}
            <span className="text-lilac">.</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {profile.role} · {profile.location} · Built with Next.js + Three.js
          </p>
        </div>
        <div className="flex items-center gap-2">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/5 text-muted transition hover:text-white"
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-muted/70">
        © {new Date().getFullYear()} {profile.name}. 3D clip-art by{" "}
        <Link href="https://github.com/microsoft/fluentui-emoji" className="underline underline-offset-2">
          Microsoft Fluent Emoji
        </Link>{" "}
        (MIT) · Brand icons by{" "}
        <Link href="https://simpleicons.org" className="underline underline-offset-2">
          Simple Icons
        </Link>{" "}
        (CC0).
      </p>
    </footer>
  );
}
