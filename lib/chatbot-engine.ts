export interface BotResponse {
  text: string;
  action?: "open_reservations" | "open_whatsapp";
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

// Chatbot never advertises specific dishes — it only says "a variety" and
// points people to WhatsApp. Delivery is handled by Uber Eats / Bolt Food /
// Glovo, so there is no "own delivery" or cart checkout flow here.
const WHATSAPP_CTA = {
  action: "open_whatsapp" as const,
  actionLabel: "WhatsApp Us",
};

const DEFAULT_SUGGESTIONS = [
  "💬 What do you serve?",
  "🕒 Opening hours",
  "📍 Where are you located?",
  "🛵 How does delivery work?",
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
      text: "Habari! Ask me anything about our opening hours, location, delivery, or table reservations.",
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
      text: "Jambo na Karibu! 🌴\n\nWe serve a **variety of Swahili dishes** made fresh daily in Kilimani. Message us on WhatsApp and we'll happily share what's available today.",
      suggestions: [
        "💬 What do you serve?",
        "🛵 How does delivery work?",
        "📍 Restaurant location",
        "📅 Book a table",
      ],
      ...WHATSAPP_CTA,
    };
  }

  // 3. Gratitude & compliments
  if (
    /\b(asante|thank you|thanks|shukran|tamu|delicious|good food|awesome|great|nice|perfect)\b/i.test(
      query
    )
  ) {
    return {
      text: "Karibu sana! 😊 Asante for the kind words. Is there anything else I can help you with — hours, location, or booking a table?",
      suggestions: ["🕒 Opening hours", "📅 Book a table", "💬 WhatsApp Us"],
    };
  }

  // 4. Cart / checkout inquiries → simply point to WhatsApp
  if (
    /\b(cart|my order|checkout|subtotal|how much in my cart|what did i order|total bill)\b/i.test(
      query
    )
  ) {
    const hasItems = !!cartSummary && cartSummary.itemCount > 0;
    return {
      text: hasItems
        ? `You have ${cartSummary!.itemCount} item${
            cartSummary!.itemCount > 1 ? "s" : ""
          } in your cart. To place the order, just tap **WhatsApp Us** and your list comes pre-filled in the message — we'll confirm everything there.`
        : "Your cart is empty right now. When you're ready, tap **WhatsApp Us** and tell us what you'd like — we have a variety of Swahili dishes available daily.",
      ...WHATSAPP_CTA,
      suggestions: ["💬 What do you serve?", "🕒 Opening hours", "📅 Book a table"],
    };
  }

  // 5. Menu / food / dishes questions (menu, popular, spicy, mild, and all
  //    specific dish-name inquiries) → just "a variety" + WhatsApp Us.
  //    We deliberately never advertise specific dishes in the chatbot.
  if (
    /\b(menu|food|dishes|dish|eat|meal|serve|serving|cuisine|swahili|coastal|popular|recommend|recommendation|best seller|bestseller|signature|famous|top dishes|what should i eat|specialty|favorites|spicy|chilli|pili pili|hot|pepper|mild|vegetarian|vegan|pilau|pilao|biryani|biriani|samaki|fish|seafood|mbuzi|goat|nyama|beef|chicken|mshikaki|grill|grills|bbq|chapati|viazi|mahamri|mandazi|chai|dessert|sweet|sweets|breakfast|price|prices|cost|halal)\b/i.test(
      query
    )
  ) {
    return {
      text: "We serve a **variety of Swahili dishes** — coastal classics, grills, and more, all made fresh daily. The selection changes, so message us on WhatsApp and we'll share today's available dishes and prices right away.",
      ...WHATSAPP_CTA,
      suggestions: [
        "🛵 How does delivery work?",
        "📍 Where are you located?",
        "📅 Book a table",
      ],
    };
  }

  // 6. Location & Directions
  if (
    /\b(where|location|located|address|find you|directions|map|kilimani|chaka|titan)\b/i.test(
      query
    )
  ) {
    return {
      text: "📍 **Location & Directions**:\nWe are located at **Titan Complex, Chaka Road, Kilimani, Nairobi**.\n\nYou can visit us for takeaway or dine in — we're open daily.",
      action: "open_whatsapp",
      actionLabel: "WhatsApp Us for Directions",
      suggestions: ["🕒 Opening hours", "🛵 How does delivery work?", "📅 Table Reservation"],
    };
  }

  // 7. Hours & Opening Times
  if (
    /\b(time|hours|open|close|closing|schedule|sunday|timing|operating hours)\b/i.test(
      query
    )
  ) {
    return {
      text: "🕒 **Operating Hours**:\n• **Monday – Saturday**: 9:00 AM – 9:00 PM\n• **Sunday**: 9:00 AM – 9:00 PM\n\n*Note: Kitchen closes 30 minutes before closing time.*",
      suggestions: ["📍 Where are you located?", "🛵 How does delivery work?", "💬 WhatsApp Us"],
    };
  }

  // 8. Delivery & Ordering — we don't deliver ourselves; Uber Eats, Bolt
  //    Food and Glovo handle delivery. Takeaway orders go via WhatsApp.
  if (
    /\b(delivery|deliver|order|how to order|fee|radius|send food|dispatch|uber|bolt|glovo|courier)\b/i.test(
      query
    )
  ) {
    return {
      text: "🛵 **Delivery**:\nWe don't run our own delivery — for delivery to your door, order through our partners:\n• **Uber Eats**\n• **Bolt Food**\n• **Glovo**\n\n(Find their links on our Contact page.)\n\nPrefer takeaway? Tap **WhatsApp Us**, tell us what you'd like, and we'll have it ready for pickup.",
      ...WHATSAPP_CTA,
      suggestions: ["📍 Where are you located?", "🕒 Opening hours", "📅 Book a table"],
    };
  }

  // 9. Reservations / Booking a table
  if (
    /\b(reserve|reservation|book|booking|table|dine in|sit down|seat)\b/i.test(query)
  ) {
    return {
      text: "📅 **Table Reservations**:\nYou can reserve a table online using our reservation page! Choose your date, preferred dining time, and number of guests — your booking details are then sent to us on WhatsApp to confirm. Tables are held for 15 minutes past reservation time.",
      action: "open_reservations",
      actionLabel: "Go to Reservation Page",
      suggestions: ["🕒 Opening hours", "📍 Where are you located?", "💬 WhatsApp Us"],
    };
  }

  // 20. Catering & Events
  if (
    /\b(cater|catering|event|party|corporate|office|wedding|bulk order)\b/i.test(query)
  ) {
    return {
      text: "🎉 **Catering & Events**:\nYes! We cater for office lunches, birthday parties, weddings, and family gatherings — we have a variety of Swahili dishes suitable for any occasion.\n\nPlease contact us on WhatsApp at least 1 week in advance for menu planning and quotes.",
      ...WHATSAPP_CTA,
      suggestions: ["📞 Call +254 718 414667", "🕒 Opening hours", "📅 Book a table"],
    };
  }

  // 21. Phone / Contact
  if (/\b(phone|call|number|contact|reach|telephone)\b/i.test(query)) {
    return {
      text: "📞 **Contact Amaya's Kitchen**:\n• **Phone**: +254 718 414667\n• **WhatsApp**: +254 718 414667\n• **Address**: Titan Complex, Chaka Road, Kilimani, Nairobi\n\nWe are available daily from 9:00 AM!",
      suggestions: ["💬 WhatsApp Us", "📅 Book a Table", "🕒 Hours"],
    };
  }

  // 12. General fallback
  return {
    text: "Samahani! I did not quite catch that. Here are some things you can ask me:\n- What do you serve?\n- Where are you located and what are your hours?\n- How does delivery work?\n- How do I book a table?",
    suggestions: DEFAULT_SUGGESTIONS,
  };
}
