import { profile, type TimelineItem } from "@/content/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Clip3D from "@/components/ui/Clip3D";
import { Reveal } from "@/components/site/MotionPrimitives";

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-6 before:absolute before:bottom-4 before:left-6 before:top-4 sm:before:left-7 before:w-px before:bg-gradient-to-b before:from-lilac/60 before:via-pink/30 before:to-transparent">
      {items.map((item, i) => (
        <li key={`${item.title}-${item.org}`} className="relative pl-16 sm:pl-20">
          <Reveal delay={i * 0.06}>
            <span className="clay absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-2xl bg-surface sm:h-14 sm:w-14">
              <Clip3D name={item.clip} size={36} className="h-7 w-7 sm:h-9 sm:w-9" />
            </span>
            <div className="clay rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-2">
                <h3 className="font-display text-lg font-semibold sm:text-xl">{item.title}</h3>
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
    <section id="experience" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Journey" title="Experience & education." clip="briefcase" />

        <div className="mt-10 grid gap-10 sm:mt-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-muted sm:mb-6 sm:text-left">Experience</h3>
            <Timeline items={experience} />
          </div>
          <div className="space-y-10">
            {education.length ? (
              <div>
                <h3 className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-muted sm:mb-6 sm:text-left">Education</h3>
                <Timeline items={education} />
              </div>
            ) : null}
            {achievements.length ? (
              <div>
                <h3 className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-muted sm:mb-6 sm:text-left">
                  Achievements & certifications
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {achievements.map((a) => {
                    const body = (
                      <>
                        <Clip3D name={a.clip} size={44} />
                        <span>
                          <span className="block font-semibold">{a.title}</span>
                          <span className="block text-sm text-muted">{a.detail}</span>
                        </span>
                      </>
                    );
                    const card = "clay flex h-full items-center gap-4 rounded-[24px] p-4";
                    return (
                      <li key={a.title}>
                        <Reveal className="h-full">
                          {a.href ? (
                            <a href={a.href} target="_blank" rel="noreferrer" className={card}>
                              {body}
                            </a>
                          ) : (
                            <div className={card}>{body}</div>
                          )}
                        </Reveal>
                      </li>
                    );
                  })}
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
