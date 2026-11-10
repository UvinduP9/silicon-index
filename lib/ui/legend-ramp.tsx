import { heatGradient } from "../heat";

/** The heat ramp with the low and high ends of the current range. */
export function LegendRamp({
  low,
  high,
  label = "Color scale",
}: {
  /** Formatted low end, with unit. */
  low: string;
  /** Formatted high end, with unit. */
  high: string;
  label?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label}: from ${low}, coolest, to ${high}, hottest`}
      className="flex items-center gap-3 text-label text-muted tabular-nums"
    >
      <span aria-hidden="true">{low}</span>
      <span
        aria-hidden="true"
        className="h-2.5 w-[220px] max-w-[40vw] rounded-[5px]"
        style={{ background: heatGradient() }}
      />
      <span aria-hidden="true">{high}</span>
    </div>
  );
}
