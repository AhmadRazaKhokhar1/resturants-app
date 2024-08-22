import { RestaurantCardType } from "@/types/types";
import React from "react";
import { MdStar } from "react-icons/md";
import product_placeholder from '../app/assets/product_placeholder.png'
export default function ResturantCard({
  restaurantName,
  vicinity,
  user_ratings_total,
  rating,
  photoRefrence,
  business_status,
  placeId,
  isOpen
}:RestaurantCardType) {
  return (
    (
      <div className="max-w-72 rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105" key={placeId}>
        <div className="w-72 h-72 overflow-hidden justify-center">
        <img
          className="w-full h-full"
          src={photoRefrence??product_placeholder}
          alt={restaurantName}
        />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            {restaurantName}
          </h3>
          <div className="flex items-center gap-1 mb-3">
            <MdStar className="text-yellow-400" />
            <span className="text-gray-700 font-medium">{rating ?? "Not available"}</span>
            <span className="text-sm text-gray-500">({user_ratings_total} reviews)</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{vicinity}</p>
          <p
            className={`text-sm font-medium ${
              business_status === "OPERATIONAL"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {business_status === "OPERATIONAL"
              ? "Open Now"
              : "Closed"}
          </p>
          <p>{isOpen?"OPEN":"CLOSED"}</p>
        </div>
      </div>
   ) );
}
