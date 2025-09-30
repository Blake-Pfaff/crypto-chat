"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Text } from "./ui/Text";
import { Dropdown } from "./ui/Dropdown";
import { PriceChartProps, PriceData } from "./types";

// Time period options for the dropdown
const TIME_PERIOD_OPTIONS = [
  { value: "1", label: "24 Hours" },
  { value: "7", label: "7 Days" },
  { value: "30", label: "30 Days" },
  { value: "90", label: "3 Months" },
  { value: "365", label: "1 Year" },
];

// Data points options
const DATA_POINTS_OPTIONS = [
  { value: 24, label: "24 points" },
  { value: 48, label: "48 points" },
  { value: 72, label: "72 points" },
  { value: 96, label: "96 points" },
  { value: 120, label: "120 points" },
  { value: 168, label: "168 points" },
];

export function PriceChart({ data, isPositive, coinName }: PriceChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("7");
  const [selectedDataPoints, setSelectedDataPoints] = useState(168);

  // Sample or interpolate data to match selected points
  const getChartData = (): PriceData[] => {
    const targetPoints = selectedDataPoints;
    let processedData: number[] = [];

    if (data.length <= targetPoints) {
      processedData = data;
    } else {
      const step = data.length / targetPoints;
      processedData = [];

      for (let i = 0; i < targetPoints; i++) {
        const index = Math.floor(i * step);
        processedData.push(data[index]);
      }
    }

    return processedData.map((price, index) => {
      const timeAgo = getTimeAgo(index, processedData.length);
      return {
        time: formatTimeLabel(timeAgo, selectedPeriod),
        price: price,
        timestamp: Date.now() - timeAgo,
        timeAgo: timeAgo, // Keep for tooltip
      };
    });
  };

  // Calculate time ago in milliseconds
  const getTimeAgo = (index: number, totalPoints: number): number => {
    const periodHours = {
      "1": 24, // 24 hours
      "7": 168, // 7 days = 168 hours
      "30": 720, // 30 days = 720 hours
      "90": 2160, // 90 days = 2160 hours
      "365": 8760, // 365 days = 8760 hours
    };

    const totalHours =
      periodHours[selectedPeriod as keyof typeof periodHours] || 168;
    const hoursPerPoint = totalHours / totalPoints;
    const hoursAgo = (totalPoints - index - 1) * hoursPerPoint;

    return hoursAgo * 3600000; // Convert to milliseconds
  };

  // Format time labels for X-axis
  const formatTimeLabel = (timeAgoMs: number, period: string): string => {
    const hoursAgo = timeAgoMs / 3600000;
    const daysAgo = hoursAgo / 24;

    if (period === "1") {
      // For 24 hours, show hours
      return `${Math.round(hoursAgo)}h`;
    } else if (period === "7") {
      // For 7 days, show days
      return `${Math.round(daysAgo)}d`;
    } else if (period === "30") {
      // For 30 days, show days
      const days = Math.round(daysAgo);
      return days === 0 ? "now" : `${days}d`;
    } else {
      // For longer periods, show weeks or months
      const weeks = Math.round(daysAgo / 7);
      const months = Math.round(daysAgo / 30);

      if (daysAgo < 14) {
        return `${Math.round(daysAgo)}d`;
      } else if (daysAgo < 60) {
        return `${weeks}w`;
      } else {
        return `${months}mo`;
      }
    }
  };

  const chartData = getChartData();

  // Enhanced Custom Tooltip
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      value: number;
      payload: { time: string; price: number; timeAgo: number };
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const price = payload[0].value;
      const timeAgo = data.timeAgo / 3600000; // Convert back to hours

      let timeDisplay = "";
      if (timeAgo < 1) {
        timeDisplay = "Now";
      } else if (timeAgo < 24) {
        timeDisplay = `${Math.round(timeAgo)} hours ago`;
      } else {
        const daysAgo = Math.round(timeAgo / 24);
        timeDisplay = `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
      }

      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600">
          <Text size="sm" weight="medium" className="mb-1">
            {coinName}
          </Text>
          <Text
            size="lg"
            weight="bold"
            color={isPositive ? "success" : "danger"}
            className="mb-1"
          >
            $
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}
          </Text>
          <Text size="xs" color="secondary">
            {timeDisplay}
          </Text>
        </div>
      );
    }
    return null;
  };

  const getXAxisInterval = (dataLength: number): number => {
    if (dataLength <= 24) return 0; // Show all ticks
    if (dataLength <= 48) return 1;
    if (dataLength <= 96) return 3;
    return Math.floor(dataLength / 8);
  };

  return (
    <div className="space-y-4">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Text size="lg" weight="semibold">
          Price Chart
        </Text>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <Text size="sm" color="secondary" className="whitespace-nowrap">
              Period:
            </Text>
            <Dropdown
              options={TIME_PERIOD_OPTIONS}
              value={selectedPeriod}
              onChange={(value) => setSelectedPeriod(String(value))}
              className="w-32"
            />
          </div>

          <div className="flex items-center gap-2">
            <Text size="sm" color="secondary" className="whitespace-nowrap">
              Points:
            </Text>
            <Dropdown
              options={DATA_POINTS_OPTIONS}
              value={selectedDataPoints}
              onChange={(value) => setSelectedDataPoints(Number(value))}
              className="w-32"
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              interval={getXAxisInterval(chartData.length)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) =>
                `$${value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "#10B981" : "#EF4444"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: isPositive ? "#10B981" : "#EF4444" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Info */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm">
        <Text color="secondary">
          Showing{" "}
          {TIME_PERIOD_OPTIONS.find(
            (opt) => opt.value === selectedPeriod
          )?.label.toLowerCase()}{" "}
          price history
        </Text>
        <div className="flex gap-4">
          <Text color="secondary">
            {chartData.length} data points displayed
          </Text>
          <Text color="secondary">{data.length} total available</Text>
        </div>
      </div>
    </div>
  );
}
