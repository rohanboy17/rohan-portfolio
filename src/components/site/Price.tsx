import { inrPerUsd, inrFromUsd } from "@/lib/fx";
import { formatInr, formatUsd, launchOffer, offerActive, offerPrice } from "@/content/pricing";

/**
 * A price in dollars and in rupees (converted at the day's rate). Only one shows, picked by
 * `data-currency` on <html> (set before paint by the inline script in app/layout.tsx; see
 * `[data-cur]` in globals.css). While the launch offer runs, the regular price is crossed out
 * next to the offer price; `strike={false}` shows the offer price alone, for tight spots.
 */
export default async function Price({ usd, strike = true }: { usd: number; strike?: boolean }) {
  const rate = await inrPerUsd();
  const onOffer = offerActive();
  const pay = onOffer ? offerPrice(usd) : usd;
  const was = onOffer && strike;
  return (
    <>
      <span data-cur="usd">
        {was ? <><s className="text-[0.55em] font-normal text-muted">{formatUsd(usd)}</s>{" "}</> : null}
        {formatUsd(pay)}
      </span>
      <span data-cur="inr">
        {was ? <><s className="text-[0.55em] font-normal text-muted">{formatInr(inrFromUsd(usd, rate))}</s>{" "}</> : null}
        {formatInr(inrFromUsd(pay, rate))}
      </span>
    </>
  );
}

/** "50% off · limited time" pill, shown only while the launch offer runs. */
export function OfferBadge({ className = "" }: { className?: string }) {
  if (!offerActive()) return null;
  return (
    <span className={`inline-flex w-fit items-center rounded-full bg-peach/15 px-2.5 py-0.5 text-[11px] font-semibold text-peach ${className}`}>
      {launchOffer.percent}% off · limited time
    </span>
  );
}
