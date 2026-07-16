"use client";

import { Logo } from "@/components/Logo";
import { site, navLinks } from "@/content/site";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, isFa } = useI18n();
  const year = new Date().getFullYear();
  const brand = isFa ? site.nameFa : site.name;

  return (
    <footer className="border-t border-white/8 bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo showWordmark wordmark={brand} />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
            {t.available}
          </p>
          <p className="mt-4 text-xs text-zinc-500">
            © {year} · {t.footerNote}
          </p>
        </div>

        <nav
          className="flex flex-wrap gap-x-1 gap-y-1"
          aria-label={isFa ? "فوتر" : "Footer"}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="inline-flex min-h-11 items-center px-3 text-sm text-zinc-400 transition hover:text-zinc-100"
            >
              {isFa ? link.labelFa : link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
