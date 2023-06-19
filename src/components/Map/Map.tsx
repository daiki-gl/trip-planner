import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MyMapComponent from "../MyMapComponent";
import { Place } from "../../store/useTourPlanStore";

type MapProps = {
  data?: any,
  place?: Place
  originDestination?: {
    origin: Place,
    destination: Place
  }
}

const Map = ({data, place, originDestination}: MapProps) => {
  const render = (status:string) => {
  switch (status) {
    case Status.LOADING:
      return <p>Loading...</p>;
    case Status.FAILURE:
      return <p>Error occurred</p>;
    case Status.SUCCESS:
      return <MyMapComponent res={data} place={place} originDestination={originDestination} />;
  }
};
  return (
    <Wrapper apiKey={import.meta.env.VITE_GOOGLE_API_KEY} render= {render}>
    </Wrapper>
  )
}

export default Map