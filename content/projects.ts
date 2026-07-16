export type Project = {
  slug: string;
  title: string;
  titleFa: string;
  href: string;
  tags: string[];
  summary: string;
  summaryFa: string;
  image: string;
  /** Featured on home (recent / best). */
  featured: boolean;
  accent: string;
  stack: string[];
  body: string;
  bodyFa: string;
  year?: string;
};

/**
 * Full catalog. Home shows `featured` only.
 * Covers: /projects/covers/{slug}.jpg generated from project_png_raw.
 */
export const projects: Project[] = [
  {
    slug: "latorin",
    title: "Latorin",
    titleFa: "لاتورین",
    href: "https://latorin.ir",
    tags: ["Custom", "Next.js", "EdTech"],
    summary:
      "IELTS practice platform — real exam flow, Speaking with AI, scores and feedback.",
    summaryFa:
      "پلتفرم تمرین آیلتس — جریان آزمون واقعی، Speaking با هوش مصنوعی، نمره و بازخورد.",
    image: "/projects/covers/latorin.jpg",
    featured: true,
    accent: "#10b981",
    stack: ["Next.js", "React", "AI", "API"],
    year: "2025",
    body: "Latorin is a custom product for IELTS candidates: pick skills, practice under exam-like conditions, and get structured feedback — especially live Speaking with AI.",
    bodyFa:
      "لاتورین محصول اختصاصی برای داوطلبان آیلتس است: انتخاب مهارت، تمرین شبیه آزمون واقعی، و بازخورد ساخت‌یافته — به‌ویژه Speaking زنده با هوش مصنوعی.",
  },
  {
    slug: "apex78",
    title: "Apex78",
    titleFa: "اپکس ۷۸",
    href: "https://apex78.org",
    tags: ["Web", "Association", "Content"],
    summary: "Wealth Architects Association — professional web presence.",
    summaryFa: "انجمن معماران ثروت — حضور وب حرفه‌ای.",
    image: "/projects/covers/apex78.jpg",
    featured: true,
    accent: "#a78bfa",
    stack: ["Web", "Content site"],
    year: "2025",
    body: "Apex78 presents the association with a clean, trustworthy layout aimed at members and visitors who need clarity first.",
    bodyFa:
      "اپکس ۷۸ انجمن را با چیدمان تمیز و قابل‌اعتماد معرفی می‌کند؛ اولویت با وضوح برای اعضا و بازدیدکنندگان است.",
  },
  {
    slug: "gallerychiic",
    title: "Gallery Chiic",
    titleFa: "گالری شیک",
    href: "https://gallerychiic.com",
    tags: ["Store", "WordPress", "Lifestyle"],
    summary:
      "Lifestyle e‑commerce for home décor — soft cream UI, categories, Instagram CTA.",
    summaryFa:
      "فروشگاه سبک زندگی دکوراسیون — UI کرم ملایم، دسته‌بندی، CTA اینستاگرام.",
    image: "/projects/covers/gallerychiic.jpg",
    featured: true,
    accent: "#d4a574",
    stack: ["WordPress", "WooCommerce", "Storefront"],
    year: "2025",
    body: "Gallery Chiic (گالری شیک) sells candles, ceramics, and home objects with an editorial shop feel — product grids, trust blocks, and mobile-friendly commerce.",
    bodyFa:
      "گالری شیک شمع، سرامیک و اشیاء خانه را با حس ویترین ادیتوریال می‌فروشد — شبکه محصول، بلوک اعتماد و خرید موبایل‌فرندلی.",
  },
  {
    slug: "ticktom",
    title: "TickTOM",
    titleFa: "تیک‌تام",
    href: "https://t.me/TiCkTOM_bot",
    tags: ["Telegram", "Mini App", "Game"],
    summary:
      "Telegram mini-app game (TickTOM Universe) — cosmos UI with TON branding.",
    summaryFa:
      "بازی مینی‌اپ تلگرام (TickTOM Universe) — رابط فضایی با برند TON.",
    image: "/projects/covers/ticktom.jpg",
    featured: true,
    accent: "#f59e0b",
    stack: ["Telegram Mini App", "WebApp", "TON"],
    year: "2025",
    body: "TickTOM is a Telegram mini-app game (TickTOM Universe): dark cosmos aesthetic, character hero screen, and asset loading flow for an in-messenger product.",
    bodyFa:
      "تیک‌تام بازی مینی‌اپ تلگرام (TickTOM Universe) است: زیبایی‌شناسی کیهانی تیره، صفحه هیرو کاراکتر، و جریان لود دارایی داخل مسنجر.",
  },
  {
    slug: "rimelcosmetics",
    title: "Rimel Cosmetics",
    titleFa: "ریمل کازمتیکس",
    href: "https://rimelcosmetics.ir",
    tags: ["WordPress", "WooCommerce", "Beauty"],
    summary:
      "Beauty e‑commerce — cream UI, product categories, campaigns, and shop admin.",
    summaryFa:
      "فروشگاه زیبایی — UI کرم، دسته‌بندی محصول، کمپین و پنل فروشگاهی.",
    image: "/projects/covers/rimelcosmetics.jpg",
    featured: true,
    accent: "#be185d",
    stack: ["WordPress", "WooCommerce"],
    year: "2025",
    body: "Online store for cosmetics: catalog, cart, category landing blocks, and shop-friendly admin so the business can update products without a developer every time.",
    bodyFa:
      "فروشگاه آنلاین آرایشی: کاتالوگ، سبد، لندینگ دسته، و پنل فروشگاهی تا به‌روزرسانی محصول بدون وابستگی دائمی به برنامه‌نویس باشد.",
  },
  {
    slug: "rayan-ai",
    title: "Rayan AI",
    titleFa: "رایان هوش مصنوعی",
    href: "https://rayanai.io",
    tags: ["AI", "SaaS", "Custom"],
    summary:
      "Persian AI tools platform — search, voice-to-notes, text gen, and utilities.",
    summaryFa:
      "پلتفرم ابزارهای هوش مصنوعی فارسی — جستجو، ویس به جزوه، تولید متن و ابزارها.",
    image: "/projects/covers/rayan-ai.jpg",
    featured: true,
    accent: "#60a5fa",
    stack: ["Next.js / Web", "AI APIs", "Dashboard"],
    year: "2025",
    body: "Rayan AI is a dark SaaS-style product for Persian users: advanced search, voice-to-notes, text generation, and developer-oriented tools with a clean tool grid.",
    bodyFa:
      "رایان AI محصولی با حس SaaS تیره برای کاربران فارسی است: جستجوی پیشرفته، ویس به جزوه، تولید متن و ابزارهای کاربردی با شبکه ابزار تمیز.",
  },
  {
    slug: "cadinu",
    title: "Cadinu Apps",
    titleFa: "کادینو اپس",
    href: "https://apps.cadinu.io/",
    tags: ["DeFi", "Web3", "dApp"],
    summary:
      "CadinuSwap ecosystem — MultiSwap, farms, staking, lottery, NFT referral, and governance.",
    summaryFa:
      "اکوسیستم CadinuSwap — MultiSwap، فارم، استیکینگ، لاتاری، NFT و حاکمیت.",
    image: "/projects/covers/cadinu.jpg",
    featured: true,
    accent: "#6366f1",
    stack: ["React / Next", "Web3", "BSC", "DEX"],
    year: "2024",
    body: "Cadinu Apps (apps.cadinu.io) is a multi-module DeFi dApp hub: token swap, liquidity farming, staking pools, lottery, NFT referral, lock tools, trading competition, and community governance — multi-language wallet-connected UI for the CADINU ecosystem.",
    bodyFa:
      "اپ‌های کادینو (apps.cadinu.io) هاب dApp چندماژوله دیفای است: سواپ، فارم نقدینگی، استیکینگ، لاتاری، معرفی NFT، ابزار قفل، رقابت ترید و حاکمیت جامعه — رابط چندزبانه با اتصال کیف‌پول برای اکوسیستم CADINU.",
  },
  // Extra from raw folder
  {
    slug: "jrfit",
    title: "JR Fit",
    titleFa: "جی‌آر فیت",
    href: "https://jrfit.com",
    tags: ["WordPress", "Fitness", "Store"],
    summary:
      "Fitness brand site & shop — supplements, programs, and gym services.",
    summaryFa:
      "سایت و فروشگاه برند تناسب‌اندام — مکمل، برنامه تمرینی و خدمات باشگاه.",
    image: "/projects/covers/jrfit.jpg",
    featured: true,
    accent: "#3b82f6",
    stack: ["WordPress", "WooCommerce", "Marketing"],
    year: "2024",
    body: "JR Fit combines e‑commerce for sports nutrition with training programs and brand storytelling on a dark, high-energy UI.",
    bodyFa:
      "جی‌آر فیت فروشگاه مکمل ورزشی را با برنامه تمرینی و استوری برند روی UI تیره و پرانرژی ترکیب می‌کند.",
  },
];

/**
 * Full catalog order.
 * User: latorin → jrfit → apex78 → gallerychiic → ticktom → rimelcosmetics → …
 */
export const recentSlugs = [
  "latorin",
  "jrfit",
  "apex78",
  "gallerychiic",
  "ticktom",
  "rimelcosmetics",
  "rayan-ai",
  "cadinu",
] as const;

/** How many case studies to show on the landing page before “View all”. */
export const HOME_SHOWCASE_COUNT = 3;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Full ordered catalog (All work page). */
export function getOrderedProjects() {
  const ordered = recentSlugs
    .map((slug) => getProject(slug))
    .filter((p): p is Project => Boolean(p));
  const seen = new Set(ordered.map((p) => p.slug));
  const rest = projects.filter((p) => !seen.has(p.slug));
  return [...ordered, ...rest];
}

/** Landing: first N projects only. */
export function getHomeShowcaseProjects(n = HOME_SHOWCASE_COUNT) {
  return getOrderedProjects().slice(0, n);
}

export function getRecentProjects() {
  return getOrderedProjects();
}

export function getFeaturedProjects() {
  return getHomeShowcaseProjects();
}
