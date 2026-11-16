import { describe, expect, it } from "vitest";
import { summarizeReviews } from "./llm";

describe("summarizeReviews", () => {
  it("returns a summary for a shop", async () => {
    const result = await summarizeReviews("Corner Roasters", [
      { rating: 5, body: "Great coffee" },
      { rating: 4, body: "Friendly staff" },
    ]);
    expect(result).toBeDefined();
  });
});
