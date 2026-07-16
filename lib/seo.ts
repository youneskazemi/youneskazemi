import type { Metadata } from "next";
import { site } from "@/content/site";
import { projects, type Project } from "@/content/projects";

/** Primary public origin (canonical). Prefer apex; www also works via host. */
export const siteUrl = `https://${site.domain}`;

/** FA-first titles for share previews (site is Persian-first). */
export const defaultTitle = `${site.nameFa} · ${site.titleFa}`;
export const defaultTitleEn = `${site.name} · ${site.title}`;

export const defaultDescription =
  "سیدیونس کاظمی — توسعه‌دهنده فول‌استک وب. فروشگاه WordPress و WooCommerce، محصول اختصاصی با Next.js و Django. فریلنس در ایران و ریموت.";

export const defaultDescriptionEn =
  "Younes Kazemi — full-stack web developer. WordPress & WooCommerce shops, custom Next.js + Django products. Freelance, Iran & remote.";

export function absoluteUrl(path = "/") {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${siteUrl}${path === "/" ? "" : path}`;
}

export function projectTitle(project: Project) {
  return `${site.nameFa} · ${project.titleFa}`;
}

export function projectMeta(project: Project): Metadata {
  const title = projectTitle(project);
  const description = `${project.summaryFa} — ${project.summary}`;
  const url = absoluteUrl(`/projects/${project.slug}`);
  const image = project.image.startsWith("http")
    ? project.image
    : absoluteUrl(project.image);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: site.nameFa,
      locale: "fa_IR",
      alternateLocale: ["en_US"],
      images: [
        {
          url: image,
          width: 1600,
          height: 1000,
          alt: `${project.titleFa} — ${site.nameFa}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    keywords: [
      site.nameFa,
      site.name,
      project.titleFa,
      project.title,
      ...project.tags,
      ...project.stack,
      "نمونه کار",
      "توسعه‌دهنده وب",
      "portfolio",
    ],
  };
}

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.nameFa,
        alternateName: site.name,
        description: defaultDescription,
        inLanguage: ["fa", "en"],
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: site.nameFa,
        alternateName: site.name,
        url: siteUrl,
        image: absoluteUrl("/og.png"),
        jobTitle: site.titleFa,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          addressCountry: "IR",
        },
        sameAs: [site.telegram, "https://github.com/youneskazemi"],
        knowsAbout: [
          "Next.js",
          "React",
          "Django",
          "WordPress",
          "WooCommerce",
          "توسعه فول‌استک",
          "Telegram Mini Apps",
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: "نمونه کارها",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/projects/${p.slug}`),
          name: p.titleFa,
        })),
      },
    ],
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.titleFa,
    alternateName: project.title,
    description: project.summaryFa,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.image),
    creator: {
      "@type": "Person",
      name: site.nameFa,
      alternateName: site.name,
      url: siteUrl,
    },
    keywords: [...project.tags, ...project.stack].join(", "),
  };
}
