import type { MetadataRoute } from "next";
import { profile, categories, services, liveIndustries } from "@/content/profile";
import { articles } from "@/content/articles";

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
    { url: `${profile.siteUrl}/industries`, lastModified: now, priority: 0.85 },
    { url: `${profile.siteUrl}/blog`, lastModified: now, priority: 0.8 },
    ...articles.map((a) => ({
      url: `${profile.siteUrl}/blog/${a.slug}`,
      lastModified: new Date(a.updated ?? a.published),
      priority: 0.75,
    })),
    ...liveIndustries.map((i) => ({
      url: `${profile.siteUrl}/industries/${i.slug}`,
      lastModified: now,
      priority: 0.85,
    })),
    ...categories.map((c) => ({
      url: `${profile.siteUrl}/work/${c.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...profile.projects.map((p) => ({
      url: `${profile.siteUrl}/projects/${p.slug}`,
      lastModified: now,
      priority: p.featured ? 0.8 : 0.5,
      // Image sitemap: lets Google Images index each project screenshot.
      images: p.poster ? [`${profile.siteUrl}${p.poster}`] : undefined,
    })),
  ];
}
