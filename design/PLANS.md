# Design exploration: three directions

Written following `.claude/skills/frontend-design/SKILL.md`: plan, review the plan against the brief, revise, then build.

## The brief, restated

- **Subject:** Apple Silicon chips (M1 to M6, base/Pro/Max/Ultra) and the Macs they ship in.
- **Audience, first priority:** technical people who want to read the numbers: single-core, multi-core, GPU, bandwidth, generational change, head-to-head.
- **Primary job of the page:** make the shape of the data obvious at a glance, then let you dig into any single number and its source.
- **Constraints from the client:** dark first, light mode second. Reference points: DeepSWE and slopalytics (direct labels, metric tabs, toggleable entities, sources cited). Anti-reference: Geekbench Browser and matplotlib charts in articles.

All three prototypes use the same sample data (`data.js`, Geekbench 6) so the comparison is about design, not numbers. They differ in what the **hero** is, because that decision shapes the whole product.

| | A. Trajectory | B. Index | C. Grid |
|---|---|---|---|
| Hero | Line chart, generations on x | Sortable ranked table | Generation × tier heat map |
| Best at | "How fast is Apple improving?" | "What's fastest at X?" | "Where does each chip sit in the lineup?" |
| Signature moment | Lines draw in once on load | Rows re-sort with motion when you change the sort | Grid re-heats when you change the metric |

---

## A. Trajectory

**Idea.** The story of Apple Silicon is a set of curves: four tiers climbing over six generations. Show the curves, label them directly, and let a chip list on the right turn things on and off.

**Color.** Taken from the interference colors on an oxidised silicon wafer, where film thickness shifts the hue from blue through violet and magenta to gold. Each tier gets one band of that spectrum, so the four line colors belong together.

- Oxide `#0D1526` background
- Wafer `#16213A` raised surfaces
- Frost `#E6ECF7` text
- Haze `#8A97B3` secondary text
- Tier lines: Base `#62C3E6`, Pro `#9D8CFF`, Max `#E68AD0`, Ultra `#E9C46A`

**Type.** Schibsted Grotesk, one family, with tabular figures for every number. 15/24 body, 13 for axis labels, 28 for the page title. Numbers are set in the same face as text, never monospace.

**Layout.** Left aligned. The chart takes about 70% of the width; the chip list is a right rail.

```
 Silicon Index        Single  Multi  GPU  Bandwidth        [Linear|Log] [◐]
 ───────────────────────────────────────────────────────────────────────────
 Apple Silicon, M1 to M6                                   │ Tiers  B P M U
 Geekbench 6 single-core, higher is better                 │ ─────────────
                                                    Ultra  │ M6     ● ○ ○ ○
   4500 ┤                                 ●──── Max        │ M5     ● ● ● ●
        │                         ●──────●       Pro       │ M4     ● ● ● –
   3000 ┤ ─ ─ ─ Core Ultra 9 ─ ─ ●─ ─ ─ ─ ─ ─ ─ ─ ─ Base   │ M3     ● ● ● ●
        │  ●──────●                                        │ ...
        └──M1─────M2─────M3─────M4─────M5─────M6           │ For scale
 ───────────────────────────────────────────────────────── │ ○ A18 Pro
  M4 Pro  · selected  cores, GPU, bandwidth, devices, src  │ ○ Core Ultra 9
```

**Principles.** The chart is the whole argument; everything else is quiet. Labels live at line ends, not in a legend. Hollow points mean "estimate". Non-Apple chips are dashed horizontal lines labelled "for scale".

**Review against the brief.** My first plan was a near-black page with one bright accent and small monospace labels, close to DeepSWE. That is a cliché the skill calls out, and it would be a copy of the reference rather than our own look. Revised: a blue-black taken from silicon oxide, and a four-color tier spectrum taken from the subject itself, with no monospace.

---

## B. Index

**Idea.** The product is called an index, so make it literally one: a ranked table of every chip that you can sort by any metric. Every cell carries an inline bar so you can read magnitude without reading digits. Pick a baseline chip and every number turns into "×  faster than your Mac".

**Color.** Taken from Mac finishes.

- Midnight `#1A1F2B` background
- Space `#242B3A` hover and selected rows
- Starlight `#EEE6D8` text
- Silver `#A3ABB8` secondary text
- Sky `#86C1FF` the only accent: sorted column and selection
- Faster/slower vs baseline: `#7FD8A6` / `#F29A8B`

