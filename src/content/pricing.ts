/**
 * Pricing for /pricing and the homepage pricing section.
 *
 * Positioned against published price lists of low-cost Kolkata web-design firms (researched
 * Oct 2026: ₹2,999–₹8,499 for 5-page sites, often +18% GST and 5–15 days; online stores
 * ₹14,999–₹60,000; simple apps ₹14,999–₹29,999 without a backend; maintenance ~₹2,000/month).
 * The offer: about the same price, much more included, delivered in days, and a free demo
 * before paying. Change any figure here and every page updates.
 *
 * The Web + App Suites sit above that, against Kolkata agencies and app studios (researched
 * Nov 2026: web + Android + iOS products ₹3–8 lakh, complex ₹8–20 lakh; cross-platform apps
 * from ₹80k–₹2 lakh; mid-size firms $5–10k minimums, top firms $25k+; web-app maintenance
 * ₹8k–25k/month; an outside VAPT ₹25k–60k for a small web app, ₹50k–1.5 lakh per mobile app).
 *
 * International clients see US-dollar prices worked out from the rupee price at the day's
 * exchange rate plus `internationalMarkup` (see src/lib/fx.ts), so they track the rupee.
 */
export type Plan = {
  slug: string;
  name: string;
  /** Who it's for, one line. */
  forWho: string;
  /** Business types this plan suits best, shown as tags on the card. */
  bestFor: string[];
  inr: string;
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

/** Extra charged on top of the converted price for international clients (0.1 = 10%). */
export const internationalMarkup = 0.1;

export const plans: Plan[] = [
  {
    slug: "launch",
    name: "Launch",
    forWho: "You need a professional site so customers can find you, trust you and call or WhatsApp you.",
    bestFor: ["Clinics & doctors", "Salons & gyms", "Restaurants & cafés", "Local shops & services", "Freelancers & coaches"],
    inr: "₹4,999",
    priceNote: "one-time",
    delivery: "Live in 2–3 days",
    freeSupport: "30 days",
    care: "care",
    features: [
      "Up to 5 custom-designed pages, no templates",
      "Mobile-first and fast (90+ speed score)",
      "Copywriting help included",
      "WhatsApp, call and enquiry-form buttons",
      "Google Maps and social links",
      "Free .in or .com domain and hosting for the first year",
      "Free SSL certificate",
      "2 rounds of changes",
    ],
    instead: { when: "Need Google SEO and listings, more pages or to edit the site yourself?", slug: "business" },
    cta: "Get my free demo",
    whatsapp: "Hi Rohan, I'm interested in the Launch website plan (₹4,999). Can I get the free homepage demo?",
  },
  {
    slug: "business",
    name: "Business",
    forWho: "You want to rank on Google, show many services or products, and edit the site yourself.",
    bestFor: ["Manufacturers & B2B suppliers", "Schools & coaching centres", "Real estate & builders", "Hotels & travel agents", "CA, law & consulting firms"],
    inr: "₹9,999",
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
      "Analytics and enquiry tracking",
      "3 rounds of changes",
    ],
    instead: { when: "Want customers to pay and order on the site?", slug: "store" },
    cta: "Get my free demo",
    whatsapp: "Hi Rohan, I'm interested in the Business website plan (₹9,999). Can I get the free homepage demo?",
  },
  {
    slug: "store",
    name: "Online Store",
    forWho: "You want customers to pick products, pay online and get them delivered to their door.",
    bestFor: ["Clothing & boutiques", "Beauty & skincare", "Jewellery & handicrafts", "Food & organic products", "D2C brands"],
    inr: "₹19,999",
    priceNote: "one-time",
    delivery: "Live in 7–10 days",
    freeSupport: "90 days",
    care: "care",
    features: [
      "Shopify, WooCommerce or a custom store",
      "Up to 50 products uploaded for you",
      "UPI, card and Razorpay payments, plus cash on delivery",
      "Shipping rules, coupons and order emails",
      "Order-on-WhatsApp button",
      "Fast, mobile-first checkout",
      "SEO setup: titles, sitemap, Search Console and product structured data",
      "Google Business Profile, Bing Places and Apple Maps listings set up",
      "Training video so your team can manage orders",
    ],
    note: "Shopify plan, hosting and payment-gateway fees are paid to those providers directly, in your name.",
    instead: { when: "Need bookings, customer accounts or a mobile app?", slug: "app" },
    cta: "Get my free demo",
    whatsapp: "Hi Rohan, I'm interested in the Online Store plan (₹19,999). Can we talk about my store?",
  },
  {
    slug: "app",
    name: "App or Web App",
    forWho: "Your idea needs logins, bookings, dashboards or an app on Google Play and the App Store.",
    bestFor: ["Startups & SaaS", "Booking & appointment systems", "Delivery & tracking apps", "School, clinic & HR portals", "Marketplaces & CRMs"],
    inr: "₹34,999",
    from: true,
    priceNote: "starting price",
    delivery: "From 2–3 weeks",
    freeSupport: "120 days",
    care: "care",
    features: [
      "Android and iOS from one React Native codebase",
      "Backend API and database included",
      "Login, user roles and admin dashboard",
      "Push notifications",
      "Payments if you need them",
      "Weekly test builds you can try on your phone",
      "Google Play and App Store publishing",
      "SEO for the web pages and app-store listings",
      "Google Business Profile, Bing Places and Apple Maps listings set up",
    ],
    note: "Final price is fixed after a free scoping call, before any work starts. Store developer accounts are in your name.",
    instead: { when: "Need a web app and mobile app together, security-tested?", slug: "secure-starter" },
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
    forWho: "You're launching a product on the web and on phones at the same time, and it has to be safe from day one.",
    bestFor: ["Startups & MVPs", "Booking & membership apps", "Local service platforms"],
    inr: "₹59,999",
    priceNote: "one-time",
    delivery: "From 4–6 weeks",
    freeSupport: "6 months",
    care: "suite-care",
    features: [
      "Web app plus Android and iOS app (one React Native codebase) on a shared backend",
      "Up to 10 screens per app, with customer and admin roles",
      "OTP login and an admin dashboard",
      "Push notifications",
      "Security hardening: HTTPS everywhere, hashed passwords, role-based access, rate limiting",
      "Automated vulnerability scan and a written security report",
      "Daily encrypted backups",
      "Google Play and App Store publishing",
      "SEO for the web app and app-store listings",
      "Google Business Profile, Bing Places and Apple Maps listings set up",
    ],
    note: "An outside VAPT test is available as an add-on, quoted at cost. Paid in milestones agreed on the scoping call.",
    instead: { when: "Taking payments or handling customer data?", slug: "secure-business" },
    cta: "Book a free scoping call",
    whatsapp: "Hi Rohan, I'm interested in the Secure Starter suite (₹59,999). Can we book a free scoping call?",
  },
  {
    slug: "secure-business",
    name: "Secure Business",
    forWho: "Your customers pay you or trust you with personal data, so security has to be built in from the first screen.",
    bestFor: ["Clinics & healthcare", "Finance & insurance", "Logistics & delivery", "E-learning platforms"],
    inr: "₹99,999",
    priceNote: "one-time",
    delivery: "From 6–8 weeks",
    freeSupport: "9 months",
    care: "suite-care",
    popular: true,
    features: [
      "Everything in Secure Starter, plus:",
      "Up to 25 screens per app, with multiple roles and permissions",
      "UPI and card payments",
      "Two-factor login and audit logs",
      "Reports and analytics dashboard",
      "Staging environment and automated tests",
    ],
    note: "An outside VAPT test is available as an add-on, quoted at cost. Paid in milestones agreed on the scoping call. Store accounts and payment-gateway fees are in your name.",
    instead: { when: "Need integrations, offline mode or an outside security test included?", slug: "secure-enterprise" },
    cta: "Book a free scoping call",
    whatsapp: "Hi Rohan, I'm interested in the Secure Business suite (₹99,999). Can we book a free scoping call?",
  },
  {
    slug: "secure-enterprise",
    name: "Secure Enterprise",
    forWho: "Your platform runs complex workflows, connects to other systems or has to meet strict data rules.",
    bestFor: ["Hospitals & labs", "Fintech & NBFCs", "Manufacturing & ERP", "Multi-branch businesses"],
    inr: "₹1,99,999",
    priceNote: "one-time",
    delivery: "From 10–12 weeks",
    freeSupport: "12 months",
    care: "suite-care",
    features: [
      "Everything in Secure Business, plus:",
      "Complex workflows and approval chains",
      "Integrations with your ERP, CRM, payment or logistics systems",
      "Offline mode and real-time updates",
      "Encryption of sensitive fields and admin IP allow-listing",
      "Load testing and a disaster-recovery plan",
      "Outside VAPT test of the web app, API and both mobile apps, with a certificate",
      "Priority response throughout the free year",
    ],
    note: "Paid in milestones agreed on the scoping call. Store accounts and payment-gateway fees are in your name.",
    instead: { when: "Want to launch smaller first and grow into this later?", slug: "secure-starter" },
    cta: "Book a free scoping call",
    whatsapp: "Hi Rohan, I'm interested in the Secure Enterprise suite (₹1,99,999). Can we book a free scoping call?",
  },
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
    inr: "₹999",
    priceNote: "per month",
    features: [
      "Updates and backups",
      "Uptime monitoring",
      "Monthly SEO health check and fixes",
      "Google Business Profile and other listings kept up to date",
      "Up to 1 hour of changes every month",
      "Priority WhatsApp support",
    ],
    note: "Starts when the free support on Launch, Business, Online Store or App ends. Cancel anytime.",
    cta: "Start Care",
    whatsapp: "Hi Rohan, I'd like the Care plan (₹999/month) for my website.",
  },
  {
    slug: "suite-care",
    name: "Suite Care",
    forWho: "Your Web + App Suite is live and its free support has ended. I keep the web app, backend and both apps running and patched.",
    bestFor: ["Secure Starter", "Secure Business", "Secure Enterprise"],
    inr: "₹9,999",
    priceNote: "per month",
    features: [
      "Hosting for the web app and backend",
      "App updates for new iOS and Android releases",
      "Security patches and dependency updates",
      "Uptime and error monitoring",
      "Daily backups",
      "SEO and app-store listing upkeep",
      "Google Business Profile and other listings kept up to date",
      "Up to 8 hours of changes every month",
      "Priority WhatsApp support",
    ],
    note: "Starts when a suite's free support ends. Cancel anytime. Heavy-traffic hosting, store accounts and payment-gateway fees are billed at cost.",
    cta: "Start Suite Care",
    whatsapp: "Hi Rohan, I'd like Suite Care (₹9,999/month) for my web app and mobile app.",
  },
  {
    slug: "fix-upgrade",
    name: "Fix & Upgrade",
    forWho: "Have a website built by another developer or agency? Get it edited, fixed or extended without starting over.",
    bestFor: ["Sites built by someone else", "Outdated or slow sites", "Broken pages, forms or checkout"],
    inr: "₹1,999",
    from: true,
    priceNote: "per request",
    features: [
      "Text, image and layout edits",
      "Bug and broken-page fixes",
      "New sections, pages or features",
      "WordPress, Shopify, React / Next.js and PHP sites",
    ],
    note: "Starting price. Send me the site and what you need, and I'll confirm a fixed price before any work starts. Built your site with me? Changes are covered by your free support, then Care or Suite Care.",
    cta: "Request a change",
    whatsapp: "Hi Rohan, I have an existing website and need some changes (Fix & Upgrade). Can you take a look?",
  },
];

