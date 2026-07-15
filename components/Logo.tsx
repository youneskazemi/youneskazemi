import { useId } from "react";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  wordmark?: string;
};

/** YK monogram — geometric mark (Dribbble monogram / Awwwards-minimal brand mark). */
export function Logo({
  className,
  markClassName,
  showWordmark = false,
  wordmark,
}: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `yk-grad-${uid}`;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl",
          "bg-gradient-to-br from-sky-400/20 via-zinc-900 to-zinc-950",
          "ring-1 ring-sky-400/30 shadow-[0_0_24px_-6px_rgba(56,189,248,0.55)]",
          "transition duration-300 group-hover:ring-sky-400/55 group-hover:shadow-[0_0_28px_-4px_rgba(56,189,248,0.7)]",
          markClassName,
        )}
        aria-hidden
      >
        <svg
          viewBox="0 0 40 40"
          className="h-[22px] w-[22px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 9 L16.5 18.5 V31"
            stroke={`url(#${gradId})`}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 9 L16.5 18.5"
            stroke={`url(#${gradId})`}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.5 9 V31"
            stroke="#7dd3fc"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M24.5 19.5 L31 9"
            stroke="#38bdf8"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M24.5 19.5 L31 31"
            stroke="#38bdf8"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id={gradId}
              x1="11"
              y1="9"
              x2="22"
              y2="31"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7dd3fc" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(125,211,252,0.25),transparent_55%)]" />
      </span>
      {showWordmark && wordmark ? (
        <span className="text-sm font-semibold tracking-tight text-zinc-50 sm:text-base">
          {wordmark}
        </span>
      ) : null}
    </span>
  );
}
