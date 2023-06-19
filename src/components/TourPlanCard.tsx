import React from 'react'
import { Link } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { useTourPlanStore } from '../store'
import { Place } from '../store/useTourPlanStore'

type TourPlanProps = { 
    _id?: string | null,
    title?: string | null,
    userId?: {
        username: string
    } | null,
    note?: string | null,
    date?: string[] | null,
    place: Place | null,
    placeNote: string[] | null,
    budgets: number,
}

const TourPlanCard = (props:TourPlanProps) => {
    const {deletePlan} = useTourPlanStore()
    const { _id, title, userId, note, date} = props
  return (
    <div className='bg-white rounded-lg text-gray-800 hover:shadow-2xl duration-300'>
        <Link to={`/plan/${_id}`} state={props} >
            <div className='px-5 pt-5'>
            <h1 className='text-xl font-bold'>{title || 'No title'}</h1>
            <span className='text-xs text-slate-400'>Date: {date && `${date[0]} -  ${date[1]}`}</span>
            <p>{note}</p>
            </div>
        </Link>
        <div className='flex mt-3 items-end justify-end px-5 pb-5'>
            <Link to={`/plan/edit/${_id}`}><FiEdit /></Link>
            <button className='ml-3' onClick={() => _id && deletePlan(_id)}><BsTrash /></button>
        </div>
    </div>
  )
}

export default TourPlanCard