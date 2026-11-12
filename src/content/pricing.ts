/**
 * Pricing for /pricing and the plan cards on the service pages.
 *
 * Prices are set in US dollars (`usd`). Rupee prices are worked out from the day's exchange rate
 * (see src/lib/fx.ts), so Indian and international clients pay the same amount.
 *
 * Positioned against global rates (researched Nov 2026: freelancer hourly US $75–150, UK $55–130,
 * Western Europe $50–110, Eastern Europe $25–50, India $20–52; 5-page site $1,000–5,000 freelance,
 * US agency median $3,850; Shopify store $2,000–5,000 freelance; app MVP $15k–40k freelance,
 * $40k–100k agency; WordPress care $50–150/month; site fixes $14–45/hr on Upwork, $80–120/hr on
 * Codeable; an outside VAPT ₹25k–60k for a small web app, ₹50k–1.5 lakh per mobile app).
 *
 * Feature lists cover what clients in India and abroad expect at each level: privacy and cookie
 * pages, analytics, accessibility basics and booking links for websites; global and Indian payment
 * methods, multi-currency and tax setup for stores; sign-in, analytics, crash reporting and
 * store-required account deletion for apps.
 */
export type Plan = {
  slug: string;
  name: string;
  /** Who it's for, one line. */
  forWho: string;
  /** Business types this plan suits best, shown as tags on the card. */
  bestFor: string[];
  /** Regular price in US dollars. Rupees are converted from it; the launch offer is taken off it. */
  usd: number;
  /** Show "from" before the price. */
  from?: boolean;
  /** Shown after the price, e.g. "one-time" or "per month". */
  priceNote: string;
  delivery?: string;
  /** Free support included after launch, e.g. "30 days" or "6 months". */
  freeSupport?: string;
  /** Slug of the monthly plan (in `ongoingPlans`) that follows the free support. */
  care?: string;
  popular?: boolean;
  /** First line can be "Everything in X, plus:". */
  features: string[];
  /** Small print under the features. */
  note?: string;
  /** Points people who need something else to the better plan. */
  instead?: { when: string; slug: string };
  /** Button label. */
  cta: string;
  /** Pre-filled WhatsApp message for the plan's button. */
  whatsapp: string;
};

/**
 * A real, time-limited discount on every plan. Prices show the regular price crossed out and the
 * offer price beside it until `endsAt`; after that the regular prices apply on their own.
 */
export const launchOffer = {
  percent: 50,
  endsAt: "2026-12-31T23:59:59+05:30",
  endsLabel: "31 December 2026",
};
export const offerActive = (now = new Date()) => now <= new Date(launchOffer.endsAt);
/** $249 → $124 during the offer (rounded down to whole dollars). */
export const offerPrice = (usd: number) => Math.floor((usd * (100 - launchOffer.percent)) / 100);
export const formatUsd = (n: number) => `$${n.toLocaleString("en-US")}`;
export const formatInr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
/** For text that can't show a live price: names the offer and its end date. */
export const offerSentence = `Every plan, including Care, Suite Care and Fix & Upgrade, is ${launchOffer.percent}% off until ${launchOffer.endsLabel}.`;

