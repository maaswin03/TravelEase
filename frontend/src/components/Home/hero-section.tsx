"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [peopleCount, setPeopleCount] = useState("");
  const [destination, setdestination] = useState("");
  const [source, setSource] = useState("");
  const navigate = useNavigate();

  const popularDestinations = [
    "Andaman & Nicobar Islands",
    "Arunachal Pradesh",
    "Goa",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Kerala",
    "Meghalaya",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Uttarakhand",
  ];

  const popularSource = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Tiruchirappalli",
    "Tirunelveli",
    "Erode",
    "Thanjavur",
    "Thoothukudi",
    "Dindigul",
  ];

  const stateCollections = {
    stateid_01: "Andaman & Nicobar Islands",
    stateid_02: "Arunachal Pradesh",
    stateid_03: "Goa",
    stateid_04: "Himachal Pradesh",
    stateid_05: "Jammu & Kashmir",
    stateid_06: "Kerala",
    stateid_07: "Meghalaya",
    stateid_08: "Punjab",
    stateid_09: "Rajasthan",
    stateid_10: "Sikkim",
    stateid_11: "Tamil Nadu",
    stateid_12: "Uttarakhand",
  };

  const destinationToStateId = Object.fromEntries(
    Object.entries(stateCollections).map(([id, name]) => [name, id])
  );

  const handleSearch = () => {
    if (!popularSource.includes(source)) {
      alert("Please enter a valid source city from the allowed list.");
      return;
    }

    if (!destination) {
      alert("Please select a destination.");
      return;
    }

    const stateId = destinationToStateId[destination];

    if (!stateId) {
      alert("Invalid destination selected.");
      return;
    }

    // Check if peopleCount is empty or not a valid number
    if (peopleCount === "" || isNaN(Number(peopleCount))) {
      alert("Please enter a valid number of people.");
      return;
    }

    const userData = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : {};

    const updatedData = {
      ...userData,
      source: source,
      destination,
      stateId,
      startDate,
      endDate,
      peopleCount: Number(peopleCount),
    };

    localStorage.setItem("user", JSON.stringify(updatedData));

    navigate(`/packages/${stateId}`);
  };

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
  <div className="absolute inset-0 z-0">
    <img
      src="./images/states/main.jpg"
      alt="Beautiful travel destination"
      className="w-full h-full object-cover brightness-[0.85]"
      loading="eager"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
  </div>

  <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
    <div className="mb-10 text-center max-w-3xl px-4">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
        Find Your Next Adventure!
      </h1>
      <p className="text-lg text-gray-100 md:text-xl">
        Explore destinations tailored to your travel style and budget.
      </p>
    </div>

    <div className="w-full max-w-6xl px-4">
      <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm border border-white/20 shadow-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Source Select */}
          <div className="relative md:col-span-3">
            <label htmlFor="source" className="sr-only">
              Departure
            </label>
            <Select onValueChange={(val) => setSource(val)}>
              <SelectTrigger
                id="source"
                className="bg-white/20 border-white/30 text-white placeholder:text-white focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/50 w-full"
              >
                <SelectValue placeholder="Source" className="placeholder:text-white" />
              </SelectTrigger>
              <SelectContent className="border-gray-200 shadow-lg">
                <SelectGroup>
                  {popularSource.map((source) => (
                    <SelectItem
                      key={source}
                      value={source}
                      className="focus:bg-[#FFC107]/30"
                    >
                      {source}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Destination Select */}
          <div className="md:col-span-3">
            <label htmlFor="destination" className="sr-only">
              Destination
            </label>
            <Select onValueChange={(val) => setdestination(val)}>
              <SelectTrigger
                id="destination"
                className="bg-white/20 border-white/30 text-white placeholder:text-white focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/50 w-full"
              >
                <SelectValue placeholder="Where to?" className="placeholder:text-white" />
              </SelectTrigger>
              <SelectContent className="border-gray-200 shadow-lg bg-white">
                <SelectGroup>
                  {popularDestinations.map((destination) => (
                    <SelectItem
                      key={destination}
                      value={destination}
                      className="focus:bg-[#FFC107]/30 hover:bg-[#FFC107]/20 text-gray-800"
                    >
                      {destination}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Date Pickers */}
          <div className="grid grid-cols-2 gap-3 md:col-span-3">
            <div>
              <label htmlFor="start-date" className="sr-only">
                Start date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="start-date"
                    variant="outline"
                    className="w-full justify-start bg-white/20 border-white/30 text-white hover:bg-white/30 placeholder:text-white"
                  >
                    <Calendar className="mr-2 h-4 w-4 opacity-80" />
                    {startDate ? format(startDate, "MMM dd") : <span className="text-white">Start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-gray-200">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      if (date && endDate && date > endDate) {
                        setEndDate(undefined);
                      }
                    }}
                    initialFocus
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label htmlFor="end-date" className="sr-only">
                End date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="end-date"
                    variant="outline"
                    className="w-full justify-start bg-white/20 border-white/30 text-white hover:bg-white/30 placeholder:text-white"
                    disabled={!startDate}
                  >
                    <Calendar className="mr-2 h-4 w-4 opacity-80" />
                    {endDate ? format(endDate, "MMM dd") : <span className="text-white">End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-gray-200">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={{
                      before: startDate || new Date(),
                    }}
                    fromDate={
                      startDate
                        ? addDays(startDate, 1)
                        : addDays(new Date(), 1)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Travelers and Search */}
          <div className="flex gap-3 md:col-span-3">
            <div className="flex-1">
              <label htmlFor="travelers" className="sr-only">
                Travelers
              </label>
              <Input
                id="travelers"
                type="number"
                min={1}
                max={20}
                value={peopleCount}
                onChange={(e) => setPeopleCount(e.target.value)}
                placeholder="Travelers"
                className="bg-white/20 border-white/30 text-white placeholder:text-white focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/50"
              />
            </div>

            <Button
              className="bg-[#FFC107] hover:bg-[#FFD54F] text-[#1E3A8A] font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
