import { createHash } from "node:crypto";
import * as simpleIcons from "simple-icons";
import { profile } from "@/content/profile";

type SimpleIcon = { title: string; path: string; hex: string };

/** Server-only lookup into simple-icons (the package never reaches the browser). */
export function lookupIcon(slug: string): SimpleIcon | undefined {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (simpleIcons as unknown as Record<string, SimpleIcon | undefined>)[key];
}

/** The hero's tech-stack strip. */
export const HERO_STACK = [
  ["nextdotjs", "Next.js"],
  ["react", "React"],
  ["typescript", "TypeScript"],
  ["nodedotjs", "Node.js"],
  ["postgresql", "PostgreSQL"],
  ["prisma", "Prisma"],
  ["tailwindcss", "Tailwind CSS"],
  ["vercel", "Vercel"],
] as const;

/** Every brand icon the site renders; these go into the /icons.svg sprite. */
export const SPRITE_SLUGS: string[] = [
  ...new Set(
    [
      ...profile.skills.flatMap((g) => g.items.map((i) => i.icon)),
      ...profile.socials.map((s) => s.icon),
      ...HERO_STACK.map(([slug]) => slug),
      "github",
      "whatsapp",
    ].filter((s): s is string => Boolean(s && lookupIcon(s))),
  ),
].sort();

/** Changes whenever the icon set changes, so the sprite can be cached for a year. */
export const SPRITE_VERSION = createHash("sha1").update(SPRITE_SLUGS.join(",")).digest("hex").slice(0, 8);
export const spriteHref = (slug: string) => `/icons.svg?v=${SPRITE_VERSION}#${slug}`;
