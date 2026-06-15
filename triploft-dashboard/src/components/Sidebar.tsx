"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bug as BugIcon,
  Headphones,
  LayoutDashboard,
  Layers,
  MessageSquareHeart,
  Radio,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/product", label: "Product", icon: Layers },
  { href: "/bugs", label: "Bugs", icon: BugIcon },
  { href: "/customer-voice", label: "Customer Voice", icon: MessageSquareHeart },
  { href: "/support", label: "Support", icon: Headphones },
  { href: "/executive-feed", label: "Exec Feed", icon: Radio },
  { href: "/ai-insights", label: "AI Insights", icon: Sparkles },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-56 flex flex-col border-r z-30"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-14 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "var(--accent)" }}>
          <Zap size={14} className="text-white" />
        </div>
        <div>
          <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
            TripLoft
          </span>
          <span className="block text-[10px] font-medium leading-none" style={{ color: "var(--text-tertiary)" }}>
            Operations
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                active
                  ? "text-white"
                  : "hover:text-white"
              )}
              style={
                active
                  ? { background: "var(--surface-3)", color: "var(--text-primary)" }
                  : { color: "var(--text-secondary)" }
              }
            >
              <Icon size={16} className={active ? "text-indigo-400" : ""} />
              {label}
              {href === "/ai-insights" && (
                <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent)" }}>
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t" style={{ borderColor: "var(--border)" }}>
        <ThemeToggle />
        <div className="mt-3">
          <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>Last synced just now</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--success)" }} />
            <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
