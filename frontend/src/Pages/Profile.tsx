"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  CreditCard,
  Edit,
  LogOut,
  MessageSquare,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Building,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/useAuth";
import ChatSupport from "@/components/Home/chat-support";

interface Booking {
  booking_code: string;
  email: string;
  state_id: string;
  package_id: string;
  hotel_name: string;
  transport: string;
  start_date: string;
  end_date: string;
  total_price: number;
  no_of_people: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
}

interface UserData {
  _id: string;
  email: string;
  name?: string;
  location?: string;
  profileImage?: string;
  memberSince?: string;
  currentBooking: Booking[];
  pastBookings?: Booking[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const stateCollections = {
  stateid_01: "Andaman",
  stateid_02: "Arunachal",
  stateid_03: "Goa",
  stateid_04: "Himachal",
  stateid_05: "JK",
  stateid_06: "Kerala",
  stateid_07: "Meghalaya",
  stateid_08: "Punjab",
  stateid_09: "Rajasthan",
  stateid_10: "Sikkim",
  stateid_11: "TamilNadu",
  stateid_12: "Uttarakhand",
};
export default function ProfilePage() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const email = user?.email;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) return;

      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/get-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const data: UserData = await response.json();
          setUserData({
            ...data,
            name: data.name || user?.name || "Traveler",
            location: data.location || "Unknown Location",
            profileImage: data.profileImage || "/default-avatar.png",
            memberSince:
              data.memberSince || formatDate(new Date().toISOString()),
          });
          setError(null);
        } else {
          const errorText = await response.text();
          setError(errorText || "Failed to fetch user data");
        }
      } catch (err) {
        setError("Network error occurred");
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/");
  };

  const nextBooking = () => {
    if (!userData?.currentBooking) return;
    setCurrentIndex((prev) =>
      prev === userData.currentBooking.length - 1 ? 0 : prev + 1
    );
  };

  const prevBooking = () => {
    if (!userData?.currentBooking) return;
    setCurrentIndex((prev) =>
      prev === 0 ? userData.currentBooking.length - 1 : prev - 1
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
          <p className="mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </Card>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">User not found</h2>
          <Button onClick={() => navigate("/")}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  const currentBooking = userData.currentBooking?.[currentIndex];
  const pastBookings = userData.pastBookings || [];
  const totalTrips =
    (userData.currentBooking?.length || 0) + pastBookings.length;

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Hello, {userData.name}!
          </h1>
          <p className="text-gray-600">Welcome back to your travel dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Profile */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 border-[#1E3A8A]/10 shadow-md">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center pb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={userData.profileImage}
                    alt={userData.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {userData.name?.charAt(0) ?? "T"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{userData.name}</h3>
                <div className="mt-4 space-y-2 w-full">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Email:</span>
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Location:</span>
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Member Since:</span>
                    <span>{userData.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Trips:</span>
                    <span>{totalTrips}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Links */}
            <Card className="border-2 border-[#1E3A8A]/10 shadow-md">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-5 w-5 mr-3 text-[#1E3A8A]" />
                  Personal Information
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="h-5 w-5 mr-3 text-[#1E3A8A]" />
                  Payment Methods
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="h-5 w-5 mr-3 text-[#1E3A8A]" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-5 w-5 mr-3 text-[#1E3A8A]" />
                  Preferences
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bookings and Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Booking Section */}
            <div className="relative">
              {userData.currentBooking?.length > 1 && (
                <>
                  <button
                    onClick={prevBooking}
                    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5 text-[#1E3A8A]" />
                  </button>
                  <button
                    onClick={nextBooking}
                    className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition-all"
                  >
                    <ChevronRight className="h-5 w-5 text-[#1E3A8A]" />
                  </button>
                </>
              )}

              {currentBooking ? (
                <Card className="border-2 border-[#1E3A8A]/10 shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>
                        Current Booking{" "}
                        {userData.currentBooking.length > 1 &&
                          `(${currentIndex + 1}/${
                            userData.currentBooking.length
                          })`}
                      </CardTitle>
                      <Badge
                        className={
                          currentBooking.payment_status === "completed"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }
                      >
                        {currentBooking.payment_status}
                      </Badge>
                    </div>
                    <CardDescription className="space-y-1">
                      <h2 className="text-lg font-semibold text-black">
                          {
                            stateCollections[
                              currentBooking.state_id as keyof typeof stateCollections
                            ]
                          }
                      </h2>
                      <p className="text-sm text-gray-600">
                        Booking ID:{" "}
                        <span className="font-medium text-gray-800">
                          {currentBooking.booking_code}
                        </span>
                      </p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-[#1E3A8A]" />
                        <div>
                          <p className="font-medium">Travel Dates</p>
                          <p className="text-sm text-gray-600">
                            {formatDate(currentBooking.start_date)} -{" "}
                            {formatDate(currentBooking.end_date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-3 text-[#1E3A8A]" />
                        <div>
                          <p className="font-medium">Travelers</p>
                          <p className="text-sm text-gray-600">
                            {currentBooking.no_of_people} Adults
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-3 text-[#1E3A8A]" />
                        <div>
                          <p className="font-medium">Total Price</p>
                          <p className="text-sm text-gray-600">
                            ₹{currentBooking.total_price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-5 w-5 mr-3 text-[#1E3A8A]" />
                        <div>
                          <p className="font-medium">Hotel</p>
                          <p className="text-sm text-gray-600">
                            {currentBooking.hotel_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-[#1E3A8A]/10 shadow-md p-6 text-center">
                  <p>No current bookings found</p>
                  <Button
                    className="mt-4"
                    onClick={() => navigate("/destinations")}
                  >
                    Browse Destinations
                  </Button>
                </Card>
              )}

              {/* Dots Indicator */}
              {userData.currentBooking?.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {userData.currentBooking.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-[#1E3A8A] w-4"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to booking ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Past Bookings Section */}
            <Tabs defaultValue="bookings">
              <TabsList className="w-full">
                <TabsTrigger value="bookings" className="w-full">
                  Past Bookings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="bookings" className="mt-4">
                {pastBookings.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {pastBookings.map((booking) => (
                      <Card
                        key={booking.booking_code}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">
                              {
                                stateCollections[
                                  booking.state_id as keyof typeof stateCollections
                                ]
                              }
                            </CardTitle>
                            <Badge className="bg-green-500">Completed</Badge>
                          </div>
                          <CardDescription>
                            {formatDate(booking.start_date)} -{" "}
                            {formatDate(booking.end_date)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="space-y-1">
                              <p className="text-sm">
                                <span className="font-medium">Hotel:</span>{" "}
                                {booking.hotel_name}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Travelers:</span>{" "}
                                {booking.no_of_people} Adults
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ₹{booking.total_price.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                ID: {booking.booking_code}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="text-center p-6">
                    <p>No past bookings found</p>
                    <Button
                      className="mt-4"
                      variant="outline"
                      onClick={() => navigate("/destination")}
                    >
                      Explore Destinations
                    </Button>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            {/* Travel Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Travel Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-[#1E3A8A]/5 rounded-lg">
                    <p className="text-2xl font-bold text-[#1E3A8A]">
                      {totalTrips}
                    </p>
                    <p className="text-sm text-gray-600">Total Trips</p>
                  </div>
                  <div className="text-center p-4 bg-[#1E3A8A]/5 rounded-lg">
                    <p className="text-2xl font-bold text-[#1E3A8A]">
                      {
                        new Set([
                          ...(userData.currentBooking?.map((b) => b.state_id) ||
                            []),
                          ...pastBookings.map((b) => b.state_id),
                        ]).size
                      }
                    </p>
                    <p className="text-sm text-gray-600">States Visited</p>
                  </div>
                  <div className="text-center p-4 bg-[#1E3A8A]/5 rounded-lg">
                    <p className="text-2xl font-bold text-[#1E3A8A]">
                      {userData.currentBooking?.length || 0}
                    </p>
                    <p className="text-sm text-gray-600">Upcoming Trips</p>
                  </div>
                  <div className="text-center p-4 bg-[#1E3A8A]/5 rounded-lg">
                    <p className="text-2xl font-bold text-[#1E3A8A]">
                      {pastBookings.length}
                    </p>
                    <p className="text-sm text-gray-600">Completed Trips</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Section */}
            <Card className="bg-gradient-to-r from-[#1E3A8A]/10 to-[#1E3A8A]/5">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Need Help?</h3>
                    <p className="text-gray-600">
                      Our support team is available 24/7
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="bg-white">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Live Chat
                    </Button>
                    <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <ChatSupport/>
    </div>
  );
}
