import type { ReactNode } from "react";

/** Percent change from a to b, rounded, with an explicit sign: "+12%", "-4%". */
export function formatChange(a: number, b: number): string {
  const p = Math.round((b / a - 1) * 100);
  return `${p > 0 ? "+" : p < 0 ? "−" : ""}${Math.abs(p)}%`;
}

/**
 * Bar width as a share of one half of the divider, 0..1. `maxChange` is the
 * largest absolute fractional change among the rows, so the biggest one fills
 * its half.
 */
export function changeBarWidth(a: number, b: number, maxChange: number) {
  if (!(a > 0) || !(maxChange > 0)) return 0;
  return Math.min(1, Math.abs(b / a - 1) / maxChange);
}

/** Grid container for head-to-head rows: label, A, divider bar, B. */
export function HeadToHead({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[90px_72px_minmax(0,1fr)_76px] items-center gap-x-2.5 gap-y-2 text-small tabular-nums min-[900px]:grid-cols-[150px_120px_minmax(0,1fr)_140px] min-[900px]:gap-x-5 min-[900px]:gap-y-2.5 min-[900px]:text-body">
      {children}
    </div>
  );
}

/**
 * One metric compared across two chips. The bar grows right (warm) when B is
 * higher and left (cool) when B is lower. Either value can be missing.
 */
export function HeadToHeadRow({
  label,
  a,
  b,
  format = (v) => String(v),
  unit,
  maxChange,
}: {
  label: string;
  a: number | null;
  b: number | null;
  format?: (v: number) => string;
  unit?: string;
  /** Largest absolute fractional change across all rows shown together. */
  maxChange: number;
}) {
  const both = a !== null && b !== null && a > 0;
  const up = both && b >= a;
  const width = both ? changeBarWidth(a, b, maxChange) * 46 : 0;
  return (
    <>
      <span className="text-small text-muted">{label}</span>
      <span className="text-right">{a === null ? "–" : format(a)}</span>
      <div
        aria-hidden="true"
        className="relative h-[22px] before:absolute before:-top-1 before:-bottom-1 before:left-1/2 before:w-px before:bg-line-2"
      >
        {both ? (
          <i
            className={`absolute top-1.5 h-2.5 rounded-[3px] ${up ? "left-1/2 bg-up" : "right-1/2 bg-down"}`}
            style={{ width: `${width}%` }}
          />
        ) : null}
      </div>
      <span className="font-semibold">
        {b === null ? "–" : format(b)}
        {b !== null && unit ? ` ${unit}` : null}
        {both ? (
          <small
            className={`block text-label leading-4 font-medium ${up ? "text-up" : "text-down"}`}
          >
            {formatChange(a, b)}
          </small>
        ) : null}
      </span>
    </>
  );
}

/** Thin rule between the metric rows and the spec rows. */
export function HeadToHeadDivider() {
  return <div className="col-span-full my-1.5 h-px bg-line" />;
}

/** A spec row with no bar: core counts, memory, devices. */
export function HeadToHeadSpec({
  label,
  a,
  b,
}: {
  label: string;
  a: ReactNode;
  b: ReactNode;
}) {
  return (
    <>
      <span className="text-small text-muted">{label}</span>
      <span className="text-right">{a}</span>
      <span />
      <span className="font-semibold">{b}</span>
    </>
  );
}
