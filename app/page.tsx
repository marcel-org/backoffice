"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { StatsCards } from "@/components/stats-cards";
import { ChartSection } from "@/components/chart-section";
import { RecentActivity } from "@/components/recent-activity";

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-8">
        <div className="border-b pb-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Marcel Analytics
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Productivity insights and user engagement metrics
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Key Metrics</h2>
            <StatsCards />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Analytics</h2>
            <ChartSection />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}