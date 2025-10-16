"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TimeRangeSelector, type TimeRange } from "./time-range-selector";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export function ChartSection() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");

  const { data: chartData, isLoading } = useQuery({
    queryKey: ["charts", timeRange],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/admin/charts?range=${timeRange}`);
        return data;
      } catch (error) {
        console.error('Failed to fetch charts data:', error);
        return {
          ridesOverTime: [],
          revenueByDay: [],
          userDistribution: [],
          peakHours: [],
          userOnboarding: [],
          userGrowth: [],
          questCompletionOverTime: []
        };
      }
    },
    refetchInterval: 60000,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center animate-slide-up">
        <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
        <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>
      </div>

      <Card className="hover-lift animate-scale-in" style={{ animationDelay: "0.3s" }}>
        <CardHeader>
          <CardTitle>Total Users Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-muted-foreground">Loading chart data...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData?.userGrowth || []}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="stroke-muted-foreground"
              style={{ fontSize: 12 }}
            />
            <YAxis className="stroke-muted-foreground" style={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--popover-foreground))"
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalUsers"
              name="Total Users"
              stroke="#FF9601"
              strokeWidth={3}
              dot={{ fill: "#FF9601", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#FF9601", strokeWidth: 2, fill: "#FFF" }}
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              name="Active Users"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="hover-lift animate-scale-in" style={{ animationDelay: "0.4s" }}>
        <CardHeader>
          <CardTitle>Quest Activity Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-muted-foreground">Loading chart data...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData?.ridesOverTime || []}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="stroke-muted-foreground"
              style={{ fontSize: 12 }}
            />
            <YAxis className="stroke-muted-foreground" style={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--popover-foreground))"
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="rides"
              name="Quests Created"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="completed"
              name="Quests Completed"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
            />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="hover-lift animate-scale-in" style={{ animationDelay: "0.4s" }}>
        <CardHeader>
          <CardTitle>Total Quests Completed Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-muted-foreground">Loading chart data...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData?.questCompletionOverTime || []}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="stroke-muted-foreground"
                  style={{ fontSize: 12 }}
                />
                <YAxis className="stroke-muted-foreground" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))"
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalCompleted"
                  name="Total Completed Quests"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#8B5CF6", strokeWidth: 2, fill: "#FFF" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="hover-lift animate-scale-in" style={{ animationDelay: "0.5s" }}>
        <CardHeader>
          <CardTitle>Activity by Day</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-muted-foreground">Loading chart data...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData?.revenueByDay || []}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="day"
              className="stroke-muted-foreground"
              style={{ fontSize: 12 }}
            />
            <YAxis className="stroke-muted-foreground" style={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--popover-foreground))"
              }}
            />
            <Bar dataKey="revenue" name="Engagement Score" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="hover-lift animate-scale-in" style={{ animationDelay: "0.6s" }}>
        <CardHeader>
          <CardTitle>User Level Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-muted-foreground">Loading chart data...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
            <Pie
              data={chartData?.userDistribution || []}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name}: ${entry.value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {(chartData?.userDistribution || []).map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--popover-foreground))"
              }}
            />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="hover-lift animate-scale-in" style={{ animationDelay: "0.7s" }}>
        <CardHeader>
          <CardTitle>Peak Productivity Hours</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-muted-foreground">Loading chart data...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData?.peakHours || []}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="hour"
              className="stroke-muted-foreground"
              style={{ fontSize: 12 }}
            />
            <YAxis className="stroke-muted-foreground" style={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--popover-foreground))"
              }}
            />
            <Bar dataKey="rides" name="Quest Completions" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="hover-lift animate-scale-in" style={{ animationDelay: "0.8s" }}>
        <CardHeader>
          <CardTitle>New User Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-muted-foreground">Loading chart data...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData?.userOnboarding || []}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="stroke-muted-foreground"
              style={{ fontSize: 12 }}
            />
            <YAxis className="stroke-muted-foreground" style={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--popover-foreground))"
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="signups"
              name="New Signups"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="completed_onboarding"
              name="Completed Onboarding"
              stroke="#06B6D4"
              strokeWidth={2}
              dot={false}
            />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

    </div>
  );
}