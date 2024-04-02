import { CredentialFormData, Place } from '../types/index.type'

const URL = import.meta.env.VITE_URL

export async function register(data: CredentialFormData) {
  const { password, email } = data
  const res = await fetch(`${URL}/register`, {
    method: 'POST',
    body: JSON.stringify({ password, email }),
    headers: { 'Content-Type': 'application/json' },
  })
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

export type KeyVal =
  | {
      place: Place[]
    }
  | {
      budgets: number
    }
  | {
      title: string
    }
  | {
      note: string
    }
  | {
      date: string[]
    }

export async function updatePlanData(
  data: string | string[] | Date | Place[] | number,
  key: keyof KeyVal,
  id: string
) {
  let val: KeyVal | {} = {}

  if (key === 'place') {
    val = { place: data as Place[] }
  } else if (key === 'budgets') {
    val = { budgets: data as number }
  } else if (key === 'title') {
    val = { title: data as string }
  } else if (key === 'note') {
    val = { note: data as string }
  } else if (key === 'date') {
    val = { date: data as string[] }
  }

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
