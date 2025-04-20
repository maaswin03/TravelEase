"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Apple, Facebook, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

export function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    location: "", 
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    location: "",
    auth: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsAuthenticated } = useAuth();

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

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      location: "",
      auth: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
      valid = false;
    }

    if (!formData.agreeTerms) {
      newErrors.auth = "You must agree to the terms and conditions";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      fullName: "",
      email: "",
      password: "",
      location: "",
      auth: "",
    });

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          location: formData.location, // Send manual location to backend
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          email: formData.email,
          name: formData.fullName,
          location: formData.location,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        };

        localStorage.setItem("user", JSON.stringify(userData));

        setIsAuthenticated(true);

        navigate("/");
      } else {
        setErrors({
          ...errors,
          auth: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ ...errors, auth: "An error occurred during registration" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "", auth: "" }));
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto p-4">
  <div className="space-y-2 text-center">
    <h1 className="text-3xl font-bold text-[#1E3A8A]">Join Us & Start Your Adventure!</h1>
    <p className="text-muted-foreground">
      Create your account to book amazing trips, unlock exclusive deals, and track your journeys effortlessly.
    </p>
  </div>

  <form onSubmit={handleSubmit} className="space-y-4">
    {errors.auth && (
      <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
        <p>{errors.auth}</p>
      </div>
    )}

    <div className="space-y-2">
      <Label htmlFor="fullName">Full Name</Label>
      <Input
        id="fullName"
        name="fullName"
        type="text"
        placeholder="John Doe"
        value={formData.fullName}
        onChange={handleChange}
        className={`border-[#1E3A8A]/20 focus-visible:ring-[#1E3A8A] ${
          errors.fullName ? "border-red-500" : ""
        }`}
      />
      {errors.fullName && (
        <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="your.email@example.com"
        value={formData.email}
        onChange={handleChange}
        className={`border-[#1E3A8A]/20 focus-visible:ring-[#1E3A8A] ${
          errors.email ? "border-red-500" : ""
        }`}
      />
      {errors.email && (
        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        className={`border-[#1E3A8A]/20 focus-visible:ring-[#1E3A8A] ${
          errors.password ? "border-red-500" : ""
        }`}
      />
      {errors.password && (
        <p className="text-sm text-red-500 mt-1">{errors.password}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="location">Current Location</Label>
      <Select 
        onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
        value={formData.location}
      >
        <SelectTrigger
          id="location"
          className={`w-full border-[#1E3A8A]/20 focus:ring-[#1E3A8A] focus:ring-offset-2 focus:ring-2 ${
            errors.location ? "border-red-500" : ""
          }`}
        >
          <SelectValue placeholder="Select your location" />
        </SelectTrigger>
        <SelectContent className="border-[#1E3A8A]/20 w-[var(--radix-select-trigger-width)]">
          <SelectGroup>
            {popularSource.map((source) => (
              <SelectItem
                key={source}
                value={source}
                className="focus:bg-[#1E3A8A]/10"
              >
                {source}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.location && (
        <p className="text-sm text-red-500 mt-1">{errors.location}</p>
      )}
    </div>

    <div className="flex items-center space-x-2">
      <Checkbox
        id="agreeTerms"
        name="agreeTerms"
        checked={formData.agreeTerms}
        onCheckedChange={(checked: boolean) =>
          setFormData((prev) => ({ ...prev, agreeTerms: checked }))
        }
      />
      <Label htmlFor="agreeTerms" className="text-sm font-normal">
        I agree to the{" "}
        <Link to="/terms" className="text-[#1E3A8A] hover:underline">
          Terms & Conditions
        </Link>
      </Label>
    </div>

    <Button
      type="submit"
      className="w-full bg-[#FFC107] text-black hover:bg-[#FFC107]/80 focus:bg-[#FFC107]/80"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Creating account..." : "Create Account"}
    </Button>
  </form>

  <div className="space-y-2 text-center text-xs text-muted-foreground">
    <p>
      We value your privacy and ensure your data is protected.{" "}
      <Link to="/privacy" className="text-[#1E3A8A] hover:underline">
        View our Privacy Policy
      </Link>
      .
    </p>
  </div>

  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
    </div>
  </div>

  <div className="grid grid-cols-3 gap-3">
    <Button variant="outline" className="border-[#1E3A8A]/20">
      <Globe className="mr-2 h-4 w-4" />
      Google
    </Button>
    <Button variant="outline" className="border-[#1E3A8A]/20">
      <Facebook className="mr-2 h-4 w-4" />
      Facebook
    </Button>
    <Button variant="outline" className="border-[#1E3A8A]/20">
      <Apple className="mr-2 h-4 w-4" />
      Apple
    </Button>
  </div>
</div>
  );
}