import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Clock,
  GitPullRequest,
  Tag,
  User,
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, Divider } from "@/components/Card";
import { Badge, PriorityBadge } from "@/components/Badge";
import { productItems, type ProductItem } from "@/lib/data";

type Column = "in_progress" | "blocked" | "ready_qa" | "released";

const columns: { key: Column; label: string; color: string; icon: React.ReactNode; description: string }[] = [
  {
    key: "in_progress",
    label: "In Progress",
    color: "var(--info)",
    icon: <Circle size={14} className="text-blue-400" />,
    description: "Actively being worked on",
  },
  {
    key: "blocked",
    label: "Blocked",
    color: "var(--danger)",
    icon: <AlertCircle size={14} className="text-red-400" />,
    description: "Waiting on external dependency",
  },
  {
    key: "ready_qa",
    label: "Ready for QA",
    color: "var(--warning)",
    icon: <GitPullRequest size={14} className="text-amber-400" />,
    description: "Code complete, awaiting review",
  },
  {
    key: "released",
    label: "Released",
    color: "var(--success)",
    icon: <CheckCircle2 size={14} className="text-green-400" />,
    description: "Live in production",
  },
];

function ProductCard({ item }: { item: ProductItem }) {
  const isBlocked = item.status === "blocked";
  return (
    <div
      className="rounded-lg p-4 border transition-colors hover:bg-white/[0.02] group"
      style={{
        background: "var(--surface-2)",
        borderColor: isBlocked ? "rgba(239,68,68,0.25)" : "var(--border-subtle)",
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-sm font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
          {item.title}
        </span>
        <PriorityBadge priority={item.priority} />
      </div>
      <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
        {item.description}
      </p>

      {isBlocked && item.blockedReason && (
        <div
          className="flex items-start gap-2 rounded-md p-2.5 mb-3"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}
        >
          <AlertCircle size={12} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: "#fca5a5" }}>
            {item.blockedReason}
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <User size={11} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
            {item.assignee}
          </span>
        </div>
        {item.dueDate && (
          <div className="flex items-center gap-1.5">
            <Clock size={11} style={{ color: "var(--text-tertiary)" }} />
            <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
              {item.dueDate}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Tag size={11} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
            {item.team}
          </span>
        </div>
      </div>

      {item.labels.length > 0 && (
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {item.labels.map((l) => (
            <span
              key={l}
              className="text-[10px] px-1.5 py-0.5 rounded"
              style={{ background: "var(--surface-3)", color: "var(--text-tertiary)" }}
            >
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ColumnHeader({
  col,
  count,
}: {
  col: (typeof columns)[number];
  count: number;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {col.icon}
        <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {col.label}
        </h2>
        <span
          className="text-xs px-1.5 py-0.5 rounded font-semibold"
          style={{ background: "var(--surface-3)", color: "var(--text-secondary)" }}
        >
          {count}
        </span>
      </div>
    </div>
  );
}

function SummaryBar() {
  const total = productItems.length;
  const blocked = productItems.filter((i) => i.status === "blocked").length;
  const inProgress = productItems.filter((i) => i.status === "in_progress").length;
  const readyQa = productItems.filter((i) => i.status === "ready_qa").length;
  const released = productItems.filter((i) => i.status === "released").length;

  return (
    <div
      className="grid grid-cols-4 gap-4 mb-6 rounded-xl p-4"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {[
        { label: "In Progress", value: inProgress, color: "var(--info)" },
        { label: "Blocked", value: blocked, color: "var(--danger)" },
        { label: "Ready for QA", value: readyQa, color: "var(--warning)" },
        { label: "Released", value: released, color: "var(--success)" },
      ].map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <span className="text-2xl font-bold" style={{ color: s.color }}>
            {s.value}
          </span>
          <div>
            <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              {s.label}
            </p>
            <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
              of {total} total
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductPage() {
  return (
    <div className="px-8 py-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Product
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
          Current sprint status across all teams
        </p>
        <Link href="/bugs" className="text-xs font-medium hover:underline" style={{ color: "var(--accent)" }}>
          View bugs by module →
        </Link>
      </div>

      <SummaryBar />

      <div className="grid grid-cols-4 gap-5">
        {columns.map((col) => {
          const items = productItems.filter((i) => i.status === col.key);
          return (
            <div key={col.key}>
              <ColumnHeader col={col} count={items.length} />
              <div className="space-y-3">
                {items.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
                {items.length === 0 && (
                  <div
                    className="rounded-lg p-6 text-center border-2 border-dashed"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                      Nothing here
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
