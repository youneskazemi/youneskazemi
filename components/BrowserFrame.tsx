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
        "overflow-hidden rounded-xl border border-white/[0.09] bg-[#0a0a0f] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="ms-1 min-w-0 flex-1 truncate rounded-md bg-black/40 px-2.5 py-1 text-center font-mono text-[10px] text-zinc-500 sm:text-[11px]">
          {host}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
