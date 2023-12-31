import Image from "next/image";

import fetchAndParseCSV from "@/utils/fetchAndPraseCsv";

import Map from "@/components/Map";
import ViewAll from "@/components/ViewAll";

import * as geolib from "geolib";

interface location {
  latitude: number;
  longitude: number;
  location: string;
}

export interface UserSubmition {
  submtionTime: string;
  name: string;
  skoolAccountLink: string;
  location: string;
  coords?: location;
}

async function getCoordinates(address: string) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  const params = {
    q: address,
    format: "json",
  };
  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      return {
        latitude: data[0].lat,
        longitude: data[0].lon,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}

export default async function Home() {
  // const googleSheetId = "1LUVZlvs6UTxpZHMXhp-98Nh75NHsUItaV1fcsNL9mjY";
  // const googleApiKey = process.env.GOOGLE_API_KEY;
  const csvData = await fetchAndParseCSV(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR5dhQXS7UwSj5oImKG0yYFRLbLxqhPx3IGmPeyIj-viSxDxQh9MZCY6jp9xKtQz37i_zkQSosNlxTE/pub?output=csv",
  );
  const data = csvData.slice(1).map((item) => {
    const newItem: any = {};
    newItem.submtionTime = item[0];
    newItem.name = item[1];
    newItem.skoolAccountLink = item[2];
    newItem.location = item[3];
    return newItem as UserSubmition;
  });
  const dataWithCoords = (await Promise.all(
    data.map(async (item) => {
      const coords = await getCoordinates(item.location);
      return { ...item, coords };
    }),
  )) as UserSubmition[];

  return (
    <div className=" h-full bg-slate-800">
      <div className="flex h-full items-center justify-center">
        <ViewAll data={dataWithCoords} />
        <Map data={dataWithCoords} />
      </div>
    </div>
  );
}
