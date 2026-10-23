import { lookupIcon, SPRITE_SLUGS, spriteHref } from "@/lib/icons";

/**
 * Brand logo from simple-icons (CC0). Server component only. Icons in the /icons.svg sprite
 * render as a tiny <use> reference (the browser caches the sprite once); anything else falls
 * back to an inline path, so an icon can never go missing.
 */
export default function BrandIcon({
  slug,
  size = 18,
  colored = false,
  label,
  className,
}: {
  slug: string;
  size?: number;
  colored?: boolean;
  /** Accessible name. Omit when the icon sits next to visible text (it is then hidden from screen readers). */
  label?: string;
  className?: string;
}) {
  const icon = lookupIcon(slug);
  if (!icon) return null;

  // Very dark brand colours (Next.js, Vercel…) would vanish on the dark theme.
  const dark = parseInt(icon.hex, 16) < 0x333333;
  const fill = colored && !dark ? `#${icon.hex}` : "currentColor";

  return (
    <svg
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      {SPRITE_SLUGS.includes(slug) ? <use href={spriteHref(slug)} /> : <path d={icon.path} />}
    </svg>
  );
}
