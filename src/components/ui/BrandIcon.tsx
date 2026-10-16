import * as icons from "simple-icons";

type SimpleIcon = { title: string; path: string; hex: string };

function lookup(slug: string): SimpleIcon | undefined {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (icons as unknown as Record<string, SimpleIcon | undefined>)[key];
}

/**
 * Brand logo from simple-icons (CC0). Server component only: the icon data
 * stays on the server and just the <svg> path reaches the browser.
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
  const icon = lookup(slug);
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
      <path d={icon.path} />
    </svg>
  );
}
