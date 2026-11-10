# Silicon Index: vision

## Mission

**Help anyone pick the right computer for their work, using numbers that already exist.**

The results are out there: in Geekbench Browser, in Blender Open Data, in llama.cpp GitHub threads, in reviewer articles and YouTube videos. They are scattered, inconsistent, uncited and presented badly. Silicon Index gathers them in one place, checks them, cites every one, and presents them so a person can answer "which computer for my work?" in under a minute and share the answer as a link.

## What we are, and what we are not

- **We collect; we don't measure.** We never run our own benchmarks or invent our own scoring system. Other people already do the measuring well. Our job is to gather, normalise, cite and present.
- **A passion project, not a business.** No ads, no affiliate links, no sponsored rankings, no paid tier. Nothing on the site exists to make money, which is exactly why people can trust it.
- **Every vendor.** Apple, Intel, AMD and Qualcomm chips, and later discrete GPUs, in one consistent model.
- **Every profession.** Not only "how fast is the CPU" but "how fast is it at my work".

## Where our advantage comes from

The numbers are public and the design can be copied, so neither is a moat on its own. These are:

1. **The workload dataset.** Results for real professional work, gathered from many scattered sources into one consistent, cited dataset: tokens per second for local AI models, build times for developers, export times for video editors, render times for 3D artists, and so on. Nobody keeps this in one place. Collecting it and keeping it current is hard, slow, compounding work, and an agentic system that never stops doing it is the thing a copycat can't reproduce in a weekend.
2. **Getting the details right.** Every number carries its source, benchmark version, date, power level and sample count. Benchmark versions on different scales are never mixed. A chip, its configurations (binned core counts) and the devices it ships in are separate things, because the same chip performs differently in a fanless laptop than in a desktop, and a PC laptop chip at 28 W is not the same as the same chip at 115 W. Being careful is rare; it's what makes people trust and quote us.
3. **Coverage across vendors in one model.** "MacBook Pro M5 Pro vs a Ryzen AI laptop vs a Snapdragon laptop, for video editing" is a question that has no good answer anywhere today.
4. **Links worth sharing.** Every view and comparison has a URL with a good preview card, and every "X vs Y" pair has its own page. That's how people find us and pass us on.
5. **Open data, community fixes.** The dataset lives in this repo as plain files. Anyone can open a pull request to add or correct a number, the way caniuse.com works for browser support. Open data with us as its careful maintainer becomes the reference.
6. **Design.** Pure black, full contrast, fast, clear. The reason the project exists.

## Professions we serve

Each gets its own view, built from the workloads that matter to it.

| Profession | What they care about |
|---|---|
| Local AI | Tokens per second, prompt processing speed, which models fit in memory |
| Software development | Build and compile times, test suites, containers |
| Video editing | Export and render times, timeline playback, codec support |
| Photography | Import, export, AI denoise and masking times |
| 3D and motion | Render times (CPU and GPU), viewport performance |
| Music and audio | Track and plugin counts, low-latency performance |
| Data science | Notebook, dataframe and model training times |
| Gaming | Frame rates at given settings |
| Everyday use | Responsiveness, battery life, browsing |

Local AI is the most urgent and the most badly served, so it goes first. The others follow.

## North star

A person who arrives with "this is my work and my budget" leaves within a minute with an answer they trust and a link they'd send to a friend.

## Phases

| Phase | Goal | Done when |
|---|---|---|
| 0. Foundation | App, data model, design system, source catalogue, live preview site | A real page is deployed from real, validated data |
| 1. Apple reference | Every M-series chip and Mac, Grid and Lines views, head-to-head, chip pages, sources | It's the best Apple Silicon reference on the web |
| 2. Every chip | Intel, AMD and Qualcomm laptop chips, then desktop chips and GPUs | Mac vs PC comparisons are honest and easy |
| 3. Workloads | Results for each profession, starting with local AI | Someone can see how fast a machine is at their work |
| 4. Decisions | "What should I buy" and "is upgrading worth it" | Someone can make a hardware decision with us |

## Non-goals

- Running benchmarks, or building our own benchmark suite or composite score.
- Ads, affiliate links, sponsorships or any revenue.
- News, reviews or opinion pieces.
- Phones and tablets, except as reference points (the MacBook Neo's A18 Pro is a Mac chip, so it counts).
