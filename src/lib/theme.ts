"use client";

import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

/** localStorage key + the inline script in `layout.tsx` must stay in sync. */
export const THEME_KEY = "seif-theme";

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/**
 * The theme currently on `<html data-theme>`. Reads the DOM rather than React
 * state so the pre-paint script in `layout.tsx` stays the single source of
 * truth, and any component can observe a change without prop drilling.
 * Dark during SSR and the hydrating render.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, () => "dark");
}

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // Private mode / storage disabled — the choice just won't persist.
  }
}
