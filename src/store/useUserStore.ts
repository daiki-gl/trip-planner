import { create } from 'zustand'
import { getUser, login, register } from '../helper'
import { CredentialFormData } from '../types/index.type'

type UserStore = {
  user: {
    id: string | null
    username: string | null
    email: string | null
  } | null
  error: string | null
  getUser: (token: string) => void
  registerUser: (formData: CredentialFormData) => Promise<Response | undefined>
  loginUser: (formData: CredentialFormData) => Promise<Response | undefined>
  logOutUser: () => void
}

const useUserStore = create<UserStore>((set) => ({
  user: {
    id: null,
    username: null,
    email: null,
    password: null,
  },
  error: null,
  registerUser: async (formData) => {
    try {
      const res = await register(formData)
      return res
    } catch (e) {
      const error = (e as Error).message
      set({ error })
    }
  },
  loginUser: async (formData) => {
    try {
      const res = await login(formData)
      return res
    } catch (e) {
      const error = (e as Error).message
      set({ error })
    }
  },
  getUser: async (token) => {
    try {
      const res = await getUser(token)
      const { data } = await res.json()
      set({
        user: { id: data._id, username: data.username, email: data.email },
      })
      return res
    } catch (e) {
      const error = (e as Error).message
      set({ error })
    }
  },
  logOutUser: () => {
    set({ user: null })
  },
}))

export default useUserStore
