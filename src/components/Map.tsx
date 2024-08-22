"use client";
import { TbCurrentLocation } from "react-icons/tb";
import {
  defaultMapContainerStyle,
  defaultMapOptions,
} from "@/app/globals/global-vars";
import * as GoogleMapTypes from "@/types/global-types";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdCall, MdRateReview, MdStar } from "react-icons/md";
import ResturantCard from "./ResturantCard";

const MapComponent = () => {
  const [defaultMapCenter, setDefaultMapsCenter] =
    useState<GoogleMapTypes.geoLocation>({
      lat: 35.8799866,
      lng: 76.5048004,
    });

  const [restaurantsMapCenter, setRestaurantsMapCenter] = useState<
    GoogleMapTypes.geoLocation[]
  >([]);

  const defaultMapZoom = 15;
  const [autoComplete, setAutoComplete] =
    useState<GoogleMapTypes.Autocomplete>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  // Handle autocomplete loading
  const onLoad = (autoCompleteInstance: google.maps.places.Autocomplete) => {
    setAutoComplete(autoCompleteInstance);
  };

  // Handle place change from autocomplete
  const handlePlaceChange = () => {
    if (autoComplete) {
      const place = autoComplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        setDefaultMapsCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    }
  };

  // Get the user's current location
  const getCurrentUserLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDefaultMapsCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.success(
            `Your location is marked: Latitude ${position.coords.latitude}, Longitude ${position.coords.longitude}`
          );
        },
        (failed) => {
          console.log(failed);
          toast.error(failed.message);
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("An error occurred, please try again.");
    }
  };

  // Get list of nearby restaurants
  const getRestaurantsList = () => {
    if (!placesService) {
      toast.error("PlacesService is not initialized.");
      return;
    }

    const query = {
      location: new google.maps.LatLng(
        defaultMapCenter.lat,
        defaultMapCenter.lng
      ),
      radius: 5500,
      type: "restaurant",
    };

    placesService.nearbySearch(query, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const restaurantsData = results.map((result) => ({
          lat: result.geometry?.location?.lat() ?? 0,
          lng: result.geometry?.location?.lng() ?? 0,
          name: result.name ?? "Unknown",
          rating: result.rating ?? null,
          placeId: result.place_id ?? "",
          isOpen: result.opening_hours?.open_now,
          photos: !result?.photos ? "" : result.photos[0]?.getUrl(),
          userRatings: result.user_ratings_total,
          vicinity: result.vicinity,
          phone: result.formatted_phone_number ?? "",
          website: result.website,
          reviews: result.reviews,
          businessStatus:result.business_status??"N/A"
        }));
        setRestaurantsMapCenter(restaurantsData);
        toast.success("Restaurants have been marked successfully.");
      } else {
        toast.error("No Resturants Found Nearby");
        console.log("PlacesService status:", status);
      }
    });
  };

  useEffect(() => {
    if (mapRef.current) {
      const newPlacesService = new google.maps.places.PlacesService(
        mapRef.current
      );
      setPlacesService(newPlacesService);
    }
  }, [mapRef.current]);
  console.log(restaurantsMapCenter);
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChange}>
          <div className="absolute flex lg:mt-[20%] lg:ml-[40%] md:mt-[40%] md:ml-[20%] sm:mt-[40%] sm:ml-[20%] ml-[8%] mt-[40%] outline outline-green-600 rounded-md shadow-2xl shadow-black items-center bg-white overflow-hidden p-0">
            <input
              type="text"
              name="autocomplete"
              id="autocomplete"
              placeholder="Enter Destination"
              className="p-0 sm:p-2 lg:p-3 xl:p-3 w-52 sm:w-72 lg:w-96 z-10 outline-none overflow-hidden"
            />
            <button
              onClick={getCurrentUserLocation}
              className="p-1 bg-transparent"
            >
              <TbCurrentLocation size={20} color="green" />
            </button>
            <button className="bg-green-600 p-3" onClick={getRestaurantsList}>
              Get Restaurants
            </button>
          </div>
        </Autocomplete>
        <Marker position={defaultMapCenter} />
        {restaurantsMapCenter.map((restaurant, index) => (
          <Marker
            key={index}
            position={{ lat: restaurant.lat, lng: restaurant.lng }}
            title={`Restaurant ${index}`}
          />
        ))}
      </GoogleMap>
      <div className="restaurant-cards">
        {restaurantsMapCenter.map((restaurant, index) => {
          return <ResturantCard
          placeId={restaurant.placeId}
          business_status={restaurant.businessStatus}
          open_now={restaurant.isOpen}
            photoRefrence={restaurant.photos}
            rating={restaurant.rating}
            vicinity={restaurant.vicinity}
             user_ratings_total={restaurant.userRatings}
             restaurantName={restaurant.name}
          />;
        })}
      </div>
    </div>
  );
};

export { MapComponent };
