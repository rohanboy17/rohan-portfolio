import { NextResponse } from "next/server";
import { headers } from "next/headers";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  reason?: string;
  budget?: string;
  /** "demo" = free demo request from the search page; message is optional. */
  kind?: "demo";
  industry?: string;
  phone?: string;
  message: string;
  website?: string; // honeypot
  startedAt?: number; // anti-bot (ms timestamp)
};

const memoryRateLimit = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

async function getClientIp() {
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return h.get("x-real-ip") || "unknown";
}

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = memoryRateLimit.get(ip);
  if (!entry || entry.resetAt <= now) {
    memoryRateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= MAX_PER_WINDOW) {
    return { ok: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  memoryRateLimit.set(ip, entry);
  return { ok: true };
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  const ip = await getClientIp();
  const limited = rateLimit(ip);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: if filled, pretend success.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const isDemo = body.kind === "demo";
  const industry = (body.industry || "").trim().slice(0, 80);

  const invalid = isDemo
    ? !name || !email || !isEmail(email) || industry.length < 2
    : !name || !email || !message || !isEmail(email) || message.length < 20;
  if (invalid) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }

  // Email delivery (Resend) - optional.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      { ok: false, error: "email_not_configured" },
      { status: 501 },
    );
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const subject = isDemo
    ? `Free demo request: ${industry} ${(body.reason || "website").toLowerCase()} — ${name}`
    : `Portfolio: ${body.reason || "New message"} from ${name}`;
  const text = [
    isDemo ? "FREE DEMO REQUEST (promised within 3–4 working hours)" : "",
    `Name: ${name}`,
    `Email: ${email}`,
    body.phone ? `WhatsApp / phone: ${body.phone}` : "",
    isDemo ? `Business type: ${industry}` : "",
    body.company ? `Company: ${body.company}` : "",
    body.reason ? `${isDemo ? "Needs" : "Project"}: ${body.reason}` : "",
    body.budget ? `Budget: ${body.budget}` : "",
    "",
    message || "(no extra notes)",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
    });
  } catch (error) {
    console.error("[contact] resend send failed", error);
    const detail =
      process.env.NODE_ENV !== "production"
        ? error instanceof Error
          ? error.message
          : String(error)
        : undefined;

    return NextResponse.json(
      { ok: false, error: "email_send_failed", detail },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
