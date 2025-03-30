export const formatReviews = (reviews?: number) => {
  if (!reviews) return "0";
  if (reviews >= 1_000_000) return `${(reviews / 1_000_000).toFixed(1)}m`;
  if (reviews >= 1_000) return `${(reviews / 1_000).toFixed(1)}k`;
  return reviews.toString();
};
