"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mon",
    total: 4.5,
  },
  {
    name: "Tue",
    total: 6.2,
  },
  {
    name: "Wed",
    total: 5.8,
  },
  {
    name: "Thu",
    total: 7.1,
  },
  {
    name: "Fri",
    total: 5.5,
  },
  {
    name: "Sat",
    total: 3.2,
  },
  {
    name: "Sun",
    total: 2.5,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}h`}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