/** "Which plan fits your business?" guide on /pricing. `plan` is a slug from `plans`, `suites` or `ongoingPlans`. */
export const planGuide: { business: string; plan: string; why: string }[] = [
  {
    business: "Clinic, salon, gym, restaurant or local shop",
    plan: "launch",
    why: "Customers mostly want your services, timings and location, and a quick way to call or WhatsApp you.",
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
  { business: "Clothing, beauty, jewellery or handicraft brand", plan: "store", why: "Customers browse, pay by UPI or card, and you manage every order in one place." },
  { business: "Food, sweets or grocery seller", plan: "store", why: "Online orders with delivery areas, cash on delivery and order-on-WhatsApp." },
  { business: "Business that needs a full booking or appointment system", plan: "app", why: "Customer accounts, live calendars, reminders and online payments need custom software. A simple booking form is a small add-on to any plan." },
  { business: "Startup, marketplace or SaaS idea", plan: "app", why: "Sign-ups, user roles, an admin dashboard and a product built to grow." },
  { business: "Company that needs a portal, CRM or internal tool", plan: "app", why: "Custom workflows for your team, with logins and reports." },
  {
    business: "Startup launching on the web and on phones together",
    plan: "secure-starter",
    why: "One backend powers the web app and both mobile apps, hardened and scanned before launch, with 6 months of free support.",
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

/** "Typical low-cost agency vs me", from published Kolkata price lists (Oct 2026). */
export const comparison: { label: string; them: string; me: string }[] = [
  { label: "5-page website", them: "₹5,000–8,500, often +18% GST", me: "₹4,999" },
  { label: "Delivery", them: "5–15 working days", me: "2–3 days" },
  { label: "See it before you pay", them: "No", me: "Free homepage demo in 3–4 hours" },
  { label: "Design", them: "Mostly ready-made templates", me: "Custom-designed and hand-coded" },
  { label: "Copywriting", them: "Extra charge", me: "Help included" },
  { label: "Domain and hosting", them: "Hosting ₹1,000–3,500 a year, domain extra", me: "Both free for the first year" },
  {
    label: "Secure web app + mobile app",
    them: "₹3–8 lakh at Kolkata agencies; outside security test extra (₹25k–1.5 lakh)",
    me: "₹59,999–₹1,99,999, outside security test included in Secure Enterprise",
  },
  { label: "Support", them: "AMC from ₹2,000/month", me: "30 days to 12 months free, then from ₹999/month" },
  { label: "Who you talk to", them: "Sales or account manager", me: "The developer, directly" },
];

export const pricingFaqs = [
  {
    q: "Which plan should I choose?",
    a: "If customers mainly need to find you and contact you, choose Launch. If you want to rank on Google with many pages and edit the site yourself, choose Business. If customers should pay and order online, choose Online Store. If you need logins, bookings, dashboards or a mobile app, choose App or Web App. If you need a web app and mobile apps together with tested security, choose one of the Web + App Suites. Still not sure? Tell me what your business does and I'll recommend the cheapest plan that does the job.",
  },
  {
    q: "How long is the free support?",
    a: "30 days on Launch, 60 days on Business, 90 days on Online Store and 120 days on App or Web App, counted from launch. After that, the Care plan keeps your site updated, backed up and monitored, keeps its SEO and Google Business Profile in shape, and includes an hour of changes every month, for ₹999 a month. The Web + App Suites include much longer support: 6 months on Secure Starter, 9 months on Secure Business and 12 months on Secure Enterprise, then Suite Care at ₹9,999 a month.",
  },
  {
    q: "What does \"high security\" include in the Web + App Suites?",
    a: "Every suite is hardened as it's built: HTTPS everywhere, hashed passwords, role-based access, rate limiting, encrypted backups, plus an automated vulnerability scan and a written security report. Secure Business adds two-factor login and audit logs, and Secure Enterprise adds field encryption, IP allow-listing, load testing and a disaster-recovery plan. A VAPT (vulnerability assessment and penetration test) by an independent security firm is included in Secure Enterprise, covering the web app, API and both mobile apps, with a certificate. Any issues it finds are fixed and retested. For Secure Starter and Secure Business, it's an add-on quoted at cost.",
  },
  {
    q: "Why do you cost less than agencies?",
    a: "I work directly with you, with no sales team or office overheads, and I use AI-assisted tools for the repetitive parts of the build. That lets me deliver in days instead of weeks, and even the Web + App Suites cost well below the ₹3–8 lakh Kolkata agencies quote for a web app with mobile apps. The design, code and testing are still done and checked by me, and Secure Enterprise is also tested by an outside security firm.",
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
    a: "Only third-party fees: domain and hosting renewal after the first year (I'll quote the exact yearly cost before launch), Shopify or paid hosting for stores and apps, payment-gateway charges, and app-store developer accounts (Google Play $25 once, Apple $99 a year). I'll tell you about each one upfront.",
  },
  {
    q: "Can you change a website another developer built?",
    a: "Yes, with the Fix & Upgrade plan. Edits, fixes and new features on existing WordPress, Shopify, React, Next.js and PHP sites start at ₹1,999 per request. Share the site and what you need, and I'll confirm a fixed price before starting.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. International clients pay the USD prices shown, by PayPal, Binance or bank transfer, and we work over WhatsApp, email or video calls in your time zone.",
  },
  {
    q: "What if I need something that's not in a plan?",
    a: "Tell me what you need and I'll send a fixed quote within 24 hours. Most extras, like more pages or products, a second language or a simple booking form, are small add-ons.",
  },
];
