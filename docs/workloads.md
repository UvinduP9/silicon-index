# Workloads by profession

Proposal for gardener review before collection. Hardware drivers below are qualitative hypotheses for choosing tasks, not measured chip rankings. No performance values or composite scores are introduced. A source lead is not an admitted dataset row.

## Collection and comparison rules

Collect existing public results only; never run these workloads ourselves. Each result needs its original URL, publisher, access date, exact table/chart location, benchmark and application version, metric and direction, machine, chip configuration, memory, operating system, backend, power mode/limit, cooling context, and sample count (or “single result”). Unknown fields stay unknown. Check source terms and robots rules before collection; do not bulk scrape.

Compare only matching task definitions, inputs, versions and settings. Preserve individual results and reported dispersion; do not blend benchmark generations, applications, devices, or CPU and GPU paths. Missing evidence means “no comparable result”, never a low score. Battery and sustained performance belong to devices rather than bare chips.

Source keys below refer to the access log at the end. “Lead” means plausible future coverage requiring a task-level public result before inclusion.

## Local AI — collect first

| Task | Metric | Likely hardware drivers | Public evidence and comparison boundary |
| --- | --- | --- | --- |
| Read a prompt | Prompt processing tokens/second, higher is better | GPU compute, memory bandwidth, batching, CPU fallback | A has separate prompt processing results; match model, token count and batch settings. |
| Generate a response | Generation tokens/second, higher is better | Memory bandwidth, GPU/backend, CPU speed for offload | A separates generation; match model, quantisation, context depth and offload. |
| Start responding in a real conversation | Time to first token in seconds, lower is better | Prompt compute, model loading/storage, runtime, cache | Lead: runtime reports linked from A; microbenchmark prompt throughput alone is not end-to-end latency. Separate warm and cold runs. |
| Run a model at the required context | Observed peak memory in bytes and successful completion | Memory capacity, cache format, GPU allocation limits | Lead: detailed submissions in A; throughput alone does not prove memory fit. Require memory observations and swap/offload status. |

Describe a run with the exact model repository, revision and artifact/hash; architecture and published parameter count (total and active for mixture-of-experts); weight quantisation including mixed tensor types; tokenizer; runtime release/commit and build flags; backend/API and driver; CPU threads; GPU layers/offload split; batch and microbatch size; flash attention; cache precision; concurrency; configured context capacity; actual prompt length, existing context depth and generated length. Record warmup, repetitions, dispersion and whether output is synthetic tokens or an application request. B documents separate prompt and generation modes and these runtime controls. Do not treat configured context capacity as occupied context.

Memory fit must be conditional on that exact run. Use statuses **observed resident**, **observed with offload or swap**, **failed allocation**, and **unknown**. Record reported weight allocation, KV cache, runtime/scratch allocation, peak host and device memory, available memory, and the measurement method. Unified memory is one shared pool: never add it again as separate VRAM. Discrete VRAM and host RAM are separate constraints. Model file size and parameter count alone cannot establish fit; cache grows with context and concurrency, and the OS and other apps also need memory. Do not invent a fixed safety margin or estimate a fit badge from nominal capacity. A failed run establishes failure only for its recorded configuration, not every implementation.

## Software development

| Task | Metric | Likely hardware drivers | Public evidence and comparison boundary |
| --- | --- | --- | --- |
| Clean compile | Elapsed seconds, lower | Core count, sustained thermals, memory, storage | C compilation coverage; match source revision, compiler, flags, target and parallel jobs. |
| Incremental rebuild | Elapsed seconds, lower | Single-core speed, cache, storage | Lead from C; require exact edit and warm-cache definition; never substitute clean compile. |
| Run a test suite | Elapsed seconds, lower | Single-core speed, cores, memory, I/O | Lead from C Python/application testing; pin repository, dependencies, runner and worker count. |
| Build a container image | Elapsed seconds, lower | CPU, storage, RAM, virtualisation | Lead from C system testing; require pinned image layers, cache state and native versus emulated architecture. Exclude network download time or report it separately. |

## Video editing

