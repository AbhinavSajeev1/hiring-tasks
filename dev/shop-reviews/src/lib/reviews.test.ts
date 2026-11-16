import { describe, expect, it } from "vitest";
import { averageRating } from "./reviews";

describe("averageRating", () => {
  it("returns 0 for no ratings", () => {
    expect(averageRating([])).toBe(0);
  });

  it("rounds to one decimal", () => {
    expect(averageRating([5, 4, 4])).toBe(4.3);
  });
});
