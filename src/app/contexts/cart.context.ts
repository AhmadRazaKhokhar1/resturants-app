"use client"
import { CartContextType, SampleProductType } from "@/types/types";
import { createContext, useContext } from "react";
const cartContextValue = {
  items: [
    {
      id:"",
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
  addToCart: (product:SampleProductType)=>void{},
  removeFromCart: (id:string)=>void{},
};
export const CartContext = createContext<CartContextType>(cartContextValue);
export function useCartContext(){
  const state = useContext(CartContext);
  if(!state){
    return console.warn(`${state} must be containing cart items`)
  }
  return state;
}