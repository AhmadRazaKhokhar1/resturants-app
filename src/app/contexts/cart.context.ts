"use client";

import { CartContextType, SampleProductType } from "@/types/types";
import { createContext, ReactNode, useContext } from "react";

export const CartContext = createContext<CartContextType>({
  items:[],
  addToCart:(product:SampleProductType)=>void{},
  removeFromCart:(id:string)=>void{},
  cartPopup:(state:boolean, id:string)=>void{},
  isPopupOpen:{id:"", state:false}
});
