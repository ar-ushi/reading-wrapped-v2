let baselineMedianBooksReadPerMonth: number;
export function deriveBehaviors(books: any, year: number, aggregates: any) {
  return {
    rereadRatio:
      Math.round((aggregates.total_rereads / aggregates.total_books) * 10000) /
      100,
    dnfRatio:
      Math.round(
        (aggregates.total_dnfs_for_year / aggregates.total_books) * 10000,
      ) / 100,
    bingeMonths: computeBingeMonths(aggregates.booksPerMonth),
    harshRater: aggregates.avg_rating < 3.5,
    tbrYears: tbrYearBehavior(books, year),
    baselineMedianBooksReadPerMonth,
  };
} /** understanding if reader picked up more books from tbr or new releases */

function computeBingeMonths(booksPerMonth: Record<string, number>) {
  const counts = Object.values(booksPerMonth);
  if (counts.length === 0) return [];

  const sorted = [...counts].sort((a, b) => a - b);
  baselineMedianBooksReadPerMonth = sorted[Math.floor(sorted.length / 2)] || 0;

  return Object.entries(booksPerMonth)
    .filter(
      ([, count]) =>
        count >=
        Math.max(
          baselineMedianBooksReadPerMonth * 2,
          baselineMedianBooksReadPerMonth + 2,
        ),
    )
    .map(([month]) => month);
}
function tbrYearBehavior(books: any[], year: number) {
  const newReleases = books.filter(
    (b: { publication_year: number }) => b.publication_year === year,
  );

  const prevYearMap: Record<number, number> = {};
  books
    .filter((b) => b.publication_year !== year)
    .forEach((b) => {
      const pubYear = b.publication_year;
      prevYearMap[pubYear] = (prevYearMap[pubYear] || 0) + 1;
    });

  return { newReleases, prevYearMap };
}