| Task | Metric | Likely hardware drivers | Public evidence and comparison boundary |
| --- | --- | --- | --- |
| Export a timeline | Elapsed seconds, lower | Media engines, CPU, GPU, thermals | D Premiere/Resolve results; match project, codec/profile, resolution, quality and hardware encode setting. |
| Play a timeline | Playback frames/second and dropped frames | Decode engines, GPU, bandwidth, storage | D NLE workflows; match source codec, effects and playback resolution. |
| Apply effects or grade | Processing frames/second or seconds, keep separate | GPU compute/VRAM, bandwidth, CPU | D Resolve workflows; match effect graph and acceleration path. |

Codec support is a capability field, not a speed score; unsupported paths must not silently fall back into a hardware-accelerated comparison.

## Photography

| Task | Metric | Likely hardware drivers | Public evidence and comparison boundary |
| --- | --- | --- | --- |
| Import and generate previews | Elapsed seconds, lower | Storage, CPU, memory | D Lightroom task lead; require identical RAW files, preview settings and cache. |
| Batch export | Elapsed seconds, lower | Cores, sustained cooling, storage | D Lightroom workflows; match RAW set, output dimensions and compression. |
| AI denoise | Seconds/image, lower | GPU, memory capacity/bandwidth | D application task lead; require exact model/app version and strength setting. |
| Select or mask subjects | Elapsed seconds, lower | GPU/backend, CPU, memory | D Photoshop task lead; require identical images and selection operation. |

## 3D and motion

| Task | Metric | Likely hardware drivers | Public evidence and comparison boundary |
| --- | --- | --- | --- |
| CPU render | Elapsed seconds, lower | Core count, thermals, RAM | C creator coverage lead; Blender Open Data is a further unverified lead. Match scene, engine, samples and version. |
| GPU render | Elapsed seconds or published samples/minute, preserve unit | GPU compute, VRAM, backend | Same leads; keep CPU and GPU tracks separate and identify CUDA/OptiX/Metal or other backend. |
| Navigate a viewport | Frames/second, higher | GPU, CPU scene submission, VRAM | Lead requiring public scene-level results; render throughput is not a proxy. Pin scene, display size and shading mode. |
| Preview/export motion graphics | Preview frames/second or export seconds | RAM, CPU, GPU, storage cache | D After Effects explicitly covers preview, export and tracking; pin project and cache state. |

## Music and audio

| Task | Metric | Likely hardware drivers | Public evidence and comparison boundary |
| --- | --- | --- | --- |
| Mix with effects | Maximum stable plugin instances | CPU cores, single-core speed, scheduling | E DAWBench DSP lead; match plugin version, session, buffer and sample rate. |
| Play sampled instruments | Maximum stable voices | CPU, RAM, storage streaming | E DAWBench instrument lead; pin library and preload settings. |
| Record/monitor at low latency | Measured round-trip milliseconds and dropout status | Driver/interface, real-time CPU, scheduling | Lead from E; require interface, driver, buffer and sample rate. Buffer size alone is not measured latency. |

## Data science

| Task | Metric | Likely hardware drivers | Public evidence and comparison boundary |
| --- | --- | --- | --- |
| Transform/join a dataframe | Elapsed seconds, lower | RAM capacity/bandwidth, CPU, storage | Lead from C database/Python coverage; pin dataset, operations, library and threading. |
| Execute a notebook pipeline | Elapsed seconds, lower | CPU, memory, accelerator, I/O | Lead from C; pin notebook revision and inputs, exclude downloads, distinguish warm kernel. |
| Train a model to a target | Time to specified quality, lower | GPU compute/VRAM, bandwidth, CPU feed | F public training results; preserve dataset, quality target, precision, software and accelerator count. Server submissions are not laptop evidence. |

## Gaming

| Task | Metric | Likely hardware drivers | Public evidence and comparison boundary |
| --- | --- | --- | --- |
| Play a GPU-heavy scene | Average frames/second, higher | GPU, VRAM, thermals | Lead: Phoronix gaming coverage via C; require game patch, scene, resolution, preset and API. |
| Play a CPU-heavy scene | Average frames/second, higher | CPU single-core speed, cache, RAM | Same lead; keep scene and settings fixed; do not infer CPU rankings across different GPUs. |
| Avoid stutters | Published low-percentile FPS or frame-time percentile in milliseconds | CPU, shader cache, storage, VRAM | Same lead; retain publisher's percentile definition and sampling duration. Match upscaling, ray tracing and frame generation; generated frames need a separate series. |