export const plans: Plan[] = [
  {
    slug: "launch",
    name: "Launch",
    forWho: "You need a professional site so customers can find you, trust you and call, WhatsApp or book you.",
    bestFor: ["Clinics & doctors", "Salons & gyms", "Restaurants & cafés", "Local shops & services", "Freelancers & coaches"],
    usd: 249,
    priceNote: "one-time",
    delivery: "Live in 2–3 days",
    freeSupport: "30 days",
    care: "care",
    features: [
      "Up to 5 custom-designed pages, no templates",
      "Mobile-first and fast (90+ speed score)",
      "Copywriting help included",
      "WhatsApp, call, email and enquiry-form buttons, with spam protection",
      "Booking link for appointments (Calendly or Google Calendar)",
      "Google Maps and social links",
      "Privacy policy, cookie notice and terms pages (GDPR-ready)",
      "Accessibility basics: readable contrast, image alt text, keyboard-friendly menus",
      "Free domain (.com or your country's) and hosting for the first year",
      "Free SSL certificate",
      "2 rounds of changes",
    ],
    instead: { when: "Need Google SEO and listings, more pages or to edit the site yourself?", slug: "business" },
    cta: "Get my free demo",
    whatsapp: "Hi Rohan, I'm interested in the Launch website plan. Can I get the free homepage demo?",
  },
  {
    slug: "business",
    name: "Business",
    forWho: "You want to rank on Google, show many services or products, and edit the site yourself.",
    bestFor: ["Manufacturers & B2B suppliers", "Schools & coaching centres", "Real estate & builders", "Hotels & travel agents", "CA, law & consulting firms"],
    usd: 499,
    priceNote: "one-time",
    delivery: "Live in 4–5 days",
    freeSupport: "60 days",
    care: "care",
    popular: true,
    features: [
      "Everything in Launch, plus:",
      "Up to 15 pages",
      "Edit your own text and photos (easy admin)",
      "Blog or news section",
      "SEO setup: titles, sitemap and Google Search Console",
      "On-page SEO for your key searches",
      "Google Business Profile, Bing Places and Apple Maps listings set up",
      "Google Business Profile optimised with photos, services and first posts",
      "Google Analytics 4 with enquiry and call tracking, behind a cookie-consent banner",
      "Testimonials and reviews section",
      "3 rounds of changes",
    ],
    instead: { when: "Want customers to pay and order on the site?", slug: "store" },
    cta: "Get my free demo",
    whatsapp: "Hi Rohan, I'm interested in the Business website plan. Can I get the free homepage demo?",
  },
  {
    slug: "store",
    name: "Online Store",
    forWho: "You want customers to pick products, pay online and get them delivered, at home or abroad.",
    bestFor: ["Clothing & boutiques", "Beauty & skincare", "Jewellery & handicrafts", "Food & organic products", "D2C brands"],
    usd: 899,
    priceNote: "one-time",
    delivery: "Live in 7–10 days",
    freeSupport: "90 days",
    care: "care",
    features: [
      "Shopify, WooCommerce or a custom store",
      "Up to 50 products uploaded for you",
      "Cards, PayPal, Stripe, Apple Pay and Google Pay, plus UPI, Razorpay and cash on delivery in India",
      "Multi-currency prices and international shipping zones",
      "Tax set up for your market (GST, VAT or US sales tax)",
      "Shipping rules, coupons, order emails and abandoned-cart emails",
      "Order-on-WhatsApp button",
      "Fast, mobile-first checkout",
      "SEO setup: titles, sitemap, Search Console and product structured data",
      "Google Business Profile, Bing Places and Apple Maps listings set up",
      "Privacy, returns, shipping and terms pages (GDPR-ready)",
      "Training video so your team can manage orders",
    ],
    note: "Shopify plan, hosting and payment-gateway fees are paid to those providers directly, in your name.",
    instead: { when: "Need bookings, customer accounts or a mobile app?", slug: "app" },
    cta: "Get my free demo",
    whatsapp: "Hi Rohan, I'm interested in the Online Store plan. Can we talk about my store?",
  },
  {
    slug: "app",
    name: "App or Web App",
    forWho: "Your idea needs logins, bookings, dashboards or an app on Google Play and the App Store.",
    bestFor: ["Startups & SaaS", "Booking & appointment systems", "Delivery & tracking apps", "School, clinic & HR portals", "Marketplaces & CRMs"],
    usd: 1799,
    from: true,
    priceNote: "starting price",
    delivery: "From 2–3 weeks",
    freeSupport: "120 days",
    care: "care",
    features: [
      "Android and iOS from one React Native codebase",
      "Backend API and database included",
      "Sign-in with email, Google or Apple, user roles and an admin dashboard",
      "Push notifications",
      "Payments if you need them (Stripe, PayPal or Razorpay)",
      "Analytics and crash reporting",
      "In-app account deletion and privacy policy, as Apple and Google require",
      "Weekly test builds you can try on your phone",
      "Google Play and App Store publishing, including the privacy and data-safety forms",
      "SEO for the web pages and app-store listings",
      "Google Business Profile, Bing Places and Apple Maps listings set up",
    ],
    note: "Final price is fixed after a free scoping call, before any work starts. Hosting and store developer accounts are in your name.",
    instead: { when: "Need a web app and mobile app together, custom-designed and secure?", slug: "secure-starter" },
    cta: "Book a free call",
    whatsapp: "Hi Rohan, I need an app / web app. Can we book a free scoping call?",
  },
];

