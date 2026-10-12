import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Gallery - Amaya's Swahili Kitchen",
  description:
    "A look inside Amaya's Swahili Kitchen - real photos of our coastal dishes, grills, sides and the moments we cook for.",
};

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
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-6 sm:px-6 sm:pt-16">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          Our Gallery
        </span>
        <h1 className="mt-1 font-display text-3xl font-black sm:text-4xl md:text-5xl">
          A taste of the coast, in pictures
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Every plate is made fresh in our Kilimani kitchen - pilau, coconut
          curries, charcoal grills and warm moments at the table. Karibu.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-lifted"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-card transition-all hover:bg-primary-hover hover:shadow-lifted active:scale-95"
          >
            Explore the Menu
          </Link>
        </div>
      </section>
    </>
  );
}
