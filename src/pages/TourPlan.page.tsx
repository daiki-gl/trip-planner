import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Map from '../components/Map/Map'
import VisitPlace from '../components/VisitPlace'
import { Place } from '../store/useTourPlanStore'

type OriginDestinationProps = {
  originDestination?: {
    origin: Place,
    destination: Place
  }
}

const TourPlanPage = () => {
    const {state} = useLocation()
    const {title, note, date, budgets, userId, place, placeNote} = state
    // console.log(state);
    const [originDestination, setOriginDestination] = useState<OriginDestinationProps | null>()

    const URL = import.meta.env.VITE_URL

    const findRoute = async () =>{
      if(originDestination?.origin && originDestination?.destination) {
        const res = await fetch(`${URL}/getDirection`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(originDestination)
        })
        return res
      }
    }

    const getSelectVal = (e:React.ChangeEvent<HTMLSelectElement>) => {
      const val = JSON.parse(e.target.value)
      const name = e.target.name
      setOriginDestination((prev) => ({...prev ,[name]: val}))
    }
    
    useEffect(() => {
      (async() => {
        const res = await findRoute()
        console.log(await res?.json());
      })()
    },[originDestination])


  return (
    <div className='mx-auto flex justify-between min-h-screen'>
      <div className='relative py-6 px-4 bg-blue-100 text-gray-800 w-1/4 min-h-screen'>
        <h1 className='text-xl font-bold mb-3'>{title || 'No title'}</h1>

        <div className='bg-white rounded-md pt-3 px-3 mb-3 overflow-y-auto min-h-20 max-h-[200px] font-semibold'>Note: 
          <span className='block pb-3 font-normal'>{note}</span>
        </div>
        
        <div className='font-semibold'>
          {date && date.length > 0 && (
            <>
              <p>Start Date - <span className='font-normal'>{date[0]}</span> </p>
              <p>Return Date - <span className='font-normal'>{date[1]}</span> </p>
            </>
          )
          }
        </div>

        <div className='bg-white rounded-md p-3 my-3'>
          <p className='font-semibold' >Visit Place: </p>
            <ul>
              {place?.length > 0 && place.map((_place:any) => (
                <li className='ml-4 list-disc' key={_place.name}>{_place.name}</li>
                ))}
            </ul>
        </div>
        
        <div>
          <p className='font-semibold'>Budgets: <span className='font-normal'>${budgets}</span></p>
        </div>

        {place?.length > 0 && (
          <form className='mt-10'>
            <p className='text-lg font-bold mb-2'>Find Optimize Route</p>

            <div className='mb-4'>
                ORIGIN: 
              <select className='block w-full mt-1 px-3 py-2 rounded-md' onChange={(e) => getSelectVal(e)} name="origin">
                <option value="" defaultChecked>Select the place</option>
                    {place?.length > 0 && place.map((_place: any) => (
                      <option key={_place.name} value={JSON.stringify(_place.location)}>{_place.name}</option>
                      ))}
              </select>
            </div>

          <div>
          DESTINATION:
            <select className='block w-full mt-1 px-3 py-2 rounded-md' onChange={(e) => getSelectVal(e)} name="destination">
            <option value="" defaultChecked>Select the place</option>
                  {place?.length > 0 && place.map((_place: any) => (
                    <option key={_place.name} value={JSON.stringify(_place.location)}>{_place.name}</option>
                    ))}
            </select>
            </div>
          </form>
        )}

        <Link className='block mt-8 text-center font-semibold  bg-yellow-400 text-white px-5 py-2 rounded-md hover:bg-yellow-600 duration-300' to={'/'} >Back to Home</Link>

      </div>
      <Map  place={place} originDestination={originDestination && originDestination} />
    </div>
  )
}

export default TourPlanPage