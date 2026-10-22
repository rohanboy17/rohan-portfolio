"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import clsx from "clsx";
import { Search, X } from "lucide-react";
import { loadSearchIndex, search, type SearchIndex } from "@/lib/search";
import DemoRequest, { type DemoOffer } from "./DemoRequest";

export type ExplorerIndustry = {
  slug: string;
  title: string;
  short: string;
  count: number;
  sectors: { slug: string; title: string; count: number }[];
};

/** The tags of one server-rendered card (no copy), so counts can be computed without the DOM. */
export type ExplorerItem = { slug: string; industry: string; sector: string; type: string };

type Props = {
  industries: ExplorerIndustry[];
  types: { slug: string; short: string; count: number }[];
  items: ExplorerItem[];
  /** id of the server-rendered <ul> whose <li data-slug> items this filters. */
  listId: string;
  demo: { offer: DemoOffer; whatsappNumber: string; email: string };
};

type Filters = { q: string; industry: string; sector: string; type: string };

// The URL is the single source of truth for filters: shareable links, Back/Forward and
// reloads all just work, and nothing is stored in React state that could drift from it.
const urlListeners = new Set<() => void>();
function subscribeUrl(cb: () => void) {
  urlListeners.add(cb);
  window.addEventListener("popstate", cb);
  return () => {
    urlListeners.delete(cb);
    window.removeEventListener("popstate", cb);
  };
}
const urlSnapshot = () => window.location.search;
const serverSnapshot = () => "";

function parse(qs: string): Filters {
  const p = new URLSearchParams(qs);
  return { q: p.get("q") ?? "", industry: p.get("industry") ?? "", sector: p.get("sector") ?? "", type: p.get("type") ?? "" };
}

function navigate(f: Filters) {
  const p = new URLSearchParams();
  (Object.keys(f) as (keyof Filters)[]).forEach((k) => f[k] && p.set(k, f[k]));
  const qs = p.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  urlListeners.forEach((l) => l());
}

/**
 * Search + industry/sector/type filters for /work. Every project card is already in the
 * server-rendered list; this island only toggles `hidden` and CSS `order` on those items,
 * so no card code ships to the browser and the page works fully without JavaScript.
 */
