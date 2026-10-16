import clsx from "clsx";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { profile } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";
import { Item, Reveal, Stagger } from "@/components/site/MotionPrimitives";

/**
 * Achievements & certifications as premium "credential cards":
 * gradient border in the item's accent, floating 3D badge with glow, status seal and a hover shine.
 * Centered on phones, left-aligned from `sm` up.
 */
export default function Credentials() {
  const { achievements } = profile;
  if (!achievements.length) return null;

  return (
    <div className="mt-16 sm:mt-20">
      <Reveal>
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lilac">Credentials</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Achievements &amp; certifications
            </h3>
          </div>
          <p className="max-w-sm text-pretty text-sm text-muted sm:text-right">
            Verified milestones beyond the code — exams and programmes I&apos;ve completed.
          </p>
        </div>
      </Reveal>

      <Stagger className="mt-8 grid gap-5 md:grid-cols-2">
        {achievements.map((c) => {
          const a = accentStyles[c.accent];
          const Tag = c.href ? "a" : "div";
          return (
            <Item key={c.title} className="h-full">
              {/* 1px gradient border in the credential's accent colour */}
              <Tag
                {...(c.href ? { href: c.href, target: "_blank", rel: "noreferrer" } : {})}
                className="group relative block h-full overflow-hidden rounded-[30px] p-px transition duration-500 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${a.hex}aa, rgba(255,255,255,0.08) 42%, rgba(255,255,255,0.04) 60%, ${a.hex}55)`,
                }}
              >
                <div className="relative flex h-full flex-col items-center overflow-hidden rounded-[29px] bg-[#11111b] p-6 text-center sm:items-start sm:p-8 sm:text-left">
                  {/* Accent glow + faint grid texture */}
                  <div aria-hidden className={clsx("absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-25 blur-3xl transition duration-700 group-hover:opacity-45", a.bg)} />
                  <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 opacity-60" />
                  {/* Shine sweep on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[120%] group-hover:opacity-100"
                  />

                  {/* Top row: kind + badge */}
                  <div className="relative flex w-full items-center justify-between gap-3">
                    <span className={clsx("rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]", a.border, a.soft, a.text)}>
                      {c.kind}
                    </span>
                    <span className="font-display text-sm font-semibold tracking-wide text-white/40">{c.badge}</span>
                  </div>

                  {/* Medal */}
                  <div className="relative mt-6 grid h-28 w-28 place-items-center sm:h-32 sm:w-32">
                    <div aria-hidden className={clsx("absolute inset-3 rounded-full opacity-40 blur-2xl", a.bg)} />
                    <div aria-hidden className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03]" />
                    <div aria-hidden className={clsx("absolute inset-3 rounded-full border", a.border)} />
                    <Clip3D name={c.clip} size={96} float className="relative h-20 w-20 sm:h-24 sm:w-24" />
                  </div>

                  {/* Title + status */}
                  <div className="relative mt-6 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:gap-x-3">
                    <h4 className="font-display text-3xl font-semibold tracking-tight">{c.title}</h4>
                    <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-2.5 py-1 text-xs font-semibold text-mint">
                      <BadgeCheck size={14} aria-hidden /> {c.status}
                    </span>
                  </div>
                  <p className="relative mt-2 font-medium text-white/85">{c.issuer}</p>
                  <p className={clsx("relative mt-0.5 text-sm", a.text)}>{c.field}</p>

                  <p className="relative mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted">{c.description}</p>

                  {c.href ? (
                    <span className={clsx("relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold", a.text)}>
                      View credential <ExternalLink size={14} />
                    </span>
                  ) : null}
                </div>
              </Tag>
            </Item>
          );
        })}
      </Stagger>
    </div>
  );
}
