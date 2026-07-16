"use client";

import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/content/site";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";

export function Services() {
  const { t, lang } = useI18n();
  const reduce = useReducedMotion();
  const list = services[lang];

  return (
    <Section id="services" title={t.servicesTitle} subtitle={t.servicesSubtitle}>
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {list.map((service, i) => (
          <motion.article
            key={service.title}
            className="surface-card relative overflow-hidden p-6 sm:p-8"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full blur-3xl"
              style={{
                background:
                  i === 0
                    ? "rgba(244, 114, 182, 0.12)"
                    : "rgba(56, 189, 248, 0.14)",
              }}
              aria-hidden
            />
            <p className="font-mono text-sm tabular-nums text-zinc-400">
              0{i + 1}
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-50">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem]">
              {service.desc}
            </p>
            <ul className="mt-6 space-y-2.5">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm text-zinc-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
