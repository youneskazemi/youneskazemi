"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getOrderedProjects, type Project } from "@/content/projects";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const BASE_FILTERS = [
  { id: "all", label: "All", labelFa: "همه" },
  { id: "store", label: "Store", labelFa: "فروشگاه", match: /Store|Woo|Shop|Beauty|Fitness|Lifestyle/i },
  { id: "custom", label: "Custom / AI", labelFa: "اختصاصی / AI", match: /Custom|AI|SaaS|EdTech|Platform/i },
  { id: "telegram", label: "Telegram", labelFa: "تلگرام", match: /Telegram|Mini App|Game/i },
  { id: "web3", label: "Web3 / DeFi", labelFa: "وب۳ / دیفای", match: /DeFi|Web3|dApp|DEX|BSC/i },
  { id: "web", label: "Web", labelFa: "وب", match: /Web|Association|Content|Cafe|Local|Bakery/i },
] as const;

function matchesFilter(p: Project, filterId: string) {
  if (filterId === "all") return true;
  const f = BASE_FILTERS.find((x) => x.id === filterId);
  if (f && "match" in f && f.match) {
    const hay = [...p.tags, ...p.stack].join(" ");
    return f.match.test(hay);
  }
  // Check direct tag match for custom tags
  return p.tags.some((tag) => tag.toLowerCase() === filterId.toLowerCase());
}

function matchesSearch(p: Project, q: string) {
  if (!q) return true;
  const query = q.toLowerCase().trim();
  const searchCorpus = [
    p.title,
    p.titleFa,
    p.summary,
    p.summaryFa,
    p.slug,
    ...(p.tags || []),
    ...(p.stack || []),
  ]
    .join(" ")
    .toLowerCase();

  return searchCorpus.includes(query);
}

function ProjectTile({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { t, isFa } = useI18n();
  const reduce = useReducedMotion();
  const title = isFa ? project.titleFa : project.title;
  const summary = isFa ? project.summaryFa : project.summary;

  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.4 }}
      className="group flex flex-col"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <BrowserFrame url={project.href}>
          <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
            <Image
              src={project.image}
              alt={title}
              fill
              className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </BrowserFrame>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="mb-2 flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: project.accent }}
            aria-hidden
          />
          <span className="text-xs text-zinc-400">
            {project.tags.slice(0, 2).join(" · ")}
            {project.year ? ` · ${project.year}` : ""}
          </span>
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-50">
          <Link
            href={`/projects/${project.slug}`}
            className="transition hover:text-sky-200"
          >
            {title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-300">
          {summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {!project.offline && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-sky-300 transition hover:text-sky-200"
            >
              {t.live} ↗
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className={
              project.offline
                ? "inline-flex min-h-11 items-center text-sm font-semibold text-sky-300 transition hover:text-sky-200"
                : "inline-flex min-h-11 items-center px-2 text-sm font-medium text-zinc-400 transition hover:text-zinc-200"
            }
          >
            {t.details}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsIndex({ initialProjects }: { initialProjects?: Project[] } = {}) {
  const { t, isFa } = useI18n();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const reduce = useReducedMotion();

  const catalog = useMemo(
    () => initialProjects ?? getOrderedProjects(),
    [initialProjects]
  );

  // Dynamic tags from database/catalog that aren't already represented in base filters
  const extraTags = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of catalog) {
      for (const tag of p.tags || []) {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    }
    // Only return popular custom tags (at least 1 project)
    return Object.keys(counts)
      .filter((tag) => !BASE_FILTERS.some((b) => b.label.toLowerCase() === tag.toLowerCase()))
      .slice(0, 4);
  }, [catalog]);

  const allFilters = useMemo(() => {
    return [
      ...BASE_FILTERS,
      ...extraTags.map((tag) => ({
        id: tag.toLowerCase(),
        label: tag,
        labelFa: tag,
      })),
    ];
  }, [extraTags]);

  const filtered = useMemo(() => {
    return catalog.filter(
      (p) => matchesFilter(p, filter) && matchesSearch(p, searchQuery)
    );
  }, [catalog, filter, searchQuery]);

  return (
    <>
      <div className="noise" aria-hidden />
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-6">
          <motion.header
            className="max-w-2xl pb-8 pt-6 sm:pb-10"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl md:text-5xl md:leading-tight">
              {t.allWorkTitle}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
              {t.allWorkSubtitle}
            </p>
            <p className="mt-3 text-sm tabular-nums text-zinc-400">
              {filtered.length} {t.projectsCount}
            </p>
          </motion.header>

          {/* Controls: Search + Filter Pills */}
          <div className="mb-10 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-zinc-400" aria-hidden>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="h-11 w-full rounded-full border border-white/10 bg-white/[0.03] pl-10 pr-10 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-sky-400 focus:bg-white/[0.05] focus:ring-1 focus:ring-sky-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-2 flex h-11 w-9 items-center justify-center text-xs text-zinc-400 hover:text-zinc-200"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Pills with real counts (44px touch targets) */}
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label={isFa ? "فیلتر پروژه‌ها" : "Filter projects"}
            >
              {allFilters.map((f) => {
                const active = filter === f.id;
                const count = catalog.filter((p) => matchesFilter(p, f.id)).length;
                if (count === 0 && f.id !== "all") return null;

                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition",
                      active
                        ? "bg-sky-400 text-black shadow-md shadow-sky-400/20"
                        : "border border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20 hover:text-white",
                    )}
                  >
                    <span>{isFa ? f.labelFa : f.label}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-mono",
                        active ? "bg-black/20 text-black font-bold" : "bg-white/10 text-zinc-400"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-10 sm:gap-8 md:grid-cols-2">
            {filtered.map((project, i) => (
              <ProjectTile
                key={project.slug}
                project={project}
                index={i}
              />
            ))}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] py-16 text-center">
              <p className="text-sm text-zinc-400">
                {t.noProjectsFound}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center gap-1 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-medium text-sky-300 transition hover:bg-sky-400/20"
              >
                {t.clearSearch}
              </button>
            </div>
          )}

          <div className="mt-16">
            <Link
              href="/#work"
              className="inline-flex min-h-11 items-center text-sm text-zinc-400 transition hover:text-sky-300"
            >
              ← {t.backHome}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
