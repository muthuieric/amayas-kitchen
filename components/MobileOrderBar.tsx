"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatKes } from "@/lib/format";

export function MobileOrderBar() {
  const { itemCount, subtotal, openCart, isOpen } = useCart();

  // Hide if cart is empty or if drawer is already open
  if (itemCount === 0 || isOpen) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 z-30 sm:hidden pointer-events-auto animate-in slide-in-from-bottom-5 duration-300">
      <button
        onClick={openCart}
        type="button"
        aria-label={`View order with ${itemCount} items for ${formatKes(subtotal)}`}
        className="flex w-full items-center justify-between rounded-2xl bg-slate-900/95 px-4 py-3.5 text-white shadow-2xl backdrop-blur-md border border-slate-700/80 active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md">
            <ShoppingBag size={20} />
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-black text-white shadow-xs">
              {itemCount}
            </span>
          </div>
          <div className="text-left">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Current Order ({itemCount})
            </p>
            <p className="font-display text-base font-black text-white leading-tight">
              {formatKes(subtotal)}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold text-orange-300">
          <span>Checkout</span>
          <ArrowRight size={14} />
        </div>
      </button>
    </div>
  );
}
