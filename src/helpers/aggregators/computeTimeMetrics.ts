export function computeTimeMetrics(books: any[]) {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ] as const;

  type Month = (typeof months)[number];

  const monthCounts: Record<Month, number> = Object.fromEntries(
    months.map((m) => [m, 0]),
  ) as Record<Month, number>;

  const pageCounts: Record<Month, number> = Object.fromEntries(
    months.map((m) => [m, 0]),
  ) as Record<Month, number>;

  const booksPerMonth = books.reduce(
    (monthCounts: Record<Month, number>, b: { date_read: string }) => {
      const month = new Date(b.date_read)
        .toLocaleString("en-US", { month: "long" })
        .toLowerCase() as Month;
      monthCounts[month]++;
      return monthCounts;
    },
    monthCounts,
  );
const pagesPerMonth = books.reduce(
    (
      pageCounts: Record<Month, number>,
      b: { date_read: Date; pages: number },
    ) => {
      const month = b.date_read
        .toLocaleString("en-US", { month: "long" })
        .toLowerCase() as Month;

      pageCounts[month] += b.pages ?? 0;
      return pageCounts;
    },
    pageCounts,
  );

  const maxBooks = Math.max(...(Object.values(booksPerMonth) as number[]));
  const mostReadMonth = Object.entries(booksPerMonth)
    .filter(([_, count]) => count === maxBooks)
    .map(([month]) => month);

  return {
    pagesPerMonth,
    booksPerMonth,
    mostReadMonth,
};
}
