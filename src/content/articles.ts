/**
 * Build stories: long-form case studies for /blog. Every claim here comes from the project's
 * own records (profile.ts case studies, repo READMEs and build notes), so keep it that way:
 * no invented metrics, results or client quotes.
 *
 * Body blocks: a string is a paragraph; `{ list: [...] }` is a bullet list.
 */
export type ArticleBlock = string | { list: string[] };

export type Article = {
  slug: string;
  title: string;
  /** Shorter title for search results (≤60 chars) when `title` is long. */
  metaTitle?: string;
  /** Meta description, ≤155 characters. */
  description: string;
  /** ISO dates. */
  published: string;
  updated?: string;
  /** Project slug in profile.ts this story is about. */
  project: string;
  /** Service slugs this story is proof for. */
  services: string[];
  tags: string[];
  intro: string;
  sections: { heading: string; body: ArticleBlock[] }[];
  /** Short "what this means for your project" close. */
  takeaway: string;
};

export const articles: Article[] = [
  {
    slug: "multi-vendor-marketplace-nextjs-postgresql",
    title: "How I built a multi-vendor marketplace with Next.js and PostgreSQL",
    metaTitle: "Building a Multi-Vendor Marketplace with Next.js & PostgreSQL",
    description:
      "The architecture behind Toyco India: three user roles, seller KYC, carts, coupons and orders in Next.js, Prisma and PostgreSQL, built SEO-first.",
    published: "2026-10-22",
    project: "toyco-india",
    services: ["ecommerce-development", "web-app-development"],
    tags: ["Next.js", "PostgreSQL", "Prisma", "Marketplace", "E-commerce SEO"],
    intro:
      "A toy brand wanted its own marketplace, where many sellers could list products, without handing its search traffic to the big platforms. That meant building three products at once: a storefront for shoppers, a workspace for sellers and an operations panel for admins, all sharing one catalogue. Here is how I structured it.",
    sections: [
      {
        heading: "Three users, one catalogue",
        body: [
          "The hardest part of a marketplace isn't the shop front. It's that shoppers, sellers and admins need very different tools while touching the same products and orders. I modelled that explicitly with three roles (customer, seller and admin) and kept every permission check on the server.",
          "Authentication is cookie-based email and password, using signed JWTs (jose), so pages can be rendered on the server for search engines while still knowing who is signed in.",
        ],
      },
      {
        heading: "The data model comes first",
        body: [
          "Before writing UI, I designed the PostgreSQL schema in Prisma. It covers everything a real marketplace needs:",
          {
            list: [
              "Users and roles, vendors and their KYC documents",
              "Categories, brands and products",
              "Addresses, persistent carts and coupons",
              "Orders, order items and reviews",
            ],
          },
          "Every API input is validated with Zod, so a malformed request is rejected at the edge of the system instead of corrupting data deeper in.",
        ],
      },
      {
        heading: "Seller onboarding with KYC",
        body: [
          "Sellers register, complete a profile and upload KYC documents before their products go live. Seller APIs cover the profile, KYC records, product submission and editing, and visibility into their own orders only.",
          "Uploads go through an authenticated upload API. In development, files are stored locally; in production, the same API writes to S3-compatible object storage, so storage can scale without code changes.",
        ],
      },
      {
        heading: "Admin operations that save hours",
        body: [
          "The admin panel manages categories, products, vendors and coupons. For catalogue work there's a bulk product import, because nobody wants to add hundreds of toys one form at a time.",
        ],
      },
      {
        heading: "SEO built in, not bolted on",
        body: [
          "The whole point was to own search traffic, so SEO was part of the architecture from day one:",
          {
            list: [
              "Server-rendered home, brand, category and product pages",
              "Product and breadcrumb structured data on every product page",
              "A generated sitemap, robots rules and per-page metadata",
              "A PWA manifest, and shopping signals such as delivery and cash-on-delivery messages and a pincode check",
            ],
          },
        ],
      },
      {
        heading: "Checkout and accounts",
        body: [
          "Customers get saved addresses, a cart that persists between visits, coupon-aware checkout and an order history. Because checkout creates real orders in the database, the seller and admin panels see them immediately.",
        ],
      },
    ],
    takeaway:
      "If you're planning a marketplace, start with the data model and the roles, then the screens. That's what keeps it maintainable once real sellers and orders arrive. Toyco India runs on Next.js, TypeScript, Prisma and PostgreSQL, and the same foundation fits other multi-seller catalogues.",
  },
  {
    slug: "e-signature-saas-laravel-react",
    title: "Building an e-signature SaaS with Laravel 13 and React 19",
    description:
      "How SignawayDocs handles multi-company workspaces, invitation-only access, an append-only audit trail and tamper-proof signed PDFs with Laravel and React.",
    published: "2026-10-22",
    project: "signawaydocs",
    services: ["web-app-development"],
    tags: ["Laravel", "React", "SaaS", "PDF", "Security"],
    intro:
      "Companies were preparing agreements by email and collecting signatures on loose PDFs, with no reliable record of who did what, or when. SignawayDocs replaces that with a platform where several companies prepare agreements, invite signers safely, and get a final PDF that can't be quietly changed afterwards.",
    sections: [
      {
        heading: "A signature is only worth what you can prove",
        body: [
          "The core requirement wasn't drawing a signature. It was evidence. Every action on a document is written to an append-only audit history, and the finished agreement comes with an audit certificate. If a signature is ever questioned, the record is there.",
        ],
      },
      {
        heading: "Architecture: Laravel 13, React 19 and Inertia",
        body: [
          "The application is Laravel 13 on PHP 8.4, with a React 19 and TypeScript front end rendered through Inertia. That gives a single-page app experience without maintaining a separate API layer for the UI. Tailwind CSS handles the interface and MySQL stores the data.",
          "Queues and scheduled jobs handle the slow work, such as sending invitations and generating PDFs, so the interface stays fast.",
        ],
      },
      {
        heading: "Multi-company workspaces, invitation only",
        body: [
          "There's no open sign-up. Platform admins create companies and invite their owners; owners invite their own team. Each company only ever sees its own agreements. Authentication uses Laravel Fortify with verified email, TOTP two-factor authentication and recovery codes.",
        ],
      },
      {
        heading: "Placing fields in the browser",
        body: [
          "Senders place signature, date and text fields directly on the document in the browser, using PDF.js to render the pages. Signers then follow a protected journey that only shows them what they need to complete.",
        ],
      },
      {
        heading: "A deterministic PDF pipeline",
        body: [
          "Final documents are produced by a Python worker using pypdf, ReportLab and Pillow. Given the same inputs it produces the same output, which is what you want for documents that might end up as evidence. It generates both the completed PDF and its audit certificate.",
        ],
      },
      {
        heading: "Built to be maintained",
        body: [
          "The project ships with a reproducible Docker development stack (PHP 8.4, MySQL 8.4, Node 24, a queue worker, the scheduler and Mailpit for email) and an automated test suite, so changes can be made with confidence long after launch.",
        ],
      },
    ],
    takeaway:
      "For any SaaS that handles sensitive documents, design the audit trail and access model first. SignawayDocs is live at signawaydocs.com, and the same approach (Laravel, React, queues and a separate document pipeline) suits contract, HR and compliance tools.",
  },
  {
    slug: "react-native-helpdesk-app-php-api",
    title: "Shipping a React Native helpdesk app with a PHP API to Google Play",
    metaTitle: "React Native Helpdesk App with a PHP API, on Google Play",
    description:
      "How I built OrganiseDesk: an Expo Android app and PHP ticket portal sharing one API, with roles, push notifications, ticket leases and email threading.",
    published: "2026-10-22",
    project: "organisedesk",
    services: ["mobile-app-development", "web-app-development"],
    tags: ["React Native", "Expo", "Android", "PHP", "REST API"],
    intro:
      "A support team needed to answer tickets away from their desks, without losing anything they could do in the web portal. I built OrganiseDesk as one platform with two front ends: a PHP web portal and an Expo (React Native) Android app, both talking to the same REST API, and published the app on Google Play.",
    sections: [
      {
        heading: "One API, two front ends",
        body: [
          "Rather than giving the app its own back end, I added a versioned REST API (/api/v1) beside the existing PHP portal and reused its database and mailer. Login, ticket lists, ticket details, replies, status and department changes, and device registration all go through the same endpoints, so web and mobile always agree.",
        ],
      },
      {
        heading: "Roles enforced by the server",
        body: [
          "Admins, restricted staff and customers see different things, and that's enforced by the API rather than hidden in the app:",
          {
            list: [
              "Staff only see tickets for the companies assigned to them; missing assignments fail closed",
              "Customers can create tickets and reply only to their own conversations",
              "Changing a user's permissions invalidates their mobile session, so new access applies immediately",
            ],
          },
        ],
      },
      {
        heading: "Features the team uses every day",
        body: [
          {
            list: [
              "Ticket priorities from Low to Critical, with active tickets sorted by urgency",
              "Ticket leases shared across web and Android, so two people don't answer the same customer, plus transfer to a colleague",
              "Canned responses (with attachments), CC recipients and merging duplicate tickets",
              "Contact search, a safe CSV export, and bulk close",
              "Push notifications through Firebase Cloud Messaging",
            ],
          },
        ],
      },
      {
        heading: "Email that threads correctly",
        body: [
          "Most tickets start as email. Forwarded mail is ingested with Message-ID de-duplication and reply threading, so a customer's follow-up lands in the right conversation instead of opening a new ticket. Senders can be blocked per company before their mail creates or reopens anything.",
        ],
      },
      {
        heading: "Built for real phones and real networks",
        body: [
          "Mobile networks fail. API requests have bounded timeouts with visible retry, so the app never hangs silently, and the sign-in screen stays usable with the keyboard open on small Android screens.",
        ],
      },
      {
        heading: "Releases you can roll back",
        body: [
          "Each release is documented with the artifacts, verification evidence and a rollback path, and the Android build is published to Google Play. That discipline is what makes it safe to keep shipping updates to a tool a team depends on.",
        ],
      },
    ],
    takeaway:
      "If your team already has a web system, a mobile app doesn't need a second back end. A clean API on top of what you have lets one React Native codebase reach Android (and iOS) while the web portal keeps working.",
  },
  {
    slug: "b2b-woocommerce-quotes-wholesale-freight",
    title: "Custom B2B WooCommerce: quotes, wholesale pricing and delivery rules",
    metaTitle: "B2B WooCommerce: Quotes, Wholesale Pricing & Delivery Rules",
    description:
      "What it takes to turn WooCommerce into a B2B store: quote and WhatsApp ordering, wholesale tiers, bank-transfer checkout and shipping rules, from two builds.",
    published: "2026-10-22",
    project: "euro-agro-fertilizers",
    services: ["ecommerce-development", "wordpress-development"],
    tags: ["WooCommerce", "WordPress", "B2B", "E-commerce"],
    intro:
      "WooCommerce is built for consumer shops: add to cart, pay by card, done. Business buyers work differently. They want quotes, wholesale prices, bank transfers and clear delivery terms. Here's how I adapted it for two suppliers: Euro Agro Fertilizers in the Netherlands and Containers Unlimited in the United States.",
    sections: [
      {
        heading: "Give buyers more than one way to order",
        body: [
          "On Euro Agro's fertilizer store, every product page offers three routes: Add to cart, Request a quote, and Order on WhatsApp. A farm buying a few bags checks out normally; a distributor buying by the tonne asks for a quote. Neither has to fit the other's process.",
        ],
      },
      {
        heading: "Wholesale and distributor accounts",
        body: [
          "Distributors register and are approved manually. Once approved, they get a wholesale customer role with their own pricing and quantity tiers, alongside RFQ and enquiry forms and downloadable catalogues.",
          "The catalogue itself covers 48 products across 10 fertilizer families, with country-based shipping zones, multiple shipping methods and shipment tracking. A custom plugin handles the B2B checkout and freight logic, and keeps page content editable by the client.",
        ],
      },
      {
        heading: "Shoppers think in crops, not chemicals",
        body: [
          "Buyers rarely search for a chemical name. They search for a problem. So I organised the crop-nutrition section by crop, nutrient and deficiency, alongside the usual category and filter browsing, with product schema, clean URLs and metadata for search.",
        ],
      },
      {
        heading: "Containers Unlimited: a big catalogue, migrated cleanly",
        body: [
          "For Containers Unlimited, a US shipping-container and modular-building supplier, the job started with migration. The catalogue is 223 products across 39 categories, imported from structured CSV files, with sale prices kept separate from regular prices and a few price-on-request items left deliberately unpriced.",
          "It runs on a custom lightweight block theme and a companion plugin, both versioned, so every change ships as a numbered release with a rollback path.",
        ],
      },
      {
        heading: "Checkout that matches how the business actually sells",
        body: [
          "High-value orders are paid by bank transfer, so checkout supports that properly. Orders are placed on hold until funds clear, payment instructions appear only on the order confirmation page, and shipping is a simple flat rate to all 50 states. Delivery timelines and return windows are written into the policies, product pages and post-order instructions, so the promise is the same everywhere.",
        ],
      },
      {
        heading: "Fast and mobile-first",
        body: [
          "Both stores were designed mobile-first. On Containers Unlimited the front end is deliberately lean: system fonts, a compressed WebP hero image and one small dependency-free script for motion, which respects reduced-motion settings. Every release there is checked on screens from 320 px phones to 1440 px desktops before it goes live.",
        ],
      },
    ],
    takeaway:
      "WooCommerce can run a serious B2B operation, as long as the store follows the way your customers already buy: quotes, wholesale terms, bank transfers and clear delivery promises. If you sell to businesses, those flows matter more than the theme.",
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const articlesForProject = (projectSlug: string) => articles.filter((a) => a.project === projectSlug);

/** Rough reading time: ~220 words per minute. */
export function readingMinutes(a: Article): number {
  const text = [a.intro, a.takeaway, ...a.sections.flatMap((s) => [s.heading, ...s.body.flatMap((b) => (typeof b === "string" ? [b] : b.list))])].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
