import { CartContext } from "@/app/contexts/cart.context";
import { isPopupOpen, SampleProductType } from "@/types/types";
import { ReactNode, useState } from "react";

export default function CarProvidor({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<SampleProductType[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<isPopupOpen>({
    id: "",
    state: false,
  });

  //add to cart
  function addToCart(product: SampleProductType): void {
    setProducts((prevProducts) => ({
      ...prevProducts,
      product,
    }));
  }
  //remove from cart
  function removeFromCart(id: string) {
    const filteredProducts = products.filter((product) => product.id !== id);
    setProducts(filteredProducts);
  }
  function cartPopup(state: boolean, id: string) {
    setIsPopupOpen({
      id: id,
      state:state,
    });
  }
  return (
    <CartContext.Provider
      value={{
        items: products,
        addToCart,
        removeFromCart,
        cartPopup,
        isPopupOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
