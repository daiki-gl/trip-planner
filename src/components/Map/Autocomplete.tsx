import { useRef, useEffect, useState } from "react";
// import Geocoder from "./Geocoder";

const AutoComplete = ({setRes}:any) => {
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
        console.log({ place });
        setRes({location:place.geometry.location, name: place.name})
        inputRef.current.value = ''
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