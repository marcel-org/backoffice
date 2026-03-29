"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { StatsCards } from "@/components/stats-cards";

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-8 animate-fade-in">
        <section className="relative overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white/85 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_80px_rgba(0,0,0,0.2)] sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(120,130,148,0.1),transparent_30%)]" />
          <div className="relative max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Overview
            </p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-900 dark:text-stone-50 sm:text-5xl">
              Marcel Backoffice
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base">
              Track Marcel users, quests, messages, spaces, and activity in one
              cleaner admin view.
            </p>
          </div>
        </section>

        <section className="space-y-5 rounded-[2rem] border border-stone-200/80 bg-white/85 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-stone-500">
                Metrics
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-900 dark:text-stone-100">
                Core product health
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-400">
              Adoption, usage, and activity at a glance.
            </p>
          </div>
          <StatsCards />
        </section>
      </div>
    </DashboardLayout>
  );
}
