"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

const SECTION_SELECTOR = "[data-snap-section]";

type Dot = { id: string; label: string };

/**
 * Soft GSAP section snap (Awwwards-style), not hard full-page lock.
 * Snaps to nearest section start after scroll settles; disabled for
 * reduced-motion and narrow viewports where free scroll is better.
 */
export function GsapSnapScroll() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqDesktop = window.matchMedia("(min-width: 768px)");

    const refreshDots = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(SECTION_SELECTOR),
      );
      setDots(
        nodes.map((el) => ({
          id: el.id || el.dataset.snapId || "",
          label: el.dataset.snapLabel || el.id || "section",
        })),
      );
      return nodes;
    };

    let snapTrigger: ScrollTrigger | null = null;
    const sectionTriggers: ScrollTrigger[] = [];

    const setup = () => {
      snapTrigger?.kill();
      sectionTriggers.forEach((t) => t.kill());
      sectionTriggers.length = 0;

      const allow = !mqReduce.matches && mqDesktop.matches;
      setEnabled(allow);
      const nodes = refreshDots();
      if (!allow || nodes.length < 2) {
        ScrollTrigger.refresh();
        return;
      }

      // Track active section for side dots
      nodes.forEach((section, i) => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
        sectionTriggers.push(st);
      });

      // Soft snap to nearest section top (variable heights)
      const getSnapProgress = () => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        if (max <= 0) return [0];
        return nodes.map((el) => {
          const top =
            el.getBoundingClientRect().top +
            window.scrollY -
            72; /* navbar offset */
          return gsap.utils.clamp(0, 1, top / max);
        });
      };

      snapTrigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        snap: {
          snapTo: (value) => gsap.utils.snap(getSnapProgress(), value),
          duration: { min: 0.18, max: 0.55 },
          delay: 0.06,
          ease: "power2.inOut",
          inertia: false,
        },
      });

      ScrollTrigger.refresh();
    };

    // Prefer GSAP snap over CSS smooth scroll (they fight)
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    setup();
    mqReduce.addEventListener("change", setup);
    mqDesktop.addEventListener("change", setup);
    window.addEventListener("resize", setup);

    return () => {
      html.style.scrollBehavior = prev;
      mqReduce.removeEventListener("change", setup);
      mqDesktop.removeEventListener("change", setup);
      window.removeEventListener("resize", setup);
      snapTrigger?.kill();
      sectionTriggers.forEach((t) => t.kill());
    };
  }, []);

  if (!enabled || dots.length < 2) return null;

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
