import { useState, useEffect, useRef } from 'react'
import Marker from './Map/Marker';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTourPlanStore } from '../store';
import { Place } from '../store/useTourPlanStore';


type MyMapComponentProps = {
    res?: any,
    place?: Place
    originDestination?: {
      origin: Place,
      destination: Place
    }
  }

function MyMapComponent({res, place, originDestination}:MyMapComponentProps) {
        const ref = useRef<HTMLDivElement>(null);
        const [map, setMap] = useState<google.maps.Map>();
        const [places, setPlaces] = useState<any>([]);
        const {updatePlan} = useTourPlanStore()
        const { id } = useParams()
        const [newLatLng, setNewLatLng] = useState<any>()
        const {pathname} = useLocation()

        const saveData = (val:string[], key: string) => {
            if(id) {
                // console.log(val, key, id);
                updatePlan(val, key, id)
            }
        }

        useEffect(() => {
            if(place && place.length > 0) {
                console.log({place});
                setNewLatLng({lat: place[place.length - 1]?.location?.lat, lng: place[place.length - 1]?.location?.lng})
            }
        },[place])
        
        useEffect(() => {
          ref.current && newLatLng && setMap(new window.google.maps.Map(ref.current, {center:{lat: newLatLng.lat, lng: newLatLng.lng},zoom: 12,}));
          setPlaces(place)
        },[newLatLng])

        // Make map
        useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {center:{lat: 0, lng: 0},zoom: 2,}));
        }
        }, [ref, map]);

        useEffect(() => {
            // console.log(res, places);
            res && setPlaces((prev) => {
                console.log({prev});
               return [...(prev || []), res]
            }
            );

            res && map?.setOptions({
                center: {
                    lat: res.location.lat(),
                    lng: res.location.lng()
                },
                zoom:12
            })
        },[res])

        useEffect(() => {
        // console.log({places});
        places?.length > 0 && saveData(places, 'place')
        },[places])

        const directionsServiceRef = useRef<any>(null);
        const directionsRendererRef = useRef<any>(null);
        const [originLatLng, setOriginLatLng] = useState<any>(null);
        const [destinationLatLng, setDestinationLatLng] = useState<any>(null);

        if(!pathname.includes('edit')) {
            // Optimize root

            useEffect(() => {

                if(originDestination?.origin && originDestination?.destination) {
                //     // console.log('>>>>>>>>>>>>>',originDestination);
                    const {origin, destination} = originDestination
                // const originLatLng = new google.maps.LatLng(origin.lat, origin.lng);
                // const destinationLatLng = new google.maps.LatLng(destination.lat, destination.lng);
                setOriginLatLng(new google.maps.LatLng(origin.lat, origin.lng))
                setDestinationLatLng(new google.maps.LatLng(destination.lat, destination.lng))
            
                //       const directionsService = new google.maps.DirectionsService();
                //       const directionsRenderer = new google.maps.DirectionsRenderer({ map });
                    
                //       const request = {
                //         origin: originLatLng,
                //         destination: destinationLatLng,
                //         travelMode: 'DRIVING',
                //       };
        
                //       directionsService.route(request, function (result, status) {
                //         // console.log(request);
                //         if (status === 'OK') {
                //           directionsRenderer.setDirections(result);
                //         }
                //       });
                
            }
            },[originDestination])

            useEffect(() => {
                    directionsServiceRef.current = new window.google.maps.DirectionsService();
                    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({ map });
               originLatLng && destinationLatLng && displayRoute();
            },[originLatLng, destinationLatLng])

            const displayRoute = () => {
                const request = {
                  origin: originLatLng,
                  destination: destinationLatLng,
                  travelMode: 'DRIVING',
                };
                directionsServiceRef.current.route(request, (result, status) => {
                    if (status === 'OK') {
                        directionsRendererRef.current.setDirections(result);
                    }
                });
            };
        }
      
    return (
        <>
            <div className='w-3/4 gmap' ref={ref} >
                {places?.length > 0 && places.map((latLng:google.maps.LatLng, i:number) => (
                    <Marker key={i} map={map} data={latLng.location} />
                ))}
            </div>
        </>
        )
      }


export default MyMapComponent


