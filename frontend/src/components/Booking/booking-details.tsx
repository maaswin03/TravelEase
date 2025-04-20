"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, PlaneTakeoff, Train, Bus, Check } from "lucide-react"
import { format } from "date-fns"

interface BookingDetailsProps {
  bookingData: any
  updateBookingData: (data: any) => void
  nextStep: () => void
}

export default function BookingDetails({ bookingData, updateBookingData, nextStep }: BookingDetailsProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null)
  const [transportType, setTransportType] = useState<string | null>(null)
  const [compareHotels, setCompareHotels] = useState<string[]>([])

  const hotels = [
    {
      id: "hotel1",
      name: "Taj Lake Palace, Udaipur",
      rating: 5,
      price: 25000,
      image: "/placeholder.svg?height=200&width=300",
      amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Lake View"],
    },
    {
      id: "hotel2",
      name: "The Oberoi, Jaipur",
      rating: 5,
      price: 18000,
      image: "/placeholder.svg?height=200&width=300",
      amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Sea View", "Luxury Suites"],
    },
    {
      id: "hotel3",
      name: "Radisson Blu, Jaipur",
      rating: 4,
      price: 7000,
      image: "/placeholder.svg?height=200&width=300",
      amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Fitness Center"],
    },
  ];
  
  const transportOptions = [
    {
      type: "flight",
      icon: PlaneTakeoff,
      name: "Flight",
      price: 5000,
      duration: "2h 15m",
      details: "Direct flight from Delhi to Mumbai",
    },
    {
      type: "train",
      icon: Train,
      name: "Train",
      price: 2500,
      duration: "12h 30m",
      details: "Rajdhani Express from Delhi to Mumbai",
    },
    {
      type: "bus",
      icon: Bus,
      name: "Bus",
      price: 1200,
      duration: "16h 45m",
      details: "Luxury Volvo AC sleeper from Delhi to Mumbai",
    },
  ];
  

  const handleDateSelect = (date: Date | undefined) => {
    if (!startDate) {
      setStartDate(date)
    } else if (!endDate && date && date > startDate) {
      setEndDate(date)
    } else {
      setStartDate(date)
      setEndDate(undefined)
    }
  }

  const toggleHotelComparison = (hotelId: string) => {
    if (compareHotels.includes(hotelId)) {
      setCompareHotels(compareHotels.filter((id) => id !== hotelId))
    } else {
      if (compareHotels.length < 3) {
        setCompareHotels([...compareHotels, hotelId])
      }
    }
  }

  const handleContinue = () => {
    updateBookingData({
      startDate,
      endDate,
      adults,
      children,
      selectedHotel,
      transportation: transportType,
      basePrice: selectedHotel ? hotels.find((h) => h.id === selectedHotel)?.price || 0 : 0,
      transportPrice: transportType ? transportOptions.find((t) => t.type === transportType)?.price || 0 : 0,
    })
    nextStep()
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">Select Hotel & Transportation</h2>
        <p className="text-gray-600">Customize your stay in {bookingData.destination}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Travel Dates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">Check-in Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-1" id="start-date">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={handleDateSelect} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="end-date">Check-out Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-1" id="end-date">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < (startDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Number of Travelers</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adults">Adults</Label>
              <div className="flex items-center mt-1">
                <button
                  className="w-10 h-10 rounded-l-md bg-gray-100 flex items-center justify-center border border-gray-300"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                >
                  <span className="text-xl">-</span>
                </button>
                <div className="h-10 px-4 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                  {adults}
                </div>
                <button
                  className="w-10 h-10 rounded-r-md bg-gray-100 flex items-center justify-center border border-gray-300"
                  onClick={() => setAdults(adults + 1)}
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="children">Children</Label>
              <div className="flex items-center mt-1">
                <button
                  className="w-10 h-10 rounded-l-md bg-gray-100 flex items-center justify-center border border-gray-300"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                >
                  <span className="text-xl">-</span>
                </button>
                <div className="h-10 px-4 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                  {children}
                </div>
                <button
                  className="w-10 h-10 rounded-r-md bg-gray-100 flex items-center justify-center border border-gray-300"
                  onClick={() => setChildren(children + 1)}
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Select Your Hotel</h3>
          {compareHotels.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => setCompareHotels([])}>
              Clear Comparison
            </Button>
          )}
        </div>

        {compareHotels.length > 0 ? (
          <div className="border rounded-lg overflow-hidden mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="bg-gray-50 p-4 border-b md:border-b-0 md:border-r">
                <h4 className="font-semibold mb-2">Comparison Criteria</h4>
                <ul className="space-y-6">
                  <li>Hotel</li>
                  <li>Price per night</li>
                  <li>Rating</li>
                  <li>Amenities</li>
                  <li>Selection</li>
                </ul>
              </div>

              {compareHotels.map((hotelId) => {
                const hotel = hotels.find((h) => h.id === hotelId)
                if (!hotel) return null

                return (
                  <div key={hotel.id} className="p-4 border-b md:border-b-0 md:border-r last:border-r-0">
                    <h4 className="font-semibold mb-2">{" "}</h4>
                    <ul className="space-y-4">
                      <li className="h-8 flex items-center">
                      <h4 className="font-semibold mb-2">{hotel.name}</h4>
                      </li>
                      <li className="h-8 flex items-center">₹{hotel.price} / night</li>
                      <li className="h-8 flex items-center">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < hotel.rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </li>
                      <li className="h-8 flex items-center">
                        <span className="text-sm">{hotel.amenities.slice(0, 3).join(", ")}</span>
                      </li>
                      <li className="h-8 flex items-center">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedHotel(hotel.id)
                            setCompareHotels([])
                          }}
                          className={selectedHotel === hotel.id ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {selectedHotel === hotel.id ? "Selected" : "Select"}
                        </Button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className={selectedHotel === hotel.id ? "border-2 border-[#1E3A8A] p-0" : "p-0"}>
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={hotel.image || "/placeholder.svg"}
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-semibold flex items-center">
                      <div className="flex items-center mr-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${i < hotel.rating ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      {hotel.rating}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                  <CardDescription className="mt-2 mb-0">
                    <div className="text-lg font-bold text-black">
                    ₹{hotel.price} <span className="text-sm font-normal text-gray-500">/ night</span>
                    </div>
                  </CardDescription>
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold mb-1">Amenities:</h4>
                    <ul className="text-sm text-gray-600">
                      {hotel.amenities.slice(0, 3).map((amenity, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => toggleHotelComparison(hotel.id)}>
                    {compareHotels.includes(hotel.id) ? "Remove from Compare" : "Compare"}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setSelectedHotel(hotel.id)}
                    className={selectedHotel === hotel.id ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {selectedHotel === hotel.id ? "Selected" : "Select"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Transportation Options</h3>
        <Tabs defaultValue="flight">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="flight">Flight</TabsTrigger>
            <TabsTrigger value="train">Train</TabsTrigger>
            <TabsTrigger value="bus">Bus</TabsTrigger>
          </TabsList>

          {transportOptions.map((option) => (
            <TabsContent key={option.type} value={option.type}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <option.icon className="w-5 h-5 mr-2" />
                    {option.name} - ₹{option.price}
                  </CardTitle>
                  <CardDescription>
                    Duration: {option.duration} | {option.details}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    defaultValue={transportType === option.type ? option.type : undefined}
                    onValueChange={setTransportType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option.type} id={`${option.type}-standard`} />
                      <Label htmlFor={`${option.type}-standard`}>Standard - ₹{option.price}</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <RadioGroupItem value={`${option.type}-premium`} id={`${option.type}-premium`} />
                      <Label htmlFor={`${option.type}-premium`}>Premium - ₹{Math.round(option.price * 1.5)}</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <RadioGroupItem value={`${option.type}-luxury`} id={`${option.type}-luxury`} />
                      <Label htmlFor={`${option.type}-luxury`}>Luxury - ₹{Math.round(option.price * 2)}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setTransportType(option.type)}>
                    Select {option.name}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline">Back</Button>
        <Button onClick={handleContinue} disabled={!startDate || !endDate || !selectedHotel || !transportType}>
          Continue to Traveler Details
        </Button>
      </div>
    </div>
  )
}

