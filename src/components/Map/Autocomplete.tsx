import { useRef, useEffect, useState } from "react";
import { Place, PlanData } from "../../types/index.type";
// import { Place } from "../../store/useTourPlanStore";
// import Geocoder from "./Geocoder";

type AutoCompleteProps = {
    setRes: React.Dispatch<React.SetStateAction<Place | undefined>>,
    setNames: React.Dispatch<string[]>,
    setPlanData: React.Dispatch<React.SetStateAction<PlanData | undefined>>,
    planData: PlanData | undefined,
    names?: string[]
}

const AutoComplete = ({setRes, setNames, planData, setPlanData, names}:AutoCompleteProps) => {
 const autoCompleteRef = useRef<any>();
 const inputRef = useRef<HTMLInputElement>(null);
 const options = {
  fields: ["address_components", "geometry", "icon", "name"],
//   types: ["establishment"]
 };

 useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current!,
            options
            );
    }, []);
    
    function addAddress() {
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            setRes({location:place.geometry.location, name: place.name})
            inputRef.current!.value = ''

            if(names) {
                for(let i = 0; i > names.length ; i++) {
                    if(names[i].includes(place.name)) {
                        return names[i]
                    }
                    return [...(names[i] || []), place]
                }
            }

            // setNames((prev: string[] | undefined) => {
            //     if (prev && prev.includes(place.name)) {
            //         return prev;
            //     }
            //     return [...(prev || []), place.name];
            //     });

                // setPlanData((prev: planData| undefined) => (
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
 
 return (
    <div className="mb-3">
        <label htmlFor="address" className="font-semibold">Address:</label>
        <input className="block w-full px-2 py-1 rounded-md" id="address" ref={inputRef} onChange={addAddress} />
    </div>
 );
};
export default AutoComplete;