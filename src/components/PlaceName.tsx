import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { useTourPlanStore } from '../store'

type PlaceNameProps = {
    id: string,
    data: {
        name: string,
        location: google.maps.LatLng
    }[],
    name: string
}

const PlaceName = ({id,data,name}:PlaceNameProps) => {
    const {updatePlan} = useTourPlanStore()

    const deletePlace = () => {
        const remainData = data.filter(data =>  name !== data.name)
        updatePlan(remainData, 'place', id)
    }

  return (
    <li className='flex'>
        <span>{name}</span>
        <button className='ml-auto mr-2' type='button' onClick={deletePlace}><BsTrash /></button>
    </li>
  )
}

export default PlaceName