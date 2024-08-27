import { SampleProductType } from "@/types/types";
import CartProduct from "./CartProduct";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CartContext } from "@/app/contexts/cart.context";
export default function InitiateCheckout({
  products,
  removeFromCart,
  setIsPopupOpen,
  setIsUserDetailsFormOpen,
  totalPrice,
}: {
  products: SampleProductType[];
  removeFromCart: (id: string) => void;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
  setIsUserDetailsFormOpen: Dispatch<SetStateAction<boolean>>;
  totalPrice: number;
}) {
  function handlePayments(): void {
    setIsPopupOpen((prev) => !prev);
    setIsUserDetailsFormOpen(true);
  }
  const {clearCart} = useContext(CartContext);
  return (
    <motion.div
      className="absolute max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg shadow-black selection:bg-none z-10 w-96"
      animate={{ y: 50, x: -360 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart </h2>

      {(products && products.length > 0) ? (
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
              $ {(totalPrice>0) && Math.round(totalPrice + 15)}
            </span>
          </div>
          <div className="flex justify-between items-center w-full gap-2">
            <button
              className="w-full mt-6 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <button
              className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
              onClick={handlePayments}
              id="go-to-user-details"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