/**
 * Web + App Suites: a secure web app and an Android + iOS app on one backend. Each card shows
 * the one-time build and, below it, the free support period followed by Suite Care.
 */
export const suites: Plan[] = [
  {
    slug: "secure-starter",
    name: "Secure Starter",
    forWho: "You're launching a product on the web and on phones at the same time, and it has to look premium and be safe from day one.",
    bestFor: ["Startups & MVPs", "Booking & membership apps", "Local service platforms"],
    usd: 3999,
    priceNote: "one-time",
    delivery: "From 4–6 weeks",
    freeSupport: "6 months",
    care: "suite-care",
    features: [
      "Web app plus Android and iOS app (one React Native codebase) on a shared backend",
      "Custom UI design for the web app and both apps: no templates, themes or UI kits, approved by you before the build",
      "Smooth animations and screen transitions",
      "Up to 10 screens per app, with customer and admin roles",
      "Sign-in with OTP, Google or Apple, and an admin dashboard",
      "Push notifications",
      "Security hardening: HTTPS everywhere, hashed passwords, role-based access, rate limiting",
      "Automated vulnerability scan and a written security report",
      "Privacy-ready data handling: consent, data export and account deletion (GDPR and India's DPDP Act)",
      "Analytics and crash reporting",
      "Daily encrypted backups",
      "Google Play and App Store publishing",
      "SEO for the web app and app-store listings",
      "Google Business Profile, Bing Places and Apple Maps listings set up",
    ],
    note: "An outside VAPT test is available as an add-on, quoted at cost. Paid in milestones agreed on the scoping call. Hosting, store accounts and payment-gateway fees are in your name.",
    instead: { when: "Taking payments or handling customer data?", slug: "secure-business" },
    cta: "Book a free scoping call",
    whatsapp: "Hi Rohan, I'm interested in the Secure Starter suite. Can we book a free scoping call?",
  },
  {
    slug: "secure-business",
    name: "Secure Business",
    forWho: "Your customers pay you or trust you with personal data, so it has to look trustworthy and be secure from the first screen.",
    bestFor: ["Clinics & healthcare", "Finance & insurance", "Logistics & delivery", "E-learning platforms"],
    usd: 6999,
    priceNote: "one-time",
    delivery: "From 6–8 weeks",
    freeSupport: "9 months",
    care: "suite-care",
    popular: true,
    features: [
      "Everything in Secure Starter, plus:",
      "Up to 25 screens per app, with multiple roles and permissions",
      "Payments by card, PayPal, Apple Pay and Google Pay, plus UPI in India, with subscriptions if you need them",
      "Two-factor login and audit logs",
      "Reports and analytics dashboard",
      "Staging environment and automated tests",
      "A 3D scene on your web app's homepage, built with Three.js and kept fast on phones",
    ],
    note: "An outside VAPT test is available as an add-on, quoted at cost. Paid in milestones agreed on the scoping call. Hosting, store accounts and payment-gateway fees are in your name.",
    instead: { when: "Need integrations, offline mode or an outside security test included?", slug: "secure-enterprise" },
    cta: "Book a free scoping call",
    whatsapp: "Hi Rohan, I'm interested in the Secure Business suite. Can we book a free scoping call?",
  },
  {
    slug: "secure-enterprise",
    name: "Secure Enterprise",
    forWho: "Your platform runs complex workflows, connects to other systems or has to meet strict data rules.",
    bestFor: ["Hospitals & labs", "Fintech & NBFCs", "Manufacturing & ERP", "Multi-branch businesses"],
    usd: 14999,
    priceNote: "one-time",
    delivery: "From 10–12 weeks",
    freeSupport: "12 months",
    care: "suite-care",
    features: [
      "Everything in Secure Business, plus:",
      "Complex workflows and approval chains",
      "Integrations with your ERP, CRM, payment or logistics systems",
      "Offline mode and real-time updates",
      "Multiple languages and currencies",
      "Encryption of sensitive fields and admin IP allow-listing",
      "Load testing and a disaster-recovery plan",
      "Scroll-driven storytelling with 3D and custom illustrations",
      "Outside VAPT test of the web app, API and both mobile apps, with a certificate",
      "Priority response throughout the free year",
    ],
    note: "Paid in milestones agreed on the scoping call. Hosting, store accounts and payment-gateway fees are in your name.",
    instead: { when: "Want to launch smaller first and grow into this later?", slug: "secure-starter" },
    cta: "Book a free scoping call",
    whatsapp: "Hi Rohan, I'm interested in the Secure Enterprise suite. Can we book a free scoping call?",
  },
];

