"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="clay flex w-full items-center gap-2 rounded-full p-1.5 pl-5">
      <a href={`mailto:${email}`} className="min-w-0 flex-1 truncate text-left text-sm font-medium hover:text-lilac sm:text-base">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email"}
        className="btn-clay inline-flex shrink-0 items-center gap-1.5 rounded-full bg-lilac px-4 py-2.5 text-sm font-semibold text-ink"
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
