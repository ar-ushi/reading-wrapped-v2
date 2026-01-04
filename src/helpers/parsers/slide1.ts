export function slide1({ books, heroes }: any) {
  const totalPages = books.reduce(
    (t: any, b: { pages: any }) => t + (b.pages ?? 0),
    0,
  );

  const averageSelfRating = (
    books.reduce(
      (total: any, obj: { [rating: string]: any }) =>
        total + parseInt(obj.rating),
      0,
    ) / parseInt(books.length)
  ).toPrecision(2);

  return {
    total_books: books.length,
    total_pages: totalPages,
    total_reading_minutes: Math.round((totalPages / 40) * 60),
    hero_books: heroes.map((h: { title: any; cover_url: any }) => ({
      title: h.title,
      cover: h.cover_url,
    })),
  };
}
