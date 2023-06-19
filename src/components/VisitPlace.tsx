import React from 'react'
import { Place } from '../store/useTourPlanStore'

const VisitPlace = ({place}:any) => {

    const setPlaceData = () => {
      console.log(place);
    }
  return (
    <div>
        <button onClick={setPlaceData} key={place.name}>{place.name}</button>
    </div>
  )
}

export default VisitPlace