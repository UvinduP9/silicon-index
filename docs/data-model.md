# Data model

Schemas and inferred TypeScript types live in `lib/data/schema.ts`. Call `loadData()` from `lib/data` in build-time server code. It reads all collections and validates the complete graph before returning typed data. Do not import this filesystem loader in client components.

Each collection is a JSON array in `data/<collection>.json`. JSON avoids YAML implicit typing and additional parsing dependencies; one file per entity type keeps cross-family references straightforward and diffs reviewable. The initial arrays are empty: this issue introduces no sourced production measurements. Synthetic records live only in `lib/data/schema.test.ts` and must never be used by the app.

Vendors own families; families own configurations with cited core counts by kind. Devices reference one configuration and record cooling and optional cited power limits. Numeric hardware facts use `{ value, citation: { sourceId, locator } }`. A locator identifies the table, row, section, timestamp or result field containing the value.

A benchmark identifies a name, explicit version, metric, unit and direction. Use a separate ID for every version and metric: Geekbench single-core and multi-core results are separate definitions, and different Geekbench major versions never share an ID. A workload records profession, task, application, version and the same metric metadata. Its task must specify relevant settings such as AI model, quantization, context length and generation versus prompt processing; create separate workload IDs when these change.

Results reference exactly one configuration or device and exactly one benchmark or workload. They carry a positive finite value, citation, single-result or aggregate sample context, optional cited power and software version. Aggregates require a sample count and method. Sources carry a public HTTP(S) URL, publisher, title, accessed calendar date and terms note. All schemas reject unknown fields, including estimates. Validation rejects duplicate IDs within a collection and every missing reference, including citations attached to hardware facts.

## Example mappings (illustrative, no measured values)

- Apple: an Apple vendor record owns an M-series family; each binned core arrangement is a distinct configuration. A fanless laptop and an actively cooled desktop reference their respective configurations through device records.
- Intel laptop: an Intel family owns a configuration; two device records can reference it with different cited power limits. Each result records its actual cited test power where known. Do not combine these power contexts.
- Geekbench: a result targets a device or known configuration and references a benchmark ID identifying its explicit version and single-core metric. Its citation points directly to the published score field; sample context distinguishes a single run from a published aggregate.
- Local AI: a workload identifies the application version, model, quantization and generation task with unit `tokens/s`. A result references that workload and its tested device, source location and software version. Prompt processing uses a different workload.

Unknown power, device or software context is omitted, never inferred; use result notes to explain gaps. Required core counts must be sourced before a configuration can enter production. No composite scores are generated.

Run `pnpm validate:data` to validate production files. CI runs this alongside tests. When adding another collection, extend both the schema and loader collection list and add reference tests.
