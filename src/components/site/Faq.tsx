import { Plus } from "lucide-react";

/** Accessible FAQ list built on <details>, so answers stay in the HTML for search engines and work without JS. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className="clay group rounded-3xl px-5 py-4 sm:px-6 sm:py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white [&::-webkit-details-marker]:hidden">
            <h3 className="text-base sm:text-lg">{f.q}</h3>
            <Plus size={18} className="shrink-0 text-lilac transition group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-pretty leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
