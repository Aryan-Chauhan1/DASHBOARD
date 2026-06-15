"use client"; // needs to be client for scroll behavior

import { Bug, AlertCircle, CheckCircle2, Clock, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, Divider } from "@/components/Card";
import { Badge, PriorityBadge } from "@/components/Badge";
import { openBugs, getBugsByModule, moduleSlug, type Bug as BugType } from "@/lib/data";
import { VerticalBarChart } from "@/components/Charts";
import { formatDistanceToNow } from "date-fns";

function BugCard({ bug }: { bug: BugType }) {
  return (
    <div className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors border-b last:border-b-0" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <PriorityBadge priority={bug.priority} />
          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{bug.title}</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {bug.linearId && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded" style={{ background: "var(--surface-3)", color: "var(--text-tertiary)" }}>
              {bug.linearId}
            </span>
          )}
          {bug.assignee && (
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>→ {bug.assignee}</span>
          )}
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            {formatDistanceToNow(new Date(bug.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
      <Badge variant={bug.status === "in_progress" ? "info" : bug.status === "open" ? "warning" : "neutral"}>
        {bug.status.replace("_", " ")}
      </Badge>
    </div>
  );
}

export default function BugsPage() {
  const moduleData = getBugsByModule(openBugs);
  const highCount = openBugs.filter((b) => b.priority === "high" || b.priority === "critical").length;

  const handleBarClick = (label: string) => {
    const el = document.getElementById(`bugs-${moduleSlug(label)}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#bugs-${moduleSlug(label)}`);
    }
  };

  return (
    <div className="px-8 py-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Bugs</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
          {openBugs.length} open · {highCount} high priority · {moduleData.length} modules affected
        </p>
      </div>

      {/* Module overview chart */}
      <Card className="mb-8">
        <CardHeader
          title="Bugs by module"
          subtitle="Click a bar to jump to that module"
          icon={<Bug size={16} className="text-red-400" />}
        />
        <Divider />
        <div className="px-5 pt-3 pb-4">
          <VerticalBarChart
            data={moduleData.map((m) => ({ label: m.module, count: m.count, color: m.color }))}
            onBarClick={handleBarClick}
          />
        </div>
      </Card>

      {/* Bug sections grouped by module */}
      <div className="space-y-6">
        {moduleData.map(({ module, count, color }) => {
          const bugs = openBugs.filter((b) => b.module === module);
          const slug = moduleSlug(module);
          return (
            <div key={module} id={`bugs-${slug}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{module}</h2>
                <span className="text-xs px-1.5 py-0.5 rounded font-semibold" style={{ background: "var(--surface-3)", color: "var(--text-secondary)" }}>
                  {count}
                </span>
              </div>
              <Card>
                {bugs.map((bug) => (
                  <BugCard key={bug.id} bug={bug} />
                ))}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
