import { create } from 'zustand'
import { createPlan, deletePlan, getPlanById, getPlans, updatePlanData } from '../helper'

type TourPlan = {
    _id: string | null,
    title: string | null,
    userId: {
        username: string
    } | null,
    note: string | null,
    date: string[] | null,
    place: Place | null,
    placeNote: string[] | null,
    budgets: number,
}

export type Place = {
        name: string
        location: google.maps.LatLng
}[]

type TourPlanStore = {
    tourPlan: TourPlan,
    tourPlans: TourPlan[] | null,
    error: string | null,
    getPlans: (id:string) => void
    getPlanById: (id:string) => void
    updatePlan: (data:string | Date | Place, key:string, id:string) => Promise<Response | undefined>
    createPlan: (token:string) => Promise<Response | undefined>
    deletePlan: (id:string) => void
}

const useTourPlanStore = create<TourPlanStore>((set) => ({
    tourPlan: {
        _id: null,
        userId: null,
        title: null,
        note: null,
        date: null,
        place: null,
        placeNote: null,
        budgets: 0,
    },
    tourPlans: null,
    error: null,

    getPlans: async (id) => {
        try {
            const res = await getPlans(id)
            const plans = await res.json()
            set({tourPlans: plans})
        } catch (e) {
            const error = (e as Error).message
            set({error})
        }
    },

    getPlanById: async (id) => {
        try {
            const res = await getPlanById(id)
            const tourPlan = await res.json()
            set({tourPlan})
            return tourPlan
        } catch (e) {
            const error = (e as Error).message
            set({error})
        }
    },

    updatePlan: async (data, key, id) => {
        try{
            const res = await updatePlanData(data, key, id)
            // console.log(await res.json());
            return res
        }catch(e) {
            const error = (e as Error).message
            set({error})
        }
    },
    createPlan: async (token) => {
        try {
            const res = await createPlan(token)
            return res
        } catch (e) {
            const error = (e as Error).message
            set({error})
        }
    },
    deletePlan: async (id) => {
        try {
            const res = await deletePlan(id)
            console.log(await res.json());
        } catch (e) {
            const error = (e as Error).message
            set({error})
            
        }
    }
}))

export default useTourPlanStore