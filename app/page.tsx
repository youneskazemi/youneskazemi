import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { absoluteUrl, defaultDescription, defaultTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: defaultTitle },
  description: defaultDescription,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    url: absoluteUrl("/"),
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function Home() {
  return <HomePage />;
}
