"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const MapComponent = dynamic(
  () => import("@/modules/Map").then((mod) => mod.default),
  {
    ssr: false,
  },
);

const MapPage = () => {
  return (
    <Suspense fallback={null}>
      <MapComponent />
    </Suspense>
  );
};

export default MapPage;
