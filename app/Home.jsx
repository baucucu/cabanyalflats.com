"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PropertyCard from "@/components/PropertyCard";
import ContactForm from "@/components/ContactForm";

export default function Home({ global, properties, totalUnits }) {
  const contactFormRef = useRef(null);
  const [selectedProperty, setSelectedProperty] = useState("");

  const handleRequestInfo = (propertyName) => {
    setSelectedProperty(propertyName);

    // Scroll to contact form
    contactFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (selectedProperty) {
      console.log({ selectedProperty });
      contactFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedProperty]);

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link className="flex items-center justify-center" href="#top">
          <Image
            src={`https://cabanyalflats.appy.agency/assets/${global.website_logo}?width=40`}
            alt="Cabanyal Flats Logo"
            width={140}
            height={40}
            // className="rounded-lg shadow-lg"
          />
          {/* <span className="ml-2 text-lg font-bold">{global.website_title}</span> */}
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#properties"
          >
            Properties
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#about"
          >
            Landlords
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section
          className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url("https://cabanyalflats.appy.agency/assets/${global.hero_image}")`,
          }}
        >
          {/* Overlay directly applied to the background */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md">
                {global.hero_title_1}
              </h1>
              <p className="mx-auto max-w-[700px] text-white text-xl md:text-2xl drop-shadow-md">
                {global.hero_title_2}
              </p>
              <Button
                asChild
                className="bg-white text-black hover:bg-gray-100"
                size="lg"
              >
                <Link href="#properties">
                  {global.hero_call_to_action_button}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {global.features_enabled && (
          <section
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center"
            id="features"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                {global.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {global.features.map((feature, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center" id="properties">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              {global.properties_title}
            </h2>
            {/* <p className="text-xl text-center mb-10">
              {properties.length} properties with {totalUnits} rental units in
              the heart of Cabanyal
            </p> */}
            <p className="text-xl text-center mb-10">
              {global.properties_description}
            </p>
            <div className="grid justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onRequestInfo={handleRequestInfo}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center"
          id="about"
        >
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                  {global.about_title}
                </h2>
                <p className="text-xl mb-4">{global.about_description}</p>
                {/* <Button>Discover Cabanyal</Button> */}
              </div>
              <Image
                src={`https://cabanyalflats.appy.agency/assets/${global.about_image}?width=600`}
                alt="Cabanyal neighborhood"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 flex justify-center"
          id="contact"
          ref={contactFormRef}
        >
          <ContactForm initialProperty={selectedProperty} />
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Cabanyal Flats. All rights reserved.
        </p>
        {/* <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav> */}
      </footer>
    </div>
  );
}
