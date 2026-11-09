// Prototype data for design exploration only.
// Single-core numbers for base chips come from the Notebookcheck table the
// project started from. Everything else is approximate, and values marked
// est: true are placeholders for chips without solid public numbers yet.
// Benchmark: Geekbench 6 (CPU, Metal). Bandwidth in GB/s, memory in GB.
window.SI = {
  benchmark: "Geekbench 6",
  metrics: [
    { id: "sc", label: "Single-core", unit: "pts", short: "Single" },
    { id: "mc", label: "Multi-core", unit: "pts", short: "Multi" },
    { id: "gpu", label: "GPU (Metal)", unit: "pts", short: "GPU" },
    { id: "bw", label: "Memory bandwidth", unit: "GB/s", short: "Bandwidth" },
  ],
  tiers: [
    { id: "base", label: "Base" },
    { id: "pro", label: "Pro" },
    { id: "max", label: "Max" },
    { id: "ultra", label: "Ultra" },
  ],
  gens: [
    { gen: 1, label: "M1", year: 2020, node: "5 nm" },
    { gen: 2, label: "M2", year: 2022, node: "5 nm" },
    { gen: 3, label: "M3", year: 2023, node: "3 nm" },
    { gen: 4, label: "M4", year: 2024, node: "3 nm" },
    { gen: 5, label: "M5", year: 2025, node: "3 nm" },
    { gen: 6, label: "M6", year: 2026, node: "2 nm" },
  ],
  chips: [
    { id: "m1", name: "M1", gen: 1, tier: "base", year: 2020, pc: 4, ec: 4, gpuc: 8, bw: 68, mem: 16, sc: 2386, mc: 8350, gpu: 33000, devices: ["MacBook Air", "13\" MacBook Pro", "Mac mini", "iMac"] },
    { id: "m1-pro", name: "M1 Pro", gen: 1, tier: "pro", year: 2021, pc: 8, ec: 2, gpuc: 16, bw: 200, mem: 32, sc: 2400, mc: 12350, gpu: 64000, devices: ["14\" MacBook Pro", "16\" MacBook Pro"] },
    { id: "m1-max", name: "M1 Max", gen: 1, tier: "max", year: 2021, pc: 8, ec: 2, gpuc: 32, bw: 400, mem: 64, sc: 2410, mc: 12500, gpu: 110000, devices: ["14\" MacBook Pro", "16\" MacBook Pro", "Mac Studio"] },
    { id: "m1-ultra", name: "M1 Ultra", gen: 1, tier: "ultra", year: 2022, pc: 16, ec: 4, gpuc: 64, bw: 800, mem: 128, sc: 2420, mc: 18300, gpu: 155000, devices: ["Mac Studio"] },
    { id: "m2", name: "M2", gen: 2, tier: "base", year: 2022, pc: 4, ec: 4, gpuc: 10, bw: 100, mem: 24, sc: 2610, mc: 9700, gpu: 45000, devices: ["MacBook Air", "13\" MacBook Pro", "Mac mini"] },
    { id: "m2-pro", name: "M2 Pro", gen: 2, tier: "pro", year: 2023, pc: 8, ec: 4, gpuc: 19, bw: 200, mem: 32, sc: 2650, mc: 14600, gpu: 82000, devices: ["14\" MacBook Pro", "16\" MacBook Pro", "Mac mini"] },
    { id: "m2-max", name: "M2 Max", gen: 2, tier: "max", year: 2023, pc: 8, ec: 4, gpuc: 38, bw: 400, mem: 96, sc: 2700, mc: 14900, gpu: 140000, devices: ["14\" MacBook Pro", "16\" MacBook Pro", "Mac Studio"] },
    { id: "m2-ultra", name: "M2 Ultra", gen: 2, tier: "ultra", year: 2023, pc: 16, ec: 8, gpuc: 76, bw: 800, mem: 192, sc: 2760, mc: 21400, gpu: 220000, devices: ["Mac Studio", "Mac Pro"] },
    { id: "m3", name: "M3", gen: 3, tier: "base", year: 2023, pc: 4, ec: 4, gpuc: 10, bw: 100, mem: 24, sc: 3135, mc: 11700, gpu: 48000, devices: ["MacBook Air", "14\" MacBook Pro", "iMac"] },
    { id: "m3-pro", name: "M3 Pro", gen: 3, tier: "pro", year: 2023, pc: 6, ec: 6, gpuc: 18, bw: 150, mem: 36, sc: 3110, mc: 15300, gpu: 75000, devices: ["14\" MacBook Pro", "16\" MacBook Pro"] },
    { id: "m3-max", name: "M3 Max", gen: 3, tier: "max", year: 2023, pc: 12, ec: 4, gpuc: 40, bw: 400, mem: 128, sc: 3150, mc: 21000, gpu: 155000, devices: ["14\" MacBook Pro", "16\" MacBook Pro"] },
    { id: "m3-ultra", name: "M3 Ultra", gen: 3, tier: "ultra", year: 2025, pc: 24, ec: 8, gpuc: 80, bw: 819, mem: 512, sc: 3220, mc: 27700, gpu: 260000, devices: ["Mac Studio"] },
    { id: "m4", name: "M4", gen: 4, tier: "base", year: 2024, pc: 4, ec: 6, gpuc: 10, bw: 120, mem: 32, sc: 3830, mc: 14900, gpu: 57000, devices: ["MacBook Air", "14\" MacBook Pro", "Mac mini", "iMac"] },
    { id: "m4-pro", name: "M4 Pro", gen: 4, tier: "pro", year: 2024, pc: 10, ec: 4, gpuc: 20, bw: 273, mem: 64, sc: 3900, mc: 22500, gpu: 112000, devices: ["14\" MacBook Pro", "16\" MacBook Pro", "Mac mini"] },
    { id: "m4-max", name: "M4 Max", gen: 4, tier: "max", year: 2024, pc: 12, ec: 4, gpuc: 40, bw: 546, mem: 128, sc: 3960, mc: 25800, gpu: 190000, devices: ["14\" MacBook Pro", "16\" MacBook Pro", "Mac Studio"] },
    { id: "m5", name: "M5", gen: 5, tier: "base", year: 2025, pc: 4, ec: 6, gpuc: 10, bw: 153, mem: 32, sc: 4227, mc: 17800, gpu: 74000, devices: ["14\" MacBook Pro", "MacBook Air"] },
    { id: "m5-pro", name: "M5 Pro", gen: 5, tier: "pro", year: 2026, pc: 5, ec: 10, gpuc: 20, bw: 307, mem: 64, sc: 4260, mc: 26000, gpu: 130000, est: true, devices: ["14\" MacBook Pro", "16\" MacBook Pro", "Mac mini"] },
    { id: "m5-max", name: "M5 Max", gen: 5, tier: "max", year: 2026, pc: 6, ec: 12, gpuc: 40, bw: 614, mem: 128, sc: 4300, mc: 30500, gpu: 230000, est: true, devices: ["14\" MacBook Pro", "16\" MacBook Pro", "Mac Studio"] },
    { id: "m5-ultra", name: "M5 Ultra", gen: 5, tier: "ultra", year: 2026, pc: 12, ec: 24, gpuc: 80, bw: 1228, mem: 512, sc: 4290, mc: 41000, gpu: 380000, est: true, devices: ["Mac Studio"] },
    { id: "m6", name: "M6", gen: 6, tier: "base", year: 2026, pc: 4, ec: 8, gpuc: 12, bw: 180, mem: 32, sc: 4661, mc: 22000, gpu: 92000, est: true, devices: ["Mac mini", "14\" MacBook Pro"] },
  ],
  // Non-M-series chips shown for scale. Proves the model is not Apple-only.
  references: [
    { id: "a18-pro", name: "A18 Pro", maker: "Apple", note: "MacBook Neo", pc: 2, ec: 4, gpuc: 5, bw: 60, mem: 8, sc: 3461, mc: 8668, gpu: 27000, est: true },
    { id: "ultra9-285hx", name: "Core Ultra 9 285HX", maker: "Intel", note: "Top laptop CPU", pc: 8, ec: 16, gpuc: null, bw: 90, mem: 192, sc: 3124, mc: 22215, gpu: null },
  ],
  // Combinations Apple never made or hasn't released, so empty slots can say why.
  gaps: { "4-ultra": "Not made", "6-pro": "Not released yet", "6-max": "Not released yet", "6-ultra": "Not released yet" },
};
