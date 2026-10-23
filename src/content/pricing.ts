/**
 * Pricing for /pricing and the homepage pricing section.
 *
 * Positioned against published price lists of low-cost Kolkata web-design firms (researched
 * Oct 2026: ₹2,999–₹8,499 for 5-page sites, often +18% GST and 5–15 days; online stores
 * ₹14,999–₹60,000; simple apps ₹14,999–₹29,999 without a backend; maintenance ~₹2,000/month).
 * The offer: about the same price, much more included, delivered in days, and a free demo
 * before paying. Change any figure here and every page updates.
 *
 * International clients see US-dollar prices worked out from the rupee price at the day's
 * exchange rate plus `internationalMarkup` (see src/lib/fx.ts), so they track the rupee.
 */
export type Plan = {
  slug: string;
  name: string;
  /** Who it's for, one line. */
  forWho: string;
  inr: string;
  /** Shown after the price, e.g. "one-time" or "starting price". */
  priceNote: string;
  delivery: string;
  popular?: boolean;
  /** First line can be "Everything in X, plus:". */
  features: string[];
  /** Small print under the features. */
  note?: string;
  /** Pre-filled WhatsApp message for the plan's button. */
  whatsapp: string;
};

/** Extra charged on top of the converted price for international clients (0.1 = 10%). */
export const internationalMarkup = 0.1;

export const plans: Plan[] = [
  {
    slug: "launch",
    name: "Launch",
    forWho: "Shops, clinics, freelancers and local businesses that need a professional site fast.",
    inr: "₹4,999",
    priceNote: "one-time",
    delivery: "Live in 2–3 days",
    features: [
      "Up to 5 custom-designed pages, no templates",
      "Mobile-first and fast (90+ speed score)",
      "Copywriting help included",
      "WhatsApp, call and enquiry-form buttons",
      "Google Maps and social links",
      "SEO setup: titles, sitemap and Google Search Console",
      "Free .in or .com domain and hosting for the first year",
      "Free SSL certificate",
      "2 rounds of changes",
      "30 days of free support",
    ],
    whatsapp: "Hi Rohan, I'm interested in the Launch website plan (₹4,999). Can I get the free homepage demo?",
  },
  {
    slug: "business",
    name: "Business",
    forWho: "Growing businesses, B2B suppliers and institutes that want more pages and to rank on Google.",
    inr: "₹9,999",
    priceNote: "one-time",
    delivery: "Live in 4–5 days",
    popular: true,
    features: [
      "Everything in Launch, plus:",
      "Up to 15 pages",
      "Edit your own text and photos (easy admin)",
      "Blog or news section",
      "On-page SEO for your key searches",
      "Google Business Profile setup",
      "Analytics and enquiry tracking",
      "3 rounds of changes",
      "60 days of free support",
    ],
    whatsapp: "Hi Rohan, I'm interested in the Business website plan (₹9,999). Can I get the free homepage demo?",
  },
  {
    slug: "store",
    name: "Online Store",
    forWho: "Brands and shops ready to sell online with payments, delivery and order management.",
    inr: "₹19,999",
    priceNote: "one-time",
    delivery: "Live in 7–10 days",
    features: [
      "Shopify, WooCommerce or a custom store",
      "Up to 50 products uploaded for you",
      "UPI, card and Razorpay payments, plus cash on delivery",
      "Shipping rules, coupons and order emails",
      "Order-on-WhatsApp button",
      "Fast, mobile-first checkout",
      "Product SEO and structured data for Google",
      "Training video so your team can manage orders",
      "60 days of free support",
    ],
    note: "Shopify plan, hosting and payment-gateway fees are paid to those providers directly, in your name.",
    whatsapp: "Hi Rohan, I'm interested in the Online Store plan (₹19,999). Can we talk about my store?",
  },
  {
    slug: "app",
    name: "App or Web App",
    forWho: "Startups and businesses that need an Android/iOS app or custom software with an admin panel.",
    inr: "₹34,999",
    priceNote: "starting price",
    delivery: "From 2–3 weeks",
    features: [
      "Android and iOS from one React Native codebase",
      "Backend API and database included",
      "Login, user roles and admin dashboard",
      "Push notifications",
      "Payments if you need them",
      "Weekly test builds you can try on your phone",
      "Google Play and App Store publishing",
      "90 days of free support",
    ],
    note: "Final price is fixed after a free scoping call, before any work starts. Store developer accounts are in your name.",
    whatsapp: "Hi Rohan, I need an app / web app. Can we book a free scoping call?",
  },
];

/** Monthly maintenance, offered after the free support period. */
export const carePlan = {
  name: "Care plan",
  inr: "₹999",
  period: "/ month",
  features: ["Updates and backups", "Uptime monitoring", "Up to 1 hour of changes every month", "Priority WhatsApp support"],
};

/** Promises that apply to every plan. */
export const everyPlan = [
  { title: "Free demo first", body: "See your homepage designed in 3–4 hours before you pay anything." },
  { title: "Pay in two parts", body: "50% after you approve the demo, 50% at launch. UPI, bank transfer, PayPal or Binance." },
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
  { label: "Support", them: "AMC from ₹2,000/month", me: "30–90 days free, then ₹999/month" },
  { label: "Who you talk to", them: "Sales or account manager", me: "The developer, directly" },
];

export const pricingFaqs = [
  {
    q: "How can the prices be this low?",
    a: "I work directly with you, with no sales team or office overheads, and I use AI-assisted tools for the repetitive parts of the build. That lets me deliver in days instead of weeks. The design, code and testing are still done and checked by me.",
  },
  {
    q: "Is the demo really free?",
    a: "Yes. Tell me about your business and I'll design your homepage in 3–4 hours (Mon–Sat, 10 AM–8 PM IST). If you don't like it, you don't pay anything.",
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
    q: "Do you work with clients outside India?",
    a: "Yes. International clients pay the USD prices shown, by PayPal, Binance or bank transfer, and we work over WhatsApp, email or video calls in your time zone.",
  },
  {
    q: "What if I need something that's not in a plan?",
    a: "Tell me what you need and I'll send a fixed quote within 24 hours. Most extras, like more pages or products, a second language or booking systems, are small add-ons.",
  },
];
