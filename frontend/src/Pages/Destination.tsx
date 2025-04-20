import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ChatSupport from "@/components/Home/chat-support";

export default function Destination() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const goToPageWithId = (stateid: string) => {
    navigate(`/packages/${stateid}`);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <Navbar />

      <section className="relative h-[600px] overflow-hidden">
        <img
          src="./images/states/Madhya Pradesh.webp"
          alt="Beautiful travel destination"
          className="object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Explore.</span>{" "}
            <span className="text-yellow-500">Discover.</span>{" "}
            <span className="text-white">Experience.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Find the perfect travel package for your next adventure.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-primary text-base px-8 py-6 rounded-sm">
            Start Exploring
          </Button>
        </div>
      </section>

      {/* Top-Selling Packages */}
      <section className="max-w-7xl mx-auto px-4 mb-16 mt-16">
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8">
          Top-Selling Packages
        </h2>

        <div className="flex overflow-x-auto space-x-4 mb-6 pb-2 scrollbar-hide">
          <button
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              activeTab === "all"
                ? "bg-[#1E3A8A] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Packages
          </button>
          <button
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              activeTab === "trending"
                ? "bg-[#1E3A8A] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab("trending")}
          >
            Trending
          </button>
          <button
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              activeTab === "offers"
                ? "bg-[#1E3A8A] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab("offers")}
          >
            Special Offers
          </button>
          <button
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              activeTab === "honeymoon"
                ? "bg-[#1E3A8A] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab("honeymoon")}
          >
            Honeymoon
          </button>
          <button
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              activeTab === "family"
                ? "bg-[#1E3A8A] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab("family")}
          >
            Family
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.destination}
                  className="h-full w-full object-cover"
                />
                {pkg.discount && (
                  <div className="absolute top-4 right-4 bg-[#FFC107] text-[#1E3A8A] font-bold px-3 py-1 rounded-full text-sm">
                    {pkg.discount}% OFF
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {pkg.destination}
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-[#FFC107] fill-current" />
                    <span className="ml-1 text-sm font-medium">
                      {pkg.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{pkg.state}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{pkg.groupSize}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Starting from</span>
                    <p className="text-xl font-bold text-[#1E3A8A]">
                      ₹{formatPrice(pkg.price)}
                    </p>
                  </div>
                  <button
                    className="bg-[#1E3A8A] hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition-colors"
                    onClick={() => goToPageWithId(pkg.stateid!)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular States Carousel */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8">
          Popular Destinations
        </h2>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {states.map((state, index) => (
            <div
              key={index}
              className="min-w-[250px] rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-105"
            >
              <div className="relative h-40">
                <img
                  src={state.image || "/placeholder.svg"}
                  alt={state.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold">{state.name}</h3>
                  <p className="text-sm">{state.packages} packages</p>
                </div>
              </div>
              <div className="p-3 bg-white">
                <button className="w-full bg-[#F4F6F9] hover:bg-gray-200 text-[#1E3A8A] font-medium py-2 rounded-lg transition-colors text-sm">
                  View Packages
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal & Festival Offers */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8">
          Seasonal & Festival Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-dashed border-[#FFC107] transition-all hover:shadow-xl hover:scale-105"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-800">
                    {offer.title}
                  </h3>
                  <div className="bg-[#FFC107] text-[#1E3A8A] font-bold px-3 py-1 rounded-full text-sm">
                    {offer.discount}% OFF
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg mb-4">
                  <p className="text-center font-mono text-lg font-bold tracking-wider">
                    {offer.code}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">Expires: {offer.expiry}</span>
                  </div>
                </div>
                <button className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-white py-2 rounded-lg transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-blue-700 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">
                Flash Deal Ending Soon!
              </h2>
              <p className="text-lg mb-4">
                Goa Beach Retreat - 30% OFF for the next:
              </p>
              <div className="flex space-x-4">
                <div className="bg-white text-[#1E3A8A] rounded-lg p-3 text-center min-w-[60px]">
                  <span className="block text-2xl font-bold">24</span>
                  <span className="text-xs">Hours</span>
                </div>
                <div className="bg-white text-[#1E3A8A] rounded-lg p-3 text-center min-w-[60px]">
                  <span className="block text-2xl font-bold">36</span>
                  <span className="text-xs">Minutes</span>
                </div>
                <div className="bg-white text-[#1E3A8A] rounded-lg p-3 text-center min-w-[60px]">
                  <span className="block text-2xl font-bold">52</span>
                  <span className="text-xs">Seconds</span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xl mb-2">
                ₹15,999{" "}
                <span className="line-through text-gray-300 text-lg">
                  ₹22,999
                </span>
              </p>
              <button
                className="bg-[#FFC107] hover:bg-yellow-500 text-[#1E3A8A] font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105"
                onClick={() => goToPageWithId("stateid_03")}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8">
          What Our Travelers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl"
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
                  <h3 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-[#FFC107] fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.review}"</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="font-medium text-lg text-gray-800">
                  {faq.question}
                </h3>
                {activeFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-[#1E3A8A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#1E3A8A]" />
                )}
              </button>
              {activeFaq === index && (
                <div className="px-5 pb-5">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-[#1E3A8A] rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Planning Your Trip?
          </h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Let our experts create your dream vacation plan tailored to your
            preferences and budget.
          </p>
          <button
            className="bg-[#FFC107] hover:bg-yellow-500 text-[#1E3A8A] font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105"
            onClick={() => navigate("/contactus")}
          >
            Get Free Consultation
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600">
                Get travel tips, exclusive offers, and ₹500 off on your first
                booking!
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full sm:w-64 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] mb-3 sm:mb-0"
                />
                <button className="bg-[#1E3A8A] hover:bg-blue-900 text-white py-3 px-6 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatSupport />
    </div>
  );
}

const packages = [
  {
    destination: "Kerala Backwaters",
    state: "Kerala",
    duration: "5D/4N",
    groupSize: "2-8 people",
    price: 4999,
    rating: 4.8,
    image: "./images/kerala/kerala5.avif",
    discount: 15,
    stateid: "stateid_06",
  },
  {
    destination: "Manali Adventure",
    state: "Himachal Pradesh",
    duration: "6D/5N",
    groupSize: "4-12 people",
    price: 8999,
    rating: 4.6,
    image: "./images/himachal/HP3.avif",
    stateid: "stateid_04",
  },
  {
    destination: "Goa Beach Retreat",
    state: "Goa",
    duration: "4D/3N",
    groupSize: "2-6 people",
    price: 5999,
    rating: 4.7,
    image: "./images/goa/GOA3.avif",
    discount: 10,
    stateid: "stateid_03",
  },
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
];

const states = [
  {
    name: "Kerala",
    packages: 24,
    image: "./images/kerala/kerala4.avif",
    stateid: "stateid_06",
  },
  {
    name: "Himachal Pradesh",
    packages: 18,
    image: "./images/himachal/HP4.avif",
    stateid: "stateid_04",
  },
  {
    name: "Goa",
    packages: 15,
    image: "./images/goa/GOA4.avif",
    stateid: "stateid_03",
  },
  {
    name: "Rajasthan",
    packages: 22,
    image: "./images/rajasthan/RJ1.avif",
    stateid: "stateid_09",
  },
  {
    name: "Uttarakhand",
    packages: 16,
    image: "./images/uttarakhand/UK1.avif",
    stateid: "stateid_12",
  },
];

const offers = [
  {
    title: "Summer Special",
    discount: 15,
    code: "SUMMER15",
    expiry: "30 Jun 2025",
  },
  {
    title: "Monsoon Magic",
    discount: 20,
    code: "MONSOON20",
    expiry: "31 Aug 2025",
  },
  {
    title: "Honeymoon",
    discount: 12,
    code: "HONEY12",
    expiry: "31 Dec 2025",
  },
  {
    title: "Family Fun",
    discount: 10,
    code: "FAMILY10",
    expiry: "30 Sep 2025",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    rating: 5,
    review:
      "The Kerala trip was absolutely magical! Our guide was knowledgeable and the accommodations were top-notch. Will definitely book with TravelEase again!",
    image: "./images/most/usericon.png",
  },
  {
    name: "Rahul Mehta",
    rating: 4,
    review:
      "Great experience in Rajasthan. The itinerary was well-planned and we got to see all the major attractions. Only wish we had a bit more free time.",
    image: "./images/most/usericon.png",
  },
  {
    name: "Ananya Patel",
    rating: 5,
    review:
      "The Goa package was perfect for our friend group! The beachside resort was amazing and the included activities made our trip memorable.",
    image: "./images/most/usericon.png",
  },
];

const faqs = [
  {
    question: "How do I book a package?",
    answer:
      "You can book a package by selecting your desired destination, checking availability for your preferred dates, and completing the booking process online. Payment can be made through various methods including credit/debit cards, net banking, and UPI.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Our standard cancellation policy offers a full refund if cancelled 30 days before the trip, 75% refund if cancelled 15-29 days before, 50% refund if cancelled 7-14 days before, and no refund for cancellations less than 7 days before the trip. Some packages may have specific policies which will be mentioned in their details.",
  },
  {
    question: "Are flights included in the package price?",
    answer:
      "It depends on the package. Some of our packages include flights while others don't. This information is clearly mentioned in the package details under 'What's Included'. If flights are not included, we can help you book them separately at competitive rates.",
  },
  {
    question: "Can I customize a package?",
    answer:
      "Yes, most of our packages can be customized to suit your preferences. You can request changes in accommodation, activities, or duration. Please contact our travel experts for personalized assistance with customizing your trip.",
  },
  {
    question: "Is travel insurance included?",
    answer:
      "Travel insurance is not included in our standard packages but we strongly recommend purchasing it. We offer travel insurance as an add-on during the booking process, which covers medical emergencies, trip cancellations, lost baggage, and other unforeseen circumstances.",
  },
];
