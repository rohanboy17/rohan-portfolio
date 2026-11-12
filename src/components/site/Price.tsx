/**
 * A price in both currencies. Only one shows, picked by `data-currency` on <html>
 * (set before paint by the inline script in app/layout.tsx; see `[data-cur]` in globals.css).
 * Server-rendered, so both prices are in the HTML for search engines.
 */
export default function Price({ inr, usd }: { inr: string; usd: string }) {
  return (
    <>
      <span data-cur="inr">{inr}</span>
      <span data-cur="usd">{usd}</span>
    </>
  );
}
