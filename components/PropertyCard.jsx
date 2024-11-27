"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PropertyCard = ({ property, onRequestInfo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Determine images to display (real images or placeholder)
  const images =
    property.images.length > 0
      ? property.images.map(
          (image) =>
            `https://cabanyalflats.appy.agency/assets/${image.directus_files_id}?width=400`
        )
      : [
          `https://placehold.co/400x300?text=${
            property.property_name || "Property"
          }`,
        ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Card className="w-full max-w-sm">
      <div className="relative">
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        <Image
          src={images[currentImageIndex]}
          // src={}
          alt={property.property_name || "Property Image"}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentImageIndex
                    ? "bg-primary"
                    : "bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{property.property_name || "Untitled Property"}</CardTitle>
        <CardDescription>Cabanyal, Valencia</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {property.description ||
            (property.rent_whole
              ? "This property is available for rent as a whole."
              : "Individual rooms available for rent.")}
        </p>
        <Button
          className="mt-4"
          onClick={() => {
            console.log("Request info for", property.property_name);
            onRequestInfo(property.property_name);
          }}
        >
          Request information
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
