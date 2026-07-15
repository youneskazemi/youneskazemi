"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { useI18n } from "@/lib/i18n";
import { ParallaxImageFrame } from "@/components/Parallax";
import { cn } from "@/lib/cn";

type Props = {
  project: Project;
  index?: number;
  className?: string;
};

export function ProjectCard({ project, index = 0, className }: Props) {
  const { t, isFa } = useI18n();
  const reduce = useReducedMotion();
  const title = isFa ? project.titleFa : project.title;
  const summary = isFa ? project.summaryFa : project.summary;

  return (
    <motion.article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-card shadow-xl shadow-black/20",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.08, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mx, 50%) 0%, ${project.accent}22, transparent 50%)`,
        }}
        aria-hidden
      />

      <ParallaxImageFrame
        className="relative aspect-[16/10] border-b border-white/6"
        intensity={1.15}
      >
        <Image
          src={project.image}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:brightness-110"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-90" />
      </ParallaxImageFrame>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-full bg-white/90 px-4 text-sm font-medium text-zinc-950 transition hover:bg-white"
          >
            {t.live}
            <span className="ms-1.5 opacity-60" aria-hidden>
              ↗
            </span>
          </a>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex h-10 items-center rounded-full border border-white/12 px-4 text-sm text-zinc-300 transition hover:border-white/25 hover:text-white"
          >
            {t.details}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
