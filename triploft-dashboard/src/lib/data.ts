// Live data synced from Linear + Intercom — June 15, 2026
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
  linearId?: string;
  module: string;
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
  source: string;
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
  linearId?: string;
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

// ─── LINEAR SYNC ──────────────────────────────────────────────────────────────
// Source: Linear workspace — TripLoft team (100 issues) + MAGgie team (50 issues)
// Last synced: 2026-06-15
// State mapping: In Progress/In Review → in_progress | Staging → ready_qa | Done → released

export const featuresShipped: Feature[] = [
  {
    id: "TL-2648",
    title: "Activity Log for RBAC",
    description: "Full activity log implementation for role-based access control — tracks all permission changes and admin actions",
    shippedAt: "2026-06-12T10:00:00Z",
    impact: "high",
    team: "TripLoft",
  },
  {
    id: "TL-2647",
    title: "Agent Card Redesign — new screens",
    description: "Redesigned agent card screens with Himesh — updated layout, improved visual hierarchy and mobile responsiveness",
    shippedAt: "2026-06-11T15:00:00Z",
    impact: "medium",
    team: "TripLoft",
  },
  {
    id: "TL-1375",
    title: "ALG (Auto-Logistics Generator)",
    description: "Core ALG feature shipped — automates trip logistics generation from proposal data",
    shippedAt: "2026-06-08T09:00:00Z",
    impact: "high",
    team: "TripLoft",
  },
];

export const openBugs: Bug[] = [
  {
    id: "b1",
    title: "Task templates bug",
    priority: "high",
    status: "open",
    affectedUsers: 0,
    reporter: "Aryan",
    createdAt: "2026-06-14T00:00:00Z",
    assignee: "Aryan",
    linearId: "TL-2739",
    module: "Tasks",
  },
  {
    id: "b2",
    title: "Payment Schedule shows $0 for selected room during Authorize Payment",
    priority: "high",
    status: "open",
    affectedUsers: 0,
    reporter: "Emmanuel",
    createdAt: "2026-06-13T00:00:00Z",
    assignee: "Emmanuel",
    linearId: "TL-2740",
    module: "Payments",
  },
  {
    id: "b3",
    title: "Forms Feedback — multiple UI issues",
    priority: "medium",
    status: "in_progress",
    affectedUsers: 0,
    reporter: "QA",
    createdAt: "2026-06-10T00:00:00Z",
    assignee: "Shivam",
    linearId: "TL-2721",
    module: "Forms",
  },
  {
    id: "b4",
    title: "Automation: client_authorizes_payment workflow trigger not emitting",
    priority: "medium",
    status: "in_progress",
    affectedUsers: 0,
    reporter: "Israel",
    createdAt: "2026-06-09T00:00:00Z",
    assignee: "Israel Ebenezer",
    linearId: "TL-2723",
    module: "Automations",
  },
  {
    id: "b5",
    title: "MMS dates rendering in wrong timezone (ET) across 8 surfaces",
    priority: "medium",
    status: "in_progress",
    affectedUsers: 0,
    reporter: "QA",
    createdAt: "2026-06-08T00:00:00Z",
    assignee: "Israel Ebenezer",
    linearId: "MAG-188–194",
    module: "MMS/Email",
  },
  {
    id: "b6",
    title: "Client portal: \"Select Preference\" button disabled when it shouldn't be",
    priority: "high",
    status: "in_progress",
    affectedUsers: 0,
    reporter: "QA",
    createdAt: "2026-06-07T00:00:00Z",
    assignee: "Shivam",
    linearId: "TL-2658",
    module: "Client Portal",
  },
  {
    id: "b7",
    title: "Campaign analytics: totalClicks shown instead of uniqueClicks",
    priority: "medium",
    status: "in_progress",
    affectedUsers: 0,
    reporter: "QA",
    createdAt: "2026-06-06T00:00:00Z",
    assignee: "Israel Ebenezer",
    linearId: "MAG-199",
    module: "MMS/Email",
  },
];

// ─── INTERCOM SYNC ────────────────────────────────────────────────────────────
// Intercom workspace is freshly configured (set up 2026-06-13).
// Current conversations (4) are Intercom-generated onboarding demos:
//   - "Install Messenger channel" demo
//   - "Set up email" demo
// No real customer support tickets exist yet.
// Assigned to: Hardik Thakkar (hardik@triploft.ai)

export const escalatedTickets: SupportTicket[] = [];

