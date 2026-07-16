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
    locale: "fa_IR",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: defaultTitle,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og.png"],
  },
};

export default function Home() {
  return <HomePage />;
}
