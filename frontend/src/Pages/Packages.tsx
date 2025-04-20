"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Filter,
  ChevronDown,
  ChevronUp,
  Plane,
  Train,
  Bus,
  Car,
  ArrowUpDown,
} from "lucide-react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useLocation } from "react-router-dom";
import ChatSupport from "@/components/Home/chat-support";
import { useNavigate } from "react-router-dom";

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

export default function TravelPackages() {
  const { stateId } = useParams<{ stateId: string }>(); // Get stateId from URL
  const [travelPackages, setTravelPackages] = useState<TravelPackage[]>([]);
  const [, setLoading] = useState(true);
  const [, setFetchTrigger] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        console.log("StateId being used:", stateId);
        const response = await fetch(
          `http://localhost:8000/api/travel-packages/${stateId}`
        );
        const data = await response.json();

        console.log("Fetched data:", data);

        setTravelPackages((prev) => {
          console.log("Previous state:", prev);
          console.log("New state:", data);
          return data;
        });
        setFetchTrigger((prev) => !prev);
      } catch (error) {
        console.error("Error fetching travel packages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (stateId) fetchPackages();
  }, [stateId]);

  const goToPageWithId = (stateid: string, packageId: string) => {
    const encodedId = btoa(packageId);
    navigate(`/detailedview/${stateid}/${encodedId}`);
  };

  const [filteredPackages, setFilteredPackages] = useState<TravelPackage[]>([]);
  const [filters, setFilters] = useState<{
    priceRange: number[];
    travelType: string[];
    rating: number;
    discountAvailable: boolean;
    duration: string[];
    category: string;
  }>({
    priceRange: [5000, 150000],
    travelType: [],
    rating: 0,
    discountAvailable: false,
    duration: [],
    category: "all",
  });
  const [sortOption, setSortOption] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Featured packages for carousel
  const featuredPackages = travelPackages
    .filter((pkg) => pkg.featured)
    .slice(0, 3);

  console.log("Filtered Packages:", filteredPackages);

  useEffect(() => {
    setFilteredPackages(travelPackages); // Sync with the fetched data
  }, [travelPackages]);

  // Auto-rotate featured packages
  useEffect(() => {
    if (featuredPackages.length === 0) return;

    const interval = setInterval(() => {
      setFeaturedIndex(
        (prevIndex) => (prevIndex + 1) % featuredPackages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredPackages.length]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...travelPackages];

    // Filter by price range
    result = result.filter(
      (pkg) =>
        pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1]
    );

    // Filter by travel type
    if (filters.travelType.length > 0) {
      result = result.filter((pkg) =>
        filters.travelType.some((type) => pkg.travelOptions.includes(type))
      );
    }

    // Filter by rating
    if (filters.rating > 0) {
      result = result.filter((pkg) => pkg.rating >= filters.rating);
    }

    // Filter by discount available
    if (filters.discountAvailable) {
      result = result.filter((pkg) => pkg.discount > 0);
    }

    // Filter by duration
    if (filters.duration.length > 0) {
      result = result.filter((pkg) => filters.duration.includes(pkg.duration));
    }

    // Filter by category
    if (filters.category !== "all") {
      result = result.filter((pkg) => pkg.category === filters.category);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredPackages(result);
  }, [filters, sortOption, travelPackages]);

  const handlePriceRangeChange = (value: number[]) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleTravelTypeChange = (type: string) => {
    const updatedTypes = filters.travelType.includes(type)
      ? filters.travelType.filter((t) => t !== type)
      : [...filters.travelType, type];
    setFilters({ ...filters, travelType: updatedTypes });
  };

  const handleDurationChange = (duration: string) => {
    const updatedDurations = filters.duration.includes(duration)
      ? filters.duration.filter((d) => d !== duration)
      : [...filters.duration, duration];
    setFilters({ ...filters, duration: updatedDurations });
  };

  const handleRatingChange = (rating: number) => {
    setFilters({ ...filters, rating });
  };

  const handleDiscountChange = (checked: boolean) => {
    setFilters({ ...filters, discountAvailable: checked });
  };

  const handleCategoryChange = (category: string) => {
    setFilters({ ...filters, category });
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [5000, 150000],
      travelType: [],
      rating: 0,
      discountAvailable: false,
      duration: [],
      category: "all",
    });
    setSortOption("featured");
  };

  // Format price to INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Render travel option icons
  const renderTravelOptions = (options: string[]) => {
    return (
      <div className="flex space-x-2 mt-2">
        {options.includes("flight") && (
          <div className="tooltip" data-tip="Flight">
            <Plane className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        {options.includes("train") && (
          <div className="tooltip" data-tip="Train">
            <Train className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        {options.includes("bus") && (
          <div className="tooltip" data-tip="Bus">
            <Bus className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        {options.includes("car") && (
          <div className="tooltip" data-tip="Car">
            <Car className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>
    );
  };

  // Render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < Math.floor(rating)
                ? "fill-[#FFC107] text-[#FFC107]"
                : i < rating
                ? "fill-[#FFC107] text-[#FFC107] opacity-50"
                : "text-gray-300"
            )}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-[#1E3A8A] text-white py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Discover Incredible India</h1>
            <p className="mt-2">
              Explore handpicked travel packages for your next adventure
            </p>
          </div>
        </header>

        {/* Featured Package Carousel */}
        <section className="relative bg-[#1E3A8A] text-white pb-8">
          <div className="container mx-auto px-4">
            <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
              {featuredPackages.map((pkg, index) => (
                <div
                  key={pkg._id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === featuredIndex
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="absolute inset-0 bg-black/40 z-10"></div>
                  <img
                    src={
                      pkg.image.replace("./images", "/images") ||
                      "/placeholder.svg"
                    }
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <Badge className="bg-[#FFC107] text-black mb-2">
                      Featured
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {pkg.name}
                    </h2>
                    <p className="text-lg mb-2">{pkg.destination}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          {renderStars(pkg.rating)}
                          <span className="ml-2 text-sm">
                            ({pkg.reviews} reviews)
                          </span>
                        </div>
                        <p className="text-lg mt-1">{pkg.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm line-through">
                          {formatPrice(pkg.originalPrice)}
                        </p>
                        <p className="text-2xl font-bold">
                          {formatPrice(pkg.price)}
                        </p>
                        <Button
                          className="mt-2 bg-[#FFC107] text-black hover:bg-[#FFD54F]"
                          onClick={() => goToPageWithId(stateId ?? "", pkg._id)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30">
                {featuredPackages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full mx-1 ${
                      index === featuredIndex ? "bg-[#FFC107]" : "bg-white/50"
                    }`}
                    onClick={() => setFeaturedIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-between"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <span className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </span>
              {mobileFiltersOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside
              className={`md:w-1/4 lg:w-1/5 ${
                mobileFiltersOpen ? "block" : "hidden"
              } md:block`}
            >
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>

                <Accordion
                  type="multiple"
                  defaultValue={[
                    "category",
                    "price",
                    "travel",
                    "rating",
                    "duration",
                    "discount",
                  ]}
                >
                  <AccordionItem value="category">
                    <AccordionTrigger>Package Category</AccordionTrigger>
                    <AccordionContent>
                      <div className="">
                        <Tabs
                          defaultValue="all"
                          value={filters.category}
                          onValueChange={handleCategoryChange}
                        >
                          <TabsList className="grid grid-cols-3 w-[100%]">
                            {/* <TabsTrigger value="all">All</TabsTrigger> */}
                            <TabsTrigger value="budget">Budget</TabsTrigger>
                            <TabsTrigger value="comfort">Comfort</TabsTrigger>
                            <TabsTrigger value="luxury">Luxury</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price" className="">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 mt-2">
                        <Slider
                          defaultValue={[5000, 150000]}
                          min={5000}
                          max={150000}
                          step={1000}
                          value={filters.priceRange}
                          onValueChange={handlePriceRangeChange}
                        />
                        <div className="flex items-center justify-between">
                          <span>{formatPrice(filters.priceRange[0])}</span>
                          <span>{formatPrice(filters.priceRange[1])}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="travel">
                    <AccordionTrigger>Travel Type</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="flight"
                            checked={filters.travelType.includes("flight")}
                            onCheckedChange={() =>
                              handleTravelTypeChange("flight")
                            }
                          />
                          <Label htmlFor="flight" className="flex items-center">
                            <Plane className="h-4 w-4 mr-2" />
                            Flight
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="train"
                            checked={filters.travelType.includes("train")}
                            onCheckedChange={() =>
                              handleTravelTypeChange("train")
                            }
                          />
                          <Label htmlFor="train" className="flex items-center">
                            <Train className="h-4 w-4 mr-2" />
                            Train
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="bus"
                            checked={filters.travelType.includes("bus")}
                            onCheckedChange={() =>
                              handleTravelTypeChange("bus")
                            }
                          />
                          <Label htmlFor="bus" className="flex items-center">
                            <Bus className="h-4 w-4 mr-2" />
                            Bus
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="car"
                            checked={filters.travelType.includes("car")}
                            onCheckedChange={() =>
                              handleTravelTypeChange("car")
                            }
                          />
                          <Label htmlFor="car" className="flex items-center">
                            <Car className="h-4 w-4 mr-2" />
                            Car
                          </Label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="rating">
                    <AccordionTrigger>Star Rating</AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup
                        value={filters.rating.toString()}
                        onValueChange={(value) =>
                          handleRatingChange(Number(value))
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="r-any" />
                          <Label htmlFor="r-any">Any Rating</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3" id="r-3" />
                          <Label htmlFor="r-3" className="flex">
                            {[...Array(3)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-[#FFC107] text-[#FFC107]"
                              />
                            ))}
                            <span className="ml-1">& above</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4" id="r-4" />
                          <Label htmlFor="r-4" className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-[#FFC107] text-[#FFC107]"
                              />
                            ))}
                            <span className="ml-1">& above</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5" id="r-5" />
                          <Label htmlFor="r-5" className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-[#FFC107] text-[#FFC107]"
                              />
                            ))}
                            <span className="ml-1">only</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="duration">
                    <AccordionTrigger>Travel Duration</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="3days"
                            checked={filters.duration.includes("3 Days")}
                            onCheckedChange={() =>
                              handleDurationChange("3 Days")
                            }
                          />
                          <Label htmlFor="3days">3 Days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="4days"
                            checked={filters.duration.includes("4 Days")}
                            onCheckedChange={() =>
                              handleDurationChange("4 Days")
                            }
                          />
                          <Label htmlFor="4days">4 Days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="5days"
                            checked={filters.duration.includes("5 Days")}
                            onCheckedChange={() =>
                              handleDurationChange("5 Days")
                            }
                          />
                          <Label htmlFor="5days">5 Days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="6days"
                            checked={filters.duration.includes("6 Days")}
                            onCheckedChange={() =>
                              handleDurationChange("6 Days")
                            }
                          />
                          <Label htmlFor="6days">6 Days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="7days"
                            checked={filters.duration.includes("7 Days")}
                            onCheckedChange={() =>
                              handleDurationChange("7 Days")
                            }
                          />
                          <Label htmlFor="7days">7 Days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="10days"
                            checked={filters.duration.includes("10 Days")}
                            onCheckedChange={() =>
                              handleDurationChange("10 Days")
                            }
                          />
                          <Label htmlFor="10days">10 Days</Label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="discount">
                    <AccordionTrigger>Discounts</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="discount"
                          checked={filters.discountAvailable}
                          onCheckedChange={handleDiscountChange}
                        />
                        <Label htmlFor="discount">discounted packages</Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </aside>

            <div className="md:w-3/4 lg:w-4/5">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    {filteredPackages.length} Packages Available
                  </h2>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort by:{" "}
                      {sortOption === "price-low"
                        ? "Price: Low to High"
                        : sortOption === "price-high"
                        ? "Price: High to Low"
                        : sortOption === "rating"
                        ? "Customer Ratings"
                        : sortOption === "popularity"
                        ? "Popularity"
                        : "Featured"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleSortChange("featured")}
                    >
                      Featured
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSortChange("price-low")}
                    >
                      Price: Low to High
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSortChange("rating")}
                    >
                      Customer Ratings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSortChange("popularity")}
                    >
                      Popularity
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {filteredPackages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPackages.map((pkg) => (
                    <Card
                      key={pkg._id}
                      className="overflow-hidden transition-all duration-300 hover:shadow-lg p-0"
                    >
                      <div className="relative">
                        <img
                          src={
                            pkg.image.replace("./images", "/images") ||
                            "/placeholder.svg"
                          }
                          alt={pkg.name}
                          width={400}
                          height={225}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            console.error("Image failed to load:", pkg.image);
                            e.currentTarget.src = "/placeholder.svg"; // Fallback
                          }}
                        />
                        {pkg.discount > 0 && (
                          <Badge className="absolute top-4 right-3 bg-[#FFC107] text-black">
                            {pkg.discount}% OFF
                          </Badge>
                        )}
                        {pkg.category === "luxury" && (
                          <Badge className="absolute top-4 left-3 bg-black text-white">
                            Luxury
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4 pt-0">
                        <div className="mb-2">
                          <h3 className="font-bold text-lg">{pkg.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {pkg.destination}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          {renderStars(pkg.rating)}
                          <span className="text-sm text-muted-foreground">
                            {pkg.reviews} reviews
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">{pkg.duration}</span>
                          {renderTravelOptions(pkg.travelOptions)}
                        </div>
                        <div className="mt-4 flex items-end justify-between">
                          <div>
                            {pkg.discount > 0 && (
                              <p className="text-sm line-through text-muted-foreground">
                                {formatPrice(pkg.originalPrice)}
                              </p>
                            )}
                            <p className="text-xl font-bold">
                              {formatPrice(pkg.price)}
                            </p>
                          </div>
                          <Button
                            className="bg-[#FFC107] text-black hover:bg-[#FFD54F]"
                            onClick={() =>
                              goToPageWithId(stateId ?? "", pkg._id)
                            }
                          >
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    No packages found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters to find more travel options
                  </p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
        <ChatSupport />
      </div>
    </>
  );
}
