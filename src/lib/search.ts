/**
 * Tiny project search: no dependencies, shared by the /work explorer and the header palette.
 * The index is built on the server (`buildSearchIndex` in profile.ts) and served as a
 * static JSON file, so the browser only downloads it when someone actually searches.
 */

export type SearchIndex = {
  industries: {
    slug: string;
    title: string;
    short: string;
    /** Normalised synonyms, "|"-separated (phrases allowed). */
    kw: string;
    sectors: { slug: string; title: string; kw: string; count: number }[];
  }[];
  docs: {
    slug: string;
    title: string;
    tagline: string;
    poster?: string;
    industry: string;
    sector: string;
    /** Category (type) slug, e.g. "ecommerce". */
    type: string;
    /** Unique normalised words of: keywords+category · stack · body. Title, tagline and
        industry names are normalised in the browser instead of being sent twice. */
    f: [string, string, string];
  }[];
};

export type SearchResult = {
  hits: { slug: string; score: number }[];
  /** Industries/sectors the query names, best first; for suggestion chips. */
  matched: { industry: string; sector?: string; title: string; count: number }[];
  /** When set, offer the free demo for this business (e.g. "hotel"). */
  demoFor?: string;
};

// title · industry+sector · keywords+category · tagline · stack · body
const WEIGHTS = [6, 5, 4, 3, 2, 1];
/** Portfolio order is the quality ranking, so better work wins ties. */
const RANK_BONUS = 1.5;
/** Places clients search by, mapped to how the project copy names them ("China" → "Chinese"). */
const ALIASES: Record<string, string[]> = {
  china: ["chinese"],
  chinese: ["china"],
  netherland: ["dutch", "amsterdam"],
  dutch: ["netherland"],
  holland: ["dutch", "netherland"],
  usa: ["us", "american"],
  america: ["us", "american"],
  uae: ["dubai"],
  dubai: ["uae"],
  india: ["indian", "kolkata", "bangalore"],
  canada: ["calgary", "canadian"],
  australia: ["australian"],
};

const STOP = new Set(
  "a an the and or for of in on to my our i me we need want looking site sites website websites web page design designer developer development build make create new best good".split(" "),
);

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function stem(word: string): string {
  if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 4 && word.endsWith("es") && /(ch|sh|x|ss)es$/.test(word)) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

/** True when a and b differ by exactly one insert, delete or substitution. */
function oneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1 || a === b) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

/** How well query word `q` matches word `w` (0–1). Typos only count for longer words. */
function wordScore(q: string, w: string, allowTypo: boolean, minPrefix = 3): number {
  if (q === w) return 1;
  if (q.length >= minPrefix && w.startsWith(q)) return 0.8;
  // 6+ letters: shorter words have too many neighbours ("store" vs "stone").
  if (allowTypo && q.length >= 6 && w.length >= 6 && oneEdit(q, w)) return 0.7;
  return 0;
}

const tokenCache = new Map<string, string[]>();
function words(text: string): string[] {
  let cached = tokenCache.get(text);
  if (!cached) {
    cached = text.split(" ").filter(Boolean).map(stem);
    tokenCache.set(text, cached);
  }
  return cached;
}

/** Best match of query word `q` against a "|"-separated synonym list (phrases matched word by word).
    Prefixes need 4+ letters here, so "app" doesn't pull in "apparel" or "appliances". */
function keywordScore(q: string, kw: string): number {
  let best = 0;
  for (const phrase of kw.split("|")) for (const w of words(phrase)) best = Math.max(best, wordScore(q, w, true, 4));
  return best;
}

/** The visitor's words without filler ("need a hotel website" → "hotel"), for the demo offer. */
export function businessLabel(query: string): string {
  return normalize(query)
    .split(" ")
    .filter((w) => w && !STOP.has(w))
    .join(" ")
    .slice(0, 40);
}

export function queryTerms(query: string): string[] {
  return words(normalize(query)).filter((w) => !STOP.has(w));
}

