"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { navLinks, site } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/useActiveSection";

export function Navbar() {
  const { t, isFa, toggleLang, lang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const activeSection = useActiveSection();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const brand = isFa ? site.nameFa : site.name;

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          scrolled ? "glass shadow-lg shadow-black/25" : "bg-transparent",
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.25rem] sm:px-6">
          <Link
            href="/#top"
            className="group flex min-h-11 min-w-11 items-center gap-2 text-sm font-semibold tracking-tight text-zinc-50 sm:text-base"
            onClick={() => setOpen(false)}
            aria-label={brand}
          >
            <Logo
              size="md"
              showWordmark
              wordmark={brand}
              wordmarkClassName="hidden sm:inline"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navLinks.map((link) => {
              const isAllWork = link.id === "all-work";
              const isProjectsSec = link.id === "work";
              const isActive = isAllWork
                ? pathname.startsWith("/projects")
                : pathname === "/" &&
                  (activeSection === link.id ||
                    (isProjectsSec &&
                      (activeSection === "work" || activeSection === "projects")));

              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative inline-flex min-h-10 items-center rounded-lg px-3 text-sm transition-all duration-200",
                    isActive
                      ? "font-medium text-sky-300 bg-sky-500/10 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.25)]"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
                  )}
                >
                  {isFa ? link.labelFa : link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 inset-x-2.5 h-0.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                      aria-hidden
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Controls (Desktop CTA, Language Toggle & Mobile Hamburger) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex h-11 min-w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2.5 text-xs font-medium text-zinc-300 transition hover:border-sky-400/30 hover:text-sky-200 cursor-pointer"
              aria-label={lang === "fa" ? "Switch to English" : "تغییر به فارسی"}
            >
              {lang === "fa" ? "EN" : "فا"}
            </button>

            <a
              href="/#contact"
              className="btn-primary hidden h-11 min-h-11 px-5 sm:inline-flex"
            >
              {t.ctaContact}
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition hover:border-white/20 hover:text-zinc-100 md:hidden cursor-pointer"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? (isFa ? "بستن منو" : "Close menu") : (isFa ? "باز کردن منو" : "Open menu")}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close" : "Menu"}</span>
              <div className="flex w-4 flex-col gap-1.5" aria-hidden>
                <span
                  className={cn(
                    "h-0.5 w-full rounded bg-current transition-transform duration-200",
                    open && "translate-y-2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-full rounded bg-current transition-opacity duration-150",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-full rounded bg-current transition-transform duration-200",
                    open && "-translate-y-2 -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* 2026 Impeccable Mobile Navigation Drawer & Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={isFa ? "منوی ناوبری موبایل" : "Mobile Navigation"}
            className="fixed inset-0 z-50 flex flex-col bg-[#050508]/96 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top Bar inside Menu */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
              <Link
                href="/#top"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <Logo size="sm" showWordmark wordmark={brand} />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleLang}
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2.5 text-xs font-medium text-zinc-300"
                >
                  {lang === "fa" ? "EN" : "فا"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition hover:bg-white/5 hover:text-white"
                  aria-label={isFa ? "بستن منو" : "Close menu"}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Links Container */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
                {navLinks.map((link, idx) => {
                  const isAllWork = link.id === "all-work";
                  const isProjectsSec = link.id === "work";
                  const isActive = isAllWork
                    ? pathname.startsWith("/projects")
                    : pathname === "/" &&
                      (activeSection === link.id ||
                        (isProjectsSec &&
                          (activeSection === "work" || activeSection === "projects")));

                  return (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: isFa ? 12 : -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.25 }}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex min-h-[52px] items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition",
                        isActive
                          ? "bg-sky-500/15 text-sky-300 font-semibold ring-1 ring-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.15)]"
                          : "text-zinc-200 hover:bg-white/5 hover:text-white active:bg-white/10",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,1)]" />
                        )}
                        <span>{isFa ? link.labelFa : link.label}</span>
                      </span>
                      <span className={cn("text-sm", isActive ? "text-sky-400" : "text-zinc-500")} aria-hidden>
                        {isFa ? "←" : "→"}
                      </span>
                    </motion.a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions & Status Dock */}
            <div className="shrink-0 border-t border-white/10 bg-[#08080c]/80 p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {/* Availability Status Pill */}
              <div className="mb-4 flex items-center justify-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 py-1.5 px-3 text-xs text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>{t.available}</span>
              </div>

              {/* Primary Contact Action */}
              <a
                href="/#contact"
                className="btn-primary flex min-h-12 w-full text-sm font-semibold shadow-lg shadow-sky-500/20"
                onClick={() => setOpen(false)}
              >
                {t.ctaContact}
              </a>

              {/* Quick Communication Shortcuts */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-300 transition hover:border-sky-400/30 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <span>Telegram ↗</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-300 transition hover:border-sky-400/30 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <span>Email ↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
