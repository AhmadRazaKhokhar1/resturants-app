import { RestaurantCardType } from "@/types/types";
import React from "react";
import { MdStar } from "react-icons/md";
import product_placeholder from "../../app/assets/product_placeholder.png";
import Link from "next/link";
import Image from "next/image";
export default function ResturantCard({
  restaurantName,
  vicinity,
  user_ratings_total,
  rating,
  photoRefrence,
  business_status,
  placeId,
  isOpen,
}: RestaurantCardType) {
  return (
    <Link
      href={{
        pathname: "/products",
        query: {
          restaurantName,
          vicinity,
          user_ratings_total,
          rating,
          photoRefrence,
          business_status,
          placeId,
        },
      }}
      key={placeId}
    >
      <div
        className="min-w-72 max-w-96 min-h-96 max-h-auto rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
        id="restaurant-card"
      >
        <div className="w-full h-52 overflow-hidden justify-start items-center bg-cover">
          <Image
            className="w-full h-full object-cover"
            src={photoRefrence}
            width={100}
            height={100}
            onError={(e) => {
              let target = e.target as any;
              target.onerror = null;
              target.src = product_placeholder.src;
            }}
            alt={restaurantName}
          />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            {restaurantName.length > 30
              ? restaurantName.slice(0, 30) + "..."
              : restaurantName}
          </h3>
          <div className="flex items-center gap-1 mb-3">
            <MdStar className="text-yellow-400" />
            <span className="text-gray-700 font-medium">
              {rating ?? "Not available"}
            </span>
            <span className="text-sm text-gray-500">
              ({user_ratings_total} reviews)
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{vicinity}</p>
          <p className={`text-sm font-medium`}>
            {business_status === "OPERATIONAL"
              ? "Operational"
              : "Non-Operational"}
          </p>
          <p
            className={`text-sm font-medium ${
              isOpen ? "text-green-600" : "text-red-600"
            }`}
          >
            {isOpen ? "OPEN NOW" : "CLOSED"}
          </p>
        </div>
      </div>
    </Link>
  );
}
