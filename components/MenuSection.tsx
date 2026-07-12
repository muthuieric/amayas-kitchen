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
    <section id="menu" className="scroll-mt-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-700">
              Our Menu
            </span>
            <h2 className="mt-2 font-black tracking-tight text-slate-900 sm:text-4xl">
              Made Fresh, Every Day
            </h2>
          </div>
          <Link
            href="/menu.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-orange-600 active:scale-95"
          >
            <Download size={18} />
            Download Full Menu (PDF)
          </Link>
        </div>
      </div>

      {/* Sticky horizontal category filter */}
      <div className="sticky top-16 z-30 mt-6 border-b bg-gray-50/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2 py-3">
            {(["All", ...CATEGORIES] as Filter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === cat
                    ? "bg-slate-900 font-bold text-white"
                    : "bg-white text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
