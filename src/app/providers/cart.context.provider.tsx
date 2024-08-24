"use client";

import { ReactNode, useState } from "react";
import { CartContext } from "../contexts/cart.context";
import { SampleProductType } from "@/types/types";

export default function CartProviderContext({
  children,
}: {
  children: ReactNode;
}) {


  const [cart, setCart] = useState<SampleProductType[]>([]);

  function addToCart(product: SampleProductType): void {
    setCart((prev) => ([...prev, product]));
  }

  function removeFromCart(id: string): void {
    const updatedCart = cart.filter(
      (product: SampleProductType) => product.id != id
    );
    setCart(updatedCart);
  }

  const state = {
    items:cart,
    addToCart,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={ state }>{children}</CartContext.Provider>
  );
}
