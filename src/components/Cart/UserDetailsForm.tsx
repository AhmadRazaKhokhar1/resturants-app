import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {motion} from "framer-motion";

interface UserDetails {
  fullName: string;
  address: string;
  phone: string;
  email: string;
}

export default function UserDetailsForm({
  setIsPaymentPopupOpen,
  setIsUserDetailsFormOpen,
}: {
  setIsPaymentPopupOpen: Dispatch<SetStateAction<boolean>>;
  setIsUserDetailsFormOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [customerDetails, setCustomerDetails] = useState<UserDetails>({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });

  function handleChange(e: any) {
    const { value, name } = e.target;
    setCustomerDetails((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleSubmit() {
    setIsUserDetailsFormOpen(false);
    setIsPaymentPopupOpen(true);
  }


  return (
    <motion.div
      className="absolute max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg shadow-gray-500 w-full md:w-96"
      animate={{ y: 50, x: -280 }}
      transition={{ duration: 0.3 }}
      id="user-details-animation-div"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Customer Details
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={customerDetails.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-gray-700 font-medium mb-1"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={customerDetails.address}
            onChange={handleChange}
            placeholder="123 Main St, City, State"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-1"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={customerDetails.phone}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={customerDetails.email}
            onChange={handleChange}
            placeholder="example@example.com"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          id="go-to-final-checkout"
          className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
