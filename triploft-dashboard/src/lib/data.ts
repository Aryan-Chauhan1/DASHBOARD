export type Priority = "critical" | "high" | "medium" | "low";
export type Status = "in_progress" | "blocked" | "ready_qa" | "released" | "open" | "escalated" | "resolved";
export type Sentiment = "positive" | "negative" | "neutral";

export interface Feature {
  id: string;
  title: string;
  description: string;
  shippedAt: string;
  impact: "high" | "medium" | "low";
  team: string;
}

export interface Bug {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  affectedUsers: number;
  reporter: string;
  createdAt: string;
  assignee?: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  customer: string;
  priority: Priority;
  status: Status;
  escalatedAt: string;
  mrr?: number;
  category: string;
}

export interface FeatureRequest {
  id: string;
  title: string;
  votes: number;
  submittedBy: string;
  createdAt: string;
  category: string;
  status: "new" | "under_review" | "planned";
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  status: "in_progress" | "blocked" | "ready_qa" | "released";
  priority: Priority;
  assignee: string;
  dueDate?: string;
  blockedReason?: string;
  team: string;
  labels: string[];
}

export interface Complaint {
  id: string;
  text: string;
  count: number;
  trend: "rising" | "stable" | "declining";
  category: string;
  severity: "high" | "medium" | "low";
}

export interface RequestedFeature {
  id: string;
  title: string;
  votes: number;
  mrr: number;
  category: string;
  trend: "rising" | "stable" | "declining";
}

export interface SentimentData {
  score: number;
  change: number;
  breakdown: { positive: number; neutral: number; negative: number };
  recentFeedback: { text: string; sentiment: Sentiment; source: string; date: string }[];
}

export interface TimelineEvent {
  id: string;
  type: "feature" | "bug" | "ticket" | "alert" | "metric" | "deployment";
  title: string;
  description: string;
  timestamp: string;
  severity?: "info" | "warning" | "critical";
  actor?: string;
  link?: string;
}

export interface AIInsight {
  id: string;
  type: "recommendation" | "risk" | "opportunity";
  title: string;
  description: string;
  priority: Priority;
  impact: "high" | "medium" | "low";
  effort?: "high" | "medium" | "low";
  relatedItems?: string[];
  confidence: number;
}

// --- MOCK DATA ---

export const featuresShipped: Feature[] = [
  {
    id: "f1",
    title: "Bulk CSV Export",
    description: "Users can now export up to 50k records as CSV directly from the dashboard",
    shippedAt: "2026-06-14T10:00:00Z",
    impact: "high",
    team: "Platform",
  },
  {
    id: "f2",
    title: "Smart Notifications",
    description: "AI-powered notification grouping reduces alert fatigue by ~60%",
    shippedAt: "2026-06-13T15:30:00Z",
    impact: "high",
    team: "Core",
  },
  {
    id: "f3",
    title: "Guest Invite Links",
    description: "Single-use invite links with configurable expiry and role scoping",
    shippedAt: "2026-06-12T09:00:00Z",
    impact: "medium",
    team: "Auth",
  },
  {
    id: "f4",
    title: "Webhook Retry Logic",
    description: "Exponential backoff with up to 5 retries for failed webhook deliveries",
    shippedAt: "2026-06-11T14:00:00Z",
    impact: "medium",
    team: "Integrations",
  },
];

export const openBugs: Bug[] = [
  {
    id: "b1",
    title: "SSO login loop on Safari 17+",
    priority: "critical",
    status: "in_progress",
    affectedUsers: 847,
    reporter: "Support",
    createdAt: "2026-06-14T08:00:00Z",
    assignee: "Priya K.",
  },
  {
    id: "b2",
    title: "CSV export truncates rows > 10k",
    priority: "high",
    status: "open",
    affectedUsers: 312,
    reporter: "Aryan C.",
    createdAt: "2026-06-14T11:30:00Z",
    assignee: "Dev T.",
  },
  {
    id: "b3",
    title: "Dashboard cards flicker on resize",
    priority: "medium",
    status: "open",
    affectedUsers: 2100,
    reporter: "QA",
    createdAt: "2026-06-13T16:00:00Z",
  },
  {
    id: "b4",
    title: "Webhook payload missing metadata field",
    priority: "high",
    status: "in_progress",
    affectedUsers: 54,
    reporter: "Customer",
    createdAt: "2026-06-12T10:00:00Z",
    assignee: "Sam L.",
  },
  {
    id: "b5",
    title: "Email notifications sent twice on trigger",
    priority: "medium",
    status: "open",
    affectedUsers: 180,
    reporter: "Support",
    createdAt: "2026-06-11T09:00:00Z",
  },
];

