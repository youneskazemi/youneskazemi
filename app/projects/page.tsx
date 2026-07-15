import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/ProjectsIndex";

export const metadata: Metadata = {
  title: {
    absolute: "Younes Kazemi · All work",
  },
  description:
    "Full portfolio by Younes Kazemi — Latorin, JR Fit, Apex78, Gallery Chiic, TickTOM, Rimel Cosmetics, Rayan AI, and more.",
  openGraph: {
    title: "Younes Kazemi · All work",
    siteName: "Younes Kazemi",
  },
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
