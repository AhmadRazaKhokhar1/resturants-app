import { CartContextType } from "@/types/types";
import { createContext } from "react";

 // Add To Cart
 function addToCart(): void {}
 // Remove From Cart
 function removeFromCart(): void {}

const defaultCartContext = {
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
    addToCart: addToCart,
    removeFromCart: removeFromCart,
  };
const CartContext = createContext<CartContextType>(defaultCartContext);
export default CartContext;