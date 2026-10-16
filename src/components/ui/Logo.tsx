/**
 * Brand mark: a geometric "R" monogram on a glossy clay tile in the lilac → pink → peach gradient.
 * Drawn as paths (no font dependency), so it stays crisp at every size.
 * The same artwork lives in /public/logo.svg and src/app/icon.svg; keep them in sync.
 */
export default function Logo({ size = 32, id = "logo", className }: { size?: number; id?: string; className?: string }) {
  return (
    <svg viewBox="0 0 512 512" width={size} height={size} className={className} aria-hidden>
      <LogoArt id={id} />
    </svg>
  );
}

export function LogoArt({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="0.55" stopColor="#f9a8d4" />
          <stop offset="1" stopColor="#fdba8c" />
        </linearGradient>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="#3b1d4a" stopOpacity="0" />
          <stop offset="1" stopColor="#3b1d4a" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="128" fill={`url(#${id}-bg)`} />
      <rect width="512" height="512" rx="128" fill={`url(#${id}-shade)`} />
      <rect x="20" y="16" width="472" height="250" rx="112" fill={`url(#${id}-gloss)`} />
      <g transform="translate(-14 0)" fill="none" stroke="#120d1f" strokeWidth="66" strokeLinecap="round" strokeLinejoin="round">
        <path d="M178 384V130h104a79 79 0 0 1 0 158H178" />
        <path d="M268 288l90 96" />
      </g>
      <circle cx="408" cy="384" r="26" fill="#120d1f" />
    </>
  );
}
