import Link from "next/link";
import { MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata = buildMetadata({
  title: "Gallery - Real Photos of Our Swahili Dishes",
  description:
    "A look inside Amayas Swahili Kitchen - real photos of our Swahili dishes, grills, sides and the moments we cook for in Kilimani, Nairobi.",
  path: "/gallery",
});

// All real photos served from /public (amaya-01.jpg … amaya-18.jpg).
const PHOTOS = Array.from({ length: 18 }, (_, i) => {
  const n = i + 1;
  return {
    src: `/amaya-${String(n).padStart(2, "0")}.jpg`,
    alt: `Amayas Swahili Kitchen photo ${n}`,
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
          Swahili flavors, in pictures
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Every plate is made fresh in our Kilimani kitchen - pilau, coconut
          curries, charcoal grills and warm moments at the table. Karibu.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {/* Dynamic grid with per-image shimmer placeholders while photos load */}
        <GalleryGrid photos={PHOTOS} />

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