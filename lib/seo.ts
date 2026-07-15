import type { Metadata } from "next";
import { site } from "@/content/site";
import { projects, type Project } from "@/content/projects";

/** Primary public origin (canonical). */
export const siteUrl = `https://${site.domain}`;

export const defaultTitle = `${site.name} · ${site.title}`;
export const defaultDescription =
  "Younes Kazemi (سیدیونس کاظمی) — full-stack web developer. WordPress & WooCommerce shops, custom Next.js + Django products. Freelance, Iran & remote.";

export function absoluteUrl(path = "/") {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${siteUrl}${path === "/" ? "" : path}`;
}

export function projectTitle(project: Project) {
  return `${site.name} · ${project.title}`;
}

export function projectMeta(project: Project): Metadata {
  const title = projectTitle(project);
  const description = `${project.summary} | ${project.summaryFa}`;
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
      siteName: site.name,
      locale: "fa_IR",
      alternateLocale: ["en_US"],
      images: [
        {
          url: image,
          width: 1600,
          height: 1000,
          alt: `${project.title} — ${site.name}`,
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
      site.name,
      site.nameFa,
      project.title,
      project.titleFa,
      ...project.tags,
      ...project.stack,
      "portfolio",
      "web developer",
      "توسعه‌دهنده وب",
    ],
  };
}

/** JSON-LD for Person + WebSite + ItemList (portfolio). */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        description: defaultDescription,
        inLanguage: ["fa", "en"],
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: site.name,
        alternateName: site.nameFa,
        url: siteUrl,
        image: absoluteUrl("/logo.svg"),
        jobTitle: site.title,
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
          "Full-stack development",
          "Telegram Mini Apps",
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: "Portfolio projects",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/projects/${p.slug}`),
          name: p.title,
        })),
      },
    ],
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    alternateName: project.titleFa,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.image),
    creator: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
    keywords: [...project.tags, ...project.stack].join(", "),
  };
}
