import React, { useEffect, useState } from 'react'

const Marker = ({map, data}:any) => {
    const [marker, setMarker] = useState<google.maps.Marker>();
    const [latLng, setLatLng ] = useState<any>()

          useEffect(() => {
            if (!marker) {
              setMarker(new google.maps.Marker());
            }
            return () => {
              if (marker) marker.setMap(null);
            };
          },[marker])

          useEffect(() => {
            setLatLng({map,position:data})
          }, [marker, data]);
          
          useEffect(() => {
            if (marker) {
              marker.setOptions(latLng);
            }
          },[latLng])


  return null
}

export default Marker