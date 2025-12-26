export async function enrichWithCovers(books: any[]): Promise<any[]> {
  return Promise.all(
    books.map(async (book) => {
      if (book.info && Array.isArray(book.info)) {
        const enrichedInfo = await Promise.all(
          book.info.map(async (b: Record<string, string>) => {
            const [isbn, title] = Object.entries(b)[0];
            const coverUrl = await fetchCover({
              isbn,
              title,
              author: book.author,
            });
            return { isbn, title, coverUrl };
          }),
        );
        return { ...book, info: enrichedInfo };
      } else {
        const coverUrl = await fetchCover(book);
        return { ...book, coverUrl };
      }
    }),
  );
}
const coverCache = new Map<string, string>();

async function fetchCover(book: any): Promise<string | undefined> {
  if (coverCache.has(book.isbn)) return coverCache.get(book.isbn);
  let url;
  if (book.isbn) {
    url = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
    coverCache.set(book.isbn, url);
    return url;
  }

  const q = encodeURIComponent(`${book.title} ${book.author ?? ""}`);
  const res = await fetch(`https://openlibrary.org/search.json?q=${q}&limit=1`);
  const data = await res.json();

  const coverId = data?.docs?.[0]?.cover_i;
  if (!coverId) return undefined;

  url = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  coverCache.set(book.isbn, url);
  return url;
}
