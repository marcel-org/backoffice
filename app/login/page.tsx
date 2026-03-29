"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import {
  UserBold,
  LockKeyholeMinimalisticBold,
  DangerBold,
  ChartSquareBold,
} from "solar-icon-set";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);

    if (result) {
      router.push("/");
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[hsl(var(--background))] p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[-16rem] h-[32rem] bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.16),transparent_60%)]" />
        <div className="absolute right-[-10rem] top-24 h-[24rem] w-[24rem] rounded-full bg-[rgba(148,163,184,0.08)] blur-3xl" />
        <div className="absolute left-[-8rem] bottom-8 h-[18rem] w-[18rem] rounded-full bg-stone-200/50 blur-3xl dark:bg-white/5" />
      </div>

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2.25rem] border border-stone-200/80 bg-[rgba(255,255,255,0.88)] shadow-[0_30px_90px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-[rgba(9,9,12,0.76)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden border-r border-stone-200/80 p-10 dark:border-white/10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-stone-500">
              Backoffice
            </p>
            <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-stone-200 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-soft)))] shadow-[0_18px_40px_rgba(148,163,184,0.18)] dark:border-white/10 dark:shadow-[0_18px_40px_rgba(148,163,184,0.24)]">
              <ChartSquareBold className="h-8 w-8 text-[#120f0a]" />
            </div>
            <h1 className="mt-8 max-w-md text-5xl font-semibold tracking-[-0.05em] text-stone-900 dark:text-stone-100">
              Marcel Backoffice
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 dark:text-stone-400">
              Sign in to manage Marcel with a cleaner, calmer admin interface.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-stone-200/80 bg-stone-50/80 p-6 dark:border-white/10 dark:bg-white/6">
            <p className="text-sm font-medium text-stone-900 dark:text-stone-200">
              Marcel access
            </p>
            <div className="mt-4 grid gap-3 text-sm text-stone-600 dark:text-stone-400">
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-black/10">
                Overview, analytics, and operations
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-black/10">
                Cleaner light and dark themes
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-black/10">
                Consistent Marcel branding
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <p className="text-xs uppercase tracking-[0.26em] text-stone-500">
                Backoffice
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-stone-900 dark:text-stone-100">
                Marcel Backoffice
              </h1>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-stone-900 dark:text-stone-100">
                Sign in
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Access the Marcel control panel.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-center gap-3 rounded-[1.4rem] border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-400/15 dark:bg-rose-400/10 dark:text-rose-100">
                  <DangerBold className="h-5 w-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500">
                    <UserBold className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    className="block w-full rounded-[1.25rem] border border-stone-200 bg-white py-3.5 pl-12 pr-4 text-stone-900 outline-none transition-all duration-300 placeholder:text-stone-400 focus:border-[hsl(var(--primary))/0.5] focus:bg-white dark:border-white/10 dark:bg-white/6 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-white/10"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500">
                    <LockKeyholeMinimalisticBold className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    className="block w-full rounded-[1.25rem] border border-stone-200 bg-white py-3.5 pl-12 pr-4 text-stone-900 outline-none transition-all duration-300 placeholder:text-stone-400 focus:border-[hsl(var(--primary))/0.5] focus:bg-white dark:border-white/10 dark:bg-white/6 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-white/10"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-soft)))] px-6 py-4 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-[0_18px_40px_rgba(148,163,184,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(148,163,184,0.24)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Enter backoffice"}
              </button>
            </form>

            <div className="mt-8 border-t border-stone-200/80 pt-6 text-xs text-stone-500 dark:border-white/10">
              Secure admin access for Marcel platform
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
