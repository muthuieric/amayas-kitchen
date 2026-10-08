"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Flame, Plus, Sparkles, Utensils } from "lucide-react";
import type { Product } from "@/lib/menu-data";
import { formatKes } from "@/lib/format";
import { useCart } from "@/lib/cart-context";

export function ProductCard({
  product,
  onSelectProduct,
}: {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, { openDrawer: false });
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  const spiceLabels: Record<number, string> = {
    0: "Mild",
    1: "Warm",
    2: "Spicy",
    3: "Fire",
  };
  const spice = product.spiceLevel ?? (product.spicy ? 2 : 0);

  return (
    <article
      onClick={() => onSelectProduct?.(product)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={600}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges Overlay */}
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          {product.popular && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/95 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-slate-950 backdrop-blur-sm shadow-sm">
              <Sparkles size={11} /> Popular
            </span>
          )}
          {spice > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-red-700/90 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm shadow-sm">
              <Flame size={11} /> {spiceLabels[spice]}
            </span>
          )}
          {product.vegetarian && (
            <span className="rounded-full bg-emerald-700/90 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm shadow-sm">
              Veg
            </span>
          )}
        </div>

        {/* Quick View hint on desktop hover */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100 hidden sm:flex justify-center">
          <span className="text-[11px] font-bold text-white bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
            Tap for ingredients & custom options
          </span>
        </div>
      </div>

      {/* Product Info & Action */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-black text-slate-900 sm:text-lg group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>
          </div>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
            {product.description}
          </p>

          {/* Portion indicator if present */}
          {product.portion && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
              <Utensils size={11} />
              <span>{product.portion}</span>
            </div>
          )}
        </div>

        {/* Footer with Price and Quick Add */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-3.5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Price
            </span>
            <span className="font-display text-lg font-black text-red-700 sm:text-xl">
              {formatKes(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to cart for ${formatKes(product.price)}`}
              className={`inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all sm:text-sm active:scale-95 ${
                justAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-orange-500 text-white shadow-sm hover:bg-orange-600"
              }`}
            >
              {justAdded ? (
                <>
                  <Check size={16} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
