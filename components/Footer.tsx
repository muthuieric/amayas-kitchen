import Link from "next/link";
import { Clock, MapPin, Phone, ShoppingBag } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons/social-icons";

export function Footer() {
  return (
    <footer id="contact" className="mt-auto border-t border-gray-200 bg-white">
      {/* UPDATE: Changed lg:grid-cols-3 to lg:grid-cols-4 to fit the new Order Online column */}
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:gap-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:py-12">
        <div>
          <p className="font-display text-lg font-black text-slate-900">
            Amaya's <span className="text-red-700">Swahili Kitchen</span>
          </p>
          <p className="mt-2.5 max-w-xs text-xs sm:text-sm leading-relaxed text-slate-600">
            Authentic coastal cooking from the heart of Kilimani. Karibu chakula!
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <Link
              href="https://www.instagram.com/amayas.swahilikitchen/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 text-slate-600 transition-colors hover:bg-orange-500 hover:text-white active:scale-95"
            >
              <InstagramIcon size={18} />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 text-slate-600 transition-colors hover:bg-orange-500 hover:text-white active:scale-95"
            >
              <FacebookIcon size={18} />
            </Link>
            {/* TIKTOK LINK ADDED HERE */}
            <Link
              href="https://www.tiktok.com/@amayas.swahilikitchen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 text-slate-600 transition-colors hover:bg-orange-500 hover:text-white active:scale-95"
            >
              <TikTokIcon size={18} />
            </Link>
          </div>
        </div>

        {/* UBER EATS, BOLT, AND GLOVO ADDED HERE */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Order Online</h3>
          <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-slate-600">
            <li>
              <Link
                href="https://www.ubereats.com/ke/store/amayas-swahili-kitchen-kilimani/LrDdv1L2VEWm1mp3YvRDZA?srsltid=AU7gw4VhbRADd4aMudlizdbqU-lBFaXgxzpEFJpDgauVXm0BPkH7l72e"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-orange-600 transition-colors"
              >
                <ShoppingBag size={16} className="shrink-0 text-orange-500" />
                <span>Uber Eats</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://food.bolt.eu/en/320-nairobi/p/91916-amayas-swahili-kitchen/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-orange-600 transition-colors"
              >
                <ShoppingBag size={16} className="shrink-0 text-orange-500" />
                <span>Bolt Food</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://glovoapp.com/en/ke/nairobi/stores/amayas-swahili-kitchen-nbo?utm_medium=organic&utm_campaign=google_reserve_place_order_action&utm_source=google"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-orange-600 transition-colors"
              >
                <ShoppingBag size={16} className="shrink-0 text-orange-500" />
                <span>Glovo</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Find Us</h3>
          <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-slate-600">
            <li>
              <Link
                href="https://www.google.com/maps/dir/?api=1&destination=Titan+Complex%2C+Chaka+Road%2C+Kilimani%2C+Nairobi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-orange-600 transition-colors"
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-orange-500" />
                <span>Titan Complex, Chaka Road, Kilimani, Nairobi</span>
              </Link>
            </li>
            <li>
              <Link
                href="tel:+254718414667"
                className="flex items-center gap-2.5 hover:text-orange-600 transition-colors"
              >
                <Phone size={16} className="shrink-0 text-orange-500" />
                <span>+254 718 414667</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Hours</h3>
          <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-orange-500" />
              <span>
                Mon – Sat: 9:00am – 9:00pm
                <br />
                Sunday: 9:00am – 9:00pm
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 py-4 px-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Amaya's Swahili Kitchen. All rights reserved.
      </div>
    </footer>
  );
}