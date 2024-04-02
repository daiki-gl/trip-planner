import { useRef, useEffect } from "react";
import { Place, PlanData } from "../../types/index.type";

type AutoCompleteProps = {
    setRes: React.Dispatch<React.SetStateAction<Place | undefined>>,
    names?: string[]
}

const AutoComplete = ({setRes, names}:AutoCompleteProps) => {
 const autoCompleteRef = useRef<any>();
 const inputRef = useRef<HTMLInputElement>(null);
 const options = {
  fields: ["address_components", "geometry", "icon", "name"],
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