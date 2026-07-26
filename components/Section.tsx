"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  /** Label for GSAP snap side nav */
  snapLabel?: string;
  snap?: boolean;
};

/**
 * Headings rise out of a clip box instead of the site-wide uniform fade.
 * One distinct motion for titles, a quieter one for prose.
 */
export function MaskRise({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={cn("mask-rise", className)}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: "115%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Section({
  id,
  children,
  className,
  title,
  subtitle,
  snapLabel,
  snap = true,
}: SectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      data-snap-section={snap ? "" : undefined}
      data-snap-label={snapLabel || title || id}
      className={cn("section-pad scroll-mt-24", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        {(title || subtitle) && (
          <div className="mb-10 max-w-2xl sm:mb-14">
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl md:text-[2rem] md:leading-tight">
                <MaskRise>{title}</MaskRise>
              </h2>
            )}
            {subtitle && (
              <motion.p
                className="mt-3 max-w-prose text-base leading-relaxed text-zinc-300/95 sm:text-lg sm:leading-relaxed"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{
                  duration: 0.5,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
