import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import ClayStage from "@/components/3d/ClayStage";
import Clip3D from "@/components/ui/Clip3D";
import SocialIcon from "@/components/ui/SocialIcon";
import BrandIcon from "@/components/ui/BrandIcon";

const HERO_STACK = ["nextdotjs", "react", "typescript", "nodedotjs", "postgresql", "prisma", "tailwindcss", "vercel"];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:min-h-[min(100svh,960px)] lg:pb-16"
    >
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          {profile.openToWork ? (
            <p className="clay inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/90">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
              </span>
              Open to full-time roles
            </p>
          ) : null}

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="flex items-center gap-3">
              Hi, I&apos;m {profile.firstName}
              <Clip3D name="wave" size={72} priority float tilt={-12} className="h-12 w-12 sm:h-16 sm:w-16" />
            </span>
            <span className="text-gradient mt-1 block">{profile.role}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{profile.headline}</p>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="btn-clay inline-flex items-center gap-2 rounded-full bg-lilac px-6 py-3.5 font-semibold text-ink"
            >
              View my work <ArrowRight size={18} />
            </Link>
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                download
                className="clay inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold transition hover:bg-white/10"
              >
                <Download size={18} /> Download resume
              </a>
            ) : (
              <Link
                href="/#contact"
                className="clay inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold transition hover:bg-white/10"
              >
                Let&apos;s talk
              </Link>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} /> {profile.location} · {profile.timezone}
            </span>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <div className="flex items-center gap-2">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/5 transition hover:text-white"
                >
                  <SocialIcon icon={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <ClayStage />
          <div className="clay absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink/60 px-5 py-3 backdrop-blur-md">
            {HERO_STACK.map((slug) => (
              <BrandIcon key={slug} slug={slug} size={18} className="text-white/80" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
