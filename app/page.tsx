"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { StatsCards } from "@/components/stats-cards";
import { ChartSection } from "@/components/chart-section";
import { RecentActivity } from "@/components/recent-activity";

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Welcome to Marcel Admin Dashboard
          </p>
        </div>
        
        <StatsCards />
        <ChartSection />
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}