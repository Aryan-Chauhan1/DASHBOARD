import {
  AlertTriangle,
  BarChart2,
  CheckCircle2,
  Flame,
  GitBranch,
  HeadphonesIcon,
  Info,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/Badge";
import { timelineEvents, type TimelineEvent } from "@/lib/data";
import { formatDistanceToNow, format } from "date-fns";

type EventType = TimelineEvent["type"];
type Severity = NonNullable<TimelineEvent["severity"]>;

const typeConfig: Record<
  EventType,
  { icon: React.ReactNode; label: string }
> = {
  alert: { icon: <Flame size={14} className="text-red-400" />, label: "Alert" },
  ticket: { icon: <HeadphonesIcon size={14} className="text-amber-400" />, label: "Support" },
  deployment: { icon: <GitBranch size={14} className="text-green-400" />, label: "Deploy" },
  metric: { icon: <BarChart2 size={14} className="text-blue-400" />, label: "Metric" },
  feature: { icon: <CheckCircle2 size={14} className="text-green-400" />, label: "Feature" },
  bug: { icon: <AlertTriangle size={14} className="text-red-400" />, label: "Bug" },
};

const severityConfig: Record<Severity, { badge: "critical" | "warning" | "info"; dot: string }> = {
  critical: { badge: "critical", dot: "bg-red-400" },
  warning: { badge: "warning", dot: "bg-amber-400" },
  info: { badge: "info", dot: "bg-blue-400" },
};

function EventCard({ event }: { event: TimelineEvent }) {
  const type = typeConfig[event.type];
  const severity = event.severity ? severityConfig[event.severity] : null;
  const ts = new Date(event.timestamp);

  return (
    <div className="flex gap-4 group">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 z-10 border"
          style={{
            background: "var(--surface-2)",
            borderColor:
              event.severity === "critical"
                ? "rgba(239,68,68,0.3)"
                : event.severity === "warning"
                ? "rgba(245,158,11,0.3)"
                : "var(--border)",
          }}
        >
          {type.icon}
        </div>
        <div className="w-px flex-1 mt-2" style={{ background: "var(--border-subtle)" }} />
      </div>

      {/* Content */}
      <div
        className="flex-1 pb-6 rounded-xl p-4 mb-0 border transition-colors hover:bg-white/[0.02]"
        style={{
          background: "var(--surface)",
          borderColor:
            event.severity === "critical"
              ? "rgba(239,68,68,0.2)"
              : "var(--border)",
          marginBottom: "0.5rem",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {severity && (
                <Badge variant={severity.badge} dot>
                  {event.severity}
                </Badge>
              )}
              <Badge variant="neutral">{type.label}</Badge>
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {event.title}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {event.description}
            </p>
            {event.actor && (
              <p className="text-xs mt-2" style={{ color: "var(--text-tertiary)" }}>
                by {event.actor}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              {formatDistanceToNow(ts, { addSuffix: true })}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
              {format(ts, "HH:mm")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DaySeparator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 ml-12">
      <div className="h-px flex-1" style={{ background: "var(--border)" }} />
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-md"
        style={{ background: "var(--surface-2)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
      >
        {label}
      </span>
      <div className="h-px flex-1" style={{ background: "var(--border)" }} />
    </div>
  );
}

function StatsBar() {
  const critical = timelineEvents.filter((e) => e.severity === "critical").length;
  const warnings = timelineEvents.filter((e) => e.severity === "warning").length;
  const info = timelineEvents.filter((e) => e.severity === "info").length;

  return (
    <div
      className="flex items-center gap-6 rounded-xl px-5 py-4 mb-6 border"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="text-sm font-semibold text-red-400">{critical}</span>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Critical</span>
      </div>
      <div className="h-4 w-px" style={{ background: "var(--border)" }} />
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="text-sm font-semibold text-amber-400">{warnings}</span>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Warnings</span>
      </div>
      <div className="h-4 w-px" style={{ background: "var(--border)" }} />
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400" />
        <span className="text-sm font-semibold text-blue-400">{info}</span>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Informational</span>
      </div>
      <div className="ml-auto">
        <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          {timelineEvents.length} events in last 24h
        </span>
      </div>
    </div>
  );
}

export default function ExecutiveFeedPage() {
  const sorted = [...timelineEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="px-8 py-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Executive Feed
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
          Chronological timeline of important events — last 24 hours
        </p>
      </div>

      <StatsBar />

      <div>
        <DaySeparator label="Today — June 15, 2026" />
        <div className="space-y-0">
          {sorted.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
