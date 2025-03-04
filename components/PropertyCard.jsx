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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "./ImageCarousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const PropertyCard = ({ property, onRequestInfo }) => {
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  // Determine images to display (real images or placeholder)
  const images =
    data?.length > 0
      ? data.map(
        (image) =>
          `https://cabanyalflats.appy.agency/assets/${image.id}?width=400`
      )
      : [
        `https://placehold.co/400x300?text=${property.property_name || "Property"
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
    console.log({ data: data.filter((item) => !item?.tags) });
    const uniqueTags = [...new Set(data.flatMap((item) => item.tags).sort())];
    setTags(uniqueTags);
  }, [data]);

  if (isLoading) return <div>Loading image details...</div>;
  if (error) return <div>Error loading images: {error.message}</div>;

  return (
    <Card className="flex flex-col h-full min-h-[300px]">
      <ImageCarousel data={data} selectedTag={selectedTag} />
      {tags && (
        <Select
          defaultValue={tags[0]}
          onValueChange={(tag) => setSelectedTag(tag)}
        >
          <Label className="ml-6 mb-2 mt-2">Filter photos</Label>
          <SelectTrigger className="ml-4 w-[250px]">
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
        {property?.rent_whole && property?.total_price && (
          <CardDescription>
            <Badge className="mr-2" variant="outline">
              {`Rent per apartment: € ${property.total_price}`}
            </Badge>
          </CardDescription>
        )}
        {/* If there are units, get the min and max price per unit and show them.
        If the user selects a unit, show the price for that unit, otherwise show the min and max price.  
        If the user selects the propery name tag show the min and max price per unit*/}
        {!property?.rent_whole && property?.unit && (
          <CardDescription>
            <Badge className="mr-2" variant="outline">
              Rent per unit: €
              {Math.min(...property.unit.map((unit) => unit.unit_price))} - €
              {Math.max(...property.unit.map((unit) => unit.unit_price))}
            </Badge>
          </CardDescription>
        )}
        {selectedTag ? (
          <CardDescription>
            <Badge className="mr-2" variant="outline">
              {
                property.unit.filter(
                  (unit) => unit.unit_name === selectedTag
                )[0]?.unit_price
              }
            </Badge>
          </CardDescription>
        ) : null}
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
