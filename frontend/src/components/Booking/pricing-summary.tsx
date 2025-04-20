import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Info } from "lucide-react"

interface PricingSummaryProps {
  bookingData: any
}

export default function PricingSummary({ bookingData }: PricingSummaryProps) {
  const calculateNights = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0
    const start = new Date(bookingData.startDate)
    const end = new Date(bookingData.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const nights = calculateNights() || 5 // Fallback for demo
  const hotelTotal = (bookingData.basePrice || 299) * nights
  const transportTotal = bookingData.transportPrice || 499
  const taxes = Math.round((hotelTotal + transportTotal) * 0.12)
  const total = hotelTotal + transportTotal + taxes

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Pricing Summary</h3>
        <div className="bg-[#FFC107] bg-opacity-20 text-[#1E3A8A] px-3 py-1 rounded-full text-xs font-medium">
          Transparent Pricing
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Hotel ({nights} nights)</p>
            <p className="text-xs text-gray-500">Luxury Beach Resort & Spa</p>
          </div>
          <p className="font-medium">${hotelTotal}</p>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Transportation</p>
            <p className="text-xs text-gray-500">Flight - Standard</p>
          </div>
          <p className="font-medium">₹{transportTotal}</p>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="text-gray-600">Taxes & Fees</p>
            <div className="relative group ml-1">
              <Info className="w-4 h-4 text-gray-400" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                Includes local taxes, service charges, and booking fees
              </div>
            </div>
          </div>
          <p className="font-medium">₹{taxes}</p>
        </div>

        <div className="border-t pt-4 flex justify-between">
          <p className="font-semibold">Total Amount</p>
          <p className="text-xl font-bold text-[#1E3A8A]">₹{total}</p>
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="coupon" className="text-sm font-medium">
          Have a promo code?
        </Label>
        <div className="flex mt-1">
          <Input id="coupon" placeholder="Enter code" className="rounded-r-none" />
          <Button className="rounded-l-none bg-[#FFC107] hover:bg-[#FFB000] text-black">Apply</Button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start mb-3">
          <div className="bg-green-100 p-1 rounded mr-3 mt-0.5">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">Free Cancellation</p>
            <p className="text-xs text-gray-500">Cancel before May 10 for a full refund</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-green-100 p-1 rounded mr-3 mt-0.5">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">No Hidden Charges</p>
            <p className="text-xs text-gray-500">The price you see is what you pay</p>
          </div>
        </div>
      </div>
    </div>
  )
}

