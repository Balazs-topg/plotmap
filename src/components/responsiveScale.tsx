"use client";

import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { createContext } from "react";

import { useWindowSize } from "usehooks-ts";

export const scaleFactorContext = createContext(1);

const ResponsiveScale = ({ children }: { children: ReactNode }) => {
  const { width, height } = useWindowSize();
  const [scaleFactor, setScaleFactor] = useState(1);

  useLayoutEffect(() => {
    const newScaleFactor = (1 * width) / 1000;
    setScaleFactor(newScaleFactor);
    const container = document.querySelector(".scale-container") as HTMLElement;
    if (container) {
      container.style.transform = `scale(${newScaleFactor})`;
    }
  }, [width]); // Dependency on `width` ensures this runs when window size changes

  return (
    <scaleFactorContext.Provider value={scaleFactor}>
      <div className="scale-container relative">{children}</div>
    </scaleFactorContext.Provider>
  );
};

export default ResponsiveScale;
