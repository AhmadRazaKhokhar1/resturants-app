// "use client";
// import { geoLocation } from "@/types/geo.location.type";
// import { useEffect, useState } from "react";
// import GoogleMapReact from "google-map-react";

import { MapComponent } from "@/components/Map";
import { MapProvider } from "@/providers/map-providor";

// export default function Home() {
//   const [geoLocation, setGeoLocation] = useState<geoLocation>({
//     longitude: 0,
//     latitude: 0,
//   });
//   const [zoom, setZoom] = useState<Number>(11);

//   async function getUserCurrentLocation() {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setGeoLocation({
//           longitude: position.coords.longitude,
//           latitude: position.coords.latitude,
//         });
//         // const defaultProps = {
//         //   center: {
//         //     lat: 10.99835602,
//         //     lng: 77.01502627,
//         //   },
//         //   zoom: 11,
//         // };
//       },
//       (failed) => {
//         console.error(failed);
//       }
//     );
//   }

//   useEffect(() => {
//     getUserCurrentLocation();
//   }, []);
//   const center = {
//     lat:geoLocation.latitude,
//     lng:geoLocation.longitude
//   }

  
//   return (
//    <div className="w-full">
//      {/* <GoogleMapReact
//       bootstrapURLKeys={{ key: "AIzaSyDJSRU7GYpQMwIZqVpAJvA3HD6YOpXU_tA" }}
//       defaultCenter={center}
//       defaultZoom={zoom}
//     >
//       <div>
//         Hello
//         </div>;
//     </GoogleMapReact> */}
//     <Map
//    </div>
//   );
// }


export default function page() {
  return (
    <div>
      <MapProvider>
        <main>
            <MapComponent/>
        </main>
      </MapProvider>
    </div>
  )
}
