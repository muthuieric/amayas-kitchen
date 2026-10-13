import { MENU_ITEMS, type Product } from "./menu-data";
import { formatKes } from "./format";

export interface BotResponse {
  text: string;
  dishes?: Product[];
  action?: "open_cart" | "open_reservations" | "open_menu" | "open_whatsapp";
  actionLabel?: string;
  suggestions?: string[];
}

export interface CartContextSummary {
  itemCount: number;
  subtotal: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const DEFAULT_SUGGESTIONS = [
  "🔥 Popular dishes",
  "🌶️ Spicy recommendations",
  "🕒 Opening hours",
  "📍 Where are you located?",
  "🛒 What's in my cart?",
  "📅 Book a table",
];

export function getChatbotResponse(
  rawInput: string,
  cartSummary?: CartContextSummary
): BotResponse {
  const query = rawInput.trim().toLowerCase();

  // 1. Empty query
  if (!query) {
    return {
      text: "Habari! Ask me anything about our Swahili dishes, spice levels, opening hours, or delivery!",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  // 2. Greetings (English & Swahili / Sheng)
  if (
    /^(hi|hello|hey|jambo|habari|hujambo|sasa|niaje|mambo|salama|good morning|good afternoon|good evening)\b/i.test(
      query
    )
  ) {
    return {
      text: "Jambo na Karibu Amaya's Swahili Kitchen! 🍛\n\nI am your culinary guide. Whether you're craving slow-cooked beef pilau, smoky mshikaki, or creamy coconut samaki, I'm here to help. What are you in the mood for today?",
      suggestions: [
        "🔥 Best sellers",
        "🥥 Coconut dishes",
        "🛵 How does delivery work?",
        "📍 Restaurant location",
      ],
    };
  }

  // 3. Gratitude & compliments
  if (
    /\b(asante|thank you|thanks|shukran|tamu|delicious|good food|awesome|great|nice|perfect)\b/i.test(
      query
    )
  ) {
    return {
      text: "Karibu sana! Food is love ('Chakula ni upendo') here at Amaya's. Let me know if you'd like to explore more dishes or check your current order!",
      suggestions: ["🍽️ View Full Menu", "🛒 Review My Cart", "🕒 Opening Hours"],
    };
  }

  // 4. Cart Inquiries & Checkout
  if (
    /\b(cart|my order|checkout|subtotal|how much in my cart|what did i order|total bill)\b/i.test(
      query
    )
  ) {
    if (!cartSummary || cartSummary.itemCount === 0) {
      return {
        text: "Your cart is currently empty! Add something mouthwatering like our Beef Pilau or Chicken Biryani to get started.",
        suggestions: ["🍛 Beef Pilau", "🍗 Chicken Biryani", "🔥 Signature Dishes"],
        action: "open_menu",
        actionLabel: "Browse Menu",
      };
    }

    const itemDetails = cartSummary.items
      .map((i) => `• ${i.quantity}x ${i.name} (${formatKes(i.price * i.quantity)})`)
      .join("\n");

    return {
      text: `🛒 **Your Current Order** (${cartSummary.itemCount} items):\n\n${itemDetails}\n\n**Subtotal: ${formatKes(
        cartSummary.subtotal
      )}**\n\nWould you like to open your cart and proceed to WhatsApp checkout?`,
      action: "open_cart",
      actionLabel: "Open Cart & Checkout",
      suggestions: ["Add Mshikaki", "Add Chapati", "🛵 Delivery Info"],
    };
  }

  // 5. Popular / Recommended Dishes / Best Sellers
  if (
    /\b(popular|recommend|recommendation|best seller|bestseller|signature|famous|top dishes|what should i eat|specialty|favorites)\b/i.test(
      query
    )
  ) {
    const popularDishes = MENU_ITEMS.filter((i) => i.popular);
    return {
      text: "Here are our most-loved coastal favorites this week! Our **Beef Pilau** is slow-simmered with aromatic cardamom, and the **Chicken Biryani** is tender and layered to perfection:",
      dishes: popularDishes,
      suggestions: ["🌶️ Show me spicy dishes", "🍢 Grills & BBQ", "🥥 Coconut Curries"],
    };
  }

  // 6. Spicy / Pili Pili options
  if (
    /\b(spicy|chilli|pili pili|hot|pepper|spiced|pilipili)\b/i.test(query)
  ) {
    const spicyDishes = MENU_ITEMS.filter((i) => i.spicy);
    return {
      text: "If you love a vibrant kick of coastal heat, here are our spicy specialties! Our goat **Mbuzi Wet Fry**, **Samaki wa Kupaka** (coconut chili fish), and overnight-marinated **Mshikaki** are flame-grilled with authentic pili pili spices:",
      dishes: spicyDishes,
      suggestions: ["Mild options", "What pairs with Samaki?", "🛵 Delivery details"],
    };
  }

  // 7. Mild / Not spicy / Kids / Sensitive
  if (
    /\b(mild|not spicy|sweet|non-spicy|no pepper|kid friendly|kids|gentle)\b/i.test(query)
  ) {
    const mildDishes = MENU_ITEMS.filter((i) => !i.spicy);
    return {
      text: "For a rich, aromatic flavor without the fiery heat, we recommend our fragrant **Beef Pilau**, soft **Chapati**, and fluffy **Mahamri & Chai**:",
      dishes: mildDishes.slice(0, 3),
      suggestions: ["🍩 Tell me about Mahamri", "🍛 Beef Pilau", "🛒 Check my cart"],
    };
  }

  // 8. Pilau specific inquiry
  if (/\b(pilau|beef pilau|pilao)\b/i.test(query)) {
    const pilau = MENU_ITEMS.find((i) => i.id === "pilau");
    return {
      text: `🍛 **Beef Pilau (${formatKes(800)})**: Slow-cooked aromatic rice infused with toasted cumin, cardamom pods, cinnamon, and succulent beef chuck. It is served with freshly sliced kachumbari (tangy tomato-onion relish). It is our #1 best seller!`,
      dishes: pilau ? [pilau] : undefined,
      suggestions: ["Add Chapati", "Add Kachumbari", "Biryani vs Pilau"],
    };
  }

  // 9. Biryani specific inquiry
  if (/\b(biryani|chicken biryani|biriani)\b/i.test(query)) {
    const biryani = MENU_ITEMS.find((i) => i.id === "biryani");
    return {
      text: `🍗 **Chicken Biryani (${formatKes(950)})**: Royal coastal saffron rice layered with marinated chicken, crispy golden caramelized onions, and fresh dhania. Rich, aromatic, and deeply satisfying.`,
      dishes: biryani ? [biryani] : undefined,
      suggestions: ["Beef Pilau", "Sides to pair", "How to order"],
    };
  }

  // 10. Fish / Seafood / Samaki
  if (/\b(fish|samaki|seafood|kupaka)\b/i.test(query)) {
    const samaki = MENU_ITEMS.find((i) => i.id === "samaki-wa-kupaka");
    return {
      text: `🐟 **Samaki wa Kupaka (${formatKes(1200)})**: A true Swahili jewel from Lamu and Mombasa. Whole fresh fish, char-grilled over embers and smothered in a thick, velvety coconut curry with tamarind, garlic, and turmeric. Pairs exquisitely with soft chapati!`,
      dishes: samaki ? [samaki] : undefined,
      suggestions: ["Add Chapati (KES 100)", "🌶️ Spicy food", "📍 Dine-in / Location"],
    };
  }

  // 11. Meat / Goat / Mbuzi / Beef
  if (/\b(goat|mbuzi|wet fry|meat|nyama)\b/i.test(query)) {
    const mbuzi = MENU_ITEMS.find((i) => i.id === "mbuzi-wet-fry");
    return {
      text: `🐐 **Mbuzi Wet Fry (${formatKes(700)})**: Tender goat cuts pan-fried and braised in rich tomato, garlic, and onion sauce, topped with fresh coriander. A favorite across Nairobi!`,
      dishes: mbuzi ? [mbuzi] : undefined,
      suggestions: ["Add Chapati", "Mshikaki (Skewers)", "🛵 Delivery area"],
    };
  }

  // 12. Grills / BBQ / Skewers / Mshikaki / Kuku
  if (/\b(grill|grills|bbq|mshikaki|kuku|choma|skewer|chicken)\b/i.test(query)) {
    const grills = MENU_ITEMS.filter((i) => i.category === "Grills");
    return {
      text: "🍢 **From the Jiko (Grills)**:\nOur grills are marinated overnight in coastal garlic, ginger, and pili pili, then flame-grilled to smoky perfection:",
      dishes: grills,
      suggestions: ["Beef Pilau", "Viazi Karai", "🛵 Order on WhatsApp"],
    };
  }

  // 13. Sides / Chapati / Viazi Karai
  if (/\b(sides|side|chapati|viazi|viazi karai|potatoes|roti)\b/i.test(query)) {
    const sides = MENU_ITEMS.filter((i) => i.category === "Sides");
    return {
      text: "🥔 **Authentic Coastal Sides**:\n• **Chapati (2 pcs - KES 100)**: Soft, flaky, hand-rolled layers made fresh to order.\n• **Viazi Karai (KES 250)**: Crispy turmeric-battered golden potatoes served with tangy ukwaju (tamarind) dip.",
      dishes: sides,
      suggestions: ["Samaki wa Kupaka", "Mbuzi Wet Fry", "Mahamri & Chai"],
    };
  }

  // 14. Sweets, Chai, Breakfast, Mahamri
  if (/\b(sweet|sweets|dessert|tea|chai|mahamri|mandazi|doughnut|breakfast)\b/i.test(query)) {
    const sweets = MENU_ITEMS.filter((i) => i.category === "Sweets & Chai");
    return {
      text: "☕ **Mahamri & Spiced Swahili Chai (${formatKes(300)})**:\nPillowy, golden triangular coconut-cardamom pastries served with fragrant coastal tea infused with ginger, cardamom, and cinnamon. Traditional Swahili comfort food at its best!",
      dishes: sweets,
      suggestions: ["Beef Pilau", "Full Menu", "Opening Hours"],
    };
  }

  // 15. Vegetarian / Vegan
  if (/\b(veg|vegetarian|vegan|plant|meatless)\b/i.test(query)) {
    const vegDishes = MENU_ITEMS.filter((i) => i.category === "Sides" || i.category === "Sweets & Chai");
    return {
      text: "🌱 **Vegetarian Options**:\nWe offer delicious plant-based coastal favorites like our golden **Viazi Karai** with tangy ukwaju dip, fresh **Chapati**, and spiced **Mahamri**. We also prepare seasonal coconut bean curries for catering orders!",
      dishes: vegDishes,
      suggestions: ["Viazi Karai", "Chapati", "Catering services"],
    };
  }

  // 16. Location & Directions
  if (
    /\b(where|location|located|address|find you|directions|map|kilimani|chaka|titan)\b/i.test(
      query
    )
  ) {
    return {
      text: "📍 **Location & Directions**:\nWe are located at **Titan Complex, Chaka Road, Kilimani, Nairobi**.\n\nYou can visit us for takeaway or order delivery directly to your door anywhere within a 10km radius in Nairobi.",
      action: "open_whatsapp",
      actionLabel: "Chat on WhatsApp for Directions",
      suggestions: ["🕒 Opening hours", "🛵 Delivery fee & areas", "📅 Table Reservation"],
    };
  }

  // 17. Hours & Opening Times
  if (
    /\b(time|hours|open|close|closing|schedule|sunday|timing|operating hours)\b/i.test(
      query
    )
  ) {
    return {
      text: "🕒 **Operating Hours**:\n• **Monday – Saturday**: 9:00 AM – 9:00 PM\n• **Sunday**: 9:00 AM – 9:00 PM\n\n*Note: Kitchen closes 30 minutes before closing time. Last delivery orders accepted 15 minutes before closing.*",
      suggestions: ["📍 Where are you located?", "🛵 How to order delivery", "🔥 Popular dishes"],
    };
  }

  // 18. Delivery & Ordering process
  if (
    /\b(delivery|deliver|order|how to order|whatsapp|fee|radius|send food|dispatch)\b/i.test(
      query
    )
  ) {
    return {
      text: "🛵 **How Ordering & Delivery Works**:\n1. Browse our menu and add your favorite dishes to the cart.\n2. Tap **'Order via WhatsApp'** to send your order directly to our kitchen team.\n3. We confirm your exact Nairobi location and delivery fee, then dispatch your food hot in insulated eco-friendly packaging!\n\nWe deliver daily within 10km across Kilimani, Lavington, Kileleshwa, Westlands, and surrounding areas.",
      action: "open_whatsapp",
      actionLabel: "Order on WhatsApp",
      suggestions: ["🔥 Popular dishes", "🛒 View my cart", "📍 Kilimani Location"],
    };
  }

  // 19. Reservations / Booking a table
  if (
    /\b(reserve|reservation|book|booking|table|dine in|sit down|seat)\b/i.test(query)
  ) {
    return {
      text: "📅 **Table Reservations**:\nYou can reserve a table online using our reservation page! Choose your date, preferred dining time, and number of guests. Tables are held for 15 minutes past reservation time.",
      action: "open_reservations",
      actionLabel: "Go to Reservation Page",
      suggestions: ["🕒 Opening hours", "🔥 View Menu", "Call +254 718 414667"],
    };
  }

  // 20. Catering & Events
  if (
    /\b(cater|catering|event|party|corporate|office|wedding|bulk order)\b/i.test(query)
  ) {
    return {
      text: "🎉 **Catering & Events**:\nYes! We cater for office lunches, birthday parties, weddings, and family gatherings. From live jiko mshikaki stations to huge pots of coastal biryani and pilau.\n\nPlease contact us on WhatsApp at **+254 718 414667** at least 1 week in advance for custom menu planning and quotes.",
      action: "open_whatsapp",
      actionLabel: "Discuss Catering on WhatsApp",
      suggestions: ["📞 Call +254 718 414667", "🍛 Browse Dishes", "🕒 Hours"],
    };
  }

  // 21. Phone / Contact
  if (/\b(phone|call|number|contact|reach|telephone)\b/i.test(query)) {
    return {
      text: "📞 **Contact Amaya's Kitchen**:\n• **Phone**: +254 718 414667\n• **WhatsApp**: +254 718 414667\n• **Address**: Titan Complex, Chaka Road, Kilimani, Nairobi\n\nWe are available daily from 9:00 AM!",
      suggestions: ["🛵 Delivery Info", "📅 Book a Table", "🔥 Popular Dishes"],
    };
  }

  // 22. General fallback with smart search
  const matchedDishes = MENU_ITEMS.filter((item) => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  if (matchedDishes.length > 0) {
    return {
      text: `I found these delicious options matching "${rawInput}":`,
      dishes: matchedDishes,
      suggestions: ["Add to Cart", "Delivery details", "View full menu"],
    };
  }

  return {
    text: `Samahani! I didn't quite catch that. Here are some things you can ask me:\n• "What are your best sellers?"\n• "Which dishes are spicy?"\n• "Tell me about Beef Pilau or Samaki"\n• "Where are you located and what are your hours?"\n• "How do I order delivery?"`,
    suggestions: DEFAULT_SUGGESTIONS,
  };
}
