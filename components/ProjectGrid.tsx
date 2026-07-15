"use client";

import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";

export function ProjectGrid() {
  const { t } = useI18n();
  const list = projects.filter((p) => p.featured);

  return (
    <Section id="work" title={t.workTitle} subtitle={t.workSubtitle}>
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
        {list.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
