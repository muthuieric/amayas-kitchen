import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-swahili.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden group">
      <Image
        src={heroImage}
        alt="A spread of traditional Swahili dishes served at Amaya's Swahili Kitchen"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 duration-500"
      />
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start px-4 py-14 sm:px-6 sm:py-28 lg:py-36">
        <span className="rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-400 backdrop-blur-md">
          Karibu Amaya's
        </span>

        <h1 className="mt-4 max-w-2xl font-display text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
          Authentic Swahili Flavors in the Heart of Kilimani
        </h1>

        <p className="mt-3.5 max-w-lg text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">
          A variety of authentic Swahili dishes, made fresh daily. Dine in with
          us or order via Uber Eats, Bolt Food and Glovo.
        </p>

        <div className="mt-7 flex w-full flex-col sm:w-auto sm:flex-row sm:items-center gap-3">        
                <Link
                href="https://www.google.com/maps/dir/?api=1&destination=Titan+Complex%2C+Chaka+Road%2C+Kilimani%2C+Nairobi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white shadow-lg transition-all hover:bg-orange-600 active:scale-95"
              >
                <MapPin size={18} />
                <span>Get Directions</span>
                <ArrowRight size={20} />

              </Link>
          <Link
            href="/reservations"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 sm:py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
          >
            <span>Book a Table</span>
          </Link>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 text-xs sm:text-sm text-gray-300">
          <span className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0 text-orange-400" />
            <span>Titan Complex, Chaka Road, Kilimani</span>
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="shrink-0 text-orange-400" />
            <span>Open daily 9:00 AM – 9:30 PM</span>
          </span>
        </div>
      </div>
    </section>
  );
}
