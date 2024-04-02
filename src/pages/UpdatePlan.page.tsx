import React, { useEffect, useState } from 'react'
import { useTourPlanStore, useUserStore } from '../store'
import Date from '../components/Date'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Map from '../components/Map/Map'
import AutoComplete from '../components/Map/Autocomplete'
import PlaceName from '../components/PlaceName'
import { Place, PlanData } from '../types/index.type'
import { KeyVal } from '../helper'
// import { Place } from '../store/useTourPlanStore'

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
    <div className='mx-auto flex justify-between'>
      <div className='relative pt-6 px-4 w-1/4'>
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
                <AutoComplete setRes={setRes} setNames={setNames} setPlanData={setPlanData} planData={planData} names={names} />
                <ul>
                    {planData && planData?.place?.length > 0 && planData.place?.map((place) => (
                    <PlaceName key={place.name} data={planData.place} name={place.name} id={planData._id} setPlanData={setPlanData} />
                    ))}
                    {/* {names && planData && names?.length > 0 && names.map((name) => (
                    <PlaceName key={name} data={planData?.place} name={name} id={planData._id} setPlanData={setPlanData} />
                    ))} */}
                </ul>
            </div>

            <div>
                <label htmlFor='budgets'>Budgets:</label>
                <input className='w-full px-3 py-1 rounded-md' id='budgets' defaultValue={planData?.budgets && planData.budgets} type="number" name='budgets' onBlur={e => saveData(e)} />
            </div>

            {/* {planData?.budgets && (

                <div>
                <h2>Expenses</h2>
                <h4>Budgets: ${tourPlan.budgets}</h4>
                <div>
                    <label htmlFor="expense">
                        $
                        <input type="number" name="expense" id='expense' />
                    </label>

                    <span>
                        <input type="radio" id='flights' name="category" value="flights" />
                        <label htmlFor="flights">Flights</label>
                    </span>

                    <span>
                        <input type="radio" id='food' name="category" value="food" />
                        <label htmlFor="food">Food</label>
                    </span>

                    <span>
                        <input type="radio" id='lodging' name="category" value="lodging" />
                        <label htmlFor="lodging">Lodging</label>
                    </span>

                    <span>
                        <input type="radio" id='sightseeing' name="category" value="sightseeing" />
                        <label htmlFor="sightseeing">Sightseeing</label>
                    </span>

                    <span>
                        <input type="radio" id='shopping' name="category" value="shopping" />
                        <label htmlFor="shopping">Shopping</label>
                    </span>

                    <span>
                        <input type="radio" id='other' name="category" value="other" />
                        <label htmlFor="other">Other</label>
                    </span>

                    <div>
                        <button type='submit'>Save</button>
                    </div>
                </div>
                <button type="button">Add an expense</button>
            </div>
            )} */}
            
        </form>

        <Link className='block mt-8 text-center font-semibold  bg-yellow-400 text-white px-5 py-2 rounded-md hover:bg-yellow-600 duration-300' to={'/'} >Back to Home</Link>
        </div>

        <Map data={res} place={planData?.place} />

    </div>
  )
}

export default UpdatePlan