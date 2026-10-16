"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import { profile } from "@/content/profile";

const NAV = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      {/* Scroll progress: pure CSS scroll-driven animation, hidden where unsupported */}
      <div aria-hidden className="scroll-progress fixed inset-x-0 top-0 h-[3px] bg-gradient-to-r from-lilac via-pink to-peach" />
      <div
        className={clsx(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-5",
          scrolled ? "clay bg-ink/75 backdrop-blur-xl" : "border border-transparent",
        )}
      >
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight" aria-label={`${profile.name} — home`}>
          <span className="btn-clay grid h-8 w-8 place-items-center rounded-xl bg-lilac text-sm font-bold text-ink">
            {profile.firstName.charAt(0)}
          </span>
          <span>
            {profile.firstName}
            <span className="text-lilac">.</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="btn-clay hidden rounded-full bg-lilac px-5 py-2 text-sm font-semibold text-ink sm:inline-flex"
          >
            Hire me
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/5 md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={clsx(
          "fixed inset-0 z-[60] flex flex-col bg-ink/95 px-5 pb-8 pt-4 backdrop-blur-2xl transition-[opacity,visibility] duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div aria-hidden className="aurora pointer-events-none absolute inset-0" />
        <div className="relative flex h-14 items-center justify-between pl-1">
          <span className="font-display text-lg font-semibold">
            {profile.firstName}
            <span className="text-lilac">.</span>
          </span>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/5"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
        <nav aria-label="Mobile" className="relative mt-8 flex flex-col">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={clsx(
                "flex items-center justify-between border-b border-line py-5 font-display text-3xl font-semibold transition-[opacity,transform] duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              {item.label}
              <ArrowUpRight size={22} className="text-muted" />
            </Link>
          ))}
        </nav>
        <div className="relative mt-auto grid gap-3">
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="btn-clay flex justify-center rounded-full bg-lilac px-6 py-4 font-semibold text-ink"
          >
            Hire me
          </Link>
          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              download
              tabIndex={open ? 0 : -1}
              className="clay flex justify-center rounded-full px-6 py-4 font-semibold"
            >
              Download resume
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
