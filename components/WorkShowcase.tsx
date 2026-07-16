"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  getHomeShowcaseProjects,
  getOrderedProjects,
  type Project,
} from "@/content/projects";
import { BrowserFrame } from "@/components/BrowserFrame";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

function ExternalIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CaseStudy({
  project,
  index,
  reverse,
}: {
  project: Project;
  index: number;
  reverse: boolean;
}) {
  const { t, isFa } = useI18n();
  const reduce = useReducedMotion();
  const title = isFa ? project.titleFa : project.title;
  const summary = isFa ? project.summaryFa : project.summary;
  const num = String(index + 1).padStart(2, "0");
  const imageFirst = isFa ? reverse : !reverse;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <div
          className={cn(
            "relative lg:col-span-7",
            imageFirst ? "lg:order-1" : "lg:order-2",
          )}
        >
          <div
            className="pointer-events-none absolute -inset-4 rounded-2xl opacity-35 blur-2xl transition duration-500 group-hover:opacity-60"
            style={{
              background: `radial-gradient(ellipse at center, ${project.accent}40, transparent 70%)`,
            }}
            aria-hidden
          />
          <Link
            href={`/projects/${project.slug}`}
            className="relative block rounded-[0.875rem] outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            aria-label={`${title} — ${t.details}`}
          >
            <BrowserFrame
              url={project.href}
              className="transition duration-500 ease-out group-hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0c12]">
                <Image
                  src={project.image}
                  alt={title}
                  fill
                  className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.025]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority={index === 0}
                />
              </div>
            </BrowserFrame>
          </Link>
        </div>

        <div
          className={cn(
            "flex flex-col lg:col-span-5",
            imageFirst ? "lg:order-2" : "lg:order-1",
          )}
        >
          {/* Index only — no uppercase tracked kicker */}
          <div className="mb-5 flex items-center gap-3">
            <span
              className="font-mono text-sm tabular-nums"
              style={{ color: project.accent }}
            >
              {num}
            </span>
            <span className="h-px w-8 bg-white/15" aria-hidden />
            <span className="text-sm text-zinc-400">
              {project.tags[0]}
              {project.tags[1] ? ` · ${project.tags[1]}` : ""}
            </span>
          </div>

          <h3 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl sm:leading-tight">
            <Link
              href={`/projects/${project.slug}`}
              className="underline-offset-4 transition hover:text-white hover:underline hover:decoration-sky-400/50"
            >
              {title}
            </Link>
          </h3>

          <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-300 sm:text-[1.05rem] sm:leading-relaxed">
            {summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t.live}
              <ExternalIcon />
            </a>
            <Link
              href={`/projects/${project.slug}`}
              className="btn-secondary"
            >
              {t.details}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/** Home: N featured case studies only → route to /projects for the rest. */
export function WorkShowcase() {
  const { t } = useI18n();
  const list = getHomeShowcaseProjects();
  const total = getOrderedProjects().length;
  const viewAllLabel = t.viewAllWorkCount.replace("{n}", String(total));

  return (
    <section
      id="work"
      data-snap-section=""
      data-snap-label="Work"
      className="section-pad scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <motion.header
          className="mb-14 flex max-w-3xl flex-col gap-5 sm:mb-16 lg:mb-20 lg:max-w-none lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl sm:leading-tight">
              {t.workTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
              {t.workSubtitle}
            </p>
            {total > list.length && (
              <p className="mt-2 text-sm text-zinc-400">{t.moreOnAllWork}</p>
            )}
          </div>
          <Link href="/projects" className="btn-secondary shrink-0">
            {viewAllLabel}
          </Link>
        </motion.header>

        <div className="flex flex-col">
          {list.map((project, i) => (
            <div key={project.slug}>
              <CaseStudy
                project={project}
                index={i}
                reverse={i % 2 === 1}
              />
              {i < list.length - 1 && (
                <div
                  className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent sm:my-20 lg:my-24"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 sm:mt-20">
          <Link href="/projects" className="btn-primary px-8">
            {viewAllLabel}
          </Link>
          <p className="text-xs tabular-nums text-zinc-400">
            {list.length} / {total}
          </p>
        </div>
      </div>
    </section>
  );
}