export const escalatedTickets: SupportTicket[] = [
  {
    id: "t1",
    title: "Unable to export data — blocking quarterly close",
    customer: "Meridian Corp",
    priority: "critical",
    status: "escalated",
    escalatedAt: "2026-06-14T07:30:00Z",
    mrr: 12400,
    category: "Data Export",
  },
  {
    id: "t2",
    title: "SSO completely broken for enterprise plan",
    customer: "Vertex AI Partners",
    priority: "critical",
    status: "escalated",
    escalatedAt: "2026-06-14T09:00:00Z",
    mrr: 8900,
    category: "Authentication",
  },
  {
    id: "t3",
    title: "API rate limits hitting unexpectedly",
    customer: "Nomad Systems",
    priority: "high",
    status: "escalated",
    escalatedAt: "2026-06-13T14:00:00Z",
    mrr: 3200,
    category: "API",
  },
  {
    id: "t4",
    title: "Billing invoice discrepancy — seat count wrong",
    customer: "TechBridge Inc",
    priority: "high",
    status: "escalated",
    escalatedAt: "2026-06-13T11:00:00Z",
    mrr: 5600,
    category: "Billing",
  },
];

export const featureRequests: FeatureRequest[] = [
  {
    id: "fr1",
    title: "Zapier / Make integration",
    votes: 342,
    submittedBy: "Multiple customers",
    createdAt: "2026-05-20T00:00:00Z",
    category: "Integrations",
    status: "planned",
  },
  {
    id: "fr2",
    title: "Role-based field visibility",
    votes: 218,
    submittedBy: "Enterprise segment",
    createdAt: "2026-06-01T00:00:00Z",
    category: "Permissions",
    status: "under_review",
  },
  {
    id: "fr3",
    title: "Custom dashboard widgets",
    votes: 187,
    submittedBy: "Power users",
    createdAt: "2026-06-05T00:00:00Z",
    category: "Customization",
    status: "new",
  },
  {
    id: "fr4",
    title: "Bulk user provisioning via SCIM",
    votes: 156,
    submittedBy: "IT admins",
    createdAt: "2026-05-28T00:00:00Z",
    category: "Auth",
    status: "under_review",
  },
];

export const productItems: ProductItem[] = [
  {
    id: "p1",
    title: "SCIM user provisioning",
    description: "Auto-provision and deprovision users via SCIM 2.0 protocol",
    status: "in_progress",
    priority: "high",
    assignee: "Priya K.",
    dueDate: "2026-06-22",
    team: "Auth",
    labels: ["enterprise", "security"],
  },
  {
    id: "p2",
    title: "Advanced filtering engine",
    description: "Multi-condition filter builder with saved filter sets",
    status: "in_progress",
    priority: "high",
    assignee: "Dev T.",
    dueDate: "2026-06-20",
    team: "Core",
    labels: ["ux", "power-user"],
  },
  {
    id: "p3",
    title: "Zapier integration",
    description: "Official Zapier app with 15 triggers and 10 actions",
    status: "blocked",
    priority: "critical",
    assignee: "Sam L.",
    blockedReason: "Waiting on Zapier partner review — submitted 10 days ago",
    team: "Integrations",
    labels: ["integration", "partner"],
  },
  {
    id: "p4",
    title: "Audit log export",
    description: "Export full audit trail as CSV or stream to SIEM",
    status: "blocked",
    priority: "high",
    assignee: "Priya K.",
    blockedReason: "Legal review pending for data retention policy wording",
    team: "Compliance",
    labels: ["compliance", "enterprise"],
  },
  {
    id: "p5",
    title: "Onboarding tour v2",
    description: "Interactive guided setup with contextual tooltips",
    status: "ready_qa",
    priority: "medium",
    assignee: "Nadia R.",
    team: "Growth",
    labels: ["onboarding", "ux"],
  },
  {
    id: "p6",
    title: "Mobile push notifications",
    description: "Native iOS and Android push via FCM",
    status: "ready_qa",
    priority: "medium",
    assignee: "James W.",
    team: "Mobile",
    labels: ["mobile"],
  },
  {
    id: "p7",
    title: "Bulk CSV Export",
    description: "Export up to 50k records as CSV",
    status: "released",
    priority: "high",
    assignee: "Dev T.",
    team: "Platform",
    labels: ["data"],
  },
  {
    id: "p8",
    title: "Smart Notifications",
    description: "AI-powered notification grouping",
    status: "released",
    priority: "high",
    assignee: "Sam L.",
    team: "Core",
    labels: ["ai", "ux"],
  },
];

