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
    <section id="about" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About me" title="Developer who ships, end to end." clip="brain" />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="clay relative overflow-hidden rounded-[32px] p-8">
              <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-pink/20 blur-3xl" />
              <div aria-hidden className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-lilac/25 blur-3xl" />
              <div className="relative mx-auto grid aspect-square max-w-[260px] place-items-center rounded-[28px] bg-gradient-to-br from-lilac/30 via-pink/15 to-peach/25">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name}`}
                  width={220}
                  height={220}
                  className="animate-float drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]"
                />
                <Clip3D name="coffee" size={64} float delay={1} className="absolute -left-3 bottom-6" />
                <Clip3D name="sparkles" size={52} float delay={0.4} className="absolute -right-2 top-4" />
              </div>
              <div className="relative mt-6 text-center">
                <p className="font-display text-2xl font-semibold">{profile.name}</p>
                <p className="text-muted">
                  {profile.role} · {profile.location}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="clay rounded-[32px] p-8 text-lg leading-relaxed text-white/85">
                {profile.about.map((p) => (
                  <p key={p} className="mt-4 first:mt-0">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={0.15 + i * 0.08}>
                  <div className="clay h-full rounded-[28px] p-5">
                    <Clip3D name={v.clip} size={44} />
                    <p className="mt-3 font-display font-semibold">{v.title}</p>
                    <p className="mt-1 text-sm text-muted">{v.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
