"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { topic: "Arrays", attempts: 245 },
  { topic: "Strings", attempts: 180 },
  { topic: "DP", attempts: 120 },
  { topic: "Trees", attempts: 95 },
  { topic: "Graphs", attempts: 75 },
]

export function TopicEngagement() {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="topic" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="attempts" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

