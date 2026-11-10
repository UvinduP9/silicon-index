import type { HeatColor } from "../heat";

type TileSize = "default" | "compact";

const box: Record<TileSize, string> = {
  default: "min-h-[112px] px-3.5 py-3",
  compact: "min-h-16 px-3 py-2.5",
};
const nameType: Record<TileSize, string> = {
  default: "text-tile [font-variation-settings:'opsz'_96]",
  compact: "text-[16px] leading-5 [font-variation-settings:'opsz'_24]",
};

/**
 * One chip in the grid, filled with its heat color. Pressing it adds the chip
 * to the comparison; `pick` shows which side (A or B) it's on.
 */
export function HeatTile({
  name,
  value,
  unit,
  color,
  estimate = false,
  pick,
  onPress,
  size = "default",
}: {
  name: string;
  /** Already formatted for display. */
  value: string;
  unit?: string;
  color: HeatColor;
  estimate?: boolean;
  pick?: "A" | "B";
  onPress?: () => void;
  size?: TileSize;
}) {
  return (
    <button
      type="button"
      aria-pressed={pick !== undefined}
      onClick={onPress}
      style={{ background: color.bg, color: color.fg }}
      className={`relative flex w-full flex-col justify-between rounded-tile text-left transition-colors duration-[450ms] ease-out hover:brightness-110 aria-pressed:shadow-[inset_0_0_0_2px_var(--ring),0_0_0_2px_var(--bg)] ${box[size]}`}
    >
      {pick ? (
        <span className="absolute top-2.5 right-2.5 grid size-[22px] place-items-center rounded-full bg-ring text-caption font-bold text-bg">
          {pick}
          <span className="sr-only">, picked</span>
        </span>
      ) : null}
      <span
        className={`font-bold tracking-tight ${nameType[size]} ${pick ? "pr-7" : ""}`}
      >
        {name}
      </span>
      <span>
        <span className="font-medium tabular-nums">
          {value}
          {unit ? (
            <small className="ml-0.5 text-caption opacity-70">{unit}</small>
          ) : null}
        </span>
        {estimate ? (
          <span className="ml-1 text-caption opacity-75">estimate</span>
        ) : null}
      </span>
    </button>
  );
}

/**
 * A grid cell with no result, drawn as a dashed outline. Always say why:
 * "Not made", "No GPU result", "Not yet sourced".
 */
export function EmptyTile({
  reason,
  size = "default",
}: {
  reason: string;
  size?: TileSize;
}) {
  return (
    <div
      className={`flex items-end rounded-tile border-[1.5px] border-dashed border-line-2 text-label text-faint ${box[size]}`}
    >
      {reason}
    </div>
  );
}
