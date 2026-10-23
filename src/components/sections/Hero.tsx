import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import ClayStage from "@/components/3d/ClayStage";
import Clip3D from "@/components/ui/Clip3D";
import SocialRow from "@/components/ui/SocialRow";
import BrandIcon from "@/components/ui/BrandIcon";
import { HERO_STACK } from "@/lib/icons";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden px-4 pb-10 pt-24 sm:px-6 sm:pt-32 lg:min-h-[min(100svh,960px)] lg:pb-16"
    >
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {profile.openToWork ? (
            <p className="clay inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/90">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
              </span>
              {profile.availability}
            </p>
          ) : null}

          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="flex items-center justify-center gap-3 lg:justify-start">
              Hi, I&apos;m {profile.firstName}
              <Clip3D name="wave" size={72} eager float tilt={-12} className="h-11 w-11 sm:h-16 sm:w-16" />
            </span>
            <span className="text-gradient mt-1 block">{profile.heroTitle}</span>
          </h1>

          <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-white/85 sm:text-xl">{profile.headline}</p>
          <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-8 grid w-full max-w-sm grid-cols-2 gap-3 sm:flex sm:w-auto sm:max-w-none">
            <Link
              href="/#projects"
              className="btn-clay inline-flex items-center justify-center gap-2 rounded-full bg-lilac px-5 py-3.5 font-semibold text-ink sm:px-6"
            >
              View work <ArrowRight size={18} />
            </Link>
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                download
                className="clay inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-semibold transition hover:bg-white/10 sm:px-6"
              >
                <Download size={18} /> Resume
              </a>
            ) : (
              <Link
                href="/#contact"
                className="clay inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-semibold transition hover:bg-white/10 sm:px-6"
              >
                Let&apos;s talk
              </Link>
            )}
          </div>

          <div className="mt-7 flex flex-col items-center gap-4 text-sm text-muted sm:flex-row lg:items-center">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} /> {profile.location} · IST
            </span>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <SocialRow primaryOnly withEmail />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[560px]">
          <ClayStage />
          <div role="list" aria-label="Main tech stack" className="clay absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-ink/60 px-4 py-2.5 backdrop-blur-md sm:gap-3 sm:px-5 sm:py-3">
            {HERO_STACK.map(([slug, label]) => (
              <span role="listitem" key={slug}>
                <BrandIcon slug={slug} label={label} size={16} className="text-white/80" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
