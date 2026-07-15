"use client";

import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";

export function ProjectGrid() {
  const { t } = useI18n();
  const list = projects.filter((p) => p.featured);
  const [lead, ...rest] = list;

  return (
    <Section
      id="work"
      title={t.workTitle}
      subtitle={t.workSubtitle}
      snapLabel="Work"
    >
      <div className="flex flex-col gap-14 sm:gap-16">
        {/* Lead case study — full width, asymmetric */}
        {lead && (
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-4 sm:p-6 lg:p-8">
            <ProjectCard project={lead} index={0} variant="featured" />
          </div>
        )}

        {/* Remaining — 3-col on large, not a boring equal 2×2 */}
        {rest.length > 0 && (
          <div className="grid gap-10 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i + 1}
                variant="standard"
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
