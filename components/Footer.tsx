import Link from "next/link";
import { Clock, Facebook, Instagram, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="mt-auto border-t border-gray-200 bg-white py-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="text-lg font-black text-slate-900">
            Amaya's <span className="text-red-700">Swahili Kitchen</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
            Authentic coastal cooking from the heart of Kilimani. Karibu chakula!
          </p>
          <div className="mt-4 flex gap-2">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-slate-600 transition-colors hover:bg-orange-500 hover:text-white"
            >
              <Instagram size={18} />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-slate-600 transition-colors hover:bg-orange-500 hover:text-white"
            >
              <Facebook size={18} />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-tight text-slate-900">Find Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-orange-500" />
              Titan Complex, Chaka Road, Kilimani, Nairobi
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-orange-500" />
              +254 712 345 678
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-tight text-slate-900">Hours</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-orange-500" />
              <span>
                Mon – Sat: 10:00am – 10:00pm
                <br />
                Sunday: 11:00am – 9:00pm
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t py-5 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Amaya's Swahili Kitchen. All rights reserved.
      </div>
    </footer>
  );
}
