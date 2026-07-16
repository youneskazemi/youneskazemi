"use client";

import type { Project } from "@/content/projects";
import { useI18n } from "@/lib/i18n";

export function ProjectDetailContent({ project }: { project: Project }) {
  const { t, isFa } = useI18n();
  const title = isFa ? project.titleFa : project.title;
  const summary = isFa ? project.summaryFa : project.summary;
  const body = isFa ? project.bodyFa : project.body;

  return (
    <article>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl sm:leading-tight">
        {title}
      </h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-zinc-300">
        {summary}
      </p>

      <div className="surface-card mt-8 p-6">
        <h2 className="text-sm font-medium text-sky-300">{t.overview}</h2>
        <p className="mt-3 max-w-prose leading-relaxed text-zinc-300">{body}</p>
        <h2 className="mt-6 text-sm font-medium text-sky-300">{t.stack}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-8"
      >
        {t.visitSite} ↗
      </a>
    </article>
  );
}
