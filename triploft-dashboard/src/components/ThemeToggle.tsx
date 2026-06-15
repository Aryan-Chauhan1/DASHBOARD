"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/[0.06]"
      style={{ color: "var(--text-secondary)" }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <>
          <Sun size={13} />
          <span>Light mode</span>
        </>
      ) : (
        <>
          <Moon size={13} />
          <span>Dark mode</span>
        </>
      )}
    </button>
  );
}
