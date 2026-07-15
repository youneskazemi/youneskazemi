"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { BrowserFrame } from "@/components/BrowserFrame";
import { useI18n } from "@/lib/i18n";

/**
 * Hero visual: single featured project in browser chrome (clean, not stacked mess).
 * Optional portrait: public/hero-portrait.jpg + USE_PORTRAIT = true
 */
const USE_PORTRAIT = false;

export function HeroVisual() {
  const reduce = useReducedMotion();
  const { isFa, t } = useI18n();
  const lead = projects.find((p) => p.featured) ?? projects[0];
  if (!lead) return null;

  const title = isFa ? lead.titleFa : lead.title;

  if (USE_PORTRAIT) {
    return (
      <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-card">
        <Image
          src="/hero-portrait.jpg"
          alt={isFa ? "سیدیونس کاظمی" : "Younes Kazemi"}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 90vw, 420px"
          priority
        />
      </div>
    );
  }

  return (
    <motion.div
      className="relative mx-auto w-full max-w-lg"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute -inset-6 rounded-full bg-sky-500/10 blur-3xl"
        aria-hidden
      />

      <Link
        href={`/projects/${lead.slug}`}
        className="group relative block outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <BrowserFrame url={lead.href}>
          <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
            <Image
              src={lead.image}
              alt={title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 90vw, 480px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </BrowserFrame>

        <div className="mt-4 flex items-center justify-between gap-3 px-1">
          <div>
            <p className="text-sm font-medium text-zinc-100">{title}</p>
            <p className="text-xs text-zinc-500">
              {lead.tags.slice(0, 2).join(" · ")}
            </p>
          </div>
          <span className="shrink-0 text-xs font-medium text-sky-300 transition group-hover:text-sky-200">
            {t.details} →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
