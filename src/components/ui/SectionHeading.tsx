import type { Clip } from "@/content/profile";
import { Reveal } from "@/components/site/MotionPrimitives";
import Clip3D from "./Clip3D";

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
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lilac">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          {description ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p> : null}
        </div>
        {clip ? <Clip3D name={clip} size={88} float tilt={-8} className="hidden shrink-0 sm:block" /> : null}
      </div>
    </Reveal>
  );
}
