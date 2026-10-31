import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Soup, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLdString } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Our Story - Amayas Swahili Kitchen",
  description:
    "Amayas Swahili Kitchen brings authentic Swahili cuisine to Kilimani, Nairobi - traditional recipes, fresh local ingredients and warm Swahili hospitality.",
  path: "/about",
});

const VALUES = [
  {
    icon: Leaf,
    title: "Fresh, Local Ingredients",
    body: "We source from Nairobi's markets daily - coconuts, tamarind, dhania, spices - no shortcuts, no compromises.",
  },
  {
    icon: Soup,
    title: "Traditional Recipes",
    body: "Every dish follows recipes passed down through generations.",
  },
  {
    icon: Heart,
    title: "Authentic Hospitality",
    body: "Karibu chakula - you're family here. Warm service, honest prices, and food that tastes like home.",
  },
];

export default function AboutPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(graph) }}
      />
      <section className="relative overflow-hidden border-b">
        <Image
          src="/amaya-10.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 md:py-28">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            Our Story
          </span>
          <h1 className="mt-4 font-display text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
            A little taste of East Africa, right in
            Kilimani.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Discover the rich and vibrant flavors of East Africa at Amayas Swahili Kitchen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 md:py-20">
        <article className="space-y-5 font-sans text-sm leading-relaxed text-foreground/90 sm:text-base md:text-lg">
          <p>
            We specialize in authentic Swahili cuisine, bringing you a delightful fusion of spices,
            fresh ingredients, and traditional recipes passed down through generations.
          </p>
          <p>
            Whether you're craving the savory taste of biryani, the aromatic allure of pilau, or
            the sweet indulgence of mahamri, our dishes are crafted with love and care.
          </p>
          <p className="border-l-4 border-primary pl-4 py-1 font-display text-lg sm:text-xl font-bold italic text-foreground">
            "Chakula ni upendo." Food is love. And we cook every plate like we're feeding our own
            family.
          </p>
          <p>
            Today, Amayas serves Kilimani and the surrounding neighborhoods with fresh, traditional
            Swahili cooking - a variety of dishes made from scratch every morning. Dine in with us,
            or order delivery via Uber Eats, Bolt Food and Glovo. Karibu sana.
          </p>
        </article>
      </section>

      <section className="border-t bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              What we stand for
            </span>
            <h2 className="mt-1 font-display text-2xl font-black sm:text-3xl md:text-4xl">Our Values</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl bg-card p-5 sm:p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lifted"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-display text-base sm:text-lg font-black">{title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  <section className="mx-auto max-w-4xl px-4 py-12 sm:py-16 text-center sm:px-6">
  <MapPin size={28} className="mx-auto text-primary" />
  <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl md:text-4xl">
    Come visit us in Kilimani
  </h2>
  <p className="mx-auto mt-2.5 max-w-lg text-sm sm:text-base text-muted-foreground">
    Join us at Titan Complex, Chaka Road for authentic Swahili cooking, warm hospitality, and the best vibes in Nairobi.
  </p>
  <Link
    href="/contact"
    className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-card transition-all hover:bg-primary-hover hover:shadow-lifted active:scale-95"
  >
    Get Directions
  </Link>
</section>
    </>
  );
}
