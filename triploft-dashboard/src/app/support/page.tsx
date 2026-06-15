import { AlertTriangle, Clock, Filter, HeadphonesIcon, MessageSquare, TrendingUp } from "lucide-react";
import { Card, CardHeader, Divider, StatCard } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { escalatedTickets } from "@/lib/data";
import { DonutChart } from "@/components/Charts";

function SupportStats() {
  const open = escalatedTickets.length;
  const escalations = escalatedTickets.filter((t) => t.status === "escalated").length;
  const slaRisk = 0;
  const featureCount = 0;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Open tickets"
        value={open}
        icon={<MessageSquare size={16} />}
        accent="var(--text-primary)"
        sublabel="From Intercom"
      />
      <StatCard
        label="Escalations"
        value={escalations}
        icon={<AlertTriangle size={16} />}
        accent="var(--danger)"
        sublabel="Requires immediate action"
      />
      <StatCard
        label="SLA risks"
        value={slaRisk}
        icon={<Clock size={16} />}
        accent="var(--warning)"
        sublabel="Approaching deadline"
      />
      <StatCard
        label="Feature requests"
        value={featureCount}
        icon={<TrendingUp size={16} />}
        accent="var(--accent)"
        sublabel="Via support tickets"
      />
    </div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  billing: "#ef4444",
  onboarding: "#6366f1",
  bug: "#f59e0b",
  feature: "#22c55e",
  other: "#3b82f6",
};

function TicketsByCategoryCard() {
  const categories = escalatedTickets.reduce<Record<string, number>>((acc, t) => {
    const cat = t.category.toLowerCase();
    acc[cat] = (acc[cat] ?? 0) + 1;
    return acc;
  }, {});

  const donutData = Object.entries(categories).map(([cat, count]) => ({
    label: cat,
    value: Math.round((count / escalatedTickets.length) * 100),
    color: CATEGORY_COLORS[cat] ?? "#6366f1",
  }));

  return (
    <Card>
      <CardHeader
        title="Tickets by category"
        subtitle="This week, by area"
        icon={<Filter size={16} className="text-blue-400" />}
      />
      <Divider />
      <div className="px-5 py-4">
        <DonutChart data={donutData} emptyLabel="Awaiting first customer tickets" />
        {donutData.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            {donutData.map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-xs capitalize" style={{ color: "var(--text-secondary)" }}>
                  {d.label} · {d.value}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function ActiveQueueCard() {
  const sorted = [...escalatedTickets].sort((a, b) => {
    const order = { escalated: 0, open: 1, in_progress: 2, resolved: 3 };
    return (order[a.status as keyof typeof order] ?? 9) - (order[b.status as keyof typeof order] ?? 9);
  });

  return (
    <Card>
      <CardHeader
        title="Active queue"
        subtitle="Sorted by urgency"
        icon={<HeadphonesIcon size={16} className="text-amber-400" />}
      />
      <Divider />
      {sorted.length === 0 ? (
        <div className="px-5 py-10 flex flex-col items-center justify-center text-center">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "rgba(34,197,94,0.1)" }}
          >
            <MessageSquare size={18} className="text-green-400" />
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
            Queue is clear
          </p>
          <p className="text-xs mt-1 max-w-[200px]" style={{ color: "var(--text-secondary)" }}>
            Intercom workspace is live. First real customer tickets will appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
          {sorted.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
            >
              <span
                className="text-[11px] font-mono flex-shrink-0"
                style={{ color: "var(--text-tertiary)" }}
              >
                {ticket.id.toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                  {ticket.title}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant="neutral">{ticket.category}</Badge>
                {ticket.status === "escalated" && (
                  <Badge variant="critical">Esc</Badge>
                )}
                <Badge variant="warning">SLA</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default function SupportPage() {
  return (
    <div className="px-8 py-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Support
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
          {escalatedTickets.length === 0
            ? "Intercom workspace live · awaiting first customer tickets"
            : `${escalatedTickets.length} open · synced from Intercom`}
        </p>
      </div>

      <SupportStats />

      <div className="grid grid-cols-2 gap-5">
        <TicketsByCategoryCard />
        <ActiveQueueCard />
      </div>
    </div>
  );
}
