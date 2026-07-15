"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
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
        scrolled || open ? "glass shadow-lg shadow-black/20" : "bg-transparent",
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.25rem] sm:px-6">
        <Link
          href="/#top"
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-50 sm:text-base"
          onClick={() => setOpen(false)}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-xs font-bold text-sky-300 ring-1 ring-sky-400/20 transition group-hover:ring-sky-400/40">
            YK
          </span>
          <span className="hidden sm:inline">{brand}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100"
            >
              {isFa ? link.labelFa : link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-sky-400/30 hover:text-sky-200"
            aria-label="Toggle language"
          >
            {lang === "fa" ? "EN" : "فا"}
          </button>

          <a
            href="#contact"
            className="hidden rounded-full bg-sky-400 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-sky-300 sm:inline-flex"
          >
            {t.ctaContact}
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-300 md:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-4 flex-col gap-1">
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
          className="border-t border-white/5 px-5 py-4 md:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm text-zinc-300 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {isFa ? link.labelFa : link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 rounded-xl bg-sky-400 px-3 py-3 text-center text-sm font-medium text-zinc-950"
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
