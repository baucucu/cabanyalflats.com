import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";

export function ImageCarousel(data, selectedTag) {
  if (!data) return null;
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {data.data
          .filter((image) => {
            if (!data.selectedTag) return true;
            return image.tags.includes(data.selectedTag);
          })
          .map((_, index) => (
            <CarouselItem key={index} className="md:basis-1 lg:basis-1/2">
              <div className="p-1">
                <Image
                  src={`https://admin.cabanyalflats.com/assets/${_.id}?width=400`}
                  alt={`Image ${index}`}
                  width={400}
                  height={300}
                  className="w-full object-cover h-48"
                />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <div className="absolute inset-0 z-10 flex items-center justify-between pointer-events-none">
        <CarouselPrevious
          className="absolute left-2 opacity-50 hover:opacity-100 pointer-events-auto"
          //   variant="ghost"
        />
        <CarouselNext
          className="absolute right-2 opacity-50 hover:opacity-100 pointer-events-auto"
          //   variant="ghost"
        />
      </div>
    </Carousel>
  );
}
