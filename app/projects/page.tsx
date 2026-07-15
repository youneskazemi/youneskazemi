import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/ProjectsIndex";

export const metadata: Metadata = {
  title: "All work",
  description:
    "Full portfolio — Latorin, Apex78, Gallery Chiic, TickTOM, Rimel Cosmetics, Rayan AI, and more.",
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
