"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { useI18n } from "@/lib/i18n";

interface ProjectPaginationProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

function ArrowLeftIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 8H3M7 12L3 8l4-4" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
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
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-sky-400/90">
                {isFa ? (
                  <>
                    <ArrowRightIcon className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                    <span>پروژه قبلی</span>
                  </>
                ) : (
                  <>
                    <ArrowLeftIcon className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    <span>Previous Showcase</span>
                  </>
                )}
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
            className="group relative flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0b0b12]/80 p-4 transition-all duration-200 hover:border-sky-500/40 hover:bg-[#12121e] hover:shadow-lg hover:shadow-sky-500/5 sm:text-start"
          >
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 order-2 sm:order-1">
              <Image
                src={nextProject.image}
                alt={nextProject.title}
                fill
                className="object-cover object-top transition duration-300 group-hover:scale-105"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1 order-1 sm:order-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-sky-400/90">
                {isFa ? (
                  <>
                    <span>پروژه بعدی</span>
                    <ArrowLeftIcon className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
                  </>
                ) : (
                  <>
                    <span>Next Showcase</span>
                    <ArrowRightIcon className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                )}
              </span>
              <h3 className="mt-0.5 truncate text-sm font-semibold text-white group-hover:text-sky-300 transition">
                {isFa ? nextProject.titleFa : nextProject.title}
              </h3>
              <p className="truncate text-xs text-zinc-400">
                {nextProject.tags.slice(0, 2).join(" · ")}
              </p>
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
          className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
        >
          <span>
            {isFa
              ? "مشاهده تمام پروژه‌ها و کیس‌استادی‌ها"
              : "View all portfolio showcases"}
          </span>
          {isFa ? (
            <ArrowLeftIcon className="h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 group-hover:-translate-x-0.5" />
          ) : (
            <ArrowRightIcon className="h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5" />
          )}
        </Link>
      </div>
    </nav>
  );
}
