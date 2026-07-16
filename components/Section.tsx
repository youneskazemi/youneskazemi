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
          <motion.div
            className="mb-10 max-w-2xl sm:mb-14"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl md:text-[2rem] md:leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 max-w-prose text-base leading-relaxed text-zinc-300/95 sm:text-lg sm:leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
