"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/reservations", label: "Reservations" }
] as const;

export function Navbar() {
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
          {NAV_LINKS.map(({ to, label }, index) => {
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
        </nav>
      </div>
    </header>
  );
}
