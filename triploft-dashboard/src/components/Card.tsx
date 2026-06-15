import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export function Card({ className, children, hover }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border transition-colors duration-150",
        hover && "hover:border-[#3a3a4a] cursor-pointer",
        className
      )}
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action, icon }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between px-5 pt-5 pb-4">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--surface-2)" }}>
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{title}</h3>
          {subtitle && <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>{subtitle}</p>}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export function Divider() {
  return <div className="h-px mx-5" style={{ background: "var(--border)" }} />;
}

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaPositive?: boolean;
  icon?: React.ReactNode;
  accent?: string;
  sublabel?: string;
}

export function StatCard({ label, value, delta, deltaPositive, icon, accent, sublabel }: StatCardProps) {
  return (
    <Card>
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium" style={{ color: "var(--text-tertiary)" }}>{label}</span>
          {icon && <span style={{ color: accent ?? "var(--text-tertiary)" }}>{icon}</span>}
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold tracking-tight" style={{ color: accent ?? "var(--text-primary)" }}>
            {value}
          </span>
          {delta && (
            <span className={`text-xs font-medium mb-0.5 ${deltaPositive ? "text-green-400" : "text-red-400"}`}>
              {deltaPositive ? "↑" : "↓"} {delta}
            </span>
          )}
        </div>
        {sublabel && <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>{sublabel}</p>}
      </div>
    </Card>
  );
}
