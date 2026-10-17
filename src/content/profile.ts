/**
 * Single source of truth for everything shown on the portfolio.
 * Edit this file to update the site — no other file needs to change.
 * Search for "TODO(rohan)" to find details that still need your input.
 */

import demoMedia from "./demo-media.json";

export type Clip =
  | "laptop" | "rocket" | "sparkles" | "wave" | "fire" | "trophy" | "brain" | "gear" | "globe"
  | "coffee" | "bulb" | "star" | "grad" | "briefcase" | "mail" | "bolt" | "puzzle" | "package"
  | "cloud" | "tools" | "phone" | "palette" | "chart" | "lock" | "database" | "cart" | "game"
  | "money" | "dev" | "target" | "party" | "shield" | "toy" | "factory" | "truck" | "dog"
  | "plug" | "health" | "bags";

export type Accent = "lilac" | "peach" | "mint" | "sky" | "pink" | "butter";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  clip: Clip;
  accent: Accent;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Poster image in /public (recorded by `npm run record:demos`). */
  poster?: string;
  /** Short muted loop in /public (recorded by `npm run record:demos`). */
  video?: string;
  featured?: boolean;
  /** Extra detail for the /projects/[slug] case-study page. */
  caseStudy?: {
    role: string;
    timeline: string;
    sections: { heading: string; body: string }[];
  };
};

export type SkillGroup = {
  title: string;
  clip: Clip;
  accent: Accent;
  /** Each item may map to a brand icon by its simple-icons slug. */
  items: { name: string; icon?: string }[];
};

export type TimelineItem = {
  title: string;
  org: string;
  period: string;
  location?: string;
  clip: Clip;
  points: string[];
};

