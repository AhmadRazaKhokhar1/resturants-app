"use client";

import { makeStore } from "@/lib/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const store = makeStore();

  return <Provider store={store}>{children}</Provider>;
}
