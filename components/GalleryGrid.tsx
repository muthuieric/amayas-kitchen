"use client";

import Image from "next/image";
import { useState } from "react";

import { blurDataUrls } from "@/lib/blur-data";

type Photo = { src: string; alt: string };

/**
 * Client image tile with a shimmer placeholder shown until the image
 * finishes loading. Keeps the grid from feeling empty while 18 large JPEGs
 * stream in, and avoids layout shift (the skeleton matches the tile's
 * aspect ratio).
 */
function PhotoTile({
  photo,
  index,
}: {
  photo: Photo;
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);

  const isTall = index % 5 === 0;
  const isWide = index % 7 === 0;

  let aspectClass = "aspect-[4/3]";
  if (isTall) aspectClass = "aspect-[3/4]";
  else if (isWide) aspectClass = "aspect-square";

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-gray-100 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${aspectClass}`}
    >
      {/* Shimmer placeholder (visible until the photo decodes) */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        </div>
      )}

      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL={blurDataUrls[photo.src] ?? ""}
        className={`object-cover transition-all duration-700 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        loading={index < 3 ? "eager" : "lazy"}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {photos.map((photo, index) => (
        <PhotoTile key={photo.src} photo={photo} index={index} />
      ))}
    </div>
  );
}
