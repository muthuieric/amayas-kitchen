"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Flame, Plus } from "lucide-react";
import type { Product } from "@/lib/menu-data";
import { formatKes } from "@/lib/format";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Product Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={600}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          {product.spicy && (
            <span className="flex items-center gap-1 rounded-full bg-red-700/95 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm shadow-sm">
              <Flame size={11} /> Spicy
            </span>
          )}
          {product.popular && (
            <span className="rounded-full bg-orange-500/95 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm shadow-sm">
              Popular
            </span>
          )}
        </div>
      </div>

      {/* Product Info & Action */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex-1">
          <h3 className="font-display text-base font-black text-slate-900 sm:text-lg">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
            {product.description}
          </p>
        </div>

        {/* Footer with Price and Add to Cart */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-3.5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Price
            </span>
            <span className="font-display text-lg font-black text-red-700 sm:text-xl">
              {formatKes(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart for ${formatKes(product.price)}`}
            className={`inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm active:scale-95 ${
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
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
