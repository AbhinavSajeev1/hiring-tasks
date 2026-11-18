export function averageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((a, b) => a + b, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

export function isValidRating(n: number): boolean {
  return Number.isInteger(n) && n >= 1 && n <= 5;
}