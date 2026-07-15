"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Vertical parallax tied to scroll progress of a wrapping section. */
export function ParallaxBlock({
  children,
  className,
  speed = 0.2,
  offset = ["start end", "end start"] as const,
}: {
  children: ReactNode;
  className?: string;
  /** Positive = moves slower than scroll (classic parallax). */
  speed?: number;
  offset?: readonly [string, string];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
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

/** Image container that scales / shifts slightly on scroll. */
export function ParallaxImageFrame({
  children,
  className,
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
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
    reduce ? [0, 0] : [28 * intensity, -28 * intensity],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [1.1, 1.02, 1.08],
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y, scale }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

export function useParallaxY(
  progress: MotionValue<number>,
  range: [number, number],
  reduce?: boolean | null,
) {
  return useTransform(progress, [0, 1], reduce ? [0, 0] : range);
}