/** Live examples of the design quality the suites promise, shown under the suites heading. */
export const suiteDesignExamples: { label: string; href: string }[] = [
  { label: "the 3D scene on my homepage", href: "/" },
  { label: "Martin Luxury", href: "/projects/martin-luxury" },
  { label: "Shine Li Atelier", href: "/projects/shine-li-atelier" },
  { label: "Forge74", href: "/projects/forge74" },
];

/**
 * For products that are already live: monthly care once free support ends (Care for the four
 * main plans, Suite Care for the suites), and one-off fixes for any site.
 */
export const ongoingPlans: Plan[] = [
  {
    slug: "care",
    name: "Care",
    forWho: "Your website, store or app is live and its free support has ended. I keep it updated, backed up and online.",
    bestFor: ["Launch & Business sites", "Online stores", "Apps & web apps"],
    usd: 49,
    priceNote: "per month",
    features: [
      "Software, theme and plugin updates",
      "Weekly backups",
      "Uptime monitoring",
      "Security and malware scans",
      "SSL and domain renewal reminders",
      "Monthly SEO check: titles, meta descriptions, broken links, page speed and Search Console",
      "Google Business Profile, Bing Places and Apple Maps listings kept up to date",
      "Social profile links, bios and contact details kept consistent",
      "Privacy and cookie pages kept current",
      "Monthly report on uptime, speed and visits",
      "Up to 3 hours of changes every month",
      "Priority WhatsApp and email support",
    ],
    note: "Starts when the free support on Launch, Business, Online Store or App ends. Cancel anytime.",
    cta: "Start Care",
    whatsapp: "Hi Rohan, I'd like the Care plan for my website.",
  },
  {
    slug: "suite-care",
    name: "Suite Care",
    forWho: "Your Web + App Suite is live and its free support has ended. I keep the web app, backend and both apps running and patched.",
    bestFor: ["Secure Starter", "Secure Business", "Secure Enterprise"],
    usd: 499,
    priceNote: "per month",
    features: [
      "App updates for new iOS and Android releases",
      "Security patches and dependency updates",
      "Uptime and error monitoring",
      "Crash reports from both apps reviewed and fixed",
      "Daily backups, with a restore test every month",
      "SSL, domain and push-notification certificate renewals handled",
      "App-store policy and privacy-form updates when Apple or Google change the rules",
      "SEO and app-store listing upkeep",
      "Google Business Profile and other listings kept up to date",
      "Monthly report on uptime, errors and usage",
      "Up to 30 hours of changes every month",
      "Priority WhatsApp and email support",
    ],
    note: "Starts when a suite's free support ends. Cancel anytime. Hosting, store accounts and payment-gateway fees are paid separately, in your name.",
    cta: "Start Suite Care",
    whatsapp: "Hi Rohan, I'd like Suite Care for my web app and mobile app.",
  },
  {
    slug: "fix-upgrade",
    name: "Fix & Upgrade",
    forWho: "Have a website built by another developer or agency? Get it edited, fixed or extended without starting over.",
    bestFor: ["Sites built by someone else", "Slow or hacked sites", "Broken pages, forms or checkout"],
    usd: 25,
    priceNote: "per hour",
    features: [
      "Text, image and layout edits, including Elementor and other page builders",
      "Bug, error and broken-page fixes",
      "Mobile layout fixes on phones and tablets",
      "Speed optimisation and Core Web Vitals fixes",
      "Hacked-site cleanup and malware removal",
      "Contact form, email delivery and WhatsApp button fixes",
      "Payment gateway and checkout fixes (Stripe, PayPal, Razorpay)",
      "Plugin, theme and version updates, with conflict fixes",
      "Hosting or domain moves and SSL setup",
      "Cookie banner, privacy pages and accessibility fixes",
      "Broken links, 404 errors and redirects",
      "New sections, pages or features",
      "WordPress, Shopify, WooCommerce, Wix, Squarespace, React / Next.js and PHP sites",
    ],
    note: "One-hour minimum. Send me the site and what you need; I'll estimate the hours and confirm the total before any work starts. Built your site with me? Changes are covered by your free support, then Care or Suite Care.",
    cta: "Request a change",
    whatsapp: "Hi Rohan, I have an existing website and need some changes (Fix & Upgrade). Can you take a look?",
  },
];

