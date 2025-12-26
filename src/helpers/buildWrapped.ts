// Create a parent function that triggers the data flow
import { parseCSV } from "./parsers/parseFile";
import { dummyData } from "../dummy/yummy";
import { normalizeData } from "./parsers/normalizeData";
import { selectHeroBooks } from "./utils/selectHeroBooks";
import { enrichWithCovers } from "./utils/enrichBookCovers";
import { aggregateMetrics } from "./aggregators/aggregateMetrics";
/* TODO - DEFINE DIFFERENCE B/W GR AND STORYGRAPH */
type HeroSourceKey = "totals" | "averages";
type HeroSections = Record<string, any[]>;

export async function buildWrapped(year: number | null, file: File | null) {
  try {
    const parsedFile = dummyData;

    const normalizedAllBooks = normalizeData(parsedFile);
    const normalizedBooksThisYear = normalizedAllBooks.filter(
      (book: { date_read: Date }) => {
        return book.date_read.getFullYear() === year;
      },
    );

    const aggregatedMetrics = aggregateMetrics({
      books: normalizedBooksThisYear,
      allBooks: normalizedAllBooks,
      year: year,
    });
    aggregatedMetrics.totals.hero = await enrichHeroSections(
      aggregatedMetrics.totals.hero,
    );

    aggregatedMetrics.averages.hero = await enrichHeroSections(
      aggregatedMetrics.averages.hero,
    );

    console.log(aggregatedMetrics);
    return aggregatedMetrics;
  } catch (error) {}
}

async function enrichHeroSections(hero: any) {
  const enriched: any = {};

  for (const [section, books] of Object.entries(hero)) {
    const normalizeBook = Array.isArray(books) ? books : [books];
    enriched[section] = await enrichWithCovers(normalizeBook);
  }

  return enriched;
}
