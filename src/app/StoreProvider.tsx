"use client";

import { AppStore, makeStore } from "@/lib/store";
import { ReactNode, useRef } from "react";

export default function StoreProvider({ children }: { children: ReactNode }) {
  var storeRef = useRef<AppStore>();
  if (!storeRef) {
    storeRef.current = makeStore();
  }
  return <StoreProvider store={storeRef.current}>{children}</StoreProvider>;
}
