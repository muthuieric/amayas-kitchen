"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, MENU_ITEMS, type Category } from "@/lib/menu-data";
import { ProductCard } from "./ProductCard";

type Filter = "All" | Category;

export function MenuSection() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = filter === "All" ? MENU_ITEMS : MENU_ITEMS.filter((p) => p.category === filter);

  return (
    <section id="menu" className="scroll-mt-16 bg-gray-50 pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-700">
              Our Menu
            </span>
            <h2 className="mt-1.5 font-display text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Made Fresh, Every Day
            </h2>
          </div>
          <Link
            href="/menu.pdf"
            target="_blank"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-95 text-sm sm:text-base"
          >
            <Download size={18} />
            <span>Download Menu (PDF)</span>
          </Link>
        </div>
      </div>

      {/* Sticky horizontal category filter */}
      <div className="sticky top-16 z-30 mt-6 border-b border-gray-200/80 bg-gray-50/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6 overscroll-x-contain touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2 py-3">
            {(["All", ...CATEGORIES] as Filter[]).map((cat) => {
              const count =
                cat === "All"
                  ? MENU_ITEMS.length
                  : MENU_ITEMS.filter((i) => i.category === cat).length;
              const isSelected = filter === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  type="button"
                  className={`inline-flex min-h-[42px] items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
                    isSelected
                      ? "bg-slate-900 font-bold text-white shadow-sm"
                      : "bg-white text-slate-600 border border-gray-200/80 hover:bg-gray-100 hover:text-slate-900"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-xs ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-2 sm:gap-6 sm:px-6 sm:py-10 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
