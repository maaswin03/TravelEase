import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Calendar, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  StarIcon,
  IndianRupee,
  ShieldCheckIcon,
  HeadphonesIcon,
  PlaneIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ChatSupport from "@/components/Home/chat-support";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/Home/hero-section";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const goToPageWithId = (stateid: string) => {
    navigate(`/packages/${stateid}`);
  };

  const goToPage = () => {
    navigate(`/destination`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />

        <section className="w-[90%] py-16 container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Top Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Jammu & Kashmir",
                price: "₹7,999",
                image: "./images/states/Jammu&Kashmir.jpeg",
                stateid: "stateid_05",
              },
              {
                name: "Tamil Nadu",
                price: "₹4,999",
                image: "./images/states/Tamil Nadu.webp",
                stateid: "stateid_11",
              },
              {
                name: "Rajasthan",
                price: "₹6,599",
                image: "./images/states/Rajasthan.jpg",
                stateid: "stateid_09",
              },
              {
                name: "Himachal Pradesh",
                price: "₹8,499",
                image: "./images/states/HimachalPradesh.jpg",
                stateid: "stateid_04",
              },
            ].map((destination, index) => (
              <div
                key={index}
                className="group relative rounded-lg overflow-hidden h-[300px] transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-90"></div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <p className="text-sm mb-2">
                    Starting from{" "}
                    <span className="text-yellow-500 font-bold">
                      {destination.price}
                    </span>
                  </p>
                  <div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <Button
                      variant="secondary"
                      className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-primary rounded-sm"
                      onClick={() => goToPageWithId(destination.stateid!)}
                    >
                      View Packages
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white rounded-sm"
              onClick={() => goToPage()}
            >
              View All Destinations
            </Button>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
                Featured Travel Packages
              </h2>
              <Tabs defaultValue="popular" className="w-full md:w-auto">
                <TabsList className="bg-gray-100">
                  <TabsTrigger
                    value="popular"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2"
                  >
                    Popular
                  </TabsTrigger>
                  <TabsTrigger
                    value="price"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2"
                  >
                    Price: Low-High
                  </TabsTrigger>
                  <TabsTrigger
                    value="rating"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2"
                  >
                    Top Rated
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  destination: "Rajasthan Heritage Tour",
                  state: "Rajasthan",
                  duration: "7D/6N",
                  groupSize: "2-10 people",
                  price: 8999,
                  rating: 4.9,
                  image: "./images/rajasthan/RJ4.avif",
                  stateid: "stateid_09",
                },
                {
                  destination: "Madurai Temples",
                  state: "Tamil Nadu",
                  duration: "5D/4N",
                  groupSize: "2-8 people",
                  price: 4999,
                  rating: 4.5,
                  image: "./images/tamilnadu/TN3.avif",
                  stateid: "stateid_11",
                },
                {
                  destination: "Rishikesh Yoga Retreat",
                  state: "Uttarakhand",
                  duration: "6D/5N",
                  groupSize: "1-4 people",
                  price: 6999,
                  rating: 4.8,
                  image: "./images/uttarakhand/UK6.avif",
                  discount: 12,
                  stateid: "stateid_12",
                },
              ].map((pkg, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-56 w-full">
                    <img
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.destination}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    {pkg.discount && (
                      <div className="absolute top-4 right-4 bg-amber-400 text-blue-900 font-bold px-3 py-1 rounded-full text-xs">
                        {pkg.discount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                        {pkg.destination}
                      </h3>
                      <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-700">
                          {pkg.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">{pkg.state}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm">{pkg.groupSize}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-500">
                          Starting from
                        </span>
                        <p className="text-xl font-bold text-blue-900">
                          ₹{pkg.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <button
                        className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                        onClick={() => goToPageWithId(pkg.stateid)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-blue-900 text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium"
                onClick={() => goToPage()}
              >
                View All Packages
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto w-[90%]">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Book With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <IndianRupee className="h-10 w-10 text-yellow-500" />,
                title: "Best Price Guarantee",
                description:
                  "Find a lower price? We'll match it and give you an extra 10% off.",
              },
              {
                icon: <ShieldCheckIcon className="h-10 w-10 text-yellow-500" />,
                title: "Handpicked Hotels & Packages",
                description:
                  "We personally verify all accommodations and experiences.",
              },
              {
                icon: <HeadphonesIcon className="h-10 w-10 text-yellow-500" />,
                title: "24/7 Customer Support",
                description:
                  "Our team is available around the clock to assist you.",
              },
              {
                icon: <PlaneIcon className="h-10 w-10 text-yellow-500" />,
                title: "Secure & Flexible Payments",
                description:
                  "Multiple payment options with free cancellation policies.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto w-[90%]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Explore by Travel Type
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  name: "Adventure",
                  image: "./images/type/adventure.jpeg",
                },
                {
                  name: "Beach",
                  image: "./images/type/beach.webp",
                },
                {
                  name: "Heritage",
                  image: "./images/type/heritage.jpeg",
                },
                {
                  name: "Wildlife",
                  image: "./images/type/wildlife.webp",
                },
                {
                  name: "Friends",
                  image: "./images/type/friends.jpeg",
                },
                {
                  name: "Family",
                  image: "./images/type/family.jpg",
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="group relative rounded-lg overflow-hidden aspect-square cursor-pointer"
                >
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/70 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto w-[90%]">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Choose a Destination",
                description:
                  "Select from our curated travel packages to amazing destinations.",
              },
              {
                step: "02",
                title: "Customize Your Trip",
                description:
                  "Pick flights, hotels, and activities that match your preferences.",
              },
              {
                step: "03",
                title: "Secure Booking",
                description:
                  "Hassle-free payment and instant confirmation for peace of mind.",
              },
              {
                step: "04",
                title: "Travel & Enjoy",
                description:
                  "Experience your dream vacation with our 24/7 travel support.",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-gray-100 absolute -top-6 -left-2">
                  {step.step}
                </div>
                <div className="relative z-10 pl-4">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What Our Travelers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[90%] mx-auto">
              {[
                {
                  name: "Rohit Sharma",
                  location: "Manali Adventure",
                  quote:
                    "The snow-capped mountains and adventure activities made this trip unforgettable. Everything was well-organized and hassle-free!",
                  rating: 5,
                  image: "./images/most/usericon.png",
                },
                {
                  name: "Samantha",
                  location: "Kerala Backwaters",
                  quote:
                    "The houseboat experience in Alleppey was magical. The scenic beauty and traditional Kerala cuisine made it a dream vacation.",
                  rating: 5,
                  image: "./images/most/usericon.png",
                },
                {
                  name: "Vikram",
                  location: "Rajasthan Heritage Tour",
                  quote:
                    "Exploring Jaipur, Udaipur, and Jaisalmer was like traveling back in time. The royal palaces, local culture, and folk performances were mesmerizing!",
                  rating: 4,
                  image: "./images/most/usericon.png",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-white/80">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-white/30"
                          }`}
                        />
                      ))}
                  </div>
                  <p className="italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto w-[90%]">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get 15% Off on Your First Booking!
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Sign up today and receive an exclusive discount on your dream
              vacation. Limited time offer for new customers.
            </p>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-primary text-base px-8 py-6 rounded-sm"
              onClick={() => goToPage()}
            >
              Start Exploring
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <ChatSupport />
    </div>
  );
}
