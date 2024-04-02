import { useEffect, useState } from 'react'

type latLngType = {
  map: google.maps.Map,
  position: google.maps.LatLng
}

const Marker = ({map, data}: {map: google.maps.Map, data: google.maps.LatLng}) => {
    const [marker, setMarker] = useState<google.maps.Marker>();
    const [latLng, setLatLng ] = useState<latLngType>()

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
            if (marker && latLng) {
              marker.setOptions(latLng as google.maps.MarkerOptions);
            }
          },[latLng])

  return null
}

export default Marker