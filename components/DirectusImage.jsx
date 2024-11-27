"use client";
const imgDomain = process.env.NEXT_PUBLIC_IMG_DOMAIN || "";
import Image from "next/image";

function directusImageLoader({ src: imageID, width, quality, fit }) {
  const url = new URL(`https://${imgDomain}/assets/${imageID}`);
  url.searchParams.set("fit", fit || "contain");
  url.searchParams.set("width", width.toString());
  url.searchParams.set("quality", quality ? quality.toString() : "75");
  return url.href;
}

export default function DirectusImage({ imageID, alt, width, height, fit }) {
  return (
    <Image
      loader={(args) => directusImageLoader({ ...args, fit })}
      src={imageID} // Just the Directus asset ID
      alt={alt || "Image"}
      // layout="fill" // Use the fill layout for responsiveness
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      // objectFit={fit || "contain"} // Fit mode (cover, contain, etc.)
      width={width}
      height={height}
    />
  );
}