export const profile = {
  name: "Rohan Mondal",
  firstName: "Rohan",
  role: "Full-Stack Developer",
  /** Big gradient line in the hero heading — phrased the way clients search. */
  heroTitle: "Web & App Developer",
  location: "West Bengal, India",
  timezone: "IST (UTC+05:30)",
  openToWork: true,
  /** Shown in the hero and footer badges while `openToWork` is true. */
  availability: "Available for new projects",
  email: "rohanmondalpc@gmail.com",
  phone: "+91 96744 78909",
  phoneHref: "tel:+919674478909",
  /** WhatsApp chat link (digits only, with country code) and the message it starts with. */
  whatsapp: "https://wa.me/919674478909?text=" + encodeURIComponent("Hi Rohan, I saw your portfolio and would like to connect."),
  siteUrl: "https://rohanmondal.vercel.app",
  /** Resume PDF in /public. Leave empty to hide the download button. */
  resumeUrl: "/resume.pdf",
  /** Your photo in /public. Leave empty to show a 3D avatar instead. */
  photo: "/3d/me.png",
  spokenLanguages: ["English", "Hindi", "Bengali"],

  headline: "I design and build websites and mobile apps that win you customers.",
  intro:
    "Freelance full-stack developer for businesses worldwide — fast business websites, online stores, custom web apps and Android/iOS apps, taken from idea to launch.",

  /** Search-engine title and description for the homepage. */
  seo: {
    title: "Rohan Mondal — Freelance Web & Mobile App Developer",
    description:
      "Freelance web & mobile app developer in India building websites, online stores, web apps and Android/iOS apps for businesses worldwide. Get a free quote.",
    keywords: [
      "freelance web developer",
      "hire web developer",
      "website development services",
      "mobile app developer",
      "React Native developer",
      "Next.js developer",
      "Shopify developer",
      "WordPress developer",
      "e-commerce website development",
      "web developer India",
      "web developer Kolkata",
      "app developer West Bengal",
    ],
    /** Google Search Console HTML-tag token (the `content` value only). */
    googleSiteVerification: "2JJ5lMQpeFBrQE6BnyPWafH9YYeLrwio-366_MibMqk",
  },

  about: [
    "I'm a Computer Science graduate (B.Sc, 2023) and GATE 2023 CS qualifier from West Bengal, India. Since then I've shipped 40+ production websites and web apps for startups, B2B brands and e-commerce businesses.",
    "I work end-to-end: Next.js and React on the front, Node, Prisma and PostgreSQL on the back, and Vercel, Docker and CI to ship it. I care about speed, accessibility and the small details that make software feel premium.",
    "I work directly with founders and businesses in India, the US, Europe and Asia — one developer from first call to launch, no agency hand-offs. I'm also open to full-time roles on product teams.",
  ],

  stats: [
    { value: "4+", label: "Years building for the web" },
    { value: "40+", label: "Projects shipped" },
    { value: "40+", label: "Live deployments" },
    { value: "20+", label: "Technologies in production" },
  ],

  /** `primary` ones also appear in the hero; every account appears in Contact and the footer. */
  socials: [
    { label: "GitHub", href: "https://github.com/rohanboy17", icon: "github", primary: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rohanboy17/", icon: "linkedin", primary: true },
    { label: "X", href: "https://x.com/rohan_boy_17", icon: "x", primary: true },
    { label: "Instagram", href: "https://www.instagram.com/rohan_mondal_11", icon: "instagram" },
    { label: "Facebook", href: "https://www.facebook.com/rohanmondalvlogs", icon: "facebook" },
    { label: "YouTube", href: "https://www.youtube.com/@rohanmondal", icon: "youtube" },
  ] as { label: string; href: string; icon: string; primary?: boolean }[],

  skills: [
    {
      title: "Frontend",
      clip: "palette",
      accent: "lilac",
      items: [
        { name: "Next.js", icon: "nextdotjs" },
        { name: "React", icon: "react" },
        { name: "TypeScript", icon: "typescript" },
        { name: "JavaScript", icon: "javascript" },
        { name: "Tailwind CSS", icon: "tailwindcss" },
        { name: "Framer Motion", icon: "framer" },
        { name: "Three.js", icon: "threedotjs" },
        { name: "Bootstrap", icon: "bootstrap" },
      ],
    },
    {
      title: "Backend",
      clip: "gear",
      accent: "peach",
      items: [
        { name: "Node.js", icon: "nodedotjs" },
        { name: "Express", icon: "express" },
        { name: "REST APIs" },
        { name: "NextAuth / JWT" },
        { name: "Zod", icon: "zod" },
        { name: "PHP", icon: "php" },
        { name: "Razorpay", icon: "razorpay" },
      ],
    },
    {
      title: "Databases",
      clip: "database",
      accent: "mint",
      items: [
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "Prisma", icon: "prisma" },
        { name: "Drizzle ORM", icon: "drizzle" },
        { name: "Firebase", icon: "firebase" },
        { name: "MySQL", icon: "mysql" },
      ],
    },
    {
      title: "Languages & CS",
      clip: "brain",
      accent: "butter",
      items: [
        { name: "Data Structures & Algorithms" },
        { name: "Java", icon: "openjdk" },
        { name: "C", icon: "c" },
        { name: "C++", icon: "cplusplus" },
        { name: "Python", icon: "python" },
        { name: "C#" },
        { name: "SQL" },
      ],
    },
    {
      title: "Commerce & CMS",
      clip: "cart",
      accent: "pink",
      items: [
        { name: "Shopify (Liquid)", icon: "shopify" },
        { name: "WooCommerce", icon: "woocommerce" },
        { name: "WordPress", icon: "wordpress" },
        { name: "Sanity", icon: "sanity" },
      ],
    },
    {
      title: "Cloud & DevOps",
      clip: "cloud",
      accent: "sky",
      items: [
        { name: "Vercel", icon: "vercel" },
        { name: "Docker", icon: "docker" },
        { name: "GitHub Actions", icon: "githubactions" },
        { name: "Cloudinary", icon: "cloudinary" },
        { name: "Git", icon: "git" },
      ],
    },
  ] satisfies SkillGroup[],

  projects: [
    // ---------- Featured: the strongest work, chosen after recording and comparing every project ----------
    {
      slug: "signawaydocs",
      title: "SignawayDocs",
      tagline: "Multi-company agreement & e-signature platform",
      category: "Full-stack SaaS",
      clip: "shield",
      accent: "mint",
      problem:
        "Companies were preparing agreements by email and collecting signatures on loose PDFs, with no reliable audit trail.",
      solution:
        "Built an invitation-only platform with company workspaces, a protected signer journey, append-only audit history and deterministic PDF finalisation.",
      highlights: [
        "Laravel 13 + React 19 through Inertia, with invitation-only auth, TOTP MFA and recovery codes",
        "Browser field placement with PDF.js; Python (pypdf, ReportLab) produces signed PDFs and audit certificates",
        "Queues, scheduled jobs, a full Docker dev stack and an automated test suite",
      ],
      stack: ["Laravel 13", "PHP 8.4", "React 19", "TypeScript", "Inertia", "Tailwind CSS", "MySQL", "Python", "Docker"],
      liveUrl: "https://signawaydocs.com",
      featured: true,
      caseStudy: {
        role: "Full-stack developer — architecture, backend, signing flow and PDF pipeline",
        timeline: "2026",
        sections: [
          {
            heading: "The challenge",
            body: "Signatures only matter if they can be proven later. The platform had to let several companies prepare agreements, invite signers safely, and produce a final PDF that nobody could quietly change afterwards.",
          },
          {
            heading: "What I built",
            body: "A Laravel 13 application with a React 19 + TypeScript front end rendered through Inertia. Platform admins create companies and invite owners; owners invite their team. Signers follow a protected journey; every action is written to an append-only audit history. Fields are placed on the document in the browser with PDF.js, and a Python worker (pypdf, ReportLab, Pillow) generates the completed PDF and its audit certificate. Authentication uses Laravel Fortify with verified email, TOTP MFA and recovery codes.",
          },
          {
            heading: "Result",
            body: "A production platform live at signawaydocs.com, with a reproducible Docker environment (PHP 8.4, MySQL 8.4, Node 24, queue, scheduler, Mailpit) and tests.",
          },
        ],
      },
    },
    {
      slug: "routequire",
      title: "RouteQuire Telecom Suite",
      tagline: "Call-route testing & fraud monitoring for VoIP carriers",
      category: "Full-stack SaaS + Android",
      clip: "phone",
      accent: "sky",
      problem:
        "VoIP carriers were losing money to poor routes and false answer supervision, with no hard evidence to take back to their vendors.",
      solution:
        "Built a self-hostable suite that places test calls through Asterisk, captures CDR and SIP evidence, and turns it into dashboards and shareable reports — plus a Traffic Monitor for scam keywords and DTMF.",
      highlights: [
        "Express + PostgreSQL API with JWT auth, roles, audit logs, trials and Stripe-ready subscriptions",
        "React dashboard with KPIs, trend charts and SIP-error drill-downs; Android app via Capacitor",
        "Asterisk AMI call origination, scheduled test batches and emailed CSV reports",
      ],
      stack: ["Node.js", "Express", "PostgreSQL", "React", "Capacitor (Android)", "Asterisk", "Stripe", "Docker"],
      liveUrl: "https://routequire.com",
      featured: true,
      caseStudy: {
        role: "Full-stack developer — API, dashboard, telephony integration and Android build",
        timeline: "2026",
        sections: [
          {
            heading: "The challenge",
            body: "Carriers needed proof: which routes connect, which ones fake an answer, and what a real call actually did on the wire. That evidence lives deep in Asterisk logs and SIP traces that nobody reads.",
          },
          {
            heading: "What I built",
            body: "An Express API on PostgreSQL that schedules test batches (ANI, destinations, routes, pacing, retries), originates calls through the Asterisk Manager Interface and ingests CDR, SIP-trace and hangup evidence through dialplan webhooks. A React dashboard turns it into KPIs, trend charts, route comparisons and drill-down run details, with token-based public report links. A separate Traffic Monitor product transcribes inbound sample calls locally and raises keyword and DTMF alerts. The web app also ships as an Android app with Capacitor.",
          },
          {
            heading: "Result",
            body: "A production telecom product live at routequire.com, with signup, email verification, trials, subscriptions, support tickets, recording retention rules and Docker Compose deployment.",
          },
        ],
      },
    },
    {
      slug: "freeearnhub",
      title: "FreeEarnHub",
      tagline: "Role-based micro-task marketplace with real payments",
      category: "Full-stack SaaS",
      clip: "money",
      accent: "lilac",
      problem:
        "Businesses needed a way to pay many people for small online tasks, with trustworthy payouts and a clear audit trail.",
      solution:
        "Built a marketplace with separate User, Business and Admin flows, a double-entry style wallet ledger and Razorpay-funded business wallets verified on the server.",
      highlights: [
        "Razorpay checkout with server-side signature checks and an idempotent webhook backup",
        "Atomic wallet credits with a ledger entry for every money movement",
        "Submissions, reviews, withdrawals and a treasury view for admins",
      ],
      stack: ["Next.js", "TypeScript", "NextAuth", "Prisma", "PostgreSQL (Neon)", "Razorpay", "Cloudinary"],
      liveUrl: "https://startup-platform-eight.vercel.app",
      featured: true,
      caseStudy: {
        role: "Solo full-stack developer — design, backend, payments and deployment",
        timeline: "2026",
        sections: [
          {
            heading: "The challenge",
            body: "Money moves in three directions — businesses fund wallets, workers earn per task, and admins approve withdrawals. Every step had to be correct even if a browser closed mid-payment.",
          },
          {
            heading: "What I built",
            body: "A Next.js App Router app with NextAuth sessions and role-based routing. Prisma models the wallets, ledger, tasks, submissions and payment orders on Neon PostgreSQL. Funding goes through Razorpay: the server creates the order, verifies the signature, and a webhook settles any payment the client missed — safely, because settlement is idempotent.",
          },
          {
            heading: "Result",
            body: "A production-ready payments flow with an auditable ledger, live on Vercel.",
          },
        ],
      },
    },
    {
      slug: "toyco-india",
      title: "Toyco India Marketplace",
      tagline: "SEO-first multi-vendor toy marketplace",
      category: "E-commerce platform",
      clip: "toy",
      accent: "butter",
      problem:
        "A toy brand wanted its own marketplace where many sellers could list products, without giving up SEO to big platforms.",
      solution:
        "Designed a full marketplace: storefront, seller onboarding with KYC, admin operations, carts, coupons and orders — all typed end-to-end.",
      highlights: [
        "Customer, seller and admin roles with cookie-based JWT auth",
        "PostgreSQL schema for vendors, KYC, catalogue, carts, coupons and orders",
        "Structured data, sitemap and metadata on every product page for SEO",
      ],
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Zod", "JWT (jose)", "AWS S3"],
      liveUrl: "https://toyco-india-marketplace.vercel.app",
      featured: true,
      caseStudy: {
        role: "Full-stack developer — architecture, data model, APIs and UI",
        timeline: "2026",
        sections: [
          {
            heading: "The challenge",
            body: "A marketplace has three very different users — shoppers, sellers and admins — and each needs its own tools while sharing one catalogue.",
          },
          {
            heading: "What I built",
            body: "A Prisma/PostgreSQL model covering users, roles, vendors, KYC documents, brands, products, carts, coupons and orders. Seller APIs handle onboarding, KYC uploads and product submissions; admin APIs handle categories, vendors, coupons and bulk CSV import. Every input is validated with Zod.",
          },
          {
            heading: "Result",
            body: "An SEO-ready storefront with product and breadcrumb structured data, PWA manifest and fast server-rendered pages.",
          },
        ],
      },
    },
    {
      slug: "containers-unlimited",
      title: "Containers Unlimited LLC",
      tagline: "WooCommerce store for a US shipping-container supplier",
      category: "WordPress / WooCommerce",
      clip: "truck",
      accent: "peach",
      problem:
        "A US container and modular-building supplier needed to sell online from a modern store instead of its dated old website.",
      solution:
        "Built a custom WordPress theme and companion plugin on WooCommerce, migrated the catalogue, and shipped a steady stream of client-approved releases.",
      highlights: [
        "Custom theme + companion plugin with versioned releases, live in production",
        "Catalogue and content migration from the client's previous site",
        "Checkout tailored to bank-transfer payments, delivery timelines and quotes",
      ],
      stack: ["WordPress", "WooCommerce", "PHP", "JavaScript", "Custom theme & plugin"],
      liveUrl: "https://containersunlimitedllc.com",
      featured: true,
    },
    {
      slug: "shine-li-atelier",
      title: "Shine Li Atelier",
      tagline: "Editorial fashion brand experience",
      category: "Creative frontend",
      clip: "palette",
      accent: "pink",
      problem: "A fashion label wanted its website to feel like a printed lookbook, not another template store.",
      solution:
        "Designed and built an editorial, motion-rich Next.js experience with bold typography, kinetic marquees and art-directed imagery.",
      highlights: [
        "Art-directed layouts and kinetic typography",
        "Next.js App Router with a Drizzle-ready data layer",
        "Responsive, fast and accessible",
      ],
      stack: ["Next.js", "React", "TypeScript", "Drizzle ORM", "CSS animation"],
      liveUrl: "https://shine-li-atelier.vercel.app",
      featured: true,
    },

    // ---------- More work ----------
    {
      slug: "organisedesk",
      title: "OrganiseDesk",
      tagline: "Android helpdesk app with a PHP ticket portal",
      category: "Mobile + full-stack",
      clip: "briefcase",
      accent: "sky",
      problem: "A support team needed to raise and track tickets on the move, backed by a web portal and API.",
      solution:
        "Built an Expo (React Native) Android app plus a matching PHP ticket portal and API, with staff roles, notifications and a Google Play release.",
      highlights: [
        "Expo Android app with push notifications and file sharing",
        "PHP portal + API with staff roles and canned responses",
        "Published to Google Play",
      ],
      stack: ["React Native", "Expo", "TypeScript", "PHP", "MySQL"],
      liveUrl: "https://organisedesk.ink",
      repoUrl: "https://github.com/rohanboy17/organisedesk-mobile",
    },
    {
      slug: "cockroach-jobs",
      title: "Cockroach Jobs",
      tagline: "Fixed & freelance job board for Gen Z",
      category: "WordPress",
      clip: "bulb",
      accent: "peach",
      problem: "A hiring startup needed a job board where businesses post vacancies and applicants respond with text, images and video.",
      solution: "Built a custom 'Cockroach Jobs Core' WordPress plugin on top of a job-portal theme, with employer and seeker flows.",
      highlights: ["Custom job-board plugin", "Employer and job-seeker dashboards"],
      stack: ["WordPress", "PHP", "Custom plugin"],
      liveUrl: "https://cockroachjobs.in",
    },
    {
      slug: "evonet",
      title: "Evonet",
      tagline: "Fintech homepage redesign concept",
      category: "Creative frontend",
      clip: "bolt",
      accent: "lilac",
      problem: "A payments company's homepage didn't feel as modern as the product behind it.",
      solution: "An original, responsive homepage concept in the interaction language of premium fintech brands.",
      highlights: ["Dark, premium visual system", "Interactive product moments"],
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://evonet.vercel.app",
    },
    {
      slug: "yunjing-technology",
      title: "Yunjing Technology",
      tagline: "Advanced-materials company website",
      category: "Next.js website",
      clip: "star",
      accent: "sky",
      problem: "A materials-science company had to explain MAX phases and MXenes to industrial buyers.",
      solution: "A production Next.js site that turns deep science into clear, visual product stories.",
      highlights: ["Clear science storytelling", "Fast static rendering"],
      stack: ["Next.js", "React", "TypeScript"],
      liveUrl: "https://yunjing-technology.vercel.app",
      repoUrl: "https://github.com/rohanboy17/yunjing-technology",
    },
    {
      slug: "pushkey",
      title: "Pushkey Corporate",
      tagline: "Custom WordPress block theme for a construction & export firm",
      category: "WordPress",
      clip: "tools",
      accent: "butter",
      problem: "A construction, trading and export company wanted an editorial site it could edit itself.",
      solution: "A lightweight custom WordPress block theme, plus a Next.js version of the same design.",
      highlights: ["Custom block theme", "Editable by the client in WordPress"],
      stack: ["WordPress", "Block theme", "PHP", "Next.js"],
      liveUrl: "https://pushkey-corporate-website.vercel.app",
    },
    {
      slug: "global-wine-bottles",
      title: "Global Wine Bottles",
      tagline: "WooCommerce redesign for a packaging supplier",
      category: "WordPress / WooCommerce",
      clip: "party",
      accent: "mint",
      problem: "A glass-packaging supplier's store was hard to browse and broke on mobile.",
      solution: "Redesigned the catalogue experience with custom category JavaScript and a WooCommerce functions add-on.",
      highlights: ["Custom category browsing", "Mobile fixes across the site"],
      stack: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
      liveUrl: "https://globalwinebottles.com",
    },
    {
      slug: "euro-agro-fertilizers",
      title: "Euro Agro Fertilizers",
      tagline: "B2B WooCommerce for a Dutch fertilizer supplier",
      category: "WordPress / WooCommerce",
      clip: "globe",
      accent: "mint",
      problem: "A Netherlands-based supplier needed to sell fertilizer worldwide to business buyers.",
      solution: "Built the store plus a custom plugin for B2B checkout, worldwide freight estimates and editable page content.",
      highlights: ["Custom 'Commerce Suite' plugin", "Worldwide freight estimates"],
      stack: ["WordPress", "WooCommerce", "PHP", "Elementor"],
      liveUrl: "https://euroagrofertilizers.com",
    },
    {
      slug: "game-arena",
      title: "GameArena",
      tagline: "Skill-based eSports tournament platform",
      category: "Full-stack web app",
      clip: "game",
      accent: "lilac",
      problem: "Online tournaments are easy to cheat in: players can submit fake results and claim prizes.",
      solution: "A three-step verification workflow — player submits, manager reviews, admin approves — before winnings reach a wallet.",
      highlights: ["User → Manager → Admin anti-cheat approval", "Wallet with UPI deposits, withdrawals and referrals"],
      stack: ["Next.js", "TypeScript", "Firebase", "Firestore", "Tailwind CSS", "shadcn/ui"],
      liveUrl: "https://game-arena-amber.vercel.app",
      repoUrl: "https://github.com/rohanboy17/game-arena",
    },
    {
      slug: "furui-machinery",
      title: "Furui Machinery",
      tagline: "Equipment catalogue for a machinery exporter",
      category: "B2B website",
      clip: "factory",
      accent: "sky",
      problem: "A forklift and construction-equipment maker needed to present its range to international buyers.",
      solution: "A lightweight multi-page site with product ranges, applications and quote requests.",
      highlights: ["Clear product range navigation", "Quote-focused journeys"],
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://furui-machinery.vercel.app",
    },
    {
      slug: "zhenyang-electric",
      title: "ZhenYang Electric",
      tagline: "Grid-safety hardware catalogue",
      category: "B2B website",
      clip: "plug",
      accent: "sky",
      problem: "An electrical-safety manufacturer needed buyers to find and request the right products fast.",
      solution: "An animated B2B catalogue with product cards, capabilities and quote requests.",
      highlights: ["Animated, premium B2B design", "Product catalogue with quote flow"],
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://zhenyang-electric.vercel.app",
    },
    {
      slug: "forge74",
      title: "Forge74 Industrial",
      tagline: "Interactive heavy-equipment supply experience",
      category: "Brand website",
      clip: "factory",
      accent: "peach",
      problem: "An equipment supplier needed to look as strong online as its machines.",
      solution: "A bold, animated, responsive experience built for speed.",
      highlights: ["Scroll-driven motion", "Fully responsive"],
      stack: ["Vite", "JavaScript", "CSS"],
      liveUrl: "https://forge74-industrial-experience.vercel.app",
    },
    {
      slug: "marento-home",
      title: "Marento Home",
      tagline: "Shopify storefront for home textiles",
      category: "Shopify",
      clip: "bags",
      accent: "butter",
      problem: "A home-textiles brand wanted a calm, premium store that sells bedding by mood.",
      solution: "A Shopify storefront with editorial merchandising and a clean shopping flow.",
      highlights: ["Editorial merchandising", "Clean, premium shopping flow"],
      stack: ["Shopify", "Liquid", "JavaScript"],
      liveUrl: "https://marento-home.com",
    },
    {
      slug: "neuron",
      title: "NEURON Clinic",
      tagline: "Neuro-psychiatry clinic website",
      category: "WordPress",
      clip: "brain",
      accent: "sky",
      problem: "A Kolkata neuro-psychiatry practice needed a calm, trustworthy site that explains complex care.",
      solution: "A custom WordPress theme with conditions, therapies, FAQs and appointment calls to action.",
      highlights: ["Custom WordPress theme", "Live for Dr. Bhaskar Mukherjee"],
      stack: ["WordPress", "PHP", "Custom theme"],
      liveUrl: "https://doctorbhaskarmukherjee.com",
    },
    {
      slug: "van-shi-furniture",
      title: "Van Shi Furniture",
      tagline: "Luxury furniture showroom site",
      category: "WordPress",
      clip: "star",
      accent: "peach",
      problem: "A furniture showroom wanted its website to feel as premium as its pieces.",
      solution: "A dark, editorial WordPress build, exported as a static client preview.",
      highlights: ["Editorial dark design", "Static preview for client review"],
      stack: ["WordPress", "PHP", "Static export"],
      liveUrl: "https://van-shi-furniture-client-preview.vercel.app",
    },
    {
      slug: "forge-container-commerce",
      title: "Forge Container Commerce",
      tagline: "Custom WooCommerce store with quote workflows",
      category: "WordPress / WooCommerce",
      clip: "package",
      accent: "peach",
      problem: "Containers are sold three ways — buy now, request a quote, or both — and off-the-shelf themes couldn't handle it.",
      solution: "An original page-builder-free theme plus a separate plugin for the container business logic.",
      highlights: ["Buy / quote / hybrid sale modes", "Docker dev environment and test suite"],
      stack: ["WordPress", "WooCommerce", "PHP", "Docker"],
      liveUrl: "https://forge-container-commerce.vercel.app",
    },
    {
      slug: "ads-advanced-device-systems",
      title: "ADS Advanced Device Systems",
      tagline: "B2B medical-device platform website",
      category: "B2B website",
      clip: "health",
      accent: "sky",
      problem: "A medical-device maker needed a site that turns technical buyers into quote requests.",
      solution: "Multi-route catalogue with product detail, buyer solutions, OEM/ODM and a persistent quote list.",
      highlights: ["Quote list that persists across pages", "Conversion-focused buyer journeys"],
      stack: ["Next.js", "TypeScript", "Drizzle ORM"],
      liveUrl: "https://ads-advanced-device-systems.vercel.app",
    },
    {
      slug: "petfu",
      title: "Petfu Shopify Store",
      tagline: "Premium Shopify OS 2.0 storefront",
      category: "Shopify",
      clip: "dog",
      accent: "pink",
      problem: "A pet brand wanted a premium storefront that still lets the team edit everything in Shopify.",
      solution: "Custom OS 2.0 theme sections in Liquid plus an interactive Next.js design demo.",
      highlights: ["Editable OS 2.0 sections", "Interactive design prototype"],
      stack: ["Shopify", "Liquid", "Next.js"],
      liveUrl: "https://petfu-shopify.vercel.app",
    },
    {
      slug: "hymel-electric",
      title: "Hymel Electric",
      tagline: "Premium website for an electrical brand",
      category: "Brand website",
      clip: "plug",
      accent: "mint",
      problem: "An electrical manufacturer needed a modern, trustworthy web presence.",
      solution: "A clean, fast, responsive marketing site.",
      highlights: ["Responsive across devices", "Lightweight and fast"],
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://hymel-electric.vercel.app",
      repoUrl: "https://github.com/rohanboy17/hymel-electric",
    },
    {
      slug: "rupashi-enterprise",
      title: "Rupashi Enterprise",
      tagline: "B2B website for a Kolkata poultry supplier",
      category: "Full-stack website",
      clip: "briefcase",
      accent: "sky",
      problem: "A B2B meat and poultry supplier needed a dynamic website its team could keep up to date.",
      solution: "Built the full stack — React front end with Express and PHP on the back — hosted on Hostinger.",
      highlights: ["Dynamic, data-driven pages", "Deployed and maintained in production"],
      stack: ["React", "Express", "PHP", "Hostinger"],
      liveUrl: "https://rupashienterprise.vercel.app",
    },
    {
      slug: "the-kolkata-news",
      title: "The Kolkata News",
      tagline: "Digital news portal for Kolkata",
      category: "WordPress",
      clip: "globe",
      accent: "pink",
      problem: "A local newsroom needed a fast site for breaking news, stories and reader tips.",
      solution: "A WordPress news portal with story feeds, community sections and an enquiry form.",
      highlights: ["Breaking-news layout", "Launching soon"],
      stack: ["WordPress", "Elementor", "PHP"],
    },
    {
      slug: "llanolife",
      title: "LlanoLife",
      tagline: "Smart-tech & gadgets Shopify store",
      category: "Shopify",
      clip: "phone",
      accent: "sky",
      problem: "A consumer-tech brand needed a premium, dark storefront that makes gadgets feel desirable.",
      solution: "A custom Shopify store — 'Smart tech, easy life' — with curated collections and a clean buying flow.",
      highlights: ["Premium dark storefront", "Editable in Shopify"],
      stack: ["Shopify", "Liquid", "JavaScript"],
      liveUrl: "https://llanolife.com",
    },
    {
      slug: "nour-skin",
      title: "Leki Skincare",
      tagline: "Curated Eucerin skincare store (Morocco)",
      category: "Shopify",
      clip: "palette",
      accent: "pink",
      problem: "A Moroccan skincare retailer needed a trustworthy store with local pricing in MAD.",
      solution: "A clean Shopify store — 'The skin edit' — with a curated catalogue, sale pricing and localisation.",
      highlights: ["Localised pricing (MAD)", "Curated product edit"],
      stack: ["Shopify", "Liquid"],
      liveUrl: "https://leki-maroc.com",
    },
    {
      slug: "ripples-jewelry",
      title: "Ripples Jewelry",
      tagline: "Keepsake jewelry Shopify store",
      category: "Shopify",
      clip: "star",
      accent: "butter",
      problem: "A jewelry brand wanted its store to feel like meaningful, personal keepsakes — not a generic catalogue.",
      solution: "An editorial Shopify store with a full catalogue and a warm, premium brand feel.",
      highlights: ["Editorial product storytelling", "Full catalogue"],
      stack: ["Shopify", "Liquid", "JavaScript"],
      liveUrl: "https://ripplesjewelry.com",
    },
    {
      slug: "wowei-lighting",
      title: "Wowei Lighting",
      tagline: "LED lighting manufacturer store",
      category: "WordPress / WooCommerce",
      clip: "bulb",
      accent: "butter",
      problem: "A Chinese LED-lighting manufacturer needed to present smart bulbs and fixtures to global buyers.",
      solution: "A WooCommerce catalogue with product ranges, smart-lighting highlights and a company news section.",
      highlights: ["Smart-lighting product catalogue", "Global-buyer focused"],
      stack: ["WordPress", "WooCommerce", "PHP"],
      liveUrl: "https://wowlight.com.cn",
    },
    {
      slug: "herzite",
      title: "Herzite Atelier",
      tagline: "Custom-bracelet jewelry store",
      category: "WordPress / WooCommerce",
      clip: "sparkles",
      accent: "lilac",
      problem: "A jewelry brand wanted customers to design their own meaningful bracelets, not just buy stock pieces.",
      solution: "A WooCommerce store with a 'design a bracelet' builder and a customer-creations showcase.",
      highlights: ["Custom bracelet builder", "Customer-creations gallery"],
      stack: ["WordPress", "WooCommerce", "PHP"],
      liveUrl: "http://162.62.233.115", // live server (IP only)
    },
    {
      slug: "rockstone-luxe",
      title: "Rockstone Luxe",
      tagline: "Luxury stone & surfaces store",
      category: "WordPress / WooCommerce",
      clip: "package",
      accent: "mint",
      problem: "A premium building-materials supplier needed an elegant store for luxury stone and surfaces.",
      solution: "A custom 'Rockstone Luxe' WooCommerce theme with a refined catalogue and product detail.",
      highlights: ["Custom WooCommerce theme", "Premium catalogue"],
      stack: ["WordPress", "WooCommerce", "PHP"],
      liveUrl: "http://43.131.45.150", // server was unreachable at record time, so no demo yet — re-run `npm run record:demos -- rockstone-luxe` when it's up
    },
    {
      slug: "tg-packaging",
      title: "TG Packaging",
      tagline: "Cosmetic-packaging manufacturer site",
      category: "B2B website",
      clip: "palette",
      accent: "pink",
      problem: "A cosmetic-packaging manufacturer needed to showcase its range to beauty brands.",
      solution: "A refined WordPress site — 'The sculpture of scent' — with product families and a concept-to-delivery story.",
      highlights: ["Custom studio theme + plugin", "Concept-to-delivery journey"],
      stack: ["WordPress", "PHP", "Custom theme & plugin"],
      liveUrl: "http://43.157.62.224", // live server (IP only)
    },
    {
      slug: "topfeel",
      title: "Topfeel Packaging",
      tagline: "Total packaging solution provider",
      category: "B2B website",
      clip: "package",
      accent: "peach",
      problem: "A packaging supplier needed a B2B site that turns manufacturers into quote requests.",
      solution: "A WordPress site with product categories, a quote flow and a custom core plugin.",
      highlights: ["Quote-focused B2B flow", "Custom theme + core plugin"],
      stack: ["WordPress", "PHP", "Custom theme & plugin"],
      liveUrl: "http://43.131.42.127", // live server (IP only)
    },
    {
      slug: "wolf-rocks",
      title: "Wolf Rocks · 狼山石",
      tagline: "Luxury Chinese homepage for a rare-stone brand",
      category: "Brand website",
      clip: "sparkles",
      accent: "mint",
      problem: "A Yinshan collector-stone brand needed a homepage that feels like a gallery, not a catalogue, for buyers of one-of-a-kind pieces.",
      solution: "An editorial, Chinese-language homepage with collection showcases, origin storytelling and a calm, museum-like pace.",
      highlights: ["Editorial luxury art direction", "Full Chinese-language (zh-CN) content"],
      stack: ["Next.js", "React", "TypeScript", "Vite (vinext)", "Tailwind CSS"],
      liveUrl: "https://jade-homepage-teal.vercel.app",
    },
    {
      slug: "aravali-institute",
      title: "Aravali Institute",
      tagline: "Admissions site for a fast-track PGDM institute",
      category: "Brand website",
      clip: "grad",
      accent: "sky",
      problem: "A Bangalore institute had to explain its Learn & Earn PGDM to working learners and turn visits into applications.",
      solution: "A React site that walks through the programme step by step, with courses, faculty, centres, placements and apply/brochure calls to action.",
      highlights: ["Step-by-step career-journey section", "Apply and brochure CTAs on every page"],
      stack: ["React", "Vite", "JavaScript", "CSS"],
      liveUrl: "https://training-institute-frontend.vercel.app",
      repoUrl: "https://github.com/rohanboy17/training-institute-frontend",
    },
    {
      slug: "helpinghands-ngo",
      title: "HelpingHands NGO",
      tagline: "Education & community-support NGO website",
      category: "Brand website",
      clip: "wave",
      accent: "peach",
      problem: "A non-profit needed a clear, trustworthy site to present its causes and programmes and bring in donors and volunteers.",
      solution: "A responsive React site organised around causes, programmes and news, with a donate call to action throughout.",
      highlights: ["Cause and programme sections", "Donate CTA throughout"],
      stack: ["React", "Vite", "JavaScript", "CSS"],
      liveUrl: "https://ngo-website2.vercel.app",
      repoUrl: "https://github.com/rohanboy17/ngo-website2",
    },
    {
      slug: "truckmate-parts",
      title: "TruckMate Parts",
      tagline: "Truck-parts storefront + native WordPress theme",
      category: "E-commerce frontend",
      clip: "truck",
      accent: "butter",
      problem: "A truck-parts seller's buyers search by SKU, OEM number and vehicle, which a generic shop layout handles badly.",
      solution: "A storefront with instant part-number search, a year/make/model selector and a cart drawer, shipped as a static build and as a WordPress theme.",
      highlights: ["SKU / MPN / OEM search + vehicle fit selector", "Installable WordPress theme with editable products"],
      stack: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
      liveUrl: "https://truck-mate-kappa.vercel.app",
    },
    {
      slug: "eco-mart",
      title: "Eco-Mart",
      tagline: "Responsive e-commerce storefront from a Figma design",
      category: "E-commerce frontend",
      clip: "cart",
      accent: "mint",
      problem: "A hiring assignment: turn a full e-commerce homepage design from Figma into a responsive, working front end.",
      solution: "A React + Bootstrap 5 build with flash-sale countdowns, category browsing and product grids, faithful to the design at every breakpoint.",
      highlights: ["Live flash-sale countdown", "Matches the design across breakpoints"],
      stack: ["React", "Vite", "Bootstrap 5", "CSS"],
      liveUrl: "https://eco-mart-storefront.vercel.app",
    },
    {
      slug: "whoop-uae-replica",
      title: "WHOOP UAE Membership",
      tagline: "Replica of WHOOP's UAE membership page",
      category: "UI replica",
      clip: "health",
      accent: "peach",
      problem: "Practice brief: rebuild a reference membership page with its plan comparison, carousels and hero video, without copying its code.",
      solution: "Independently written HTML, CSS and JavaScript, including mobile plan selectors that make the comparison table usable on phones.",
      highlights: ["Plan comparison with mobile selectors", "Hero video, carousels and reveal motion"],
      stack: ["HTML", "Bootstrap 5", "CSS", "JavaScript"],
      liveUrl: "https://whoop-uae-replica.vercel.app",
    },
    {
      slug: "aestetika-replica",
      title: "Aestetika",
      tagline: "Replica of the Aestetika aesthetic-clinic theme",
      category: "UI replica",
      clip: "sparkles",
      accent: "pink",
      problem: "Practice brief: rebuild Bold Themes' Aestetika clinic demo as a fast, dependency-free static site.",
      solution: "A hand-written HTML/CSS/JS build with self-hosted fonts, an SVG icon sprite, structured data and fully responsive layouts.",
      highlights: ["No framework, no build step", "Self-hosted fonts + SVG sprite"],
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://aestetika-replica.vercel.app",
    },
    {
      slug: "novaedge-replica",
      title: "Novaedge",
      tagline: "Replica of the Ewebot SEO-agency WordPress theme",
      category: "UI replica",
      clip: "chart",
      accent: "sky",
      problem: "Practice brief: rebuild the Ewebot theme's long, feature-heavy landing page as a standalone front end.",
      solution: "A static rebuild of the theme showcase (demos, features and inner pages), prepared for deployment on Vercel.",
      highlights: ["Long-form theme landing page", "Static, deploy-ready pages"],
      stack: ["HTML", "CSS", "JavaScript", "PHP"],
      liveUrl: "https://clone2-jade-zeta.vercel.app",
      repoUrl: "https://github.com/rohanboy17/clone2",
    },
    {
      slug: "novaforge-replica",
      title: "NovaForge",
      tagline: "Replica of W3CMS's Plexify agency template",
      category: "UI replica",
      clip: "rocket",
      accent: "lilac",
      problem: "Practice brief: rebuild a busy digital-agency template with mega menus, counters and animated sections.",
      solution: "A static rebuild of the Plexify homepage with its full navigation, service cards, case studies and motion.",
      highlights: ["Mega-menu navigation", "Animated counters and lettering"],
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://home-clone-six.vercel.app",
      repoUrl: "https://github.com/rohanboy17/home-clone",
    },
  ] satisfies Project[] as Project[],

  experience: [
    {
      title: "Freelance Full-Stack Developer",
      org: "Self-employed",
      period: "2023 — Present", // TODO(rohan): confirm start year
      location: "Remote · India",
      clip: "rocket",
      points: [
        "Shipped 40+ websites, storefronts and web apps for startups, B2B manufacturers and e-commerce brands.",
        "Built payment flows with Razorpay, role-based auth, and PostgreSQL/Prisma data models.",
        "Delivered on Next.js, React, Shopify and WooCommerce, deployed on Vercel with CI.",
      ],
    },
    {
      title: "Full-Stack Web Developer",
      org: "Rupashi Enterprise",
      period: "6 months",
      location: "India",
      clip: "briefcase",
      points: [
        "Built the company's B2B dynamic website end to end with React, Express and PHP.",
        "Handled deployment and hosting on Hostinger; the site is live at rupashienterprise.vercel.app.",
      ],
    },
  ] satisfies TimelineItem[] as TimelineItem[],

  education: [
    {
      title: "B.Sc. in Computer Science",
      org: "Jogesh Chandra Chaudhuri College",
      period: "Aug 2020 — Sep 2023",
      location: "Tollygunge, Kolkata",
      clip: "grad",
      points: [
        "Core CS: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, Software Engineering, Theory of Computation.",
        "Programming in C, Java (OOP & Advanced Java) and Python; Information Security, Data Mining and Image Processing.",
        "College project: CURSED — an adventure game built with a teammate in Unreal Engine using Blueprints and C#.",
      ],
    },
    {
      title: "Higher Secondary (12th), Science",
      org: "Julpia Andharmanik High School",
      period: "Jan 2019 — Jun 2020",
      location: "Julpia, West Bengal",
      clip: "bulb",
      points: ["Mathematics, Physics, Chemistry and Biology."],
    },
  ] satisfies TimelineItem[] as TimelineItem[],

  achievements: [
    {
      kind: "National exam",
      title: "GATE 2023",
      status: "Qualified",
      issuer: "Graduate Aptitude Test in Engineering",
      field: "Computer Science & Information Technology",
      badge: "2023",
      description:
        "India's national engineering exam for postgraduate admissions at IITs and NITs and for PSU recruitment.",
      clip: "trophy",
      accent: "butter",
    },
    {
      kind: "Certification",
      title: "Cyber Security",
      status: "Completed",
      issuer: "Adamas University",
      field: "6-month programme",
      badge: "6 mo",
      description: "A six-month programme in cyber-security fundamentals.",
      clip: "shield",
      accent: "sky",
    },
  ] as {
    kind: string;
    title: string;
    status: string;
    issuer: string;
    field: string;
    badge: string;
    description: string;
    clip: Clip;
    accent: Accent;
    href?: string;
  }[],
};

