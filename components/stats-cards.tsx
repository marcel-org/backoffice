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
  HomeAddAngleBold,
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

const fallbackStats: Stats = {
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
  activeSpaces: 0,
};

export function StatsCards() {
  const { data: stats } = useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/admin/stats");
        return data;
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        return fallbackStats;
      }
    },
    refetchInterval: 30000,
  });

  const currentStats = stats ?? fallbackStats;

  const cards = [
    {
      title: "Total Users",
      value: currentStats.totalUsers,
      icon: UsersGroupRoundedBold,
      change: `+${currentStats.userGrowth}%`,
      tone: "positive",
    },
    {
      title: "Onboarded Users",
      value: currentStats.totalOnboardedUsers,
      icon: UserCheckBold,
      change: "Completed setup",
      tone: "positive",
    },
    {
      title: "Active Users",
      value: currentStats.activeDrivers,
      icon: BoltBold,
      change: "This week",
      tone: "neutral",
    },
    {
      title: "Quests Completed",
      value: currentStats.totalRides,
      icon: TargetBold,
      change: `${currentStats.todayRides} today`,
      tone: "positive",
    },
    {
      title: "Avg XP Reward",
      value: `${currentStats.avgRideTime} XP`,
      icon: CupBold,
      change: "Per quest",
      tone: "neutral",
    },
    {
      title: "Total Engagement",
      value: currentStats.revenue.toLocaleString(),
      icon: GraphUpBold,
      change: "Actions taken",
      tone: "positive",
    },
    {
      title: "Focus Sessions",
      value: currentStats.activeIssues,
      icon: SmartphoneBold,
      change: "Active now",
      tone: "info",
    },
    {
      title: "Onboarding Rate",
      value: `${currentStats.onboardingPercentage}%`,
      icon: ChartSquareBold,
      change: "Users completed setup",
      tone: "positive",
    },
    {
      title: "Average User Level",
      value: `Level ${currentStats.avgUserLevel}`,
      icon: MedalStarBold,
      change: "Platform progression",
      tone: "neutral",
    },
    {
      title: "Total Messages",
      value: currentStats.totalMessages.toLocaleString(),
      icon: ChatRoundLineBold,
      change: `${currentStats.messagesToday} today`,
      tone: "positive",
    },
    {
      title: "Messages This Week",
      value: currentStats.messagesThisWeek.toLocaleString(),
      icon: ChatSquareBold,
      change: "Last 7 days",
      tone: "info",
    },
    {
      title: "Avg Messages/Space",
      value: currentStats.avgMessagesPerSpace,
      icon: LetterBold,
      change: "Per space",
      tone: "neutral",
    },
    {
      title: "Total Spaces",
      value: currentStats.totalSpaces,
      icon: HomeAngleBold,
      change: `${currentStats.spacesToday} created today`,
      tone: "positive",
    },
    {
      title: "Active Spaces",
      value: currentStats.activeSpaces,
      icon: HomeSmileBold,
      change: "With recent activity",
      tone: "info",
    },
    {
      title: "Spaces This Week",
      value: currentStats.spacesThisWeek,
      icon: HomeAddAngleBold,
      change: "Last 7 days",
      tone: "positive",
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--primary))/0.35]"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-stone-400">
                    {card.title}
                  </p>
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-stone-100">
                    {card.value}
                  </p>
                  <span
                    className={[
                      "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                      card.tone === "positive" &&
                        "border-emerald-300/15 bg-emerald-300/10 text-emerald-100",
                      card.tone === "info" &&
                        "border-sky-300/15 bg-sky-300/10 text-sky-100",
                      card.tone === "neutral" &&
                        "border-white/10 bg-white/6 text-stone-300",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {card.change}
                  </span>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(193,154,107,0.24),rgba(193,154,107,0.08))] text-[hsl(var(--primary))] transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
