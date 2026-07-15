"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { projects } from "@/content/projects";
import { useI18n } from "@/lib/i18n";

/**
 * Right-side hero visual: stacked project covers (Awwwards-style composition).
 * Replace any image under public/projects/ anytime.
 * Optional portrait: drop public/hero-portrait.jpg and set USE_PORTRAIT.
 */
const USE_PORTRAIT = false; // set true when you add public/hero-portrait.jpg

export function HeroVisual() {
  const reduce = useReducedMotion();
  const { isFa } = useI18n();
  const covers = projects.filter((p) => p.featured).slice(0, 3);

  if (USE_PORTRAIT) {
    return (
      <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl shadow-sky-500/10">
        <Image
          src="/hero-portrait.jpg"
          alt={isFa ? "سیدیونس کاظمی" : "Younes Kazemi"}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 90vw, 420px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[min(52vh,420px)] w-full max-w-md lg:h-[min(58vh,480px)]">
      {/* ambient glow behind stack */}
      <div
        className="pointer-events-none absolute inset-8 rounded-full bg-sky-500/15 blur-3xl"
        aria-hidden
      />

      {covers.map((project, i) => {
        const title = isFa ? project.titleFa : project.title;
        // stack: back → front, slight offset & rotate
        const layers = [
          { x: isFa ? 28 : -28, y: 36, r: isFa ? -8 : 8, z: 10, s: 0.9 },
          { x: isFa ? -20 : 20, y: 16, r: isFa ? 6 : -6, z: 20, s: 0.95 },
          { x: 0, y: 0, r: isFa ? -2 : 2, z: 30, s: 1 },
        ][i] ?? { x: 0, y: 0, r: 0, z: 10, s: 1 };

        return (
          <motion.div
            key={project.slug}
            className="absolute inset-x-6 top-4 overflow-hidden rounded-2xl border border-white/10 bg-card shadow-xl shadow-black/40"
            style={{
              zIndex: layers.z,
              aspectRatio: "16 / 10",
            }}
            initial={
              reduce
                ? false
                : { opacity: 0, y: 40, rotate: layers.r + 4, scale: 0.92 }
            }
            animate={{
              opacity: 1,
              y: layers.y,
              x: layers.x,
              rotate: layers.r,
              scale: layers.s,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              reduce
                ? undefined
                : { y: layers.y - 8, scale: layers.s * 1.02, zIndex: 40 }
            }
          >
            <Image
              src={project.image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 400px"
              priority={i === 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <p className="text-xs font-medium text-white/90 sm:text-sm">
                {title}
              </p>
              <p className="mt-0.5 text-[10px] text-white/55 sm:text-xs">
                {project.tags.slice(0, 2).join(" · ")}
              </p>
            </div>
          </motion.div>
        );
      })}

      {/* floating badge */}
      <motion.div
        className="absolute bottom-2 start-2 z-40 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-sky-200 backdrop-blur-md sm:start-0"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        {isFa ? "۴ پروژه منتخب" : "4 featured projects"}
      </motion.div>
    </div>
  );
}
