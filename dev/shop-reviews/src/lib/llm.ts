export type ReviewInput = { rating: number; body: string };

const LATENCY_MS = Number(process.env.LLM_LATENCY_MS ?? 900);

// Mock LLM client. Swap for a real provider SDK later; the call shape is the same.
export async function complete(prompt: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, LATENCY_MS));
  const count = (prompt.match(/\n- /g) ?? []).length;
  if (count === 0) return "There are no reviews yet, so there is nothing to summarise.";
  const positive = (prompt.match(/\(rating (4|5)\)/g) ?? []).length;
  const mood = positive / count >= 0.6 ? "mostly positive" : "mixed";
  return `Customers describe their experience as ${mood}. Reviewers most often mention friendly staff, fair prices and how quickly they were served. A few note busy weekends.`;
}

export async function summarizeReviews(shopName: string, reviews: ReviewInput[]): Promise<string> {
  const lines = reviews.map((r) => `- (rating ${r.rating}) ${r.body}`).join("\n");
  const prompt = `Summarise these customer reviews of ${shopName} in two sentences.\n${lines ? "\n" + lines : ""}`;
  return complete(prompt);
}
