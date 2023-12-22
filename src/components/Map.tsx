"use client";

import {
  TransformWrapper,
  TransformComponent,
  KeepScale,
} from "react-zoom-pan-pinch";

import { MapPinIcon } from "@heroicons/react/24/solid";

import MapSvg from "./svg/MapSvg";

function latLongToPixels(
  lat: number,
  lon: number,
  mapWidth: number,
  mapHeight: number,
  offsetX: number = 0,
  offsetY: number = 0,
): { x: number; y: number } {
  // Calculate x from longitude, with horizontal offset
  const x = (lon + 180) * (mapWidth / 360) + offsetX;

  // Convert latitude to radians
  const latRad = (lat * Math.PI) / 180;

  // Calculate y from latitude, with vertical offset
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = mapHeight / 2 - (mapWidth * mercN) / (2 * Math.PI) + offsetY;

  return { x, y };
}

function Marker({
  latitude,
  longitude,
  address,
}: {
  latitude: number;
  longitude: number;
  address?: string;
}) {
  const pixels = latLongToPixels(latitude, longitude, 1010, 666, 474.5, 131);
  console.log(pixels);
  return (
    <>
      <div
        className="absolute z-20 h-2 w-2 -translate-x-1/2 -translate-y-1/2"
        style={{
          top: pixels.y,
          left: pixels.x,
        }}
      >
        <KeepScale className="flex h-full w-full items-center justify-center">
          <div className="absolute flex h-0 w-0 items-center justify-center ">
            <div className="min-h-10 min-w-10">
              <div
                onClick={() => {
                  setTimeout(() => {
                    alert(address);
                  }, 0);
                }}
                className="-translate-y-1/2"
              >
                <MapPinIcon className="origin-bottom cursor-pointer text-red-500 drop-shadow transition-all active:scale-90" />
              </div>
            </div>
          </div>
        </KeepScale>
        {/* {address} latitude:{latitude} longitude:{longitude} */}
      </div>
    </>
  );
}

export default function Map({
  points,
  className,
}: {
  className?: string;
  points: any[];
}) {
  const convertedPixelCoords = points.map((point) => {
    const result = point;
    // result.latitude = result.latitude * 9.05;
    // result.longitude = result.longitude * 18.6;

    return result;
  });

  return (
    <>
      <TransformWrapper maxScale={100} wheel={{ smoothStep: 0.01 }}>
        <TransformComponent>
          <div className="relative flex h-[100dvh] w-screen scale-125 cursor-grab items-center justify-center active:cursor-grabbing">
            <div className=" relative">
              {convertedPixelCoords.map((point) => {
                return (
                  <Marker
                    latitude={point.latitude}
                    longitude={point.longitude}
                    address={point.address}
                    key={point.latitude}
                  />
                );
              })}
              <MapSvg />
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}
