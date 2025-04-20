"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";

type Review = {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  text: string;
  destination: string;
};

const reviews: Review[] = [
  {
    id: "1",
    name: "Rohit Sharma",
    avatar: "./images/most/usericon.png",
    location: "Jaipur, Rajasthan",
    rating: 5,
    text: "Visiting Jaipur was like stepping into a royal era! The booking process was seamless, and the heritage hotel recommendation was perfect. The guided tour of Amer Fort was unforgettable!",
    destination: "Jaipur",
  },
  {
    id: "2",
    name: "Priya Patel",
    avatar: "./images/most/usericon.png",
    location: "Goa, India",
    rating: 5,
    text: "Goa was an amazing experience! The beachfront resort was exactly what we needed, and the curated list of cafes and nightlife spots made our trip even better.",
    destination: "Goa",
  },
  {
    id: "3",
    name: "Vikram",
    avatar: "./images/most/usericon.png",
    location: "Munnar, Kerala",
    rating: 4,
    text: "Munnar’s tea plantations were breathtaking! The houseboat stay in Alleppey was a great add-on. Would love to visit again during monsoon for a greener experience.",
    destination: "Munnar",
  },
  {
    id: "4",
    name: "Meera",
    avatar: "./images/most/usericon.png",
    location: "Shimla, Himachal Pradesh",
    rating: 5,
    text: "Shimla’s scenic beauty was mesmerizing! The toy train ride was a highlight, and the cozy stay in a hilltop resort made our trip super special. Highly recommended!",
    destination: "Shimla",
  },
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  return (
    <section className="mb-16">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[#1E3A8A]">
          Hear from Fellow Travelers
        </h2>
        <p className="mx-auto max-w-2xl text-gray-600">
          Real experiences from travelers who have explored the world with us
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="min-w-full px-4">
                <Card className="overflow-hidden h-full">
                  <CardContent className="p-0 h-full flex">
                    {/* Full Height Grid */}
                    <div className="grid md:grid-cols-2 h-full w-full">
                      {/* Left Side: Blue Background Fully Covered */}
                      <div className="relative bg-[#1E3A8A] flex flex-col justify-center items-center text-white h-full min-h-full">
                        <div
                          className="absolute inset-0 bg-cover bg-center opacity-30"
                          style={{
                            backgroundImage: `url('/placeholder.svg?height=600&width=400')`,
                          }}
                        />
                        <div className="relative flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-white">
                            <img
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <h3 className="mb-1 text-xl font-bold">
                            {review.name}
                          </h3>
                          <p className="mb-3 text-sm">{review.location}</p>
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-5 w-5"
                                  fill={i < review.rating ? "#FFC107" : "none"}
                                  stroke={
                                    i < review.rating ? "#FFC107" : "white"
                                  }
                                />
                              ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Text Content */}
                      <div className="flex flex-col justify-center p-6 h-full min-h-full">
                        <div className="mb-4">
                          <h4 className="mb-2 text-lg font-semibold">
                            My trip to {review.destination} was amazing!
                          </h4>
                          <p className="text-gray-600">"{review.text}"</p>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-auto flex items-center justify-center gap-2 self-start"
                        >
                          <Play className="h-4 w-4 fill-current" />
                          Watch Video Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute -left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white shadow-md"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute -right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white shadow-md"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="mt-4 flex justify-center gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-8 rounded-full ${
                currentIndex === index ? "bg-[#1E3A8A]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="mx-[5%] mt-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative h-48 overflow-hidden rounded-lg">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/placeholder.svg?height=300&width=500')`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Button className="flex items-center gap-2 bg-[#FFC107] text-[#1E3A8A] hover:text-[#1E3A8A] focus:text-[#1E3A8A] hover:bg-[#F4C430]">
                <Play className="h-5 w-5 fill-current text-[#1E3A8A]" />
                Rajasthan Travel Vlog
              </Button>
            </div>
          </div>
          <div className="relative h-48 overflow-hidden rounded-lg">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/placeholder.svg?height=300&width=500')`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Button className="flex items-center gap-2 bg-[#FFC107] text-[#1E3A8A] hover:text-[#1E3A8A] focus:text-[#1E3A8A] hover:bg-[#F4C430]">
                <Play className="h-5 w-5 fill-current text-[#1E3A8A]" />
                Goa Travel Vlog
              </Button>
            </div>
          </div>
          <div className="relative h-48 overflow-hidden rounded-lg">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/placeholder.svg?height=300&width=500')`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Button className="flex items-center gap-2 bg-[#FFC107] text-[#1E3A8A] hover:text-[#1E3A8A] focus:text-[#1E3A8A] hover:bg-[#F4C430]">
                <Play className="h-5 w-5 fill-current text-[#1E3A8A]" />
               Kerala Travel Vlog
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
