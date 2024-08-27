"use client";

import { ReactNode, useState } from "react";
import { CartContext } from "../app/contexts/cart.context";
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
// handle add to cart
  function addToCart(product: SampleProductType): void {
    setCart((prev) => ([...prev, product]));
    setIsPopupOpen({
      state:false,
      id:""
    });
    toast.success(`Added "${product.headline}" to the Cart`)
  }
// handle remove from cart
  function removeFromCart(id: string): void {
    const updatedCart = cart.filter(
      (product: SampleProductType) => product.id != id
    );
    setCart(updatedCart);
  }
// handle cart popup
  function cartPopup( state:boolean, id:string):void{
    setIsPopupOpen({
      state,
      id
    })
  }
 //handle clear cart
 function clearCart():void{
  setCart([]);
};
//declaring state object
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
