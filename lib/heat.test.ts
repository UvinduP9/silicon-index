import { describe, expect, it } from "vitest";
import {
  HEAT_INK_DARK,
  HEAT_INK_LIGHT,
  HEAT_STOPS,
  contrastRatio,
  heatAt,
  heatGradient,
  heatScale,
  hexToRgb,
} from "./heat";

describe("heatAt", () => {
  it("returns the first and last stops at the ends", () => {
    expect(heatAt(0).rgb).toEqual(hexToRgb(HEAT_STOPS[0]));
    expect(heatAt(1).rgb).toEqual(hexToRgb(HEAT_STOPS[HEAT_STOPS.length - 1]!));
  });

  it("hits every stop exactly at its position", () => {
    HEAT_STOPS.forEach((stop, i) => {
      expect(heatAt(i / (HEAT_STOPS.length - 1)).rgb).toEqual(hexToRgb(stop));
    });
  });

  it("clamps out-of-range and non-finite input", () => {
    expect(heatAt(-3)).toEqual(heatAt(0));
    expect(heatAt(7)).toEqual(heatAt(1));
    expect(heatAt(Number.NaN)).toEqual(heatAt(0));
  });

  it("formats the background as an rgb() string", () => {
    expect(heatAt(0).bg).toBe("rgb(46, 28, 68)");
  });

  it("uses light text on the cool end and dark text on the hot end", () => {
    expect(heatAt(0).fg).toBe(HEAT_INK_LIGHT);
    expect(heatAt(1).fg).toBe(HEAT_INK_DARK);
  });

  it("keeps text readable across the whole ramp", () => {
    for (let i = 0; i <= 200; i++) {
      const c = heatAt(i / 200);
      // 4.5:1 is WCAG AA for body text; the tile name is large (3:1) but
      // the value and unit are small, so hold the stricter bar.
      expect(contrastRatio(c.rgb, hexToRgb(c.fg))).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe("heatScale", () => {
  it("maps a linear range onto the ramp", () => {
    const s = heatScale([10, 20]);
    expect(s(10)).toEqual(heatAt(0));
    expect(s(15)).toEqual(heatAt(0.5));
    expect(s(20)).toEqual(heatAt(1));
  });

  it("clamps values outside the range", () => {
    const s = heatScale([10, 20]);
    expect(s(0)).toEqual(heatAt(0));
    expect(s(99)).toEqual(heatAt(1));
  });

  it("spaces a log range by ratio, not difference", () => {
    const s = heatScale([1, 100], { type: "log" });
    expect(s(10)).toEqual(heatAt(0.5));
    expect(s(1)).toEqual(heatAt(0));
    expect(s(100)).toEqual(heatAt(1));
  });

  it("clamps zero and negatives on a log scale instead of failing", () => {
    const s = heatScale([1, 100], { type: "log" });
    expect(s(0)).toEqual(heatAt(0));
    expect(s(-5)).toEqual(heatAt(0));
  });

  it("puts every value in the middle when the range has no spread", () => {
    expect(heatScale([5, 5])(5)).toEqual(heatAt(0.5));
  });

  it("rejects invalid ranges", () => {
    expect(() => heatScale([20, 10])).toThrow();
    expect(() => heatScale([Number.NaN, 1])).toThrow();
    expect(() => heatScale([0, 10], { type: "log" })).toThrow();
  });
});

describe("heatGradient", () => {
  it("lists every stop in order", () => {
    expect(heatGradient()).toBe(
      `linear-gradient(90deg, ${HEAT_STOPS.join(", ")})`,
    );
  });
});

describe("hexToRgb", () => {
  it("parses with or without a hash and rejects bad input", () => {
    expect(hexToRgb("#FF8000")).toEqual([255, 128, 0]);
    expect(hexToRgb("ff8000")).toEqual([255, 128, 0]);
    expect(() => hexToRgb("#fff")).toThrow();
  });
});
