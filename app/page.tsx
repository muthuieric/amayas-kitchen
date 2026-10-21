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
    "Authentic Swahili restaurant in Kilimani, Nairobi. Fresh Swahili dishes daily. Order delivery via Uber Eats, Bolt Food, Glovo. Book your table.",
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

      {/* SEO Content: Additional keyword-rich content about Amayas Swahili Kitchen */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 bg-white">
        <h2 className="text-3xl font-black font-display text-slate-900 mb-8 text-center">
          About Amayas Swahili Kitchen — Nairobi&rsquo;s Authentic Swahili Restaurant
        </h2>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Authentic Swahili Cuisine in Kilimani</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Welcome to Amayas Swahili Kitchen, Nairobi&rsquo;s premier destination for authentic Swahili food. Located in the heart of Kilimani at Titan Complex, Chaka Road, our restaurant brings you the rich flavors of the Swahili coast — from fragrant pilau and biryani to juicy nyama choma and fresh seafood dishes. Every recipe is passed down through generations and prepared with fresh, locally sourced ingredients.
            </p>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Dine In, Delivery &amp; Catering</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Whether you&rsquo;re looking to dine in at our Kilimani restaurant, order Swahili food delivery via Uber Eats, Bolt Food, or Glovo, or book our catering services for your next event, Amayas Swahili Kitchen has you covered. We are open daily from 7:00 AM to 9:30 PM, serving breakfast, lunch, and dinner with the warm hospitality the Swahili coast is famous for.
            </p>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Why Choose Amayas?</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              From our signature Swahili dishes to our welcoming atmosphere, Amayas Swahili Kitchen is more than just a restaurant — it&rsquo;s a celebration of Kenyan coastal culture. Visit us at Titan Complex, Chaka Road, Kilimani, Nairobi, or order online for delivery across Nairobi. Experience the true taste of Swahili cuisine today.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}