"use client";
import {
  defaultMapContainerStyle,
  defaultMapOptions,
} from "@/app/globals/global-vars";
// import * as GoogleMapTypes from "@/types/global-types";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ResturantCard from "../Retaurant/ResturantCard";
import AutoCompleteDropDown from "./AutoCompleteDropDown";
import { ImSpinner2 } from "react-icons/im";
const MapComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [defaultMapCenter, setDefaultMapsCenter] = useState<any>({
    lat: 33.8799866,
    lng: 71.5048004,
    alt: null,
  });

  const [restaurantsMapCenter, setRestaurantsMapCenter] = useState<any[]>([]);

  const defaultMapZoom = 15;
  const [autoComplete, setAutoComplete] = useState<any>(null);
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
          lat: location?.lat(),
          lng: location?.lng(),
          alt: location?.alt(),
        });
      }
    }
  };

  // Get the user's current location
  const getCurrentUserLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position: {
          coords: {
            latitude: number;
            longitude: number;
            altitude: number | null;
          };
        }) => {
          setDefaultMapsCenter({
            lat: position.coords?.latitude,
            lng: position.coords?.longitude,
            alt: position.coords?.altitude ?? 0,
          });
          toast.success(
            `Your location is marked at Latitude ${position.coords.latitude} and Longitude ${position.coords.longitude}`
          );
        },
        (failed: any) => {
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
    if (!mapRef.current || !placesService) {
      toast.error("Map not loaded yet.");
      return;
    }
    toast.loading("loading nearby restaurants", {
      className: "loading-toast",
      duration: 30,
      ariaProps: { "aria-live": "polite", role: "alert" },
      style: {
        accentColor: "green",
        animation: "ease-in-out",
        color: "green",
      },
    });
    const query = {
      location: new google.maps.LatLng(
        defaultMapCenter.lat,
        defaultMapCenter.lng
      ),
      radius: 5500,
      type: "restaurant",
    };
    placesService?.nearbySearch(query, (results, status) => {
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
          businessStatus: result.business_status ?? "N/A",
        }));
        if (results.length === 0) {
          return toast.error("No restaurants found nearby!");
        }
        setRestaurantsMapCenter(restaurantsData);
        toast.success("Restaurants have been marked successfully.");
      } else {
        toast.error("No resturants found nearby");
        console.log("PlacesService status:", status);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    let newPlacesService;
    if (mapRef.current) {
      newPlacesService = new google.maps.places.PlacesService(mapRef.current);
      setPlacesService(newPlacesService);
    }
  }, [mapRef.current]);

  useEffect(() => {
    if (placesService) {
      setTimeout(() => {
        getRestaurantsList();
      }, 500);
    }
    setIsLoading(false);
  }, [placesService]);
  return (
    <div className="w-full">
      {isLoading && (
        <ImSpinner2
          color="green"
          size={50}
          className="absolute top-1/2 left-1/2 animate-spin"
        />
      )}
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
          <AutoCompleteDropDown
            key={"autocomplete"}
            getCurrentUserLocation={getCurrentUserLocation}
            getRestaurantsList={getRestaurantsList}
          />
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
      {restaurantsMapCenter.length >= 1 &&<h2 className="mx-auto my-5 text-center font-extrabold text-2xl font-serif text-green-600">
        Restaurants
      </h2>}
      <div className="restaurant-cards flex flex-wrap gap-2 my-2 items-center justify-center">
        {restaurantsMapCenter.length >= 1 ? (
          restaurantsMapCenter.map((restaurant, index) => {
            return (
              <ResturantCard
                key={index}
                placeId={restaurant.placeId}
                business_status={restaurant.businessStatus}
                isOpen={restaurant.isOpen}
                photoRefrence={restaurant.photos}
                rating={restaurant.rating}
                vicinity={restaurant.vicinity}
                user_ratings_total={restaurant.userRatings}
                restaurantName={restaurant.name}
              />
            ); 
          })
        ) : (
          <strong>Enter Location To See Nearby Places!</strong>
        )}
      </div>
    </div>
  );
};

export { MapComponent };
