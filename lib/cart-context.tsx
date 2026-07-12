"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { WHATSAPP_NUMBER, type Product } from "./menu-data";
import { formatKes } from "./format";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  removeItem: (productId: string) => void;
  whatsappUrl: string;
}

const CartContext = createContext<CartContextValue | null>(null);

export { formatKes };

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const increment = useCallback((productId: string) => {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }, []);

  const decrement = useCallback((productId: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const { itemCount, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, i) => ({
        itemCount: acc.itemCount + i.quantity,
        subtotal: acc.subtotal + i.quantity * i.product.price,
      }),
      { itemCount: 0, subtotal: 0 },
    );
  }, [items]);

  const whatsappUrl = useMemo(() => {
    const lines = items
      .map((i) => `${i.quantity}x ${i.product.name} (KES ${i.quantity * i.product.price})`)
      .join(", ");
    const message = `Hello Amaya's! 🍛 I would like to order: ${lines}. Total: KES ${subtotal}. Please let me know the delivery fee to my location!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [items, subtotal]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      increment,
      decrement,
      removeItem,
      whatsappUrl,
    }),
    [items, itemCount, subtotal, isOpen, addItem, increment, decrement, removeItem, whatsappUrl],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
