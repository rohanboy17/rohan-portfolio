import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile, services } from "@/content/profile";
import JsonLd from "@/components/site/JsonLd";
import { siteNav } from "@/lib/nav";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import RevealObserver from "@/components/site/RevealObserver";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Analytics from "@/components/site/Analytics";
import DevVitals from "@/components/site/DevVitals";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });

const title = profile.seo.title;
const description = profile.seo.description;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  keywords: [profile.name, ...profile.seo.keywords],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: profile.siteUrl, siteName: profile.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description, creator: "@rohan_boy_17" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  verification: profile.seo.googleSiteVerification ? { google: profile.seo.googleSiteVerification } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0b0b12",
};

const sameAs = profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href);

const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${profile.siteUrl}/#person`,
    name: profile.name,
    jobTitle: profile.role,
    description: profile.seo.description,
    url: profile.siteUrl,
    email: `mailto:${profile.email}`,
    telephone: profile.phoneHref.replace("tel:", ""),
    image: profile.photo ? `${profile.siteUrl}${profile.photo}` : undefined,
    address: { "@type": "PostalAddress", addressRegion: "West Bengal", addressCountry: "IN" },
    alumniOf: profile.education.map((e) => ({ "@type": "EducationalOrganization", name: e.org })),
    knowsLanguage: profile.spokenLanguages,
    sameAs,
    knowsAbout: profile.skills.flatMap((g) => g.items.map((i) => i.name)),
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${profile.siteUrl}/#business`,
    name: `${profile.name} — Web & Mobile App Development`,
    description: profile.seo.description,
    url: profile.siteUrl,
    logo: `${profile.siteUrl}/icon-512.png`,
    image: `${profile.siteUrl}/opengraph-image`,
    email: profile.email,
    telephone: profile.phoneHref.replace("tel:", ""),
    founder: { "@id": `${profile.siteUrl}/#person` },
    address: { "@type": "PostalAddress", addressRegion: "West Bengal", addressCountry: "IN" },
    areaServed: "Worldwide",
    availableLanguage: profile.spokenLanguages,
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: `${profile.siteUrl}/services/${s.slug}` },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${profile.siteUrl}/#website`,
    name: profile.name,
    url: profile.siteUrl,
    publisher: { "@id": `${profile.siteUrl}/#person` },
    inLanguage: "en",
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline script below adds the "js" class before React hydrates.
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide not-yet-revealed sections only when JS is running (no-JS visitors see everything). */}
        {/* "lite" = phones, touch screens, low-end devices, Data Saver or reduced motion: CSS and
            components drop the costly effects (blur, grain, floating art, autoplay video). Set before
            first paint so nothing flashes. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement,n=navigator;d.classList.add('js');try{if(matchMedia('(hover: none), (pointer: coarse), (max-width: 767px), (prefers-reduced-motion: reduce)').matches||(n.deviceMemory&&n.deviceMemory<=4)||(n.hardwareConcurrency&&n.hardwareConcurrency<=4)||(n.connection&&n.connection.saveData))d.classList.add('lite')}catch(e){}})()",
          }}
        />
      </head>
      <body className="relative min-h-screen overflow-x-clip">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-lilac focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <div aria-hidden className="aurora pointer-events-none fixed inset-0 z-0" />
        <div aria-hidden className="grain pointer-events-none fixed inset-0 z-0" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader name={profile.name} firstName={profile.firstName} resumeUrl={profile.resumeUrl || undefined} nav={siteNav()} />
          <main id="content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <WhatsAppButton />
        <CustomCursor />
        <SmoothScroll />
        <RevealObserver />
        <Analytics />
        <DevVitals />
        <JsonLd data={siteJsonLd} />
      </body>
    </html>
  );
}
