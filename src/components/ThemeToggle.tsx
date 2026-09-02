"use client";

import { setTheme, useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Light-bulb theme switch. The bulb is dim on the dark theme and lit (filled
 * amber, rays out) on the light one — that state comes from CSS keyed on
 * `:root[data-theme]`, so the icon is right on the very first paint and never
 * flickers while React hydrates.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      aria-pressed={theme === "light"}
      title={`Switch to ${next} mode`}
      className={cn(
        "inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent",
        className
      )}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Rays — only shown when the bulb is lit */}
        <g className="bulb-rays">
          <path d="M9 1v1.4" />
          <path d="M15.4 3.6l-1 1" />
          <path d="M17 9.5h-1.4" />
          <path d="M2.6 3.6l1 1" />
          <path d="M1 9.5h1.4" />
        </g>
        {/* Glass */}
        <path
          className="bulb-glass"
          d="M9 3.4a4.3 4.3 0 0 1 2.6 7.7c-.5.4-.8 1-.8 1.6H7.2c0-.6-.3-1.2-.8-1.6A4.3 4.3 0 0 1 9 3.4Z"
        />
        {/* Base */}
        <path d="M7.3 14.3h3.4" />
        <path d="M7.9 16.2h2.2" />
      </svg>
    </button>
  );
}
