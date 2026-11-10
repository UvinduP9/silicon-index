"use client";

import { useId, useState, type ReactNode } from "react";
import { heatScale } from "@/lib/heat";
import { EmptyTile, HeatTile } from "@/lib/ui/heat-tile";
import {
  HeadToHead,
  HeadToHeadDivider,
  HeadToHeadRow,
  HeadToHeadSpec,
} from "@/lib/ui/head-to-head";
import { LegendRamp } from "@/lib/ui/legend-ramp";
import { MetricTabs } from "@/lib/ui/metric-tabs";
import {
  GridIcon,
  LinesIcon,
  SegmentedControl,
} from "@/lib/ui/segmented-control";
import { ThemeToggle } from "@/lib/ui/theme-toggle";
import { TogglePill } from "@/lib/ui/toggle-pill";
import { Tooltip } from "@/lib/ui/tooltip";
import { TopBar } from "@/lib/ui/top-bar";

// Placeholder content only. None of these are benchmark results.
const METRICS = [
  { id: "one", label: "Metric one" },
  { id: "two", label: "Metric two" },
  { id: "three", label: "Metric three" },
  { id: "four", label: "Metric four" },
] as const;
type MetricId = (typeof METRICS)[number]["id"];

const VIEWS = [
  { id: "grid", label: "Grid", icon: <GridIcon /> },
  { id: "lines", label: "Lines", icon: <LinesIcon /> },
] as const;
type ViewId = (typeof VIEWS)[number]["id"];

const SCALES = [
  { id: "linear", label: "Linear" },
  { id: "log", label: "Log" },
] as const;
type ScaleId = (typeof SCALES)[number]["id"];

const TIERS = [
  { id: "base", label: "Base" },
  { id: "pro", label: "Pro" },
  { id: "max", label: "Max" },
  { id: "ultra", label: "Ultra" },
] as const;

const SAMPLES = ["A", "B", "C", "D", "E", "F"].map((k, i) => ({
  id: k,
  name: `Sample ${k}`,
  value: (i + 1) * 100,
}));
const heat = heatScale([100, 600]);

const COLOR_TOKENS = [
  "bg",
  "raise",
  "line",
  "line-2",
  "text",
  "muted",
  "faint",
  "ring",
  "tier-base",
  "tier-pro",
  "tier-max",
  "tier-ultra",
  "ref",
  "up",
  "down",
];

const TYPE_SCALE = [
  ["display", "40/44, 650", "text-display font-heading tracking-tight"],
  ["heading", "32/36, 700", "text-heading font-bold tracking-tight"],
  ["heading-sm", "28/32, 650", "text-heading-sm font-heading tracking-tight"],
  ["tile", "24/26, 700", "text-tile font-bold tracking-tight"],
  ["stat", "20/28, 700", "text-stat font-bold"],
  ["lead", "18/24, 750", "text-lead font-wordmark"],
  ["body", "15/24, 400", "text-body"],
  ["small", "14/20, 500", "text-small font-medium"],
  ["label", "13/20, 400", "text-label"],
  ["caption", "12/16, 400", "text-caption"],
] as const;

