// Create a parent function that triggers the data flow
import { parseCSV } from './parsers/parseFile';
export async function buildWrapped(year: number | null, file: File | null){
    try {
        const parsedFile = await parseCSV(file);
        console.log(parsedFile);
    } catch (error) {
        
    }
}