"use client";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionNav } from "@/components/SectionNav";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { WorkShowcase } from "@/components/WorkShowcase";
import type { Project } from "@/content/projects";

export function HomePage({ initialProjects }: { initialProjects?: Project[] } = {}) {
  return (
    <>
      <div className="noise" aria-hidden />
      <ScrollProgress />
      <SectionNav />
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero projects={initialProjects} />
          <WorkShowcase projects={initialProjects} />
          <Skills />
          <Services />
          <Process />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
