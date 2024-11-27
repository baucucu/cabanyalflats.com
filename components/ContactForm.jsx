"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ContactForm({ initialProperty = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    property: initialProperty,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {}, [formData, initialProperty]);

  useEffect(() => {
    if (initialProperty !== "") {
      setFormData((prev) => ({
        ...prev,
        property: initialProperty,
      }));
    }
  }, [initialProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual N8N webhook URL
      await axios.post(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error", error);
      // Optionally handle error state
    }
  };

  if (isSubmitted) {
    return (
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Thank You!
        </h2>
        <p className="text-xl text-gray-600">
          We've received your message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
        Contact Us
      </h2>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="property"
            placeholder="Property"
            value={formData.property}
            onChange={handleChange}
            // readOnly={!!initialProperty}
          />
          <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
