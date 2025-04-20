"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload } from "lucide-react"

interface TravelerFormProps {
  bookingData: any
  updateBookingData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

export default function TravelerForm({ bookingData, nextStep, prevStep }: TravelerFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">Enter Traveler Details</h2>
        <p className="text-gray-600">Please provide information for all travelers</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="bg-[#F4F6F9] p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Lead Traveler (Primary Contact)</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" className="mt-1" required />
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" className="mt-1" required />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter email address" className="mt-1" required />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" className="mt-1" required />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter your address" className="mt-1" required />
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="us">
                  <SelectTrigger id="country" className="mt-1">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ind">India</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Select defaultValue="ind">
                  <SelectTrigger id="nationality" className="mt-1">
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="ind">India</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {bookingData.adults > 1 && (
            <div className="bg-[#F4F6F9] p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Additional Adult Traveler</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName2">First Name</Label>
                  <Input id="firstName2" placeholder="Enter first name" className="mt-1" required />
                </div>

                <div>
                  <Label htmlFor="lastName2">Last Name</Label>
                  <Input id="lastName2" placeholder="Enter last name" className="mt-1" required />
                </div>

                <div>
                  <Label htmlFor="nationality2">Nationality</Label>
                  <Select defaultValue="us">
                    <SelectTrigger id="nationality2" className="mt-1">
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {bookingData.children > 0 && (
            <div className="bg-[#F4F6F9] p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Child Traveler</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="childFirstName">First Name</Label>
                  <Input id="childFirstName" placeholder="Enter first name" className="mt-1" required />
                </div>

                <div>
                  <Label htmlFor="childLastName">Last Name</Label>
                  <Input id="childLastName" placeholder="Enter last name" className="mt-1" required />
                </div>

                <div>
                  <Label htmlFor="childAge">Age</Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="childAge" className="mt-1">
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 17 }, (_, i) => (
                        <SelectItem key={i} value={String(i + 1)}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#F4F6F9] p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Travel Documents</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="passportNumber">Document name</Label>
                <Input id="documentname" placeholder="Enter Document name" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="passportExpiry">Document number</Label>
                <Input id="documentnumber" placeholder="Enter Document number" className="mt-1" />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="passportUpload" className="block mb-1">
                  Upload Document photo (Optional)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Drag and drop your files here, or click to browse</p>
                  <p className="mt-1 text-xs text-gray-400">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
                  <Input id="passportUpload" type="file" className="hidden" />
                  <Button type="button" variant="outline" size="sm" className="mt-4">
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F4F6F9] p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Special Requests</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="specialRequests">Additional Requests or Preferences</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Enter any special requests, dietary requirements, or accessibility needs"
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="earlyCheckin" />
                  <Label htmlFor="earlyCheckin" className="text-sm">
                    Request early check-in (subject to availability)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="lateCheckout" />
                  <Label htmlFor="lateCheckout" className="text-sm">
                    Request late check-out (subject to availability)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="airportPickup" />
                  <Label htmlFor="airportPickup" className="text-sm">
                    Airport pickup service (₹500 extra)
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="termsConditions" required />
            <Label htmlFor="termsConditions" className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-[#1E3A8A] underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#1E3A8A] underline">
                Privacy Policy
              </a>
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="marketingEmails" />
            <Label htmlFor="marketingEmails" className="text-sm">
              I would like to receive promotional emails about special offers and discounts
            </Label>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button type="button" variant="outline" onClick={prevStep}>
            Back to Hotel & Transport
          </Button>
          <Button type="submit">Continue to Payment</Button>
        </div>
      </form>
    </div>
  )
}

