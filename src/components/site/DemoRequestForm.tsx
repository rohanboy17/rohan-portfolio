"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Send } from "lucide-react";

const NEEDS = ["Website", "Online store", "Mobile app", "Web app"];

const field =
  "mt-2 w-full rounded-2xl border border-line bg-white/[0.03] px-4 py-3 text-base text-white outline-none sm:text-sm transition placeholder:text-white/30 focus:border-lilac/60 focus:bg-white/[0.05]";

type State = "idle" | "submitting" | "success" | "error";

/** Short "free demo" request. Posts to /api/contact with kind "demo"; same email, rate limit and anti-bot checks. */
export default function DemoRequestForm({ business, email }: { business: string; email: string }) {
  const startedAt = useRef<number | null>(null);
  const [need, setNeed] = useState(NEEDS[0]);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, kind: "demo", reason: need, startedAt: startedAt.current ?? undefined }),
    }).catch(() => null);

    if (res?.ok) {
      setState("success");
      form.reset();
      return;
    }
    const body = ((await res?.json().catch(() => ({}))) ?? {}) as { error?: string };
    setState("error");
    setError(
      body.error === "rate_limited"
        ? "Too many requests. Please wait a minute and try again."
        : body.error === "validation_failed"
          ? "Please add your business type and a valid email."
          : `Couldn't send right now. Please email me at ${email}.`,
    );
  }

  if (state === "success") {
    return (
      <p role="status" className="mt-6 rounded-2xl border border-mint/30 bg-mint/10 px-4 py-3 text-mint">
        Thanks! Your request is in. I&apos;ll send your free {business} demo as promised.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-white/80">Business type</span>
          <input name="industry" required minLength={2} defaultValue={business} className={field} placeholder="e.g. Hotel, dental clinic" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-white/80">Business name (optional)</span>
          <input name="company" autoComplete="organization" className={field} placeholder="Your business name" />
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-white/80">What do you need?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {NEEDS.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={need === n}
              onClick={() => setNeed(n)}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                need === n ? "border-lilac/60 bg-lilac/15 text-white" : "border-line bg-white/5 text-muted hover:text-white",
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-white/80">Your name</span>
          <input name="name" required minLength={2} autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-white/80">Email</span>
          <input name="email" required type="email" autoComplete="email" className={field} placeholder="you@company.com" />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-white/80">WhatsApp / phone (optional)</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="+1 555 123 4567" />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-white/80">Anything I should know? (optional)</span>
        <textarea name="message" rows={3} className={`${field} resize-none`} placeholder="Your current website, brand colours, sites you like…" />
      </label>

      {/* Honeypot: hidden from people, filled by bots */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="btn-clay inline-flex items-center justify-center gap-2 rounded-full bg-lilac px-6 py-3 font-semibold text-ink disabled:opacity-60"
        >
          {state === "submitting" ? "Sending…" : "Send my demo request"} <Send size={16} />
        </button>
        {error ? (
          <p role="alert" className="text-sm text-pink">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
