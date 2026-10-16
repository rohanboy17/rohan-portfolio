import clsx from "clsx";
import { profile } from "@/content/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Clip3D from "@/components/ui/Clip3D";
import BrandIcon from "@/components/ui/BrandIcon";
import TiltSpotlightCard from "@/components/ui/TiltSpotlightCard";
import { accentStyles } from "@/components/ui/accent";
import { Item, Stagger } from "@/components/site/MotionPrimitives";

// Bento layout on a 6-column grid: six groups make two rows of three; five make 3+3 / 2+2+2.
const SPANS =
  profile.skills.length === 5
    ? ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"]
    : [];

export default function Skills() {
  const all = profile.skills.flatMap((g) => g.items);

  return (
    <section id="skills" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Tech stack"
          title="The tools I ship with."
          description="Modern, typed and production-tested — chosen to make products fast to build and fast to use."
          clip="tools"
        />

        <Stagger>
          <div className="mt-12 grid gap-4 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-6">
            {profile.skills.map((group, i) => {
              const a = accentStyles[group.accent];
              return (
                <div
                  key={group.title}
                  className={clsx(
                    SPANS[i] ?? "lg:col-span-2",
                    // An odd last tile fills the row on the two-column layout.
                    i === profile.skills.length - 1 && i % 2 === 0 && "sm:col-span-2 lg:col-span-2",
                  )}
                >
                  <Item>
                    <TiltSpotlightCard className="h-full">
                      <div className="flex h-full flex-col p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={clsx("text-xs font-semibold uppercase tracking-[0.24em]", a.text)}>
                              {group.items.length} skills
                            </p>
                            <h3 className="mt-2 font-display text-2xl font-semibold">{group.title}</h3>
                          </div>
                          <Clip3D name={group.clip} size={64} float delay={i * 0.5} />
                        </div>
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {group.items.map((s) => (
                            <li
                              key={s.name}
                              className={clsx(
                                "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm text-white/90",
                                a.border,
                                a.soft,
                              )}
                            >
                              {s.icon ? <BrandIcon slug={s.icon} size={15} colored /> : null}
                              {s.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TiltSpotlightCard>
                  </Item>
                </div>
              );
            })}
          </div>
        </Stagger>

        <div className="marquee mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="animate-marquee flex w-max gap-3">
            {[...all, ...all].map((s, i) => (
              <span
                key={`${s.name}-${i}`}
                aria-hidden={i >= all.length ? true : undefined}
                className="clay inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted"
              >
                {s.icon ? <BrandIcon slug={s.icon} size={14} /> : null}
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
