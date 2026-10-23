import Link from "next/link";
import clsx from "clsx";
import { categoryCounts } from "@/content/profile";
import { accentStyles } from "@/components/ui/accent";
import Clip3D from "@/components/ui/Clip3D";

/** Row of links to each /work/[category] page. `active` highlights the current one. */
export default function CategoryPills({ active, className }: { active?: string; className?: string }) {
  return (
    <div className={clsx("flex flex-wrap gap-2.5", className)}>
      <Link prefetch={false}
        href="/work"
        className={clsx(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
          active === "all" ? "border-white/30 bg-white/10 text-white" : "border-line bg-white/5 text-muted hover:text-white",
        )}
      >
        All work
      </Link>
      {categoryCounts.map((c) => {
        const a = accentStyles[c.accent];
        const on = active === c.slug;
        return (
          <Link prefetch={false}
            key={c.slug}
            href={`/work/${c.slug}`}
            className={clsx(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
              on ? clsx(a.border, a.soft, a.text) : "border-line bg-white/5 text-muted hover:text-white",
            )}
          >
            <Clip3D name={c.clip} size={18} className="h-4 w-4" />
            {c.short}
            <span className={clsx("rounded-full px-1.5 text-xs", on ? a.soft : "bg-white/10")}>{c.count}</span>
          </Link>
        );
      })}
    </div>
  );
}
