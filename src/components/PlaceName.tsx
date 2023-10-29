import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { useTourPlanStore } from '../store'

type PlaceNameProps = {
    id: string,
    data?: {
        name: string,
        location: google.maps.LatLng
    }[],
    name: string
    setPlanData: React.Dispatch<any>
}

const PlaceName = ({id,data,name, setPlanData}:PlaceNameProps) => {
    const {updatePlan, getPlanById} = useTourPlanStore()
    const deletePlace = async() => {
        const remainData = data!.filter(data =>  name !== data.name)
        await updatePlan(remainData, 'place', id).then( async() => {
            const _data = await getPlanById(id)
            setPlanData(_data)
        })
    }

  return (
    <li className='flex'>
        <span>{name}</span>
        <button className='ml-auto mr-2' type='button' onClick={deletePlace}><BsTrash /></button>
    </li>
  )
}

export default PlaceName