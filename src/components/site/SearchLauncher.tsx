"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

// The palette (and the search index it fetches) is only downloaded when first opened.
const loadPalette = () => import("./SearchPalette");
const SearchPalette = dynamic(loadPalette, { ssr: false });

/** Header search button + Ctrl/⌘+K. This is the only search code on every page. */
export default function SearchLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        // Warm the chunk a moment before the click.
        onPointerEnter={() => void loadPalette()}
        onFocus={() => void loadPalette()}
        aria-label="Search projects (Ctrl+K)"
        title="Search projects (Ctrl+K)"
        aria-haspopup="dialog"
        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/5 text-white/85 transition hover:border-lilac/40 hover:text-white"
      >
        <Search size={18} />
      </button>
      {open ? <SearchPalette onClose={() => setOpen(false)} /> : null}
    </>
  );
}
