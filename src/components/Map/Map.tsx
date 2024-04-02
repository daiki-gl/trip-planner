import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MyMapComponent from "../MyMapComponent";
import { OriginDestinationProps, Place } from "../../types/index.type";

export type MapProps = {
  data?: Place,
  place?: Place[],
  originDestination?: OriginDestinationProps
}

const Map = ({data, place, originDestination}: MapProps) => {
  const render = (status:Status) => {
  switch (status) {
    case Status.LOADING:
      return <p>Loading...</p>;
    case Status.FAILURE:
      return <p>Error occurred</p>;
    case Status.SUCCESS:
      return <MyMapComponent res={data} place={place} originDestination={originDestination} />;
  }
};
  return (<Wrapper apiKey={import.meta.env.VITE_GOOGLE_API_KEY} render= {render}></Wrapper>)
}

export default Map