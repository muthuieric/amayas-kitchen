import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, UtensilsCrossed } from "lucide-react";

import { Hero } from "@/components/Hero";
import { CATEGORIES, MENU_ITEMS, type Category } from "@/lib/menu-data";
import { formatKes } from "@/lib/format";

export const metadata = {
  title: "Amaya's Swahili Kitchen - Authentic Coastal Food, Kilimani",
  description:
    "Order authentic Swahili food in Kilimani, Nairobi - pilau, biryani, mshikaki, coconut curries and more, delivered hot.",
};

const CATEGORY_TAGLINES: Record<Category, string> = {
  "Swahili Classics": "Pilau, biryani, coconut curries",
  Grills: "Mshikaki, kuku choma & wet fries",
  Sides: "Chapati, viazi karai, kachumbari",
  "Sweets & Chai": "Mahamri, kaimati & spiced chai",
};

export default function HomePage() {
  const featured = MENU_ITEMS.filter((i) => i.popular).slice(0, 3);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Browse the Kitchen
            </span>
            <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl">
              Featured Categories
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden shrink-0 items-center gap-1 text-sm font-bold text-accent hover:underline sm:inline-flex"
          >
            Full menu <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const sample = MENU_ITEMS.find((i) => i.category === cat);
            return (
              <Link
                key={cat}
                href="/menu"
                className="group relative overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-lifted"
              >
                {sample && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={sample.image}
                      alt={cat}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg font-black text-primary-foreground">{cat}</p>
                  <p className="text-xs text-primary-foreground/80">{CATEGORY_TAGLINES[cat]}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex items-center gap-2">
            <Flame size={18} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Signature Dishes
            </span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl">Most-loved this week</h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-black">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-xl font-black text-accent">
                      {formatKes(p.price)}
                    </span>
                    <Link
                      href="/menu"
                      className="inline-flex items-center gap-1 rounded-lg bg-foreground px-3 py-2 text-xs font-bold text-background transition-colors hover:bg-foreground/90"
                    >
                      View in Menu <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-card transition-all hover:bg-primary-hover hover:shadow-lifted active:scale-95"
            >
              <UtensilsCrossed size={18} />
              See the Full Menu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
