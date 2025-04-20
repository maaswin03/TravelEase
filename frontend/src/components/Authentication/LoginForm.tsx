"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Apple, Facebook, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/useAuth";

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    auth: "",
  });
  const [showContactDev, setShowContactDev] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "", auth: "" };

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
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ ...errors, auth: "" });

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store all user data in localStorage as a single object
        const userData = {
          email: formData.email,
          name: data.name,
          location: data.location,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        };

        localStorage.setItem("user", JSON.stringify(userData));

        setIsAuthenticated(true);

        navigate("/");
      } else {
        setErrors({
          ...errors,
          auth: data.message || "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ ...errors, auth: "An error occurred during login" });
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

  const handleContactDevClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContactDev(true);
    setTimeout(() => setShowContactDev(false), 3000);
  };

  // Optional: Pre-fill email if remembered
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, []);

  return (
    <div className="space-y-6 max-w-md mx-auto p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-[#1E3A8A]">
          Welcome Back, Traveler!
        </h1>
        <p className="text-muted-foreground">
          Log in to access your bookings, manage your trips, and explore
          exciting destinations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.auth && (
          <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{errors.auth}</p>
          </div>
        )}

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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="#"
              className="text-xs text-[#1E3A8A] hover:underline"
              onClick={handleContactDevClick}
            >
              Forgot Password?
            </Link>
          </div>
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
          {showContactDev && (
            <div className="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
              <p className="text-sm">
                Please contact the developer for password assistance
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            name="rememberMe"
            checked={formData.rememberMe}
            onCheckedChange={(checked: boolean) =>
              setFormData((prev) => ({ ...prev, rememberMe: checked }))
            }
          />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember Me
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#FFC107] text-black hover:bg-[#FFC107]/80 focus:bg-[#FFC107]/80"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
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