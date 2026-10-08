"use client";

import Link from "next/link";
import { Download, Flame, Search, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, MENU_ITEMS, type Category, type Product } from "@/lib/menu-data";
import { ProductCard } from "./ProductCard";
import { DishDetailModal } from "./DishDetailModal";

type Filter = "All" | Category;

export function MenuSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filtered dishes
  const filtered = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (filter !== "All" && item.category !== filter) return false;

      // Dietary & spice filters
      if (spicyOnly && !(item.spicy || (item.spiceLevel && item.spiceLevel > 1))) return false;
      if (vegOnly && !item.vegetarian) return false;
      if (popularOnly && !item.popular) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesIng = (item.ingredients || []).some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesIng) {
          return false;
        }
      }

      return true;
    });
  }, [filter, searchQuery, spicyOnly, vegOnly, popularOnly]);

  const resetAllFilters = () => {
    setFilter("All");
    setSearchQuery("");
    setSpicyOnly(false);
    setVegOnly(false);
    setPopularOnly(false);
  };

  const hasActiveFilters = filter !== "All" || searchQuery.trim() !== "" || spicyOnly || vegOnly || popularOnly;

  return (
    <section id="menu" className="scroll-mt-16 bg-gray-50 pb-20">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        {/* Header with Download Action */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-700">
              Fresh Daily in Kilimani
            </span>
            <h2 className="mt-1.5 font-display text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Authentic Swahili Dishes
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Tap any dish to inspect ingredients, customize options, or add to cart.
            </p>
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

        {/* Search Bar */}
        <div className="mt-6 relative">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients (e.g. pilau, chapati, samaki, coconut, goat)..."
              className="w-full rounded-2xl border border-gray-200/90 bg-white py-3.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 shadow-xs focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-gray-100 hover:text-slate-700"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Horizontal Filters & Dietary Toggles */}
      <div className="sticky top-16 z-30 mt-4 border-y border-gray-200/80 bg-gray-50/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-2.5 py-3">
            {/* Category Pills */}
            <div className="overflow-x-auto overscroll-x-contain touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex w-max items-center gap-2">
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
                      className={`inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                        isSelected
                          ? "bg-slate-900 font-bold text-white shadow-sm"
                          : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-100 hover:text-slate-900"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                          isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-slate-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Dietary Preference Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
                Preferences:
              </span>

              <button
                type="button"
                onClick={() => setPopularOnly((p) => !p)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold transition-all ${
                  popularOnly
                    ? "bg-amber-500 text-slate-950 font-bold shadow-xs"
                    : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Sparkles size={12} />
                <span>Most Popular</span>
              </button>

              <button
                type="button"
                onClick={() => setSpicyOnly((s) => !s)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold transition-all ${
                  spicyOnly
                    ? "bg-red-700 text-white font-bold shadow-xs"
                    : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Flame size={12} />
                <span>Spicy Only</span>
              </button>

              <button
                type="button"
                onClick={() => setVegOnly((v) => !v)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold transition-all ${
                  vegOnly
                    ? "bg-emerald-700 text-white font-bold shadow-xs"
                    : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>🌱 Vegetarian</span>
              </button>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 hover:underline"
                >
                  <X size={12} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-800">{filtered.length}</strong> {filtered.length === 1 ? "dish" : "dishes"}
          {searchQuery && ` for "${searchQuery}"`}
        </span>
      </div>

      {/* Dishes Grid */}
      {filtered.length > 0 ? (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 sm:gap-6 sm:px-6 sm:py-8 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={setSelectedProduct}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mx-auto max-w-md px-4 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-4">
            <Search size={28} />
          </div>
          <h3 className="font-display text-xl font-black text-slate-900">
            Hakuna Chakula (No dishes found)
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            We couldn&apos;t find any dishes matching your filters. Try clearing your search or explore our popular classics.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <button
              onClick={resetAllFilters}
              type="button"
              className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-orange-600 transition-all active:scale-95"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* Interactive Dish Detail & Customizer Modal */}
      <DishDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
