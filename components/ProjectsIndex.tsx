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

const FILTERS = [
  { id: "all", label: "All", labelFa: "همه" },
  { id: "store", label: "Store", labelFa: "فروشگاه", match: /Store|Woo|Shop|Beauty|Fitness|Lifestyle/i },
  { id: "custom", label: "Custom / AI", labelFa: "اختصاصی / AI", match: /Custom|AI|SaaS|EdTech|Platform/i },
  { id: "telegram", label: "Telegram", labelFa: "تلگرام", match: /Telegram|Mini App|Game/i },
  { id: "web3", label: "Web3 / DeFi", labelFa: "وب۳ / دیفای", match: /DeFi|Web3|dApp|DEX|BSC/i },
  { id: "web", label: "Web", labelFa: "وب", match: /Web|Association|Content/i },
] as const;

function matchesFilter(p: Project, filterId: string) {
  if (filterId === "all") return true;
  const f = FILTERS.find((x) => x.id === filterId);
  if (!f || !("match" in f) || !f.match) return true;
  const hay = [...p.tags, ...p.stack].join(" ");
  return f.match.test(hay);
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
          <span className="text-xs text-zinc-500">
            {project.tags.slice(0, 2).join(" · ")}
            {project.year ? ` · ${project.year}` : ""}
          </span>
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-50">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-sky-200"
          >
            {title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-sky-300 hover:text-sky-200"
          >
            {t.live} ↗
          </a>
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-zinc-400 hover:text-zinc-200"
          >
            {t.details}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsIndex() {
  const { t, isFa } = useI18n();
  const [filter, setFilter] = useState("all");
  const reduce = useReducedMotion();

  const catalog = useMemo(() => getOrderedProjects(), []);
  const filtered = useMemo(
    () => catalog.filter((p) => matchesFilter(p, filter)),
    [catalog, filter],
  );

  return (
    <>
      <div className="noise" aria-hidden />
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-6">
          <motion.header
            className="max-w-2xl pb-10 pt-6 sm:pb-12"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-sky-400/90">
              Portfolio
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl md:text-5xl">
              {t.allWorkTitle}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
              {t.allWorkSubtitle}
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              {filtered.length} {t.projectsCount}
            </p>
          </motion.header>

          {/* Filters */}
          <div
            className="mb-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter projects"
          >
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "h-10 rounded-full px-4 text-sm font-medium transition",
                    active
                      ? "bg-sky-400 text-black"
                      : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200",
                  )}
                >
                  {isFa ? f.labelFa : f.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-10 sm:gap-8 md:grid-cols-2">
            {filtered.map((project, i) => (
              <ProjectTile
                key={project.slug}
                project={project}
                index={i}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-zinc-500">
              {isFa ? "پروژه‌ای در این دسته نیست." : "No projects in this filter."}
            </p>
          )}

          <div className="mt-16">
            <Link
              href="/#work"
              className="text-sm text-zinc-400 transition hover:text-sky-300"
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