/** "Which plan fits your business?" guide on /pricing. `plan` is a slug from `plans`, `suites` or `ongoingPlans`. */
export const planGuide: { business: string; plan: string; why: string }[] = [
  {
    business: "Clinic, salon, gym, restaurant or local shop",
    plan: "launch",
    why: "Customers mostly want your services, timings and location, and a quick way to call, WhatsApp or book you.",
  },
  { business: "Freelancer, consultant or coach", plan: "launch", why: "A sharp page with your work, reviews and a contact button is what wins clients." },
  {
    business: "Manufacturer, B2B supplier or exporter",
    plan: "business",
    why: "A page for each product range ranks on Google and brings bulk enquiries, with no online payments needed.",
  },
  { business: "School, college or coaching centre", plan: "business", why: "Courses, faculty, admissions and a notice board you update yourself." },
  { business: "Real estate, builder, hotel or travel agent", plan: "business", why: "Many project, room or tour pages with photo galleries, plus enquiry tracking." },
  { business: "Hospital or multi-doctor clinic", plan: "business", why: "Separate pages for each department and doctor that patients find on Google." },
  { business: "Clothing, beauty, jewellery or handicraft brand", plan: "store", why: "Customers browse, pay by card, PayPal or UPI, and you manage every order in one place." },
  { business: "Food, sweets or grocery seller", plan: "store", why: "Online orders with delivery areas, cash on delivery and order-on-WhatsApp." },
  { business: "Business that needs a full booking or appointment system", plan: "app", why: "Customer accounts, live calendars, reminders and online payments need custom software. A simple booking link is included in every website plan." },
  { business: "Startup, marketplace or SaaS idea", plan: "app", why: "Sign-ups, user roles, an admin dashboard and a product built to grow." },
  { business: "Company that needs a portal, CRM or internal tool", plan: "app", why: "Custom workflows for your team, with logins and reports." },
  {
    business: "Startup launching on the web and on phones together",
    plan: "secure-starter",
    why: "One backend powers the web app and both mobile apps, custom-designed, hardened and scanned before launch, with 6 months of free support.",
  },
  {
    business: "Clinic, finance or logistics business handling payments or personal data",
    plan: "secure-business",
    why: "Payments, two-factor login, audit logs and a staging environment, with an outside security test available as an add-on.",
  },
  {
    business: "Platform with integrations, offline use or strict data rules",
    plan: "secure-enterprise",
    why: "ERP or CRM integrations, offline mode, load testing and a full outside security test of every app, with a year of support.",
  },
  { business: "Website built by another developer that needs work", plan: "fix-upgrade", why: "Edits, fixes and new features on the site you already have, without paying for a rebuild." },
];

