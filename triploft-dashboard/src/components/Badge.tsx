import { cn } from "@/lib/utils";

type Variant = "critical" | "high" | "medium" | "low" | "info" | "success" | "warning" | "neutral" | "purple";

const variantStyles: Record<Variant, { bg: string; color: string }> = {
  critical: { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
  high: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  medium: { bg: "rgba(59,130,246,0.12)", color: "#60a5fa" },
  low: { bg: "rgba(136,136,170,0.12)", color: "#8888aa" },
  info: { bg: "rgba(59,130,246,0.12)", color: "#60a5fa" },
  success: { bg: "rgba(34,197,94,0.12)", color: "#22c55e" },
  warning: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  neutral: { bg: "rgba(255,255,255,0.06)", color: "#8888aa" },
  purple: { bg: "rgba(99,102,241,0.12)", color: "#818cf8" },
};

interface BadgeProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ variant = "neutral", children, className, dot }: BadgeProps) {
  const { bg, color } = variantStyles[variant];
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wide", className)}
      style={{ background: bg, color }}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />}
      {children}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, Variant> = {
    critical: "critical",
    high: "high",
    medium: "medium",
    low: "low",
  };
  return <Badge variant={map[priority] ?? "neutral"} dot>{priority}</Badge>;
}
