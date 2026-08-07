"use client";

import { useMemo } from "react";
import DottedMap from "dotted-map";

interface WorldMapDotsProps {
  className?: string;
}

export default function WorldMapDots({ className = "" }: WorldMapDotsProps) {
  const svgMarkup = useMemo(() => {
    const map = new DottedMap({ height: 70, grid: "diagonal" });

    return map.getSVG({
      radius: 0.22,
      color: "#93c5fd",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 75% at 60% 40%, black 40%, transparent 85%)",
        maskImage:
          "radial-gradient(ellipse 75% 75% at 60% 40%, black 40%, transparent 85%)",
        opacity: 0.55,
      }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}