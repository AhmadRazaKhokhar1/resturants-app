"use client";
import Link from "next/link";
import LogoMain from "./LogoMain";
import { FaCartShopping } from "react-icons/fa6";
import { MdPerson3 } from "react-icons/md";
import { CartContext } from "@/app/contexts/cart.context";
import { useContext, useState } from "react";
import InitiateCheckout from "./InitiateCheckout";
import FinalCheckout from "./FinalCheckout";

export default function Navbar() {
  const { items, removeFromCart } = useContext(CartContext);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <div className="p-0 mb-1 w-full caret-transparent">
      <nav className="flex justify-between px-2 w-full shadow shadow-gray-400 p-3 items-center">
        <div className="flex gap-2 items-center">
          <LogoMain />
          <Link href={"/"}>
            <strong className="text-xl">Enatega</strong>
          </Link>
        </div>

        <div className="flex gap-5 mx-3 ">
          <div className="flex items-center justify-start">
            <button
              className="cart"
              onClick={() => setIsPopupOpen((prev) => !prev)}
            >
              <FaCartShopping color="black" size={30} />
            </button>
            {items?.length === 0 ? "" :<span className="text-white bg-red-700 rounded-full p-1 w-5 h-5 overflow-hidden text-center flex items-center justify-center">
              {items?.length}
            </span>}
          </div>
          <div className="account">
            <MdPerson3 color="black" size={30} />
          </div>
          <button onBlur={() => setIsPopupOpen(false)}>
            {isPopupOpen && (
              <InitiateCheckout
                products={items}
                removeFromCart={removeFromCart}
                setIsPopupOpen={setIsPopupOpen}
                setIsPaymentPopupOpen={setIsPaymentPopupOpen}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
              />
            )}
            {isPaymentPopupOpen&&<FinalCheckout totalPrice={totalPrice} setIsPaymentPopupOpen={setIsPaymentPopupOpen} />}
          </button>
        </div>
      </nav>
    </div>
  );
}
