"use client";
import { TbCurrentLocation } from "react-icons/tb";
import {
  defaultMapContainerStyle,
  defaultMapOptions,
} from "@/app/globals/global-vars";
import * as GoogleMapTypes from "@/types/global-types";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
// import { GoogleMap, Autocomplete, AutocompleteProps, CircleProps, Circle, useGoogleMap } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
// import {Loader} from '@react-google-maps/api';
import toast from "react-hot-toast";

const MapComponent = () => {
  const [defaultMapCenter, setDefaultMapsCenter] =
    useState<GoogleMapTypes.geoLocation>({
      lat: 35.8799866,
      lng: 76.5048004,
    });
  const [restaurantsMapCenter, setRestaurantsMapCenter] = useState<
    GoogleMapTypes.geoLocation[]
  >([{
    lat:0,
    lng:0,
    name:'',
    rating:null,
    placeId:''
  }]);
  const defaultMapZoom = 15;
  const [autoComplete, setAutoComplete] =
    useState<GoogleMapTypes.Autocomplete>(null);
  const mapRef = useRef<google.maps.Map>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>( 
  );

  //handle auto complete
  const onLoad = async (autoCompleteInstance: google.maps.places.Autocomplete) => {
    setAutoComplete(autoCompleteInstance);
  };

  const handlePlaceChange = async () => {
    if (autoComplete) {
      const place = autoComplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        setDefaultMapsCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
        const places = await google.maps.importLibrary('places');
        setPlacesService(places)
      }
    }
  };

  //getting user's current location
  function getCurrentUserLocation(): void {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDefaultMapsCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          return toast.success(
            `Your Current Location is Marked with latitude is: ${position.coords.latitude} and your longitude is: ${position.coords.longitude}`
          );
        },
        (failed) => {
          console.log(failed);
          toast.error(failed.message);
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("An Error Occured Please Try Again");
    }
  }

  //getting all the restaurants
  const getRestaurantsList = async () => {
    try {
      console.log(placesService)
      if (!placesService) {
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
      placesService.textSearch(query, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log("Results:", results); // Log results to debug
          const restaurantsData = results?.map((result) => (console.log({result})));
          setRestaurantsMapCenter((prevRestaurants)=>[...prevRestaurants, restaurantsData]);
          toast.success("The Restaurants are marked successfully");
        } else {
          console.log("PlacesService status:", status); // Log status if not OK
        }
      });
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    if (mapRef.current && restaurantsMapCenter.length > 0) {
      restaurantsMapCenter.forEach((restaurant, index) => {
       return new google.maps.marker.AdvancedMarkerElement({
          position: restaurant,
          map: mapRef.current,
          title: `Restaurant ${index}`,
        });
      });
    }
  },[restaurantsMapCenter]);
  console.log({restaurantsMapCenter})
  return (
    <div className="w-full">
      <input
        type="text"
        name="places"
        id="places"
        style={{ position: "absolute" }}
      />
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChange}>
          <div className="absolute flex lg:mt-[20%] lg:ml-[40%] md:mt-[40%] md:ml-[20%] sm:mt-[40%] sm:ml-[20%]  ml-[8%] mt-[40%] outline outline-green-600 rounded-md shadow-2xl shadow-black items-center bg-white overflow-hidden p-0">
            <input
              type="text"
              name="automcomplete"
              id="autocomplete"
              placeholder="Enter Destination"
              className="p-0 sm:p-2 lg:p-3 xl:p-3 w-52 sm:w-72 lg:w-96 z-10  outline-none overflow-hidden"
            />
            <button
              onClick={getCurrentUserLocation}
              className="p-1 bg-transparent"
            >
              <TbCurrentLocation size={20} color="green" />
            </button>
            <button className="bg-green-600 p-3" onClick={getRestaurantsList}>Get Restaurants</button>
          </div>
        </Autocomplete>
        <Marker position={defaultMapCenter} />
        {restaurantsMapCenter.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
