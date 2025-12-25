export function computeTotals({ books, heroes }: any) {
  const totalPages = books.reduce(
    (t: any, b: { pages: any }) => t + (b.pages ?? 0),
    0,
  );

  return {
    total_books: books.length,
    total_pages: totalPages,
    total_reading_hours: Math.round(totalPages / 40),
    total_dnfs: filterBooks(books, "dnf", true).length,
    total_rereads: filterBooks(books, "is_reread", true).length,
    total_reviews: filterBooks(books, "review", false).length,
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
