"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "../actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-base font-bold text-sky-400 shadow-lg shadow-sky-500/10"
          >
            YK
          </Link>
          <h1 className="mt-4 text-xl font-semibold text-white tracking-tight">
            Admin Authentication
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Enter your admin secret password to manage showcases.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0c12]/90 p-6 shadow-2xl backdrop-blur-xl">
          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                {state.error}
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-zinc-300 mb-1.5"
              >
                Admin Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-sky-400 disabled:opacity-50"
            >
              {isPending ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-zinc-500 transition hover:text-zinc-300"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
