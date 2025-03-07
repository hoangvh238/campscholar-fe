"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Easy", value: 40, color: "#22c55e" },
  { name: "Medium", value: 45, color: "#eab308" },
  { name: "Hard", value: 15, color: "#ef4444" },
]

interface DifficultyDistributionProps {
  data: {
    name: string;
    value: number;
    color: string;
    number: number
  }[];
}

export function DifficultyDistribution({ data }: DifficultyDistributionProps) {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="number">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-1 flex justify-center gap-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm">
              {item.name} ({item.value.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

