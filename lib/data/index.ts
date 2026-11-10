import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { datasetSchema, type Dataset } from "./schema";

/** Build-time only: validates all files together before returning typed records. */
export function loadData(directory = resolve(process.cwd(), "data")): Dataset {
  const collections = [
    "vendors",
    "families",
    "configurations",
    "devices",
    "benchmarks",
    "workloads",
    "results",
    "sources",
  ] as const;
  return datasetSchema.parse(
    Object.fromEntries(
      collections.map((name) => [
        name,
        JSON.parse(
          readFileSync(resolve(directory, `${name}.json`), "utf8"),
        ) as unknown,
      ]),
    ),
  );
}
export { datasetSchema } from "./schema";
export type { Dataset, Result } from "./schema";
