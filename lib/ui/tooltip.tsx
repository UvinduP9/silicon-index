import type { CSSProperties, ReactNode } from "react";

/**
 * Detail card for a hovered or focused point: name, a big value, and notes.
 * Position it absolutely inside a relative parent with `style`.
 */
export function Tooltip({
  id,
  open,
  title,
  meta,
  value,
  unit,
  notes = [],
  style,
}: {
  id?: string;
  open: boolean;
  title: string;
  /** Short context after the title, like a year. */
  meta?: string;
  value: string;
  unit?: string;
  notes?: ReactNode[];
  style?: CSSProperties;
}) {
  return (
    <div
      id={id}
      role="tooltip"
      aria-hidden={!open}
      style={style}
      className={`pointer-events-none absolute z-10 min-w-[190px] rounded-group border border-line-2 bg-raise px-3 py-2.5 text-label leading-5 transition-opacity duration-[120ms] ${open ? "opacity-100" : "opacity-0"}`}
    >
      <b>{title}</b>
      {meta ? <span className="ml-1 text-muted">{meta}</span> : null}
      <div className="text-stat font-bold tabular-nums">
        {value}
        {unit ? (
          <span className="ml-1 text-label font-normal text-muted">{unit}</span>
        ) : null}
      </div>
      {notes.map((n, i) => (
        <div key={i} className="text-muted">
          {n}
        </div>
      ))}
    </div>
  );
}
