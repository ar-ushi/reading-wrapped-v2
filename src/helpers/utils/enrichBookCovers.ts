export async function enrichWithCovers(
  books: any[]
): Promise<any[]> {
  return Promise.all(
    books.map(async book => {
      const coverUrl = await fetchCover(book)
      return { ...book, coverUrl }
    })
  )
}

async function fetchCover(book: any): Promise<string | undefined> {
  if (book.isbn) {
    return `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
  }

  const q = encodeURIComponent(`${book.title} ${book.author ?? ''}`)
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${q}&limit=1`
  )
  const data = await res.json()

  const coverId = data?.docs?.[0]?.cover_i
  if (!coverId) return undefined

  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
}
