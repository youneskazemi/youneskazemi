export const site = {
  name: "Younes Kazemi",
  nameFa: "سیدیونس کاظمی",
  title: "Full-stack Web Developer",
  titleFa: "توسعه‌دهنده فول‌استک وب",
  domain: "youneskazemi.ir",
  email: "youneskazemi9798@gmail.com",
  telegram: "https://t.me/younes_kzi",
  telegramHandle: "@younes_kzi",
  location: "Iran",
  locationFa: "ایران",
  languages: ["fa", "en"] as const,
};

export type Lang = "fa" | "en";

export const navLinks = [
  { id: "work", href: "/#work", label: "Projects", labelFa: "پروژه‌ها" },
  { id: "skills", href: "/#skills", label: "Skills", labelFa: "مهارت‌ها" },
  { id: "services", href: "/#services", label: "Services", labelFa: "خدمات" },
  { id: "process", href: "/#process", label: "Process", labelFa: "فرآیند" },
  { id: "about", href: "/#about", label: "About", labelFa: "درباره" },
  { id: "contact", href: "/#contact", label: "Contact", labelFa: "تماس" },
] as const;

export const copy = {
  en: {
    heroLine:
      "Sites & shops that match the business — WordPress or custom Next.js + Django.",
    ctaWork: "See projects",
    ctaContact: "Contact me",
    workTitle: "Selected work",
    workSubtitle: "Real products for real businesses — shops, platforms, and custom web.",
    skillsTitle: "Skills",
    skillsSubtitle: "Practical stack for shipping freelance work end to end.",
    servicesTitle: "Services",
    servicesSubtitle: "Two clear paths — pick what fits your product and timeline.",
    processTitle: "How I work",
    processSubtitle: "Phased delivery so you always know what’s next.",
    aboutTitle: "About",
    contactTitle: "Let’s talk",
    contactSubtitle:
      "Tell me the site type (company / store / custom) and I’ll send a phase-by-phase estimate.",
    contactFormHint: "Prefer chat? Telegram is usually fastest.",
    live: "Live",
    details: "Details",
    available: "Available for freelance projects · Clear phases · Staged delivery",
    footerNote: "Built with Next.js · Hosted on Vercel",
    backHome: "Back home",
    visitSite: "Visit live site",
    stack: "Stack",
    overview: "Overview",
    notFound: "Project not found",
    langToggle: "EN",
    langToggleOther: "FA",
  },
  fa: {
    heroLine:
      "سایت و فروشگاهی که با کسب‌وکار جور باشد — WordPress یا محصول اختصاصی با Next.js و Django.",
    ctaWork: "مشاهده پروژه‌ها",
    ctaContact: "تماس با من",
    workTitle: "نمونه کارها",
    workSubtitle: "محصول واقعی برای کسب‌وکار واقعی — فروشگاه، پلتفرم و وب اختصاصی.",
    skillsTitle: "مهارت‌ها",
    skillsSubtitle: "استک عملی برای تحویل کامل پروژه فریلنس.",
    servicesTitle: "خدمات",
    servicesSubtitle: "دو مسیر شفاف — هرکدام مناسب محصول و زمان شما.",
    processTitle: "نحوه کار",
    processSubtitle: "تحویل فازبه‌فاز تا همیشه بدانید مرحله بعد چیست.",
    aboutTitle: "درباره من",
    contactTitle: "گفتگو کنیم",
    contactSubtitle:
      "بگو نوع سایت (شرکتی / فروشگاهی / اختصاصی) تا برآورد فازبه‌فاز بدم.",
    contactFormHint: "ترجیح می‌دی چت؟ معمولاً تلگرام سریع‌تر است.",
    live: "مشاهده",
    details: "جزئیات",
    available: "آماده پروژه فریلنس · فازبندی شفاف · تحویل مرحله‌ای",
    footerNote: "ساخته‌شده با Next.js · میزبانی روی Vercel",
    backHome: "بازگشت به خانه",
    visitSite: "مشاهده سایت",
    stack: "استک",
    overview: "خلاصه",
    notFound: "پروژه پیدا نشد",
    langToggle: "FA",
    langToggleOther: "EN",
  },
} as const;

