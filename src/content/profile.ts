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
  location: "West Bengal, India",
  timezone: "IST (UTC+05:30)",
  openToWork: true,
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

  headline: "I build fast, full-stack products people love to use.",
  intro:
    "From pixel-perfect interfaces to payments, auth and databases — I take products from idea to production on modern web tech.",

  about: [
    "I'm a Computer Science graduate (B.Sc, 2023) and GATE 2023 CS qualifier from West Bengal, India. Since then I've shipped 40+ production websites and web apps for startups, B2B brands and e-commerce businesses.",
    "I work end-to-end: Next.js and React on the front, Node, Prisma and PostgreSQL on the back, and Vercel, Docker and CI to ship it. I care about speed, accessibility and the small details that make software feel premium.",
    "I'm looking for a full-time role on a product team where I can own features end-to-end and keep learning from great engineers.",
  ],

  stats: [
    { value: "4+", label: "Years building for the web" },
    { value: "40+", label: "Projects shipped" },
    { value: "30+", label: "Live deployments" },
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
    { title: "GATE 2023 Qualified", detail: "Computer Science & IT · 2023", clip: "trophy" },
    { title: "Cyber Security Course", detail: "6 months · Adamas University", clip: "shield" },
  ] as { title: string; detail: string; clip: Clip; href?: string }[],
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
    match: ["E-commerce platform", "WordPress / WooCommerce", "Shopify"],
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
];

export function categoryOf(project: Project): Category {
  return categories.find((c) => c.match.includes(project.category)) ?? categories[categories.length - 1];
}

export function projectsInCategory(slug: string): Project[] {
  // Featured first, so each category page leads with the strongest work.
  return profile.projects
    .filter((p) => categoryOf(p).slug === slug)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export const categoryCounts = categories.map((c) => ({ ...c, count: projectsInCategory(c.slug).length }));
