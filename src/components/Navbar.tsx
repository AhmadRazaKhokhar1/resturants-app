import Link from "next/link";
import LogoMain from "./LogoMain";
import { FaCartShopping } from "react-icons/fa6";
import { MdPerson3 } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="p-0 mb-1 w-full">
      <nav className="flex justify-between px-2 w-full shadow shadow-gray-400 p-3 items-center">
        <div className="flex gap-2 items-center">
        <LogoMain/>
        <Link href={'/'}>
        <strong className="text-xl">
          Enatega
        </strong>
        </Link>
        </div>

        <div className="flex gap-5 mx-3">
          <div className="cart">
            <FaCartShopping color="black" size={30} />
          </div>
          <div className="account">
            <MdPerson3 color="black" size={30} />
          </div>
        </div>
      </nav>
    </div>
  );
}
