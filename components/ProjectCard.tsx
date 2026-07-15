"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { BrowserFrame } from "@/components/BrowserFrame";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

type Props = {
  project: Project;
  index?: number;
  variant?: "featured" | "standard";
  className?: string;
};

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
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

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ProjectCard({
  project,
  index = 0,
  variant = "standard",
  className,
}: Props) {
  const { t, isFa } = useI18n();
  const reduce = useReducedMotion();
  const title = isFa ? project.titleFa : project.title;
  const summary = isFa ? project.summaryFa : project.summary;
  const featured = variant === "featured";

  return (
    <motion.article
      className={cn(
        "group relative flex h-full flex-col",
        featured
          ? "gap-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10"
          : "gap-4",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.18),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Preview */}
      <div
        className={cn(
          "relative",
          featured ? "lg:col-span-7" : "w-full",
        )}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="block outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`${title} — ${t.details}`}
        >
          <BrowserFrame url={project.href}>
            <div
              className={cn(
                "relative overflow-hidden bg-zinc-900",
                featured ? "aspect-[16/10]" : "aspect-[16/11]",
              )}
            >
              <Image
                src={project.image}
                alt={title}
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                sizes={
                  featured
                    ? "(max-width: 1024px) 100vw, 55vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
                priority={index === 0}
              />
              {/* Soft bottom fade only — keeps screenshot readable */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80"
                aria-hidden
              />
              {/* Accent line */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${project.accent}99, transparent)`,
                }}
                aria-hidden
              />
            </div>
          </BrowserFrame>
        </Link>
      </div>

      {/* Meta */}
      <div
        className={cn(
          "flex flex-1 flex-col",
          featured ? "lg:col-span-5 lg:py-2" : "min-h-0",
        )}
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: project.accent }}
            aria-hidden
          />
          <span className="text-xs font-medium tracking-wide text-zinc-500">
            {project.tags[0]}
            {project.tags[1] ? ` · ${project.tags[1]}` : ""}
          </span>
        </div>

        <h3
          className={cn(
            "font-semibold tracking-tight text-zinc-50",
            featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
          )}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="transition hover:text-sky-200"
          >
            {title}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-2 leading-relaxed text-zinc-400",
            featured ? "text-base sm:text-lg" : "text-sm line-clamp-2",
          )}
        >
          {summary}
        </p>

        {featured && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <div
          className={cn(
            "mt-auto flex flex-wrap items-center gap-3",
            featured ? "pt-8" : "pt-5",
          )}
        >
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-11 min-w-[7.5rem] items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition",
              "bg-sky-400 text-black hover:bg-sky-300",
            )}
          >
            {t.live}
            <ExternalIcon />
          </a>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex h-11 items-center gap-1.5 rounded-full px-2 text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            {t.details}
            <ArrowIcon className="transition rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
