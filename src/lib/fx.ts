const REVALIDATE = 60 * 60 * 6; // central banks publish once a day; check a few times a day
/** Used only if both rate services are unreachable ($1 ≈ ₹85, November 2026). */
const FALLBACK_INR_PER_USD = 85;

/** Indian rupees per US dollar, cached on the server and refreshed every few hours. */
export async function inrPerUsd(): Promise<number> {
  const sources: [string, (j: unknown) => unknown][] = [
    // European Central Bank reference rates, no key needed.
    ["https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR", (j) => (j as { rates?: { INR?: unknown } }).rates?.INR],
    ["https://open.er-api.com/v6/latest/USD", (j) => (j as { rates?: { INR?: unknown } }).rates?.INR],
  ];
  for (const [url, pick] of sources) {
    try {
      const res = await fetch(url, { next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const rate = pick(await res.json());
      // Ignore anything wildly off (a broken response must never print a silly price).
      if (typeof rate === "number" && rate > 50 && rate < 150) return rate;
    } catch {
      // try the next source
    }
  }
  return FALLBACK_INR_PER_USD;
}

/** $249 → ₹21,199: converted at `rate`, rounded up to the next hundred minus one. */
export function inrFromUsd(usd: number, rate: number): number {
  return Math.ceil((usd * rate) / 100) * 100 - 1;
}
