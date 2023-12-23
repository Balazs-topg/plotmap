import { Revalidate } from "next/dist/server/lib/revalidate";

//@ts-ignore
import Papa from "papaparse";

export default async function fetchAndParseCSV(url: string) {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 / 4 },
      // cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();

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
    console.error("Error fetching CSV:", error);
    throw error; // Rethrow to allow error handling where the function is called
  }
}