export function Showcase() {
  const [metric, setMetric] = useState<MetricId>("one");
  const [view, setView] = useState<ViewId>("grid");
  const [scale, setScale] = useState<ScaleId>("linear");
  const [tiers, setTiers] = useState<Set<string>>(
    () => new Set(["base", "pro", "max"]),
  );
  const [ref, setRef] = useState(true);
  const [picks, setPicks] = useState<string[]>(["B", "E"]);

  const toggleTier = (id: string) =>
    setTiers((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const togglePick = (id: string) =>
    setPicks((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id].slice(-2),
    );

  const bar = (
    <TopBar
      tabs={<MetricTabs tabs={METRICS} value={metric} onChange={setMetric} />}
      actions={
        <>
          <SegmentedControl
            label="View"
            segments={VIEWS}
            value={view}
            onChange={setView}
            collapseLabels
          />
          <ThemeToggle />
        </>
      }
    />
  );

  return (
    <>
      {bar}
      <main className="mx-auto max-w-page px-gutter pb-16">
        <h1 className="mt-7 mb-1.5 max-w-[30ch] text-heading-sm font-heading tracking-tight text-balance [font-variation-settings:'opsz'_72] min-[900px]:mt-11 min-[900px]:text-display">
          Components
        </h1>
        <p className="mb-7 max-w-[66ch] text-muted">
          Every shared component, shown in the dark and light themes. All names
          and numbers here are placeholders, not benchmark results. The theme
          button above switches the page; each pair below is fixed.
        </p>

        <Section
          title="Color tokens"
          note="CSS variables, mapped to Tailwind colors like bg-raise and text-muted."
        >
          <Pair>
            {() => (
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 min-[480px]:grid-cols-3">
                {COLOR_TOKENS.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-label">
                    <span
                      aria-hidden="true"
                      className="size-5 shrink-0 rounded-[4px] border border-line-2"
                      style={{ background: `var(--${t})` }}
                    />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </Pair>
        </Section>

        <Section
          title="Type scale"
          note="Bricolage Grotesque. Numbers use tabular figures."
        >
          <Pair>
            {() => (
              <ul className="space-y-2">
                {TYPE_SCALE.map(([name, spec, cls]) => (
                  <li
                    key={name}
                    className="flex flex-wrap items-baseline gap-x-3"
                  >
                    <span className={`${cls} min-w-0`}>Silicon Index</span>
                    <span className="text-label text-faint">
                      {name}, {spec}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Pair>
        </Section>

        <Section
          title="Top bar"
          note="Wordmark, metric tabs, view switch and theme toggle. Below 900px the tabs move to their own row."
        >
          <Pair stack bleed>
            {() => bar}
          </Pair>
        </Section>

        <Section
          title="Metric tabs"
          note="One tab stop. Arrow keys, Home and End move between tabs."
        >
          <Pair>
            {() => (
              <div className="overflow-x-auto">
                <MetricTabs
                  tabs={METRICS}
                  value={metric}
                  onChange={setMetric}
                />
              </div>
            )}
          </Pair>
        </Section>

        <Section
          title="Segmented control"
          note="Default size for the view switch, small for chart options."
        >
          <Pair>
            {() => (
              <div className="flex flex-wrap items-center gap-4">
                <SegmentedControl
                  label="View"
                  segments={VIEWS}
                  value={view}
                  onChange={setView}
                />
                <SegmentedControl
                  label="Scale"
                  size="small"
                  segments={SCALES}
                  value={scale}
                  onChange={setScale}
                />
              </div>
            )}
          </Pair>
        </Section>

        <Section
          title="Toggle pills"
          note="Turn a series on or off. The dot is the series color."
        >
          <Pair>
            {() => (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
                <div className="flex flex-wrap gap-1.5">
                  {TIERS.map((t) => (
                    <TogglePill
                      key={t.id}
                      label={t.label}
                      color={`var(--tier-${t.id})`}
                      pressed={tiers.has(t.id)}
                      onChange={() => toggleTier(t.id)}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-label text-faint">For scale</span>
                  <TogglePill
                    label="Sample reference"
                    pressed={ref}
                    onChange={setRef}
                  />
                </div>
              </div>
            )}
          </Pair>
        </Section>

        <Section
          title="Heat tiles"
          note="Filled by value on the heat ramp, with text color picked for contrast. Press a tile to pick it; the last two picks are A and B."
        >
          <Pair>
            {() => (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-hair min-[480px]:grid-cols-3">
                  {SAMPLES.map((s) => {
                    const i = picks.indexOf(s.id);
                    return (
                      <HeatTile
                        key={s.id}
                        name={s.name}
                        value={String(s.value)}
                        unit="pts"
                        color={heat(s.value)}
                        pick={i < 0 ? undefined : i === 0 ? "A" : "B"}
                        onPress={() => togglePick(s.id)}
                      />
                    );
                  })}
                  <EmptyTile reason="Not made" />
                  <EmptyTile reason="No result yet" />
                </div>
                <div className="flex flex-wrap items-stretch gap-hair">
                  <span className="mr-2.5 self-center text-label text-muted">
                    For scale
                  </span>
                  <div className="w-40">
                    <HeatTile
                      size="compact"
                      name="Sample ref"
                      value="350"
                      unit="pts"
                      color={heat(350)}
                    />
                  </div>
                  <div className="w-40">
                    <EmptyTile size="compact" reason="No result" />
                  </div>
                </div>
              </div>
            )}
          </Pair>
        </Section>

        <Section
          title="Legend ramp"
          note="The ramp with the low and high ends of the current range."
        >
          <Pair>{() => <LegendRamp low="100 pts" high="600 pts" />}</Pair>
        </Section>

        <Section
          title="Head-to-head rows"
          note="Bars grow right when B is higher and left when it's lower. A dash marks a missing value."
        >
          <Pair stack>
            {() => (
              <>
                <h2 className="mb-5 text-heading-sm font-bold tracking-tight [font-variation-settings:'opsz'_72] min-[900px]:text-heading">
                  Sample A
                  <span className="mx-2.5 font-normal text-faint">vs</span>
                  Sample B
                </h2>
                <HeadToHead>
                  <HeadToHeadRow
                    label="Metric one"
                    a={100}
                    b={150}
                    unit="pts"
                    maxChange={0.5}
                  />
                  <HeadToHeadRow
                    label="Metric two"
                    a={200}
                    b={180}
                    unit="pts"
                    maxChange={0.5}
                  />
                  <HeadToHeadRow
                    label="Metric three"
                    a={300}
                    b={null}
                    unit="pts"
                    maxChange={0.5}
                  />
                  <HeadToHeadDivider />
                  <HeadToHeadSpec label="Cores" a="8" b="12" />
                  <HeadToHeadSpec
                    label="Ships in"
                    a={<span className="text-muted">Example device</span>}
                    b={<span className="text-muted">Example device</span>}
                  />
                </HeadToHead>
              </>
            )}
          </Pair>
        </Section>

        <Section
          title="Tooltip"
          note="Detail for a hovered or focused point. The second one opens on hover or keyboard focus."
        >
          <Pair>{() => <TooltipDemo />}</Pair>
        </Section>
      </main>
    </>
  );
}

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-line pt-7">
      <h2 className="text-stat font-bold tracking-tight">{title}</h2>
      <p className="mb-4 max-w-[66ch] text-small text-muted">{note}</p>
      {children}
    </section>
  );
}

/** Renders the same demo twice, once forced dark and once forced light. */
function Pair({
  children,
  stack = false,
  bleed = false,
}: {
  children: () => ReactNode;
  stack?: boolean;
  bleed?: boolean;
}) {
  return (
    <div className={`grid gap-3 ${stack ? "" : "min-[1100px]:grid-cols-2"}`}>
      {(["dark", "light"] as const).map((t) => (
        <div
          key={t}
          data-theme={t}
          className="min-w-0 overflow-hidden rounded-group border border-line-2 bg-bg text-text"
        >
          <p className="px-4 pt-3 text-caption text-faint capitalize">{t}</p>
          <div className={bleed ? "pt-2" : "p-4 pt-3"}>{children()}</div>
        </div>
      ))}
    </div>
  );
}

function TooltipDemo() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-6">
      <div className="relative h-[120px] w-[200px]">
        <Tooltip
          open
          title="Sample C"
          meta="Year"
          value="300"
          unit="pts"
          notes={["+50% vs Sample B", "Single result"]}
          style={{ left: 0, top: 0 }}
        />
      </div>
      <div className="relative">
        <button
          type="button"
          aria-describedby={id}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          className="rounded-pill border border-line-2 px-2.75 py-1 text-small"
        >
          Hover or focus me
        </button>
        <Tooltip
          id={id}
          open={open}
          title="Sample D"
          value="400"
          unit="pts"
          notes={["First of its tier"]}
          style={{ left: 0, top: 40 }}
        />
      </div>
    </div>
  );
}
