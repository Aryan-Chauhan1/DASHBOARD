"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const TOOLTIP = {
  background: "#1a1a24",
  border: "1px solid #2a2a3a",
  borderRadius: "8px",
  color: "#f0f0ff",
  fontSize: "12px",
  padding: "8px 12px",
};

export function VerticalBarChart({
  data,
}: {
  data: { label: string; count: number; color: string }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart
        data={data.map((d) => ({ name: d.label, count: d.count }))}
        barSize={30}
        margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
      >
        <XAxis
          dataKey="name"
          tick={{ fill: "#8888aa", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#8888aa", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
          width={24}
        />
        <Tooltip
          contentStyle={TOOLTIP}
          cursor={{ fill: "rgba(255,255,255,0.03)" }}
          labelStyle={{ color: "#f0f0ff", marginBottom: 2 }}
          itemStyle={{ color: "#8888aa" }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({
  data,
  emptyLabel,
}: {
  data: { label: string; value: number; color: string }[];
  emptyLabel?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height: 160 }}>
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center"
          style={{ border: "2px dashed #2a2a3a" }}
        >
          <span className="text-xs text-center px-2" style={{ color: "#555570" }}>
            {emptyLabel ?? "No data yet"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={160}>
      <PieChart>
        <Pie
          data={data.map((d) => ({ name: d.label, value: d.value }))}
          cx="50%"
          cy="50%"
          innerRadius={46}
          outerRadius={68}
          paddingAngle={2}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={TOOLTIP}
          formatter={(value: number) => [`${value}%`]}
          labelStyle={{ color: "#f0f0ff" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
