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
  name: "Rohan Mondal", // TODO(rohan): confirm full name
  firstName: "Rohan",
  role: "Full-Stack Developer",
  location: "India",
  timezone: "IST (UTC+05:30)",
  openToWork: true,
  email: "rohanmondalpc@gmail.com",
  siteUrl: "https://rohanmondal.vercel.app",
  /** Put your resume at /public/resume.pdf, then set this to "/resume.pdf". */
  resumeUrl: "", // TODO(rohan): add resume PDF
  avatar: "/3d/dev.png", // TODO(rohan): swap for a photo or a 3D avatar of you, e.g. "/me.png"

  headline: "I build fast, full-stack products people love to use.",
  intro:
    "From pixel-perfect interfaces to payments, auth and databases — I take products from idea to production on modern web tech.",

  about: [
    "I'm a full-stack developer from India who has shipped 25+ production websites and web apps for startups, B2B brands and e-commerce businesses.",
    "I work end-to-end: Next.js and React on the front, Node, Prisma and PostgreSQL on the back, and Vercel, Docker and CI to ship it. I care about speed, accessibility and the small details that make software feel premium.",
    "I'm looking for a full-time role on a product team where I can own features end-to-end and keep learning from great engineers.",
  ],

  stats: [
    { value: "4+", label: "Years building for the web" },
    { value: "25+", label: "Projects shipped" },
    { value: "20+", label: "Live deployments" },
    { value: "15+", label: "Technologies in production" },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/rohanboy17", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" }, // TODO(rohan): your LinkedIn URL
    { label: "Email", href: "mailto:rohanmondalpc@gmail.com", icon: "mail" },
  ],

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
    {
      slug: "freeearnhub",
      title: "FreeEarnHub",
      tagline: "Role-based micro-task marketplace with real payments",
      category: "Full-stack SaaS",
      clip: "money",
      accent: "mint",
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
        timeline: "2026", // TODO(rohan): confirm
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
            body: "A production-ready payments flow with an auditable ledger, live on Vercel.", // TODO(rohan): add real numbers (users, tasks, ₹ processed)
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
        timeline: "2026", // TODO(rohan): confirm
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
      slug: "game-arena",
      title: "GameArena",
      tagline: "Skill-based eSports tournament platform",
      category: "Full-stack web app",
      clip: "game",
      accent: "lilac",
      problem:
        "Online tournaments are easy to cheat in: players can submit fake results and claim prizes.",
      solution:
        "Built a three-step verification workflow — player submits, manager reviews, admin approves — before any winnings reach a wallet.",
      highlights: [
        "User → Manager → Admin anti-cheat result approval",
        "Wallet with UPI deposits and withdrawals plus a referral bonus system",
        "Firebase Auth, Firestore and Storage with role-based access",
      ],
      stack: ["Next.js", "TypeScript", "Firebase", "Firestore", "Tailwind CSS", "shadcn/ui"],
      liveUrl: "https://game-arena-amber.vercel.app",
      repoUrl: "https://github.com/rohanboy17/game-arena",
      featured: true,
    },
    {
      slug: "forge-container-commerce",
      title: "Forge Container Commerce",
      tagline: "Custom WooCommerce store for a shipping-container business",
      category: "E-commerce",
      clip: "package",
      accent: "peach",
      problem:
        "Shipping containers are sold three ways — buy now, request a quote, or both — and off-the-shelf themes couldn't handle it.",
      solution:
        "Wrote an original page-builder-free theme plus a separate plugin for the container business logic, so the rules survive future theme changes.",
      highlights: [
        "Buy / quote / hybrid sale modes with a full quote lifecycle",
        "Idempotent CSV importer with dry-run reports",
        "Docker dev environment, demo seeder and test suite",
      ],
      stack: ["WordPress", "WooCommerce", "PHP", "Docker", "JavaScript"],
      liveUrl: "https://forge-container-commerce.vercel.app",
      featured: true,
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
      slug: "forge74",
      title: "Forge74 Industrial",
      tagline: "Interactive heavy-equipment supply experience",
      category: "Brand website",
      clip: "factory",
      accent: "butter",
      problem: "An equipment supplier needed to look as strong online as its machines.",
      solution: "A bold, animated, responsive experience built for speed.",
      highlights: ["Scroll-driven motion", "Fully responsive"],
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://forge74-industrial-experience.vercel.app",
    },
    {
      slug: "hymel-electric",
      title: "Hymel Electric",
      tagline: "Premium responsive website for an electrical brand",
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
      slug: "truckmate",
      title: "TruckMate Parts",
      tagline: "Responsive B2C truck-parts storefront",
      category: "E-commerce",
      clip: "truck",
      accent: "peach",
      problem: "A parts seller needed shoppers to find the right part fast on any device.",
      solution: "A responsive storefront focused on clear navigation and product discovery.",
      highlights: ["Mobile-first layout", "Clear product discovery"],
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://truck-mate-kappa.vercel.app",
    },
    {
      slug: "eco-mart",
      title: "Eco-Mart Storefront",
      tagline: "Pixel-perfect React + Bootstrap 5 store",
      category: "E-commerce",
      clip: "bags",
      accent: "lilac",
      problem: "Turn a detailed design into a production storefront without losing a pixel.",
      solution: "A component-based React build with Bootstrap 5, matched to the design.",
      highlights: ["Pixel-perfect build", "Reusable components"],
      stack: ["React", "Bootstrap 5", "JavaScript"],
      liveUrl: "https://eco-mart-storefront.vercel.app",
    },
  ] satisfies Project[] as Project[],

  experience: [
    {
      title: "Freelance Full-Stack Developer",
      org: "Self-employed",
      period: "2022 — Present", // TODO(rohan): confirm dates
      location: "Remote · India",
      clip: "briefcase",
      points: [
        "Shipped 25+ websites, storefronts and web apps for startups, B2B manufacturers and e-commerce brands.",
        "Built payment flows with Razorpay, role-based auth, and PostgreSQL/Prisma data models.",
        "Delivered on Next.js, React, Shopify and WooCommerce, deployed on Vercel with CI.",
      ],
    },
    // TODO(rohan): add internships or jobs, newest first, e.g.
    // { title: "Software Engineering Intern", org: "Company", period: "Jan 2025 — Jun 2025", clip: "rocket", points: ["..."] },
  ] satisfies TimelineItem[] as TimelineItem[],

  education: [
    // TODO(rohan): add your degree, e.g.
    // { title: "B.Tech in Computer Science", org: "University name", period: "2021 — 2025", clip: "grad", points: ["CGPA 8.5 / 10"] },
  ] satisfies TimelineItem[] as TimelineItem[],

  achievements: [
    // TODO(rohan): add certifications, hackathons, awards, e.g.
    // { title: "AWS Certified Cloud Practitioner", detail: "Amazon Web Services · 2025", clip: "trophy" },
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