export const topComplaints: Complaint[] = [
  {
    id: "c1",
    text: "SSO login is broken or unreliable",
    count: 47,
    trend: "rising",
    category: "Authentication",
    severity: "high",
  },
  {
    id: "c2",
    text: "Exports are too slow or fail on large datasets",
    count: 38,
    trend: "rising",
    category: "Data Export",
    severity: "high",
  },
  {
    id: "c3",
    text: "No native Zapier or Make integration",
    count: 31,
    trend: "stable",
    category: "Integrations",
    severity: "medium",
  },
  {
    id: "c4",
    text: "Dashboard is hard to customize",
    count: 24,
    trend: "stable",
    category: "UX",
    severity: "medium",
  },
  {
    id: "c5",
    text: "API rate limits are too restrictive",
    count: 19,
    trend: "declining",
    category: "API",
    severity: "medium",
  },
  {
    id: "c6",
    text: "Email notifications arrive in batches with delay",
    count: 15,
    trend: "stable",
    category: "Notifications",
    severity: "low",
  },
];

export const requestedFeatures: RequestedFeature[] = [
  { id: "rf1", title: "Zapier / Make integration", votes: 342, mrr: 48000, category: "Integrations", trend: "rising" },
  { id: "rf2", title: "Role-based field visibility", votes: 218, mrr: 31000, category: "Permissions", trend: "stable" },
  { id: "rf3", title: "Custom dashboard widgets", votes: 187, mrr: 22000, category: "Customization", trend: "rising" },
  { id: "rf4", title: "SCIM provisioning", votes: 156, mrr: 41000, category: "Auth", trend: "stable" },
  { id: "rf5", title: "Audit log SIEM streaming", votes: 134, mrr: 38000, category: "Compliance", trend: "rising" },
  { id: "rf6", title: "Mobile app", votes: 98, mrr: 14000, category: "Mobile", trend: "declining" },
];

export const sentimentData: SentimentData = {
  score: 68,
  change: -4,
  breakdown: { positive: 52, neutral: 16, negative: 32 },
  recentFeedback: [
    { text: "The new export feature is a game changer for our team.", sentiment: "positive", source: "G2", date: "2026-06-14" },
    { text: "SSO has been broken for 3 days. Unacceptable for enterprise.", sentiment: "negative", source: "Support", date: "2026-06-14" },
    { text: "Love the product but the Zapier gap is blocking our workflow.", sentiment: "negative", source: "Intercom", date: "2026-06-13" },
    { text: "Onboarding was smooth. Up and running in under an hour.", sentiment: "positive", source: "G2", date: "2026-06-13" },
    { text: "Dashboard is solid. Would love more customization options.", sentiment: "neutral", source: "Survey", date: "2026-06-12" },
    { text: "API is clean and well-documented. Minor rate limit issues.", sentiment: "positive", source: "Twitter", date: "2026-06-12" },
  ],
};

