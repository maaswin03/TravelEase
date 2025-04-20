import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  CalendarIcon,
  Plane,
  Train,
  Bus,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ChatSupport from "@/components/Home/chat-support";
import Footer from "@/components/Footer/Footer";

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

export default function TravelPackageView() {
  const [selectedHotel, setSelectedHotel] = useState<number | null>(1);
  const [selectedTransport, setSelectedTransport] = useState<string>("flight");
  const [currentImage, setCurrentImage] = useState(0);
  const { stateid, encodedId } = useParams();
  const [travelPackage, setTravelPackage] = useState<TravelPackage | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const packageId = encodedId ? atob(encodedId) : null;
  const [packageImages, setPackageImages] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [showInvalid, setShowInvalid] = useState(false);
  const navigate = useNavigate();

  const handleApply = () => {
    setShowInvalid(true);
  };

  useEffect(() => {
    const loadImages = async () => {
      if (travelPackage?.image) {
        const validImages = await getValidImages(travelPackage.image, 5); // or 10
        setPackageImages(validImages);
        console.log("Valid images:", validImages);
      }
    };

    loadImages();
  }, [travelPackage]);

  const getValidImages = async (
    basePath: string,
    maxCount: number = 10,
    extension: string = "avif"
  ): Promise<string[]> => {
    const normalized = basePath.replace(/^\.\/+/, "");
    const match = normalized.match(/^(images\/[^/]+\/)([A-Z]+)\d+\.\w+$/i);

    if (!match) return [];

    const [, folder, prefix] = match;

    const tryLoad = (url: string) => {
      return new Promise<string | null>((resolve) => {
        const img = new Image();
        img.src = `/${folder}${prefix}${url}.${extension}`;
        img.onload = () => resolve(`/${folder}${prefix}${url}.${extension}`);
        img.onerror = () => resolve(null);
      });
    };

    const urlsToTry = Array.from({ length: maxCount }, (_, i) => `${i + 1}`);
    const loadResults = await Promise.all(urlsToTry.map((id) => tryLoad(id)));

    return loadResults.filter(Boolean) as string[];
  };

  useEffect(() => {
    const fetchSinglePackage = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/travel-packages/${stateid}/${packageId}`
        );
        const data = await response.json();
        setTravelPackage(data);
      } catch (error) {
        console.error("Error fetching package:", error);
      } finally {
        setLoading(false);
      }
    };

    if (stateid && packageId) fetchSinglePackage();
  }, [stateid, packageId]);

  const mainCity = travelPackage?.destination.split(" - ")[0];

  const allHotels = [
    {
      id: 1,
      name: "Comfort Stay Resort",
      location: `${mainCity}`,
      stars: 3,
      priceExtra: 4999,
      image: "/images/hotels/hotel1.jpeg",
    },
    {
      id: 2,
      name: "Premium Luxury Hotel",
      location: `${mainCity}`,
      stars: 3,
      priceExtra: 5000,
      image: "/images/hotels/hotel2.jpeg",
    },
    {
      id: 3,
      name: "Royal Heritage Palace",
      location: `${mainCity}`,
      stars: 5,
      priceExtra: 12000,
      image: "/images/hotels/hotel3.webp",
    },
    {
      id: 4,
      name: "Urban Nest Boutique Hotel",
      location: `${mainCity}`,
      stars: 3,
      priceExtra: 3599,
      image: "/images/hotels/hotel4.jpeg",
    },
    {
      id: 5,
      name: "The Grand Bliss",
      location: `${mainCity}`,
      stars: 3,
      priceExtra: 4500,
      image: "/images/hotels/hotel5.jpeg",
    },
    {
      id: 6,
      name: "Elite Horizon Suites",
      location: `${mainCity}`,
      stars: 5,
      priceExtra: 10000,
      image: "/images/hotels/hotel6.jpeg",
    },
    {
      id: 7,
      name: "City Lights Inn",
      location: `${mainCity}`,
      stars: 2,
      priceExtra: 0,
      image: "/images/hotels/hotel7.jpeg",
    },
    {
      id: 8,
      name: "Palace View Retreat",
      location: `${mainCity}`,
      stars: 5,
      priceExtra: 14500,
      image: "/images/hotels/hotel8.jpeg",
    },
  ];
  

  const packageDetails = {
    itinerary: generateGenericItinerary(
      parseInt(travelPackage?.duration?.split(" ")[0] || "5"),
      travelPackage?.name || "none"
    ),

    hotels: [
      allHotels.find((hotel) => hotel.stars === 2),
      allHotels.find((hotel) => hotel.stars === 3),
      allHotels.find((hotel) => hotel.stars === 5),
    ].filter(Boolean),

    transport: [
      {
        id: "flight",
        name: "Flight",
        description: "Direct flights with airport transfers",
        icon: Plane,
        priceExtra: 14999,
      },
      {
        id: "train",
        name: "Train",
        description: "AC train tickets with station transfers",
        icon: Train,
        priceExtra: 2999,
      },
      {
        id: "bus",
        name: "Bus",
        description: "Luxury bus travel with pickup and drop",
        icon: Bus,
        priceExtra: 0,
      },
    ],

    inclusions: [
      "Accommodation as per selected hotel category",
      "Meals as mentioned in itinerary",
      "All transfers and sightseeing as per itinerary",
      "English speaking tour guide",
      "All applicable taxes",
    ],

    exclusions: [
      "Airfare or train fare (unless selected)",
      "Personal expenses",
      "Camera fees at monuments",
      "Travel insurance",
      "Anything not mentioned in inclusions",
    ],

    cancellation: [
      "30 days before trip: Full refund minus processing fee",
      "15-29 days before trip: 70% refund",
      "7-14 days before trip: 50% refund",
      "Less than 7 days: No refund",
    ],
  };

  function generateGenericItinerary(
    days: number,
    stateName: string
  ): { day: number; title: string; activities: string; meals: string[] }[] {
    const safeState =
      stateCollections[stateid as keyof typeof stateCollections] || stateName;

    const mealsOptions = [
      ["Breakfast", "Dinner"],
      ["Breakfast", "Lunch", "Dinner"],
    ];

    const middleDayActivities: string[] = [
      `Begin your day with a guided sightseeing tour across ${safeState}, where you'll explore majestic forts, ancient temples, colonial-era buildings, and iconic monuments. Learn about the rich dynasties, rulers, and cultures that shaped the land. Each site reveals a story — from battlefields to royal courts, spiritual sanctuaries to architectural marvels. Capture every moment as history unfolds before your eyes.`,

      `Dive into the natural charm of ${safeState} by trekking through misty hills, forest trails, or sprawling tea plantations. Witness breathtaking sunrise views, cascading waterfalls, and the sounds of birds echoing through the greenery. Whether it's the Western Ghats, Eastern Himalayas, or coastal plains, nature lovers will find serenity and adventure hand in hand.`,

      `Get your hands messy in a local art, pottery, or cooking workshop where traditional knowledge meets your creativity. Learn to paint Madhubani art, mold clay into tribal sculptures, or cook an authentic dish from ${safeState}'s regional cuisine. Afterward, relish your creations over a communal meal and bond with locals over stories and laughter.`,

      `Stroll through bustling bazaars and local markets of ${safeState}, vibrant with colors, spices, textiles, and handcrafted souvenirs. Chat with local vendors, sip on roadside chai, and indulge in spicy street food or sweet delights like jalebi or payasam. The market is not just a place to shop — it’s a cultural heartbeat that pulses with everyday life.`,

      `Head out on a short road trip to a nearby town or offbeat village in ${safeState}, often untouched by mainstream tourism. Discover peaceful lakesides, hidden temples, ancient rock carvings, or charming rural homes. Interact with local communities, observe age-old practices, and experience the warm hospitality unique to each region.`,

      `Feel the adrenaline rush as you engage in thrilling adventure sports offered in ${safeState}. From trekking in high-altitude trails to paragliding over valleys, zip-lining across forests, or kayaking through rivers, there’s no shortage of excitement. Certified instructors ensure safety while you unleash your adventurous side.`,

      `Dedicate a day to wellness and self-care with a relaxing itinerary that starts with yoga and meditation in the calm surroundings of ${safeState}. Experience healing through Ayurvedic massages, herbal treatments, or spa therapies derived from ancient Indian wisdom. The evening can end with a nature walk or peaceful moments by a riverside.`,

      `As night falls, attend a cultural program showcasing the traditional music and dance forms of ${safeState}. Watch Kathakali, Bharatanatyam, Bihu, or Garba performances, depending on the region. Colorful attire, rhythmic beats, and expressive storytelling come together to give you a mesmerizing cultural immersion followed by a traditional dinner feast.`,

      `Let a local guide take you on a secret trail to explore hidden gems like forgotten forts, unexplored waterfalls, or mystic caves in ${safeState}. These offbeat locations offer tranquility, stunning photo spots, and untold legends passed down through generations — perfect for those who love mystery and solitude.`,

      `Participate in a meaningful local initiative — be it volunteering at a village school, visiting a sustainable farm, or joining a tribal community to learn about their daily lives. These experiences offer more than tourism — they build empathy, understanding, and respect for the diverse communities within ${safeState}.`,

      `Visit a local museum or heritage center that curates the essence of ${safeState}'s evolution — from its tribal roots to colonial past, freedom struggles to modern achievements. Exhibits may include ancient weapons, manuscripts, paintings, textiles, and cultural artifacts. It’s a window into the identity of the land and its people.`,

      `End your active day with a relaxed boat ride or shikara cruise (if available), gently gliding over tranquil waters under an open sky. Whether it’s a lake, river, or backwater in ${safeState}, the serene experience, combined with reflections of the setting sun and soft ripples, provides the perfect closure to a memorable day.`,
    ];

    function shuffleArray<T>(array: T[]): T[] {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    const shuffledActivities = shuffleArray(middleDayActivities);
    let activityIndex = 0;

    const itinerary = [];

    for (let i = 0; i < days; i++) {
      let title = "";
      let activities = "";

      if (i === 0) {
        title = `Arrival & Welcome in ${safeState}`;
        activities = `Arrive in ${safeState} via your preferred mode of transport. Meet our tour representative at the airport/station. Transfer to hotel. Rest and explore nearby places in the evening. Welcome dinner awaits.`;
      } else if (i === days - 1) {
        title = `Departure from ${safeState}`;
        activities = `After breakfast, check out from the hotel. Enjoy some last-minute shopping or coffee at a local café. Transfer to the airport/station with wonderful memories from ${safeState}.`;
      } else {
        title = `Day ${i + 1} in ${safeState}`;
        // Get next activity from shuffled array, cycling back to start if needed
        activities =
          shuffledActivities[activityIndex % shuffledActivities.length];
        activityIndex++;
      }

      itinerary.push({
        day: i + 1,
        title,
        activities,
        meals: mealsOptions[i % mealsOptions.length],
      });
    }

    return itinerary;
  }

  const handleBooking = () => {
    const bookingData = {
      accommodation: packageDetails.hotels.find(
        (h) => h?.id === selectedHotel
      )?.name,
      transport: selectedTransport,
      totalPrice: calculateTotal(),
    };
  
    localStorage.setItem("bookingSummary", JSON.stringify(bookingData));
    console.log("Navigating to:", `/payment/${stateid}/${encodedId}`);
    navigate(`/payment/${stateid}/${encodedId}`);
  };
  

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const startDate = new Date(user.startDate);
  const durationDays = parseInt(travelPackage?.duration?.split(" ")[0] || "0");
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + durationDays);

  const bookingDetails = {
    startDate: user.startDate,
    endDate: endDate.toISOString().split("T")[0],
    people: user.peopleCount,
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % packageImages.length);
  };

  const calculateTotal = () => {
    const basePrice = bookingDetails.people * (travelPackage?.price || 0);
    const hotelExtra =
      packageDetails.hotels.find((h) => h?.id === selectedHotel)?.priceExtra ||
      0 ||
      0;
    const transportExtra =
      bookingDetails.people *
      (packageDetails.transport.find((t) => t.id === selectedTransport)
        ?.priceExtra || 0);

    return basePrice + hotelExtra + transportExtra;
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + packageImages.length) % packageImages.length
    );
  };

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
    <div className="min-h-screen bg-[#F4F6F9]">
      <Navbar />

      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[400px] md:h-[500px]">
                <img
                  src={packageImages[currentImage] || "/placeholder.svg"}
                  alt={travelPackage.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                {packageImages.length > 1 && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none h-20"></div>
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#1E3A8A]">
                      {currentImage + 1}/{packageImages.length}
                    </div>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-20 flex items-end">
                  <div className="p-4 text-white">
                    <h2 className="font-bold text-xl">{travelPackage.name}</h2>
                  </div>
                </div>
              </div>

              {packageImages.length > 1 && (
                <div className="flex p-3 gap-3 overflow-x-auto bg-gray-50">
                  {packageImages.map((img, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "relative h-20 w-32 flex-shrink-0 cursor-pointer rounded-md overflow-hidden transition-all",
                        currentImage === idx
                          ? "ring-2 ring-[#FFC107] scale-[0.95]"
                          : "hover:opacity-80"
                      )}
                      onClick={() => setCurrentImage(idx)}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="bg-[#1E3A8A]/10 px-4 py-2 rounded-lg">
                  <span className="text-[#1E3A8A] font-medium">
                    {travelPackage.duration}
                  </span>
                </div>
                <div className="bg-[#1E3A8A]/10 px-4 py-2 rounded-lg">
                  <span className="text-[#1E3A8A] font-medium">
                    {travelPackage.destination.split(" - ").join(" • ")}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {travelPackage.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#1E3A8A] mb-6">
                Trip Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-[#1E3A8A]/5 hover:bg-[#1E3A8A]/10 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-[#FFC107]/20 flex items-center justify-center mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                        stroke="#1E3A8A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 22V12H15V22"
                        stroke="#1E3A8A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1E3A8A] mb-2">
                    Luxury Accommodations
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Stay in handpicked luxury hotels and a traditional houseboat
                    for an authentic Kerala experience.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-[#1E3A8A]/5 hover:bg-[#1E3A8A]/10 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-[#FFC107]/20 flex items-center justify-center mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#1E3A8A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 6V12L16 14"
                        stroke="#1E3A8A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1E3A8A] mb-2">
                    Perfectly Paced
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Balanced itinerary with guided tours and free time to
                    explore and relax at your own pace.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-[#1E3A8A]/5 hover:bg-[#1E3A8A]/10 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-[#FFC107]/20 flex items-center justify-center mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999V4.60999Z"
                        stroke="#1E3A8A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1E3A8A] mb-2">
                    Romantic Experiences
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Special romantic moments including private dinners, sunset
                    cruises, and couple's activities.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">
                Day-wise Itinerary
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {packageDetails.itinerary.map((day) => (
                  <AccordionItem key={day.day} value={`day-${day.day}`}>
                    <AccordionTrigger className="hover:text-[#1E3A8A]">
                      <div className="flex items-center">
                        <span className="bg-[#1E3A8A] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          {day.day}
                        </span>
                        <span>{day.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-11 space-y-3">
                        <p className="text-gray-700">{day.activities}</p>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">
                            Meals:
                          </span>
                          <div className="flex gap-2">
                            {day.meals.map((meal: string, idx: number) => (
                              <span
                                key={idx}
                                className="bg-[#FFC107]/20 text-[#1E3A8A] text-sm px-2 py-1 rounded"
                              >
                                {meal}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#1E3A8A] mb-6">
                Guest Experiences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#1E3A8A]/5 to-[#1E3A8A]/10 p-5 rounded-lg relative">
                  <div className="absolute top-4 right-4 text-[#FFC107]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.9999 2C6.47992 2 1.99992 6.48 1.99992 12C1.99992 17.52 6.47992 22 11.9999 22C17.5199 22 21.9999 17.52 21.9999 12C21.9999 6.48 17.5199 2 11.9999 2ZM15.9999 17H7.99992V15H15.9999V17ZM16.4999 11.25L15.4099 12.34L12.9999 9.94L12.9999 15H10.9999L10.9999 9.94L8.58992 12.34L7.49992 11.25L11.9999 6.75L16.4999 11.25Z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "The houseboat experience in Alleppey was magical! Watching
                    the sunset over the backwaters with my husband while
                    enjoying fresh seafood was unforgettable."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                      <p className="font-medium text-[#1E3A8A]">
                        Priya & Rahul
                      </p>
                      <p className="text-xs text-gray-500">
                        Traveled April 2024
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#1E3A8A]/5 to-[#1E3A8A]/10 p-5 rounded-lg relative">
                  <div className="absolute top-4 right-4 text-[#FFC107]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.9999 2C6.47992 2 1.99992 6.48 1.99992 12C1.99992 17.52 6.47992 22 11.9999 22C17.5199 22 21.9999 17.52 21.9999 12C21.9999 6.48 17.5199 2 11.9999 2ZM15.9999 17H7.99992V15H15.9999V17ZM16.4999 11.25L15.4099 12.34L12.9999 9.94L12.9999 15H10.9999L10.9999 9.94L8.58992 12.34L7.49992 11.25L11.9999 6.75L16.4999 11.25Z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "The tea plantations in Munnar were breathtaking! Our guide
                    was knowledgeable and the hotel staff went above and beyond
                    to make our anniversary special."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                      <p className="font-medium text-[#1E3A8A]">
                        Aditya & Meera
                      </p>
                      <p className="text-xs text-gray-500">
                        Traveled February 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotels */}
            <div
              id="hotels-section"
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">
                Choose Your Hotel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packageDetails.hotels.map((hotel) => (
                  <Card
                    key={hotel!.id}
                    className={cn(
                      "cursor-pointer transition-all p-0 pb-5",
                      selectedHotel === hotel!.id
                        ? "ring-2 ring-[#FFC107]"
                        : "hover:shadow-lg"
                    )}
                    onClick={() => setSelectedHotel(hotel!.id)}
                  >
                    <div className="relative h-40">
                      <img
                        src={hotel!.image || "/placeholder.svg"}
                        alt={hotel!.name}
                        className="h-full w-full object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{hotel!.name}</CardTitle>
                      <CardDescription>{hotel!.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center mb-2">
                        {Array.from({ length: hotel!.stars }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={16}
                            className="fill-[#FFC107] text-[#FFC107]"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        {hotel!.priceExtra > 0
                          ? `+₹${hotel!.priceExtra.toLocaleString()}`
                          : "Included in base price"}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={
                          selectedHotel === hotel!.id ? "default" : "outline"
                        }
                        className={cn(
                          "w-full",
                          selectedHotel === hotel!.id
                            ? "bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
                            : ""
                        )}
                        onClick={() => setSelectedHotel(hotel!.id)}
                      >
                        {selectedHotel === hotel!.id
                          ? "Selected"
                          : "Select This Hotel"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Transport */}
            <div
              id="transport-section"
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">
                Choose Your Transport
              </h2>
              <RadioGroup
                value={selectedTransport || ""}
                onValueChange={setSelectedTransport}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packageDetails.transport.map((transport) => {
                    const Icon = transport.icon;
                    return (
                      <div
                        key={transport.id}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all",
                          selectedTransport === transport.id
                            ? "border-[#FFC107] bg-[#FFC107]/10"
                            : "hover:border-gray-300"
                        )}
                        onClick={() => setSelectedTransport(transport.id)}
                      >
                        <div className="flex items-start">
                          <RadioGroupItem
                            value={transport.id}
                            id={transport.id}
                            className="mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center">
                              <Icon size={20} className="text-[#1E3A8A] mr-2" />
                              <Label
                                htmlFor={transport.id}
                                className="font-medium cursor-pointer"
                              >
                                {transport.name}
                              </Label>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {transport.description}
                            </p>
                            <p className="text-sm font-medium mt-2">
                              {transport.priceExtra > 0
                                ? `+₹${transport.priceExtra.toLocaleString()}`
                                : "Included in base price"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger className="hover:text-[#1E3A8A]">
                    What is the best time to visit this destination?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      The ideal time to visit varies based on the region. Most
                      destinations are best explored during the cooler months
                      (October to March) for pleasant weather and outdoor
                      activities. For hill stations, summer (April to June)
                      offers a great escape from the heat, while monsoon months
                      can provide a lush, scenic experience for nature lovers.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2">
                  <AccordionTrigger className="hover:text-[#1E3A8A]">
                    Is this travel package customizable?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Yes, our travel packages are fully customizable. You can
                      add or remove destinations, extend your stay, choose
                      different hotels, or include additional experiences. Just
                      let our travel consultant know your preferences, and we'll
                      tailor the package accordingly.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3">
                  <AccordionTrigger className="hover:text-[#1E3A8A]">
                    What should I pack for the trip?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Pack season-appropriate clothing — light cotton wear for
                      summer or coastal regions, and warm clothes for hill
                      stations. Carry sunscreen, insect repellent, comfortable
                      footwear, any medications, and modest clothing for
                      religious or cultural sites. A raincoat or umbrella is
                      recommended if traveling during the monsoon.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-4">
                  <AccordionTrigger className="hover:text-[#1E3A8A]">
                    Are romantic or special experiences included?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Yes, we offer add-on experiences like candlelight dinners,
                      spa treatments, sunset cruises, and room decorations for
                      couples. If you're celebrating a honeymoon or anniversary,
                      let us know in advance to include special arrangements in
                      your itinerary.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-5">
                  <AccordionTrigger className="hover:text-[#1E3A8A]">
                    How will transportation and transfers be managed?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Depending on your package, we provide air, train, or
                      luxury bus travel, along with airport/station pickup and
                      drop services. Private cabs are arranged for local
                      sightseeing. You’ll receive a full transport schedule in
                      your travel voucher after confirmation.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">
                Additional Details
              </h2>
              <Tabs defaultValue="inclusions">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                  <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
                  <TabsTrigger value="cancellation">
                    Cancellation Policy
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="inclusions" className="pt-4">
                  <ul className="space-y-2">
                    {packageDetails.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check
                          size={18}
                          className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="exclusions" className="pt-4">
                  <ul className="space-y-2">
                    {packageDetails.exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <X
                          size={18}
                          className="text-red-500 mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="cancellation" className="pt-4">
                  <ul className="space-y-2">
                    {packageDetails.cancellation.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#1E3A8A] font-medium mr-2">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Booking Summary - Sticky on Desktop */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="shadow-xl border-0 overflow-hidden p-0">
                <CardHeader className="bg-gradient-to-r from-[#1E3A8A] to-[#2A4FB5] text-white rounded-t-lg p-6">
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 10H23"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    Your Trip Summary
                  </CardTitle>
                  <CardDescription className="text-white/80 mt-1">
                    {travelPackage.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-[#FFC107]/10 to-[#FFC107]/5 p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-[#1E3A8A] mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Travel Period
                          </p>
                          <p className="font-medium text-[#1E3A8A]">
                            {format(
                              bookingDetails.startDate || new Date(),
                              "MMM d"
                            )}{" "}
                            -{" "}
                            {format(
                              bookingDetails.endDate || new Date(),
                              "MMM d, yyyy"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full text-[#1E3A8A] font-bold text-sm shadow-sm">
                        {travelPackage?.duration}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center mr-3">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                              stroke="#1E3A8A"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                              stroke="#1E3A8A"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                              stroke="#1E3A8A"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                              stroke="#1E3A8A"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Travelers
                          </p>
                          <p className="font-medium text-[#1E3A8A]">
                            {bookingDetails.people} Travelers
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Selected Hotel */}
                    <div className="bg-white rounded-lg border p-4 transition-all hover:shadow-md">
                      <div className="flex items-start">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={
                              packageDetails.hotels.find(
                                (h) => h!.id === selectedHotel
                              )?.image || "/placeholder.svg"
                            }
                            alt="Hotel"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-[#1E3A8A]">
                                {
                                  packageDetails.hotels.find(
                                    (h) => h!.id === selectedHotel
                                  )?.name
                                }
                              </h3>
                              <p className="text-sm text-gray-500">
                                {
                                  packageDetails.hotels.find(
                                    (h) => h!.id === selectedHotel
                                  )?.location
                                }
                              </p>
                            </div>
                            <div className="flex">
                              {Array.from({
                                length:
                                  packageDetails.hotels.find(
                                    (h) => h!.id === selectedHotel
                                  )?.stars || 0,
                              }).map((_, idx) => (
                                <Star
                                  key={idx}
                                  size={12}
                                  className="fill-[#FFC107] text-[#FFC107]"
                                />
                              ))}
                            </div>
                          </div>
                          <Button
                            variant="link"
                            className="text-[#1E3A8A] p-0 h-auto text-sm mt-1"
                            onClick={() =>
                              document
                                .getElementById("hotels-section")
                                ?.scrollIntoView({ behavior: "smooth" })
                            }
                          >
                            Change Hotel
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Selected Transport */}
                    <div className="bg-white rounded-lg border p-4 transition-all hover:shadow-md">
                      <div className="flex items-center">
                        {selectedTransport &&
                          (() => {
                            const transport = packageDetails.transport.find(
                              (t) => t.id === selectedTransport
                            );
                            const Icon = transport?.icon;
                            return Icon ? (
                              <Icon size={24} className="text-[#1E3A8A] mr-3" />
                            ) : null;
                          })()}
                        <div>
                          <h3 className="font-medium text-[#1E3A8A]">
                            {
                              packageDetails.transport.find(
                                (t) => t.id === selectedTransport
                              )?.name
                            }
                          </h3>
                          <p className="text-sm text-gray-500">
                            {
                              packageDetails.transport.find(
                                (t) => t.id === selectedTransport
                              )?.description
                            }
                          </p>
                          <Button
                            variant="link"
                            className="text-[#1E3A8A] p-0 h-auto text-sm mt-1"
                            onClick={() =>
                              document
                                .getElementById("transport-section")
                                ?.scrollIntoView({ behavior: "smooth" })
                            }
                          >
                            Change Transport
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Price Calculation */}
                    <div className="rounded-lg bg-gray-50 p-4 mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Base Package</span>
                        <span>
                          {bookingDetails.people} x ₹
                          {travelPackage?.price.toLocaleString()}
                        </span>
                      </div>
                      {selectedHotel &&
                        (packageDetails.hotels.find(
                          (h) => h!.id === selectedHotel
                        )?.priceExtra ?? 0) > 0 && (
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Hotel Upgrade</span>
                            <span>
                              ₹
                              {packageDetails.hotels
                                .find((h) => h!.id === selectedHotel)
                                ?.priceExtra.toLocaleString()}
                            </span>
                          </div>
                        )}
                      {selectedTransport &&
                        (() => {
                          const transport = packageDetails.transport.find(
                            (t) => t.id === selectedTransport
                          );
                          return transport && transport.priceExtra > 0;
                        })() && (
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Transport</span>
                            <span>
                              {bookingDetails.people} x ₹
                              {packageDetails.transport
                                .find((t) => t.id === selectedTransport)
                                ?.priceExtra.toLocaleString()}
                            </span>
                          </div>
                        )}
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Travelers</span>
                        <span>{bookingDetails.people}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-3 border-t mt-3">
                        <span>Total Price</span>
                        <span className="text-[#1E3A8A]">
                          ₹{calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter promo code"
                          className="flex-1"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          className="border-[#1E3A8A] text-[#1E3A8A]"
                          onClick={handleApply}
                        >
                          Apply
                        </Button>
                      </div>
                      {showInvalid && (
                        <p className="text-red-500 text-sm mt-1">
                          Invalid promo code
                        </p>
                      )}
                    </div>

                    {/* Book Now Button */}
                    <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-[#FFC107] to-[#FFD54F] hover:from-[#FFD54F] hover:to-[#FFE082] text-[#1E3A8A] font-bold py-6 text-lg shadow-lg">
                      Book Now
                    </Button>

                    <p className="text-xs text-center text-gray-500 mt-2">
                      No payment required now. Reserve your spot today!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <ChatSupport/>
      <Footer/>
    </div>
  );
}
