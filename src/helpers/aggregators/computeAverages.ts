export function computeAverages({ books, heroes }: any) {
  const highestRatedBook = books.sort(byRating)[books.length - 1];
  const lowestRatedBook = books.sort(byRating)[0];
  const longestBook = books.sort(byPages)[books.length - 1];
  const shortestBook = books.sort(byPages)[0];
  return {
    avg_rating: getAverage(books, "rating"),
    avg_pages: getAverage(books, "pages"),
    highestRatedBook,
    lowestRatedBook,
    longestBook,
    shortestBook,
  };
}

function getAverage<T extends Record<string, any>>(
  books: T[],
  key: keyof T,
): number {
  if (books.length === 0) return 0;

  const sum = books.reduce((total, book) => {
    const value = Number(book[key]);
    return Number.isFinite(value) ? total + value : total;
  }, 0);

  return sum / books.length;
}

const byRating = (a: any, b: any) => (b.rating ?? 0) - (a.rating ?? 0);

const byPages = (a: any, b: any) => (b.pages ?? 0) - (a.pages ?? 0);
