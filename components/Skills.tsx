"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/content/site";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";

export function Skills() {
  const { t, lang } = useI18n();
  const reduce = useReducedMotion();
  const groups = skills[lang];

  return (
    <Section id="skills" title={t.skillsTitle} subtitle={t.skillsSubtitle}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group, i) => (
          <motion.div
            key={group.group}
            className="surface-card p-5 transition hover:border-white/14"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: i * 0.06,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3 className="text-sm font-semibold text-sky-300">{group.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
