"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface StudentInteractionProps {
  data: {
    day: string;
    attempts: number;
    date: string;
  }[];
}

// Custom Tooltip để hiển thị thêm date
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { date, attempts } = payload[0].payload;
    return (
      <div className="rounded-md bg-white p-2 shadow-lg">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">Date: {date}</p>
        <p className="text-xs text-blue-500">Attempts: {attempts}</p>
      </div>
    );
  }
  return null;
};

export function StudentInteraction({ data }: StudentInteractionProps) {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="attempts"
            stroke="#3b82f6"
            fill="#3b82f680"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
