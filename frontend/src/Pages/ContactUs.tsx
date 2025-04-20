"use client";

import type React from "react";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ChatSupport from "@/components/Home/chat-support";

export default function ContactUs() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <Navbar />

      <div
        className="w-full h-[300px] md:h-[400px] bg-cover bg-center relative"
        style={{ backgroundImage: "url('./images/kerala/kerala1.avif')" }}
      >
        <div className="absolute inset-0 bg-[#1E3A8A]/70 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            We'd love to hear from you!
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Reach out for bookings, support, or any travel inquiries.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Two-column layout for form and contact info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
              Send us a message
            </h2>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2" htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-2" htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2" htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "border-red-500" : ""}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-2" htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`h-25 ${errors.message ? "border-red-500" : ""}`}
                  />

                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFC107] hover:bg-[#FFB000] text-[#1E3A8A] font-medium"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-[#FFC107] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Our Address</h3>
                  <p className="text-gray-600">
                    No. 45, Rajaji Main Road,
                    <br />
                    Near New Bus Stand, Salem - 636007
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-[#FFC107] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-[#FFC107] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">info@travelease.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-[#FFC107] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Support Hours</h3>
                  <p className="text-gray-600">
                    Monday - Saturday: 9am - 6pm IST
                  </p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium text-gray-900 mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-[#1E3A8A] text-white p-2 rounded-full hover:bg-[#152a66] transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-[#1E3A8A] text-white p-2 rounded-full hover:bg-[#152a66] transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-[#1E3A8A] text-white p-2 rounded-full hover:bg-[#152a66] transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-[#1E3A8A] text-white p-2 rounded-full hover:bg-[#152a66] transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">Find Us</h2>
          <div className="w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.3837245341033!2d78.1524053!3d11.667194300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf04a46596cbf%3A0xc9b711ecc2db16b1!2s45%2C%20Rajaji%20Rd%2C%20near%20Windsor%20Castle%20Hotel%2C%20Seerangapalayam%2C%20Salem%2C%20Tamil%20Nadu%20636007!5e0!3m2!1sen!2sin!4v1744174455713!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
      <ChatSupport/>
    </div>
  );
}
