"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, isTheme, resolveTheme, type Theme } from "./theme";

const LIGHT_QUERY = "(prefers-color-scheme: light)";
const listeners = new Set<() => void>();

function readStored(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function current(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (isTheme(attr)) return attr;
  return resolveTheme(readStored(), matchMedia(LIGHT_QUERY).matches);
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const mq = matchMedia(LIGHT_QUERY);
  mq.addEventListener("change", onChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== THEME_STORAGE_KEY) return;
    if (isTheme(e.newValue))
      document.documentElement.setAttribute("data-theme", e.newValue);
    else document.documentElement.removeAttribute("data-theme");
    onChange();
  };
  addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    mq.removeEventListener("change", onChange);
    removeEventListener("storage", onStorage);
  };
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    // Choosing the theme the system already gives clears the override,
    // so the page goes back to following the system setting.
    if (theme === resolveTheme(null, matchMedia(LIGHT_QUERY).matches)) {
      localStorage.removeItem(THEME_STORAGE_KEY);
      document.documentElement.removeAttribute("data-theme");
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch {
    // Storage blocked: the choice lasts for this page only.
  }
  listeners.forEach((l) => l());
}

/**
 * Switches between dark and light. Follows the system setting until the
 * person picks the other theme, and remembers that choice.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, current, () => "dark");

  // React's dev remount clears attributes set by the inline script; put it back.
  useLayoutEffect(() => {
    const stored = readStored();
    if (isTheme(stored))
      document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={`grid size-[34px] place-items-center rounded-control text-muted hover:bg-raise hover:text-text ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
      </svg>
    </button>
  );
}
