import Link from "next/link";
import { ArrowUp, ArrowUpRight, Download, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import SocialIcon from "@/components/ui/SocialIcon";
import Clip3D from "@/components/ui/Clip3D";
import Logo from "@/components/ui/Logo";

const NAV = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 overflow-hidden border-t border-line">
      {/* Soft glow rising from the bottom edge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(60%_80%_at_50%_100%,rgb(196_181_253/0.18),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
        <div className="grid gap-12 text-center sm:text-left lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="flex items-center gap-3 font-display text-xl font-semibold">
              <Logo size={44} id="logo-footer" />
              {profile.name}
            </Link>
            <p className="mt-4 max-w-sm text-pretty text-muted">
              {profile.role} crafting fast, polished web products — from idea to production.
            </p>
            {profile.openToWork ? (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-3.5 py-1.5 text-sm text-mint">
                <span className="h-2 w-2 rounded-full bg-mint" /> Available for full-time roles
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Link href="/#contact" className="btn-clay inline-flex items-center gap-1.5 rounded-full bg-lilac px-5 py-2.5 text-sm font-semibold text-ink">
                Hire me <ArrowUpRight size={15} />
              </Link>
              {profile.resumeUrl ? (
                <a href={profile.resumeUrl} download className="clay inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold">
                  <Download size={15} /> Resume
                </a>
              ) : null}
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 transition hover:text-lilac">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Connect</p>
            <ul className="mx-auto mt-5 w-fit space-y-3 text-left sm:mx-0">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-white/80 transition hover:text-white"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/5 transition group-hover:border-lilac/40">
                      <SocialIcon icon={s.icon} size={15} />
                    </span>
                    {s.label === "Email" ? profile.email : s.label}
                  </a>
                </li>
              ))}
              <li className="inline-flex items-center gap-3 text-muted">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/5">
                  <MapPin size={15} />
                </span>
                {profile.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div aria-hidden className="relative mt-16 select-none sm:mt-20">
          <p className="text-center font-display text-[17vw] font-bold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.14)] lg:text-[12.5rem]">
            {profile.firstName.toUpperCase()}
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
          <Clip3D name="rocket" size={96} float tilt={12} className="absolute right-[6%] top-0 h-14 w-14 sm:h-24 sm:w-24" />
          <Clip3D name="sparkles" size={72} float delay={1} className="absolute left-[8%] top-1/4 h-10 w-10 sm:h-16 sm:w-16" />
        </div>

        <div className="relative flex flex-col items-center gap-4 border-t border-line py-6 text-center text-xs text-muted sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {year} {profile.name}. Built with Next.js & Three.js.
            <span className="block sm:inline">
              {" "}
              3D art:{" "}
              <a href="https://github.com/microsoft/fluentui-emoji" className="underline underline-offset-2 hover:text-white">
                Fluent Emoji
              </a>{" "}
              · Icons:{" "}
              <a href="https://simpleicons.org" className="underline underline-offset-2 hover:text-white">
                Simple Icons
              </a>
            </span>
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-white/80 transition hover:text-white"
          >
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
