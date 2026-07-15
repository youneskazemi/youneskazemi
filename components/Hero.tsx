"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { HeroVisual } from "@/components/HeroVisual";
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const orbX = useTransform(smoothX, [-0.5, 0.5], reduce ? [0, 0] : [-28, 28]);
  const orbMouseY = useTransform(
    smoothY,
    [-0.5, 0.5],
    reduce ? [0, 0] : [-18, 18],
  );
  const orb2X = useTransform(smoothX, [-0.5, 0.5], reduce ? [0, 0] : [22, -22]);
  const orb2MouseY = useTransform(
    smoothY,
    [-0.5, 0.5],
    reduce ? [0, 0] : [14, -14],
  );
  const titleMouseY = useTransform(
    smoothY,
    [-0.5, 0.5],
    reduce ? [0, 0] : [5, -5],
  );

  const yBg = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 160]);
  const yOrbScroll = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 240],
  );
  const yOrb2Scroll = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [40, 300],
  );
  const yOrb = useTransform(
    [yOrbScroll, orbMouseY],
    ([s, m]) => (s as number) + (m as number),
  );
  const yOrb2 = useTransform(
    [yOrb2Scroll, orb2MouseY],
    ([s, m]) => (s as number) + (m as number),
  );

  const yContent = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 80],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduce ? [1, 1] : [1, 0.2],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 0.97],
  );
  const blur = useTransform(
    scrollYProgress,
    [0, 0.8],
    reduce ? [0, 0] : [0, 3],
  );
  const contentFilter = useMotionTemplate`blur(${blur}px)`;

  const name = isFa ? site.nameFa : site.name;
  const title = isFa ? site.titleFa : site.title;

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function onPointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="top"
      ref={ref}
      data-snap-section=""
      data-snap-label="Home"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative min-h-[100svh] overflow-hidden pt-24"
    >
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 gradient-mesh"
        aria-hidden
      />
      <motion.div
        style={{ y: yOrb, x: orbX }}
        className="pointer-events-none absolute -start-24 top-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl sm:h-96 sm:w-96"
        aria-hidden
      />
      <motion.div
        style={{ y: yOrb2, x: orb2X }}
        className="pointer-events-none absolute -end-16 top-40 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl sm:h-80 sm:w-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      <motion.div
        style={{
          y: yContent,
          opacity,
          scale,
          filter: reduce ? undefined : contentFilter,
        }}
        className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-6xl items-center gap-10 px-5 pb-24 pt-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:pb-20"
      >
        {/* Copy column */}
        <div className="order-1 flex flex-col justify-center lg:order-none">
          <motion.p
            className="mb-4 text-sm font-medium tracking-wide text-sky-300/90"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {title}
          </motion.p>

          <motion.h1
            className="max-w-xl text-4xl font-semibold leading-[1.15] tracking-tight text-zinc-50 sm:text-5xl md:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: titleMouseY }}
          >
            {name}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg"
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
              className="inline-flex h-12 items-center justify-center rounded-full bg-sky-400 px-6 text-sm font-semibold text-black transition hover:bg-sky-300"
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
            className="mt-12 flex flex-wrap gap-2 text-xs text-zinc-500"
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
        </div>

        {/* Visual column — was empty before */}
        <motion.div
          className="order-2 lg:order-none"
          initial={reduce ? false : { opacity: 0, x: isFa ? -24 : 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-6 flex justify-center lg:bottom-8"
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
          <span aria-hidden>↓</span>
        </a>
      </motion.div>
    </section>
  );
}
