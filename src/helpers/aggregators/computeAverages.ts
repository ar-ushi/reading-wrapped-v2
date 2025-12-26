import { byPages, byRating } from "../utils/aggregatorUtils";
export function computeAverages(books: any[]) {
  const lowestRatedBook = books.sort(byRating)[books.length - 1];
  const highestRatedBook = books.sort(byRating)[0];
  const shortestBook = books.sort(byPages)[books.length - 1];
  const longestBook = books.sort(byPages)[0];
  const mostReadAuthor = computedMostReadAuthor(books);
  return {
    avg_rating: getAverage(books, "rating"),
    avg_pages: Math.round(getAverage(books, "pages")),
    highestRatedBook,
    lowestRatedBook,
    longestBook,
    shortestBook,
    mostReadAuthor,
    hero: {
      highestRatedBook,
      lowestRatedBook,
      longestBook,
      shortestBook,
      mostReadAuthor,
    },
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

function computedMostReadAuthor(books: any[]) {
  const freqMap = new Map<string, [any[], number]>();

  for (const book of books) {
    const author = book.author;
    const title = book.title;
    const isbn = book.isbn;

    const existing = freqMap.get(author);

    if (!existing) {
      const obj = {
        title: title,
        isbn: isbn,
      };
      freqMap.set(author, [[obj], 1]);
    } else {
      const [obj, count] = existing;
      obj.push({
        title: title,
        isbn: isbn,
      });
      freqMap.set(author, [obj, count + 1]);
    }
  }

  let maxAuthor: string | null = null;
  let maxCount = 0;
  let maxInfo: object[] = [];

  for (const [author, [info, count]] of freqMap) {
    if (count > maxCount) {
      maxCount = count;
      maxAuthor = author;
      maxInfo = info;
    }
  }

  return {
    author: maxAuthor,
    count: maxCount,
    info: maxInfo,
  };
}
