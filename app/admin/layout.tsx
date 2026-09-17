import Link from "next/link";
import { logoutAction } from "./actions";
import { checkIsAdmin } from "@/lib/auth/session";

export const metadata = {
  title: "Admin · Showcase Management",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await checkIsAdmin();

  return (
    <div dir="ltr" className="min-h-screen bg-[#050508] text-zinc-100 selection:bg-sky-500/30">
      {/* Noise texture overlay */}
      <div className="noise" aria-hidden />

      {isAdmin && (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c0c12]/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white transition hover:text-sky-400"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-500/20 text-xs font-bold text-sky-400 border border-sky-500/30">
                  YK
                </span>
                <span>Portfolio Admin</span>
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="text-xs font-medium text-zinc-400">
                Showcases
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                View Live Site ↗
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                >
                  Log out
                </button>
              </form>
            </div>
          </div>
        </header>
      )}

      <main className="relative z-10">{children}</main>
    </div>
  );
}