export const featureRequests: FeatureRequest[] = [
  {
    id: "fr1",
    title: "Booking Import — packaged pricing for imported supplier bookings",
    votes: 3,
    submittedBy: "Internal",
    createdAt: "2026-06-10T00:00:00Z",
    category: "Bookings",
    status: "planned",
  },
  {
    id: "fr2",
    title: "Implement Itemized Pricing in Packages",
    votes: 2,
    submittedBy: "Internal",
    createdAt: "2026-06-10T00:00:00Z",
    category: "Pricing",
    status: "planned",
  },
  {
    id: "fr3",
    title: "Auto-assign trip travelers to newly added proposal components",
    votes: 2,
    submittedBy: "Internal",
    createdAt: "2026-06-11T00:00:00Z",
    category: "Proposals",
    status: "under_review",
  },
  {
    id: "fr4",
    title: "Agent receives payment-authorization confirmation email",
    votes: 2,
    submittedBy: "Internal",
    createdAt: "2026-06-11T00:00:00Z",
    category: "Automations",
    status: "under_review",
  },
];

export const productItems: ProductItem[] = [
  // ── IN PROGRESS (Linear: "In Progress") ─────────────────────
  {
    id: "p1",
    title: "Operations Dashboard",
    description: "Internal ops dashboard for founders and PMs — overview, product board, customer voice, exec feed, AI insights",
    status: "in_progress",
    priority: "medium",
    assignee: "Aryan",
    team: "TripLoft",
    labels: ["internal"],
    linearId: "TL-2746",
  },
  {
    id: "p2",
    title: "Improve Global Search — Attio-style preview",
    description: "Contextual preview panel on search results, instant filter-as-you-type, keyboard navigation",
    status: "in_progress",
    priority: "medium",
    assignee: "Aryan",
    team: "TripLoft",
    labels: ["ux"],
    linearId: "TL-2732",
  },
  {
    id: "p3",
    title: "Subtrip \"optional add-on\" flow",
    description: "New UX flow allowing clients to select optional subtrip add-ons from the client portal",
    status: "in_progress",
    priority: "medium",
    assignee: "Himesh",
    team: "TripLoft",
    labels: ["design", "client-portal"],
    linearId: "TL-2742",
  },
  {
    id: "p4",
    title: "GROUP — Manage Inventory User Journey",
    description: "Full design for group trip inventory management — room allocation, availability, overrides",
    status: "in_progress",
    priority: "medium",
    assignee: "Himesh",
    team: "TripLoft",
    labels: ["design", "groups"],
    linearId: "TL-2741",
  },
  {
    id: "p5",
    title: "Automation: Client authorize payment",
    description: "Implement the client-facing authorize payment step in the automation workflow engine",
    status: "in_progress",
    priority: "medium",
    assignee: "Israel Ebenezer",
    team: "TripLoft",
    labels: ["automations", "payments"],
    linearId: "TL-2682",
  },
  {
    id: "p6",
    title: "Onboarding screen changes",
    description: "Updated onboarding flow per latest Figma designs — revised step order, new illustrations",
    status: "in_progress",
    priority: "medium",
    assignee: "Nitish",
    team: "TripLoft",
    labels: ["onboarding"],
    linearId: "TL-2716",
  },
  // ── BLOCKED (Linear: high-priority Todo/Backlog awaiting action) ─
  {
    id: "p7",
    title: "[Production] Staging → Production readiness checklist",
    description: "List and resolve all blockers before promoting staging to production — critical path item",
    status: "blocked",
    priority: "high",
    assignee: "Praveen",
    blockedReason: "Needs full team sign-off — proposal bugs (TL-2655, TL-2656) and KPI mismatch (TL-2714) must be resolved first",
    team: "TripLoft",
    labels: ["production", "devops"],
    linearId: "TL-2720",
  },
  {
    id: "p8",
    title: "Proposal bugs batch — 15/05",
    description: "Batch of proposal editor bugs reported on 15 May: layout, button ordering, date edge cases",
    status: "blocked",
    priority: "medium",
    assignee: "Shivam",
    blockedReason: "Deprioritised to clear staging queue — 30 items ahead in staging awaiting QA sign-off",
    team: "TripLoft",
    labels: ["proposals", "bug"],
    linearId: "TL-2655",
  },
  // ── READY FOR QA (Linear: "Staging") ────────────────────────
  {
    id: "p9",
    title: "Email Template Feedback",
    description: "Email template editor improvements based on user feedback — font controls, padding, preview fidelity",
    status: "ready_qa",
    priority: "medium",
    assignee: "Shivam",
    team: "MAGgie",
    labels: ["email", "mms"],
    linearId: "TL-2738",
  },
  {
    id: "p10",
    title: "Forms Feedback — UI fixes",
    description: "Multiple form UI issues addressed: validation messages, field ordering, mobile scroll",
    status: "ready_qa",
    priority: "medium",
    assignee: "Shivam",
    team: "TripLoft",
    labels: ["forms", "bug"],
    linearId: "TL-2721",
  },
  {
    id: "p11",
    title: "Trip Library Feedback",
    description: "Trip library improvements — search, sort, thumbnail preview, archive UX",
    status: "ready_qa",
    priority: "medium",
    assignee: "Shivam",
    team: "TripLoft",
    labels: ["trips"],
    linearId: "TL-2737",
  },
  {
    id: "p12",
    title: "Client view — proper route redirects after login",
    description: "Fix redirect logic so clients land on correct page after login rather than dashboard root",
    status: "ready_qa",
    priority: "medium",
    assignee: "Shivam",
    team: "TripLoft",
    labels: ["client-portal", "auth"],
    linearId: "TL-2717",
  },
  {
    id: "p13",
    title: "Invoice Feedback — 09/06",
    description: "Invoice UI fixes: scrolling issue, line-item alignment, PDF export formatting",
    status: "ready_qa",
    priority: "high",
    assignee: "Shivam",
    team: "TripLoft",
    labels: ["invoicing", "bug"],
    linearId: "TL-2708",
  },
  {
    id: "p14",
    title: "Agency Logo in emails (MAGgie)",
    description: "Agency branding logo now renders correctly in MMS email campaigns",
    status: "ready_qa",
    priority: "medium",
    assignee: "Shivam",
    team: "MAGgie",
    labels: ["email", "branding"],
    linearId: "MAG-156",
  },
  {
    id: "p15",
    title: "Optimize Stripo for fast loading",
    description: "Reduce Stripo email builder load time — lazy load, CDN, bundle size reduction",
    status: "ready_qa",
    priority: "medium",
    assignee: "Israel Ebenezer",
    team: "MAGgie",
    labels: ["performance", "email"],
    linearId: "MAG-167",
  },
  // ── RELEASED (Linear: "Done") ────────────────────────────────
  {
    id: "p16",
    title: "Activity Log for RBAC",
    description: "Admin activity log tracking all RBAC permission changes — searchable, exportable",
    status: "released",
    priority: "high",
    assignee: "Richa",
    team: "TripLoft",
    labels: ["security", "rbac"],
    linearId: "TL-2648",
  },
  {
    id: "p17",
    title: "Agent Card Redesign — screens",
    description: "New agent card screens designed with Himesh — shipped to production",
    status: "released",
    priority: "medium",
    assignee: "Richa",
    team: "TripLoft",
    labels: ["design"],
    linearId: "TL-2647",
  },
];

