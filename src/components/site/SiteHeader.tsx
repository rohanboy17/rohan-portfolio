"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import clsx from "clsx";
import Logo from "@/components/ui/Logo";
import SearchLauncher from "@/components/site/SearchLauncher";
import type { NavItem, NavLink } from "@/lib/nav";

/**
 * Client component: it takes the few profile values (and the shared menu from lib/nav.ts)
 * as props, so profile.ts (all project copy) is never bundled into the browser JS of every page.
 */
export default function SiteHeader({
  name,
  firstName,
  resumeUrl,
  nav,
}: {
  name: string;
  firstName: string;
  resumeUrl?: string;
  nav: NavItem[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [menu, setMenu] = useState<string | null>(null); // desktop dropdown
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);

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

  // Desktop dropdown: close on Escape or a click anywhere outside the nav.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    const onDown = (e: MouseEvent) => !navRef.current?.contains(e.target as Node) && setMenu(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [menu]);

  const openMenu = (label: string) => {
    clearTimeout(closeTimer.current);
    setMenu(label);
  };
  // A short delay lets the pointer cross the gap between the button and the panel.
  const closeMenuSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 140);
  };
  const closeAll = () => {
    setMenu(null);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      {/* Scroll progress: pure CSS scroll-driven animation, hidden where unsupported */}
      <div aria-hidden className="scroll-progress fixed inset-x-0 top-0 h-[3px] bg-gradient-to-r from-lilac via-pink to-peach" />
      <div
        className={clsx(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-5",
          scrolled || menu ? "clay solid-when-lite bg-ink/75 backdrop-blur-xl" : "border border-transparent",
        )}
      >
        <Link prefetch={false} href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight" aria-label={`${name} — home`}>
          <Logo size={34} id="logo-header" className="drop-shadow-[0_6px_14px_rgba(196,181,253,0.35)]" />
          <span>
            {firstName}
            <span className="text-lilac">.</span>
          </span>
        </Link>

        <nav ref={navRef} aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) =>
            item.sections ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openMenu(item.label)}
                onMouseLeave={closeMenuSoon}
                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setMenu(null)}
              >
                <button
                  type="button"
                  aria-expanded={menu === item.label}
                  aria-controls={`menu-${item.label}`}
                  onClick={() => (menu === item.label ? setMenu(null) : openMenu(item.label))}
                  className={clsx(
                    "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm transition hover:bg-white/5 hover:text-white",
                    menu === item.label ? "bg-white/5 text-white" : "text-muted",
                  )}
                >
                  {item.label}
                  <ChevronDown size={14} className={clsx("transition-transform", menu === item.label && "rotate-180")} />
                </button>
                <div
                  id={`menu-${item.label}`}
                  hidden={menu !== item.label}
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                >
                  {/* Rendered only while open: keeps ~300 menu nodes out of every page load (the footer
                      carries the same links for crawlers and no-JS visitors). */}
                  {menu === item.label ? <DesktopPanel item={item} onNavigate={closeAll} /> : null}
                </div>
              </div>
            ) : (
              <Link prefetch={false}
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <SearchLauncher />
          <Link prefetch={false}
            href="/#contact"
            className="btn-clay hidden rounded-full bg-lilac px-5 py-2 text-sm font-semibold text-ink sm:inline-flex"
          >
            Get a quote
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
        <div className="relative flex h-14 shrink-0 items-center justify-between pl-1">
          <span className="flex items-center gap-2 font-display text-lg font-semibold">
            <Logo size={32} id="logo-menu" />
            {firstName}
            <span className="-ml-2 text-lilac">.</span>
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
        {/* Scrolls when a section is expanded on short phones */}
        <nav aria-label="Mobile" className="relative mt-6 flex min-h-0 flex-1 flex-col overflow-y-auto">
          {nav.map((item, i) => {
            const style = { transitionDelay: open ? `${80 + i * 50}ms` : "0ms" };
            const enter = open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0";
            if (!item.sections) {
              return (
                <Link prefetch={false}
                  key={item.label}
                  href={item.href}
                  onClick={closeAll}
                  tabIndex={open ? 0 : -1}
                  className={clsx("flex items-center justify-between border-b border-line py-5 font-display text-3xl font-semibold transition-[opacity,transform] duration-500", enter)}
                  style={style}
                >
                  {item.label}
                  <ArrowUpRight size={22} className="text-muted" />
                </Link>
              );
            }
            const expanded = mobileSection === item.label;
            return (
              <div key={item.label} className={clsx("border-b border-line transition-[opacity,transform] duration-500", enter)} style={style}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`m-menu-${item.label}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setMobileSection(expanded ? null : item.label)}
                  className="flex w-full items-center justify-between py-5 font-display text-3xl font-semibold"
                >
                  {item.label}
                  <ChevronDown size={22} className={clsx("text-muted transition-transform", expanded && "rotate-180")} />
                </button>
                <div id={`m-menu-${item.label}`} hidden={!expanded} className="pb-5">
                  {expanded && item.sections.map((section) => (
                    <div key={section.title} className="mt-2 first:mt-0">
                      <p className="px-1 pb-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">{section.title}</p>
                      <ul className={clsx("grid gap-x-3", section.wide && "grid-cols-2")}>
                        {section.links.map((link) => (
                          <li key={link.href + link.label}>
                            <MenuLink link={link} onNavigate={closeAll} tabIndex={open ? 0 : -1} compact />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {expanded && item.more ? <MenuLink link={item.more} onNavigate={closeAll} tabIndex={open ? 0 : -1} compact accent /> : null}
                </div>
              </div>
            );
          })}
        </nav>
        <div className="relative mt-6 grid shrink-0 gap-3">
          <Link prefetch={false}
            href="/#contact"
            onClick={closeAll}
            tabIndex={open ? 0 : -1}
            className="btn-clay flex justify-center rounded-full bg-lilac px-6 py-4 font-semibold text-ink"
          >
            Get a quote
          </Link>
          {resumeUrl ? (
            <a
              href={resumeUrl}
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

// `.clay` sets a near-transparent background outside Tailwind's layers, so a bg-* class can't
// override it; layer the clay sheen over solid ink inline so page text never shows through.
const SOLID = { background: "linear-gradient(180deg, rgb(255 255 255 / 0.065), rgb(255 255 255 / 0.02)), var(--color-ink)" };

/** Desktop dropdown body. Menus with several sections (Work) become a wide mega menu. */
function DesktopPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const sections = item.sections ?? [];
  const mega = sections.length > 1;
  return (
    <div className={clsx("clay rounded-[28px] p-3", mega ? "w-[min(46rem,calc(100vw-3rem))]" : "w-80")} style={SOLID}>
      <div className={clsx(mega && "grid grid-cols-[1.15fr_0.8fr_1.2fr] gap-1")}>
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">{section.title}</p>
            <ul className={clsx(section.wide && "grid grid-cols-2")}>
              {section.links.map((link) => (
                <li key={link.href + link.label}>
                  <MenuLink link={link} onNavigate={onNavigate} compact={section.wide} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {item.more ? (
        <div className="mt-2 border-t border-line pt-2">
          <MenuLink link={item.more} onNavigate={onNavigate} accent />
        </div>
      ) : null}
    </div>
  );
}

function MenuLink({
  link,
  onNavigate,
  compact = false,
  accent = false,
  tabIndex,
}: {
  link: NavLink;
  onNavigate: () => void;
  compact?: boolean;
  accent?: boolean;
  tabIndex?: number;
}) {
  const external = link.href.endsWith(".pdf");
  const body = (
    <>
      <span className={clsx("block text-sm font-semibold", accent ? "text-lilac" : "text-white")}>
        {link.label}
        {accent ? <ArrowUpRight size={14} className="ml-1 inline" /> : null}
      </span>
      {link.hint && !compact ? <span className="mt-0.5 block text-xs leading-snug text-muted">{link.hint}</span> : null}
    </>
  );
  const className = clsx("block rounded-2xl px-3 transition hover:bg-white/5", compact ? "py-2" : "py-2.5");
  return external ? (
    <a href={link.href} target="_blank" rel="noreferrer" onClick={onNavigate} tabIndex={tabIndex} className={className}>
      {body}
    </a>
  ) : (
    <Link prefetch={false} href={link.href} onClick={onNavigate} tabIndex={tabIndex} className={className}>
      {body}
    </Link>
  );
}
