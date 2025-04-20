export type Destination = {
  id: string
  name: string
  country: string
  image: string
  description?: string
  rating: number
  reviewCount: number
  weather: string
  bestTimeToVisit: string
  region: string
  tripTypes: string[]
  budget: string
  climate: string
  lat?: number
  lng?: number
}

export type FilterOptions = {
  region: string
  tripType: string
  budget: string
  climate: string
}

