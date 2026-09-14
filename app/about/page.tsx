import Image from "next/image";
import Link from "next/link";
import { Flame, Heart, Leaf, Soup } from "lucide-react";

import heroImage from "@/assets/hero-swahili.jpg";

export const metadata = {
  title: "Our Story - Amaya's Swahili Kitchen",
  description:
    "Amaya's Swahili Kitchen brings the aromatic, coconut-rich flavors of the Kenyan coast to Kilimani, Nairobi - traditional recipes, fresh ingredients, warm hospitality.",
  openGraph: {
    title: "Our Story - Amaya's Swahili Kitchen",
    description: "Coastal Kenyan cooking, made with tradition and heart, in the middle of Nairobi.",
  },
};

const VALUES = [
  {
    icon: Leaf,
    title: "Fresh, Local Ingredients",
    body: "We source from Nairobi's markets daily - coconuts, tamarind, dhania, coastal spices - no shortcuts, no compromises.",
  },
  {
    icon: Soup,
    title: "Traditional Recipes",
    body: "Every pilau, biryani and coconut curry follows recipes passed down through generations on the Kenyan coast.",
  },
  {
    icon: Heart,
    title: "Authentic Hospitality",
    body: "Karibu chakula - you're family here. Warm service, honest prices, and food that tastes like home.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <Image
          src={heroImage}
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
            A little taste of the <span className="text-accent">Kenyan coast</span>, right in
            Kilimani.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Amaya's Swahili Kitchen was born from a simple wish - to bring the aromatic,
            coconut-rich cooking of Mombasa, Lamu and Malindi to the heart of Nairobi.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 md:py-20">
        <article className="space-y-5 font-sans text-sm leading-relaxed text-foreground/90 sm:text-base md:text-lg">
          <p>
            Along the Kenyan coast, food is never rushed. Rice is layered with saffron and slow-baked
            into biryani. Fish is smothered in creamy coconut and simmered until the sauce sings.
            Cardamom, cloves, cumin and pili pili are toasted whole, then ground fresh - because
            that's how our grandmothers did it.
          </p>
          <p>
            When we moved inland, we missed those flavors more than anything. The warm smell of
            pilau on a Sunday afternoon. Charcoal-grilled <em>mshikaki</em> from a roadside jiko.
            <em> Mahamri</em> and spiced chai for breakfast. So we built a kitchen that could bring
            all of that home.
          </p>
          <p className="border-l-4 border-primary pl-4 py-1 font-display text-lg sm:text-xl font-bold italic text-foreground">
            "Chakula ni upendo." Food is love. And we cook every plate like we're feeding our own
            family.
          </p>
          <p>
            Today, Amaya's serves Kilimani and the surrounding neighborhoods with fresh, traditional
            Swahili cooking - made from scratch every morning, delivered hot to your door via
            WhatsApp. Karibu sana.
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
        <Flame size={28} className="mx-auto text-primary" />
        <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl md:text-4xl">
          Ready to taste the coast?
        </h2>
        <p className="mx-auto mt-2.5 max-w-lg text-sm sm:text-base text-muted-foreground">
          Our full menu is ready - order in a few taps and we'll take care of the rest.
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-card transition-all hover:bg-primary-hover hover:shadow-lifted active:scale-95"
        >
          Explore the Menu
        </Link>
      </section>
    </>
  );
}
