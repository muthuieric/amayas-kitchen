import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Sparkles } from "lucide-react";

import { Hero } from "@/components/Hero";
import { MENU_ITEMS } from "@/lib/menu-data";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { OrderDelivery } from "@/components/OrderDelivery";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Amayas Swahili Kitchen - Authentic Swahili Food, Kilimani",
  description:
    "Dine at our authentic Swahili restaurant in Kilimani, Nairobi — a variety of Swahili dishes made fresh daily. Order delivery via Uber Eats, Bolt Food and Glovo. Book your table today.",
  path: "/",
  keywords: [
    "Swahili restaurant Nairobi",
    "Swahili food Kilimani",
    "restaurant in Kilimani",
    "Swahili dishes Nairobi",
    "food delivery Kilimani",
    "Uber Eats Kilimani",
    "Bolt Food Nairobi",
    "Glovo Nairobi",
  ],
});

export default function HomePage() {
  // Grab a popular image from your existing data to use as the showcase photo
const showcaseImage = "/amaya-07.jpg";
  return (
    <>
      <Hero />

      
      {/* NEW SECTION: The Amaya Experience */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Text Content */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-700">
                The Amayas Experience
              </span>
            </div>
            
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl md:text-5xl leading-tight text-slate-900">
              Authentic Swahili Flavors in the Heart of Kilimani
            </h2>
            
            <p className="mt-5 text-base text-slate-600 leading-relaxed sm:text-lg">
              Escape the city rush and step into a warm, inviting atmosphere inspired by Swahili tradition. 
              At Amayas, we combine generation-old family recipes with fresh, locally sourced ingredients 
              to bring you the true taste of Swahili hospitality.
            </p>
            
          </div>

         {/* Showcase Image Container */}
          <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={showcaseImage}
              alt="Amayas Swahili Kitchen Experience"
              width={800}
              height={1000}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="h-auto w-full object-contain transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <p className="font-display text-xl sm:text-2xl font-bold text-white">
                Karibu Chakula
              </p>
              <p className="mt-1 text-sm text-white/90">
                Where every meal is a celebration.
              </p>
            </div>
          </div>

        </div>
      </section>

{/* Dine In / Get It Delivered — Uber Eats, Bolt Food, Glovo */}
      <OrderDelivery />

      <Reviews />
      <Faq />
    </>
  );
}