import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/ProjectsIndex";
import { site } from "@/content/site";
import { absoluteUrl, defaultTitle } from "@/lib/seo";

const title = `${site.name} · All work`;
const description =
  "Full portfolio by Younes Kazemi (سیدیونس کاظمی): Latorin, JR Fit, Apex78, Gallery Chiic, TickTOM, Rimel Cosmetics, Rayan AI — WordPress shops, custom Next.js, Telegram mini apps.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/projects"),
    title,
    description,
    siteName: site.name,
    locale: "fa_IR",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
