"use client";

import { ReactNode, useState } from "react";
import { CartContext } from "../contexts/cart.context";
import { SampleProductType } from "@/types/types";
import toast from "react-hot-toast";

export default function CartProviderContext({
  children,
}: {
  children: ReactNode;
}) {


  const [cart, setCart] = useState<SampleProductType[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<{state:boolean, id:string}>({
    state:false,
    id:""
  })

  function addToCart(product: SampleProductType): void {
    setCart((prev) => ([...prev, product]));
    setIsPopupOpen({
      state:false,
      id:""
    });
    toast.success(`Added "${product.headline}" to the Cart`)
  }

  function removeFromCart(id: string): void {
    const updatedCart = cart.filter(
      (product: SampleProductType) => product.id != id
    );
    setCart(updatedCart);
  }

  function cartPopup( state:boolean, id:string):void{
    setIsPopupOpen({
      state,
      id
    })
  }
 
  function clearCart ():void{
    setCart([]);
  }

  const state = {
    items:cart,
    addToCart,
    removeFromCart,
    isPopupOpen,
    cartPopup,
    clearCart
  };

  return (
    <CartContext.Provider value={ state }>{children}</CartContext.Provider>
  );
}
