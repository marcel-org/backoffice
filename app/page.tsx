"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { StatsCards } from "@/components/stats-cards";
import { ChartSection } from "@/components/chart-section";
import { RecentActivity } from "@/components/recent-activity";
import {
  ChartSquareBold,
  GraphUpBold,
  LayersBold,
  ShieldCheckBold,
} from "solar-icon-set";

const sectionLinks = [
  {
    href: "#overview",
    label: "Overview",
    description: "Core platform health and adoption",
    icon: LayersBold,
  },
  {
    href: "#analytics",
    label: "Analytics",
    description: "Growth, activity, and engagement curves",
    icon: GraphUpBold,
  },
  {
    href: "#operations",
    label: "Operations",
    description: "Recent events and live platform signals",
    icon: ShieldCheckBold,
  },
];

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-8 animate-fade-in">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(193,154,107,0.22),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(138,119,93,0.16),transparent_30%)]" />
          <div className="relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-stone-300">
                <ChartSquareBold className="h-4 w-4 text-[hsl(var(--primary))]" />
                Marcel Backoffice
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-5xl">
                  A calmer control room for the chaos.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
                  The dashboard is now split into clear sections for overview,
                  analytics, and operations so the data stops reading like one
                  very expensive accordion.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:w-[34rem]">
              {sectionLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group rounded-[1.5rem] border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--primary))/0.5] hover:bg-white/8"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-stone-100 transition-colors group-hover:text-[hsl(var(--primary))]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-base font-semibold text-stone-100">
                      {item.label}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-400">
                      {item.description}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="overview"
          className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-stone-500">
                Overview
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-100">
                Platform snapshot
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-400">
              High-signal KPIs grouped into a section that reads like a dashboard
              instead of a scavenger hunt.
            </p>
          </div>
          <StatsCards />
        </section>

        <section
          id="analytics"
          className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-stone-500">
                Analytics
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-100">
                Growth and engagement
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-400">
              Trends are grouped by behavior, messaging, and space activity so
              you can scan them without taking psychic damage.
            </p>
          </div>
          <ChartSection />
        </section>

        <section
          id="operations"
          className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-stone-500">
                Operations
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-100">
                Live activity feed
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-400">
              A dedicated section for the stream of recent actions, because it
              deserves better than being duct-taped to the bottom.
            </p>
          </div>
          <RecentActivity />
        </section>
      </div>
    </DashboardLayout>
  );
}
