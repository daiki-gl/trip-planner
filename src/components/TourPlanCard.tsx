import { Link } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { useTourPlanStore } from '../store'
import { TourPlan } from '../types/index.type'


const TourPlanCard = (props:TourPlan) => {
    const {deletePlan, getPlans} = useTourPlanStore()
    const { _id, title, userId, note, date} = props

    const handlePlanDelete = async () => {
        if (_id) {
            await deletePlan(_id)
           userId && getPlans(userId._id)
        }
    }

  return (
    <div className='bg-white rounded-lg text-gray-800 hover:shadow-2xl duration-300'>
        <Link to={`/plan/${_id}`} state={props} >
            <div className='px-5 pt-5'>
            <h1 className='text-xl font-bold'>{title || 'No title'}</h1>
            <span className='text-xs text-slate-400'>Date: {date && `${date[0]} -  ${date[1]}`}</span>
            <p className='line-clamp-2'>{note}</p>
            </div>
        </Link>
        <div className='flex mt-3 items-end justify-start md:justify-end px-5 pb-5'>
            <Link to={`/plan/edit/${_id}`}><FiEdit /></Link>
            <button className='ml-3' onClick={handlePlanDelete}><BsTrash /></button>
        </div>
    </div>
  )
}

export default TourPlanCard