"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Smartphone, Building, Wallet, Shield, AlertCircle } from "lucide-react"

interface PaymentGatewayProps {
  bookingData: any
  nextStep: () => void
  prevStep: () => void
}

export default function PaymentGateway({ bookingData, nextStep, prevStep }: PaymentGatewayProps) {
  const [paymentType, setPaymentType] = useState("full")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">Secure & Instant Payment</h2>
        <p className="text-gray-600">Choose your preferred payment method</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Payment Options</h3>
        <RadioGroup defaultValue={paymentType} onValueChange={setPaymentType}>
          <div className="flex flex-col space-y-3">
            <Label
              htmlFor="payment-full"
              className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors [&:has(:checked)]:border-[#1E3A8A] [&:has(:checked)]:bg-blue-50"
            >
              <RadioGroupItem value="full" id="payment-full" />
              <div>
                <p className="font-medium">Pay in Full</p>
                <p className="text-sm text-gray-500">Pay the entire amount now</p>
              </div>
              <div className="ml-auto font-bold">${bookingData.totalPrice || 1499}</div>
            </Label>

            <Label
              htmlFor="payment-partial"
              className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors [&:has(:checked)]:border-[#1E3A8A] [&:has(:checked)]:bg-blue-50"
            >
              <RadioGroupItem value="partial" id="payment-partial" />
              <div>
                <p className="font-medium">Pay Deposit Now</p>
                <p className="text-sm text-gray-500">Pay 50% now and the rest later</p>
              </div>
              <div className="ml-auto font-bold">${Math.round((bookingData.totalPrice || 1499) * 0.5)}</div>
            </Label>

            <Label
              htmlFor="payment-installments"
              className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors [&:has(:checked)]:border-[#1E3A8A] [&:has(:checked)]:bg-blue-50"
            >
              <RadioGroupItem value="installments" id="payment-installments" />
              <div>
                <p className="font-medium">Pay in Installments</p>
                <p className="text-sm text-gray-500">Split into 3 monthly payments</p>
              </div>
              <div className="ml-auto font-bold">${Math.round((bookingData.totalPrice || 1499) / 3)}/mo</div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
          <Tabs defaultValue="card">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="card" className="flex flex-col items-center py-2">
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-xs">Card</span>
              </TabsTrigger>
              <TabsTrigger value="upi" className="flex flex-col items-center py-2">
                <Smartphone className="h-5 w-5 mb-1" />
                <span className="text-xs">UPI</span>
              </TabsTrigger>
              <TabsTrigger value="banking" className="flex flex-col items-center py-2">
                <Building className="h-5 w-5 mb-1" />
                <span className="text-xs">Banking</span>
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex flex-col items-center py-2">
                <Wallet className="h-5 w-5 mb-1" />
                <span className="text-xs">Wallet</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input id="nameOnCard" placeholder="John Doe" className="mt-1" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upi" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input id="upiId" placeholder="yourname@upi" className="mt-1" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Google Pay"
                      className="mx-auto h-10 w-10 mb-2"
                    />
                    <p className="text-xs">Google Pay</p>
                  </div>

                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                    <img src="/placeholder.svg?height=40&width=40" alt="PhonePe" className="mx-auto h-10 w-10 mb-2" />
                    <p className="text-xs">PhonePe</p>
                  </div>

                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                    <img src="/placeholder.svg?height=40&width=40" alt="Paytm" className="mx-auto h-10 w-10 mb-2" />
                    <p className="text-xs">Paytm</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="banking" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bankName">Select Bank</Label>
                  <select
                    id="bankName"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  >
                    <option value="">Select your bank</option>
                    <option value="bank1">Bank of America</option>
                    <option value="bank2">Chase Bank</option>
                    <option value="bank3">Wells Fargo</option>
                    <option value="bank4">Citibank</option>
                  </select>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    You will be redirected to your bank's secure payment page to complete the transaction.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="wallet" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                    <img src="/placeholder.svg?height=40&width=40" alt="PayPal" className="mx-auto h-10 w-10 mb-2" />
                    <p className="text-xs">PayPal</p>
                  </div>

                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                    <img src="/placeholder.svg?height=40&width=40" alt="Apple Pay" className="mx-auto h-10 w-10 mb-2" />
                    <p className="text-xs">Apple Pay</p>
                  </div>

                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Amazon Pay"
                      className="mx-auto h-10 w-10 mb-2"
                    />
                    <p className="text-xs">Amazon Pay</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                  <Shield className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Your payment information is securely processed and we never store your card details.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-[#F4F6F9] p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">Billing Address</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="sameAsContact"
                className="h-4 w-4 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                defaultChecked
              />
              <Label htmlFor="sameAsContact">Same as contact address</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billingCountry">Country</Label>
                <select
                  id="billingCountry"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                >
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                </select>
              </div>

              <div>
                <Label htmlFor="billingZip">Zip/Postal Code</Label>
                <Input id="billingZip" placeholder="Enter zip code" className="mt-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
          <Shield className="h-5 w-5 text-green-500 mr-3" />
          <div>
            <p className="text-sm font-medium text-green-800">Secure Payment</p>
            <p className="text-xs text-green-600">Your payment information is encrypted and secure</p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            Back to Traveler Details
          </Button>
          <Button type="submit">Complete Booking</Button>
        </div>
      </form>
    </div>
  )
}

