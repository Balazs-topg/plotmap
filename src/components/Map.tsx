"use client";

import {
  TransformWrapper,
  TransformComponent,
  KeepScale,
} from "react-zoom-pan-pinch";

import MapContent from "./MapContent";
import ResponsiveScale from "./responsiveScale";
import { UserSubmition } from "@/app/page";

export default function Map({
  data,
  className,
}: {
  className?: string;
  data: UserSubmition[];
}) {
  return (
    <div className="w-[100dvw]">
      <TransformWrapper maxScale={200} wheel={{ smoothStep: 0.01 }}>
        <TransformComponent>
          <ResponsiveScale>
            <MapContent data={data} />
          </ResponsiveScale>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
