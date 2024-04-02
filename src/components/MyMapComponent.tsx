import { useState, useEffect, useRef } from 'react'
import Marker from './Map/Marker';
import { useLocation, useParams } from 'react-router-dom';
import { useTourPlanStore } from '../store';
import { KeyVal } from '../helper';
import { OriginDestinationProps, Place } from '../types/index.type';

type MyMapComponentProps = {
    res?: Place,
    place?: Place[]
    originDestination?: OriginDestinationProps
  }

type LatLngType = {
lat: number
lng: number
}

function MyMapComponent({res, place, originDestination}:MyMapComponentProps) {
        const ref = useRef<HTMLDivElement>(null);
        const [map, setMap] = useState<google.maps.Map>();
        const [places, setPlaces] = useState<Place[]>([]);
        const {updatePlan} = useTourPlanStore()
        const { id } = useParams()
        const [newLatLng, setNewLatLng] = useState<LatLngType>()
        const {pathname} = useLocation()
        const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
        const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
        const [originLatLng, setOriginLatLng] = useState<google.maps.LatLng | null>(null);
        const [destinationLatLng, setDestinationLatLng] = useState<google.maps.LatLng | null>(null);

        const saveData = (val:Place[], key: string) => {
            id && updatePlan(val, key as keyof KeyVal, id)
        }

        useEffect(() => {
            if(place && place.length > 0) {
                const lat = Number(place[place.length - 1]?.location.lat)
                const lng = Number(place[place.length - 1]?.location.lng)
                setNewLatLng({lat, lng})
            }
        },[place])
        
        useEffect(() => {
          ref.current && newLatLng && setMap(new window.google.maps.Map(ref.current, {center:{lat: newLatLng.lat, lng: newLatLng.lng},zoom: 12,}));
          place && setPlaces(place)
        },[newLatLng])

        // Make map
        useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {center:{lat: 0, lng: 0},zoom: 2,}));
        }
        }, [ref, map]);

        useEffect(() => {
            res && setPlaces((prev) => {
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
            places?.length > 0 && saveData(places, 'place')
        },[places])

        if(!pathname.includes('edit')) {
            useEffect(() => {
                if(originDestination?.origin && originDestination?.destination) {
                    const {origin, destination} = originDestination
                    setOriginLatLng(new google.maps.LatLng(Number(origin.lat), Number(origin.lng)))
                    setDestinationLatLng(new google.maps.LatLng(Number(destination.lat), Number(destination.lng)))
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
                  travelMode: 'DRIVING' as google.maps.TravelMode,
                };
                directionsServiceRef.current?.route(request as google.maps.DirectionsRequest, (result, status) => {
                        if (status === 'OK') {
                            directionsRendererRef.current?.setDirections(result);
                        }
                });
            };
        }
      
    return (
        <>
            <div className='w-3/4 gmap' ref={ref} >
                {map && places?.length > 0 && places.map((latLng, i:number) => (
                    <Marker key={i} map={map} data={latLng.location} />
                ))}
            </div>
        </>
        )
      }


export default MyMapComponent


