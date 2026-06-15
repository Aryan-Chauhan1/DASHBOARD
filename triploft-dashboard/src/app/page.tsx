import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  MessageSquare,
  Rocket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardHeader, Divider, StatCard } from "@/components/Card";
import { Badge, PriorityBadge } from "@/components/Badge";
import {
  aiInsights,
  escalatedTickets,
  featureRequests,
  featuresShipped,
  openBugs,
  productItems,
} from "@/lib/data";
import { formatDistanceToNow } from "date-fns";

function PageHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Overview
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
          Sun Jun 15, 2026 — Linear: 150 issues synced · Intercom: workspace live
        </p>
      </div>
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
        style={{
          background: "rgba(245,158,11,0.1)",
          color: "#f59e0b",
          border: "1px solid rgba(245,158,11,0.2)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        45 items awaiting QA
      </div>
    </div>
  );
}

function AttentionBanner() {
  return (
    <div
      className="rounded-xl p-4 mb-6 flex items-start gap-4"
      style={{
        background: "rgba(245,158,11,0.07)",
        border: "1px solid rgba(245,158,11,0.2)",
      }}
    >
      <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-400">Production release at risk</p>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          30 items in Staging + 15 In Review need QA sign-off before production can ship.{" "}
          <span className="font-semibold text-amber-400">TL-2720</span> (production readiness checklist) is still in Todo — run the team sync to unblock.
        </p>
      </div>
      <ChevronRight size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
    </div>
  );
}

function StatsRow() {
  const highPriBugs = openBugs.filter((b) => b.priority === "high" || b.priority === "critical").length;
  const stagingCount = productItems.filter((i) => i.status === "ready_qa").length;
  const inProgressCount = productItems.filter((i) => i.status === "in_progress").length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Features Shipped"
        value={featuresShipped.length}
        icon={<Rocket size={16} />}
        accent="var(--success)"
        sublabel="Recently completed"
      />
      <StatCard
        label="Open Bugs"
        value={openBugs.length}
        delta={`${highPriBugs} high priority`}
        deltaPositive={false}
        icon={<Bug size={16} />}
        accent="var(--danger)"
      />
      <StatCard
        label="In Staging (QA)"
        value={stagingCount}
        icon={<MessageSquare size={16} />}
        accent="var(--warning)"
        sublabel={`+ ${inProgressCount} in progress`}
      />
      <StatCard
        label="Intercom Conversations"
        value={0}
        icon={<Lightbulb size={16} />}
        accent="var(--info)"
        sublabel="Workspace configured — no tickets yet"
      />
    </div>
  );
}