export function search(index: SearchIndex, query: string): SearchResult {
  const terms = queryTerms(query);
  if (!terms.length) return { hits: [], matched: [] };

  // 1. Which industries / sectors does the query name?
  const sectorHit = new Map<string, number>(); // "industry/sector" -> score
  const industryHit = new Map<string, number>();
  const matched: (SearchResult["matched"][number] & { score: number })[] = [];
  for (const ind of index.industries) {
    let indScore = 0;
    for (const t of terms) indScore = Math.max(indScore, keywordScore(t, `${normalize(ind.title)}|${ind.kw}`));
    if (indScore >= 0.8) industryHit.set(ind.slug, indScore);
    for (const sec of ind.sectors) {
      let secScore = 0;
      for (const t of terms) secScore = Math.max(secScore, keywordScore(t, `${normalize(sec.title)}|${sec.kw}`));
      if (secScore >= 0.7) {
        sectorHit.set(`${ind.slug}/${sec.slug}`, secScore);
        matched.push({ industry: ind.slug, sector: sec.slug, title: sec.title, count: sec.count, score: secScore + 0.1 });
      }
    }
    if (indScore >= 0.8) {
      const count = ind.sectors.reduce((n, s) => n + s.count, 0);
      matched.push({ industry: ind.slug, title: ind.title, count, score: indScore });
    }
  }
  matched.sort((a, b) => b.score - a.score || b.count - a.count);

  // 2. Score every project. Each query word must match somewhere (text, sector or industry).
  const hits: SearchResult["hits"] = [];
  index.docs.forEach((doc, rank) => {
    const secScore = sectorHit.get(`${doc.industry}/${doc.sector}`) ?? 0;
    const indScore = industryHit.get(doc.industry) ?? 0;
    let total = secScore * 5 + indScore * 2.5;
    let everyTermMatched = true;
    for (const t of terms) {
      let best = 0;
      for (const alt of [t, ...(ALIASES[t] ?? [])]) {
        docFields(index, doc).forEach((field, fi) => {
          for (const w of words(field)) best = Math.max(best, wordScore(alt, w, fi < 5) * WEIGHTS[fi]);
        });
      }
      const viaTaxonomy =
        (secScore > 0 && keywordScore(t, sectorKw(index, doc)) > 0) || (indScore > 0 && keywordScore(t, industryKw(index, doc)) > 0);
      if (best === 0 && !viaTaxonomy) everyTermMatched = false;
      // A word that names an industry is answered by the taxonomy; don't let a title
      // coincidence ("Nicki Gun Shop" for "shop") outrank stronger work.
      total += viaTaxonomy ? Math.min(best, 0.5) : best;
    }
    if (everyTermMatched && total > 0) hits.push({ slug: doc.slug, score: total + RANK_BONUS * (1 - rank / index.docs.length) });
  });
  hits.sort((a, b) => b.score - a.score);

  // 3. Offer a demo when the best-matching sector has no projects, or nothing matched at all.
  const topSector = matched.find((m) => m.sector);
  let demoFor: string | undefined;
  if ((topSector && topSector.count === 0 && topSector.score >= (matched[0]?.score ?? 0)) || !hits.length) {
    demoFor = businessLabel(query) || topSector?.title.toLowerCase();
  }

  return {
    hits,
    matched: matched.slice(0, 4).map((m) => ({ industry: m.industry, sector: m.sector, title: m.title, count: m.count })),
    demoFor,
  };
}

/** All six weighted fields for a doc; the cheap ones are rebuilt here instead of shipped. */
const fieldCache = new WeakMap<object, string[]>();
function docFields(index: SearchIndex, doc: SearchIndex["docs"][number]): string[] {
  let fields = fieldCache.get(doc);
  if (!fields) {
    const ind = index.industries.find((i) => i.slug === doc.industry);
    const sec = ind?.sectors.find((s) => s.slug === doc.sector);
    fields = [normalize(doc.title), normalize(`${ind?.title ?? ""} ${sec?.title ?? ""}`), doc.f[0], normalize(doc.tagline), doc.f[1], doc.f[2]];
    fieldCache.set(doc, fields);
  }
  return fields;
}

function sectorKw(index: SearchIndex, doc: SearchIndex["docs"][number]): string {
  const ind = index.industries.find((i) => i.slug === doc.industry);
  const sec = ind?.sectors.find((s) => s.slug === doc.sector);
  return sec ? `${normalize(sec.title)}|${sec.kw}` : "";
}

function industryKw(index: SearchIndex, doc: SearchIndex["docs"][number]): string {
  const ind = index.industries.find((i) => i.slug === doc.industry);
  return ind ? `${normalize(ind.title)}|${ind.kw}` : "";
}

/** Fetches /search-index.json once per page load. */
let indexPromise: Promise<SearchIndex> | null = null;
export function loadSearchIndex(): Promise<SearchIndex> {
  indexPromise ??= fetch("/search-index.json").then((r) => r.json() as Promise<SearchIndex>);
  return indexPromise;
}
