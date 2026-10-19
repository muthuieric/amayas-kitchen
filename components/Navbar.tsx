"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronRight, Clock, MapPin, Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/reservations", label: "Reservations" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Track mount to avoid hydration mismatch on active-link styling
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/90 bg-white/90 backdrop-blur-md transition-shadow">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          {/* Circular Logo & Brand Name */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 transition-transform active:scale-98"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white shadow-xs">
              <Image
                src="/logo.png"
                alt="Amaya's Swahili Kitchen Logo"
                fill
                priority
                className="object-cover"
              />
            </div>
            <span className="font-display font-black tracking-tight text-slate-900 text-sm sm:text-base leading-tight">
              Amaya's <span className="text-red-700">Swahili Kitchen</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Desktop navigation"
            className="hidden md:flex md:items-center md:gap-1"
          >
            {NAV_LINKS.map(({ to, label }) => {
              const active = mounted && (to === "/" ? pathname === "/" : pathname.startsWith(to));
              return (
                <Link
                  key={to}
                  href={to}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-red-50 font-bold text-red-700"
                      : "text-slate-600 hover:bg-gray-100/80 hover:text-slate-900"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Desktop WhatsApp Button (Orange Styling) */}
            <a
              href="https://wa.me/254718414667"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 rounded-xl bg-orange-500 px-4 h-10 text-sm font-bold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp Us</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100/90 text-slate-700 transition-all hover:bg-gray-200 active:scale-95 md:hidden"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Backdrop */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-xs sm:max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-200 bg-white">
              <Image
                src="/logo.png"
                alt="Amaya's Swahili Kitchen Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-display font-black text-sm text-slate-900">
              Amaya's <span className="text-red-700">Kitchen</span>
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-gray-100 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <p className="px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </p>
          <nav className="mt-2 space-y-1">
            {NAV_LINKS.map(({ to, label }) => {
              const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  href={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-bold transition-colors ${
                    active
                      ? "bg-red-50 text-red-700"
                      : "text-slate-700 hover:bg-gray-100 hover:text-slate-900"
                  }`}
                >
                  <span>{label}</span>
                  <ChevronRight
                    size={16}
                    className={`transition-colors ${active ? "text-red-700" : "text-slate-400"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Actions
            </p>
            <div className="mt-3 space-y-2.5">
              {/* Mobile WhatsApp Button */}
              <Link
                href="https://wa.me/254718414667"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-98"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp Us</span>
              </Link>
              <Link
                href="tel:+254718414667"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-slate-800 transition-all hover:bg-gray-100 active:scale-98"
              >
                <Phone size={16} />
                <span>Call +254 718 414667</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6 text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="shrink-0 text-orange-500" />
              <span>Titan Complex, Chaka Rd, Kilimani</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="shrink-0 text-orange-500" />
              <span>Open Daily: 9:00 AM – 9:00 PM</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}