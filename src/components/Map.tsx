"use client";

import { geoLocation } from "@/types/geo.location.type";
//Map component Component from library
import { GoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
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
  mapTypeId: "satellite",
};

const MapComponent = () => {
  const [defaultMapCenter, setDefaultMapsCenter] = useState<geoLocation>({
    lat: 35.8799866,
    lng: 76.5048004,
  });
  const defaultMapZoom = 11;

  function getCurrentUserLocation(): void {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDefaultMapsCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.success(
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

  useEffect(() => {
    getCurrentUserLocation();
  }, []);
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      ></GoogleMap>
    </div>
  );
};

export { MapComponent };
