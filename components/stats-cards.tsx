"use client";

import {
  UsersBold,
  TargetBold,
  FlashBold,
  TrendUpBold,
  SmartphoneBold,
  CupBold,
  UserCheckBold
} from "solar-icon-set";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";

interface Stats {
  totalUsers: number;
  totalOnboardedUsers: number;
  activeDrivers: number;
  totalRides: number;
  todayRides: number;
  avgRideTime: number;
  activeIssues: number;
  userGrowth: number;
  revenue: number;
}

export function StatsCards() {
  const { data: stats } = useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/admin/stats");
        return data;
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        return {
          totalUsers: 0,
          totalOnboardedUsers: 0,
          activeDrivers: 0,
          totalRides: 0,
          todayRides: 0,
          avgRideTime: 0,
          activeIssues: 0,
          userGrowth: 0,
          revenue: 0
        };
      }
    },
    refetchInterval: 30000,
  });

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: UsersBold,
      change: `+${stats?.userGrowth || 0}%`,
      changeType: "positive" as const,
    },
    {
      title: "Onboarded Users",
      value: stats?.totalOnboardedUsers || 0,
      icon: UserCheckBold,
      change: "Completed setup",
      changeType: "positive" as const,
    },
    {
      title: "Active Users",
      value: stats?.activeDrivers || 0,
      icon: FlashBold,
      change: "This week",
      changeType: "neutral" as const,
    },
    {
      title: "Quests Completed",
      value: stats?.totalRides || 0,
      icon: TargetBold,
      change: `${stats?.todayRides || 0} today`,
      changeType: "positive" as const,
    },
    {
      title: "Avg XP Reward",
      value: `${stats?.avgRideTime || 0} XP`,
      icon: CupBold,
      change: "Per quest",
      changeType: "neutral" as const,
    },
    {
      title: "Total Engagement",
      value: `${(stats?.revenue || 0).toLocaleString()}`,
      icon: TrendUpBold,
      change: "Actions taken",
      changeType: "positive" as const,
    },
    {
      title: "Focus Sessions",
      value: stats?.activeIssues || 0,
      icon: SmartphoneBold,
      change: "Active now",
      changeType: "info" as const,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold">
                    {card.value}
                  </p>
                  <p
                    className={`text-xs ${
                      card.changeType === "positive"
                        ? "text-green-600 dark:text-green-400"
                        : card.changeType === "info"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    {card.change}
                  </p>
                </div>
                <div className="rounded-full bg-muted p-3">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}