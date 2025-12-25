// Create a parent function that triggers the data flow
import { parseCSV } from './parsers/parseFile';
import {dummyData} from '../dummy/yummy';
import { normalizeData } from './parsers/normalizeData';
import { selectHeroBooks } from './utils/selectHeroBooks';
import { enrichWithCovers } from './utils/enrichBookCovers';
/* TODO - DEFINE DIFFERENCE B/W GR AND STORYGRAPH */
export async function buildWrapped(year: number | null, file: File | null){
    try {
        // const parsedFile = await parseCSV(file);
        const parsedFile = dummyData;
        console.log(parsedFile);
        /** Prior to normalization, let's filter by year */
        /**
         * We may want more data about maybe currently reading 
         */
        const filteredByYear = parsedFile.filter((item) => {
            Number(item['Date Read'].slice(0, 4)) === year; 
        })
        const normalized = normalizeData(filteredByYear);
        const heroes = selectHeroBooks(normalized);
        const enrichedHeroes = await enrichWithCovers(heroes);
        const enrichedBooks = normalized.map(book => {
        const hero = enrichedHeroes.find(h => h.title === book.title)
        return hero ?? book
        });
        const state = {
            books: normalized,
            heroes: enrichedHeroes
        }

    } catch (error) {
        
    }
}