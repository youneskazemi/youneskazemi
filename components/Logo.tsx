"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  wordmark?: string;
  /** "mark" = icon only (default when no wordmark). */
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { box: "h-8 w-8 rounded-lg", svg: "h-[18px] w-[18px]" },
  md: { box: "h-9 w-9 rounded-[10px]", svg: "h-5 w-5" },
  lg: { box: "h-11 w-11 rounded-xl", svg: "h-6 w-6" },
} as const;

/**
 * YK monogram — minimal geometric, sky cyan on dark.
 * Optimized for 16–36px (nav + favicon). Hand SVG, not AI raster.
 */
export function Logo({
  className,
  markClassName,
  showWordmark = false,
  wordmark,
  size = "md",
}: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `yk-${uid}`;
  const s = sizeMap[size];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
          s.box,
          "bg-[#070a0e] ring-1 ring-inset ring-sky-400/40",
          "shadow-[inset_0_1px_0_0_rgba(125,211,252,0.12)]",
          "transition duration-300 group-hover:ring-sky-400/70",
          markClassName,
        )}
        aria-hidden
      >
        {/* corner accent — brand detail without noise */}
        <span
          className="pointer-events-none absolute start-0 top-0 h-2 w-2 border-s border-t border-sky-400/50"
          style={{ borderStartStartRadius: 4 }}
        />
        <svg
          viewBox="0 0 40 40"
          className={s.svg}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Y — left mass */}
          <path
            d="M8 8 L16 20 V32"
            stroke={`url(#${gradId})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 8 L16 20"
            stroke={`url(#${gradId})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* K — right mass, optical center shared at (16,20) band */}
          <path
            d="M25 8 V32"
            stroke="#7dd3fc"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M25 19.5 L33.5 8"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M25 19.5 L33.5 32"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id={gradId}
              x1="8"
              y1="8"
              x2="24"
              y2="32"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#e0f2fe" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      {showWordmark && wordmark ? (
        <span className="text-sm font-semibold tracking-tight text-zinc-50 sm:text-[0.95rem]">
          {wordmark}
        </span>
      ) : null}
    </span>
  );
}
