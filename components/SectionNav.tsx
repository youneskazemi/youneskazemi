"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const SECTION_SELECTOR = "[data-snap-section]";

type Dot = { id: string; label: string };

/**
 * Side section dots only — free scroll, no forced snap.
 * (Previous GSAP snap pulled users back to section tops; removed.)
 */
export function SectionNav() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const nodes = () =>
      Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));

    const refresh = () => {
      const list = nodes();
      setDots(
        list.map((el) => ({
          id: el.id || "",
          label: el.dataset.snapLabel || el.id || "section",
        })),
      );
      setShow(mqDesktop.matches && list.length > 1 && !mqReduce.matches);
    };

    refresh();

    const observers: IntersectionObserver[] = [];
    const list = nodes();
    list.forEach((section, i) => {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActive(i);
        },
        { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      io.observe(section);
      observers.push(io);
    });

    const onChange = () => refresh();
    mqDesktop.addEventListener("change", onChange);
    mqReduce.addEventListener("change", onChange);

    return () => {
      observers.forEach((o) => o.disconnect());
      mqDesktop.removeEventListener("change", onChange);
      mqReduce.removeEventListener("change", onChange);
    };
  }, []);

  if (!show || dots.length < 2) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed end-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 md:flex lg:end-6"
    >
      {dots.map((dot, i) => (
        <a
          key={dot.id || i}
          href={dot.id ? `/#${dot.id}` : "#"}
          title={dot.label}
          aria-label={dot.label}
          aria-current={active === i ? "true" : undefined}
          className={cn(
            "pointer-events-auto block h-2 w-2 rounded-full transition-all duration-300",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
            active === i
              ? "h-6 w-2 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
              : "bg-white/25 hover:bg-white/50",
          )}
        />
      ))}
    </nav>
  );
}
