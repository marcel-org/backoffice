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

const COLORS = ["#94a3b8", "#cbd5e1", "#7dd3fc", "#86efac", "#a7f3d0"];

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "18px",
  color: "hsl(var(--popover-foreground))",
};

const chartCards = [
  {
    title: "User Growth",
    group: "Growth",
    render: (data: any) => (
      <LineChart data={data?.userGrowth || []}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="date" stroke="#78716c" fontSize={12} />
        <YAxis stroke="#78716c" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalUsers"
          name="Total Users"
          stroke="#94a3b8"
          strokeWidth={3}
          dot={{ fill: "#94a3b8", r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="activeUsers"
          name="Active Users"
          stroke="#8ecae6"
          strokeWidth={2}
          dot={false}
          strokeDasharray="6 6"
        />
      </LineChart>
    ),
  },
  {
    title: "Quest Activity",
    group: "Growth",
    render: (data: any) => (
      <LineChart data={data?.ridesOverTime || []}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="date" stroke="#78716c" fontSize={12} />
        <YAxis stroke="#78716c" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        <Line
          type="monotone"
          dataKey="rides"
          name="Quests Created"
          stroke="#cbd5e1"
          strokeWidth={2.5}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="completed"
          name="Quests Completed"
          stroke="#7dd3a7"
          strokeWidth={2.5}
          dot={false}
        />
      </LineChart>
    ),
  },
  {
    title: "Completed Quests",
    group: "Growth",
    render: (data: any) => (
      <LineChart data={data?.questCompletionOverTime || []}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="date" stroke="#78716c" fontSize={12} />
        <YAxis stroke="#78716c" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalCompleted"
          name="Completed"
          stroke="#7dd3fc"
          strokeWidth={3}
          dot={{ fill: "#7dd3fc", r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    ),
  },
  {
    title: "Engagement by Day",
    group: "Growth",
    render: (data: any) => (
      <BarChart data={data?.revenueByDay || []}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="day" stroke="#78716c" fontSize={12} />
        <YAxis stroke="#78716c" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="revenue" name="Engagement Score" fill="#94a3b8" radius={[10, 10, 0, 0]} />
      </BarChart>
    ),
  },
  {
    title: "User Levels",
    group: "Composition",
    render: (data: any) => (
      <PieChart>
        <Pie
          data={data?.userDistribution || []}
          cx="50%"
          cy="50%"
          outerRadius={88}
          dataKey="value"
          nameKey="name"
          label={({ name, value }) => `${name}: ${value}`}
          labelLine={false}
        >
          {(data?.userDistribution || []).map((_: any, index: number) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    ),
  },
  {
    title: "Peak Hours",
    group: "Composition",
    render: (data: any) => (
      <BarChart data={data?.peakHours || []}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="hour" stroke="#78716c" fontSize={12} />
        <YAxis stroke="#78716c" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="rides" name="Quest Completions" fill="#8ecae6" radius={[10, 10, 0, 0]} />
      </BarChart>
    ),
  },
  {
    title: "User Onboarding",
    group: "Lifecycle",
    render: (data: any) => (
      <LineChart data={data?.userOnboarding || []}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="name" stroke="#78716c" fontSize={12} />
        <YAxis stroke="#78716c" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        <Line
          type="monotone"
          dataKey="signups"
          name="Signups"
          stroke="#cbd5e1"
          strokeWidth={2.5}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="completed_onboarding"
          name="Completed"
          stroke="#7dd3a7"
          strokeWidth={2.5}
          dot={false}
        />
      </LineChart>
    ),
  },
  {
    title: "Messages Over Time",
    group: "Lifecycle",
    render: (data: any) => (
      <LineChart data={data?.messagesOverTime || []}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="date" stroke="#78716c" fontSize={12} />
        <YAxis stroke="#78716c" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalMessages"
          name="Total Messages"
          stroke="#8ecae6"
          strokeWidth={3}
          dot={{ fill: "#8ecae6", r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    ),
  },
  {
    title: "Daily Messages",
    group: "Lifecycle",
    render: (data: any) => (
      <BarChart data={data?.dailyMessages || []}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="date" stroke="#78716c" fontSize={12} />
        <YAxis stroke="#78716c" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="messages" name="Messages" fill="#7dd3a7" radius={[10, 10, 0, 0]} />
      </BarChart>
    ),
  },
  {
    title: "Spaces Over Time",
    group: "Lifecycle",
    render: (data: any) => (
      <LineChart data={data?.spacesOverTime || []}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="date" stroke="#78716c" fontSize={12} />
        <YAxis stroke="#78716c" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalSpaces"
          name="Total Spaces"
          stroke="#94a3b8"
          strokeWidth={3}
          dot={{ fill: "#94a3b8", r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    ),
  },
];

export function ChartSection() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");

  const { data: chartData, isLoading } = useQuery({
    queryKey: ["charts", timeRange],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/admin/charts?range=${timeRange}`);
        return data;
      } catch (error) {
        console.error("Failed to fetch charts data:", error);
        return {
          ridesOverTime: [],
          revenueByDay: [],
          userDistribution: [],
          peakHours: [],
          userOnboarding: [],
          userGrowth: [],
          questCompletionOverTime: [],
          messagesOverTime: [],
          dailyMessages: [],
          spacesOverTime: [],
        };
      }
    },
    refetchInterval: 60000,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Grouped into growth, composition, and lifecycle panels.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {chartCards.map((chart) => (
          <Card
            key={chart.title}
            className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] dark:shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
          >
            <CardHeader className="border-b border-stone-200/80 dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                {chart.group}
              </p>
              <CardTitle className="text-xl font-semibold tracking-[-0.03em] text-stone-900 dark:text-stone-100">
                {chart.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="flex h-[320px] items-center justify-center text-sm text-stone-500">
                  Loading chart data...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  {chart.render(chartData)}
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
