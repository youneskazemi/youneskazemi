"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Full-page soft orbs that drift with scroll — subtle depth without
 * fighting content readability.
 */
export function ScrollAmbient() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 420]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -280]);
  const y3 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 600]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    reduce ? [0.5, 0.5, 0.5, 0.5] : [0.55, 0.7, 0.45, 0.25],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div style={{ opacity }} className="absolute inset-0">
        <motion.div
          style={{ y: y1 }}
          className="absolute -start-32 top-[20vh] h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute -end-24 top-[55vh] h-[24rem] w-[24rem] rounded-full bg-violet-500/10 blur-3xl"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute start-1/3 top-[90vh] h-[20rem] w-[20rem] rounded-full bg-emerald-500/8 blur-3xl"
        />
      </motion.div>
    </div>
  );
}
