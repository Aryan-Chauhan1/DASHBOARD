import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  DollarSign,
  Frown,
  MessageCircle,
  Meh,
  Smile,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card, CardHeader, Divider } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { requestedFeatures, sentimentData, topComplaints } from "@/lib/data";

function SentimentHeader() {
  const { score, change, breakdown } = sentimentData;
  const isPositive = change >= 0;

  return (
    <div className="grid grid-cols-3 gap-5 mb-6">
      <Card>
        <div className="px-5 py-5">
          <p className="text-xs font-medium mb-2" style={{ color: "var(--text-tertiary)" }}>
            Overall Sentiment Score
          </p>
          <div className="flex items-end gap-2">
            <span
              className="text-4xl font-bold tracking-tight"
              style={{ color: score >= 70 ? "var(--success)" : score >= 50 ? "var(--warning)" : "var(--danger)" }}
            >
              {score}
            </span>
            <span className="mb-1.5 text-sm" style={{ color: "var(--text-tertiary)" }}>
              / 100
            </span>
            <span className={`mb-1.5 text-sm font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? "↑" : "↓"} {Math.abs(change)} pts
            </span>
          </div>
          <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
            vs. last week
          </p>
        </div>
      </Card>

      <Card className="col-span-2">
        <div className="px-5 py-5">
          <p className="text-xs font-medium mb-4" style={{ color: "var(--text-tertiary)" }}>
            Sentiment Breakdown
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Positive", value: breakdown.positive, icon: <Smile size={16} />, color: "var(--success)" },
              { label: "Neutral", value: breakdown.neutral, icon: <Meh size={16} />, color: "var(--text-tertiary)" },
              { label: "Negative", value: breakdown.negative, icon: <Frown size={16} />, color: "var(--danger)" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span style={{ color: s.color }}>{s.icon}</span>
                <div>
                  <p className="text-xl font-bold" style={{ color: s.color }}>
                    {s.value}%
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bar */}
          <div className="mt-4 h-2 rounded-full overflow-hidden flex" style={{ background: "var(--surface-3)" }}>
            <div style={{ width: `${breakdown.positive}%`, background: "var(--success)" }} />
            <div style={{ width: `${breakdown.neutral}%`, background: "var(--text-tertiary)" }} />
            <div style={{ width: `${breakdown.negative}%`, background: "var(--danger)" }} />
          </div>
        </div>
      </Card>
    </div>
  );
}

function TrendIcon({ trend }: { trend: "rising" | "stable" | "declining" }) {
  if (trend === "rising") return <TrendingUp size={13} className="text-red-400" />;
  if (trend === "declining") return <TrendingDown size={13} className="text-green-400" />;
  return <ArrowRight size={13} className="text-amber-400" />;
}

function TopComplaintsCard() {
  return (
    <Card>
      <CardHeader
        title="Top Complaints"
        subtitle="Aggregated from support & feedback channels"
        icon={<MessageCircle size={16} className="text-red-400" />}
      />
      <Divider />
      <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
        {topComplaints.map((complaint, i) => (
          <div
            key={complaint.id}
            className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
          >
            <span
              className="text-sm font-bold w-5 text-center flex-shrink-0"
              style={{ color: "var(--text-tertiary)" }}
            >
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {complaint.text}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    complaint.severity === "high"
                      ? "critical"
                      : complaint.severity === "medium"
                      ? "warning"
                      : "neutral"
                  }
                >
                  {complaint.severity}
                </Badge>
                <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  {complaint.category}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <TrendIcon trend={complaint.trend} />
              <div className="text-right">
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {complaint.count}
                </span>
                <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                  mentions
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MostRequestedCard() {
  return (
    <Card>
      <CardHeader
        title="Most Requested Features"
        subtitle="Sorted by votes + MRR influence"
        icon={<ArrowUp size={16} className="text-indigo-400" />}
      />
      <Divider />
      <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
        {requestedFeatures.map((req, i) => (
          <div
            key={req.id}
            className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
          >
            <span
              className="text-sm font-bold w-5 text-center flex-shrink-0"
              style={{ color: "var(--text-tertiary)" }}
            >
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {req.title}
                </span>
                <TrendIcon trend={req.trend} />
              </div>
              <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                {req.category}
              </span>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {req.votes}
                </span>
                <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                  votes
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-0.5">
                  <DollarSign size={11} className="text-green-400" />
                  <span className="text-sm font-semibold text-green-400">
                    {(req.mrr / 1000).toFixed(0)}k
                  </span>
                </div>
                <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                  MRR demand
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RecentFeedbackCard() {
  return (
    <Card className="col-span-2">
      <CardHeader
        title="Recent Customer Feedback"
        subtitle="Latest verbatim from support, reviews, and surveys"
        icon={<MessageCircle size={16} className="text-blue-400" />}
      />
      <Divider />
      <div className="grid grid-cols-2 gap-0">
        {sentimentData.recentFeedback.map((fb, i) => {
          const isLast = i === sentimentData.recentFeedback.length - 1;
          const isSecondLast = i === sentimentData.recentFeedback.length - 2;
          return (
            <div
              key={i}
              className="px-5 py-4 border-r hover:bg-white/[0.02] transition-colors"
              style={{
                borderColor: "var(--border-subtle)",
                borderBottomWidth: isLast || isSecondLast ? 0 : 1,
                borderRightWidth: i % 2 === 0 ? 1 : 0,
                borderBottomStyle: "solid",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    fb.sentiment === "positive"
                      ? "bg-green-500/15"
                      : fb.sentiment === "negative"
                      ? "bg-red-500/15"
                      : "bg-white/10"
                  }`}
                >
                  {fb.sentiment === "positive" ? (
                    <Smile size={12} className="text-green-400" />
                  ) : fb.sentiment === "negative" ? (
                    <Frown size={12} className="text-red-400" />
                  ) : (
                    <Meh size={12} className="text-amber-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                    &ldquo;{fb.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="neutral">{fb.source}</Badge>
                    <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                      {fb.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function CustomerVoicePage() {
  return (
    <div className="px-8 py-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Customer Voice
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
          What customers are saying and asking for
        </p>
      </div>

      <SentimentHeader />

      <div className="grid grid-cols-2 gap-5 mb-5">
        <TopComplaintsCard />
        <MostRequestedCard />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <RecentFeedbackCard />
      </div>
    </div>
  );
}
