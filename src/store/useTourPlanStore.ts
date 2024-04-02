import { create } from 'zustand'
import {
  KeyVal,
  createPlan,
  deletePlan,
  getPlanById,
  getPlans,
  updatePlanData,
} from '../helper'
import { Place, PlanData, TourPlan } from '../types/index.type'

type TourPlanStore = {
  tourPlan: TourPlan
  tourPlans: TourPlan[] | null
  error: string | null
  getPlans: (id: string) => void
  getPlanById: (id: string) => Promise<PlanData | undefined>
  updatePlan: (
    data: Place[] | string | string[] | Date | number,
    key: keyof KeyVal,
    id: string
  ) => Promise<Response | undefined>
  createPlan: (token: string) => Promise<Response | undefined>
  deletePlan: (id: string) => void
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
      set({ tourPlans: plans })
    } catch (e) {
      const error = (e as Error).message
      set({ error })
    }
  },

  getPlanById: async (id) => {
    try {
      const res = await getPlanById(id)
      const tourPlan = await res.json()
      set({ tourPlan })
      return tourPlan as PlanData
    } catch (e) {
      const error = (e as Error).message
      set({ error })
    }
  },

  updatePlan: async (data, key, id) => {
    try {
      const res = await updatePlanData(data, key, id)
      return res
    } catch (e) {
      const error = (e as Error).message
      set({ error })
    }
  },
  createPlan: async (token) => {
    try {
      const res = await createPlan(token)
      return res
    } catch (e) {
      const error = (e as Error).message
      set({ error })
    }
  },
  deletePlan: async (id) => {
    try {
      const res = await deletePlan(id)
    } catch (e) {
      const error = (e as Error).message
      set({ error })
    }
  },
}))

export default useTourPlanStore
