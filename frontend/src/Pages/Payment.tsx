"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import {
  Check,
  CreditCard,
  Home,
  ChevronRight,
  ArrowRight,
  Calendar,
  Users,
  Building,
  Plane,
  Shield,
  Gift,
  AlertCircle,
  Wallet,
  Loader2,
  HelpCircle,
  Landmark,
  RefreshCw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";


interface TravelPackage {
  _id: string;
  name: string;
  destination: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  duration: string;
  travelOptions: string[];
  featured: boolean;
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const { stateid, encodedId } = useParams<{
    stateid: string;
    encodedId: string;
  }>();
  const packageId = encodedId ? atob(encodedId) : null;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [promoError, setPromoError] = useState<string | null>(null);
  const [currentStep] = useState(1);
  const [travelPackage, setTravelPackage] = useState<TravelPackage | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/travel-packages/${stateid}/${packageId}`
        );
        const data = await response.json();
        setTravelPackage(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching package:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [stateid, packageId]);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const storedUser1 = localStorage.getItem("bookingSummary");
  const user1 = storedUser1 ? JSON.parse(storedUser1) : null;
  const startDate = new Date(user.startDate);
  const durationDays = parseInt(travelPackage?.duration?.split(" ")[0] || "0");
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + durationDays);

  const bookingDetails = {
    name: user.name,
    email: user.email,
    startDate: user.startDate,
    endDate: endDate.toISOString().split("T")[0],
    people: user.peopleCount,
    accommodation: user1.accommodation,
    totalPrice: user1.totalPrice,
    transport: user1.transport,
    formattedStart: format(startDate, "MMMM d, yyyy"),
    formattedEnd: format(endDate, "MMMM d, yyyy"),
  };

  const [nameOnCard, setNameOnCard] = useState(bookingDetails.name);

  const formatCardNumber = (value: string) => {

    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return v.length > 2 ? `${v.substring(0, 2)}/${v.substring(2, 4)}` : v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
    validateField(
      "cardNumber",
      formattedValue.replace(/\s/g, "").length === 16,
      "Card number must be 16 digits"
    );
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
    validateField(
      "expiryDate",
      formattedValue.length === 5,
      "Please enter a valid date (MM/YY)"
    );
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvv(value);
    validateField("cvv", value.length === 3, "CVV must be 3 digits");
  };

  const validateField = (
    field: string,
    isValid: boolean,
    errorMessage: string
  ) => {
    if (!isValid) {
      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePayment = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16)
        newErrors.cardNumber = "Card number must be 16 digits";
      if (expiryDate.length < 5)
        newErrors.expiryDate = "Please enter a valid date (MM/YY)";
      if (cvv.length < 3) newErrors.cvv = "CVV must be 3 digits";
      if (!nameOnCard) newErrors.nameOnCard = "Name on card is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) =>
        prev >= 100 ? (clearInterval(interval), 100) : prev + 5
      );
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setIsPaymentComplete(true);
      }, 500);
    }, 2000);
  };

  // Derived values
  const isFormValid =
    paymentMethod === "card"
      ? cardNumber.replace(/\s/g, "").length === 16 &&
        expiryDate.length === 5 &&
        cvv.length === 3 &&
        nameOnCard.length > 0
      : true;

  const bookingId = `TRV-${Math.floor(100000 + Math.random() * 900000)}`;


  const bookingData = {
    email: user.email,
    state_id: stateid,
    package_id: packageId,
    hotel_name: user1.accommodation,
    transport: user1.transport,
    start_date: bookingDetails.startDate,
    end_date: bookingDetails.endDate,
    total_price: bookingDetails.totalPrice,
    no_of_people: bookingDetails.people,
    booking_code: bookingId,
    payment_method: paymentMethod,
    payment_status: "completed",
    created_at: new Date().toISOString()
  };

  const updateBooking = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:8000/api/update-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Booking updated:", result);
        setIsPaymentComplete(true);
      } else {
        const error = await response.text();
        console.error("❌ Failed to update booking:", error);
        setError(error || "Failed to complete payment");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isPaymentComplete) {
      updateBooking();
    }
  }, [isPaymentComplete]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-lg rounded-xl overflow-hidden border border-gray-200 p-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 text-blue-900 animate-spin" />
            <h2 className="text-xl font-semibold text-blue-900">
              Processing your payment...
            </h2>
            <p className="text-gray-600">
              Please wait while we confirm your booking details.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-lg rounded-xl overflow-hidden border border-gray-200 p-0">
          <div className="h-2 bg-gradient-to-r from-red-400 to-red-600 w-full"></div>
          <CardHeader className="text-center pt-10 px-6">
            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-red-50 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center">
                <X className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-blue-900">
              Payment Failed
            </CardTitle>
            <CardDescription className="text-lg mt-2 text-gray-600">
              {error}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pb-8 px-6">
            <Button 
              className="bg-blue-900 hover:bg-blue-800 text-white"
              onClick={updateBooking}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (isPaymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-lg rounded-xl overflow-hidden border border-gray-200 p-0">
          <div className="h-2 bg-gradient-to-r from-green-400 to-green-600 w-full"></div>
          <CardHeader className="text-center pt-10 px-6">
            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-green-50 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
                <Check className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-blue-900">
              Payment Successful! 🎉
            </CardTitle>
            <CardDescription className="text-lg mt-2 text-gray-600">
              Your dream vacation is booked and confirmed
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-6 py-4">
            <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm">Booking ID</span>
                <Badge
                  variant="outline"
                  className="text-blue-900 bg-blue-50 border-blue-100 text-sm px-3 py-1"
                >
                  {bookingData.booking_code}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-blue-900" />
                    <span className="text-gray-700">Destination</span>
                  </div>
                  <span className="font-medium">{travelPackage?.name}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-900" />
                    <span className="text-gray-700">Dates</span>
                  </div>
                  <span className="font-medium">
                    {bookingDetails.formattedStart} - {bookingDetails.formattedEnd}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-900" />
                    <span className="text-gray-700">Guests</span>
                  </div>
                  <span className="font-medium">
                    {bookingDetails.people} Adults
                  </span>
                </div>

                <Separator className="my-3" />

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Amount</span>
                  <span className="font-bold text-lg">
                    ₹{bookingDetails.totalPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start">
                <div className="bg-blue-900 rounded-full p-2 mr-3">
                  <Plane className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    What's Next?
                  </h3>
                  <p className="text-sm text-gray-600">
                    A confirmation email has been sent to{" "}
                    <span className="font-medium">{bookingDetails.email}</span> with
                    all your booking details. You'll receive your e-tickets 48
                    hours before departure.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pb-8 px-6">
            <Button className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white" onClick={() => navigate('/')}>
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </Button>
            <Button className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-blue-900" onClick={() => navigate('/account/info')}>
              Go to My Bookings <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!travelPackage)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Package not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span className="hover:text-blue-900 cursor-pointer">Home</span>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="hover:text-blue-900 cursor-pointer">Packages</span>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-blue-900 font-medium">Payment</span>
        </div>

        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          Confirm Your Payment
        </h1>
        <p className="text-gray-500 mb-8">
          Complete your booking for an unforgettable travel experience
        </p>

        <div className="mb-8 hidden md:block">
          <div className="flex justify-between max-w-md mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? "bg-blue-900 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                <span className="text-sm mt-2 text-gray-600">
                  {step === 1
                    ? "Package Selection"
                    : step === 2
                    ? "Payment"
                    : "Confirmation"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-6 space-y-5">
              <Card className="shadow-md rounded-xl overflow-hidden border border-gray-200 p-0">
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={travelPackage.image.replace('./images', '/images')}
                    alt={travelPackage.destination}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/placeholder-hotel.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {travelPackage.name}
                      </h2>
                      <p className="text-sm text-white/90">
                        {travelPackage.duration} | {bookingDetails.people}{" "}
                        Adults
                      </p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-5 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-blue-900 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-700">
                          Travel Dates
                        </h3>
                        <p className="text-sm text-gray-500">
                          {bookingDetails.formattedStart} -{" "}
                          {bookingDetails.formattedEnd}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Building className="h-5 w-5 mr-3 text-blue-900 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-700">
                          Accommodation
                        </h3>
                        <p className="text-sm text-gray-500">
                          {bookingDetails.accommodation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Plane className="h-5 w-5 mr-3 text-blue-900 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-700">Transport</h3>
                        <p className="text-sm text-gray-500">
                          {bookingDetails.transport}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="space-y-3">
                    <h3 className="font-medium">Price Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Package Base Price
                        </span>
                        <span>₹{bookingDetails.totalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Taxes & Fees</span>
                        <span>Included</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-blue-900">
                      ₹{bookingDetails.totalPrice}
                    </span>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start">
                    <Shield className="h-5 w-5 text-blue-900 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600">
                      Your payment is secure and encrypted. We use the latest
                      security measures to protect your information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm rounded-xl border border-gray-200 p-0">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Gift className="h-5 w-5 text-blue-900 mr-2" />
                      <h3 className="font-medium">Have a Promo Code?</h3>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoError(null);
                        }}
                        className="border-gray-300 focus:ring-blue-900 focus:border-blue-900"
                      />
                      <Button
                        onClick={() => {
                          if (promoCode) {
                            setPromoError("Coupon expired or invalid");
                          }
                        }}
                        className="bg-blue-900 hover:bg-blue-800"
                        disabled={!promoCode}
                      >
                        Apply
                      </Button>
                    </div>
                    {promoError ? (
                      <p className="text-xs text-red-500">{promoError}</p>
                    ) : (
                      <p className="text-xs text-gray-500">
                        Try code "TRAVEL25" for 25% off your booking
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Payment Form */}
          <div className="md:col-span-7 lg:col-span-8">
            <Card className="shadow-lg rounded-xl border border-gray-200 p-0">
              <div className="h-2 bg-blue-900 w-full rounded-t-xl"></div>
              <CardHeader className="px-5 pt-6">
                <CardTitle className="text-2xl text-blue-900">
                  Payment Details
                </CardTitle>
                <CardDescription>
                  Complete your booking by providing payment information
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-5 pb-6">
                {/* User Details */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-900 text-white flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <h3 className="font-semibold text-lg">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-11">
                    <div className="space-y-1">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        defaultValue={bookingDetails.name}
                        className="border-gray-300 focus:ring-blue-900 h-11"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={bookingDetails.email}
                        className="border-gray-300 focus:ring-blue-900 h-11"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-900 text-white flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        Payment Method
                      </h3>
                    </div>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3 pl-11"
                    >
                      <div
                        className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === "card"
                            ? "border-blue-600 bg-blue-50 shadow-sm"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        <RadioGroupItem
                          value="card"
                          id="card"
                          className="mr-3 text-blue-600"
                        />
                        <Label
                          htmlFor="card"
                          className="cursor-pointer flex items-center"
                        >
                          <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                          <span className="text-gray-700">
                            Credit / Debit Card
                          </span>
                        </Label>
                      </div>

                      <div
                        className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === "upi"
                            ? "border-blue-600 bg-blue-50 shadow-sm"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        <RadioGroupItem
                          value="upi"
                          id="upi"
                          className="mr-3 text-blue-600"
                        />
                        <Label
                          htmlFor="upi"
                          className="cursor-pointer flex items-center"
                        >
                          <Wallet className="h-5 w-5 mr-2 text-blue-600" />
                          <span className="text-gray-700">UPI</span>
                        </Label>
                      </div>

                      <div
                        className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === "netbanking"
                            ? "border-blue-600 bg-blue-50 shadow-sm"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        <RadioGroupItem
                          value="netbanking"
                          id="netbanking"
                          className="mr-3 text-blue-600"
                        />
                        <Label
                          htmlFor="netbanking"
                          className="cursor-pointer flex items-center"
                        >
                          <Landmark className="h-5 w-5 mr-2 text-blue-600" />
                          <span className="text-gray-700">Net Banking</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4 pl-11">
                      <div className="space-y-2">
                        <Label htmlFor="nameOnCard" className="text-gray-700">
                          Name on Card
                        </Label>
                        <Input
                          id="nameOnCard"
                          placeholder="As it appears on your card"
                          value={nameOnCard}
                          onChange={(e) => setNameOnCard(e.target.value)}
                          className="border-gray-300 h-11 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.nameOnCard && (
                          <div className="text-red-500 text-xs flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.nameOnCard}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-gray-700">
                          Card Number
                        </Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            className="border-gray-300 h-11 pl-11 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <CreditCard className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        {errors.cardNumber && (
                          <div className="text-red-500 text-xs flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.cardNumber}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate" className="text-gray-700">
                            Expiry Date
                          </Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            maxLength={5}
                            className="border-gray-300 h-11 focus:ring-blue-500 focus:border-blue-500"
                          />
                          {errors.expiryDate && (
                            <div className="text-red-500 text-xs flex items-center mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.expiryDate}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cvv" className="text-gray-700">
                            CVV
                          </Label>
                          <div className="relative">
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={handleCvvChange}
                              maxLength={3}
                              className="border-gray-300 h-11 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          {errors.cvv && (
                            <div className="text-red-500 text-xs flex items-center mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.cvv}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start">
                        <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">
                          Your card information is encrypted and secure. We
                          never store your full card details.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* UPI Details */}
                  {paymentMethod === "upi" && (
                    <div className="space-y-4 pl-11">
                      <div className="space-y-2">
                        <Label htmlFor="upiId" className="text-gray-700">
                          UPI ID
                        </Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@upi"
                          className="border-gray-300 h-11 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter your UPI ID in the format username@bankname
                        </p>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <p className="text-sm text-gray-700">
                          You'll receive a payment request on your UPI app.
                          Please approve it to complete the transaction.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Net Banking Details */}
                  {paymentMethod === "netbanking" && (
                    <div className="space-y-4 pl-11">
                      <h3 className="font-medium text-gray-700">
                        Select Your Bank
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          "HDFC Bank",
                          "ICICI Bank",
                          "SBI",
                          "Axis Bank",
                          "Kotak Bank",
                          "Other Banks",
                        ].map((bank) => (
                          <div
                            key={bank}
                            className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
                              selectedBank === bank
                                ? "border-blue-600 bg-blue-50 shadow-sm"
                                : "border-gray-300 hover:border-blue-400"
                            }`}
                            onClick={() => setSelectedBank(bank)}
                          >
                            <p className="text-sm font-medium text-gray-700">
                              {bank}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        You will be redirected to your bank's secure payment
                        page to complete the transaction.
                      </p>
                    </div>
                  )}
                </div>


                <CardFooter className="px-0 pb-0 pt-6">
                  {isProcessing ? (
                    <div className="w-full space-y-4">
                      <Progress
                        value={progress}
                        className="h-2 w-full bg-gray-200"
                      />
                      <Button
                        disabled
                        className="w-full bg-amber-400 hover:bg-amber-400 text-blue-900 font-semibold text-lg py-5 rounded-lg"
                      >
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Processing Payment...
                        </div>
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handlePayment}
                      disabled={!isFormValid}
                      className=" mx-auto w-[50%] bg-amber-400 hover:bg-amber-300 text-blue-900 font-semibold text-lg py-5 rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                      Pay  ₹{bookingDetails.totalPrice} Securely
                    </Button>
                  )}
                </CardFooter>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
