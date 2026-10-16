import Image from "next/image";
import clsx from "clsx";
import type { Clip } from "@/content/profile";

type Clip3DProps = {
  name: Clip;
  size?: number;
  float?: boolean;
  /** Animation delay in seconds, so neighbouring clips don't bob in sync. */
  delay?: number;
  /** Resting tilt in degrees. */
  tilt?: number;
  priority?: boolean;
  className?: string;
  alt?: string;
};

/** Glossy 3D clip-art (Microsoft Fluent 3D Emoji, MIT). Decorative unless `alt` is given. */
export default function Clip3D({
  name,
  size = 64,
  float = false,
  delay = 0,
  tilt = 0,
  priority = false,
  className,
  alt = "",
}: Clip3DProps) {
  return (
    <Image
      src={`/3d/${name}.png`}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={size}
      height={size}
      priority={priority}
      // Above-the-fold clips skip the optimizer round-trip: the static PNG is tiny and cached immutably.
      unoptimized={priority}
      draggable={false}
      className={clsx(
        "select-none drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]",
        float && "animate-float",
        className,
      )}
      style={{ animationDelay: `${delay}s`, ["--r" as string]: `${tilt}deg` }}
    />
  );
}
