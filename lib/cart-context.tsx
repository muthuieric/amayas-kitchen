"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { WHATSAPP_NUMBER, type Product } from "./menu-data";
import { formatKes } from "./format";

export interface CartItemOption {
  name: string;
  price: number;
}

export interface CartItem {
  id: string; // unique item id (product.id + options hash)
  product: Product;
  quantity: number;
  options?: CartItemOption[];
  specialInstructions?: string;
}

export type OrderType = "delivery" | "pickup";

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  orderType: OrderType;
  deliveryArea: string;
  customerName: string;
  specialNotes: string;
  setOrderType: (type: OrderType) => void;
  setDeliveryArea: (area: string) => void;
  setCustomerName: (name: string) => void;
  setSpecialNotes: (notes: string) => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    product: Product,
    customization?: {
      options?: CartItemOption[];
      specialInstructions?: string;
      openDrawer?: boolean;
    },
  ) => void;
  increment: (itemId: string) => void;
  decrement: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  whatsappUrl: string;
}

const CartContext = createContext<CartContextValue | null>(null);

export { formatKes };

export const NAIROBI_AREAS = [
  { name: "Kilimani", fee: "Free (within 2km)", estimate: "20-30 min" },
  { name: "Kileleshwa", fee: "KES 150", estimate: "25-35 min" },
  { name: "Lavington", fee: "KES 200", estimate: "30-40 min" },
  { name: "Westlands", fee: "KES 250", estimate: "35-45 min" },
  { name: "Nairobi CBD", fee: "KES 250", estimate: "35-45 min" },
  { name: "Ngong Road / Adams", fee: "KES 150", estimate: "20-30 min" },
  { name: "Other Nairobi Area", fee: "Calculated via courier", estimate: "40-60 min" },
] as const;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("pickup");
  const [deliveryArea, setDeliveryArea] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [specialNotes, setSpecialNotes] = useState<string>("");

  const addItem = useCallback(
    (
      product: Product,
      customization?: {
        options?: CartItemOption[];
        specialInstructions?: string;
        openDrawer?: boolean;
      },
    ) => {
      const opts = customization?.options || [];
      const notes = customization?.specialInstructions || "";
      const optionsKey = opts.map((o) => `${o.name}:${o.price}`).sort().join("|");
      const itemId = `${product.id}__${optionsKey}__${notes}`;

      setItems((prev) => {
        const existing = prev.find((i) => i.id === itemId);
        if (existing) {
          return prev.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i,
          );
        }
        return [
          ...prev,
          {
            id: itemId,
            product,
            quantity: 1,
            options: opts,
            specialInstructions: notes,
          },
        ];
      });

      if (customization?.openDrawer) {
        setIsOpen(true);
      }
    },
    [],
  );

  const increment = useCallback((itemId: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }, []);

  const decrement = useCallback((itemId: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const { itemCount, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, i) => {
        const optionsCost = (i.options || []).reduce((sum, opt) => sum + opt.price, 0);
        const itemPrice = i.product.price + optionsCost;
        return {
          itemCount: acc.itemCount + i.quantity,
          subtotal: acc.subtotal + i.quantity * itemPrice,
        };
      },
      { itemCount: 0, subtotal: 0 },
    );
  }, [items]);

  const whatsappUrl = useMemo(() => {
    const greeting = "Habari Amaya's Kitchen! 🍛\n\nI would like to place an order:";
    const itemLines = items.map((i) => {
      const optionsCost = (i.options || []).reduce((sum, opt) => sum + opt.price, 0);
      const totalItemPrice = (i.product.price + optionsCost) * i.quantity;
      const optionsText =
        i.options && i.options.length > 0
          ? ` (+${i.options.map((o) => o.name).join(", ")})`
          : "";
      const noteText = i.specialInstructions ? ` [Note: ${i.specialInstructions}]` : "";
      return `• ${i.quantity}x ${i.product.name}${optionsText} — KES ${totalItemPrice}${noteText}`;
    });

    const details = [
      "",
      "*Order Details:*",
      `• Type: ${orderType === "pickup" ? "🏃 Pickup (Kilimani)" : "🛵 Delivery"}`,
      customerName ? `• Customer: ${customerName}` : null,
      orderType === "delivery" && deliveryArea ? `• Location: ${deliveryArea}` : null,
      specialNotes ? `• Special Instructions: ${specialNotes}` : null,
      "",
      `*Subtotal:* KES ${subtotal}`,
      "Please confirm availability and when it will be ready. Asante!",
    ]
      .filter((line) => line !== null)
      .join("\n");

    const message = [greeting, ...itemLines, details].join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [items, subtotal, orderType, deliveryArea, customerName, specialNotes]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      orderType,
      deliveryArea,
      customerName,
      specialNotes,
      setOrderType,
      setDeliveryArea,
      setCustomerName,
      setSpecialNotes,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      increment,
      decrement,
      removeItem,
      clearCart,
      whatsappUrl,
    }),
    [
      items,
      itemCount,
      subtotal,
      isOpen,
      orderType,
      deliveryArea,
      customerName,
      specialNotes,
      addItem,
      increment,
      decrement,
      removeItem,
      clearCart,
      whatsappUrl,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
