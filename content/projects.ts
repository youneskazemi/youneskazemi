export type Project = {
  slug: string;
  title: string;
  titleFa: string;
  href: string;
  tags: string[];
  summary: string;
  summaryFa: string;
  image: string;
  featured: boolean;
  accent: string;
  stack: string[];
  body: string;
  bodyFa: string;
};

export const projects: Project[] = [
  {
    slug: "latorin",
    title: "Latorin",
    titleFa: "لاتورین",
    href: "https://latorin.ir",
    tags: ["Custom", "Next.js", "Platform"],
    summary: "Custom web product — take the real exam, do it right once.",
    summaryFa: "محصول وب اختصاصی — از آزمون واقعی، یک‌بار درست امتحان کن.",
    image: "/projects/latorin.png",
    featured: true,
    accent: "#38bdf8",
    stack: ["Next.js", "React", "API"],
    body: "Latorin is a custom web platform focused on a clear exam experience. Built as a product-style site rather than a generic brochure page.",
    bodyFa:
      "لاتورین پلتفرم وب اختصاصی با تمرکز روی تجربه شفاف آزمون است؛ بیشتر شبیه محصول، نه یک لندینگ معمولی.",
  },
  {
    slug: "apex78",
    title: "Apex78",
    titleFa: "اپکس ۷۸",
    href: "https://apex78.org",
    tags: ["Web", "Association", "Content"],
    summary: "Wealth Architects Association — professional web presence.",
    summaryFa: "انجمن معماران ثروت — حضور وب حرفه‌ای.",
    image: "/projects/apex78.jpg",
    featured: true,
    accent: "#a78bfa",
    stack: ["Web", "Content site"],
    body: "Apex78 presents the association with a clean, trustworthy layout aimed at members and visitors who need clarity first.",
    bodyFa:
      "اپکس ۷۸ انجمن را با چیدمان تمیز و قابل‌اعتماد معرفی می‌کند؛ اولویت با وضوح برای اعضا و بازدیدکنندگان است.",
  },
  {
    slug: "rimelcosmetics",
    title: "Rimel Cosmetics",
    titleFa: "ریمل کازمتیکس",
    href: "https://rimelcosmetics.ir",
    tags: ["WordPress", "WooCommerce", "Store"],
    summary: "Beauty e‑commerce — cosmetics store with WooCommerce.",
    summaryFa: "فروشگاه آنلاین آرایشی — فروشگاه زیبایی با ووکامرس.",
    image: "/projects/rimel.png",
    featured: true,
    accent: "#f472b6",
    stack: ["WordPress", "WooCommerce"],
    body: "Online store for cosmetics products: catalog, cart, and shop-friendly admin so the business can update products without a developer for every change.",
    bodyFa:
      "فروشگاه آنلاین محصولات آرایشی: کاتالوگ، سبد خرید و پنل فروشگاهی تا به‌روزرسانی محصول بدون وابستگی دائمی به برنامه‌نویس انجام شود.",
  },
  {
    slug: "gallerychiic",
    title: "Gallery Chiic",
    titleFa: "گالری شیک",
    href: "https://gallerychiic.com",
    tags: ["Web", "Store", "Gallery"],
    summary: "Gallery-style web presence for a stylish brand storefront.",
    summaryFa: "حضور وب گالری‌محور برای ویترین برند شیک.",
    image: "/projects/gallerychiic.png",
    featured: true,
    accent: "#34d399",
    stack: ["Web", "Storefront"],
    body: "Gallery Chiic focuses on visual presentation — a storefront feel that puts products and brand mood first.",
    bodyFa:
      "گالری شیک روی ارائه بصری تمرکز دارد — حس ویترین که محصول و حال‌وهوای برند را جلو می‌آورد.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
