import Image from "next/image";

import Map from "@/components/Map";

import * as geolib from "geolib";

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
    console.log("data", data);
    if (data.length > 0) {
      return {
        latitude: data[0].lat,
        longitude: data[0].lon,
        address: address,
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
  const coordsÄlmhult = await getCoordinates("Älmhult");
  const coordsLa = await getCoordinates("Los Angeles");
  const coordsSydney = await getCoordinates("Sydney");
  const coordsSkagen = await getCoordinates("Skagen");

  const allOfOurCoords = [
    coordsÄlmhult!,
    coordsLa!,
    coordsSydney!,
    coordsSkagen!,
  ];
  console.log(allOfOurCoords);
  return (
    <div className=" h-full bg-slate-800">
      <div className="flex h-full items-center justify-center">
        <Map points={allOfOurCoords} />
      </div>
    </div>
  );
}
