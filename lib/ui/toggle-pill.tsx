/**
 * Turns one series on or off, like a tier line or a reference chip.
 * The dot carries the series color; off pills go faint with a hollow dot.
 */
export function TogglePill({
  label,
  pressed,
  onChange,
  color = "var(--ref)",
}: {
  label: string;
  pressed: boolean;
  onChange: (pressed: boolean) => void;
  /** Any CSS color, usually a token like var(--tier-pro). */
  color?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onChange(!pressed)}
      className="inline-flex items-center gap-2 rounded-pill border border-line-2 px-2.75 py-1 text-small aria-[pressed=false]:border-line aria-[pressed=false]:text-faint"
    >
      <i
        aria-hidden="true"
        className="size-[9px] rounded-full"
        style={
          pressed
            ? { background: color }
            : { boxShadow: "inset 0 0 0 1.5px var(--faint)" }
        }
      />
      {label}
    </button>
  );
}
