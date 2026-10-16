import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Analytics from "@/components/site/Analytics";
import DevVitals from "@/components/site/DevVitals";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });

const title = `${profile.name} — ${profile.role}`;
const description = `${profile.headline} ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  keywords: [
    profile.name,
    "Full-Stack Developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "Portfolio",
    "India",
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  alternates: { canonical: "/" },
  openGraph: { title, description, url: profile.siteUrl, siteName: profile.name, type: "profile" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0b0b12",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  image: profile.photo ? `${profile.siteUrl}${profile.photo}` : undefined,
  address: { "@type": "PostalAddress", addressRegion: "West Bengal", addressCountry: "IN" },
  alumniOf: profile.education.map((e) => ({ "@type": "EducationalOrganization", name: e.org })),
  knowsLanguage: profile.spokenLanguages,
  sameAs: profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  knowsAbout: profile.skills.flatMap((g) => g.items.map((i) => i.name)),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="relative min-h-screen overflow-x-hidden">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-lilac focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <div aria-hidden className="aurora pointer-events-none fixed inset-0 z-0" />
          <div aria-hidden className="grain pointer-events-none fixed inset-0 z-0" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main id="content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <CustomCursor />
          <Analytics />
          <DevVitals />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
