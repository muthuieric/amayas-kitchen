"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bike,
  Clock,
  ExternalLink,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatKes } from "@/lib/format";
import { MENU_ITEMS } from "@/lib/menu-data";
import { siteConfig } from "@/lib/site";

export function CartDrawer() {
  const {
    items,
    subtotal,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
    customerName,
    setCustomerName,
    specialNotes,
    setSpecialNotes,
    addItem,
    whatsappUrl,
  } = useCart();

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

  // Recommended sides to cross-sell if not in cart
  const quickAddRecommendations = MENU_ITEMS.filter(
    (m) =>
      (m.id === "chapati" || m.id === "viazi-karai" || m.id === "mahamri") &&
      !items.some((cartItem) => cartItem.product.id === m.id),
  ).slice(0, 2);

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
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-full sm:max-w-lg flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b px-5 bg-white">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-black tracking-tight text-slate-900">
              Your Order
            </h2>
            {items.length > 0 && (
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">
                {items.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            )}
          </div>
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
            <div className="grid h-16 w-16 place-items-center rounded-full bg-orange-50 text-orange-600">
              <ShoppingBag size={28} />
            </div>
            <p className="font-display text-lg font-black text-slate-900">Your cart is empty</p>
            <p className="max-w-xs text-sm text-slate-600">
              Add some authentic coastal delicacies from our Kilimani kitchen!
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
            {/* Fulfilment: Pickup at our kitchen, or Delivery via our partners */}
            <div className="border-b border-gray-100 bg-gray-50/80 px-5 py-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Store size={14} className="text-orange-600" />
                <span>Pickup from Amaya&apos;s Kilimani Kitchen</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                <Clock size={13} className="text-orange-600" />
                <span>Ready in 15–25 mins • We&apos;ll confirm your time on WhatsApp</span>
              </div>

              {/* Delivery partners — we don't self-deliver; order through these apps */}
              <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50/60 p-2.5">
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-700">
                  <Bike size={13} />
                  Want it delivered? Order via
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {siteConfig.delivery.map((partner) => (
                    <a
                      key={partner.name}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-800 shadow-xs ring-1 ring-gray-200 transition-colors hover:bg-orange-500 hover:text-white hover:ring-orange-500"
                    >
                      <span>{partner.name}</span>
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
                <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-snug text-slate-500">
                  <MapPin size={12} className="mt-0.5 shrink-0 text-orange-500" />
                  <span>
                    Delivery is handled by Uber Eats, Bolt Food &amp; Glovo — pick your app and
                    order from our listing there.
                  </span>
                </p>
              </div>
            </div>

            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 divide-y divide-gray-100">
              <ul className="divide-y divide-gray-100">
                {items.map((item) => {
                  const optionsCost = (item.options || []).reduce((sum, opt) => sum + opt.price, 0);
                  const itemUnitPrice = item.product.price + optionsCost;
                  const itemTotal = itemUnitPrice * item.quantity;

                  return (
                    <li key={item.id} className="flex gap-3 py-4">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        sizes="72px"
                        className="h-16 w-16 sm:h-18 sm:w-18 shrink-0 rounded-xl object-cover bg-gray-100"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate font-display font-black text-slate-900 text-sm sm:text-base">
                            {item.product.name}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            type="button"
                            aria-label={`Remove ${item.product.name}`}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {/* Options / Customizations display */}
                        {item.options && item.options.length > 0 && (
                          <p className="text-[11px] text-orange-700 font-medium">
                            + {item.options.map((o) => o.name).join(", ")}
                          </p>
                        )}
                        {item.specialInstructions && (
                          <p className="text-[11px] text-slate-500 italic">
                            Note: {item.specialInstructions}
                          </p>
                        )}

                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm font-bold text-red-700">
                            {formatKes(itemTotal)}
                          </p>

                          {/* Stepper */}
                          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50/80 p-0.5">
                            <button
                              onClick={() => decrement(item.id)}
                              type="button"
                              aria-label="Decrease quantity"
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-700 shadow-xs hover:bg-gray-100 active:scale-90"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-4 text-center text-xs font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increment(item.id)}
                              type="button"
                              aria-label="Increase quantity"
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-700 shadow-xs hover:bg-gray-100 active:scale-90"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Quick Cross-sell Addons */}
              {quickAddRecommendations.length > 0 && (
                <div className="py-3">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Pair with coastal sides:
                  </p>
                  <div className="flex gap-2">
                    {quickAddRecommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="flex flex-1 items-center justify-between rounded-xl border border-gray-200 bg-gray-50/50 p-2.5"
                      >
                        <div className="min-w-0 pr-1">
                          <p className="text-xs font-bold text-slate-900 truncate">{rec.name}</p>
                          <p className="text-[11px] font-semibold text-red-700">
                            {formatKes(rec.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addItem(rec, { openDrawer: false })}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white shadow-xs hover:bg-orange-600 active:scale-90"
                          aria-label={`Add ${rec.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Diner Details form inputs */}
              <div className="py-3.5 space-y-2.5">
                <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    Your Name (for order confirmation)
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Amani Mwangi"
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="order-instructions"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    Special Delivery Notes / Gate Info
                  </label>
                  <input
                    id="order-instructions"
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Apartment block, ring doorbell, extra lime..."
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Footer with Subtotal & WhatsApp Checkout */}
            <div className="border-t border-gray-100 bg-gray-50 px-5 pt-3.5 pb-8 sm:pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl font-black text-red-700">
                    {formatKes(subtotal)}
                  </span>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  Delivery fees are set by the delivery apps
                </div>
              </div>

              {/* Order via WhatsApp */}
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-md transition-all hover:bg-[#128C7E] active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Send Order via WhatsApp</span>
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
