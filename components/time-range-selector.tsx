"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export function TimeRangeSelector({
  value,
  onChange,
}: TimeRangeSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full rounded-full border border-stone-200 bg-white px-5 text-stone-900 dark:border-white/10 dark:bg-white/6 dark:text-stone-100 sm:w-[220px]">
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent className="border-stone-200 bg-white text-stone-900 dark:border-white/10 dark:bg-[#12110f] dark:text-stone-100">
        {timeRangeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
