"use client";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollAmbient } from "@/components/ScrollAmbient";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionNav } from "@/components/SectionNav";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";

export function HomePage() {
  return (
    <>
      <div className="noise" aria-hidden />
      <ScrollProgress />
      <ScrollAmbient />
      <SectionNav />
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <ProjectGrid />
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
