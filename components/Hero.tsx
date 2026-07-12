import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-swahili.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden group">
      <Image
        src={heroImage}
        alt="A spread of traditional Swahili dishes — pilau, coconut curry, chapati and grilled skewers"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 duration-500"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-500 backdrop-blur-sm">
          Karibu · Est. Kilimani
        </span>
        <h1 className="mt-5 max-w-2xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
          Authentic Coastal Flavors in the Heart of Kilimani
        </h1>
        <p className="mt-4 max-w-lg text-base text-gray-200 sm:text-lg">
          Slow-cooked pilau, smoky mshikaki and coconut-rich curries — made fresh daily, delivered
          hot to your door.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-orange-600 active:scale-95"
        >
          Explore the Menu
          <ArrowRight size={20} />
        </Link>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
          <span className="flex items-center gap-1.5">
            <MapPin size={15} className="shrink-0" /> Titan Complex, Chaka Road
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} className="shrink-0" /> Open daily 10am – 10pm
          </span>
        </div>
      </div>
    </section>
  );
}
