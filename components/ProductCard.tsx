"use client";

import Image from "next/image";
import { Flame, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatKes } from "@/lib/format";
import type { Product } from "@/lib/menu-data";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
<div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md border border-gray-100">
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={600}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.spicy && (
            <span className="flex items-center gap-1 rounded-full bg-red-700 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              <Flame size={11} /> Spicy
            </span>
          )}
          {product.popular && (
            <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              Popular
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold text-slate-900 md:text-lg">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-600">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="min-w-0 text-lg font-black text-red-700">
            {formatKes(product.price)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-orange-600 active:scale-95"
          >
            <Plus size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </article>
    </div>
  );
}
