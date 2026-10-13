/**
 * Product data layer for Amaya's Swahili Kitchen.
 *
 * TODO (backend integration):
 * - Replace `getProducts()` with a Supabase (PostgreSQL) query, e.g.
 *   `supabase.from("products").select("*").order("category")`.
 * - `image` fields will become Cloudflare R2 public URLs
 *   (standard https:// links) once the image pipeline is connected.
 */

// Dish photos are the restaurant's own images, served from /public as amaya-01.jpg … amaya-09.jpg.
// (Replaces the previous AI-generated @/assets/dish-*.jpg images.)

export const CATEGORIES = ["Swahili Classics", "Grills", "Sides", "Sweets & Chai"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // KES
  category: Category;
  image: string;
  spicy?: boolean;
  popular?: boolean;
  vegetarian?: boolean;
  spiceLevel?: 0 | 1 | 2 | 3; // 0 = Mild/Sweet, 1 = Gentle Warmth, 2 = Medium Coastal Kick, 3 = Pili Pili Fire
  portion?: string;
  ingredients?: string[];
  prepTime?: string;
}

export const WHATSAPP_NUMBER = "254 718 414667"; // TODO: replace with the real number

export const MENU_ITEMS: Product[] = [
  {
    id: "pilau",
    name: "Beef Pilau",
    description: "Fragrant spiced rice slow-cooked with tender beef, cardamom & cloves. Served with kachumbari.",
    price: 800,
    category: "Swahili Classics",
    image: "/amaya-01.jpg",
    popular: true,
    spiceLevel: 1,
    portion: "Serves 1",
    prepTime: "15-20 mins",
    ingredients: ["Aromatic Basmati Rice", "Prime Kenyan Beef", "Cardamom & Cloves", "Cumin & Cinnamon", "Fresh Kachumbari Salad"],
  },
  {
    id: "biryani",
    name: "Chicken Biryani",
    description: "Layered saffron rice with succulent chicken, crispy onions & fresh coriander.",
    price: 950,
    category: "Swahili Classics",
    image: "/amaya-02.jpg",
    popular: true,
    spiceLevel: 2,
    portion: "Serves 1-2",
    prepTime: "20 mins",
    ingredients: ["Long-grain Saffron Rice", "Spiced Chicken Masala", "Caramelized Crispy Onions", "Boiled Egg", "Fresh Coriander"],
  },
  {
    id: "mbuzi-wet-fry",
    name: "Mbuzi Wet Fry",
    description: "Tender goat simmered in a rich tomato-onion gravy, finished with fresh dhania.",
    price: 700,
    category: "Swahili Classics",
    image: "/amaya-03.jpg",
    spicy: true,
    spiceLevel: 2,
    portion: "Serves 1-2",
    prepTime: "20-25 mins",
    ingredients: ["Tender Kenyan Goat", "Red Onions", "Sun-ripened Tomatoes", "Garlic & Ginger", "Fresh Dhania (Coriander)"],
  },
  {
    id: "samaki-wa-kupaka",
    name: "Samaki wa Kupaka",
    description: "Whole grilled fish smothered in creamy coconut curry — a true coastal treasure.",
    price: 1200,
    category: "Swahili Classics",
    image: "/amaya-04.jpg",
    spicy: true,
    spiceLevel: 2,
    portion: "Serves 1-2 (Whole Fish)",
    prepTime: "25-30 mins",
    ingredients: ["Whole Red Snapper", "Fresh Coastal Coconut Cream", "Tamarind (Ukwaju)", "Turmeric", "Crushed Chili"],
  },
  {
    id: "mshikaki",
    name: "Mshikaki (3 pcs)",
    description: "Char-grilled beef skewers marinated overnight in coastal spices, with lime & onions.",
    price: 450,
    category: "Grills",
    image: "/amaya-05.jpg",
    spicy: true,
    popular: true,
    spiceLevel: 2,
    portion: "3 Skewers",
    prepTime: "15 mins",
    ingredients: ["Beef Steak Cubes", "Papaya Tenderizer", "Garlic & Ginger", "Charcoal Smoke", "Fresh Key Lime"],
  },
  {
    id: "kuku-choma",
    name: "Kuku Choma (Half)",
    description: "Flame-grilled half chicken brushed with our signature pili pili marinade.",
    price: 850,
    category: "Grills",
    image: "/amaya-06.jpg",
    spiceLevel: 2,
    portion: "Half Chicken",
    prepTime: "25 mins",
    ingredients: ["Country Chicken", "Coastal Pili Pili Glaze", "Lemon Juice", "Rock Salt & Crushed Pepper"],
  },
  {
    id: "chapati",
    name: "Chapati (2 pcs)",
    description: "Soft, flaky, hand-rolled layers — golden brown and made to order.",
    price: 100,
    category: "Sides",
    image: "/amaya-07.jpg",
    vegetarian: true,
    spiceLevel: 0,
    portion: "2 Large Chapatis",
    prepTime: "10 mins",
    ingredients: ["Wheat Flour", "Pure Ghee Layers", "Warm Water & Pinch of Salt"],
  },
  {
    id: "viazi-karai",
    name: "Viazi Karai",
    description: "Golden turmeric-battered potatoes, deep-fried & served with tangy ukwaju sauce.",
    price: 250,
    category: "Sides",
    image: "/amaya-08.jpg",
    vegetarian: true,
    spiceLevel: 1,
    portion: "1 Bowl",
    prepTime: "12 mins",
    ingredients: ["Boiled Irish Potatoes", "Crisp Turmeric & Gram Batter", "Homemade Tamarind Sauce (Ukwaju)"],
  },
  {
    id: "mahamri",
    name: "Mahamri & Chai (4 pcs)",
    description: "Pillowy coconut-cardamom doughnuts paired with spiced Swahili chai.",
    price: 300,
    category: "Sweets & Chai",
    image: "/amaya-09.jpg",
    vegetarian: true,
    spiceLevel: 0,
    portion: "4 Mahamri + Chai Pot",
    prepTime: "10 mins",
    ingredients: ["Coconut Milk Dough", "Aromatic Green Cardamom", "Yeast & Light Sugar", "Coastal Spiced Tea"],
  },
];

/** Mock fetch — swap the body for a Supabase query when the backend is connected. */
export async function getProducts(): Promise<Product[]> {
  return MENU_ITEMS;
}