**Type.** Archivo variable, using its width axis as the design move: chip names in Expanded at weight 650, numbers in Semi Condensed so the dense columns fit, all tabular. The title is set wide and heavy at 40px; the type itself is the visual identity.

**Layout.** Left aligned, full width table, sticky header.

```
 SILICON INDEX (wide, heavy)                     Compare to [ none ▾ ]  [◐]
 Every M-series chip, ranked by Geekbench 6.
 [All | Base | Pro | Max | Ultra]   [ ] Show non-M chips for scale
 ┌────┬──────────────┬──────┬──────────────┬──────────────┬───────────┬────┐
 │ #  │ Chip         │ Year │ Single ▼     │ Multi        │ GPU       │ BW │
 ├────┼──────────────┼──────┼──────────────┼──────────────┼───────────┼────┤
 │ 1  │ M6           │ 2026 │ 4661 ██████▌ │ 22000 ███▌   │ 92k ██    │180 │
 │ 2  │ M5 Max       │ 2026 │ 4300 ██████  │ 30500 █████  │ 230k ████▌│614 │
 └────┴──────────────┴──────┴──────────────┴──────────────┴───────────┴────┘
 [ compare tray: M1 vs M4 Pro vs M6, relative bars ]   (appears on selection)
```

**Principles.** Density without noise: no zebra stripes, no cell borders, rhythm from consistent row height. Motion only when you sort or select. Baseline mode is the nerd feature: it turns every number into a ratio against a chip you own.

**Review against the brief.** The first plan used hairline rules on every row and zero radius, which drifts into the "broadsheet" default. Revised: rows are separated by spacing and hover state only, and the table sits on a soft raised surface. I also dropped an all-caps column header style for sentence case.

---

## C. Grid

**Idea.** Apple's lineup is a matrix: six generations by four tiers. Lay it out exactly like that and color each cell by the current metric, like a thermal image of the lineup. Empty cells say why they're empty (M4 Ultra was never made). Click two chips to get a head-to-head.

**Color.** A thermal camera palette, because heat is the other half of the Apple Silicon story (fanless Air versus Studio).

- Kiln `#17131C` background
- Ash `#2A2430` empty cells and surfaces
- Bone `#EDE7E1` text
- Smoke `#A69CAA` secondary text
- Heat scale: `#2E1C44` → `#6B2366` → `#B5385B` → `#E66A3A` → `#F6B24A` → `#FBEC9E`

**Type.** Bricolage Grotesque, one family. Its optical size axis lets chip names in cells be large and tight (opsz 96, weight 700) while labels stay open and readable (opsz 12).

**Layout.** Left aligned. Grid is the hero; the head-to-head panel opens beneath it.

```
 Silicon Index                    Single  Multi  GPU  Bandwidth      [◐]
 The Apple Silicon lineup, colored by Geekbench 6 single-core.
            M1 2020   M2 2022   M3 2023   M4 2024   M5 2025   M6 2026
  Base     ▓▓ M1    ▓▓ M2     ▓▓▓ M3    ▓▓▓▓ M4   ▓▓▓▓▓ M5  ▓▓▓▓▓▓ M6
  Pro      ...
  Max      ...
  Ultra    ...                          [Not made]          [Not yet]
            low ▕▁▂▃▄▅▆▇█▏ high          For scale: A18 Pro, Core Ultra 9
 ───────────────────────────────────────────────────────────────────────
  M1  vs  M6         Single +95%   Multi +163%   GPU +179%   BW +165%
```

**Principles.** Color is data, never decoration: the only saturated color on the page is the heat scale. Tiles touch with a 2px gap, no shadows, no rounded-card kit. The grid recolors when the metric changes; nothing else moves.

**Review against the brief.** A grid of tiles risks the "identical rounded cards" default. Revised: tiles are a heat map with a single small radius and no shadow, and empty slots are deliberately different (outlined, with a reason), so the grid is a data structure rather than a card layout.

---

## Viewing

Open any prototype directly in a browser, no build step:

- `design/a-trajectory.html`
- `design/b-index.html`
- `design/c-grid.html`

Useful URL parameters: `?theme=light`, `?m=sc|mc|gpu|bw` (A, C), `?sort=…&base=m1&pick=m1,m6&refs` (B), `?pick=m1,m6` (C).

Screenshots live in `design/shots/`. `shots/shot.sh` takes desktop shots with headless Chrome; `shots/phone.html?<file>` frames a page at 390px because headless Chrome won't go narrower than 500px.
