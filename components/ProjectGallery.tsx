"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BrowserFrame } from "@/components/BrowserFrame";
import { useI18n } from "@/lib/i18n";

type Props = {
  gallery: string[];
  title: string;
  titleFa: string;
  accent?: string;
};

export function ProjectGallery({ gallery, title, titleFa, accent = "#38bdf8" }: Props) {
  const { t, isFa } = useI18n();
  const reduce = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeTitle = isFa ? titleFa : title;

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  }, [gallery.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  }, [gallery.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handlePrev, handleNext]);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  const currentImage = gallery[selectedIndex] || gallery[0];

  return (
    <section className="mt-12 border-t border-white/10 pt-10" aria-label={t.galleryTitle}>
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {t.galleryTitle}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            {t.gallerySubtitle}
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-500">
          {selectedIndex + 1} / {gallery.length}
        </span>
      </div>

      {/* Main Preview Frame */}
      <div className="group relative">
        <BrowserFrame
          url={`${activeTitle.toLowerCase().replace(/\s+/g, "")}.view`}
          className="border border-white/10 bg-[#08080c] shadow-2xl transition-all duration-300"
        >
          <div
            className="relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-zinc-950"
            onClick={() => setLightboxOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxOpen(true);
              }
            }}
            aria-label={`${activeTitle} screenshot ${selectedIndex + 1} - click to enlarge`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="relative h-full w-full"
              >
                <Image
                  src={currentImage}
                  alt={`${activeTitle} - View ${selectedIndex + 1}`}
                  fill
                  priority={selectedIndex === 0}
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </motion.div>
            </AnimatePresence>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="rounded-full bg-black/70 px-4 py-2 text-xs font-medium text-white backdrop-blur-md ring-1 ring-white/20">
                🔍 {isFa ? "برای بزرگنمایی کلیک کنید" : "Click to view full screen"}
              </span>
            </div>
          </div>
        </BrowserFrame>

        {/* Previous / Next overlay buttons on main preview if > 1 image */}
        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-black hover:scale-110 ring-1 ring-white/20"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-black hover:scale-110 ring-1 ring-white/20"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails row if multiple images */}
      {gallery.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {gallery.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={img + idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Select screenshot ${idx + 1}`}
                className={`group relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "border-sky-400 ring-2 ring-sky-400/40 shadow-lg shadow-sky-400/10 scale-105"
                    : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                }`}
              >
                <Image
                  src={img}
                  alt={`${activeTitle} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="96px"
                />
                <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-mono text-zinc-300">
                  {idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Top Bar */}
            <div
              className="absolute top-4 inset-x-4 flex items-center justify-between text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">{activeTitle}</span>
                <span className="text-xs text-zinc-400 font-mono">
                  {selectedIndex + 1} / {gallery.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close lightbox"
              >
                ✕
              </button>
            </div>

            {/* Modal Image */}
            <div
              className="relative max-h-[85vh] max-w-[92vw] overflow-hidden rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentImage}
                alt={`${activeTitle} - full view ${selectedIndex + 1}`}
                className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl"
              />
            </div>

            {/* Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
