"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Vertical parallax tied to scroll progress of a wrapping section. */
export function ParallaxBlock({
  children,
  className,
  speed = 0.2,
}: {
  children: ReactNode;
  className?: string;
  /** Positive = moves slower than scroll (classic parallax). */
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [speed * 80, speed * -80],
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Screenshot viewport: the image is taller than its frame and drifts upward as
 * the frame crosses the viewport, so the shot appears to scroll its own page.
 * Depth lands on the proof (real work), not on decorative orbs.
 *
 * `amount` is % of frame height travelled; overscale keeps the bottom edge
 * covered for amount ≤ 25.
 */
export function ParallaxMedia({
  children,
  className,
  amount = 12,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", `-${amount}%`],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y, height: `${104 + amount}%` }}
        className="absolute inset-x-0 top-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
