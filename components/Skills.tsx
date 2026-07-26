"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/content/site";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";

/** Spec sheet, not a card grid — rows on hairlines, plain type, no chips. */
export function Skills() {
  const { t, lang } = useI18n();
  const reduce = useReducedMotion();
  const groups = skills[lang];

  return (
    <Section id="skills" title={t.skillsTitle} subtitle={t.skillsSubtitle}>
      <dl className="border-y border-white/[0.08]">
        {groups.map((group, i) => (
          <motion.div
            key={group.group}
            className="grid gap-2 border-b border-white/[0.08] py-6 last:border-b-0 md:grid-cols-[11rem_1fr] md:items-baseline md:gap-10"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: i * 0.07,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <dt className="text-sm font-semibold text-sky-300">
              {group.group}
            </dt>
            <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5 text-base text-zinc-300">
              {group.items.map((item, n) => (
                <span key={item} className="inline-flex items-baseline gap-2">
                  {item}
                  {n < group.items.length - 1 && (
                    <span className="text-zinc-600" aria-hidden>
                      ·
                    </span>
                  )}
                </span>
              ))}
            </dd>
          </motion.div>
        ))}
      </dl>
    </Section>
  );
}
