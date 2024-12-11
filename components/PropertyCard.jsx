"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "./ImageCarousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PropertyCard = ({ property, onRequestInfo }) => {
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  // const handleNextImage = () => {
  //   setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  // };

  // const handlePrevImage = () => {
  //   setCurrentImageIndex((prevIndex) =>
  //     prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //   );
  // };

  // Determine images to display (real images or placeholder)
  const images =
    data?.length > 0
      ? data.map(
          (image) =>
            `https://cabanyalflats.appy.agency/assets/${image.id}?width=400`
        )
      : [
          `https://placehold.co/400x300?text=${
            property.property_name || "Property"
          }`,
        ];

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        // Reset states
        setIsLoading(true);
        setError(null);

        // Fetch details for each image ID concurrently
        const imagePromises = property.images
          .filter((image) => image.directus_files_id)
          .map(async (image) => {
            const response = await fetch(
              `https://admin.cabanyalflats.com/files/${image.directus_files_id}`
            );

            if (!response.ok) {
              throw new Error(
                `Failed to fetch image ${image.directus_files_id}`
              );
            }

            const data = await response.json();
            return data.data;
          });

        // Wait for all image detail requests to complete
        const resolvedImageDetails = await Promise.all(imagePromises);
        setData(resolvedImageDetails);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setIsLoading(false);
      }
    };

    // Only fetch if there are images
    if (property.images.length > 0) {
      fetchImageDetails();
    } else {
      setIsLoading(false);
    }
  }, [property.images]);

  useEffect(() => {
    if (!data) return;
    const uniqueTags = [...new Set(data.flatMap((item) => item.tags).sort())];
    setTags(uniqueTags);
  }, [data]);

  if (isLoading) return <div>Loading image details...</div>;
  if (error) return <div>Error loading images: {error.message}</div>;

  return (
    <Card className="flex flex-col h-full min-h-[300px]">
      {/* <div className="relative">
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
      </div> */}
      <ImageCarousel data={data} selectedTag={selectedTag} />
      {/* <div className="flex gap-2 m-2">
        {tags && tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
      </div> */}
      {tags && (
        <Select
          defaultValue={tags[0]}
          onValueChange={(tag) => setSelectedTag(tag)}
        >
          <Label className="ml-6 mb-2 mt-2">Filter photos</Label>
          <SelectTrigger className="w-[300px] ml-4">
            <SelectValue placeholder="Filter photos" />
          </SelectTrigger>
          <SelectContent>
            {tags &&
              tags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
      <CardHeader>
        <CardTitle>{property.property_name || "Untitled Property"}</CardTitle>
        <CardDescription>{property?.neighborhood}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div dangerouslySetInnerHTML={{ __html: property.description }} />
      </CardContent>
      <CardFooter>
        <Button
          className="mt-4"
          onClick={() => {
            console.log("Request info for", property.property_name);
            onRequestInfo(property.property_name);
          }}
        >
          Request information
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
