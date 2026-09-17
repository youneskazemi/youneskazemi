import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/db/projects";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { ProjectDetailContent } from "@/components/ProjectDetailContent";
import { ProjectPagination } from "@/components/ProjectPagination";
import { projectJsonLd, projectMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const all = await getProjects();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: { absolute: "Younes Kazemi · Project not found" } };
  }
  return projectMeta(project);
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);
  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject =
    currentIndex > 0
      ? allProjects[currentIndex - 1]
      : allProjects.length > 1
      ? allProjects[allProjects.length - 1]
      : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects.length > 1
      ? allProjects[0]
      : null;

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <div className="noise" aria-hidden />
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-4xl px-5 pb-20 sm:px-6">
          <div className="mb-8">
            <BrowserFrame url={project.href}>
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            </BrowserFrame>
          </div>
          <ProjectDetailContent project={project} />
          <ProjectPagination
            prevProject={prevProject}
            nextProject={nextProject}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
