import type { MetadataRoute } from "next";
import { profile, categories, services } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: profile.siteUrl, lastModified: now, priority: 1 },
    { url: `${profile.siteUrl}/services`, lastModified: now, priority: 0.95 },
    ...services.map((s) => ({
      url: `${profile.siteUrl}/services/${s.slug}`,
      lastModified: now,
      priority: 0.9,
    })),
    { url: `${profile.siteUrl}/work`, lastModified: now, priority: 0.8 },
    ...categories.map((c) => ({
      url: `${profile.siteUrl}/work/${c.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...profile.projects.map((p) => ({
      url: `${profile.siteUrl}/projects/${p.slug}`,
      lastModified: now,
      priority: p.featured ? 0.8 : 0.5,
    })),
  ];
}
