import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/db/projects";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { ProjectDetailContent } from "@/components/ProjectDetailContent";
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
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

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
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center text-sm text-zinc-400 transition hover:text-sky-300"
            >
              ← All work
            </Link>
            <Link
              href="/#work"
              className="inline-flex min-h-11 items-center text-sm text-zinc-500 transition hover:text-sky-300"
            >
              Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
