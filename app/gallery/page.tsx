import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Gallery - Real Photos of Our Swahili Dishes",
  description:
    "A look inside Amaya's Swahili Kitchen - real photos of our coastal dishes, grills, sides and the moments we cook for in Kilimani, Nairobi.",
  path: "/gallery",
});

// All real photos served from /public (amaya-01.jpg … amaya-18.jpg).
const PHOTOS = Array.from({ length: 18 }, (_, i) => {
  const n = i + 1;
  return {
    src: `/amaya-${String(n).padStart(2, "0")}.jpg`,
    alt: `Amaya's Swahili Kitchen photo ${n}`,
  };
});

export default function GalleryPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-6 sm:px-6 sm:pt-16 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
          Our Gallery
        </span>
        <h1 className="mt-1 font-display text-3xl font-black sm:text-4xl md:text-5xl text-slate-900">
          A taste of the coast, in pictures
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Every plate is made fresh in our Kilimani kitchen - pilau, coconut
          curries, charcoal grills and warm moments at the table. Karibu.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {/* Modern dynamic grid layout with varying aspect ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PHOTOS.map((photo, index) => {
            const isTall = index % 5 === 0;
            const isWide = index % 7 === 0;
            
            let aspectClass = "aspect-[4/3]";
            if (isTall) aspectClass = "aspect-[3/4]";
            else if (isWide) aspectClass = "aspect-square";

            return (
              <div
                key={photo.src}
                className={`group relative overflow-hidden rounded-3xl bg-gray-100 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${aspectClass}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg active:scale-95"
          >
            <MapPin size={18} />
            <span>Contact & Visit Us in Kilimani</span>
          </Link>
        </div>
      </section>
    </>
  );
}