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
