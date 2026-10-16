import { profile, type TimelineItem } from "@/content/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Clip3D from "@/components/ui/Clip3D";
import { Reveal } from "@/components/site/MotionPrimitives";

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-6 before:absolute before:bottom-4 before:left-7 before:top-4 before:w-px before:bg-gradient-to-b before:from-lilac/60 before:via-pink/30 before:to-transparent">
      {items.map((item, i) => (
        <li key={`${item.title}-${item.org}`} className="relative pl-20">
          <Reveal delay={i * 0.06}>
            <span className="clay absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-2xl bg-surface">
              <Clip3D name={item.clip} size={36} />
            </span>
            <div className="clay rounded-[28px] p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-lilac">{item.period}</p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {item.org}
                {item.location ? ` · ${item.location}` : ""}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/85">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lilac" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export default function Experience() {
  const { experience, education, achievements } = profile;

  return (
    <section id="experience" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Journey" title="Experience & education." clip="briefcase" />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-muted">Experience</h3>
            <Timeline items={experience} />
          </div>
          <div className="space-y-10">
            {education.length ? (
              <div>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-muted">Education</h3>
                <Timeline items={education} />
              </div>
            ) : null}
            {achievements.length ? (
              <div>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                  Achievements & certifications
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {achievements.map((a) => (
                    <li key={a.title}>
                      <Reveal>
                        <a
                          href={a.href}
                          target={a.href ? "_blank" : undefined}
                          rel="noreferrer"
                          className="clay flex h-full items-center gap-4 rounded-[24px] p-4"
                        >
                          <Clip3D name={a.clip} size={44} />
                          <span>
                            <span className="block font-semibold">{a.title}</span>
                            <span className="block text-sm text-muted">{a.detail}</span>
                          </span>
                        </a>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {!education.length && !achievements.length ? (
              <Reveal>
                <div className="clay flex items-center gap-5 rounded-[28px] p-6">
                  <Clip3D name="grad" size={72} float />
                  <div>
                    <p className="font-display text-xl font-semibold">Always learning</p>
                    <p className="mt-1 text-sm text-muted">
                      Every project teaches something new — from payment webhooks and database design to
                      WebGL and Core Web Vitals.
                    </p>
                  </div>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
