import type { Clip } from "@/content/profile";
import { Reveal } from "@/components/site/MotionPrimitives";
import Clip3D from "./Clip3D";

/** Centred on phones (clip-art above the title), left-aligned with the clip-art on the right from `sm` up. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  clip,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  clip?: Clip;
}) {
  return (
    <Reveal>
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:text-left">
        {clip ? <Clip3D name={clip} size={88} float tilt={-8} className="h-16 w-16 sm:order-2 sm:h-22 sm:w-22" /> : null}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lilac">{eyebrow}</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:mx-0 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
