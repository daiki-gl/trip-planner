import React, { useEffect, useState } from 'react'
import { useTourPlanStore, useUserStore } from '../store'
import { useNavigate } from 'react-router-dom'
import TourPlanCard from '../components/TourPlanCard'

const Home = () => {
    const { user, getUser } = useUserStore()
    const {createPlan, getPlans, tourPlans} = useTourPlanStore()
    const navigate = useNavigate()
    const [ token, setToken ] = useState<any>(null)
    
    useEffect(() => {
      const _token = window.localStorage.getItem("token")
      
      if(!_token) {
        navigate('/login')
      } else {
        _token && getUser(_token)
        setToken(_token)
      }
    },[])
    
    useEffect(() => {
      user && user.id && getPlans(user.id)
      console.log(user);
    },[user])

    const createNewPlan = async() => {
     const res = await createPlan(token)
     const newPlan = await res?.json()
     newPlan._id && navigate(`/plan/edit/${newPlan._id}`)
    }


  return (
    <div>
      {user && (
        <div className='-mt-[68px] bg-[url("./assets/bg-image.jpg")] bg-no-repeat bg-cover min-h-[500px] pt-[68px] px-10'>
          <div className='flex flex-col h-[300px] items-center justify-center'>
            <div className='my-10'>
            <h2 className='text-6xl font-bold text-center mb-3'>PLANNING BEST TRIP</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque obcaecati consequuntur consectetur, quos dolores nulla.</p>
            </div>
            <div>
              <button className='bg-yellow-400 rounded-lg px-10 py-3 hover:bg-yellow-600 duration-200' onClick={createNewPlan} >Create new plan</button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto my-8">
        <h3 className="text-3xl font-bold mb-3">Your Plan <span className='text-sm'> (name: {user?.username})</span></h3>
        <div className="grid grid-cols-4 gap-4">
        {tourPlans && tourPlans?.length > 0 && tourPlans.map(plan => (
          <TourPlanCard key={plan._id} {...plan} />
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default Home