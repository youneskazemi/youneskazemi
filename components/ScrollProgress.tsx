"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Thin top progress bar driven by page scroll. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
