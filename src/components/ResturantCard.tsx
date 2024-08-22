import React from "react";
import { MdStar } from "react-icons/md";

export default function ResturantCard({
  restaurantName,
  vicinity,
  user_ratings_total,
  rating,
  photoRefrence,
  business_status,
  placeId,
}) {
  return (
    <div>
      <div key={placeId} className="card">
        <h3>{restaurantName}</h3>
        <img src={photoRefrence} alt={restaurantName} />
        <div className="flex gap-1 items-center">
          <p>Rating: {rating ?? "Not available"}</p>
          <span>
            <MdStar color="yellow" />
          </span>
          <span>{user_ratings_total}</span>
          <span>{vicinity}</span>
          <span>{business_status}</span>
        </div>
      </div>
    </div>
  );
}
