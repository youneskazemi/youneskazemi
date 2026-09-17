"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  wordmark?: string;
  /** Hide wordmark below sm (default true when wordmark shown). */
  wordmarkClassName?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { box: "h-8 w-8 rounded-lg", img: 20 },
  md: { box: "h-9 w-9 rounded-[10px]", img: 24 },
  lg: { box: "h-11 w-11 rounded-xl", img: 30 },
} as const;

/**
 * YK monogram — Official dark-mode mark (crisp white facets with electric royal blue accent).
 */
export function Logo({
  className,
  markClassName,
  showWordmark = false,
  wordmark,
  wordmarkClassName,
  size = "md",
}: LogoProps) {
  const s = sizeMap[size];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
          s.box,
          "bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
          "ring-1 ring-inset ring-white/15",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]",
          "transition duration-300 group-hover:ring-sky-400/50 group-hover:shadow-[0_0_14px_rgba(56,189,248,0.22)]",
          markClassName,
        )}
        aria-hidden
      >
        <Image
          src="/logo-white-128.png"
          alt=""
          width={s.img}
          height={s.img}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </span>
      {showWordmark && wordmark ? (
        <span
          className={cn(
            "text-sm font-semibold tracking-tight text-zinc-50 sm:text-[0.95rem]",
            wordmarkClassName,
          )}
        >
          {wordmark}
        </span>
      ) : null}
    </span>
  );
}

