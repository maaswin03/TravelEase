import Footer from "@/components/Footer/Footer";
import ChatSupport from "@/components/Home/chat-support";
import Navbar from "@/components/Navbar/Navbar";
import {
  Users,
  MapPin,
  Shield,
  Star,
  Clock,
  ChevronRight,
  Linkedin,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AboutPage() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <Navbar />

      <section className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <img
            src="./images/meghalaya/MG1.avif"
            alt="Travel destinations"
            className="w-full h-full object-cover brightness-75"
          />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            About Travelease
          </h1>
          <p className="max-w-2xl text-lg md:text-xl">
            Discover the world with ease, comfort, and unforgettable experiences
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-[#1E3A8A] md:text-4xl">
          Our Mission & Vision
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-white p-8 shadow-lg transition-transform hover:scale-105">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A]">
              <MapPin size={32} />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#1E3A8A]">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To transform travel planning from a stressful task into a seamless
              experience. We strive to connect travelers with authentic
              experiences while providing exceptional service and value.
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-lg transition-transform hover:scale-105">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFC107]/20 text-[#FFC107]">
              <Star size={32} />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#1E3A8A]">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To become the most trusted travel companion for adventurers
              worldwide. We envision a world where everyone can explore the
              planet confidently, responsibly, and with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#1E3A8A] px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Why Choose Us
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <MapPin size={28} />,
                title: "Seamless Booking",
                description:
                  "Book your entire journey in minutes with our intuitive platform",
              },
              {
                icon: <Shield size={28} />,
                title: "Trust & Transparency",
                description:
                  "No hidden fees, clear policies, and secure transactions",
              },
              {
                icon: <Users size={28} />,
                title: "Personalized Experiences",
                description:
                  "Tailored recommendations based on your preferences and travel style",
              },
              {
                icon: <Clock size={28} />,
                title: "24/7 Support",
                description:
                  "Our dedicated team is always available to assist you",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFC107] text-[#1E3A8A]">
                  {value.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
                <p className="text-white/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-[#F4F6F9] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#1E3A8A] md:text-4xl">
            Our Achievements
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                number: "10,000+",
                label: "Happy Travelers",
                icon: <Users size={32} />,
              },
              {
                number: "4.8⭐",
                label: "Average Rating",
                icon: <Star size={32} />,
              },
              {
                number: "100+",
                label: "Travel Partners",
                icon: <Linkedin size={32} />,
              },
            ].map((milestone, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-md"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1E3A8A] text-white">
                  {milestone.icon}
                </div>
                <h3 className="mb-2 text-4xl font-bold text-[#1E3A8A]">
                  {milestone.number}
                </h3>
                <p className="text-lg text-gray-600">{milestone.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#1E3A8A] px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mb-8 text-lg text-white/80">
            Join thousands of happy travelers who have discovered the world with
            Travelease. Your next adventure awaits!
          </p>
          <Link
            to="/destination"
            className="inline-flex items-center rounded-full bg-[#FFC107] px-8 py-3 text-lg font-medium text-[#1E3A8A] transition-all hover:bg-white"
          >
            Explore Packages
            <ChevronRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      <Footer />
      <ChatSupport />
    </div>
  );
}
