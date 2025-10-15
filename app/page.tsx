"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { StatsCards } from "@/components/stats-cards";
import { ChartSection } from "@/components/chart-section";
import { RecentActivity } from "@/components/recent-activity";

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-8 animate-fade-in">
        <div className="border-b pb-6 animate-slide-up">
          <h1 className="title text-primary">
            <img
              src="/marcel-logo.png"
              alt="Marcel"
              className="h-10 w-10 hover-glow"
            />
            Marcel Analytics
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Productivity insights and user engagement metrics
          </p>
        </div>

        <div className="space-y-8">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="subtitle mb-6">Key Metrics</h2>
            <StatsCards />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="subtitle mb-6">Analytics</h2>
            <ChartSection />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="subtitle mb-6">Recent Activity</h2>
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}