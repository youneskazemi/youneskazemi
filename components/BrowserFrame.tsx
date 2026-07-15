import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Minimal browser chrome around project previews. */
export function BrowserFrame({
  url,
  children,
  className,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  const host = url
    ? url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "project";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0a0f]",
        "shadow-[0_32px_64px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.03)_inset]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-transparent px-3.5 py-2.5">
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-lg bg-black/50 px-3 py-1.5 text-center font-mono text-[11px] text-zinc-400 ring-1 ring-white/[0.04]">
          {host}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
