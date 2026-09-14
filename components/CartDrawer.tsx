"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatKes } from "@/lib/format";

export function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, increment, decrement, removeItem, whatsappUrl } =
    useCart();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-full sm:max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b px-5">
          <h2 className="font-display text-xl font-black tracking-tight text-slate-900">
            Your Order
          </h2>
          <button
            onClick={closeCart}
            type="button"
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-gray-100 hover:text-slate-900 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gray-100 text-slate-500">
              <ShoppingBag size={28} />
            </div>
            <p className="font-display text-lg font-black text-slate-900">Your cart is empty</p>
            <p className="max-w-xs text-sm text-slate-600">
              Add some authentic coastal delicacies from our menu!
            </p>
            <Link
              href="/menu"
              onClick={closeCart}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-95"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Items List */}
            <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto px-4 sm:px-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3.5 py-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={800}
                    height={600}
                    sizes="72px"
                    className="h-18 w-18 shrink-0 rounded-xl object-cover bg-gray-100"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate font-display font-black text-slate-900 text-sm sm:text-base">
                        {product.name}
                      </p>
                      <button
                        onClick={() => removeItem(product.id)}
                        type="button"
                        aria-label={`Remove ${product.name}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="mt-0.5 text-sm font-bold text-red-700">
                      {formatKes(product.price * quantity)}
                    </p>

                    {/* Quantity Selector with Touch-Friendly Hit Areas */}
                    <div className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50/80 p-1">
                      <button
                        onClick={() => decrement(product.id)}
                        type="button"
                        aria-label="Decrease quantity"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-700 shadow-xs transition-colors hover:bg-gray-100 active:scale-90"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center text-sm font-bold text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => increment(product.id)}
                        type="button"
                        aria-label="Increase quantity"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-700 shadow-xs transition-colors hover:bg-gray-100 active:scale-90"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer with Safe Area Support */}
            <div className="border-t border-gray-100 bg-gray-50/50 px-5 pt-4 pb-8 sm:pb-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-600">Subtotal</span>
                <span className="font-display text-2xl font-black text-red-700">
                  {formatKes(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Delivery fee calculated on WhatsApp based on your Nairobi location.
              </p>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-bold text-white shadow-sm transition-all hover:bg-[#128C7E] active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Order via WhatsApp</span>
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
