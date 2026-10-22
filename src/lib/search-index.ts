import { profile, industries, categoryOf } from "@/content/profile";
import { normalize, type SearchIndex } from "./search";

/** Normalised, de-duplicated words, minus short filler words that never help a search. */
function uniqueWords(parts: string[]): string {
  const seen = new Set<string>();
  for (const w of normalize(parts.join(" ")).split(" ")) if (w.length > 1 && !FILLER.has(w)) seen.add(w);
  return [...seen].join(" ");
}
const FILLER = new Set("the and for with from into that this its their your our are was were has have had not but all any can".split(" "));

/** Builds the search index from profile.ts. Runs at build time only (see app/search-index.json). */
export function buildSearchIndex(): SearchIndex {
  const kw = (list: string[]) => list.map(normalize).join("|");
  return {
    industries: industries.map((ind) => ({
      slug: ind.slug,
      title: ind.title,
      short: ind.short,
      kw: kw(ind.keywords),
      sectors: ind.sectors.map((s) => ({
        slug: s.slug,
        title: s.title,
        kw: kw(s.keywords),
        count: profile.projects.filter((p) => p.industry === ind.slug && p.sector === s.slug).length,
      })),
    })),
    docs: profile.projects.map((p) => {
      return {
        slug: p.slug,
        title: p.title,
        tagline: p.tagline,
        poster: p.poster,
        industry: p.industry,
        sector: p.sector,
        type: categoryOf(p).slug,
        // Unique words only: search matches word by word, so order and repeats don't matter.
        f: [[...(p.keywords ?? []), p.category], p.stack, [p.problem, p.solution, ...p.highlights]].map(uniqueWords) as [string, string, string],
      };
    }),
  };
}