function FeaturesShippedCard() {
  return (
    <Card>
      <CardHeader
        title="Features Shipped This Week"
        subtitle={`${featuresShipped.length} shipped`}
        icon={<Rocket size={16} className="text-green-400" />}
        action={
          <span
            className="text-xs px-2 py-1 rounded-md"
            style={{ background: "var(--surface-2)", color: "var(--text-secondary)" }}
          >
            Sprint 24
          </span>
        }
      />
      <Divider />
      <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
        {featuresShipped.map((f) => (
          <div key={f.id} className="flex items-start gap-4 px-5 py-3.5">
            <CheckCircle2 size={15} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {f.title}
                </span>
                <Badge variant={f.impact === "high" ? "success" : f.impact === "medium" ? "info" : "neutral"}>
                  {f.impact} impact
                </Badge>
              </div>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                {f.description}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                {formatDistanceToNow(new Date(f.shippedAt), { addSuffix: true })}
              </span>
              <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                {f.team}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function OpenBugsCard() {
  return (
    <Card>
      <CardHeader
        title="Open Bugs"
        subtitle={`${openBugs.length} open · ${openBugs.filter((b) => b.priority === "critical").length} critical`}
        icon={<Bug size={16} className="text-red-400" />}
      />
      <Divider />
      <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
        {openBugs.map((bug) => (
          <div
            key={bug.id}
            className="flex items-start gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <PriorityBadge priority={bug.priority} />
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {bug.title}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  <Users size={11} className="inline mr-1" />
                  {bug.affectedUsers.toLocaleString()} users
                </span>
                {bug.assignee && (
                  <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    → {bug.assignee}
                  </span>
                )}
                <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  {formatDistanceToNow(new Date(bug.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
            <Badge variant={bug.status === "in_progress" ? "info" : "neutral"}>
              {bug.status.replace("_", " ")}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

function EscalatedTicketsCard() {
  return (
    <Card>
      <CardHeader
        title="Support Tickets (Intercom)"
        subtitle="Synced from Intercom"
        icon={<AlertTriangle size={16} className="text-amber-400" />}
      />
      <Divider />
      <div className="px-5 py-8 flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
          style={{ background: "rgba(34,197,94,0.1)" }}>
          <MessageSquare size={18} className="text-green-400" />
        </div>
        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          No open tickets
        </p>
        <p className="text-xs mt-1 max-w-[220px]" style={{ color: "var(--text-secondary)" }}>
          Intercom workspace configured on June 13. Awaiting first real customer conversations.
        </p>
        <span className="mt-3 text-[11px] px-2 py-1 rounded-md font-medium"
          style={{ background: "rgba(34,197,94,0.1)", color: "var(--success)" }}>
          Workspace operational
        </span>
      </div>
    </Card>
  );
}

function FeatureRequestsCard() {
  return (
    <Card>
      <CardHeader
        title="Top Feature Requests"
        subtitle="By vote count"
        icon={<TrendingUp size={16} className="text-indigo-400" />}
      />
      <Divider />
      <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
        {featureRequests.map((req, i) => (
          <div
            key={req.id}
            className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
          >
            <span
              className="text-lg font-bold w-6 text-center"
              style={{ color: "var(--text-tertiary)" }}
            >
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {req.title}
                </span>
                <Badge
                  variant={
                    req.status === "planned"
                      ? "success"
                      : req.status === "under_review"
                      ? "warning"
                      : "neutral"
                  }
                >
                  {req.status.replace("_", " ")}
                </Badge>
              </div>
              <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                {req.category}
              </span>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {req.votes}
              </span>
              <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                votes
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AIRecommendationsCard() {
  const topInsights = aiInsights.slice(0, 3);
  return (
    <Card className="col-span-2">
      <CardHeader
        title="AI Recommendations"
        subtitle="Top actions based on current signals"
        icon={<Zap size={16} className="text-indigo-400" />}
        action={<Badge variant="purple">Powered by AI</Badge>}
      />
      <Divider />
      <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
        {topInsights.map((insight) => (
          <div
            key={insight.id}
            className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                insight.type === "risk"
                  ? "bg-red-500/10"
                  : insight.type === "opportunity"
                  ? "bg-green-500/10"
                  : "bg-indigo-500/10"
              }`}
            >
              {insight.type === "risk" ? (
                <AlertTriangle size={14} className="text-red-400" />
              ) : insight.type === "opportunity" ? (
                <TrendingUp size={14} className="text-green-400" />
              ) : (
                <Lightbulb size={14} className="text-indigo-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge
                  variant={
                    insight.type === "risk"
                      ? "critical"
                      : insight.type === "opportunity"
                      ? "success"
                      : "purple"
                  }
                >
                  {insight.type}
                </Badge>
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {insight.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {insight.description}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                {insight.confidence}%
              </span>
              <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                confidence
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="px-5 py-3 flex justify-end border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <a
          href="/ai-insights"
          className="text-xs font-medium flex items-center gap-1 hover:text-indigo-300 transition-colors"
          style={{ color: "var(--accent)" }}
        >
          View all insights <ChevronRight size={13} />
        </a>
      </div>
    </Card>
  );
}

export default function OverviewPage() {
  return (
    <div className="px-8 py-6 max-w-7xl mx-auto">
      <PageHeader />
      <AttentionBanner />
      <StatsRow />
      <div className="grid grid-cols-2 gap-5 mb-5">
        <FeaturesShippedCard />
        <OpenBugsCard />
      </div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <EscalatedTicketsCard />
        <FeatureRequestsCard />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <AIRecommendationsCard />
      </div>
    </div>
  );
}
