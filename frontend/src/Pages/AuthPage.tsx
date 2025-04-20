"use client";

import { useState } from "react";
import { LoginForm } from "@/components/Authentication/LoginForm";
import { SignupForm } from "@/components/Authentication/SignupForm";
import { MapPin, Plane } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="flex w-full flex-col justify-center px-4 py-12 md:w-1/2 md:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {isLogin ? (
            <>
              <LoginForm />
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?
                </p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="mt-2 text-sm font-medium text-[#FFC107] hover:underline"
                >
                  Create an Account
                </button>
              </div>
            </>
          ) : (
            <>
              <SignupForm />
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?
                </p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="mt-2 text-sm font-medium text-[#FFC107] hover:underline"
                >
                  Log In Here
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right side - Background Image */}
      <div className="relative hidden w-1/2 bg-[#1E3A8A] md:block">
        <div className="absolute inset-0 flex items-center justify-center bg-[#1E3A8A] bg-opacity-90 p-8">
          <div className="flex max-w-md flex-col items-center text-center text-white">
            <div className="mb-8 flex items-center space-x-2">
              <Plane className="h-10 w-10 text-[#FFC107]" />
              <h2 className="text-2xl font-bold">TravelEase</h2>
            </div>
            <h1 className="mb-4 text-4xl font-bold">
              {isLogin
                ? "Welcome Back, Traveler!"
                : "Join Us & Start Your Adventure!"}
            </h1>
            <p className="mb-8 text-lg">
              {isLogin
                ? "Log in to access your bookings, manage your trips, and explore exciting destinations."
                : "Create your account to book amazing trips, unlock exclusive deals, and track your journeys effortlessly."}
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-[#FFC107]" />
              <p className="text-sm">Discover new destinations worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
