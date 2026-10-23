import { profile, type TimelineItem } from "@/content/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Clip3D from "@/components/ui/Clip3D";
import { Reveal } from "@/components/site/MotionPrimitives";
import Credentials from "./Credentials";
import Tabs from "@/components/site/Tabs";

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

/** Experience, education and certifications as tabs: one panel at a time instead of three stacked lists. */
export default function Experience() {
  const { experience, education, achievements } = profile;
  const tabs = [
    { label: "Experience", panel: <Timeline items={experience} /> },
    ...(education.length ? [{ label: "Education", panel: <Timeline items={education} /> }] : []),
    ...(achievements.length ? [{ label: "Certifications", panel: <Credentials inTab /> }] : []),
  ];

  return (
    <section id="experience" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Journey" title="Experience & education." clip="briefcase" />
        <Tabs labels={tabs.map((t) => t.label)} className="mx-auto mt-10 max-w-4xl sm:mt-12">
          {tabs.map((t) => (
            <div key={t.label}>{t.panel}</div>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
