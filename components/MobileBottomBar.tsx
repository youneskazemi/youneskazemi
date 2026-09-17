"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function MobileBottomBar() {
  const pathname = usePathname();
  const { isFa, toggleLang, lang } = useI18n();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const isProjects = pathname.startsWith("/projects");
  const isHome = pathname === "/";

  return (
    <div
      className="fixed bottom-3 inset-x-3 z-40 mx-auto max-w-md md:hidden"
      role="navigation"
      aria-label={isFa ? "ناوبری پایین صفحه" : "Mobile Bottom Navigation"}
    >
      <div className="flex h-16 items-center justify-around rounded-2xl border border-white/10 bg-[#09090e]/92 px-2 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-2xl ring-1 ring-white/10 pb-[env(safe-area-inset-bottom,0px)]">
        {/* 1. Home */}
        <Link
          href="/#top"
          className={cn(
            "flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-[11px] font-medium transition active:scale-90",
            isHome && !isProjects
              ? "text-sky-400 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          )}
          aria-label={isFa ? "خانه" : "Home"}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isHome && !isProjects ? 2.2 : 1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>{isFa ? "خانه" : "Home"}</span>
        </Link>

        {/* 2. Projects Catalog */}
        <Link
          href="/projects"
          className={cn(
            "relative flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-[11px] font-medium transition active:scale-90",
            isProjects
              ? "text-sky-400 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          )}
          aria-label={isFa ? "همه نمونه‌کارها" : "Projects"}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isProjects ? 2.2 : 1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>{isFa ? "پروژه‌ها" : "Work"}</span>
          {isProjects && (
            <span className="absolute -top-1 h-1 w-1 rounded-full bg-sky-400" />
          )}
        </Link>

        {/* 3. Services / Phased Work */}
        <Link
          href="/#services"
          className="flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-[11px] font-medium text-zinc-400 transition hover:text-zinc-200 active:scale-90"
          aria-label={isFa ? "خدمات و فازها" : "Services"}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>{isFa ? "خدمات" : "Services"}</span>
        </Link>

        {/* 4. Contact CTA */}
        <Link
          href="/#contact"
          className="flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-[11px] font-medium text-zinc-400 transition hover:text-sky-300 active:scale-90"
          aria-label={isFa ? "تماس و شروع پروژه" : "Contact"}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{isFa ? "تماس" : "Contact"}</span>
        </Link>

        {/* 5. Language Toggle Button */}
        <button
          type="button"
          onClick={toggleLang}
          className="flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-[11px] font-medium text-zinc-400 transition hover:text-sky-300 active:scale-90"
          aria-label={lang === "fa" ? "Switch to English" : "تغییر به فارسی"}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-md border border-white/15 bg-white/5 font-mono text-[10px] font-bold text-sky-400">
            {lang === "fa" ? "EN" : "فا"}
          </span>
          <span>{isFa ? "زبان" : "Lang"}</span>
        </button>
      </div>
    </div>
  );
}
