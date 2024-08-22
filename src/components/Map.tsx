"use client";

import { geoLocation } from "@/types/global-types";
import { GoogleMap, Autocomplete, AutocompleteProps, CircleProps, Circle, useGoogleMap } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

//Map's styling
export const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
};

const MapComponent = () => {
  const [defaultMapCenter, setDefaultMapsCenter] = useState<geoLocation>({
    lat: 35.8799866,
    lng: 76.5048004,
  });
  const defaultMapZoom = 15;

  function getCurrentUserLocation(): void {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDefaultMapsCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          return toast.success(
            `Your latitude is: ${position.coords.latitude} and your longitude is: ${position.coords.longitude}`
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
  const getRestaurantsList = async () => {
    try {
    //     const inp = places;
    //   const autoComplete = new google.maps.places.Autocomplete(inp, 
    // {
    //     types:['geocode']
    // }
    // );
    //    autoComplete.addListener('place_changed', SearchNearbyPlaces);
    //   const place = autoComplete.getPlace()
    //   console.log(place);
    const map = new google.maps.Map(document.getElementById('map'), {
        center:defaultMapCenter,
        zoom:defaultMapZoom
    })
 const service = new google.maps.places.PlacesService(map);
 service.nearbySearch({
    location:defaultMapCenter,
    radius:1500,
    type:'restaurant'
 }, callback);

    } catch (error) {
      console.log(error);
    }
  };

  function callback (results:any, status:boolean){
   
  if(status){
console.log(results.length);
for(let i=0; i<= results.length; i++){
    google.maps.places.Place.searchByText('restaurants');
    createMarker(results[i])
}
  }
}

  useEffect(() => {
      getCurrentUserLocation();
      getRestaurantsList();
    // getRestaurantsList();
  }, []);
  return (
    <div className="w-full">
        <input type="text" name="places" id="places" style={{position:'absolute'}}  />
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        <Circle center={defaultMapCenter} draggable={true} key={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}/>
      </GoogleMap>
      <script src="https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=AIzaSyCv3GJqdkElGvLtATWhPffwAFjMptZUA4g" defer></script>
    </div>
  );
};

export { MapComponent };
