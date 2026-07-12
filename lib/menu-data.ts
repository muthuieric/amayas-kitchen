/**
 * Product data layer for Amaya's Swahili Kitchen.
 *
 * TODO (backend integration):
 * - Replace `getProducts()` with a Supabase (PostgreSQL) query, e.g.
 *   `supabase.from("products").select("*").order("category")`.
 * - `image` fields will become Cloudflare R2 public URLs
 *   (standard https:// links) once the image pipeline is connected.
 */

import dishPilau from "@/assets/dish-pilau.jpg";
import dishBiryani from "@/assets/dish-biryani.jpg";
import dishMbuzi from "@/assets/dish-mbuzi.jpg";
import dishSamaki from "@/assets/dish-samaki.jpg";
import dishMshikaki from "@/assets/dish-mshikaki.jpg";
import dishKuku from "@/assets/dish-kuku.jpg";
import dishChapati from "@/assets/dish-chapati.jpg";
import dishViazi from "@/assets/dish-viazi.jpg";
import dishMahamri from "@/assets/dish-mahamri.jpg";
import type { StaticImageData } from "next/image";

export const CATEGORIES = ["Swahili Classics", "Grills", "Sides", "Sweets & Chai"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // KES
  category: Category;
  image: string | StaticImageData; // Will be a Cloudflare R2 https:// URL after integration
  spicy?: boolean;
  popular?: boolean;
}

export const WHATSAPP_NUMBER = "254712345678"; // TODO: replace with the real number

export const MENU_ITEMS: Product[] = [
  {
    id: "pilau",
    name: "Beef Pilau",
    description: "Fragrant spiced rice slow-cooked with tender beef, cardamom & cloves. Served with kachumbari.",
    price: 800,
    category: "Swahili Classics",
    image: dishPilau,
    popular: true,
  },
  {
    id: "biryani",
    name: "Chicken Biryani",
    description: "Layered saffron rice with succulent chicken, crispy onions & fresh coriander.",
    price: 950,
    category: "Swahili Classics",
    image: dishBiryani,
    popular: true,
  },
  {
    id: "mbuzi-wet-fry",
    name: "Mbuzi Wet Fry",
    description: "Tender goat simmered in a rich tomato-onion gravy, finished with fresh dhania.",
    price: 700,
    category: "Swahili Classics",
    image: dishMbuzi,
    spicy: true,
  },
  {
    id: "samaki-wa-kupaka",
    name: "Samaki wa Kupaka",
    description: "Whole grilled fish smothered in creamy coconut curry — a true coastal treasure.",
    price: 1200,
    category: "Swahili Classics",
    image: dishSamaki,
    spicy: true,
  },
  {
    id: "mshikaki",
    name: "Mshikaki (3 pcs)",
    description: "Char-grilled beef skewers marinated overnight in coastal spices, with lime & onions.",
    price: 450,
    category: "Grills",
    image: dishMshikaki,
    spicy: true,
    popular: true,
  },
  {
    id: "kuku-choma",
    name: "Kuku Choma (Half)",
    description: "Flame-grilled half chicken brushed with our signature pili pili marinade.",
    price: 850,
    category: "Grills",
    image: dishKuku,
  },
  {
    id: "chapati",
    name: "Chapati (2 pcs)",
    description: "Soft, flaky, hand-rolled layers — golden brown and made to order.",
    price: 100,
    category: "Sides",
    image: dishChapati,
  },
  {
    id: "viazi-karai",
    name: "Viazi Karai",
    description: "Golden turmeric-battered potatoes, deep-fried & served with tangy ukwaju sauce.",
    price: 250,
    category: "Sides",
    image: dishViazi,
  },
  {
    id: "mahamri",
    name: "Mahamri & Chai (4 pcs)",
    description: "Pillowy coconut-cardamom doughnuts paired with spiced Swahili chai.",
    price: 300,
    category: "Sweets & Chai",
    image: dishMahamri,
  },
];

/** Mock fetch — swap the body for a Supabase query when the backend is connected. */
export async function getProducts(): Promise<Product[]> {
  return MENU_ITEMS;
}
