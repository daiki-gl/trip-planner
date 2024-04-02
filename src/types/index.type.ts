export type CredentialFormData = {
  username: string
  email: string
  password: string
  confirmedPassword: string
}

export type Place = {
  name: string
  location: google.maps.LatLng
}

export type PlanData = {
  budgets: number
  date: string[]
  note?: string
  place: Place[]
  placeNote: string[]
  title: string
  userId: {
    _id: string
    username: string
  }
  _id: string
}

export type TourPlan = {
  _id: string | null
  title: string | null
  userId: {
    username: string
    _id: string
  } | null
  note: string | null
  date: string[] | null
  place: Place | null
  placeNote: string[] | null
  budgets: number
}

export type OriginDestinationProps = {
  origin?: google.maps.LatLng
  destination?: google.maps.LatLng
}