// ─── BUG MODULE UTILITIES ────────────────────────────────────────────────────

// Color palette for modules (auto-assigned by key; unknown modules get accent color)
const MODULE_COLORS: Record<string, string> = {
  Payments: "#ef4444",
  "MMS/Email": "#f59e0b",
  Forms: "#6366f1",
  "Client Portal": "#3b82f6",
  Tasks: "#22c55e",
  Automations: "#8b5cf6",
};

export function moduleSlug(module: string): string {
  return module.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getBugsByModule(
  bugs: Bug[]
): { module: string; count: number; color: string }[] {
  const counts = bugs.reduce<Record<string, number>>((acc, b) => {
    acc[b.module] = (acc[b.module] ?? 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .map(([module, count]) => ({
      module,
      count,
      color: MODULE_COLORS[module] ?? "#6366f1",
    }))
    .sort((a, b) => b.count - a.count);
}

// ─── EXECUTIVE FEED ──────────────────────────────────────────────────────────
// Events derived from Linear issue updates + Intercom setup

export const timelineEvents: TimelineEvent[] = [
  {
    id: "e1",
    type: "deployment",
    title: "Activity Log for RBAC shipped (TL-2648)",
    description: "Full admin audit trail for RBAC permission changes is live. Searchable and exportable.",
    timestamp: "2026-06-12T10:00:00Z",
    severity: "info",
    actor: "Richa",
  },
  {
    id: "e2",
    type: "alert",
    title: "Task templates bug discovered (TL-2739)",
    description: "Aryan flagged a bug in task templates — being triaged. Assigned to self.",
    timestamp: "2026-06-14T09:00:00Z",
    severity: "warning",
    actor: "Aryan",
  },
  {
    id: "e3",
    type: "alert",
    title: "Payment Schedule shows $0 bug (TL-2740)",
    description: "P2 bug: Payment schedule shows $0 for selected room during the Authorize Payment flow. Emmanuel investigating.",
    timestamp: "2026-06-13T11:00:00Z",
    severity: "warning",
    actor: "Emmanuel",
  },
  {
    id: "e4",
    type: "metric",
    title: "Intercom workspace set up",
    description: "Intercom configured with Hardik as admin. Messenger and Email channels being installed. First real customer tickets expected soon.",
    timestamp: "2026-06-13T14:00:00Z",
    severity: "info",
    actor: "Hardik Thakkar",
  },
  {
    id: "e5",
    type: "feature",
    title: "30 items moved to Staging (Ready for QA)",
    description: "Large batch of TripLoft + MAGgie issues reached Staging state — biggest QA load to date. Shivam and Israel primary owners.",
    timestamp: "2026-06-12T16:00:00Z",
    severity: "warning",
    actor: "Shivam / Israel",
  },
  {
    id: "e6",
    type: "alert",
    title: "MMS timezone bug cluster identified (MAG-188–199)",
    description: "8+ MAGgie issues share root cause: MMS dates not rendering in ET timezone. Israel consolidating fix into single pass.",
    timestamp: "2026-06-11T10:00:00Z",
    severity: "warning",
    actor: "Israel Ebenezer",
  },
  {
    id: "e7",
    type: "feature",
    title: "KPI mismatch bug in review (TL-2714)",
    description: "Overall KPI numbers and per-team numbers are not corresponding — Israel has fix in review.",
    timestamp: "2026-06-10T09:00:00Z",
    severity: "info",
    actor: "Israel Ebenezer",
  },
  {
    id: "e8",
    type: "deployment",
    title: "ALG shipped (TL-1375)",
    description: "Auto-Logistics Generator feature is live. Automates trip logistics from proposal data.",
    timestamp: "2026-06-08T09:00:00Z",
    severity: "info",
    actor: "Shivam",
  },
];

// ─── AI INSIGHTS ─────────────────────────────────────────────────────────────
// Generated from real Linear signals — 150 issues, 2 teams

export const aiInsights: AIInsight[] = [
  {
    id: "ai1",
    type: "risk",
    title: "30-item staging queue is a production bottleneck",
    description:
      "TripLoft has 30 issues in Staging and 15 In Review simultaneously — a combined 45 items waiting for QA sign-off before production can be reached. At the current review velocity, production readiness (TL-2720) is at risk of slipping. Shivam owns 40 of 150 Linear issues and is the primary staging bottleneck.",
    priority: "high",
    impact: "high",
    relatedItems: ["TL-2720", "TL-2738", "TL-2721", "TL-2737"],
    confidence: 88,
  },
  {
    id: "ai2",
    type: "risk",
    title: "Proposal bug batches are recurring — systemic, not isolated",
    description:
      "There have been at least 4 distinct batches of proposal bugs (22/05 ×2, 15/05 ×2) all assigned to Shivam. The same area is regressing repeatedly, suggesting missing test coverage or a fragile component architecture in the proposal editor. Next batch is likely if root cause isn't addressed.",
    priority: "high",
    impact: "high",
    effort: "medium",
    relatedItems: ["TL-2655", "TL-2656", "TL-2614", "TL-2612"],
    confidence: 82,
  },
  {
    id: "ai3",
    type: "recommendation",
    title: "Batch the 8 MMS timezone bugs into a single PR",
    description:
      "MAG-188 through MAG-199 all share the same root cause: MMS date rendering not scoped to ET timezone. These 8+ issues are currently tracked separately in review. Merging them into one root-fix PR (already started by Israel) would clear the In Review queue significantly and avoid repeated timezone regressions.",
    priority: "medium",
    impact: "high",
    effort: "low",
    relatedItems: ["MAG-188", "MAG-191", "MAG-192", "MAG-193", "MAG-194", "MAG-199"],
    confidence: 91,
  },
  {
    id: "ai4",
    type: "opportunity",
    title: "Intercom is set up — now is the time to define the support playbook",
    description:
      "Intercom was configured this week with no real customer conversations yet. This is the ideal moment to define SLA targets, set up routing rules, create macros for common issues, and configure Fin AI Agent — before inbound volume makes reactive setup harder.",
    priority: "medium",
    impact: "high",
    effort: "low",
    relatedItems: [],
    confidence: 85,
  },
  {
    id: "ai5",
    type: "recommendation",
    title: "Prioritise TL-2720 production checklist to unblock release",
    description:
      "TL-2720 (\"[Production] List down all things needed to make staging ready for production\") is assigned to Praveen but sits in Todo. This is the single most important coordination item before launch. Running a 30-min team sync to populate this list would unblock the release timeline for everyone.",
    priority: "high",
    impact: "high",
    effort: "low",
    relatedItems: ["TL-2720", "TL-2714", "TL-2655"],
    confidence: 79,
  },
  {
    id: "ai6",
    type: "opportunity",
    title: "Israel owns 56 issues — highest concentration of risk in one person",
    description:
      "Israel Ebenezer has 56 open Linear issues across TripLoft and MAGgie — more than anyone else on the team and 37% of the entire active backlog. This is a single-point-of-failure risk for MMS/MAGgie and automations. Consider distributing MAGgie In Review items or pair-programming to build redundancy.",
    priority: "medium",
    impact: "medium",
    effort: "medium",
    relatedItems: ["MAG-203", "MAG-202", "MAG-201", "TL-2682", "TL-2723"],
    confidence: 76,
  },
];
