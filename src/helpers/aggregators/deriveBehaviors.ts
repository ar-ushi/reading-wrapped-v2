export function deriveBehaviors({ books, year, heroes, aggregates }: any) {
  return {
    rereadRatio:
      Math.round((aggregates.total_rereads / aggregates.total_books) * 10000) /
      100,
    dnfRatio:
      Math.round((aggregates.total_dnf / aggregates.total_books) * 10000) / 100,
    bingeMonths: computeBingeMonths(aggregates.booksPerMonth),
    harshRater: aggregates.avg_rating < 3.5,
    tbrYears: tbrYearBehavior(books, year),
  };
} /** understanding if reader picked up more books from tbr or new releases */

function computeBingeMonths(booksPerMonth: Record<string, number>) {
  const counts = Object.values(booksPerMonth);
  if (counts.length === 0) return [];

  const sorted = [...counts].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)] || 0;

  return Object.entries(booksPerMonth)
    .filter(([, count]) => count >= Math.max(median * 2, median + 2))
    .map(([month]) => month);
}


function tbrYearBehavior(books: any[], year: any){
  let prevYearMap :Record<number, number> = {};
  const newReleases = books.filter((b : {publication_year: Number}) => b.publication_year === year);
  const previousYears = books.filter((b : {publication_year: Number}) => b.publication_year !== year).map((b : {date_added: Date}) => {
    const year = b.date_added.getFullYear();
    prevYearMap[year]++;
  });
  return {prevYearMap, newReleases}
}