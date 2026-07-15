"use client";

import { motion, useReducedMotion } from "framer-motion";
import { process } from "@/content/site";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";
import { ParallaxBlock } from "@/components/Parallax";

export function Process() {
  const { t, lang } = useI18n();
  const reduce = useReducedMotion();
  const steps = process[lang];

  return (
    <Section id="process" title={t.processTitle} subtitle={t.processSubtitle}>
      <ParallaxBlock speed={0.08}>
        <ol className="relative grid gap-4 md:grid-cols-3 md:gap-5">
          <div
            className="pointer-events-none absolute start-[1.15rem] top-4 bottom-4 w-px bg-gradient-to-b from-sky-400/40 via-white/10 to-transparent md:hidden"
            aria-hidden
          />
          {steps.map((step, i) => (
            <motion.li
              key={step.step}
              className="relative rounded-2xl border border-white/8 bg-card/90 p-6"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className="font-mono text-2xl font-semibold text-sky-400/80">
                {step.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-zinc-50">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {step.desc}
              </p>
            </motion.li>
          ))}
        </ol>
      </ParallaxBlock>
    </Section>
  );
}
