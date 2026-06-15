import {
  AlertTriangle,
  ArrowRight,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Card, CardHeader, Divider } from "@/components/Card";
import { Badge, PriorityBadge } from "@/components/Badge";
import { aiInsights, type AIInsight } from "@/lib/data";

const typeConfig = {
  risk: {
    icon: <AlertTriangle size={16} className="text-red-400" />,
    bg: "bg-red-500/10",
    border: "rgba(239,68,68,0.2)",
    badgeVariant: "critical" as const,
    label: "Risk",
  },
  opportunity: {
    icon: <TrendingUp size={16} className="text-green-400" />,
    bg: "bg-green-500/10",
    border: "rgba(34,197,94,0.15)",
    badgeVariant: "success" as const,
    label: "Opportunity",
  },
  recommendation: {
    icon: <Lightbulb size={16} className="text-indigo-400" />,
    bg: "bg-indigo-500/10",
    border: "rgba(99,102,241,0.2)",
    badgeVariant: "purple" as const,
    label: "Recommendation",
  },
};

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background:
              value >= 80
                ? "var(--success)"
                : value >= 60
                ? "var(--warning)"
                : "var(--danger)",
          }}
        />
      </div>
      <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
        {value}%
      </span>
    </div>
  );
}

function EffortBadge({ effort }: { effort: "high" | "medium" | "low" }) {
  const config = {
    high: { color: "var(--danger)", label: "High effort" },
    medium: { color: "var(--warning)", label: "Medium effort" },
    low: { color: "var(--success)", label: "Low effort" },
  };
  const c = config[effort];
  return (
    <span
      className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
      style={{ color: c.color, background: `${c.color}18` }}
    >
      {c.label}
    </span>
  );
}

function InsightCard({ insight }: { insight: AIInsight }) {
  const tc = typeConfig[insight.type];

  return (
    <div
      className="rounded-xl p-5 border transition-colors hover:bg-white/[0.01]"
      style={{
        background: "var(--surface)",
        borderColor: tc.border,
      }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${tc.bg}`}>
          {tc.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={tc.badgeVariant}>{tc.label}</Badge>
              <PriorityBadge priority={insight.priority} />
              {insight.effort && <EffortBadge effort={insight.effort} />}
            </div>
            <div className="flex-shrink-0 w-32">
              <p className="text-[11px] mb-1" style={{ color: "var(--text-tertiary)" }}>
                Confidence
              </p>
              <ConfidenceBar value={insight.confidence} />
            </div>
          </div>

          <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            {insight.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {insight.description}
          </p>

          {insight.relatedItems && insight.relatedItems.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                Related:
              </span>
              {insight.relatedItems.map((item) => (
                <span
                  key={item}
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: "var(--surface-3)", color: "var(--text-secondary)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow() {
  const risks = aiInsights.filter((i) => i.type === "risk").length;
  const opportunities = aiInsights.filter((i) => i.type === "opportunity").length;
  const recommendations = aiInsights.filter((i) => i.type === "recommendation").length;
  const criticals = aiInsights.filter((i) => i.priority === "critical").length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { label: "Risks", value: risks, icon: <AlertTriangle size={15} />, color: "var(--danger)" },
        { label: "Opportunities", value: opportunities, icon: <TrendingUp size={15} />, color: "var(--success)" },
        { label: "Recommendations", value: recommendations, icon: <Lightbulb size={15} />, color: "var(--accent)" },
        { label: "Critical Priority", value: criticals, icon: <Target size={15} />, color: "var(--warning)" },
      ].map((s) => (
        <div
          key={s.label}
          className="rounded-xl px-5 py-4 border"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {s.label}
            </span>
            <span style={{ color: s.color }}>{s.icon}</span>
          </div>
          <span className="text-2xl font-bold" style={{ color: s.color }}>
            {s.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function InsightSection({
  type,
  insights,
}: {
  type: "risk" | "opportunity" | "recommendation";
  insights: AIInsight[];
}) {
  if (insights.length === 0) return null;
  const tc = typeConfig[type];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        {tc.icon}
        <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {tc.label}s
        </h2>
        <span
          className="text-xs px-1.5 py-0.5 rounded font-semibold"
          style={{ background: "var(--surface-3)", color: "var(--text-secondary)" }}
        >
          {insights.length}
        </span>
      </div>
      <div className="space-y-3">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}

function HeaderBanner() {
  return (
    <div
      className="rounded-xl p-4 mb-6 flex items-center gap-4"
      style={{
        background: "rgba(99,102,241,0.06)",
        border: "1px solid rgba(99,102,241,0.2)",
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(99,102,241,0.15)" }}>
        <Sparkles size={18} className="text-indigo-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          AI analysis updated just now
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
          Based on {aiInsights.length} signals across bugs, support tickets, feature requests, and product status.
          Insights are ordered by confidence and business impact.
        </p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
        <span className="text-xs" style={{ color: "var(--accent)" }}>Live</span>
      </div>
    </div>
  );
}

export default function AIInsightsPage() {
  const risks = aiInsights.filter((i) => i.type === "risk");
  const opportunities = aiInsights.filter((i) => i.type === "opportunity");
  const recommendations = aiInsights.filter((i) => i.type === "recommendation");

  return (
    <div className="px-8 py-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            AI Insights
          </h1>
          <Badge variant="purple">AI</Badge>
        </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Risks, opportunities, and recommendations synthesized from all operational signals
        </p>
      </div>

      <HeaderBanner />
      <SummaryRow />

      <InsightSection type="risk" insights={risks} />
      <InsightSection type="opportunity" insights={opportunities} />
      <InsightSection type="recommendation" insights={recommendations} />
    </div>
  );
}
