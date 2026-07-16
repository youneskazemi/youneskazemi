"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getRecentProjects } from "@/content/projects";
import { Logo } from "@/components/Logo";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/**
 * Brand-first hero panel — NOT a full duplicate of the first project case study.
 * Shows monogram + mini mosaic of several works (so Latorin isn’t repeated full-size).
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const { isFa, t } = useI18n();
  // Skip first (already the “lead” story below) — mosaic uses 2nd–5th
  const mosaic = getRecentProjects().slice(1, 5);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md lg:max-w-lg"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute -inset-8 rounded-full bg-sky-500/12 blur-3xl"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-2xl shadow-black/40 sm:p-6">
        {/* Brand header */}
        <div className="mb-5 flex items-center gap-3">
          <Logo size="lg" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-50">
              {isFa ? "سیدیونس کاظمی" : "Younes Kazemi"}
            </p>
            <p className="text-xs text-zinc-500">
              {isFa ? "فول‌استک · Next · Django · WP" : "Full-stack · Next · Django · WP"}
            </p>
          </div>
        </div>

        {/* Mini mosaic — different projects, not the lead full mock */}
        <div className="grid grid-cols-2 gap-2.5">
          {mosaic.map((p, i) => {
            const title = isFa ? p.titleFa : p.title;
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className={cn(
                  "group/tile relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 outline-none",
                  "focus-visible:ring-2 focus-visible:ring-sky-400",
                  i === 0 && "col-span-2 aspect-[16/9]",
                )}
              >
                <Image
                  src={p.image}
                  alt={title}
                  fill
                  className="object-cover object-top transition duration-500 group-hover/tile:scale-[1.04]"
                  sizes="(max-width: 1024px) 50vw, 280px"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-2.5 text-[11px] font-medium text-white/90 sm:text-xs">
                  {title}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/8 pt-4">
          <p className="text-xs text-zinc-500">
            {isFa ? "نمونه‌کارهای اخیر" : "Recent work mosaic"}
          </p>
          <Link
            href="/projects"
            className="text-xs font-semibold text-sky-300 transition hover:text-sky-200"
          >
            {t.viewAllWork} →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