/** Promises that apply to every plan. */
export const everyPlan = [
  {
    title: "Free demo first",
    body: "See your homepage designed in 3–4 hours before you pay anything. Apps and suites start with a free scoping call and a fixed quote.",
  },
  {
    title: "Pay in parts",
    body: "Websites and stores: 50% after you approve the demo, 50% at launch. Apps and suites: milestones agreed upfront. UPI, bank transfer, PayPal or Binance.",
  },
  { title: "You own everything", body: "Code, domain and accounts are in your name. No lock-in." },
  { title: "Talk to the developer", body: "Direct WhatsApp line to me: no sales team, no hand-offs." },
];

/**
 * "Typical freelancer or agency vs me" against global rates (Nov 2026). Rows with `plan` show that
 * plan's live price (with the offer) between `prefix` and `suffix`; the rest show `me`.
 */
export const comparison: { label: string; them: string; me?: string; plan?: string; prefix?: string; suffix?: string }[] = [
  { label: "5-page website", them: "$1,000–5,000 from a freelancer; US agency median $3,850", plan: "launch" },
  { label: "Online store", them: "$2,000–5,000 from a Shopify freelancer", plan: "store" },
  { label: "App MVP", them: "$15k–40k from a freelancer; $40k–100k from an agency", plan: "app", prefix: "From " },
  { label: "Web app + iOS + Android", them: "$30k–70k cross-platform; outside security test extra", plan: "secure-starter", prefix: "From " },
  { label: "Delivery", them: "Weeks to months", me: "Websites in days" },
  { label: "See it before you pay", them: "Rarely", me: "Free homepage demo in 3–4 hours" },
  { label: "Design", them: "Often a premium theme", me: "Custom-designed and hand-coded" },
  { label: "Monthly care", them: "$50–150/month for WordPress care", plan: "care", suffix: " a month, including 3 hours of changes" },
  { label: "Fixing someone else's site", them: "$14–45/hr on Upwork, $80–120/hr on Codeable", plan: "fix-upgrade", suffix: " an hour" },
  { label: "Who you talk to", them: "An account manager or a marketplace chat", me: "The developer, directly" },
];

/** A plan by slug, for FAQ answers that quote prices. */
const planOf = (slug: string) => {
  const p = [...plans, ...suites, ...ongoingPlans].find((x) => x.slug === slug);
  if (!p) throw new Error(`pricing.ts refers to unknown plan "${slug}"`);
  return p;
};
const usdOf = (slug: string) => formatUsd(planOf(slug).usd);

