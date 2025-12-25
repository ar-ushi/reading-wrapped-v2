const byRating = (a: any, b: any) =>
  (b.rating ?? 0) - (a.rating ?? 0)

const byPages = (a: any, b: any) =>
  (b.pages ?? 0) - (a.pages ?? 0)


export function selectHeroBooks(books: any[]): any[] {
  const heroes: any[] = []
  const used = new Set<string>()

  const add = (book?: any) => {
    if (!book) return
    if (used.has(book.title)) return
    heroes.push(book)
    used.add(book.title)
  }

  books
    .filter(b => b.rating != null)
    .sort(byRating)
    .slice(0, 2)
    .forEach(add)

  books
    .filter(b => b.pages != null)
    .sort(byPages)
    .slice(0, 2)
    .forEach(add)

  const reread = books.find(b => b.is_reread)
  if (reread) {
    add(reread)
  } else {
    const popular = books
      .filter(b => b.rating != null)
      .sort(byRating)[0]
    add(popular)
  }

  return heroes.slice(0, 5)
}
