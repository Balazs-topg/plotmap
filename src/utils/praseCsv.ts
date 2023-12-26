//@ts-ignore
import Papa from "papaparse";

export default async function praseCSV(csvText: any) {
  try {
    return new Promise<[]>((resolve, reject) => {
      Papa.parse(csvText, {
        complete: function (results: any) {
          resolve(results.data);
        },
        error: function (error: Error) {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error("Error prasing CSV:", error);
    throw error; // Rethrow to allow error handling where the function is called
  }
}
