"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { site } from "@/content/site";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t, isFa } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const yOrb = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 220]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, 280]);
  const yContent = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 80],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    reduce ? [1, 1] : [1, 0.15],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 0.96],
  );

  const name = isFa ? site.nameFa : site.name;
  const title = isFa ? site.titleFa : site.title;

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden pt-24"
    >
      {/* Parallax background layers */}
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 gradient-mesh"
        aria-hidden
      />
      <motion.div
        style={{ y: yOrb }}
        className="pointer-events-none absolute -start-24 top-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl sm:h-96 sm:w-96"
        aria-hidden
      />
      <motion.div
        style={{ y: yOrb2 }}
        className="pointer-events-none absolute -end-16 top-40 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl sm:h-80 sm:w-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      <motion.div
        style={{ y: yContent, opacity, scale }}
        className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-6xl flex-col justify-center px-5 pb-24 sm:px-6"
      >
        <motion.p
          className="mb-4 text-sm font-medium tracking-wide text-sky-300/90"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {title}
        </motion.p>

        <motion.h1
          className="max-w-3xl text-4xl font-semibold leading-[1.15] tracking-tight text-zinc-50 sm:text-5xl md:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {name}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
        >
          {t.heroLine}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
        >
          <a
            href="#work"
            className="inline-flex h-12 items-center justify-center rounded-full bg-sky-400 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-sky-300"
          >
            {t.ctaWork}
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 text-sm font-medium text-zinc-100 transition hover:border-sky-400/30 hover:bg-white/8"
          >
            {t.ctaContact}
          </a>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-wrap gap-2 text-xs text-zinc-500"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {["Next.js", "Django", "WordPress", "Tailwind"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute inset-x-0 bottom-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{ opacity }}
      >
        <a
          href="#work"
          className="flex flex-col items-center gap-2 text-xs text-zinc-500 transition hover:text-zinc-300"
        >
          <span className="h-8 w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
          <motion.span
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
