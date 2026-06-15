import { AlertTriangle, ArrowUp, Filter } from "lucide-react";
import { Card, CardHeader, Divider } from "@/components/Card";
import { requestedFeatures, topComplaints, sentimentData, mentionedAreas } from "@/lib/data";
import { VerticalBarChart, DonutChart } from "@/components/Charts";

const PAIN_COLORS = ["#6366f1", "#ef4444", "#22c55e", "#f59e0b", "#3b82f6"];

function HorizontalBarList({
  items,
  getColor,
}: {
  items: { id: string; label: string; count: number }[];
  getColor: (i: number) => string;
}) {
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <div className="space-y-3.5 px-5 py-4">
      {items.map((item, i) => (
        <div key={item.id}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm" style={{ color: "var(--text-primary)" }}>
              {item.label}
            </span>
            <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--text-primary)" }}>
              {item.count}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${(item.count / max) * 100}%`, background: getColor(i) }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TopRequestedCard() {
  return (
    <Card>
      <CardHeader
        title="Top requested features"
        subtitle="By mention volume"
        icon={<ArrowUp size={16} className="text-indigo-400" />}
      />
      <Divider />
      <HorizontalBarList
        items={requestedFeatures.map((r) => ({ id: r.id, label: r.title, count: r.votes }))}
        getColor={() => "#6366f1"}
      />
    </Card>
  );
}

function TopPainPointsCard() {
  return (
    <Card>
      <CardHeader
        title="Top pain points"
        subtitle="Most-mentioned problem areas"
        icon={<AlertTriangle size={16} className="text-red-400" />}
      />
      <Divider />
      <HorizontalBarList
        items={topComplaints.map((c) => ({ id: c.id, label: c.text, count: c.count }))}
        getColor={(i) => PAIN_COLORS[i % PAIN_COLORS.length]}
      />
    </Card>
  );
}

function SentimentCard() {
  const { breakdown } = sentimentData;
  const donutData = [
    { label: "Positive", value: breakdown.positive, color: "#22c55e" },
    { label: "Neutral", value: breakdown.neutral, color: "#555570" },
    { label: "Negative", value: breakdown.negative, color: "#ef4444" },
  ];

  return (
    <Card>
      <CardHeader title="Customer sentiment" subtitle="Across all channels" />
      <Divider />
      <div className="px-5 py-4 flex items-center gap-6">
        <div className="flex-shrink-0" style={{ width: 160 }}>
          <DonutChart data={donutData} emptyLabel="Awaiting first customer conversations" />
        </div>
        <div className="space-y-2.5 flex-1">
          {donutData.map((d) => (
            <div key={d.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {d.label}
                </span>
              </div>
              <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--text-primary)" }}>
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function MostMentionedCard() {
  return (
    <Card>
      <CardHeader
        title="Most mentioned areas"
        subtitle="Where conversation concentrates"
        icon={<Filter size={16} className="text-blue-400" />}
      />
      <Divider />
      <div className="px-5 pt-2 pb-4">
        <VerticalBarChart data={mentionedAreas.map((a) => ({ label: a.area, count: a.count, color: a.color }))} />
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
          Tickets, feedback & requests, aggregated
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <TopRequestedCard />
        <TopPainPointsCard />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <SentimentCard />
        <MostMentionedCard />
      </div>
    </div>
  );
}
