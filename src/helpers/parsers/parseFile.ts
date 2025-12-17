import Papa from 'papaparse';

export function parseCSV(file: File | null){

  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res:any) => resolve(res.data),
      error: reject,
    });
  });
}