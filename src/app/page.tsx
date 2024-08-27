"use client";
import { MapComponent } from "@/components/Google/Map";
import { MapProvider } from "@/providers/map-providor";
import CartProviderContext from "../providers/cart.context.provider";

export default function page() {
 
  return (
    <div>
      <CartProviderContext>
        <MapProvider>
          <MapComponent />
        </MapProvider>
      </CartProviderContext>
    </div>
  );
}
