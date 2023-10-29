import { useRef, useEffect, useState } from "react";
import { Place } from "../../store/useTourPlanStore";
// import Geocoder from "./Geocoder";

type AutoCompleteProps = {
    setRes: React.Dispatch<React.SetStateAction<any>>,
    setNames: React.Dispatch<any>,
    setPlanData: React.Dispatch<any>
    planData: any
}

const AutoComplete = ({setRes, setNames, planData, setPlanData}:AutoCompleteProps) => {
 const autoCompleteRef = useRef<any>();
 const inputRef = useRef<any>();
 const options = {
  fields: ["address_components", "geometry", "icon", "name"],
//   types: ["establishment"]
 };

 useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
            );
    }, []);
    
    function addAddress() {
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            // console.log({ place });
            setRes({location:place.geometry.location, name: place.name})
            inputRef.current.value = ''

            setNames((prev: string[] | undefined) => {
                if (prev && prev.includes(place.name)) {
                    return prev;
                }
                return [...(prev || []), place.name];
                });

                // setPlanData((prev: any | undefined) => (
                //     {
                //     ...prev,
                //     place: [
                //       ...(prev?.place || []),
                //       {
                //         location: place.geometry.location,
                //         name: place.name
                //       }
                //     ]
                //   }));
            });
    }
        
    // useEffect(() => {
    //         console.log('>>>>>>>>>',planData);
    // },[planData])
 
 return (
    <div className="mb-3">
        <label htmlFor="address" className="font-semibold">Address:</label>
        <input className="block w-full px-2 py-1 rounded-md" id="address" ref={inputRef} onChange={addAddress} />
    </div>
 );
};
export default AutoComplete;