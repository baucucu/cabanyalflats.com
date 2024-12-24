import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { ImageModal } from "@/components/ImageModal";

export function ImageCarousel(data, selectedTag) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleModalOpen = (index) => {
    setActiveIndex(index);
    setOpen(true);
  };

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
            <CarouselItem
              key={index}
              onClick={() => {
                handleModalOpen(index);
              }}
            >
              <div className="p-1">
                <Image
                  src={`https://admin.cabanyalflats.com/assets/${_.id}?width=400`}
                  alt={`Image ${index}`}
                  width={400}
                  height={700}
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
      <ImageModal
        images={data.data}
        initialIndex={activeIndex}
        selectedTag={data.selectedTag}
        open={open}
        setOpen={setOpen}
      />
    </Carousel>
  );
}
