"use client";

import { Users, Car, MapPin, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { mockStats } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";

interface Stats {
  totalUsers: number;
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
        const { data } = await api.get("/api/admin/stats");
        return data;
      } catch (error) {
        console.warn('Using mock data for stats');
        return mockStats;
      }
    },
    refetchInterval: 30000,
  });

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      change: `+${stats?.userGrowth || 0}%`,
      changeType: "positive" as const,
    },
    {
      title: "Active Drivers",
      value: stats?.activeDrivers || 0,
      icon: Car,
      change: "Online now",
      changeType: "neutral" as const,
    },
    {
      title: "Total Rides",
      value: stats?.totalRides || 0,
      icon: MapPin,
      change: `${stats?.todayRides || 0} today`,
      changeType: "neutral" as const,
    },
    {
      title: "Avg Ride Time",
      value: `${stats?.avgRideTime || 0}m`,
      icon: Clock,
      change: "Last 7 days",
      changeType: "neutral" as const,
    },
    {
      title: "Revenue",
      value: `€${(stats?.revenue || 0).toLocaleString()}`,
      icon: TrendingUp,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Active Issues",
      value: stats?.activeIssues || 0,
      icon: AlertCircle,
      change: "Requires attention",
      changeType: stats?.activeIssues ? "negative" : "neutral" as const,
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
                        : card.changeType === "negative"
                        ? "text-red-600 dark:text-red-400"
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