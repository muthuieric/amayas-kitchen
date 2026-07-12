"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="min-w-0 shrink font-black tracking-tight text-slate-900 sm:text-xl"
        >
          Amaya's <span className="text-red-700">Swahili Kitchen</span>
        </Link>

        <nav className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                href={to}
                className={`rounded-lg px-2.5 py-2 text-sm transition-colors sm:px-3 ${
                  active
                    ? "font-bold text-red-700"
                    : "font-semibold text-slate-600 hover:text-slate-900"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <button
            onClick={openCart}
            aria-label={`Open cart, ${itemCount} items`}
            className="relative ml-1 grid h-11 w-11 place-items-center rounded-full bg-orange-500 text-white shadow-sm transition-all hover:bg-orange-600 hover:shadow-md active:scale-95"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-700 px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
