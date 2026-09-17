"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { useI18n } from "@/lib/i18n";

interface ProjectPaginationProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

export function ProjectPagination({
  prevProject,
  nextProject,
}: ProjectPaginationProps) {
  const { isFa } = useI18n();

  return (
    <nav
      aria-label={isFa ? "ناوبری پروژه‌ها" : "Projects navigation"}
      className="mt-14 pt-8 border-t border-white/10"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Previous Project Card */}
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0b0b12]/80 p-4 transition-all duration-200 hover:border-sky-500/40 hover:bg-[#12121e] hover:shadow-lg hover:shadow-sky-500/5"
          >
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
              <Image
                src={prevProject.image}
                alt={prevProject.title}
                fill
                className="object-cover object-top transition duration-300 group-hover:scale-105"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-medium text-sky-400/90">
                {isFa ? "← پروژه قبلی" : "← Previous Showcase"}
              </span>
              <h3 className="mt-0.5 truncate text-sm font-semibold text-white group-hover:text-sky-300 transition">
                {isFa ? prevProject.titleFa : prevProject.title}
              </h3>
              <p className="truncate text-xs text-zinc-400">
                {prevProject.tags.slice(0, 2).join(" · ")}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {/* Next Project Card */}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group relative flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0b0b12]/80 p-4 transition-all duration-200 hover:border-sky-500/40 hover:bg-[#12121e] hover:shadow-lg hover:shadow-sky-500/5 sm:text-right"
          >
            <div className="min-w-0 flex-1 order-2 sm:order-1">
              <span className="text-[11px] font-medium text-sky-400/90">
                {isFa ? "پروژه بعدی →" : "Next Showcase →"}
              </span>
              <h3 className="mt-0.5 truncate text-sm font-semibold text-white group-hover:text-sky-300 transition">
                {isFa ? nextProject.titleFa : nextProject.title}
              </h3>
              <p className="truncate text-xs text-zinc-400">
                {nextProject.tags.slice(0, 2).join(" · ")}
              </p>
            </div>
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 order-1 sm:order-2">
              <Image
                src={nextProject.image}
                alt={nextProject.title}
                fill
                className="object-cover object-top transition duration-300 group-hover:scale-105"
                sizes="80px"
              />
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Back to All Showcases Link */}
      <div className="mt-6 flex items-center justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
        >
          <span>{isFa ? "مشاهده تمام پروژه‌ها و کیس‌استادی‌ها" : "View all portfolio showcases"}</span>
          <span className="text-zinc-500">↗</span>
        </Link>
      </div>
    </nav>
  );
}
