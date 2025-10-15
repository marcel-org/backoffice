"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { format } from "date-fns";
import { UserBold, TargetBold, UsersGroupRoundedBold, CheckCircleBold, SmartphoneBold, ClockCircleBold, InfoCircleBold } from "solar-icon-set";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Activity {
  id: string;
  type: "user_signup" | "quest_completed" | "session_started" | "goal_achieved" | "focus_session" | "milestone_reached";
  description: string;
  timestamp: string;
  status: "success" | "warning" | "error" | "info";
  metadata?: any;
}

const activityIcons = {
  user_signup: UserBold,
  quest_completed: TargetBold,
  session_started: SmartphoneBold,
  goal_achieved: CheckCircleBold,
  focus_session: ClockCircleBold,
  milestone_reached: UsersGroupRoundedBold,
};

const statusColors = {
  success: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20 border border-green-200 dark:border-green-800",
  warning: "text-primary bg-primary/10 dark:text-primary dark:bg-primary/20 border border-primary/20",
  error: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20 border border-red-200 dark:border-red-800",
  info: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800",
};

export function RecentActivity() {
  const [showAll, setShowAll] = useState(false);
  const { data: activities } = useQuery<Activity[]>({
    queryKey: ["recent-activity"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/admin/activity");
        return data;
      } catch (error) {
        console.error('Failed to fetch activity:', error);
        return [];
      }
    },
    refetchInterval: 15000,
  });

  const displayedActivities = showAll
    ? activities
    : activities?.slice(0, 10);

  return (
    <Card className="hover-lift animate-scale-in" style={{ animationDelay: "0.4s" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <InfoCircleBold className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
        {displayedActivities?.length === 0 ? (
          <div className="px-6 py-8 text-center text-muted-foreground animate-fade-in">
            <InfoCircleBold className="h-8 w-8 mx-auto mb-2 opacity-50" />
            No recent activity
          </div>
        ) : (
          displayedActivities?.map((activity, index) => {
            const Icon = activityIcons[activity.type] || InfoCircleBold;
            return (
              <div
                key={activity.id}
                className="px-6 py-4 hover:bg-accent/50 transition-all-smooth animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`rounded-full p-2 transition-all-smooth hover-glow ${statusColors[activity.status]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {activity.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <ClockCircleBold className="h-3 w-3" />
                      {format(new Date(activity.timestamp), "MMM d, h:mm a")}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

        {activities && activities.length > 10 && (
          <div className="border-t px-6 py-3 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm hover-lift text-primary hover:text-primary-foreground hover:bg-primary transition-all-smooth"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show less' : 'View all activity'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}