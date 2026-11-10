import { describe, expect, it } from "vitest";
import { pageTitle, siteName } from "./site";

describe("pageTitle", () => {
  it("returns the site name when no page is given", () => {
    expect(pageTitle()).toBe(siteName);
  });

  it("appends the site name to a page title", () => {
    expect(pageTitle("M4 Pro")).toBe("M4 Pro | Silicon Index");
  });
});
