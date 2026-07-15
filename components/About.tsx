"use client";

import { motion, useReducedMotion } from "framer-motion";
import { about, site } from "@/content/site";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t, lang, isFa } = useI18n();
  const reduce = useReducedMotion();
  const text = about[lang];

  return (
    <Section id="about" title={t.aboutTitle}>
      <motion.div
        className="grid items-start gap-8 md:grid-cols-[1.2fr_0.8fr]"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
      >
        <div className="space-y-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
          <p>{text.p1}</p>
          <p>{text.p2}</p>
          <p>{text.p3}</p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-card p-6">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-zinc-500">{isFa ? "نام" : "Name"}</dt>
              <dd className="mt-1 font-medium text-zinc-100">
                {isFa ? site.nameFa : site.name}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">{isFa ? "نقش" : "Role"}</dt>
              <dd className="mt-1 font-medium text-zinc-100">
                {isFa ? site.titleFa : site.title}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">{isFa ? "موقعیت" : "Location"}</dt>
              <dd className="mt-1 font-medium text-zinc-100">
                {isFa ? site.locationFa : site.location}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">{isFa ? "زبان‌ها" : "Languages"}</dt>
              <dd className="mt-1 font-medium text-zinc-100">فارسی · English</dd>
            </div>
          </dl>
        </div>
      </motion.div>
    </Section>
  );
}
