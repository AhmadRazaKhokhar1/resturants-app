"use client"
import { MapComponent } from "@/components/Map";
import { MapProvider } from "@/providers/map-providor";

export default function page() {
  return (
    <div>
      <MapProvider>
        <MapComponent />
      </MapProvider>
    </div>
  );
}