export type Profile = typeof profile;

// Attach demo videos/posters recorded by `npm run record:demos` (unless set by hand above).
for (const p of profile.projects) {
  const media = (demoMedia as Record<string, { poster?: string; video?: string }>)[p.slug];
  p.poster ??= media?.poster;
  p.video ??= media?.video;
}

export const featuredProjects = profile.projects.filter((p) => p.featured);
export const otherProjects = profile.projects.filter((p) => !p.featured);

/* ---------- Work categories ---------- */
// Each project's `category` string maps to one broad business category below.
// Every category gets its own page at /work/[slug].
export type Category = {
  slug: string;
  title: string;
  short: string;
  tagline: string;
  clip: Clip;
  accent: Accent;
  match: string[];
  /** Overrides the closing call to action on the category page. */
  cta?: { title: string; body: string };
};

export const categories: Category[] = [
  {
    slug: "web-apps",
    title: "Web Apps & SaaS",
    short: "Web Apps",
    tagline: "Full-stack products with auth, payments, dashboards and APIs — taken from idea to production.",
    clip: "rocket",
    accent: "lilac",
    match: ["Full-stack SaaS", "Full-stack SaaS + Android", "Full-stack web app", "Mobile + full-stack", "Full-stack website"],
  },
  {
    slug: "ecommerce",
    title: "E-Commerce & Online Stores",
    short: "E-Commerce",
    tagline: "Marketplaces and storefronts built on Next.js, WooCommerce and Shopify.",
    clip: "cart",
    accent: "mint",
    match: ["E-commerce platform", "E-commerce frontend", "WordPress / WooCommerce", "Shopify"],
  },
  {
    slug: "business-sites",
    title: "Business & Brand Websites",
    short: "Business Sites",
    tagline: "Fast, premium marketing sites for B2B manufacturers, brands and local businesses.",
    clip: "globe",
    accent: "peach",
    match: ["B2B website", "Brand website", "Next.js website", "WordPress"],
  },
  {
    slug: "creative",
    title: "Creative & Interactive",
    short: "Creative",
    tagline: "Motion-rich, art-directed front-ends that make a brand feel premium.",
    clip: "palette",
    accent: "pink",
    match: ["Creative frontend"],
  },
  {
    slug: "replicas",
    title: "UI Replicas & Rebuilds",
    short: "Replicas",
    tagline: "Practice rebuilds of existing sites and themes, written from scratch to sharpen layout, motion and responsive detail. Not client work.",
    clip: "puzzle",
    accent: "butter",
    match: ["UI replica"],
    cta: {
      title: "Have a design that needs building?",
      body: "I turn Figma files and reference sites into fast, responsive front ends. Let's talk about yours.",
    },
  },
];

