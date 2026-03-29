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
        <div className="absolute inset-x-0 top-[-16rem] h-[32rem] bg-[radial-gradient(circle_at_top,rgba(193,154,107,0.18),transparent_60%)]" />
        <div className="absolute right-[-10rem] top-24 h-[24rem] w-[24rem] rounded-full bg-[rgba(193,154,107,0.08)] blur-3xl" />
        <div className="absolute left-[-8rem] bottom-8 h-[18rem] w-[18rem] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[rgba(9,9,12,0.76)] shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden border-r border-white/10 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-stone-500">
              Backoffice
            </p>
            <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-soft)))] shadow-[0_18px_40px_rgba(193,154,107,0.3)]">
              <ChartSquareBold className="h-8 w-8 text-[#120f0a]" />
            </div>
            <h1 className="mt-8 max-w-md text-5xl font-semibold tracking-[-0.05em] text-stone-100">
              Marcel admin, now dressed like it respects itself.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-400">
              Cleaner hierarchy, warmer tones, and less visual yelling. Small
              miracles do happen.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6">
            <p className="text-sm font-medium text-stone-200">
              What changed
            </p>
            <div className="mt-4 grid gap-3 text-sm text-stone-400">
              <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                Section-based dashboard flow
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                Neutral stone palette with warm gold accents
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                Consistent card and navigation system
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
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-stone-100">
                Marcel admin
              </h1>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-stone-100">
                Sign in
              </h2>
              <p className="text-sm text-stone-400">
                Access the control panel without the old carnival theme.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-center gap-3 rounded-[1.4rem] border border-rose-400/15 bg-rose-400/10 p-4 text-sm text-rose-100">
                  <DangerBold className="h-5 w-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-300"
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
                    className="block w-full rounded-[1.25rem] border border-white/10 bg-white/6 py-3.5 pl-12 pr-4 text-stone-100 outline-none transition-all duration-300 placeholder:text-stone-500 focus:border-[hsl(var(--primary))/0.5] focus:bg-white/10"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-stone-300"
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
                    className="block w-full rounded-[1.25rem] border border-white/10 bg-white/6 py-3.5 pl-12 pr-4 text-stone-100 outline-none transition-all duration-300 placeholder:text-stone-500 focus:border-[hsl(var(--primary))/0.5] focus:bg-white/10"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-soft)))] px-6 py-4 text-sm font-semibold text-[#120f0a] shadow-[0_18px_40px_rgba(193,154,107,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(193,154,107,0.34)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Enter backoffice"}
              </button>
            </form>

            <div className="mt-8 border-t border-white/10 pt-6 text-xs text-stone-500">
              Secure admin access for Marcel platform
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
