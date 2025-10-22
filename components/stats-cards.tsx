"use client";

import {
  UsersGroupRoundedBold,
  TargetBold,
  BoltBold,
  GraphUpBold,
  SmartphoneBold,
  CupBold,
  UserCheckBold,
  ChartSquareBold,
  MedalStarBold,
  ChatRoundLineBold,
  ChatSquareBold,
  LetterBold,
  HomeAngleBold,
  HomeSmileBold,
  HomeAddAngleBold
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
  onboardingPercentage: number;
  avgUserLevel: number;
  totalMessages: number;
  messagesToday: number;
  messagesThisWeek: number;
  avgMessagesPerSpace: number;
  totalSpaces: number;
  spacesToday: number;
  spacesThisWeek: number;
  activeSpaces: number;
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
          revenue: 0,
          onboardingPercentage: 0,
          avgUserLevel: 0,
          totalMessages: 0,
          messagesToday: 0,
          messagesThisWeek: 0,
          avgMessagesPerSpace: 0,
          totalSpaces: 0,
          spacesToday: 0,
          spacesThisWeek: 0,
          activeSpaces: 0
        };
      }
    },
    refetchInterval: 30000,
  });

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: UsersGroupRoundedBold,
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
      icon: BoltBold,
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
      icon: GraphUpBold,
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
    {
      title: "Onboarding Rate",
      value: `${stats?.onboardingPercentage || 0}%`,
      icon: ChartSquareBold,
      change: "Users completed setup",
      changeType: "positive" as const,
    },
    {
      title: "Average User Level",
      value: `Level ${stats?.avgUserLevel || 0}`,
      icon: MedalStarBold,
      change: "Platform progression",
      changeType: "neutral" as const,
    },
    {
      title: "Total Messages",
      value: (stats?.totalMessages || 0).toLocaleString(),
      icon: ChatRoundLineBold,
      change: `${stats?.messagesToday || 0} today`,
      changeType: "positive" as const,
    },
    {
      title: "Messages This Week",
      value: (stats?.messagesThisWeek || 0).toLocaleString(),
      icon: ChatSquareBold,
      change: "Last 7 days",
      changeType: "info" as const,
    },
    {
      title: "Avg Messages/Space",
      value: stats?.avgMessagesPerSpace || 0,
      icon: LetterBold,
      change: "Per space",
      changeType: "neutral" as const,
    },
    {
      title: "Total Spaces",
      value: stats?.totalSpaces || 0,
      icon: HomeAngleBold,
      change: `${stats?.spacesToday || 0} created today`,
      changeType: "positive" as const,
    },
    {
      title: "Active Spaces",
      value: stats?.activeSpaces || 0,
      icon: HomeSmileBold,
      change: "With recent activity",
      changeType: "info" as const,
    },
    {
      title: "Spaces This Week",
      value: stats?.spacesThisWeek || 0,
      icon: HomeAddAngleBold,
      change: "Last 7 days",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={index}
            className="hover-lift transition-all-smooth animate-scale-in border-none shadow-md hover:shadow-xl bg-white dark:bg-gray-800"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        card.changeType === "positive"
                          ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
                          : card.changeType === "info"
                          ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {card.change}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#FF9500]/10 p-3 hover-glow transition-all-smooth flex-shrink-0">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#FF9500]" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}