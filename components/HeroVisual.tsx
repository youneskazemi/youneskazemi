"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getOrderedProjects } from "@/content/projects";
import { BrowserFrame } from "@/components/BrowserFrame";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/** How many recent projects appear in the hero slider. */
const HERO_SLIDE_COUNT = 5;
const AUTOPLAY_MS = 4500;

/**
 * Hero right column: recent projects as a slider (not a full case-study stack).
 * Autoplay pauses on hover / focus; disabled when prefers-reduced-motion.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const { isFa, t } = useI18n();
  const slides = getOrderedProjects().slice(0, HERO_SLIDE_COUNT);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);

  const count = slides.length;
  const current = slides[index];

  const go = useCallback(
    (next: number, direction: number) => {
      if (count === 0) return;
      setDir(direction);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  useEffect(() => {
    if (reduce || paused || count < 2) return;
    const id = window.setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, count]);

  if (!current) return null;

  const title = isFa ? current.titleFa : current.title;
  const slideOffset = isFa ? -dir : dir;

  return (
    <div
      className="relative mx-auto w-full max-w-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div
        className="pointer-events-none absolute -inset-8 rounded-full bg-sky-500/12 blur-3xl"
        aria-hidden
      />

      <p className="mb-3 text-center text-sm font-medium text-zinc-400 sm:text-start">
        {isFa ? "پروژه‌های اخیر" : "Recent work"}
      </p>

      <div className="relative">
        <AnimatePresence mode="wait" custom={slideOffset}>
          <motion.div
            key={current.slug}
            custom={slideOffset}
            initial={
              reduce
                ? false
                : { opacity: 0, x: slideOffset * 36, scale: 0.98 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={
              reduce
                ? undefined
                : { opacity: 0, x: slideOffset * -28, scale: 0.98 }
            }
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/projects/${current.slug}`}
              className="group block outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`${title} — ${t.details}`}
            >
              <BrowserFrame url={current.href}>
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <Image
                    src={current.image}
                    alt={title}
                    fill
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 90vw, 480px"
                    priority={index === 0}
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
                    aria-hidden
                  />
                </div>
              </BrowserFrame>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label={isFa ? "قبلی" : "Previous project"}
              className={cn(
                "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full",
                "border border-white/12 bg-black/60 text-zinc-100 backdrop-blur-md transition",
                "hover:border-sky-400/40 hover:bg-black/80 hover:text-sky-200",
                "start-2 sm:-start-3",
              )}
            >
              <Chevron dir={isFa ? "end" : "start"} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={isFa ? "بعدی" : "Next project"}
              className={cn(
                "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full",
                "border border-white/12 bg-black/60 text-zinc-100 backdrop-blur-md transition",
                "hover:border-sky-400/40 hover:bg-black/80 hover:text-sky-200",
                "end-2 sm:-end-3",
              )}
            >
              <Chevron dir={isFa ? "start" : "end"} />
            </button>
          </>
        )}
      </div>

      {/* Caption + dots */}
      <div className="mt-4 flex items-start justify-between gap-3 px-0.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-100">
            {title}
          </p>
          <p className="mt-0.5 truncate text-xs text-zinc-400">
            {current.tags.slice(0, 2).join(" · ")}
          </p>
        </div>
        <Link
          href={`/projects/${current.slug}`}
          className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-sky-300 transition hover:text-sky-200"
        >
          {t.details} →
        </Link>
      </div>

      {count > 1 && (
        <div
          className="mt-4 flex items-center justify-center gap-1.5"
          role="tablist"
          aria-label={isFa ? "اسلاید پروژه‌ها" : "Project slides"}
        >
          {slides.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={isFa ? p.titleFa : p.title}
              onClick={() => go(i, i > index ? 1 : -1)}
              className={cn(
                "flex h-11 items-center justify-center px-1",
              )}
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-6 bg-sky-400"
                    : "w-1.5 bg-white/25 hover:bg-white/45",
                )}
              />
            </button>
          ))}
        </div>
      )}

      <div className="mt-2 text-center">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center text-sm font-medium text-zinc-400 transition hover:text-sky-300"
        >
          {t.viewAllWork} →
        </Link>
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "start" | "end" }) {
  // Logical chevron: start = « on LTR, end = »
  const isEnd = dir === "end";
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(isEnd ? "" : "rotate-180")}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
