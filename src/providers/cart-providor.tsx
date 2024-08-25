import { CartContext } from "@/app/contexts/cart.context";
import { SampleProductType } from "@/types/types";
import { ReactNode, useState } from "react";

export default function CarProvidor({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<SampleProductType[]>([]);

  //add to cart
  function addToCart(product: SampleProductType): void {
    setProducts((prevProducts) => ({
      ...prevProducts,
      product,
    }));
  }
//remove from cart
function removeFromCart(id:string){
    const filteredProducts = products.filter((product)=>product.id !== id);
    setProducts(filteredProducts);
}
  return (
    <CartContext.Provider
      value={{
        items: products,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
