import { describe, expect, it } from "vitest";
import { isTheme, resolveTheme, themeScript } from "./theme";

describe("resolveTheme", () => {
  it("uses an explicit choice over the system setting", () => {
    expect(resolveTheme("dark", true)).toBe("dark");
    expect(resolveTheme("light", false)).toBe("light");
  });

  it("follows the system when there is no choice", () => {
    expect(resolveTheme(null, true)).toBe("light");
    expect(resolveTheme(null, false)).toBe("dark");
  });

  it("ignores stored values that aren't a theme", () => {
    expect(resolveTheme("sepia", false)).toBe("dark");
    expect(isTheme("sepia")).toBe(false);
  });
});

describe("themeScript", () => {
  it("only sets data-theme for a valid stored choice", () => {
    for (const [stored, expected] of [
      ["light", "light"],
      ["dark", "dark"],
      ["sepia", null],
      [null, null],
    ] as const) {
      const attrs: Record<string, string> = {};
      const run = new Function("localStorage", "document", themeScript);
      run(
        { getItem: () => stored },
        {
          documentElement: {
            setAttribute: (k: string, v: string) => (attrs[k] = v),
          },
        },
      );
      expect(attrs["data-theme"] ?? null).toBe(expected);
    }
  });

  it("survives storage that throws", () => {
    const run = new Function("localStorage", "document", themeScript);
    expect(() =>
      run(
        {
          getItem: () => {
            throw new Error("blocked");
          },
        },
        {},
      ),
    ).not.toThrow();
  });
});
