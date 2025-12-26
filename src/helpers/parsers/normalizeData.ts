export function normalizeData(raw: any[]) {
  return raw.map((r) => ({
    id: Number(r["Book Id"]),
    title: r["Title"],
    author: r["Author"],
    rating: Number(r["My Rating"]),
    average_rating: Number(r["Average Rating"]),
    date_added: new Date(r["Date Added"]),
    date_read: new Date(r["Date Read"]),
    pages: Number(r["Number of Pages"]),
    publication_year: Number(r["Original Publication Year"]),
    bookshelves: r["Bookshelves"],
    type: r["Binding"],
    isbn:  Number(r["ISBN13"].replace(/\D/g, '')),
    publisher: r["Publisher"],
    is_reread: r["Read Count"] > 1,
    dnf: ["dnf", "didnotfinish", "did-not-finish"].includes(r["Bookshelves"]),
    review: r["My Review"],
  }));
}

/**This is goodreads specific */
