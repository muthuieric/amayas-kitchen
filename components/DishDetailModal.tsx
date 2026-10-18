"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Clock, Flame, Minus, Plus, Utensils, X } from "lucide-react";
import type { Product } from "@/lib/menu-data";
import { formatKes } from "@/lib/format";
import { useCart, type CartItemOption } from "@/lib/cart-context";
import { blurDataUrls } from "@/lib/blur-data";

interface DishDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const AVAILABLE_ADDONS = [
  { id: "kachumbari", name: "Fresh Kachumbari Salad", price: 50 },
  { id: "pilipili", name: "Homemade Coastal Pili Pili", price: 30 },
  { id: "ukwaju", name: "Tangy Tamarind Dip (Ukwaju)", price: 50 },
  { id: "lime", name: "Fresh Lime Wedge", price: 0 },
];

export function DishDetailModal({ product, onClose }: DishDetailModalProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<CartItemOption[]>([]);
  const [instructions, setInstructions] = useState("");
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Reset state when a new product is selected
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedAddons([]);
      setInstructions("");
      setAddedSuccess(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && product) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const toggleAddon = (addon: { name: string; price: number }) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.name === addon.name);
      if (exists) {
        return prev.filter((a) => a.name !== addon.name);
      }
      return [...prev, addon];
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalItemPrice = (product.price + addonsTotal) * quantity;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, {
        options: selectedAddons,
        specialInstructions: instructions.trim() || undefined,
        openDrawer: false,
      });
    }
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  const spiceLabels: Record<number, { text: string; color: string }> = {
    0: { text: "Mild & Gentle", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    1: { text: "Gentle Coastal Warmth", color: "text-amber-700 bg-amber-50 border-amber-200" },
    2: { text: "Medium Coastal Kick", color: "text-orange-700 bg-orange-50 border-orange-200" },
    3: { text: "Pili Pili Fire 🔥", color: "text-red-700 bg-red-50 border-red-200" },
  };

  const spice = product.spiceLevel ?? (product.spicy ? 2 : 1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 500px"
            placeholder="blur"
            blurDataURL={blurDataUrls[product.image] ?? ""}
            loading="lazy"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            aria-label="Close details"
            className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/75 active:scale-90"
          >
            <X size={18} />
          </button>

          {/* Title overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="rounded-full bg-orange-500/95 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                {product.category}
              </span>
              {product.popular && (
                <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-slate-950 shadow-sm">
                  ★ Most Loved
                </span>
              )}
            </div>
            <h2 id="dish-modal-title" className="font-display text-2xl font-black text-white">
              {product.name}
            </h2>
            <p className="font-display text-xl font-black text-orange-300">
              {formatKes(product.price)}
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 divide-y divide-gray-100">
          {/* Description & Sensory Badges */}
          <div>
            <p className="text-sm leading-relaxed text-slate-700">{product.description}</p>

            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
              {/* Spice Meter */}
              <div
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-semibold ${
                  spiceLabels[spice]?.color || "text-slate-700 bg-gray-50 border-gray-200"
                }`}
              >
                <Flame size={13} className="text-red-600" />
                <span>Spice: {spiceLabels[spice]?.text}</span>
              </div>

              {/* Prep time */}
              {product.prepTime && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 font-semibold text-slate-600">
                  <Clock size={13} />
                  <span>{product.prepTime}</span>
                </div>
              )}

              {/* Portion */}
              {product.portion && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 font-semibold text-slate-600">
                  <Utensils size={13} />
                  <span>{product.portion}</span>
                </div>
              )}
            </div>
          </div>

          {/* Authentic Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Coastal Ingredients
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-lg bg-orange-50/70 border border-orange-100 px-2.5 py-1 text-xs font-medium text-orange-950"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Optional Add-ons */}
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Enhance Your Meal (Optional)
              </h3>
              <span className="text-[11px] text-slate-400">Tap to select</span>
            </div>
            <div className="mt-2.5 space-y-2">
              {AVAILABLE_ADDONS.map((addon) => {
                const isChecked = selectedAddons.some((a) => a.name === addon.name);
                return (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                      isChecked
                        ? "border-orange-500 bg-orange-50/50 text-slate-900 font-medium"
                        : "border-gray-200 hover:border-gray-300 text-slate-700 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon)}
                        className="h-4 w-4 rounded text-orange-600 focus:ring-orange-500 border-gray-300"
                      />
                      <span>{addon.name}</span>
                    </div>
                    <span className="font-bold text-xs text-slate-600">
                      {addon.price === 0 ? "Free" : `+ ${formatKes(addon.price)}`}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="pt-4">
            <label
              htmlFor="special-instructions"
              className="text-xs font-bold uppercase tracking-wider text-slate-400 block"
            >
              Special Kitchen Notes
            </label>
            <input
              id="special-instructions"
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Mild chili, sauce separate, extra crispy..."
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 bg-gray-50/60 p-4 sm:p-5 flex items-center gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              type="button"
              aria-label="Decrease quantity"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 hover:bg-gray-100 active:scale-90"
            >
              <Minus size={14} />
            </button>
            <span className="w-5 text-center text-sm font-black text-slate-900">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              type="button"
              aria-label="Increase quantity"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 hover:bg-gray-100 active:scale-90"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Add CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm sm:text-base font-bold text-white shadow-sm transition-all active:scale-98 ${
              addedSuccess ? "bg-emerald-600" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {addedSuccess ? (
              <>
                <Check size={18} />
                <span>Added to Order!</span>
              </>
            ) : (
              <>
                <Plus size={18} />
                <span>Add {quantity} to Order • {formatKes(totalItemPrice)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
