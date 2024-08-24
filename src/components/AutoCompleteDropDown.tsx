import { RestaurantCardCallBacksType } from "@/types/types";
import { TbCurrentLocation } from "react-icons/tb";

export default function AutoCompleteDropDown({
  getCurrentUserLocation,
  getRestaurantsList,
}: RestaurantCardCallBacksType) {
  return (
    <div className="absolute flex lg:mt-[20%] lg:ml-[40%] md:mt-[40%] md:ml-[20%] sm:mt-[40%] sm:ml-[20%] ml-[8%] mt-[40%] outline outline-green-600 rounded-md shadow-2xl shadow-black items-center bg-white overflow-hidden p-0">
      <input
        type="text"
        name="autocomplete"
        id="autocomplete"
        placeholder="Enter Destination"
        className="p-0 sm:p-2 lg:p-3 xl:p-3 w-52 sm:w-72 lg:w-96 z-10 outline-none overflow-hidden"
      />
      <button onClick={getCurrentUserLocation} className="p-1 bg-transparent" id="current-location">
        <TbCurrentLocation size={20} color="green" />
      </button>
      <button className="bg-green-600 p-3" onClick={getRestaurantsList} id="get-restaurants">
        Get Restaurants
      </button>
    </div>
  );
}
