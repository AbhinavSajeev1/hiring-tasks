export function formatReviewDate(value: Date | string): string {
  return new Date(value).toLocaleString();
}