export function categoryOf(project: Project): Category {
  // Unmapped category strings fall back to Creative.
  return categories.find((c) => c.match.includes(project.category)) ?? categories.find((c) => c.slug === "creative")!;
}

export function projectsInCategory(slug: string): Project[] {
  // Featured first, so each category page leads with the strongest work.
  return profile.projects
    .filter((p) => categoryOf(p).slug === slug)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export const categoryCounts = categories.map((c) => ({ ...c, count: projectsInCategory(c.slug).length }));

/* ---------- Services (for clients) ---------- */
// Each service gets a landing page at /services/[slug], written for the searches clients actually make.
export type Service = {
  slug: string;
  /** Short name for cards, nav and breadcrumbs. */
  title: string;
  /** Page heading — includes the phrase clients search for. */
  heading: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  clip: Clip;
  accent: Accent;
  intro: string[];
  /** Who this service is for. */
  idealFor: string[];
  deliverables: { title: string; body: string }[];
  stack: string[];
  /** Slugs of projects in `profile.projects` that prove this service. */
  projects: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    heading: "Website design & development for businesses",
    metaTitle: "Freelance Website Developer — Business Website Design & Development",
    metaDescription:
      "Fast, SEO-ready business websites designed and built by freelance developer Rohan Mondal. Next.js, React and WordPress sites for companies worldwide. Get a free quote.",
    tagline: "Fast, premium websites that turn visitors into enquiries.",
    clip: "globe",
    accent: "peach",
    intro: [
      "Your website is often the first conversation a customer has with your business. I design and build fast, mobile-first websites that explain what you do clearly, load in under two seconds and make it easy to get in touch.",
      "I've built sites for manufacturers, exporters, brands, institutes and non-profits in India, the US, Europe and China, including multilingual sites for international buyers.",
    ],
    idealFor: [
      "Businesses that need a new site or a redesign of an outdated one",
      "B2B manufacturers and exporters selling to global buyers",
      "Startups that need a launch-ready marketing site",
      "Institutes, clinics, agencies and non-profits",
    ],
    deliverables: [
      { title: "Custom design", body: "A layout designed around your brand and your customers — no generic template look." },
      { title: "Mobile-first build", body: "Pixel-perfect on phones, tablets and desktops, tested on real devices." },
      { title: "SEO foundations", body: "Clean headings, metadata, sitemap, structured data and fast Core Web Vitals from day one." },
      { title: "Lead capture", body: "Contact forms, quote requests and WhatsApp buttons that deliver straight to your inbox." },
      { title: "Editable content", body: "A CMS (WordPress or headless) when your team needs to update pages without a developer." },
      { title: "Launch & hosting", body: "Domain, hosting, SSL and analytics set up, plus support after launch." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "WordPress", "Vercel"],
    projects: ["yunjing-technology", "furui-machinery", "zhenyang-electric", "wolf-rocks", "ads-advanced-device-systems", "aravali-institute"],
    faqs: [
      {
        q: "How long does a business website take?",
        a: "A typical 5–8 page business website takes 2–4 weeks from approved design to launch. A single landing page can be ready in under a week.",
      },
      {
        q: "Will my website show up on Google?",
        a: "Every site I build ships with technical SEO in place: fast loading, mobile-friendly layouts, proper headings, metadata, a sitemap and structured data. I also set up Google Search Console so your pages get indexed.",
      },
      {
        q: "Can I edit the website myself after launch?",
        a: "Yes. If you need to edit content regularly, I build on WordPress or connect a headless CMS so you can update text, images and pages without touching code.",
      },
      {
        q: "Do you redesign existing websites?",
        a: "Yes. I can redesign an outdated site, move it to a faster platform and keep your existing URLs and search rankings intact with proper redirects.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    heading: "Mobile app development for Android & iOS",
    metaTitle: "Mobile App Developer — React Native Android & iOS App Development",
    metaDescription:
      "Hire a freelance mobile app developer for Android and iOS. Cross-platform React Native (Expo) apps with backends, push notifications and admin dashboards. Free quote.",
    tagline: "Cross-platform apps with the backend and admin panel to run them.",
    clip: "phone",
    accent: "lilac",
    intro: [
      "I build mobile apps with React Native (Expo), so one codebase runs on both Android and iOS, which saves you time and budget compared with two separate native apps.",
      "Because I'm a full-stack developer, you get the whole product: the app, the API and database behind it, and the web dashboard your team uses to manage it. I've shipped apps to Google Play, including a helpdesk app with push notifications and a VoIP testing suite that also runs as an Android app.",
    ],
    idealFor: [
      "Startups launching an MVP on Android and iOS",
      "Businesses turning an internal process into an app for staff",
      "Companies that already have a website or web app and need a mobile version",
      "Service businesses that need bookings, tickets or notifications",
    ],
    deliverables: [
      { title: "Android & iOS app", body: "One React Native codebase, tested on real devices and published to the app stores." },
      { title: "Backend & API", body: "Secure APIs, authentication, roles and a database designed for your data." },
      { title: "Admin dashboard", body: "A web panel to manage users, content, orders or tickets." },
      { title: "Push notifications", body: "Timely alerts that bring users back into the app." },
      { title: "Web-to-app", body: "Turn an existing web app into an installable Android/iOS app with Capacitor." },
      { title: "Store release", body: "Google Play and App Store listings, builds and updates handled for you." },
    ],
    stack: ["React Native", "Expo", "TypeScript", "Capacitor", "Node.js", "PHP", "PostgreSQL", "MySQL"],
    projects: ["organisedesk", "routequire", "freeearnhub", "game-arena"],
    faqs: [
      {
        q: "Do you build for both Android and iOS?",
        a: "Yes. I use React Native with Expo, so one codebase produces both an Android and an iOS app. That usually costs far less than building two native apps.",
      },
      {
        q: "Can you also build the backend and admin panel?",
        a: "Yes, that's my strength as a full-stack developer. I build the API, database and web admin dashboard alongside the app, so everything works together.",
      },
      {
        q: "Will you publish the app to Google Play and the App Store?",
        a: "Yes. I prepare the store listings and builds and handle the submission process. The developer accounts stay in your name, so you own the app.",
      },
      {
        q: "I already have a website. Can it become an app?",
        a: "Often, yes. A web app can be wrapped as a native Android/iOS app with Capacitor, or I can build a dedicated React Native app that shares your existing backend.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    heading: "E-commerce website development: Shopify, WooCommerce & custom stores",
    metaTitle: "E-commerce Website Developer — Shopify, WooCommerce & Next.js Stores",
    metaDescription:
      "Online stores that sell: Shopify and WooCommerce development, custom Next.js marketplaces, payments, B2B checkout and store redesigns. Freelance developer, free quote.",
    tagline: "Online stores built to sell, on Shopify, WooCommerce or a custom stack.",
    clip: "cart",
    accent: "mint",
    intro: [
      "I build online stores that are fast, easy to browse on a phone and simple to check out from, because every extra second and every extra step costs sales.",
      "I've built Shopify themes, WooCommerce stores with custom plugins for B2B checkout and freight estimates, and a full multi-vendor marketplace in Next.js with seller onboarding and admin operations, for sellers in India, the US and Europe.",
    ],
    idealFor: [
      "Brands launching their first online store",
      "Stores that are slow, dated or hard to use on mobile",
      "B2B suppliers who need quotes, bulk orders or custom checkout",
      "Marketplaces with multiple sellers",
    ],
    deliverables: [
      { title: "Shopify stores", body: "Custom Online Store 2.0 themes and sections, tuned for speed and conversions." },
      { title: "WooCommerce stores", body: "WordPress stores with custom plugins for B2B pricing, shipping and checkout." },
      { title: "Custom marketplaces", body: "Next.js + PostgreSQL platforms with multi-vendor dashboards and payouts." },
      { title: "Payments", body: "Razorpay and UPI for India, Stripe or PayPal for international customers, verified on the server." },
      { title: "Product catalogue", body: "Categories, filters and search that help customers find the right product fast." },
      { title: "Store redesigns", body: "Modernise an existing store without losing products, orders or SEO." },
    ],
    stack: ["Shopify", "Liquid", "WooCommerce", "WordPress", "Next.js", "Razorpay", "Stripe", "PostgreSQL"],
    projects: ["toyco-india", "containers-unlimited", "euro-agro-fertilizers", "marento-home", "petfu", "truckmate-parts"],
    faqs: [
      {
        q: "Shopify or WooCommerce — which is right for me?",
        a: "Shopify is best if you want a fully hosted store with minimal maintenance. WooCommerce suits businesses that want full control, custom B2B logic or no monthly platform fees. I'll recommend one based on your products and budget.",
      },
      {
        q: "Can you migrate my existing store?",
        a: "Yes. I can move products, customers and content to a new platform or theme, and set up redirects so you keep your search rankings.",
      },
      {
        q: "Which payment gateways do you integrate?",
        a: "Razorpay and UPI for India, and Stripe and PayPal for international payments, as well as any gateway with a documented API.",
      },
      {
        q: "Do you build multi-vendor marketplaces?",
        a: "Yes. I built Toyco India, a multi-vendor toy marketplace with seller onboarding and KYC, carts, coupons, orders and an admin panel, on Next.js and PostgreSQL.",
      },
    ],
  },
  {
    slug: "web-app-development",
    title: "Web App & SaaS Development",
    heading: "Custom web app & SaaS development",
    metaTitle: "Custom Web App & SaaS Developer — Next.js, Node.js, PostgreSQL",
    metaDescription:
      "Custom web applications, SaaS platforms, dashboards and portals built end to end: auth, payments, APIs and databases. Hire a freelance full-stack developer. Free quote.",
    tagline: "Custom software for the work spreadsheets and off-the-shelf tools can't handle.",
    clip: "rocket",
    accent: "sky",
    intro: [
      "When your business outgrows spreadsheets and off-the-shelf tools, a custom web app fits your exact workflow. I build SaaS products, dashboards, portals and internal tools end to end: database, API, interface and deployment.",
      "Recent builds include a multi-company e-signature platform, a VoIP route-testing suite with live dashboards, and an eSports tournament platform with wallets and an anti-cheat approval flow.",
    ],
    idealFor: [
      "Founders building a SaaS MVP",
      "Companies replacing spreadsheets with a proper system",
      "Teams that need a customer portal or admin dashboard",
      "Products that need payments, roles and reporting",
    ],
    deliverables: [
      { title: "MVP to production", body: "Scope a lean first version, launch it, then iterate with real users." },
      { title: "Auth & roles", body: "Secure sign-in, teams, permissions and audit trails." },
      { title: "Payments & billing", body: "Subscriptions, wallets and invoices with Razorpay or Stripe." },
      { title: "Dashboards & reports", body: "KPIs, charts and exports that help you run the business." },
      { title: "APIs & integrations", body: "REST APIs, webhooks and connections to the tools you already use." },
      { title: "Deployment & CI", body: "Vercel or Docker deployments with automated checks on every change." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Laravel", "Docker"],
    projects: ["signawaydocs", "routequire", "freeearnhub", "game-arena", "rupashi-enterprise"],
    faqs: [
      {
        q: "Can you build an MVP for my startup?",
        a: "Yes. We start by agreeing the smallest version that proves your idea, I build and launch it, and we add features based on what users actually do.",
      },
      {
        q: "Who owns the code?",
        a: "You do. The code lives in your GitHub repository and the hosting is in your accounts, so you're never locked in to me.",
      },
      {
        q: "Can you work on an existing codebase?",
        a: "Yes. I can add features, fix bugs, improve performance or modernise an existing React, Next.js, Node.js, PHP or Laravel application.",
      },
      {
        q: "How do we communicate during the project?",
        a: "You'll get regular progress updates and a live preview link you can click through, and you can reach me on email, WhatsApp or video calls in your time zone.",
      },
    ],
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    heading: "WordPress development: custom themes & plugins",
    metaTitle: "WordPress Developer — Custom Themes, Plugins & WooCommerce",
    metaDescription:
      "Freelance WordPress developer for custom block themes, plugins, WooCommerce, speed fixes and redesigns. Sites your team can edit without breaking. Free quote.",
    tagline: "Custom themes and plugins your team can edit without breaking anything.",
    clip: "tools",
    accent: "butter",
    intro: [
      "WordPress is ideal when your team wants to publish and edit content without a developer. I build custom block themes and plugins instead of stacking page builders, so the site stays fast, secure and easy to edit.",
      "I've built a full job-board plugin, a B2B commerce suite for WooCommerce, editable corporate themes and news sites.",
    ],
    idealFor: [
      "Businesses that update their content often",
      "Slow or broken WordPress sites that need fixing",
      "Projects that need a custom feature no plugin offers",
      "Publishers, job boards and membership sites",
    ],
    deliverables: [
      { title: "Custom block themes", body: "Lightweight themes designed for your brand, editable in the block editor." },
      { title: "Custom plugins", body: "Job boards, B2B checkout, booking and other features built to spec." },
      { title: "WooCommerce", body: "Stores with custom product logic, shipping and checkout." },
      { title: "Speed & security", body: "Fix slow pages, clean up plugins and harden the install." },
      { title: "Redesigns & fixes", body: "Mobile fixes, redesigns and migrations without losing content." },
      { title: "Training & handover", body: "A short walkthrough so your team can manage the site confidently." },
    ],
    stack: ["WordPress", "PHP", "WooCommerce", "Block themes", "Elementor", "MySQL"],
    projects: ["cockroach-jobs", "pushkey", "euro-agro-fertilizers", "containers-unlimited", "the-kolkata-news"],
    faqs: [
      {
        q: "Can you fix or speed up my existing WordPress site?",
        a: "Yes. I audit slow pages, remove heavy plugins, optimise images and caching, and fix mobile layout problems.",
      },
      {
        q: "Do you use page builders?",
        a: "Only when a client already relies on one, such as Elementor. For new builds I prefer custom block themes, which are faster and easier to maintain.",
      },
      {
        q: "Can you build a custom plugin?",
        a: "Yes. I've built custom plugins for job boards, B2B checkout, freight estimates and editable content blocks.",
      },
    ],
  },
];

/** How every project runs, shown on the services pages. */
export const workProcess = [
  { title: "Free discovery call", body: "We talk through your goals, audience and timeline. No cost, no obligation." },
  { title: "Proposal & fixed quote", body: "You get a clear scope, timeline and price in writing before any work starts." },
  { title: "Design", body: "I design the key screens and refine them with you until they're right." },
  { title: "Build with live previews", body: "You follow progress on a live preview link, with regular updates." },
  { title: "Launch", body: "Testing on real devices, SEO setup, analytics, and a smooth go-live." },
  { title: "Support", body: "Post-launch fixes included, plus ongoing maintenance if you need it." },
];

/** Reasons to hire, shown on the services hub. */
export const whyHire = [
  { title: "Work directly with the developer", body: "No account managers or hand-offs. You talk to the person building your product." },
  { title: "Clients worldwide", body: "Projects delivered for businesses in India, the US, the Netherlands and China." },
  { title: "Your time zone", body: "Based in India (IST), with overlap for UK/EU working hours and async updates for the US and Australia." },
  { title: "You own everything", body: "Code, domains and hosting stay in your accounts. No lock-in." },
];

/** General questions, shown on the services hub. */
export const generalFaqs = [
  {
    q: "How much does a website or app cost?",
    a: "It depends on scope. A landing page costs much less than a marketplace or a mobile app. Tell me what you need and I'll send a fixed quote within 24 hours, free and with no obligation.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. I work with clients worldwide and have delivered projects for businesses in the US, the Netherlands, China and across India. I communicate in English, Hindi and Bengali.",
  },
  {
    q: "How do payments work?",
    a: "Usually a deposit to start, with the rest split across milestones. I accept UPI and bank transfer in India, and PayPal and Binance for international clients, so paying from anywhere in the world is easy.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Bug fixes are included after launch, and I offer ongoing maintenance, updates and new features if you need them.",
  },
  {
    q: "Are you available for full-time roles too?",
    a: "Yes. Alongside freelance projects, I'm open to full-time roles on product teams. Get in touch through the contact form.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function projectsForService(service: Service): Project[] {
  return service.projects.map((slug) => {
    const project = profile.projects.find((p) => p.slug === slug);
    // Fail the build on a typo rather than silently dropping proof from the page.
    if (!project) throw new Error(`Service "${service.slug}" references unknown project "${slug}"`);
    return project;
  });
}

/** The service a project best demonstrates, for linking case studies to their service page. */
export function serviceForProject(project: Project): Service {
  const listed = services.find((s) => s.projects.includes(project.slug));
  if (listed) return listed;
  const slug = /Android|Mobile/.test(project.category)
    ? "mobile-app-development"
    : project.category === "WordPress"
      ? "wordpress-development"
      : ({ "web-apps": "web-app-development", ecommerce: "ecommerce-development" } as Record<string, string>)[categoryOf(project).slug] ??
        "website-development";
  return getService(slug)!;
}
