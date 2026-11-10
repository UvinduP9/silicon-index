import { z } from "zod";

const text = z.string().trim().min(1);
const id = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const base = { id, name: text };
const positive = z.number().finite().positive();
const citation = z.strictObject({ sourceId: id, locator: text });
const fact = z.strictObject({ value: positive, citation });
const textFact = z.strictObject({ value: text, citation });
const dateFact = z.strictObject({ value: z.iso.date(), citation });
const availability = z.discriminatedUnion("status", [
  z.strictObject({ status: z.literal("made") }),
  z.strictObject({
    status: z.literal("not-made"),
    reason: text,
    note: text,
    citation: citation.optional(),
  }),
]);
const powerRange = z
  .strictObject({ min: fact, max: fact })
  .refine((r) => r.min.value <= r.max.value, {
    message: "Minimum power must not exceed maximum",
  });
const metric = { metric: text, unit: text, higherIsBetter: z.boolean() };
export const vendorSchema = z.strictObject(base);
export const familySchema = z.strictObject({
  ...base,
  vendorId: id,
  generation: text,
  tier: text,
  availability: availability.optional(),
});
export const configurationSchema = z.strictObject({
  ...base,
  familyId: id,
  cores: z
    .array(
      z.strictObject({
        kind: z.enum([
          "cpu-performance",
          "cpu-efficiency",
          "cpu-low-power-efficiency",
          "cpu-dense",
          "gpu",
          "neural-engine",
        ]),
        count: fact,
      }),
    )
    .min(1),
  powerWatts: powerRange.optional(),
  maximumMemoryGB: fact.optional(),
  memoryBandwidthGBs: fact.optional(),
  processNode: textFact.optional(),
  releaseDate: dateFact.optional(),
  availability: availability.optional(),
});
export const deviceSchema = z.strictObject({
  ...base,
  configurationId: id,
  cooling: z.enum(["fanless", "active"]),
  powerLimitWatts: fact.optional(),
});
export const benchmarkSchema = z.strictObject({
  ...base,
  version: text,
  ...metric,
});
export const workloadSchema = z.strictObject({
  ...base,
  profession: text,
  task: text,
  application: text,
  version: text,
  ...metric,
});
export const sourceSchema = z.strictObject({
  ...base,
  url: z.url().refine((url) => /^https?:/.test(url)),
  publisher: text,
  title: text,
  accessedDate: z.iso.date(),
  termsNote: text,
});
export const resultSchema = z.strictObject({
  id,
  target: z.discriminatedUnion("kind", [
    z.strictObject({ kind: z.literal("configuration"), id }),
    z.strictObject({ kind: z.literal("device"), id }),
  ]),
  measurement: z.discriminatedUnion("kind", [
    z.strictObject({ kind: z.literal("benchmark"), id }),
    z.strictObject({ kind: z.literal("workload"), id }),
  ]),
  value: positive,
  citation,
  sample: z.discriminatedUnion("kind", [
    z.strictObject({ kind: z.literal("single-result") }),
    z.strictObject({
      kind: z.literal("aggregate"),
      count: z.number().int().min(2),
      method: text,
    }),
  ]),
  powerWatts: fact.optional(),
  softwareVersion: text.optional(),
  notes: text.optional(),
});
export const datasetSchema = z
  .strictObject({
    vendors: z.array(vendorSchema),
    families: z.array(familySchema),
    configurations: z.array(configurationSchema),
    devices: z.array(deviceSchema),
    benchmarks: z.array(benchmarkSchema),
    workloads: z.array(workloadSchema),
    results: z.array(resultSchema),
    sources: z.array(sourceSchema),
  })
  .superRefine((data, ctx) => {
    const ids = Object.fromEntries(
      Object.entries(data).map(([key, rows]) => {
        const seen = new Set<string>();
        rows.forEach((row, index) => {
          if (seen.has(row.id))
            ctx.addIssue({
              code: "custom",
              path: [key, index, "id"],
              message: `Duplicate ${key} ID: ${row.id}`,
            });
          seen.add(row.id);
        });
        return [key, seen];
      }),
    );
    function ref(collection: string, value: string, path: (string | number)[]) {
      if (!ids[collection]?.has(value))
        ctx.addIssue({
          code: "custom",
          path,
          message: `Unknown ${collection} ID: ${value}`,
        });
    }
    data.families.forEach((r, i) =>
      ref("vendors", r.vendorId, ["families", i, "vendorId"]),
    );
    data.configurations.forEach((r, i) =>
      ref("families", r.familyId, ["configurations", i, "familyId"]),
    );
    data.devices.forEach((r, i) =>
      ref("configurations", r.configurationId, [
        "devices",
        i,
        "configurationId",
      ]),
    );
    data.results.forEach((r, i) => {
      const configurationId =
        r.target.kind === "device"
          ? data.devices.find((d) => d.id === r.target.id)?.configurationId
          : r.target.id;
      const configuration = data.configurations.find(
        (c) => c.id === configurationId,
      );
      const family = data.families.find(
        (f) => f.id === configuration?.familyId,
      );
      if (
        configuration?.availability?.status === "not-made" ||
        family?.availability?.status === "not-made"
      )
        ctx.addIssue({
          code: "custom",
          path: ["results", i, "target"],
          message: "Results cannot target a not-made configuration or family",
        });
      ref(
        r.target.kind === "device" ? "devices" : "configurations",
        r.target.id,
        ["results", i, "target", "id"],
      );
      ref(
        r.measurement.kind === "benchmark" ? "benchmarks" : "workloads",
        r.measurement.id,
        ["results", i, "measurement", "id"],
      );
    });
    function citations(value: unknown, path: (string | number)[]) {
      if (Array.isArray(value))
        value.forEach((item, i) => citations(item, [...path, i]));
      else if (value && typeof value === "object") {
        for (const [key, item] of Object.entries(value)) {
          if (key === "sourceId")
            ref("sources", item as string, [...path, key]);
          else citations(item, [...path, key]);
        }
      }
    }
    citations(data, []);
  });
export type Dataset = z.infer<typeof datasetSchema>;
export type Result = z.infer<typeof resultSchema>;
