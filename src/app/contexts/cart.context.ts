"use client"
import { CartContextType } from "@/types/types";
import { createContext, useContext } from "react";
const cartContextValue = {
  items: [
    {
      keyword: "",
      pricesObj: {
        regularPrice: 0,
        salePrice: 0,
        sale: 0,
      },
      image: "",
      headline: "",
    },
  ],
  addToCart: void{},
  removeFromCart: void{},
};
export const CartContext = createContext<CartContextType>(cartContextValue);
export function useCartContext(){
  return useContext(CartContext);
}