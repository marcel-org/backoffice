"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { format } from "date-fns";
import {
  UserBold,
  TargetBold,
  UsersGroupRoundedBold,
  CheckCircleBold,
  SmartphoneBold,
  ClockCircleBold,
  InfoCircleBold,
} from "solar-icon-set";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Activity {
  id: string;
  type:
    | "user_signup"
    | "quest_completed"
    | "session_started"
    | "goal_achieved"
    | "focus_session"
    | "milestone_reached";
  description: string;
  timestamp: string;
  status: "success" | "warning" | "error" | "info";
  metadata?: unknown;
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
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-300/15 dark:bg-emerald-300/10 dark:text-emerald-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-300/15 dark:bg-amber-300/10 dark:text-amber-100",
  error:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-300/15 dark:bg-rose-300/10 dark:text-rose-100",
  info:
    "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-300/15 dark:bg-sky-300/10 dark:text-sky-100",
};

export function RecentActivity() {
  const [showAll, setShowAll] = useState(false);
  const { data: activities } = useQuery<Activity[]>({
    queryKey: ["recent-activity"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/admin/activity");
        return Array.isArray(data) ? data : data.activities || [];
      } catch (error) {
        console.error("Failed to fetch activity:", error);
        return [];
      }
    },
    refetchInterval: 15000,
  });

  const displayedActivities = showAll ? activities : activities?.slice(0, 10);

  return (
    <Card className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] dark:shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
      <CardHeader className="border-b border-stone-200/80 dark:border-white/10">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
          Operations
        </p>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold tracking-[-0.03em] text-stone-900 dark:text-stone-100">
          <InfoCircleBold className="h-5 w-5 text-[hsl(var(--primary))]" />
          Recent activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-white/10">
          {displayedActivities?.length === 0 ? (
            <div className="px-6 py-10 text-center text-stone-500">
              <InfoCircleBold className="mx-auto mb-3 h-8 w-8 opacity-60" />
              No recent activity
            </div>
          ) : (
            displayedActivities?.map((activity) => {
              const Icon = activityIcons[activity.type] || InfoCircleBold;
              return (
                <div key={activity.id} className="flex items-start gap-4 px-6 py-5 transition-colors duration-300 hover:bg-stone-100 dark:hover:bg-white/5">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${statusColors[activity.status]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-6 text-stone-900 dark:text-stone-100">
                      {activity.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-stone-500">
                      <ClockCircleBold className="h-3.5 w-3.5" />
                      {format(new Date(activity.timestamp), "MMM d, h:mm a")}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {activities && activities.length > 10 && (
          <div className="border-t border-stone-200/80 bg-stone-100/80 px-6 py-4 dark:border-white/10 dark:bg-black/10">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full border border-stone-200 bg-white px-4 text-sm text-stone-700 transition-all duration-300 hover:border-[hsl(var(--primary))/0.4] hover:text-[hsl(var(--primary))] dark:border-white/10 dark:bg-white/5 dark:text-stone-200 dark:hover:bg-white/10"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show less" : "View all activity"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
