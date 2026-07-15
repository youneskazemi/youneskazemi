"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  wordmark?: string;
};

/**
 * YK monogram — minimal geometric (hand-drawn SVG, not AI raster).
 * Built for 16–36px nav/favicon clarity: open counters, equal stroke, no clutter.
 */
export function Logo({
  className,
  markClassName,
  showWordmark = false,
  wordmark,
}: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `yk-${uid}`;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px]",
          "bg-[#0b0f14] ring-1 ring-sky-400/35",
          "transition duration-300 group-hover:ring-sky-400/60",
          markClassName,
        )}
        aria-hidden
      >
        <svg
          viewBox="0 0 32 32"
          className="h-5 w-5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Y */}
          <path
            d="M7 7 L12 15 V25"
            stroke={`url(#${gradId})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 7 L12 15"
            stroke={`url(#${gradId})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* K — shares the vertical visual weight on the right */}
          <path
            d="M19.5 7 V25"
            stroke="#7dd3fc"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M19.5 15.5 L26 7"
            stroke="#38bdf8"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M19.5 15.5 L26 25"
            stroke="#38bdf8"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id={gradId}
              x1="7"
              y1="7"
              x2="17"
              y2="25"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#bae6fd" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      {showWordmark && wordmark ? (
        <span className="text-sm font-semibold tracking-tight text-zinc-50 sm:text-base">
          {wordmark}
        </span>
      ) : null}
    </span>
  );
}
