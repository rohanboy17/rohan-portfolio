"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.2 });

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
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-lilac via-pink to-peach"
      />
      <div
        className={clsx(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-3 pl-5 transition-all duration-300",
          scrolled ? "clay bg-ink/70 backdrop-blur-xl" : "border border-transparent",
        )}
      >
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-lilac text-sm font-bold text-ink btn-clay">
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
            onClick={() => setOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="clay absolute inset-x-4 top-4 rounded-[28px] bg-surface p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Menu</p>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/5"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-4 grid gap-2">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-line bg-white/[0.03] px-5 py-4 font-display text-lg"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn-clay mt-4 flex justify-center rounded-full bg-lilac px-6 py-3 font-semibold text-ink"
            >
              Hire me
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