## Everyday use

| Task | Metric | Likely hardware drivers | Public evidence and comparison boundary |
| --- | --- | --- | --- |
| Interact with web apps | Published Speedometer score, higher | CPU responsiveness, browser engine, memory | G defines the workload; public machine submissions/reviews still needed. Compare identical benchmark and browser versions. |
| Use graphics-heavy web pages | Published MotionMark score, higher | GPU, browser compositor, display | G task lead; pin browser, display resolution and refresh conditions. |
| Browse unplugged | Runtime hours under a defined browsing loop | Battery capacity, display, platform power efficiency | Lead requiring device reviews; pin brightness, network, browser, battery health and loop. No chip-only battery ranking. |

## Source access log

All successful pages below were opened on 2026-11-10. No benchmark values are copied. Locations identify evidence for workload availability, not permission to scrape or proof that every proposed task already has compatible results.

- **A — ggml-org / community**, [Apple Silicon performance discussion](https://github.com/ggml-org/llama.cpp/discussions/4167), opening Summary table and linked submissions: public prompt/generation columns, quantisation and commit context. Community reports need individual verification.
- **B — ggml-org**, [llama-bench README](https://raw.githubusercontent.com/ggml-org/llama.cpp/master/tools/llama-bench/README.md), Syntax and Examples: run controls and output definitions. Documentation, not independently validated device evidence.
- **C — Phoronix / Michael Larabel**, [Ryzen Linux workload review](https://www.phoronix.com/review/amd-ryzen-9950x-9900x), introductory workload description and system setup: compilation, Python, database and creator coverage. Task-level charts must be opened before collection; broad coverage is only a lead for the proposed subcases.
- **D — Puget Systems**, [Puget Bench for Creators](https://www.pugetsystems.com/pugetbench/creators/), Benchmark Applications and Browse Results: public application results; After Effects preview/export/tracking explicitly named. Collect task metrics where exposed, never relabel an overall score as seconds. Detailed import, denoise and masking availability remains to verify.
- **E — Scan Pro Audio**, [DAWBench archive](https://www.scanproaudio.info/tag/dawbench/), linked testing articles: public audio testing leads. Open each article and verify session methodology before admitting values.
- **F — MLCommons**, [MLPerf Training](https://mlcommons.org/benchmarks/training/), benchmark description and results navigation: training evidence lead. Match benchmark division, rules and release; do not compare unlike systems as chip-only results.
- **G — BrowserBench maintainers**, [BrowserBench](https://browserbench.org/), benchmark descriptions: responsiveness, scripting and graphics task definitions. This landing page is not a machine-results database.

Blender Open Data and OpenBenchmarking landing pages could not be read through the research tool (payment/access errors); DAWBench's own site was also inaccessible. They remain unverified leads, with no claimed numbers or verified coverage here. Battery, container builds, incremental builds, notebook execution and viewport results need stronger task-specific sources before collection.

## Proposed site grouping

Keep every profession in VISION as its own entry: Local AI, Software development, Video editing, Photography, 3D and motion, Music and audio, Data science, Gaming, Everyday use. Start collection with local AI prompt processing, generation and observed memory fit; expose latency only when complete public requests are documented.

Within a profession, group results by the task above, then application/benchmark and version, then compatible input/settings. Share a workload between professions when appropriate (for example model training and AI), rather than duplicating results. Give every task a stable identifier independent of display copy. Keep capability facts, memory fit, device battery tests and timed/throughput results distinct.

Show the original metric and direction, with visible source and comparison context. Let a user choose a task; do not produce an overall profession score or weight unrelated tasks together. Mark unsupported, unknown and incomparable separately. This is a taxonomy and collection proposal, not a new visual direction or schema implementation. Gardener review should settle which task leads to pursue before workload collection begins.
