import { SampleProductType } from "@/types/types";
import CartProduct from "./CartProduct";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function InitiateCheckout({
  products,
  removeFromCart,
  setIsPopupOpen,
}: {
  products: SampleProductType[];
  removeFromCart: (id: string) => void;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState<boolean>(false);
  const calculateTotalPrice = () => {
    let total = 0;
    products?.forEach((product: SampleProductType) => {
      let price =
        product?.pricesObj?.salePrice ?? product?.pricesObj?.regularPrice;
      total += price;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [products]);

  function handlePayments(): void {
    setIsPopupOpen((prev) => !prev);
    setIsPaymentPopupOpen(true);
  }
  return (
    <motion.div
      className="absolute max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg shadow-black selection:bg-none z-10 w-96"
      animate={{ y: 50, x: -400 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart </h2>

      {products && products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
      ) : (
        <strong className="block text-center text-gray-500 py-6">
          There is nothing in the cart
        </strong>
      )}

      {totalPrice && (
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700">
              Delivery Charges:
            </span>
            <span className="text-lg font-semibold text-gray-900">$ 15</span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-xl font-semibold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-green-900">
              $ {totalPrice && Math.round(totalPrice + 15)}
            </span>
          </div>

          <button
            className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
            onClick={handlePayments}
          >
            Checkout
          </button>
        </div>
      )}
    </motion.div>
  );
}
