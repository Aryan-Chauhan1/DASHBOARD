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
import { useTheme } from "./ThemeProvider";

function useChartColors() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return {
    tick: dark ? "#8888aa" : "#52527a",
    tooltip: {
      background: dark ? "#1a1a24" : "#ffffff",
      border: `1px solid ${dark ? "#2a2a3a" : "#d8d8ea"}`,
      borderRadius: "8px",
      color: dark ? "#f0f0ff" : "#18182e",
      fontSize: "12px",
      padding: "8px 12px",
    },
    cursor: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
  };
}

export function VerticalBarChart({
  data,
  onBarClick,
}: {
  data: { label: string; count: number; color: string }[];
  onBarClick?: (label: string) => void;
}) {
  const { tick, tooltip, cursor } = useChartColors();
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart
        data={data.map((d) => ({ name: d.label, count: d.count }))}
        barSize={30}
        margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
        onClick={(payload) => {
          if (onBarClick && payload?.activeLabel != null) {
            onBarClick(String(payload.activeLabel));
          }
        }}
        style={onBarClick ? { cursor: "pointer" } : undefined}
      >
        <XAxis dataKey="name" tick={{ fill: tick, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: tick, fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} width={24} />
        <Tooltip contentStyle={tooltip} cursor={{ fill: cursor }} labelStyle={{ color: tooltip.color, marginBottom: 2 }} itemStyle={{ color: tick }} />
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
  const { theme } = useTheme();
  const { tooltip } = useChartColors();
  const total = data.reduce((s, d) => s + d.value, 0);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height: 160 }}>
        <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ border: "2px dashed var(--border)" }}>
          <span className="text-xs text-center px-2" style={{ color: "var(--text-tertiary)" }}>
            {emptyLabel ?? "No data yet"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={160}>
      <PieChart>
        <Pie data={data.map((d) => ({ name: d.label, value: d.value }))} cx="50%" cy="50%" innerRadius={46} outerRadius={68} paddingAngle={2} dataKey="value" strokeWidth={0}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltip} formatter={(value) => [`${value}%`]} labelStyle={{ color: tooltip.color }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