export const skills = {
  en: [
    {
      group: "Frontend",
      items: ["Next.js", "React", "Tailwind CSS", "Responsive UI"],
    },
    {
      group: "Backend",
      items: ["Django", "REST APIs", "Auth basics", "Integrations"],
    },
    {
      group: "CMS / Shop",
      items: ["WordPress", "WooCommerce", "Product catalogs", "Payment flows"],
    },
    {
      group: "Other",
      items: ["Git", "Deploy (Vercel)", "Telegram bots", "Automation"],
    },
  ],
  fa: [
    {
      group: "فرانت‌اند",
      items: ["Next.js", "React", "Tailwind CSS", "رابط واکنش‌گرا"],
    },
    {
      group: "بک‌اند",
      items: ["Django", "REST API", "احراز هویت", "یکپارچه‌سازی"],
    },
    {
      group: "CMS / فروشگاه",
      items: ["WordPress", "WooCommerce", "کاتالوگ محصول", "جریان پرداخت"],
    },
    {
      group: "سایر",
      items: ["Git", "دیپلوی (Vercel)", "ربات تلگرام", "اتوماسیون"],
    },
  ],
} as const;

export const services = {
  en: [
    {
      title: "WordPress / WooCommerce",
      desc: "Company sites & online shops — faster launch, familiar admin panel, content-friendly.",
      points: ["Business & storefronts", "Faster to market", "Easy content updates"],
    },
    {
      title: "Custom Next.js + Django",
      desc: "Special features, dashboards, and long-term products when WordPress is not enough.",
      points: ["Custom logic & panels", "API-first products", "Scalable foundation"],
    },
  ],
  fa: [
    {
      title: "WordPress / WooCommerce",
      desc: "سایت شرکتی و فروشگاه آنلاین — راه‌اندازی سریع‌تر، پنل آشنا، مدیریت آسان محتوا.",
      points: ["سایت شرکتی و فروشگاهی", "زمان تحویل کوتاه‌تر", "به‌روزرسانی آسان محتوا"],
    },
    {
      title: "اختصاصی Next.js + Django",
      desc: "ویژگی خاص، پنل، و محصول بلندمدت وقتی WordPress کافی نیست.",
      points: ["منطق و پنل سفارشی", "محصول API-محور", "پایه مقیاس‌پذیر"],
    },
  ],
} as const;

export const process = {
  en: [
    {
      step: "01",
      title: "Scope & phases",
      desc: "We clarify goals, pages, and what ships in each phase — before heavy build.",
    },
    {
      step: "02",
      title: "Build & show progress",
      desc: "You see working steps, not a black box. Feedback stays early and cheap.",
    },
    {
      step: "03",
      title: "Deliver & hand over",
      desc: "Access, short walkthrough, and light support so you can run the site.",
    },
  ],
  fa: [
    {
      step: "۰۱",
      title: "محدوده و فازها",
      desc: "هدف، صفحات و خروجی هر فاز را قبل از ساخت سنگین روشن می‌کنیم.",
    },
    {
      step: "۰۲",
      title: "ساخت و نمایش پیشرفت",
      desc: "مراحل قابل‌دیدن — نه جعبه سیاه. بازخورد زود و کم‌هزینه می‌ماند.",
    },
    {
      step: "۰۳",
      title: "تحویل و واگذاری",
      desc: "دسترسی‌ها، راهنمای کوتاه و پشتیبانی اولیه تا خودتان سایت را اداره کنید.",
    },
  ],
} as const;

export const about = {
  en: {
    p1: "I’m Younes Kazemi — a full-stack freelancer focused on clean modern UI and sites that actually match how a business works.",
    p2: "I ship WordPress shops when speed and panel-friendly content matter, and custom Next.js + Django when the product needs special features.",
    p3: "Languages: فارسی · English. Based in Iran, remote-friendly for clear, phased freelance work.",
  },
  fa: {
    p1: "من سیدیونس کاظمی‌ام — فریلنسر فول‌استک با تمرکز روی UI مدرن و سایتی که واقعاً با نحوه کار کسب‌وکار جور باشد.",
    p2: "برای سرعت و پنل محتوا، فروشگاه WordPress می‌سازم؛ وقتی ویژگی خاص لازم است، محصول اختصاصی با Next.js و Django.",
    p3: "زبان‌ها: فارسی · English. مستقر در ایران، آماده کار ریموت با فازبندی شفاف.",
  },
} as const;
