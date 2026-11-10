/**
 * The heat ramp from design/d-hybrid.html: deep violet (low) through magenta
 * and orange to pale gold (high). Grid tiles, the legend and the tier colors
 * all come from this one ramp.
 */
export const HEAT_STOPS = [
  "#2E1C44",
  "#6B2366",
  "#B5385B",
  "#E66A3A",
  "#F6B24A",
  "#FBEC9E",
] as const;

/**
 * Text color used on the light end of the ramp. The prototype used a warm
 * near-black (#1A0F17); pure black is needed to keep 4.5:1 at the crossover.
 */
export const HEAT_INK_DARK = "#000000";
/** Text color used on the dark end of the ramp. */
export const HEAT_INK_LIGHT = "#FFFFFF";

export type Rgb = readonly [number, number, number];

export interface HeatColor {
  /** Tile background, as `rgb(r, g, b)`. */
  bg: string;
  /** Text color with the higher contrast against `bg`. */
  fg: string;
  /** Background as an RGB triple, for tests and further maths. */
  rgb: Rgb;
}

export type HeatScaleType = "linear" | "log";

export interface HeatScaleOptions {
  /** `log` spreads values that span orders of magnitude. Default `linear`. */
  type?: HeatScaleType;
}

export function hexToRgb(hex: string): Rgb {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m?.[1]) throw new Error(`Not a 6-digit hex color: ${hex}`);
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** WCAG 2 relative luminance, 0 (black) to 1 (white). */
export function relativeLuminance([r, g, b]: Rgb): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG 2 contrast ratio between two colors, 1 to 21. */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const STOPS_RGB = HEAT_STOPS.map(hexToRgb);
const INK_DARK = hexToRgb(HEAT_INK_DARK);
const INK_LIGHT = hexToRgb(HEAT_INK_LIGHT);

/** Picks whichever ink reads better on the given background. */
export function readableInk(bg: Rgb): string {
  return contrastRatio(bg, INK_DARK) >= contrastRatio(bg, INK_LIGHT)
    ? HEAT_INK_DARK
    : HEAT_INK_LIGHT;
}

/** Color at position `t` on the ramp; `t` is clamped to 0..1. */
export function heatAt(t: number): HeatColor {
  const x = Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0;
  const p = x * (STOPS_RGB.length - 1);
  const i = Math.min(STOPS_RGB.length - 2, Math.floor(p));
  const f = p - i;
  const a = STOPS_RGB[i]!;
  const b = STOPS_RGB[i + 1]!;
  const rgb = [0, 1, 2].map((k) => Math.round(a[k]! + (b[k]! - a[k]!) * f)) as [
    number,
    number,
    number,
  ];
  return { bg: `rgb(${rgb.join(", ")})`, fg: readableInk(rgb), rgb };
}

/**
 * Maps a value range onto the ramp. The lowest value gets the coolest color
 * and the highest gets the hottest. Values outside the range are clamped.
 * A range with no spread (min equals max) puts every value in the middle.
 */
export function heatScale(
  [min, max]: readonly [number, number],
  { type = "linear" }: HeatScaleOptions = {},
): (value: number) => HeatColor {
  if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) {
    throw new Error(`Invalid heat range: [${min}, ${max}]`);
  }
  if (type === "log" && min <= 0) {
    throw new Error("A log heat scale needs a range above zero");
  }
  const f = type === "log" ? Math.log : (v: number) => v;
  const lo = f(min);
  const span = f(max) - lo;
  return (value) => {
    if (span === 0) return heatAt(0.5);
    const v = type === "log" ? Math.max(value, min) : value;
    return heatAt((f(v) - lo) / span);
  };
}

/** CSS `linear-gradient` for the legend ramp. */
export function heatGradient(direction = "90deg"): string {
  return `linear-gradient(${direction}, ${HEAT_STOPS.join(", ")})`;
}
