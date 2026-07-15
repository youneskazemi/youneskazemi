import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import { Providers } from "@/components/providers";
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

export const metadata: Metadata = {
  title: {
    default: "Younes Kazemi · Full-stack Web Developer",
    template: "%s · Younes Kazemi",
  },
  description:
    "Full-stack developer — WordPress shops & custom Next.js/Django products. سیدیونس کاظمی، توسعه‌دهنده فول‌استک وب.",
  metadataBase: new URL("https://youneskazemi.ir"),
  openGraph: {
    title: "Younes Kazemi · Full-stack Web Developer",
    description:
      "WordPress shops & custom Next.js/Django products. فروشگاه WordPress و محصول اختصاصی.",
    url: "https://youneskazemi.ir",
    siteName: "Younes Kazemi",
    locale: "fa_IR",
    type: "website",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
