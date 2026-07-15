import type { Metadata, Viewport } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/providers";
import { site } from "@/content/site";
import {
  absoluteUrl,
  defaultDescription,
  defaultTitle,
  siteJsonLd,
  siteUrl,
} from "@/lib/seo";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050508" },
    { media: "(prefers-color-scheme: light)", color: "#050508" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s",
  },
  applicationName: site.name,
  description: defaultDescription,
  keywords: [
    "Younes Kazemi",
    "سیدیونس کاظمی",
    "full-stack developer",
    "توسعه‌دهنده فول‌استک",
    "Next.js",
    "Django",
    "WordPress",
    "WooCommerce",
    "freelance web developer Iran",
    "portfolio",
    "Telegram mini app",
    "فروشگاه اینترنتی",
    "طراحی سایت",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "fa-IR": absoluteUrl("/"),
      "en": absoluteUrl("/"),
      "x-default": absoluteUrl("/"),
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: ["en_US"],
    url: absoluteUrl("/"),
    siteName: site.name,
    title: defaultTitle,
    description: defaultDescription,
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
    title: defaultTitle,
    description: defaultDescription,
    images: ["/opengraph-image"],
    creator: site.telegramHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/logo.svg" }],
  },
  other: {
    "contact:email": site.email,
    "contact:telegram": site.telegram,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <JsonLd data={siteJsonLd()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
