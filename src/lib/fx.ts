const REVALIDATE = 60 * 60 * 6; // central banks publish once a day; check a few times a day
/** Used only if both rate services are unreachable (₹1 ≈ $0.0105, October 2026). */
const FALLBACK_USD_PER_INR = 0.0105;

/** US dollars per Indian rupee, cached on the server and refreshed every few hours. */
export async function usdPerInr(): Promise<number> {
  const sources: [string, (j: unknown) => unknown][] = [
    // European Central Bank reference rates, no key needed.
    ["https://api.frankfurter.dev/v1/latest?base=INR&symbols=USD", (j) => (j as { rates?: { USD?: unknown } }).rates?.USD],
    ["https://open.er-api.com/v6/latest/INR", (j) => (j as { rates?: { USD?: unknown } }).rates?.USD],
  ];
  for (const [url, pick] of sources) {
    try {
      const res = await fetch(url, { next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const rate = pick(await res.json());
      // Ignore anything wildly off (a broken response must never print a silly price).
      if (typeof rate === "number" && rate > 0.005 && rate < 0.05) return rate;
    } catch {
      // try the next source
    }
  }
  return FALLBACK_USD_PER_INR;
}

/** "₹4,999" → "$59": converted at `rate`, plus `markup` (0.1 = 10%), rounded up to whole dollars. */
export function usdFromInr(inr: string, rate: number, markup: number): string {
  const amount = Number(inr.replace(/[^\d.]/g, ""));
  return `$${Math.ceil(amount * rate * (1 + markup)).toLocaleString("en-US")}`;
}
