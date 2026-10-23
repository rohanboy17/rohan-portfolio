import NavProgress from "./NavProgress";

/**
 * Loading feedback for every page, styled in globals.css (`.page-loader`, `.loading-pill`):
 * - a thin animated bar at the top while the page first loads (set by the inline script in layout.tsx)
 *   and while a link click is fetching the next page (set by NavProgress);
 * - a small "Loading…" pill if a click takes longer than ~0.6 s, so slow networks never look stuck.
 * No overlay: content is never hidden, so it costs nothing in speed scores.
 */
export default function PageLoader() {
  return (
    <>
      <div aria-hidden className="page-loader" />
      <div aria-hidden className="loading-pill">
        <span className="loading-spinner" />
        Loading…
      </div>
      <NavProgress />
    </>
  );
}
