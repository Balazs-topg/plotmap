"use client";

import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { createContext } from "react";

import { useWindowSize } from "usehooks-ts";

export const scaleFactorContext = createContext(1);

const ResponsiveScale = ({ children }: { children: ReactNode }) => {
  const { width, height } = useWindowSize();
  const [scaleFactor, setScaleFactor] = useState(1);

  useLayoutEffect(() => {
    setTimeout(() => {
      setScaleFactor((1 * width) / 1000);
      const container = document.querySelector(
        ".scale-container",
      ) as HTMLElement;
      if (container) {
        container.style.transform = `scale(${scaleFactor})`;
      }
    }, 0);
  }, [width]);

  return (
    <scaleFactorContext.Provider value={scaleFactor}>
      <div className="scale-container relative">{children}</div>
    </scaleFactorContext.Provider>
  );
};

export default ResponsiveScale;
