import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/ProjectsIndex";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

const title = `${site.nameFa} · همه نمونه‌کارها`;
const description =
  "نمونه کارهای سیدیونس کاظمی: لاتورین، جی‌آر فیت، اپکس ۷۸، گالری شیک، تیک‌تام، ریمل، رایان AI، کادینو — فروشگاه WordPress، Next.js و وب۳.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/projects"),
    title,
    description,
    siteName: site.nameFa,
    locale: "fa_IR",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: title,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
