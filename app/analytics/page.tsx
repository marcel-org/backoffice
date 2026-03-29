"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ChartSection } from "@/components/chart-section";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-8 animate-fade-in">
        <section className="relative overflow-hidden rounded-[2rem] bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.14),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(94,234,212,0.08),transparent_28%)]" />
          <div className="relative max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Analytics
            </p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-5xl">
              Trends, growth, and the useful curves.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
              Marcel growth and engagement charts, separated from the overview.
            </p>
          </div>
        </section>

        <section className="space-y-5 rounded-[2rem] bg-white/5 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-stone-500">
                Charts
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-100">
                Behavioral and lifecycle signals
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-400">
              Growth, messaging, onboarding, and space activity.
            </p>
          </div>
          <ChartSection />
        </section>
      </div>
    </DashboardLayout>
  );
}
