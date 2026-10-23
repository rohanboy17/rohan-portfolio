import { SPRITE_SLUGS, lookupIcon } from "@/lib/icons";

// One cached SVG sprite for every brand icon. Pages reference symbols with <use>, so icon path
// data is no longer repeated in every page's HTML and React payload.
export const dynamic = "force-static";

export function GET() {
  const symbols = SPRITE_SLUGS.map((slug) => `<symbol id="${slug}" viewBox="0 0 24 24"><path d="${lookupIcon(slug)!.path}"/></symbol>`).join("");
  return new Response(`<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`, {
    headers: {
      "Content-Type": "image/svg+xml",
      // The URL carries a content version (?v=…), so it's safe to cache for a year.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