export const pricingFaqs = [
  {
    q: "Which plan should I choose?",
    a: "If customers mainly need to find you and contact you, choose Launch. If you want to rank on Google with many pages and edit the site yourself, choose Business. If customers should pay and order online, choose Online Store. If you need logins, bookings, dashboards or a mobile app, choose App or Web App. If you need a web app and mobile apps together with security built in and a custom design, choose one of the Web + App Suites. Still not sure? Tell me what your business does and I'll recommend the cheapest plan that does the job.",
  },
  {
    q: `Is the ${launchOffer.percent}% discount real, and how long does it last?`,
    a: `Yes. ${offerSentence} The crossed-out price is the regular price and the one beside it is what you pay. Projects confirmed before ${launchOffer.endsLabel} keep the offer price, and monthly plans are billed at the offer price for months that start before that date. After it, the regular prices apply.`,
  },
  {
    q: "How long is the free support?",
    a: `30 days on Launch, 60 days on Business, 90 days on Online Store and 120 days on App or Web App, counted from launch. After that, the Care plan keeps your site updated, backed up, monitored and security-scanned, keeps its SEO, Google Business Profile, listings and social profiles up to date, and includes up to 3 hours of changes every month, for ${usdOf("care")} a month. The Web + App Suites include much longer support: 6 months on Secure Starter, 9 months on Secure Business and 12 months on Secure Enterprise, then Suite Care at ${usdOf("suite-care")} a month. ${offerSentence}`,
  },
  {
    q: "Which currency do you charge in?",
    a: "Prices are set in US dollars. Clients in India see and pay the rupee equivalent at the day's exchange rate (switch this page to ₹ to see it), by UPI or bank transfer. International clients pay in dollars by PayPal, Binance or bank transfer, and we work over WhatsApp, email or video calls in your time zone.",
  },
  {
    q: "What does \"high security\" include in the Web + App Suites?",
    a: "Every suite is hardened as it's built: HTTPS everywhere, hashed passwords, role-based access, rate limiting, encrypted backups, plus an automated vulnerability scan and a written security report. Secure Business adds two-factor login and audit logs, and Secure Enterprise adds field encryption, IP allow-listing, load testing and a disaster-recovery plan. A VAPT (vulnerability assessment and penetration test) by an independent security firm is included in Secure Enterprise, covering the web app, API and both mobile apps, with a certificate. Any issues it finds are fixed and retested. For Secure Starter and Secure Business, it's an add-on quoted at cost.",
  },
  {
    q: "What does custom design and 3D include in the Web + App Suites?",
    a: "Every suite is designed from scratch for your brand, with no templates, themes or UI kits. You approve the design of the key screens before building starts, and the web app and both phone apps share the same look. All three suites get smooth animations and screen transitions. Secure Business and Secure Enterprise add a 3D scene on your web app's homepage, built with Three.js like the one on my homepage. It loads after the page with a still image as a fallback, so phones stay fast. The phone apps get polished motion rather than 3D. Secure Enterprise also adds scroll-driven storytelling and custom illustrations.",
  },
  {
    q: "Will my site meet privacy and accessibility rules?",
    a: "Every website and store comes with a privacy policy, cookie notice and terms pages written for the tools it actually uses, and analytics only runs after visitors accept cookies, which is what GDPR and UK rules expect. Pages are built with readable contrast, image alt text and keyboard-friendly menus. Apps include the in-app account deletion and privacy forms Apple and Google require. For legal advice specific to your business, check with a lawyer.",
  },
  {
    q: "Why do you cost less than agencies?",
    a: "I work directly with you, with no sales team or office overheads, and I use AI-assisted tools for the repetitive parts of the build. That lets me deliver in days instead of weeks, and even the Web + App Suites cost well below what agencies quote for a web app with mobile apps: $40k–100k in the US. The design, code and testing are still done and checked by me, and Secure Enterprise is also tested by an outside security firm.",
  },
  {
    q: "Is the demo really free?",
    a: "Yes. Tell me about your business and I'll design your homepage in 3–4 hours (Mon–Sat, 10 AM–8 PM IST). If you don't like it, you don't pay anything. For apps and the Web + App Suites, the first step is a free scoping call, then a fixed written quote before any work starts.",
  },
  {
    q: "What do I need to give you?",
    a: "Your logo (if you have one), a few photos and your business details. I'll help write the text, so you don't need to prepare content.",
  },
  {
    q: "What's not included in the price?",
    a: "Only third-party fees: domain and hosting renewal after the first year (I'll quote the exact yearly cost before launch), Shopify or paid hosting for stores, apps and the Web + App Suites, payment-gateway charges, app-store developer accounts (Google Play $25 once, Apple $99 a year), and an outside VAPT test if you add one to Secure Starter or Secure Business. I'll tell you about each one upfront.",
  },
  {
    q: "Can you change a website another developer built?",
    a: `Yes, with the Fix & Upgrade plan: edits, bug fixes, mobile and speed fixes, hacked-site cleanup, form and checkout fixes, plugin updates, hosting moves and new features on existing WordPress, Shopify, WooCommerce, Wix, Squarespace, React, Next.js and PHP sites, at ${usdOf("fix-upgrade")} an hour (${formatUsd(offerPrice(planOf("fix-upgrade").usd))} during the launch offer). Share the site and what you need, and I'll estimate the hours and confirm the total before starting.`,
  },
  {
    q: "What if I need something that's not in a plan?",
    a: "Tell me what you need and I'll send a fixed quote within 24 hours. Most extras, like more pages or products, a second language or a custom booking system, are small add-ons.",
  },
];
