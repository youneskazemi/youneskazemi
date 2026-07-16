"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { navLinks, site } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function Navbar() {
  const { t, isFa, toggleLang, lang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  const brand = isFa ? site.nameFa : site.name;

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled || open ? "glass shadow-lg shadow-black/25" : "bg-transparent",
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

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100"
            >
              {isFa ? link.labelFa : link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex h-11 min-w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2.5 text-xs font-medium text-zinc-300 transition hover:border-sky-400/30 hover:text-sky-200"
            aria-label={lang === "fa" ? "Switch to English" : "تغییر به فارسی"}
          >
            {lang === "fa" ? "EN" : "فا"}
          </button>

          <a
            href="/#contact"
            className="btn-primary hidden h-10 min-h-10 px-4 sm:inline-flex"
          >
            {t.ctaContact}
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition hover:border-white/20 hover:text-zinc-100 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <div className="flex w-4 flex-col gap-1" aria-hidden>
              <span
                className={cn(
                  "h-0.5 w-full rounded bg-current transition",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-full rounded bg-current transition",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-full rounded bg-current transition",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          id="mobile-nav"
          className="border-t border-white/5 px-5 py-4 md:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {isFa ? link.labelFa : link.label}
              </a>
            ))}
            <a
              href="/#contact"
              className="btn-primary mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              {t.ctaContact}
            </a>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
