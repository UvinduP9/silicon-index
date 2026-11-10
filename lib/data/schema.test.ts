import { describe, expect, it } from "vitest";
import { loadData } from "./index";
import { datasetSchema } from "./schema";

// Synthetic fixtures only. These values describe no real hardware or results.
const citation = {
  sourceId: "fixture-source",
  locator: "Synthetic test table",
};
const fact = { value: 4, citation };
const fixture = {
  vendors: [{ id: "fixture-vendor", name: "Fixture vendor" }],
  families: [
    {
      id: "fixture-family",
      name: "Fixture family",
      vendorId: "fixture-vendor",
      generation: "Fixture generation",
      tier: "Fixture tier",
    },
  ],
  configurations: [
    {
      id: "fixture-config",
      name: "Fixture configuration",
      familyId: "fixture-family",
      cores: [{ kind: "cpu-performance", count: fact }],
    },
  ],
  devices: [
    {
      id: "fixture-device",
      name: "Fixture device",
      configurationId: "fixture-config",
      cooling: "active",
      powerLimitWatts: fact,
    },
  ],
  benchmarks: [
    {
      id: "fixture-benchmark-v1",
      name: "Fixture benchmark",
      version: "1",
      metric: "single-core",
      unit: "points",
      higherIsBetter: true,
    },
  ],
  workloads: [
    {
      id: "fixture-ai-v1",
      name: "Fixture AI",
      version: "1",
      profession: "Local AI",
      task: "Generate with synthetic model and quantization",
      application: "Fixture application",
      metric: "generation",
      unit: "tokens/s",
      higherIsBetter: true,
    },
  ],
  sources: [
    {
      id: "fixture-source",
      name: "Fixture",
      url: "https://example.com/fixture",
      publisher: "Synthetic",
      title: "Not real data",
      accessedDate: "2026-11-10",
      termsNote: "Tests only",
    },
  ],
  results: [
    {
      id: "fixture-result",
      target: { kind: "device", id: "fixture-device" },
      measurement: { kind: "benchmark", id: "fixture-benchmark-v1" },
      value: 100,
      citation,
      sample: { kind: "single-result" },
    },
  ],
};
describe("data validation", () => {
  it("loads the production files", () =>
    expect(loadData().results).toEqual([]));
  it("accepts a connected fixture", () =>
    expect(datasetSchema.safeParse(fixture).success).toBe(true));
  it("accepts workload measurements", () => {
    const data = structuredClone(fixture);
    data.results[0]!.measurement = { kind: "workload", id: "fixture-ai-v1" };
    expect(datasetSchema.safeParse(data).success).toBe(true);
  });
  it("rejects every dangling reference", () => {
    for (const key of [
      "vendors",
      "families",
      "configurations",
      "devices",
      "benchmarks",
      "sources",
    ] as const) {
      expect(
        datasetSchema.safeParse({ ...fixture, [key]: [] }).success,
        key,
      ).toBe(false);
    }
  });
  it("rejects missing citations, estimates, duplicate IDs and invalid values", () => {
    const result = fixture.results[0]!;
    for (const patch of [
      { citation: undefined },
      { estimate: true },
      { value: -1 },
      { value: Infinity },
      { sample: { kind: "aggregate", count: 1, method: "median" } },
    ]) {
      expect(
        datasetSchema.safeParse({
          ...fixture,
          results: [{ ...result, ...patch }],
        }).success,
      ).toBe(false);
    }
    expect(
      datasetSchema.safeParse({
        ...fixture,
        sources: [...fixture.sources, ...fixture.sources],
      }).success,
    ).toBe(false);
  });
});

it("validates new hardware rules using synthetic facts only", () => {
  const config = fixture.configurations[0]!;
  const check = (patch: object) =>
    datasetSchema.safeParse({
      ...fixture,
      configurations: [{ ...config, ...patch }],
    }).success;
  expect(
    check({
      maximumMemoryGB: fact,
      memoryBandwidthGBs: fact,
      processNode: { value: "Synthetic process", citation },
      releaseDate: { value: "2026-01-01", citation },
      powerWatts: { min: fact, max: fact },
    }),
  ).toBe(true);
  for (const patch of [
    { cores: [{ kind: "unknown", count: fact }] },
    { processNode: { value: "Synthetic process" } },
    { releaseDate: { value: "2026-01-01" } },
    { releaseDate: { value: "invalid", citation } },
    { powerWatts: { min: { value: 5, citation }, max: fact } },
    {
      availability: {
        status: "not-made",
        reason: "Synthetic absence",
        note: "Test only",
      },
    },
  ])
    expect(check(patch)).toBe(false);
  expect(
    datasetSchema.safeParse({
      ...fixture,
      devices: [{ ...fixture.devices[0], cooling: "unknown" }],
    }).success,
  ).toBe(false);
  for (const kind of ["device", "configuration"]) {
    expect(
      datasetSchema.safeParse({
        ...fixture,
        families: [
          {
            ...fixture.families[0],
            availability: {
              status: "not-made",
              reason: "Synthetic absence",
              note: "Test only",
            },
          },
        ],
        results: [
          {
            ...fixture.results[0],
            target: {
              kind,
              id: kind === "device" ? "fixture-device" : "fixture-config",
            },
          },
        ],
      }).success,
    ).toBe(false);
  }
});
