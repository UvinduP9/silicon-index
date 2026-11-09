# Silicon Index

A better way to read Apple Silicon benchmarks.

Silicon Index collects published benchmark results (Geekbench, Cinebench, Blender and others) for Apple's M-series chips and the Macs that ship them, and presents them in a way that is pleasant to explore. We don't run benchmarks ourselves; every number links back to its source.

Two audiences, in priority order:

1. People who want the raw data: single-core, multi-core, GPU, memory bandwidth, per-generation trends and head-to-head comparisons.
2. People who want an answer: "This is my workload. What should I buy?"

The data model is chip-agnostic so non-Apple processors can be added later.

## Status

Design exploration. See `design/`.

## Skills

`.claude/skills/frontend-design` is Anthropic's frontend-design skill, vendored from [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) under the Apache 2.0 license (see its `LICENSE.txt`).
