"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export function ImageModal({
  images,
  initialIndex,
  selectedTag,
  open,
  setOpen,
}) {
  // const [activeIndex, setActiveIndex] = React.useState(initialIndex);
  console.log({ selectedTag });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Open Photo Gallery</Button>
      </DialogTrigger> */}
      <VisuallyHidden.Root>
        <DialogTitle>Photos</DialogTitle>
      </VisuallyHidden.Root>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-[90vw] max-h-[90vh]"
          // setActiveIndex={setActiveIndex}
          index={initialIndex}
        >
          <CarouselContent>
            {images
              .filter((image) => {
                if (!selectedTag) return true;
                return image.tags.includes(selectedTag);
              })
              .map((photo, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-center"
                >
                  <div className="relative aspect-video w-full max-h-[80vh]">
                    <Image
                      src={`https://admin.cabanyalflats.com/assets/${photo.id}?width=400`}
                      alt={photo.id}
                      fill
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <CarouselPrevious
              variant="outline"
              size="icon"
              className="relative left-0 top-auto h-8 w-8 translate-y-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext
              variant="outline"
              size="icon"
              className="relative right-0 top-auto h-8 w-8 translate-y-0"
            >
              <ChevronRight className="h-4 w-4" />
            </CarouselNext>
          </div>
        </Carousel>
        {/* <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-4 rounded-full"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button> */}
      </DialogContent>
      <VisuallyHidden.Root>
        <DialogDescription>Images</DialogDescription>
      </VisuallyHidden.Root>
    </Dialog>
  );
}
