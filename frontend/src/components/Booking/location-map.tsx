import { MapPin, Navigation, Utensils, Train } from "lucide-react"

interface LocationMapProps {
  destination: string
  hotel: string | null
}

export default function LocationMap({ destination, hotel }: LocationMapProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Location Map</h3>
      </div>

      <div className="relative">
        <img src="/placeholder.svg?height=300&width=400" alt="Map" className="w-full h-64 object-cover" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4 bg-white bg-opacity-90 rounded-lg shadow-md">
            <p className="text-sm text-gray-500">Interactive map will be displayed here</p>
            <p className="text-xs mt-1">
              Showing {hotel || "hotels"} in {destination}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-sm font-semibold mb-2">Nearby Points of Interest</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-red-500" />
            <span>Bali Beach (0.2 miles)</span>
          </li>
          <li className="flex items-center">
            <Utensils className="w-4 h-4 mr-2 text-orange-500" />
            <span>Seafood Restaurant (0.5 miles)</span>
          </li>
          <li className="flex items-center">
            <Navigation className="w-4 h-4 mr-2 text-blue-500" />
            <span>Water Sports Center (0.7 miles)</span>
          </li>
          <li className="flex items-center">
            <Train className="w-4 h-4 mr-2 text-green-500" />
            <span>Public Transport (1.2 miles)</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