export const timelineEvents: TimelineEvent[] = [
  {
    id: "e1",
    type: "alert",
    title: "SSO outage detected — 847 users affected",
    description: "Safari 17+ users unable to complete SAML flow. Eng team paged.",
    timestamp: "2026-06-14T08:00:00Z",
    severity: "critical",
    actor: "Alerting System",
  },
  {
    id: "e2",
    type: "ticket",
    title: "Meridian Corp escalated — blocking quarterly close",
    description: "$12.4k MRR customer. CSM reached out. Export bug root cause.",
    timestamp: "2026-06-14T07:30:00Z",
    severity: "critical",
    actor: "Jasmine (CSM)",
  },
  {
    id: "e3",
    type: "deployment",
    title: "Bulk CSV Export shipped to production",
    description: "v2.14.0 deployed. Rollback plan ready. Monitoring active.",
    timestamp: "2026-06-14T06:00:00Z",
    severity: "info",
    actor: "Dev T.",
  },
  {
    id: "e4",
    type: "metric",
    title: "MRR crossed $180k",
    description: "New milestone. 3 enterprise deals closed this week.",
    timestamp: "2026-06-13T18:00:00Z",
    severity: "info",
    actor: "Revenue Tracking",
  },
  {
    id: "e5",
    type: "ticket",
    title: "Vertex AI Partners — SSO completely broken",
    description: "$8.9k MRR. Linked to b1. High churn risk if unresolved by EOD.",
    timestamp: "2026-06-14T09:00:00Z",
    severity: "critical",
    actor: "Support Team",
  },
  {
    id: "e6",
    type: "feature",
    title: "Smart Notifications shipped",
    description: "AI grouping live for all users. 60% reduction in alert volume in staging.",
    timestamp: "2026-06-13T15:30:00Z",
    severity: "info",
    actor: "Sam L.",
  },
  {
    id: "e7",
    type: "alert",
    title: "Error rate spike — /api/export endpoint",
    description: "P99 latency 12s, error rate 8.4%. Correlated with CSV bug.",
    timestamp: "2026-06-14T12:00:00Z",
    severity: "warning",
    actor: "Monitoring",
  },
  {
    id: "e8",
    type: "metric",
    title: "NPS score dropped 6 points",
    description: "From 52 to 46 this week. SSO complaints primary driver.",
    timestamp: "2026-06-14T10:00:00Z",
    severity: "warning",
    actor: "Analytics",
  },
];

export const aiInsights: AIInsight[] = [
  {
    id: "ai1",
    type: "risk",
    title: "SSO bug threatens 2 enterprise accounts ($21.3k MRR)",
    description:
      "Meridian Corp and Vertex AI Partners are both affected by the Safari SSO loop. Combined MRR at risk: $21.3k. Both accounts have active renewal conversations. If unresolved within 24h, churn probability estimated at 60%.",
    priority: "critical",
    impact: "high",
    relatedItems: ["b1", "t1", "t2"],
    confidence: 91,
  },
  {
    id: "ai2",
    type: "opportunity",
    title: "Zapier integration could unlock $48k in pent-up demand",
    description:
      "342 votes from customers representing ~$48k MRR are blocked on Zapier. Shipping this single integration would likely accelerate expansion for 3 enterprise accounts and reduce top complaint #3.",
    priority: "high",
    impact: "high",
    effort: "medium",
    relatedItems: ["p3", "c3", "rf1"],
    confidence: 84,
  },
  {
    id: "ai3",
    type: "recommendation",
    title: "Unblock Zapier partner review with direct outreach",
    description:
      "Zapier partner review has stalled for 10 days. Recommend escalating via LinkedIn to Zapier BD team or using existing partner contacts. This is a process block, not an engineering one.",
    priority: "high",
    impact: "high",
    effort: "low",
    relatedItems: ["p3"],
    confidence: 78,
  },
  {
    id: "ai4",
    type: "risk",
    title: "Export failures compounding with SSO issues — NPS at risk",
    description:
      "Two P1 issues are active simultaneously. Historical data shows NPS drops ~8 points per concurrent P1 that exceeds 48h. Current NPS is 46 — another drop risks falling below 40, the enterprise renewal risk threshold.",
    priority: "high",
    impact: "high",
    relatedItems: ["b1", "b2", "e8"],
    confidence: 76,
  },
  {
    id: "ai5",
    type: "opportunity",
    title: "SCIM + Role-based visibility = enterprise tier unlock",
    description:
      "SCIM provisioning (in progress) + role-based field visibility (most requested, $31k MRR demand) together unlock a credible Enterprise tier pitch. Bundling them in a single launch could justify a 40% price increase for new enterprise customers.",
    priority: "medium",
    impact: "high",
    effort: "medium",
    relatedItems: ["p1", "fr2", "rf2"],
    confidence: 72,
  },
  {
    id: "ai6",
    type: "recommendation",
    title: "Run a targeted win-back on SSO-affected accounts this week",
    description:
      "Once b1 is resolved, proactively reach out to all affected enterprise accounts with a personal apology, SLA credit, and a roadmap preview. Accounts that receive proactive outreach after incidents churn 3x less.",
    priority: "medium",
    impact: "medium",
    effort: "low",
    relatedItems: ["b1", "t1", "t2"],
    confidence: 88,
  },
];
