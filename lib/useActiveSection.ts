"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const SECTION_IDS = [
  "top",
  "work",
  "projects",
  "skills",
  "services",
  "process",
  "about",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection(): SectionId {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<SectionId>("top");

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // 1. If near top of page
        if (scrollY < 120) {
          setActiveSection("top");
          return;
        }

        // 2. If near bottom of page, activate contact
        if (scrollY + windowHeight >= docHeight - 80) {
          setActiveSection("contact");
          return;
        }

        // 3. Find section currently occupying the focal area (30% from top of viewport)
        const focalLine = scrollY + windowHeight * 0.35;
        let current: SectionId = "top";

        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (!el) continue;

          const top = el.offsetTop;
          if (top <= focalLine) {
            current = id;
          }
        }

        setActiveSection(current);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return activeSection;
}
