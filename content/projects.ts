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
  /** Domain no longer resolves — keep the case study, drop the outbound link. */
  offline?: boolean;
  /** Multi-screenshot gallery URLs for case studies. */
  gallery?: string[];
  /** High-impact proof highlights / badges. */
  metrics?: { label: string; labelFa: string }[];
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
    tags: ["Custom", "Next.js", "EdTech", "AI"],
    summary:
      "Interactive AI IELTS prep platform — live conversational speaking examiner, Full Mock simulations, and diagnostic feedback.",
    summaryFa:
      "پلتفرم هوشمند آمادگی آزمون آیلتس — مصاحبه‌گر صوتی زنده با هوش مصنوعی، شبیه‌سازی آزمون کامل هر ۴ مهارت و کارنامه تشخیصی.",
    image: "/projects/covers/latorin.jpg",
    featured: true,
    accent: "#10b981",
    stack: ["Next.js", "React", "Web Audio API", "Conversational AI"],
    year: "2026",
    metrics: [
      { label: "AI Voice Examiner", labelFa: "مصاحبه‌گر صوتی زنده" },
      { label: "4-Skill Full Mock", labelFa: "شبیه‌سازی ۴ مهارت" },
      { label: "Instant Scoring", labelFa: "کارنامه تشخیصی آنی" },
    ],
    gallery: ["/projects/covers/latorin.jpg"],
    body: "Latorin (latorin.ir) is a full-featured AI-driven IELTS training product: users engage in real-time conversational speaking practice with an intelligent virtual examiner, take Full Mock exams covering Speaking, Reading, Listening, and Writing under authentic timed conditions, and receive instant rubric-aligned band scores with pinpoint feedback.",
    bodyFa:
      "لاتورین (latorin.ir) پلتفرم تخصصی مبتنی بر هوش مصنوعی برای داوطلبان آیلتس است: امکان گفت‌وگوی زنده صوتی با مصاحبه‌گر هوشمند، شبیه‌سازی آزمون فول ماک هر چهار مهارت (Speaking، Reading، Listening، Writing) در شرایط استاندارد آزمون، و دریافت نمره دقیق بند اسکور همراه با تحلیل نقاط ضعف و راهکار بهبود.",
  },
  {
    slug: "sorkhdan",
    title: "Sorkhdan",
    titleFa: "سرخدان",
    href: "https://sorkhdan.ir",
    tags: ["PWA", "Next.js", "E-commerce", "Direct-from-Farm"],
    summary:
      "Direct-from-farm Qaenat saffron & barberry PWA with instant offline access, dosage calculator, and lab certificates.",
    summaryFa:
      "پلتفرم فروشگاهی PWA زعفران و زرشک قائنات — خرید مستقیم از کشاورز، وب‌اپ نصب‌شونده، محاسبه‌گر هوشمند مقدار مصرف و شناسنامه آزمایشگاهی.",
    image: "/projects/covers/sorkhdan.jpg",
    featured: true,
    accent: "#e11d48",
    stack: ["Next.js", "PWA / Webmanifest", "TypeScript", "Tailwind CSS"],
    year: "2026",
    metrics: [
      { label: "PWA Web App", labelFa: "وب‌اپلیکیشن PWA" },
      { label: "Crocin 268+ Tested", labelFa: "عیار کروسین ۲۶۸+" },
      { label: "100% Direct Farm", labelFa: "۱۰۰٪ مستقیم از مزرعه" },
    ],
    gallery: [
      "/projects/covers/sorkhdan.jpg",
      "/projects/gallery/sorkhdan-features.jpg",
      "/projects/gallery/sorkhdan-mobile.jpg",
    ],
    body: "Sorkhdan (sorkhdan.ir) is a high-performance Progressive Web Application (PWA) delivering authentic Qaenat saffron and Birjand barberry directly from farmers to households. Built with Next.js App Router and a rich PWA architecture, it features instant mobile homescreen installation, web push order notifications, lab testing certification (Crocin 268+), an interactive saffron dosage calculator, ice-shock brewing interactive guide, and ultra-fast frictionless checkout with complete parcel tracking.",
    bodyFa:
      "سرخدان (sorkhdan.ir) یک وب‌اپلیکیشن پیش‌رونده (PWA) با عملکرد فوق‌سریع است که زعفران اصیل قائنات و زرشک پفکی بیرجند را بی‌واسطه از مزرعه به دست مصرف‌کننده می‌رساند. این پروژه با Next.js App Router و معماری مدرن PWA توسعه یافته و شامل قابلیت نصب مستقیم روی صفحه اصلی گوشی، اعلان‌های وب هوشمند وضعیت سفارش، نمایش شناسنامه آزمایشگاهی با عیار کروسین ۲۶۸+، ابزار تعاملی محاسبه مقدار مصرف مورد نیاز، راهنمای دم‌آوری با شوک یخ، و فرآیند خرید سریع با رهگیری پستی مرسوله است.",
  },
  {
    slug: "ekramshop",
    title: "Ekram Shop",
    titleFa: "اکرام شاپ",
    href: "https://ekramshop.com",
    tags: ["SEO", "Technical SEO", "B2B E-commerce", "HVAC"],
    summary:
      "Technical SEO architecture and e-commerce platform for industrial refrigeration, copper tubing, and HVAC equipment.",
    summaryFa:
      "پروژه جامع سئو فنی و فروشگاه آنلاین تجهیزات برودتی و صنعتی — ابزار آنلاین استعلام قیمت مس، ساختار دسته‌بندی سئو‌محور و رتبه‌گیری در کلمات کلیدی رقابتی.",
    image: "/projects/covers/ekramshop.jpg",
    featured: true,
    accent: "#ea580c",
    stack: ["Technical SEO", "Semantic Schema", "E-commerce", "Market Price Tool"],
    year: "2026",
    metrics: [
      { label: "Top 3 Google HVAC", labelFa: "رتبه‌های برتر گوگل برودت" },
      { label: "Live Copper Tool", labelFa: "استعلام آنلاین قیمت مس" },
      { label: "Technical SEO", labelFa: "معماری سئوی فنی" },
    ],
    gallery: [
      "/projects/covers/ekramshop.jpg",
      "/projects/gallery/ekramshop-calculator.jpg",
      "/projects/gallery/ekramshop-mobile.jpg",
    ],
    body: "Ekram Shop (ekramshop.com) is a commercial e-commerce platform specializing in industrial refrigeration equipment, copper pipes, elastomeric insulation, compressors, and refrigerant gases. Younes engineered a data-driven technical SEO strategy: built custom interactive copper pipe price calculators, resolved faceted filter index bloat, implemented granular Schema.org JSON-LD microdata, and created targeted B2B wholesale conversion funnels, resulting in dominant organic SERP rankings across competitive industrial cooling and HVAC queries in Iran.",
    bodyFa:
      "اکرام شاپ (ekramshop.com) یک پلتفرم فروشگاهی و تخصصی در حوزه تجهیزات برودتی، لوله‌های مسی، عایق الاستومری، گازهای مبرد و کمپرسورهای صنعتی است. یونس در این پروژه معماری سئوی فنی (Technical SEO) همه‌جانبه‌ای پیاده‌سازی کرد: توسعه ابزار تعاملی محاسبه آنلاین قیمت لوله مسی و تحلیل روند بازار مس، بهینه‌سازی ساختار دسته‌بندی‌ها و رفع مشکلات کنیبالیزیشن فیلترها، نشانه‌گذاری غنی داده‌های ساختاریافته (Schema.org)، و ایجاد مسیرهای تبدیل سفارش عمده B2B که منجر به کسب جایگاه‌های برتر گوگل در کلمات پرترافیک حوزه برودت و تأسیسات کشور شد.",
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
    offline: true,
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
    href: "https://jrfit.ir",
    tags: ["WordPress", "Fitness", "Store", "Coaching"],
    summary:
      "Fitness brand platform & nutrition store — personalized coaching programs, plan selector, and member transformations.",
    summaryFa:
      "سایت و فروشگاه تخصصی فیتنس — مربیگری آنلاین، پرسشنامه هوشمند انتخاب پلن، گالری تغییرات اعضا و مکمل‌های ورزشی.",
    image: "/projects/covers/jrfit.jpg",
    featured: true,
    accent: "#3b82f6",
    stack: ["WordPress", "WooCommerce", "Plan Selector", "Marketing"],
    year: "2026",
    metrics: [
      { label: "Custom Coaching", labelFa: "کوچینگ اختصاصی" },
      { label: "Plan Selector Quiz", labelFa: "پرسشنامه انتخاب پلن" },
      { label: "WooCommerce Shop", labelFa: "فروشگاه مکمل ورزشی" },
    ],
    gallery: ["/projects/covers/jrfit.jpg"],
    body: "JR Fit (jrfit.ir) is a premier fitness and online coaching platform combining tailored workout and nutrition plans with an e-commerce shop for authentic sports supplements. It features a smart quiz guiding users to their ideal coaching tier, high-energy athlete transformation showcases, event registrations, and seamless WooCommerce ordering.",
    bodyFa:
      "جی‌آر فیت (jrfit.ir) پلتفرم جامع تناسب اندام و کوچینگ آنلاین است که برنامه‌های اختصاصی تمرین و تغذیه را با فروشگاه مکمل‌های ورزشی اورجینال ترکیب می‌کند. این وب‌سایت دارای سیستم پرسشنامه هوشمند انتخاب سطح پلن، ویترین نتایج واقعی و تغییرات بدنی اعضا، ثبت‌نام ایونت‌های ورزشی و فرآیند سریع خرید آنلاین است.",
  },
  {
    slug: "avcafebakery",
    title: "AV Cafe Bakery",
    titleFa: "کافه بیکری AV",
    href: "https://avcafebakery.vercel.app/",
    tags: ["Web", "Cafe", "Local"],
    summary:
      "Shiraz cafe-bakery site — FA-first menu, events, and visit info with warm brick branding.",
    summaryFa:
      "سایت کافه بیکری شیراز — منوی فارسی، برنامه‌ها و اطلاعات مراجعه با برند گرم آجری.",
    image: "/projects/covers/avcafebakery.jpg",
    featured: true,
    accent: "#b45309",
    stack: ["Next.js", "Tailwind", "RTL / FA-first"],
    year: "2026",
    body: "AV Cafe Bakery is a single-page brand site for a Shiraz cafe-bakery (Behesht Blvd): hero storytelling, hot/cold drinks and bakery menu with prices, upcoming events, hours, map, and Instagram CTAs — cream-and-brick palette, Vazirmatn + display type, mobile-first takeaway positioning.",
    bodyFa:
      "کافه بیکری AV سایت یک‌صفحه‌ای برند برای کافه بیکری شیراز (بلوار بهشت) است: هیرو داستانی، منوی نوشیدنی گرم/خنک و بیکری با قیمت، برنامه‌ها، ساعت کار، نقشه و CTA اینستاگرام — پالت کرم و آجری، Vazirmatn + فونت نمایشی، و موقعیت تیک‌اوی موبایل‌فرست.",
  },
];

/**
 * Full catalog order.
 * Flagship showcases: latorin → sorkhdan → ekramshop → jrfit → ...
 */
export const recentSlugs = [
  "latorin",
  "sorkhdan",
  "ekramshop",
  "jrfit",
  "avcafebakery",
  "apex78",
  "gallerychiic",
  "ticktom",
  "rimelcosmetics",
  "rayan-ai",
  "cadinu",
] as const;

/** How many case studies to show on the landing page before “View all”. */
export const HOME_SHOWCASE_COUNT = 4;

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
