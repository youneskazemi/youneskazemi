import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/db/projects";
import { absoluteUrl } from "@/lib/seo";

/**
 * Last commit date for a source file. `lastmod` is the only sitemap hint
 * Google still reads, and it only trusts it if it stays put between builds —
 * stamping `new Date()` on every URL every deploy makes it worthless.
 * ponytail: shallow clones and missing .git fall back to build time.
 */
const buildTime = new Date();

function lastCommit(path: string): Date {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", path], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : buildTime;
  } catch {
    return buildTime;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pagesUpdated = lastCommit("app/page.tsx");
  const projectsUpdated = lastCommit("content/projects.ts");
  const projectsList = await getProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: pagesUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: projectsUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectsList.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: p.updated_at ? new Date(p.updated_at) : projectsUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
