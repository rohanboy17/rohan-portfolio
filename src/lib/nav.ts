import { profile, services, categoryCounts, liveIndustries } from "@/content/profile";

export type NavLink = { href: string; label: string; hint?: string };
export type NavSection = { title: string; links: NavLink[]; /** Show as two columns in the header panel. */ wide?: boolean };
export type NavItem = {
  label: string;
  href: string;
  /** A dropdown (header) / column group (footer). Plain links have none. */
  sections?: NavSection[];
  /** "See all" link at the bottom of the dropdown. */
  more?: NavLink;
};

/**
 * The one site menu, shared by the header (dropdowns + mobile accordion) and the footer
 * (link columns). Built on the server from profile.ts; the client header receives it as
 * props, so profile.ts never reaches the browser bundle.
 */
export function siteNav(): NavItem[] {
  return [
    {
      label: "Services",
      href: "/services",
      sections: [
        {
          title: "What I build",
          links: services.map((s) => ({ href: `/services/${s.slug}`, label: s.title, hint: s.tagline })),
        },
      ],
      more: { href: "/services", label: "All services, process & FAQ" },
    },
    {
      label: "Work",
      href: "/work",
      sections: [
        {
          title: "Explore",
          links: [
            { href: "/work", label: "Search all work", hint: `${profile.projects.length} projects by industry or need` },
            { href: "/#projects", label: "Featured projects", hint: "The strongest work, with case studies" },
            { href: "/industries", label: "All industries", hint: `${liveIndustries.length} industries served` },
          ],
        },
        {
          title: "By type",
          links: categoryCounts.map((c) => ({ href: `/work/${c.slug}`, label: c.short, hint: `${c.count} projects` })),
        },
        {
          title: "By industry",
          wide: true,
          links: liveIndustries.map((i) => ({ href: `/industries/${i.slug}`, label: i.short })),
        },
      ],
    },
    {
      label: "About",
      href: "/#about",
      sections: [
        {
          title: "About me",
          links: [
            { href: "/#about", label: "About", hint: "Background and how I work" },
            { href: "/#skills", label: "Skills", hint: "Tech stack and tools" },
            { href: "/#experience", label: "Experience", hint: "Work history and education" },
            { href: "/#github", label: "GitHub activity", hint: "Live coding activity" },
            ...(profile.resumeUrl ? [{ href: profile.resumeUrl, label: "Resume (PDF)", hint: "Download my CV" }] : []),
          ],
        },
      ],
    },
    { label: "Contact", href: "/#contact" },
  ];
}
