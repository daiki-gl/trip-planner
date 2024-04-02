import React, { useEffect, useState } from 'react'
import { useTourPlanStore } from '../store'
import Date from '../components/Date'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Map from '../components/Map/Map'
import AutoComplete from '../components/Map/Autocomplete'
import PlaceName from '../components/PlaceName'
import { Place, PlanData } from '../types/index.type'
import { KeyVal } from '../helper'

const UpdatePlan = () => {
    const {updatePlan, getPlanById} = useTourPlanStore()
    const { id } = useParams()
    const [res, setRes] = useState<Place>()
    const [planData, setPlanData] = useState<PlanData>()
    const [names, setNames] = useState<string[]>()

    const saveData = (e:React.FocusEvent<HTMLTextAreaElement, Element> | React.FocusEvent<HTMLInputElement, Element>) => {
        const val = e.target.value
        const key = e.target.name
        if(id) {
            updatePlan(val, key as keyof KeyVal, id)
        }
    }

    useEffect(() => {
        (async() => {
            id && setPlanData(await getPlanById(id))
        })()
    },[])
    
    useEffect(() => {
        if(planData && planData.place.length > 0) {
            setNames(planData?.place.map((place) => place.name))
        }
    },[planData])

  return (
    <div className='flex flex-col-reverse md:flex-row justify-end md:justify-between min-h-screen'>
      <div className='relative py-6 px-4 w-full md:w-1/4 min-w-[250px] md:min-h-screen flex-grow md:flex-grow-0'>
        <form>
            <div className='mb-3'>
                <label className='font-semibold mb-1' htmlFor="title">Title:</label>
                <input className='block w-full px-3 py-2 rounded-md' id='title' defaultValue={planData?.title && planData.title} name='title' type="text" placeholder='Enter a trip name' onBlur={e => saveData(e)} />
            </div>

            <div className='mb-3'>
                <label className='font-semibold' htmlFor="note">
                    Note:
                </label>
                    <textarea className='block w-full px-3 py-2 rounded-md' name='note' defaultValue={planData?.note && planData.note} id='note' 
                    placeholder='Enter something here...' 
                    onBlur={e => saveData(e)}></textarea>
            </div>

            <div className='mb-3'>
                <Date id={id} />
            </div>

            <div className='mb-3'>
                <AutoComplete setRes={setRes} names={names} />
                <ul>
                    {planData && planData?.place?.length > 0 && planData.place?.map((place) => (
                    <PlaceName key={place.name} data={planData.place} name={place.name} id={planData._id} setPlanData={setPlanData} />
                    ))}
                </ul>
            </div>

            <div>
                <label htmlFor='budgets'>Budgets:</label>
                <input className='w-full px-3 py-1 rounded-md' id='budgets' defaultValue={planData?.budgets && planData.budgets} type="number" name='budgets' onBlur={e => saveData(e)} />
            </div>
        </form>

        <Link className='block mt-8 text-center font-semibold  bg-yellow-400 text-white px-5 py-2 rounded-md hover:bg-yellow-600 duration-300' to={'/'} >Back to Home</Link>
        </div>

        <Map data={res} place={planData?.place} />

    </div>
  )
}

export default UpdatePlan