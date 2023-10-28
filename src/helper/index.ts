import { Place } from '../store/useTourPlanStore'
import { CredentialFormData } from '../types/index.type'

const URL = import.meta.env.VITE_URL

export async function register(data: CredentialFormData) {
  const { password, email } = data
  console.log(data)
  const res = await fetch(`${URL}/register`, {
    method: 'POST',
    body: JSON.stringify({ password, email }),
    headers: { 'Content-Type': 'application/json' },
  })
  console.log({ res })
  return res
}

export async function login(data: CredentialFormData) {
  const { password, email } = data
  const res = await fetch(`${URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ password, email }),
    headers: { 'Content-Type': 'application/json' },
  })
  return res
}

export async function getUser(token: string) {
  const res = await fetch(`${URL}/user`, {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: { 'Content-Type': 'application/json' },
  })
  return res
}

export async function getPlans(id: string) {
  const res = await fetch(`${URL}/plan`, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' },
  })
  return res
}

export async function getPlanById(id: string) {
  const res = await fetch(`${URL}/plan/${id}`)
  return res
}

export async function updatePlanData(
  data: string | Date | Place,
  key: string,
  id: string
) {
  const val: any = {}
  val[key] = data

  const res = await fetch(`${URL}/plan/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(val),
    headers: { 'Content-Type': 'application/json' },
  })
  return res
}

export async function createPlan(token: string) {
  const res = await fetch(`${URL}/plan/create`, {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: { 'Content-Type': 'application/json' },
  })
  return res
}

export async function deletePlan(id: string) {
  const res = await fetch(`${URL}/plan/delete/${id}`, {
    method: 'DELETE',
  })
  return res
}
