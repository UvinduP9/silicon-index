"use client";

import { useRef, type KeyboardEvent } from "react";

export interface MetricTab<T extends string = string> {
  id: T;
  label: string;
}

/**
 * Picks the metric that colors and plots everything below. A WAI-ARIA tab
 * list: one tab stop, arrow keys and Home/End move and select.
 */
export function MetricTabs<T extends string>({
  tabs,
  value,
  onChange,
  label = "Metric",
  controls,
}: {
  tabs: readonly MetricTab<T>[];
  value: T;
  onChange: (id: T) => void;
  label?: string;
  /** id of the panel these tabs control. */
  controls?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent, i: number) {
    const last = tabs.length - 1;
    const to =
      e.key === "ArrowRight"
        ? i === last
          ? 0
          : i + 1
        : e.key === "ArrowLeft"
          ? i === 0
            ? last
            : i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (to === null) return;
    e.preventDefault();
    const tab = tabs[to];
    if (!tab) return;
    onChange(tab.id);
    refs.current[to]?.focus();
  }

  return (
    <div role="tablist" aria-label={label} className="flex gap-px2">
      {tabs.map((t, i) => {
        const selected = t.id === value;
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={controls}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className="rounded-control px-3 py-1.5 font-medium whitespace-nowrap text-muted hover:text-text aria-selected:bg-raise aria-selected:text-text aria-selected:shadow-[inset_0_0_0_1px_var(--line-2)]"
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
