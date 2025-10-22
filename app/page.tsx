"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { StatsCards } from "@/components/stats-cards";
import { ChartSection } from "@/components/chart-section";
import { RecentActivity } from "@/components/recent-activity";
import { ChartBold } from "solar-icon-set";

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 pb-8 animate-fade-in">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-[#FF9500] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover-glow transition-all-smooth">
                  <ChartBold className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Marcel Analytics
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                  Productivity insights and user engagement metrics
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="mb-4 px-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                Key Metrics
              </h2>
            </div>
            <StatsCards />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="mb-4 px-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                Analytics
              </h2>
            </div>
            <ChartSection />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="mb-4 px-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                Recent Activity
              </h2>
            </div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}