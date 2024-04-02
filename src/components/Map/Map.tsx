import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MyMapComponent from "../MyMapComponent";
// import { Place } from "../../store/useTourPlanStore";
import { useEffect } from "react";
import { Place } from "../../types/index.type";

export type MapProps = {
  data?: {
    location: google.maps.LatLng,
    name: string
  }
  place?: Place[],
  originDestination?: {
    origin?: google.maps.LatLng
    destination?: google.maps.LatLng
  }
}

const Map = ({data, place, originDestination}: MapProps) => {
// const Map = ({data, place}: MapProps) => {
  const render = (status:Status) => {
  switch (status) {
    case Status.LOADING:
      return <p>Loading...</p>;
    case Status.FAILURE:
      return <p>Error occurred</p>;
    case Status.SUCCESS:
      return <MyMapComponent res={data} place={place} originDestination={originDestination} />;
      // return <MyMapComponent res={data} place={place} />;
  }
};
  return (
    <>
    <Wrapper apiKey={import.meta.env.VITE_GOOGLE_API_KEY} render= {render}></Wrapper>
    </>
  )
}

export default Map