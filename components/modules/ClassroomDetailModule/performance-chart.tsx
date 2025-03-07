"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#F66B15", "#B4B4B4", "#8884d8"]; // Orange for solved, Grey for attempted, Blue for not attempted

type PerformanceData = {
  totalSolvedProblems: number;
  totalAttemptedProblems: number;
  totalNotAttemptedProblems: number;
};

export function PerformanceChart({ data }: { data: PerformanceData }) {
  const chartData = [
    { name: "Solved", value: data.totalSolvedProblems },
    { name: "Attempted", value: data.totalAttemptedProblems },
    { name: "Not Attempted", value: data.totalNotAttemptedProblems },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}