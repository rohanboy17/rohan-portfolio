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
  {
    slug: "voip-route-testing-saas-asterisk-react",
    title: "Building a VoIP route-testing SaaS with Asterisk, Node.js and React",
    metaTitle: "Building a VoIP Route-Testing SaaS with Asterisk & React",
    description:
      "How RouteQuire places test calls through Asterisk, captures CDR and SIP evidence, and turns it into dashboards, reports and an Android app.",
    published: "2026-10-23",
    project: "routequire",
    services: ["web-app-development", "mobile-app-development"],
    tags: ["SaaS", "Asterisk", "Node.js", "PostgreSQL", "React"],
    intro:
      "VoIP carriers lose money to poor routes and false answer supervision, where a route pretends a call was answered so it can bill for it. The evidence is buried in Asterisk logs and SIP traces that nobody has time to read. RouteQuire turns that evidence into something a carrier can act on and take back to its vendors.",
    sections: [
      {
        heading: "Test calls on a schedule",
        body: [
          "The core is an Express API on PostgreSQL that schedules test batches: caller IDs, destinations, routes, pacing and retries. When a batch runs, calls are originated through the Asterisk Manager Interface, so they go out over real telephony routes exactly as customer calls would.",
        ],
      },
      {
        heading: "Capturing the evidence",
        body: [
          "Every call leaves a trail. Dialplan webhooks feed CDR records, SIP traces and hangup causes back into the API, so each test result is backed by what actually happened on the wire, not just whether the call connected.",
        ],
      },
      {
        heading: "Dashboards people actually read",
        body: [
          "A React dashboard turns thousands of call records into KPIs, trend charts and route comparisons, with drill-downs into SIP errors and individual run details. Reports can be shared through token-based public links and emailed as CSV, so a carrier can send proof to a vendor without giving them an account.",
        ],
      },
      {
        heading: "A second product: Traffic Monitor",
        body: [
          "Alongside route testing, a separate Traffic Monitor transcribes inbound sample calls locally and raises alerts on scam keywords and DTMF patterns, helping carriers spot abusive traffic early.",
        ],
      },
      {
        heading: "Everything a SaaS needs",
        body: [
          {
            list: [
              "Sign-up, email verification, trials and Stripe-ready subscriptions",
              "JWT authentication, user roles and audit logs",
              "Support tickets and recording-retention rules",
              "An Android app built from the same React code with Capacitor",
              "Docker Compose deployment for self-hosting",
            ],
          },
        ],
      },
    ],
    takeaway:
      "Niche B2B tools win when they turn technical evidence into a clear decision. If your industry runs on data nobody reads, a focused SaaS with good dashboards and shareable reports can become the product your customers rely on. RouteQuire is live at routequire.com.",
  },
  {
    slug: "razorpay-wallet-ledger-nextjs-marketplace",
    title: "Real money in a Next.js marketplace: Razorpay, wallets and a ledger",
    metaTitle: "Razorpay Wallets & a Payment Ledger in Next.js",
    description:
      "How FreeEarnHub moves money safely between businesses, workers and admins: Razorpay verification, idempotent webhooks and a ledger entry for every movement.",
    published: "2026-10-23",
    project: "freeearnhub",
    services: ["web-app-development"],
    tags: ["Next.js", "Razorpay", "Payments", "Prisma", "PostgreSQL"],
    intro:
      "FreeEarnHub lets businesses pay many people for small online tasks. That means money moves in three directions: businesses fund wallets, workers earn per approved task, and admins approve withdrawals. Every step has to stay correct even when a browser closes in the middle of a payment.",
    sections: [
      {
        heading: "Three roles, three dashboards",
        body: [
          "The app is built on the Next.js App Router with NextAuth sessions and role-based routing. Users, businesses and admins each get their own flows, and the server decides what each role can see and do.",
        ],
      },
      {
        heading: "Funding wallets through Razorpay",
        body: [
          "Businesses top up their wallet with Razorpay. The server creates the payment order, and when the payment completes it verifies Razorpay's signature on the server, never trusting the browser to say a payment succeeded.",
          "If the customer closes the tab before the confirmation reaches the app, a Razorpay webhook settles the payment anyway. Settlement is idempotent: processing the same payment twice can't credit the wallet twice.",
        ],
      },
      {
        heading: "A ledger entry for every rupee",
        body: [
          "Wallet balances aren't a number that gets overwritten. Every credit and debit is written as a ledger entry, double-entry style, inside an atomic database transaction. The balance can always be explained, line by line, which is what you want the day someone asks where their money went.",
        ],
      },
      {
        heading: "Tasks, reviews and withdrawals",
        body: [
          {
            list: [
              "Businesses post tasks; workers submit proof",
              "Submissions are reviewed before any money moves",
              "Approved work credits the worker's wallet through the ledger",
              "Withdrawals go through admin approval, with a treasury view of all funds",
            ],
          },
          "Prisma models the wallets, ledger, tasks, submissions and payment orders on Neon PostgreSQL, with uploads stored on Cloudinary.",
        ],
      },
    ],
    takeaway:
      "If your product touches money, design the ledger and the failure cases before the screens: verify payments on the server, make webhooks idempotent and record every movement. That's what makes a payments feature trustworthy.",
  },
  {
    slug: "private-jet-charter-booking-platform-php-wordpress",
    title: "Building a private-jet charter booking platform in PHP and WordPress",
    metaTitle: "Building a Private-Jet Charter Booking Platform",
    description:
      "How Jetseasyy was built: multi-city search over 71,000+ airports, server-calculated quotes, accounts and an admin desk, then moved onto WordPress for launch.",
    published: "2026-10-23",
    project: "jetseasyy",
    services: ["web-app-development", "wordpress-development"],
    tags: ["PHP", "SQLite", "WordPress", "Booking", "Travel"],
    intro:
      "A private-aviation startup wanted the full experience of an established charter-booking platform it admired, under its own brand: search, quotes, accounts and the content that helps buyers decide. I rebuilt that experience from scratch, then moved it onto WordPress so the team could run it themselves.",
    sections: [
      {
        heading: "Search that understands charter trips",
        body: [
          "Charter buyers don't just book A to B. The search supports one-way, round-trip and multi-city trips, with airport suggestions drawn from more than 71,000 open airports and heliports, passenger controls and aircraft types. Each request is checked against route range and cabin capacity before a server-calculated estimate is shown.",
        ],
      },
      {
        heading: "From search to a real enquiry",
        body: [
          "Quote requests get a reference number, and contact, enterprise, operator, membership and support forms all land in one admin desk. There, the team updates request status, manages aircraft availability and pricing, and answers support messages.",
        ],
      },
      {
        heading: "Accounts done properly",
        body: [
          "Customers can register, sign in, edit their profile and see their own request history. Password resets use expiring, single-use links. Private attachments are only downloadable by the people allowed to see them.",
        ],
      },
      {
        heading: "Content that sells the service",
        body: [
          {
            list: [
              "An aircraft catalogue with category filters and load-more browsing",
              "Searchable airport, city, state and country directories",
              "An article library with category filters",
              "A catering menu with categories, a cart and server-side pricing",
            ],
          },
        ],
      },
      {
        heading: "Built in PHP, launched on WordPress",
        body: [
          "The first version is plain HTML, CSS and JavaScript on PHP 8.3 with SQLite, which made it fast to build and test locally. For launch, I moved it onto WordPress with a custom theme and a core plugin, plus migration tooling, so the client's team can edit pages and manage content without a developer.",
        ],
      },
    ],
    takeaway:
      "Booking products live or die on the search and the follow-up. Get the trip logic, quote flow and admin desk right first; the CMS can come later. Jetseasyy is live at jetseasyy.com.",
  },
  {
    slug: "kotak-neo-amibroker-realtime-data-bridge",
    title: "Streaming Kotak Neo market data into AmiBroker in real time",
    metaTitle: "Kotak Neo to AmiBroker: a Real-Time Data Bridge",
    description:
      "How I connected the Kotak Neo Trade API to AmiBroker: a Python Windows service, a C++ data plugin, named pipes, and honest rules for history and limits.",
    published: "2026-10-23",
    project: "kotak-amibroker-bridge",
    services: ["web-app-development"],
    tags: ["Python", "C++", "Trading", "Windows", "API integration"],
    intro:
      "A trader wanted live one-minute candles from the Kotak Neo Trade API inside AmiBroker, which has no native connector for it. The result is a market-data bridge: a Python Windows service that talks to Kotak, and a C++ AmiBroker plugin that reads from it. It's market-data only; the source contains no order placement, modification or cancellation calls.",
    sections: [
      {
        heading: "Two programs, one job each",
        body: [
          "The 64-bit Python service owns everything network-related: the Kotak connection, building one-minute bars, local history and the control interface. The AmiBroker plugin is a 32-bit (x86) C++ DLL, because that's what AmiBroker Standard needs. Keeping them separate means a network hiccup can never freeze the charting software.",
        ],
      },
      {
        heading: "Talking over named pipes",
        body: [
          "The service and plugin communicate over local Windows named pipes using a small, versioned binary protocol, with separate pipes for data and control. Pipe input and output run on worker threads, and AmiBroker's entry points only read thread-safe caches, so they never wait on Kotak or the database.",
        ],
      },
      {
        heading: "Honest history",
        body: [
          "Kotak's scoped Trade API has no documented historical-candle endpoint, so the bridge builds its own history and is careful about it:",
          {
            list: [
              "One-minute bars are stored locally in SQLite with write-ahead logging",
              "The live minute is checkpointed every five seconds",
              "365 days are retained by default",
              "Candles are never invented to fill an outage; legitimate CSV history can be imported",
            ],
          },
          "AmiBroker then builds 5-minute, 15-minute, hourly, daily and higher charts from the one-minute data.",
        ],
      },
      {
        heading: "Respecting account limits",
        body: [
          "The architecture supports up to 3,000 instruments across channels, but a new account stays at 200 until a live capacity probe proves the account can subscribe to more. A failed or inconclusive probe changes nothing, and the service never silently drops instruments. A Nifty 500 import is staged until the limit allows it.",
        ],
      },
      {
        heading: "Security for a trading login",
        body: [
          "Only the consumer key, client code and mobile number are stored, in a restricted file. The TOTP, MPIN and session tokens are never saved: they're entered each morning through hidden prompts and kept only in memory. Logs redact every secret, and release builds refuse to package real secrets or databases.",
        ],
      },
    ],
    takeaway:
      "Connecting two systems that were never designed to talk is mostly about reliability and honesty: isolate the risky parts, never fake data, and treat credentials as untouchable. If you need two of your tools to share data, a small bridge like this is often faster than replacing either one.",
  },
  {
    slug: "n8n-instagram-influencer-discovery-automation",
    title: "Automating Instagram influencer discovery with n8n, Apify and OpenAI",
    metaTitle: "Instagram Influencer Discovery with n8n & Apify",
    description:
      "An n8n workflow that finds Instagram influencers by hashtag, filters out small accounts, sorts them with AI and saves an Excel file to Google Drive.",
    published: "2026-10-23",
    project: "instagram-influencer-automation",
    services: ["web-app-development"],
    tags: ["n8n", "Automation", "Apify", "OpenAI", "Google Drive"],
    intro:
      "Finding influencers by hand means scrolling a hashtag for hours, opening profiles and copying numbers into a spreadsheet. This n8n workflow does it automatically: give it a hashtag and it returns a clean Excel file of creators above your follower threshold, saved to Google Drive.",
    sections: [
      {
        heading: "Start it however you like",
        body: [
          "The workflow can run three ways: a manual trigger for testing, a webhook that accepts a hashtag and settings from a form or app, or a daily schedule. Runtime settings such as the hashtag, minimum followers and number of posts are set in one place, with sensible defaults.",
        ],
      },
      {
        heading: "Collecting data the compliant way",
        body: [
          "Instead of scraping Instagram's pages directly, the workflow starts an Apify actor run, waits and polls until it finishes, then fetches the dataset. It only collects public data, and the project notes are explicit that the output must not be used for spam.",
        ],
      },
      {
        heading: "Cleaning and scoring",
        body: [
          {
            list: [
              "The hashtag is validated and normalised first",
              "Results are cleaned, normalised and de-duplicated",
              "Each profile gets a quality score",
              "Only accounts above the follower threshold (10,000 by default) are kept",
            ],
          },
        ],
      },
      {
        heading: "Optional AI categorisation",
        body: [
          "If an OpenAI key is configured, each creator can be categorised automatically, so a brand can jump straight to, say, fitness or food creators instead of reading every bio.",
        ],
      },
      {
        heading: "Delivered where the team works",
        body: [
          "The final rows are turned into an XLSX file with a dated filename and uploaded to Google Drive. Optionally it's emailed as an attachment through Gmail, or appended to a Google Sheet. API keys live in n8n credentials or environment variables, never hard-coded in the workflow.",
        ],
      },
    ],
    takeaway:
      "If your team repeats the same research or data-entry every week, it can usually be automated with n8n and a couple of APIs. The time saved compounds, and the result arrives in the tools you already use.",
  },
  {
    slug: "truck-parts-storefront-sku-search-wordpress",
    title: "A truck-parts storefront with SKU search and a vehicle-fit selector",
    metaTitle: "Truck-Parts Store: SKU Search & Vehicle-Fit Selector",
    description:
      "How TruckMate Parts helps buyers find the right part by SKU, OEM number or vehicle, shipped both as a fast static site and as an editable WordPress theme.",
    published: "2026-10-23",
    project: "truckmate-parts",
    services: ["ecommerce-development", "wordpress-development"],
    tags: ["E-commerce", "WordPress", "JavaScript", "Auto parts"],
    intro:
      "People buying truck parts don't browse. They arrive with a part number or a vehicle, and they want to know in seconds whether it fits. A generic shop layout handles that badly, so TruckMate Parts was designed around search first.",
    sections: [
      {
        heading: "Search by the numbers buyers actually have",
        body: [
          "The search box instantly matches SKUs, manufacturer part numbers (MPN), OEM numbers and alternative references, so a mechanic can paste the number from an old part and find the replacement straight away.",
        ],
      },
      {
        heading: "Will it fit my truck?",
        body: [
          "A year, make and model selector narrows the catalogue to parts compatible with the buyer's vehicle. A multi-column category mega menu covers browsing on desktop, with collapsible navigation on phones.",
        ],
      },
      {
        heading: "A cart that doesn't slow you down",
        body: [
          "Adding to the cart opens a drawer with live totals instead of reloading the page, so buyers can add several parts in a row. Product cards, counters, a brand marquee and an FAQ add motion and trust, all respecting reduced-motion settings.",
        ],
      },
      {
        heading: "Two deliverables from one design",
        body: [
          "The storefront ships as a fast static build on Vercel, with security and asset-cache headers, and as a native WordPress theme:",
          {
            list: [
              "Products and product categories are managed in WordPress",
              "Pages, navigation, logo and hero copy are editable",
              "Product search in WordPress understands SKUs",
              "Newsletter sign-ups are stored in a Subscribers section",
              "Activating the theme creates the starting pages, categories and sample products",
            ],
          },
        ],
      },
    ],
    takeaway:
      "For parts, spares and any catalogue where buyers know exactly what they need, design for search first: part numbers, compatibility and a quick cart. That's what turns visits into orders.",
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
