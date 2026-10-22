"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowRight, Search, Sparkles, X } from "lucide-react";
import { businessLabel, loadSearchIndex, search, type SearchIndex } from "@/lib/search";

const MAX = 6;

/** Quick search dialog opened from the header (Ctrl/⌘+K). Loaded on demand by SearchLauncher. */
export default function SearchPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadSearchIndex().then(setIndex).catch(() => {});
    input.current?.focus();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, []);

  const result = useMemo(() => (index && q.trim() ? search(index, q) : null), [index, q]);
  const docs = useMemo(() => new Map(index?.docs.map((d) => [d.slug, d])), [index]);
  const hits = (result?.hits ?? []).slice(0, MAX).map((h) => docs.get(h.slug)!);

  // Every selectable row, in order: results, then the "see all" / demo actions.
  const workUrl = (params: Record<string, string>, hash = "") => `/work?${new URLSearchParams(params).toString()}${hash}`;
  const rows: { key: string; href: string }[] = [
    ...hits.map((d) => ({ key: d.slug, href: `/projects/${d.slug}` })),
    ...(result?.demoFor ? [{ key: "demo", href: workUrl({ q: q.trim() }, "#demo") }] : []),
    ...(q.trim() ? [{ key: "all", href: workUrl({ q: q.trim() }) }] : []),
  ];
  const activeIndex = Math.min(active, Math.max(rows.length - 1, 0));

  function go(href: string) {
    onClose();
    const url = new URL(href, window.location.origin);
    if (url.pathname === "/work" && pathname === "/work") {
      // Already on /work: update its URL-driven filters in place.
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      window.dispatchEvent(new PopStateEvent("popstate"));
      if (url.hash) document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown" && rows.length) {
      e.preventDefault();
      setActive((activeIndex + 1) % rows.length);
    } else if (e.key === "ArrowUp" && rows.length) {
      e.preventDefault();
      setActive((activeIndex - 1 + rows.length) % rows.length);
    } else if (e.key === "Enter" && rows[activeIndex]) {
      e.preventDefault();
      go(rows[activeIndex].href);
    } else if (e.key === "Tab") {
      // Keep focus inside the dialog.
      const focusable = dialog.current?.querySelectorAll<HTMLElement>("input, button, a[href]");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  const rowClass = (key: string) =>
    clsx(
      "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition",
      rows[activeIndex]?.key === key ? "bg-white/10" : "hover:bg-white/5",
    );
  const label = businessLabel(q) || q.trim();

  return (
    <div className="fixed inset-0 z-70 flex items-start justify-center bg-ink/70 px-3 pt-[10vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Search projects"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className="clay w-full max-w-xl overflow-hidden rounded-[28px]"
        // `.clay` would otherwise leave the dialog see-through (see SiteHeader SOLID).
        style={{ background: "linear-gradient(180deg, rgb(255 255 255 / 0.065), rgb(255 255 255 / 0.02)), var(--color-ink)" }}
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search size={18} className="shrink-0 text-muted" aria-hidden />
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Search projects: hotel, jewelry, Shopify, Android app…"
            aria-label="Search projects"
            aria-controls="search-results"
            autoComplete="off"
            className="h-14 w-full bg-transparent text-base text-white outline-none placeholder:text-white/35"
            // The open dialog already shows where focus is; the global focus ring would draw a box inside it.
            style={{ outline: "none" }}
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted hover:bg-white/10 hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div id="search-results" className="max-h-[60vh] overflow-y-auto p-2">
          {!index ? (
            <p className="px-3 py-6 text-center text-sm text-muted">Loading…</p>
          ) : !q.trim() ? (
            <div className="p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Browse by industry</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {index.industries
                  .filter((i) => i.sectors.some((s) => s.count))
                  .map((i) => (
                    <button
                      key={i.slug}
                      type="button"
                      onClick={() => go(workUrl({ industry: i.slug }))}
                      className="rounded-full border border-line bg-white/5 px-3 py-1.5 text-sm text-white/85 transition hover:border-lilac/40 hover:text-white"
                    >
                      {i.short}
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            <>
              {result?.matched.length ? (
                <div className="flex flex-wrap gap-2 px-3 pb-2 pt-1">
                  {result.matched.map((m) => (
                    <button
                      key={`${m.industry}/${m.sector ?? ""}`}
                      type="button"
                      onClick={() => go(workUrl(m.sector ? { industry: m.industry, sector: m.sector } : { industry: m.industry }))}
                      className="rounded-full border border-lilac/40 bg-lilac/10 px-3 py-1 text-xs text-white/90 hover:bg-lilac/20"
                    >
                      {m.title} ({m.count})
                    </button>
                  ))}
                </div>
              ) : null}

              <ul>
                {hits.map((d) => (
                  <li key={d.slug}>
                    <button type="button" onClick={() => go(`/projects/${d.slug}`)} className={rowClass(d.slug)}>
                      <span className="relative h-10 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-white/5">
                        {d.poster ? <Image src={d.poster} alt="" fill sizes="64px" className="object-cover object-left-top" /> : null}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-white">{d.title}</span>
                        <span className="block truncate text-xs text-muted">{d.tagline}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {result?.demoFor ? (
                <button type="button" onClick={() => go(workUrl({ q: q.trim() }, "#demo"))} className={clsx(rowClass("demo"), "mt-1 border border-lilac/30 bg-lilac/10")}>
                  <Sparkles size={18} className="shrink-0 text-lilac" />
                  <span className="min-w-0">
                    <span className="block font-semibold text-white">No {label} project yet? Get a free demo in 3–4 hours</span>
                    <span className="block text-xs text-muted">Free homepage demo · no obligation</span>
                  </span>
                </button>
              ) : null}

              <button type="button" onClick={() => go(workUrl({ q: q.trim() }))} className={clsx(rowClass("all"), "mt-1 justify-between text-sm font-semibold text-lilac")}>
                {result?.hits.length ? `See all ${result.hits.length} results` : "Search all work"} <ArrowRight size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