export default function WorkExplorer({ industries, types, items, listId, demo }: Props) {
  const qs = useSyncExternalStore(subscribeUrl, urlSnapshot, serverSnapshot);
  const filters = useMemo(() => parse(qs), [qs]);
  const set = (patch: Partial<Filters>) => navigate({ ...filters, ...patch });

  // What's typed but not yet applied (debounced into the URL).
  const [draft, setDraft] = useState<string | null>(null);
  const input = draft ?? filters.q;
  useEffect(() => {
    if (draft === null) return;
    const t = setTimeout(() => {
      navigate({ ...parse(window.location.search), q: draft.trim() });
      setDraft(null);
    }, 150);
    return () => clearTimeout(t);
  }, [draft]);

  // Download the index only once someone searches.
  const [index, setIndex] = useState<SearchIndex | null>(null);
  useEffect(() => {
    if (filters.q && !index) loadSearchIndex().then(setIndex).catch(() => {});
  }, [filters.q, index]);

  const result = useMemo(() => (filters.q && index ? search(index, filters.q) : null), [filters.q, index]);

  // Which cards to show, in what order. Pure: derived from filters + result.
  const view = useMemo(() => {
    const rank = new Map(result?.hits.map((h, i) => [h.slug, i]));
    // No direct hits: fall back to the industry the query names ("hotel" → Travel & Hospitality).
    const fallback = result && !result.hits.length ? result.matched[0]?.industry : undefined;
    const visible = new Set<string>();
    for (const it of items) {
      let show =
        (!filters.industry || it.industry === filters.industry) &&
        (!filters.sector || it.sector === filters.sector) &&
        (!filters.type || it.type === filters.type);
      if (result) show &&= fallback ? it.industry === fallback : rank.has(it.slug);
      if (show) visible.add(it.slug);
    }
    return { visible, rank, related: fallback ? industries.find((i) => i.slug === fallback)?.title : undefined };
  }, [items, filters.industry, filters.sector, filters.type, result, industries]);

  // Apply the view to the server-rendered list (DOM only, no React state).
  useEffect(() => {
    document
      .getElementById(listId)
      ?.querySelectorAll<HTMLElement>("li[data-slug]")
      .forEach((li) => {
        const slug = li.dataset.slug!;
        li.hidden = !view.visible.has(slug);
        li.style.order = view.rank.has(slug) ? String(view.rank.get(slug)) : "";
      });
  }, [view, listId]);

  const shown = view.visible.size;
  const total = items.length;
  const activeIndustry = industries.find((i) => i.slug === filters.industry);
  const activeSector = activeIndustry?.sectors.find((s) => s.slug === filters.sector);

  // When to offer the free demo, and for what business.
  const demoFor =
    result?.demoFor ??
    (activeSector && activeSector.count === 0 ? demoLabel(activeSector.title) : undefined) ??
    (shown === 0 ? (filters.q || activeSector?.title || activeIndustry?.title || "").toLowerCase() : undefined);

  const clearAll = () => {
    setDraft(null);
    navigate({ q: "", industry: "", sector: "", type: "" });
  };
  const anyFilter = Boolean(filters.q || filters.industry || filters.sector || filters.type);
  const related = view.related;

  return (
    <div className="mt-10">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label htmlFor="work-search" className="sr-only">
          Search projects
        </label>
        <Search size={20} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
        <input
          id="work-search"
          type="search"
          value={input}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search by industry or need — hotel, jewelry, clinic, Shopify, Android app…"
          autoComplete="off"
          className="clay w-full rounded-full py-4 pl-14 pr-12 text-base text-white outline-none transition placeholder:text-white/35 focus:ring-2 focus:ring-lilac/50 [&::-webkit-search-cancel-button]:appearance-none"
        />
        {input ? (
          <button
            type="button"
            onClick={() => setDraft("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        ) : null}
      </form>

      {/* Suggestions from the query: jump straight to an industry or sector */}
      {result?.matched.length && !filters.industry ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Browse:</span>
          {result.matched.map((m) => (
            <button
              key={`${m.industry}/${m.sector ?? ""}`}
              type="button"
              onClick={() => {
                setDraft(null);
                set({ q: "", industry: m.industry, sector: m.sector ?? "" });
              }}
              className="rounded-full border border-lilac/40 bg-lilac/10 px-3 py-1.5 text-white/90 transition hover:bg-lilac/20"
            >
              {m.title} <span className="text-muted">({m.count})</span>
            </button>
          ))}
        </div>
      ) : null}

      <ChipRow
        label="Industry"
        all="All industries"
        value={filters.industry}
        options={industries.map((i) => ({ value: i.slug, label: i.short, count: i.count }))}
        onChange={(v) => set({ industry: v, sector: "" })}
      />
      {activeIndustry ? (
        <ChipRow
          label="Sector"
          all={`All ${activeIndustry.short}`}
          value={filters.sector}
          options={activeIndustry.sectors.map((s) => ({ value: s.slug, label: s.title, count: s.count }))}
          onChange={(v) => set({ sector: v })}
        />
      ) : null}
      <ChipRow
        label="Type"
        all="All types"
        value={filters.type}
        options={types.map((t) => ({ value: t.slug, label: t.short, count: t.count }))}
        onChange={(v) => set({ type: v })}
      />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted">
          {filters.q && !index
            ? "Searching…"
            : related
              ? `No exact match for “${filters.q}”. Closest work in ${related}: ${shown} projects`
              : `${shown} of ${total} projects`}
        </p>
        {anyFilter ? (
          <button type="button" onClick={clearAll} className="text-sm font-semibold text-lilac hover:underline">
            Clear filters
          </button>
        ) : null}
      </div>

      {demoFor ? <DemoRequest business={demoFor} {...demo} className="mt-6" /> : null}
    </div>
  );
}

/** Sector title → how a visitor would say it: "Hotels & resorts" → "hotel", "Real estate agencies" → "real estate agency". */
function demoLabel(title: string): string {
  return title
    .split(" & ")[0]
    .toLowerCase()
    .replace(/ies$/, "y")
    .replace(/([^s])s$/, "$1");
}

function ChipRow({
  label,
  all,
  value,
  options,
  onChange,
}: {
  label: string;
  all: string;
  value: string;
  options: { value: string; label: string; count: number }[];
  onChange: (v: string) => void;
}) {
  const chip = (active: boolean, dim = false) =>
    clsx(
      "shrink-0 rounded-full border px-3.5 py-2 text-sm font-medium transition",
      active ? "border-lilac/60 bg-lilac/15 text-white" : "border-line bg-white/5 text-muted hover:text-white",
      dim && !active && "opacity-60",
    );
  return (
    <div className="mt-4" role="group" aria-label={label}>
      {/* Phones: one swipeable row. sm+: wraps. */}
      <div className="rail -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <button type="button" aria-pressed={!value} onClick={() => onChange("")} className={chip(!value)}>
          {all}
        </button>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(value === o.value ? "" : o.value)}
            className={chip(value === o.value, o.count === 0)}
            title={o.count === 0 ? "No project yet — get a free demo" : undefined}
          >
            {o.label} <span className="text-xs opacity-70">{o.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
