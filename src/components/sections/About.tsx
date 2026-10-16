import Image from "next/image";
import { profile } from "@/content/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Clip3D from "@/components/ui/Clip3D";
import { Reveal } from "@/components/site/MotionPrimitives";

const VALUES = [
  { clip: "bolt", title: "Fast by default", body: "Performance budgets, lean bundles, great Core Web Vitals." },
  { clip: "target", title: "Product-minded", body: "I build for the business goal, not just the ticket." },
  { clip: "shield", title: "Built to last", body: "Typed end-to-end, validated inputs, clean data models." },
] as const;

export default function About() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About me" title="Developer who ships, end to end." clip="brain" />

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="clay relative h-full overflow-hidden rounded-[32px] p-6 sm:p-8">
              <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-pink/20 blur-3xl" />
              <div aria-hidden className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-lilac/25 blur-3xl" />
              <div className="relative mx-auto aspect-square w-full max-w-[240px] rounded-[28px] bg-gradient-to-br from-lilac/60 via-pink/40 to-peach/50 p-1.5">
                {profile.photo ? (
                  <Image
                    src={profile.photo}
                    alt={`Photo of ${profile.name}`}
                    fill
                    sizes="240px"
                    className="rounded-[24px] object-cover object-[50%_18%] p-1.5"
                  />
                ) : (
                  <div className="grid h-full place-items-center">
                    <Clip3D name="dev" size={200} float alt={profile.name} />
                  </div>
                )}
                <Clip3D name="coffee" size={64} float delay={1} className="absolute -bottom-4 -left-5 h-14 w-14" />
                <Clip3D name="sparkles" size={52} float delay={0.4} className="absolute -right-4 -top-4 h-12 w-12" />
              </div>
              <div className="relative mt-6 text-center">
                <p className="font-display text-2xl font-semibold">{profile.name}</p>
                <p className="mt-1 text-muted">{profile.role}</p>
                <p className="text-muted">{profile.location}</p>
                <p className="mt-4 inline-flex rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-white/75">
                  Speaks {profile.spokenLanguages.join(" · ")}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
            <Reveal delay={0.08}>
              <div className="clay rounded-[32px] p-6 text-base leading-relaxed text-white/85 sm:p-8 sm:text-lg">
                {profile.about.map((p) => (
                  <p key={p} className="mt-4 text-pretty first:mt-0">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            {/* Swipe rail on phones, three columns from `sm` up */}
            <Reveal delay={0.12}>
              <div className="rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
                {VALUES.map((v) => (
                  <div key={v.title} className="w-[72%] shrink-0 sm:w-auto">
                    <div className="clay h-full rounded-[28px] p-5">
                      <Clip3D name={v.clip} size={44} />
                      <p className="mt-3 font-display font-semibold">{v.title}</p>
                      <p className="mt-1 text-sm text-muted">{v.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
