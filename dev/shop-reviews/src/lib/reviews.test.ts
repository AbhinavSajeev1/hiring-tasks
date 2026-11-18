import { describe, expect, it } from "vitest";
import { averageRating, isValidRating } from "./reviews";

describe("averageRating", () => {
  it("returns 0 for no ratings", () => {
    expect(averageRating([])).toBe(0);
  });

  it("rounds to one decimal", () => {
    expect(averageRating([5, 4, 4])).toBe(4.3);
  });
});

describe("isValidRating", () => {
  it.each([
    [1, true],
    [5, true],
    [-10, false],
    [4.5, false],
  ])("returns %s for rating %s", (rating, expected) => {
    expect(isValidRating(rating)).toBe(expected);
  });
});
