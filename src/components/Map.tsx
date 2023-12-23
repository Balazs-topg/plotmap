"use client";

import { useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  KeepScale,
} from "react-zoom-pan-pinch";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { MapPinIcon } from "@heroicons/react/24/solid";

import MapSvg from "./svg/MapSvg";
import { UserSubmition } from "@/app/page";

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

function Marker({ data }: { data: UserSubmition }) {
  const [mouseDownPos, setMouseDownPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  if (!data.coords) {
    return null;
  }

  const pixels = latLongToPixels(
    data.coords!.latitude,
    data.coords!.longitude,
    1010,
    666,
    474.5,
    131,
  );

  const handleMouseDown = (event: React.MouseEvent) => {
    setMouseDownPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (mouseDownPos) {
      const distanceMoved = Math.sqrt(
        Math.pow(event.clientX - mouseDownPos.x, 2) +
          Math.pow(event.clientY - mouseDownPos.y, 2),
      );

      if (distanceMoved < 10) {
        // alert(
        //   `name : ${data.name}, location : ${data.location}, skool account : ${data.skoolAccountLink}`,
        // );
        setmodalIsOpen(true);
      }
    }
    setMouseDownPos(null); // Reset mouse down position
  };

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
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className="-translate-y-1/2"
              >
                <MapPinIcon className="origin-bottom cursor-pointer text-red-500 drop-shadow transition-all active:scale-90" />
              </div>
            </div>
          </div>
        </KeepScale>
        {/* {address} latitude:{latitude} longitude:{longitude} */}
        <AlertDialog open={modalIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{data.name}</AlertDialogTitle>
              <AlertDialogDescription>
                <div>
                  location: {data.location} <br />
                  <a
                    target="_blank"
                    className=" text-blue-500 underline"
                    href={data.skoolAccountLink}
                  >
                    Skool account
                  </a>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setmodalIsOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => setmodalIsOpen(false)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

export default function Map({
  data,
  className,
}: {
  className?: string;
  data: UserSubmition[];
}) {
  const convertedPixelCoords = data.map((point) => {
    const result = point;
    // result.latitude = result.latitude * 9.05;
    // result.longitude = result.longitude * 18.6;

    return result;
  });

  return (
    <>
      <TransformWrapper maxScale={200} wheel={{ smoothStep: 0.01 }}>
        <TransformComponent>
          <div className="relative flex h-[100dvh] w-screen scale-125 cursor-grab items-center justify-center active:cursor-grabbing">
            <div className=" relative">
              {convertedPixelCoords.map((item) => {
                return <Marker key={JSON.stringify(item)} data={item} />;
              })}
              <MapSvg />
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}
