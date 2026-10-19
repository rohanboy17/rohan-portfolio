import type { Metadata } from "next";
import { profile } from "@/content/profile";

/**
 * Open Graph + Twitter metadata for a page.
 *
 * Next.js merges metadata shallowly, so a page that sets `openGraph` replaces the
 * root layout's entire object. This helper restores the site-wide fields
 * (site name, locale, type, default image) every time a page sets its own.
 */
export function shareMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  /** Site-relative image path; defaults to the generated /opengraph-image card. */
  image?: string;
  imageAlt?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const images = image
    ? [{ url: image, width: 1280, height: 800, alt: imageAlt ?? title }]
    : [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name} — Freelance ${profile.heroTitle}` }];
  return {
    openGraph: { title, description, url: path, siteName: profile.name, type: "website", locale: "en_US", images },
    twitter: { card: "summary_large_image", title, description, creator: "@rohan_boy_17", images: images.map((i) => i.url) },
  };
}

/** Shortens text for a meta description (Google shows ~155 chars), cutting at a word boundary. */
export function metaDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—-]+$/, "")}…`;
}
