"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const REASONS = [
  "Website",
  "Mobile app",
  "Online store / e-commerce",
  "Web app / SaaS",
  "WordPress",
  "Full-time role",
  "Something else",
];

const BUDGETS = ["Not sure yet", "Under $500", "$500 – $2,000", "$2,000 – $5,000", "$5,000+"];

const field =
  "mt-2 w-full rounded-2xl border border-line bg-white/[0.03] px-4 py-3 text-base text-white outline-none sm:text-sm transition placeholder:text-white/30 focus:border-lilac/60 focus:bg-white/[0.05]";

/** Takes the fallback email as a prop so profile.ts stays out of the client bundle. */
export default function ContactForm({ email }: { email: string }) {
  const startedAtRef = useRef<number | null>(null);
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(null);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, startedAt: startedAtRef.current ?? undefined }),
    }).catch(() => null);

    if (res?.ok) {
      setState("success");
      form.reset();
      return;
    }

    const data = ((await res?.json().catch(() => ({}))) ?? {}) as { error?: string };
    setState("error");

    if (data.error === "rate_limited") {
      setError("Too many messages. Please wait a minute and try again.");
    } else if (data.error === "validation_failed") {
      setError("Please fill in your name, a valid email and a message of at least 20 characters.");
    } else {
      // Email service not configured or failed — never leave the visitor stuck.
      setError(`Couldn't send right now. Please email me directly at ${email}.`);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-white/80">Name</span>
          <input name="name" required minLength={2} autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-white/80">Email</span>
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            className={field}
            placeholder="you@company.com"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-white/80">What do you need?</span>
          <select name="reason" className={field} defaultValue={REASONS[0]}>
            {REASONS.map((r) => (
              <option key={r} value={r} className="bg-surface">
                {r}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-white/80">Budget (optional)</span>
          <select name="budget" className={field} defaultValue={BUDGETS[0]}>
            {BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-surface">
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-white/80">Company or website (optional)</span>
        <input name="company" autoComplete="organization" className={field} placeholder="Company name or current website" />
      </label>

      {/* Honeypot: hidden from people, filled by bots */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <label className="block">
        <span className="text-sm font-medium text-white/80">Message</span>
        <textarea
          name="message"
          required
          minLength={20}
          rows={5}
          className={`${field} resize-none`}
          placeholder="What do you want to build? Goals, features, deadline, links to sites you like…"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="btn-clay inline-flex w-full items-center justify-center gap-2 rounded-full bg-lilac px-7 py-3.5 font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {state === "submitting" ? "Sending…" : "Send message"} <Send size={16} />
        </button>
        <p role="status" className="text-center text-sm text-muted sm:text-left">
          {state === "success" ? "Thanks! I'll get back to you soon. 🎉" : error ?? ""}
        </p>
      </div>
    </form>
  );
}
