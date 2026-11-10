import { describe, expect, it } from "vitest";
import { changeBarWidth, formatChange } from "./head-to-head";

describe("formatChange", () => {
  it("signs and rounds the change", () => {
    expect(formatChange(100, 112.4)).toBe("+12%");
    expect(formatChange(100, 96)).toBe("−4%");
    expect(formatChange(100, 100.2)).toBe("0%");
  });
});

describe("changeBarWidth", () => {
  it("scales against the largest change", () => {
    expect(changeBarWidth(100, 150, 0.5)).toBe(1);
    expect(changeBarWidth(100, 125, 0.5)).toBe(0.5);
    expect(changeBarWidth(100, 75, 0.5)).toBe(0.5);
  });

  it("caps at a full half and guards bad input", () => {
    expect(changeBarWidth(100, 300, 0.5)).toBe(1);
    expect(changeBarWidth(0, 10, 0.5)).toBe(0);
    expect(changeBarWidth(100, 110, 0)).toBe(0);
  });
});
