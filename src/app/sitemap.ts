import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: profile.siteUrl, lastModified: now, priority: 1 },
    ...profile.projects.map((p) => ({
      url: `${profile.siteUrl}/projects/${p.slug}`,
      lastModified: now,
      priority: p.featured ? 0.8 : 0.5,
    })),
  ];
}
