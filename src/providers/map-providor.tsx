"use client";

import { Libraries,  useJsApiLoader } from "@react-google-maps/api";
import { ReactNode } from "react";

const libraries = ["places", "drawing", "geometry"];

export function MapProvider({ children }: { children: ReactNode }) {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as Libraries
  });

  if (loadError) return <p>Something went wrong, try reloading the page.</p>;

  if (!scriptLoaded) return <div className="rounded-full w-12 h-12 b-l-2 border-blue-600 animate-spin"></div>;

  return children;
}
