"use client";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";

export function HomePage() {
  return (
    <>
      <div className="noise" aria-hidden />
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
    </>
  );
}
