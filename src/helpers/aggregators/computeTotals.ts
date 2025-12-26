import { byDateAdded, byRating } from "../utils/aggregatorUtils";

export function computeTotals(books: any[], allBooks: any[], year: number) {
  const totalPages = books.reduce(
    (t: any, b: { pages: any }) => t + (b.pages ?? 0),
    0,
  );
  const totalAuthors = new Set(books.map((b: { author: string }) => b.author))
    .size;

  const allDnfs = filterBooks(allBooks, "dnf", true);
  const dnfsThisYear = allDnfs.filter(
    (book) => book.date_added.getFullYear() === year,
  );
  return {
    total_books: books.length,
    total_pages: totalPages,
    total_reading_hours: Math.round(totalPages / 40),
    total_dnfs: allDnfs.length,
    total_dnfs_for_year: dnfsThisYear.length,
    total_rereads: filterBooks(books, "is_reread", true).length,
    total_reviews: filterBooks(books, "review", false).length,
    total_authors: totalAuthors,
    new_authors: computeNewToYouAuthors(allBooks, year),

    hero: {
      rereads: filterBooks(books, "is_reread", true).slice(0, 3),
      dnfs: [...dnfsThisYear].sort(byDateAdded).slice(0, 3),
      top5: [...books].sort(byRating).slice(0, 7),
    },
  };
}

function filterBooks<T extends Record<string, any>>(
  books: T[],
  key: keyof T,
  expectBoolean?: boolean,
): T[] {
  return books.filter((book) => {
    const value = book[key];

    if (expectBoolean) {
      return value === true;
    }

    if (typeof value === "string") {
      return value.trim().length > 0;
    }

    return value != null;
  });
}

function computeNewToYouAuthors(allBooks: any, year: number) {
  const firstReadYear = new Map<string, number>();

  for (const book of allBooks) {
    if (!book.author) continue;

    const existing = firstReadYear.get(book.author);
    if (!existing || book.year < existing) {
      firstReadYear.set(book.author, book.year);
    }
  }

  let count = 0;

  for (const book of allBooks) {
    if (book.year === year && firstReadYear.get(book.author) === year) {
      count++;
    }
  }

  return count;
}
