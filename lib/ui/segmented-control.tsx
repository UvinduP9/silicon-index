import type { ReactNode } from "react";

export interface Segment<T extends string = string> {
  id: T;
  label: string;
  icon?: ReactNode;
}

/**
 * A small set of mutually exclusive options, like Grid and Lines, or Linear
 * and Log. With `collapseLabels`, labels hide below 900px and only icons show
 * (each button keeps its accessible name).
 */
export function SegmentedControl<T extends string>({
  segments,
  value,
  onChange,
  label,
  size = "default",
  collapseLabels = false,
}: {
  segments: readonly Segment<T>[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  size?: "default" | "small";
  collapseLabels?: boolean;
}) {
  const pad =
    size === "small" ? "px-2.5 py-0.75 text-label" : "px-3 py-1.25 text-small";
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-group border border-line-2 p-px2"
    >
      {segments.map((s) => (
        <button
          key={s.id}
          type="button"
          aria-pressed={s.id === value}
          aria-label={collapseLabels ? s.label : undefined}
          title={collapseLabels ? s.label : undefined}
          onClick={() => onChange(s.id)}
          className={`inline-flex items-center gap-1.75 rounded-[7px] font-medium text-muted hover:text-text aria-pressed:bg-text aria-pressed:text-bg ${pad}`}
        >
          {s.icon}
          <span className={collapseLabels ? "max-[899px]:sr-only" : undefined}>
            {s.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export function GridIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="6" height="6" rx="1.2" />
      <rect x="9" y="1" width="6" height="6" rx="1.2" />
      <rect x="1" y="9" width="6" height="6" rx="1.2" />
      <rect x="9" y="9" width="6" height="6" rx="1.2" />
    </svg>
  );
}

export function LinesIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 13 6 8.5l3 2.5 5.5-7" />
    </svg>
  );
}
