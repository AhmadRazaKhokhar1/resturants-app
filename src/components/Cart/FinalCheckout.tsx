import { CartContext } from "@/app/contexts/cart.context";
import { PaymentForm } from "@/types/types";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import toast from "react-hot-toast";

export default function FinalCheckout({
  totalPrice,
  setIsPaymentPopupOpen,
}: {
  totalPrice: number;
  setIsPaymentPopupOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { clearCart } = useContext(CartContext);
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    name: "",
    cvv: 0,
    cardNumber: "",
    expiryDate: ""
  });

  function handleChange(e: any) {
    const { value, name } = e.target;
    setPaymentForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleSubmit() {
    clearCart();
    setIsPaymentPopupOpen(false)
    toast.success("Successfully placed the order!");
  }

  return (
    <motion.div
      className="absolute max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg shadow-gray-500 z-10 w-full md:w-96"
      animate={{ y: 50, x: -280 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Payment Details
      </h2>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="cardNumber"
            className="block text-gray-700 font-medium mb-1"
          >
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            name="cardNumber"
            value={paymentForm.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="expiryDate"
              className="block text-gray-700 font-medium mb-1"
            >
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="month"
              name="expiryDate"
              value={paymentForm.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="cvv"
              className="block text-gray-700 font-medium mb-1"
            >
              CVV
            </label>
            <input
              id="cvv"
              name="cvv"
              type="number"
              maxLength={3}
              value={paymentForm.cvv}
              onChange={handleChange}
              placeholder="123"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 "
              required
            />
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700">Total:</span>
            <span className="text-lg font-semibold text-gray-900">
              ${Math.round(totalPrice)}
            </span>
          </div>

          <button
            type="button"
            className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
            onClick={handleSubmit}
          >
            Pay Now
          </button>
        </div>
      </form>
    </motion.div>
  );
}
