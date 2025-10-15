"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { format } from "date-fns";
import { User, Target, Users, CheckCircle, Brain, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Activity {
  id: string;
  type: "user_signup" | "ride_completed" | "driver_joined" | "issue_reported" | "payment_received";
  description: string;
  timestamp: string;
  status: "success" | "warning" | "error" | "info";
  metadata?: any;
}

const activityIcons = {
  user_signup: User,
  ride_completed: Target,
  driver_joined: Users,
  issue_reported: Brain,
  payment_received: CheckCircle,
};

const statusColors = {
  success: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20",
  warning: "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20",
  error: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20",
  info: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20",
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
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
        {displayedActivities?.length === 0 ? (
          <div className="px-6 py-8 text-center text-muted-foreground">
            No recent activity
          </div>
        ) : (
          displayedActivities?.map((activity) => {
            const Icon = activityIcons[activity.type] || AlertCircle;
            return (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`rounded-full p-2 ${statusColors[activity.status]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      {activity.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
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
          <div className="border-t px-6 py-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm"
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