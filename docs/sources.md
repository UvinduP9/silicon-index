# Benchmark and workload source catalogue

Research checked on 2026-11-10 by Codex (GPT-6.1 Sol). This is a collection plan, not a dataset. No benchmark results were collected. Coverage descriptions are source-level; they do not imply every chip or operating system has comparable results. There are no issue dependencies listed in #5.

## Collection and permission rules

Public visibility and robots permission do not grant redistribution rights. “Manual candidate” below means review the applicable terms before transcribing individual facts with citations; it is not a legal clearance. “Hold” means no collection until the identified access or permission gap is resolved. No source below is approved for bulk import in this research pass. Check robots for the actual hostname, path and collection agent again before collection; do not bypass blocks. Software licences do not automatically license user comments or hosted result databases.

For each future observation record publisher, exact result URL and page section/table, access date, result date, benchmark and software version, chip configuration, device, OS, backend, power mode/limit and sample count (or “single result”). Missing context stays missing. Distinguish advertised power from measured workload power. Keep CPU/GPU, native/emulated execution, benchmark versions and workload settings separate. Never average incompatible runs or create a composite score. Deduplicate reposted runs.

## Core benchmarks and reviewer databases

### Geekbench Browser — Primate Labs

[Browser](https://browser.geekbench.com/) measures CPU single/multicore and GPU compute. The opened homepage currently presents Geekbench 7; preserve Geekbench 6 as a separate series and use its version-specific result pages. Apple, Intel, AMD and Qualcomm coverage depends on submitted devices and supported APIs. Recent-result feeds provide freshness, but chart updates and submission dates must be checked individually.

Collection: manual result pages and version-specific charts; no public bulk export or reuse licence verified. [Terms endpoint](https://www.geekbench.com/terms/) returned an access block. [Robots](https://browser.geekbench.com/robots.txt) allows general access with content signals restricting training and reserving reference use, and disallows named training crawlers. **Hold for dataset reuse clarification**, then consider small manual collection. Community submissions can contain overclocks, engineering samples and misidentified devices; chart aggregates and single submissions have different sample semantics. Device/OS/configuration may be visible; sustained power generally requires another source.

### Cinebench results in independent reviews — reviewer is the data publisher

[Cinebench](https://www.maxon.net/en/cinebench) is Maxon's rendering benchmark; the product page was blocked during this pass. Obtain published CPU/GPU results from the original review, such as [Notebookcheck](https://www.notebookcheck.net/), rather than assuming Maxon hosts an open results dataset. Coverage and freshness follow the review's hardware and publication date. Keep each release, CPU/GPU mode, run duration and thermal mode separate.

Collection: manually read the review's benchmark table and methodology. **Manual candidate under that review publisher's terms and robots**, not Maxon's software licence. No bulk import permission established. Single review samples and short versus sustained runs can differ substantially; require device, RAM, power profile and benchmark version. Review selection is not representative market sampling.

### Blender Open Data — Blender Foundation

[Open Data](https://opendata.blender.org/) is the candidate for CPU/GPU rendering across vendors supported by Blender backends. The homepage could not be retrieved (access blocked), so current export format, licence, API, update cadence and available metadata remain unverified. Do not treat the name “Open Data” as permission.

Collection: **hold** pending opening the site's data/download and licence documentation. Prefer a documented downloadable dataset if its licence permits redistribution; otherwise review individual results only after permission review. [Robots](https://opendata.blender.org/robots.txt) was readable and carries reference-use/training restrictions and named crawler exclusions. Preserve Blender/benchmark version, scene, backend, device selection and submission count. User submissions can overrepresent tuned systems; CPU and GPU results are different measurements, and power metadata must be checked rather than assumed.

### Puget Bench — Puget Systems

[Creators overview](https://www.pugetsystems.com/pugetbench/creators/) links a results browser and describes professional video, photography, VFX and motion graphics workloads. Vendor/chip coverage is whatever the supported applications and submitted systems expose; confirm Apple and Windows comparability per benchmark. Freshness follows application/benchmark releases and result dates.

Collection: manual results browser and methodology pages; no redistributable dump/API verified. [Robots](https://www.pugetsystems.com/robots.txt) was blocked; applicable results-service terms still need review. **Hold** until those are checked. Application, benchmark and plugin versions, presets, media, GPU acceleration and RAM matter. Overall suite scores are publisher scores, not universal cross-version scales; prefer clearly specified subtests. Submitted and vendor-tested results must be distinguished; sample counts and power profiles may be absent.

### Notebookcheck — Notebookcheck Publishing

[Reviews and benchmark portal](https://www.notebookcheck.net/) provides laptop/device reviews, CPU/GPU tables and workload/battery tests. Useful for Apple, Intel, AMD and Qualcomm device context, subject to actual tested configurations. New reviews provide ongoing coverage; older database rows may use older software or methodology.

Collection: manually read original device review and table notes. [Robots](https://www.notebookcheck.net/robots.txt) disallows battery-service and CDN challenge paths; that does not license database copying. Terms/republication permission remains unverified: **manual candidate after terms review; no bulk import**. Preserve min/average/max meanings and linked devices rather than treating a chip aggregate as a single run. Reviews often provide power/thermal context, but verify the mode for the particular test. Device selection and review-unit variation remain biases.

### OpenBenchmarking.org / Phoronix — Phoronix Media and contributors

[Portal](https://openbenchmarking.org/) was blocked. Candidate source for existing CPU/GPU, compile, scientific, browser and application workloads, especially Linux on Intel/AMD; Apple/Qualcomm coverage and native support must be verified per result. Freshness depends on test profile versions and uploaded runs, not merely the article date.

Collection: **hold** until result pages, export/API documentation and hosted-data terms are accessible. Do not infer dataset rights from the Phoronix Test Suite software licence. [Robots](https://openbenchmarking.org/robots.txt) exposes reference-use/training restrictions and crawler exclusions. Prefer documented result exports if licensed. Require profile version, command options, OS/kernel, compiler, driver, hardware and repetitions. Public uploads and editorial comparisons differ in control quality; missing power limits weaken laptop comparisons. We will not execute test profiles.

### 3DMark — UL Solutions

[Results portal](https://www.3dmark.com/) links shared results and currently advertises macOS availability. CPU/GPU and gaming-oriented synthetic coverage depends on the named test and platform; never assume all subtests exist on every vendor. Submissions and benchmark releases provide freshness.

Collection: manual linked result pages; no reusable bulk dataset/API verified. [Robots endpoint](https://www.3dmark.com/robots.txt) returned a page-not-found HTML document rather than usable robots rules. **Hold** pending UL website/results terms and valid robots check. Separate graphics, CPU and overall scores, API, test version, resolution and validity status. Leaderboards overrepresent overclocked systems; power, cooling and device identification need verification. Synthetic scores cannot substitute for game frame rates.

## Community workload sources

GitHub-hosted sources below share [GitHub terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) and [robots](https://github.com/robots.txt). Terms were opened; robots prefers API access and restricts paths and agents. Use permitted individual pages or the documented GitHub API with its rate limits; no HTML crawl. Public content visibility is not a blanket licence to republish a contributor's tables. Review repository licences and obtain permission where result reuse is unclear. Default status: manual candidate after that check, no bulk import.

### llama.cpp performance discussions — ggml-org and individual contributors

[Apple Silicon performance thread](https://github.com/ggml-org/llama.cpp/discussions/4167) contains community measurements. [Discussion index](https://github.com/ggml-org/llama.cpp/discussions) is the discovery entry for other CPU/GPU platforms, including Intel/AMD and potentially Qualcomm; no single non-Apple thread was verified as a stable canonical catalogue. Coverage is participant-driven and freshness is per comment, not thread creation.

Collection: cite the exact comment permalink, author and date; manually select complete reports. Require model identity, quantization, prompt/generation lengths, batch/context size, backend, offload, memory, threads and llama.cpp revision. Prompt processing and generation are separate metrics. Repeated posts may be the same run; sample count, device power and thermal state are often incomplete. Prioritize reproducible methodology over fastest submissions.

### MLX community — ml-explore and community publishers

[MLX examples](https://github.com/ml-explore/mlx-examples) provides implementation context; [MLX community](https://huggingface.co/mlx-community) is a model/community discovery source, not a standardized results database. Apple Silicon local inference/training is the relevant scope; no cross-vendor equivalence is implied. Model cards and repository activity can change independently of measurements.

Collection: manual model-card or discussion result permalinks, with explicit publisher and date. GitHub policy applies to GitHub content; Hugging Face terms/robots and each model card's result rights still need checking before collecting there (**hold for Hugging Face results**). Software/model licences alone do not establish benchmark-table rights. Require MLX version, model revision, quantization, memory, batch/context and token settings; memory fit and inference speed are separate observations. Do not manufacture results from example code.

### XcodeBenchmark — devMEremenko and contributors

[Repository and results table](https://github.com/devMEremenko/XcodeBenchmark) measures compilation time on Macs, including Apple Silicon and Intel Macs. Freshness varies by contributed row and Xcode version; it is not a cross-platform developer benchmark.

Collection: manually cite the table section and pinned repository revision after licence review under the shared GitHub policy. Require Xcode/macOS version, benchmark revision, RAM, device and clean-build conditions. Community rows may represent single runs and omit power/thermal state. Never combine different Xcode/toolchain generations into one timing scale.

### DAWbench — DAWbench publishers and linked testers

[DAWbench](https://www.dawbench.com/) was opened as a candidate for music/audio testing and methodology. Use existing published tester results, not benchmark downloads, to investigate track/plugin capacity and low-latency behavior. Current vendor coverage, result freshness, terms and robots were not established: **hold**, no bulk collection.

Manual follow-up must locate an original dated result and publisher permission. Require DAW, plugin versions, audio interface/driver, sample rate, buffer size, OS and dropout criterion. Plugin count is workload-specific and cannot be treated as generic CPU throughput; Apple/Windows comparability needs explicit matching tests.

## Official hardware specifications

These sources establish identity and advertised capabilities, not measured benchmark performance. Freshness follows product launches and corrections; retain exact SKU and access date. Advertised maximum clocks and power envelopes are not observed sustained behavior. None establishes benchmark sample counts.

### Apple tech specs — Apple

[Manuals and specifications index](https://support.apple.com/en-us/docs) links device specifications. Covers Apple devices and their chip bins; historic Intel Macs may also be useful. Manually open the precise model-year spec page, including configurable options. [Apple site terms](https://www.apple.com/legal/internet-services/terms/site.html) restrict automated copying; [www robots](https://www.apple.com/robots.txt) is host-specific and does not cover support.apple.com. **Manual candidate after support-host policy check; no bulk import.** Distinguish available configurations from the configuration actually benchmarked; power figures may be absent.

### Intel ARK — Intel

[Product specifications](https://www.intel.com/content/www/us/en/ark.html) identifies Intel processor/graphics SKUs and advertised specifications. Manually read exact product pages. [Robots](https://www.intel.com/robots.txt) has agent-specific permissions and path exclusions; website reuse terms remain to be checked. **Manual candidate after terms review; no bulk approval.** Product power definitions do not identify an OEM laptop's chosen limits. Preserve suffixes, generation and graphics configuration; specifications are not measurements.

### AMD product pages — AMD

[Processor specifications](https://www.amd.com/en/products/specifications/processors.html) is the official processor lookup; follow exact SKU pages for configuration and power definitions, and separate GPU product pages when needed. Freshness is product-dependent. Manual collection only after terms review; [robots](https://www.amd.com/robots.txt) timed out during this pass, so **hold** until it can be checked. Advertised configurable power does not prove a reviewed device used that setting; mobile, desktop and OEM variants must remain distinct.

### Qualcomm product pages — Qualcomm

[PC platform entry](https://www.qualcomm.com/products/mobile/snapdragon/pcs-and-tablets) returned not found; the [Snapdragon X Elite candidate](https://www.qualcomm.com/products/mobile/snapdragon/pcs-and-tablets/snapdragon-x-elite) and [robots](https://www.qualcomm.com/robots.txt) were blocked. **Hold** until current canonical product pages, terms and robots are accessible. Intended use is official Snapdragon PC SKU/configuration metadata, not vendor performance claims. Coverage, update date and detailed power reporting are unverified. Require exact SKU and OEM device; do not infer sustained power or application compatibility from platform branding.

## Recommendations and collection order

These are priorities after permission/access gates, not authorization to ingest.

| Area | First choices | Conditions / gaps |
| --- | --- | --- |
| Core CPU | Geekbench version-specific results; reviewer Cinebench | Resolve reuse rights; separate versions and sustained modes. |
| Core GPU | Blender Open Data; Geekbench compute; 3DMark | Verify Blender licence/export first; retain backend and test identity. |
| Local AI | llama.cpp Apple thread and other platform discussions; MLX reports | Highest workload priority; select complete model/settings reports, investigate canonical non-Apple threads. |
| Software development | XcodeBenchmark; existing OpenBenchmarking compile results | Xcode is Mac-only; Linux builds need matching toolchain and source revisions. |
| Video editing | Puget Bench and original device reviews | Match application, codec, acceleration and export preset. |
| Photography | Puget Bench and original device reviews | Match import/export/denoise task, image set and application version. |
| 3D and motion | Blender; Puget Bench | Separate rendering from viewport/motion tasks; do not substitute one for another. |
| Music and audio | DAWbench-linked original testers | Permission and current results discovery outstanding; buffer/driver context mandatory. |
| Data science | Existing OpenBenchmarking scientific/ML profiles; MLX training reports | Notebook/dataframe coverage is still a gap; training and inference are separate. |
| Gaming | Notebookcheck game tests; 3DMark as a separate synthetic view | Require game/version, resolution, quality, upscaling and device power. |
| Everyday use | Notebookcheck battery/browser/device tests | Match brightness, battery capacity, browser and workload; no universal responsiveness score. |

Start with source permission checks and official SKU/device identity pages. Next establish versioned CPU and GPU reference measurements with clear provenance. Then prioritize local AI, beginning with complete Apple Silicon reports and explicitly searching for comparable Intel, AMD and Qualcomm reports. Follow with developer, creator, gaming and everyday workloads; investigate audio and data-science gaps before promising coverage. Hardware absent from a source remains a gap, never an estimated row.

Follow-ups: establish a durable per-source reuse decision and terms evidence; resolve blocked pages and canonical Qualcomm links; verify Blender/OpenBenchmarking export licences and schemas; find specific non-Apple llama.cpp threads and current DAW/dataframe results. No benchmark execution, scraping job or data import belongs to this issue.
