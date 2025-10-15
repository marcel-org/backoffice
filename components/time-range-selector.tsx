"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type TimeRange = "7d" | "30d" | "3m" | "6m" | "1y";

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

const timeRangeOptions = [
  { value: "7d" as TimeRange, label: "Last 7 days" },
  { value: "30d" as TimeRange, label: "Last 30 days" },
  { value: "3m" as TimeRange, label: "Last 3 months" },
  { value: "6m" as TimeRange, label: "Last 6 months" },
  { value: "1y" as TimeRange, label: "Last year" },
];

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent>
        {timeRangeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}