"use client";

import { site, navLinks } from "@/content/site";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, isFa } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/6 bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-100">
            {isFa ? site.nameFa : site.name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-zinc-500">{t.available}</p>
          <p className="mt-4 text-xs text-zinc-600">
            © {year} · {t.footerNote}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-sm text-zinc-400 transition hover:text-zinc-100"
            >
              {isFa ? link.labelFa : link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
