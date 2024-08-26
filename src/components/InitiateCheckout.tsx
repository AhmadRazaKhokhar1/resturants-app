import { SampleProductType } from "@/types/types";
import CartProduct from "./CartProduct";
import { useEffect, useState } from "react";

export default function InitiateCheckout({products}:{products: SampleProductType[]}) {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = () => {
    let total = 0;
    products?.forEach((product: SampleProductType) => {
      let price = product?.pricesObj?.salePrice ?? product?.pricesObj?.regularPrice;
      total += price;
    });
    setTotalPrice(total)
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [products]);

  console.log(totalPrice)
  return (
    <div>
      {products?products?.map((product) => {
        return <CartProduct product={product} />;
      }):<strong>There is nothing in the cart</strong>}
      <span className="deliveryCharges">{totalPrice&&200}</span>
      <span className="totalAmount"> {totalPrice? "Total:" + totalPrice + 200:""}</span>
    </div>
  );
}
