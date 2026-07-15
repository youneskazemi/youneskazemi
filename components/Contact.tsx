"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";

export function Contact() {
  const { t, isFa } = useI18n();
  const reduce = useReducedMotion();

  return (
    <Section id="contact" title={t.contactTitle} subtitle={t.contactSubtitle}>
      <motion.div
        className="grid gap-5 md:grid-cols-2"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card p-6 transition hover:border-sky-400/30 sm:p-8"
        >
          <div
            className="pointer-events-none absolute -end-8 -top-8 h-32 w-32 rounded-full bg-sky-400/10 blur-2xl transition group-hover:bg-sky-400/20"
            aria-hidden
          />
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Telegram
          </p>
          <p className="mt-3 text-xl font-semibold text-zinc-50">
            {site.telegramHandle}
          </p>
          <p className="mt-2 text-sm text-zinc-400">{t.contactFormHint}</p>
          <span className="mt-6 inline-flex text-sm font-medium text-sky-300 transition group-hover:text-sky-200">
            {isFa ? "باز کردن چت" : "Open chat"} ↗
          </span>
        </a>

        <a
          href={`mailto:${site.email}`}
          className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card p-6 transition hover:border-violet-400/30 sm:p-8"
        >
          <div
            className="pointer-events-none absolute -end-8 -top-8 h-32 w-32 rounded-full bg-violet-400/10 blur-2xl transition group-hover:bg-violet-400/18"
            aria-hidden
          />
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Email
          </p>
          <p className="mt-3 break-all text-xl font-semibold text-zinc-50">
            {site.email}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            {isFa
              ? "برای brief یا فایل‌ها مناسب است."
              : "Good for briefs and attachments."}
          </p>
          <span className="mt-6 inline-flex text-sm font-medium text-violet-300 transition group-hover:text-violet-200">
            {isFa ? "ارسال ایمیل" : "Send email"} ↗
          </span>
        </a>
      </motion.div>

      <p className="mt-8 text-center text-sm text-zinc-500 sm:text-start">
        {t.available}
      </p>
    </Section>
  );
}
