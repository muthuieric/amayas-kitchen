/**
 * Amayas Swahili Kitchen — single source of truth for all business facts.
 *
 * Everything here feeds BOTH the human-facing UI and the machine-facing
 * structured data (JSON-LD), metadata, sitemap and robots output. Keep the
 * NAP (Name, Address, Phone) identical everywhere so search engines and
 * AI/answer engines build a consistent entity for the business.
 *
 * NOTE ON ACCURACY
 * - `url` falls back to a placeholder. Set NEXT_PUBLIC_SITE_URL in .env to the
 *   real production domain (used for canonical URLs, the sitemap and JSON-LD).
 * - `geo` and `postalCode` are best-effort for Titan Complex, Chaka Road,
 *   Kilimani. Verify them in Google Business Profile / Google Maps and update.
 */

const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "Amayas Swahili Kitchen",
  shortName: "Amayas",
  legalName: "Amayas Swahili Kitchen",
  tagline: "A taste you'll remember",
  /** Absolute origin with no trailing slash. */
  url: (envUrl && envUrl.replace(/\/$/, "")) || "https://www.amayaskitchen.com",
  locale: "en_KE",
  language: "en-KE",

  description:
    "Authentic Swahili cuisine in Kilimani, Nairobi. Dine in, book a table, or order a variety of Swahili dishes via Uber Eats, Bolt Food and Glovo.",

  keywords: [
    "Swahili restaurant Nairobi",
    "Swahili food Kilimani",
    "Swahili dishes Nairobi",
    "restaurant in Kilimani",
    "Titan Complex Chaka Road food",
    "Amayas Swahili Kitchen",
    "Halal Kenyan restaurant",
    "food delivery Kilimani",
    "Uber Eats Kilimani",
    "Bolt Food Nairobi",
    "Glovo Nairobi",
  ],

  phone: "+254718414667",
  phoneDisplay: "+254 718 414667",
  whatsapp: "254718414667",

  address: {
    streetAddress: "Titan Complex, Chaka Road",
    addressLocality: "Kilimani",
    addressRegion: "Nairobi",
    postalCode: "00100",
    addressCountry: "KE",
    addressCountryName: "Kenya",
  },
  fullAddress: "Titan Complex, Chaka Road, Kilimani, Nairobi, Kenya",

  /** Approximate coordinates for Titan Complex, Chaka Road, Kilimani — verify. */
  geo: {
    latitude: -1.2897,
    longitude: 36.7847,
  },

  openingHours: { opens: "07:00", closes: "21:30" },
  hoursDisplay: "Daily 7:00 AM – 9:30 PM",
  dayOfWeek: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],

  cuisines: ["Swahili", "Kenyan", "African", "Seafood"],
  priceRange: "KSh 100–KSh 1200",
  currenciesAccepted: "KES",
  paymentAccepted: "Cash, M-Pesa, Card",

  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Titan+Complex%2C+Chaka+Road%2C+Kilimani%2C+Nairobi",

  social: {
    instagram: "https://www.instagram.com/amayas.swahilikitchen/",
    facebook: "https://www.facebook.com/p/Amayas-Swahili-Kitchen-61565742148330/",
    tiktok: "https://www.tiktok.com/@amayas.swahilikitchen",
    x: "https://x.com/amayaswahilikitchen",
    linkedin: "https://www.linkedin.com/company/amayas-swahili-kitchen",
    youtube: "https://www.youtube.com/@amayaswahilikitchen",
  },

  /** Delivery partners — used for both UI links and OrderAction structured data. */
  delivery: [
    {
      name: "Uber Eats",
      url: "https://www.ubereats.com/ke/store/amayas-swahili-kitchen-kilimani/LrDdv1L2VEWm1mp3YvRDZA",
      color: "#06C167",
      blurb: "Fast delivery across Nairobi",
    },
    {
      name: "Bolt Food",
      url: "https://food.bolt.eu/en/320-nairobi/p/91916-amayas-swahili-kitchen/",
      color: "#34D186",
      blurb: "Order in-app, track live",
    },
    {
      name: "Glovo",
      url: "https://glovoapp.com/en/ke/nairobi/stores/amayas-swahili-kitchen-nbo",
      color: "#FFC244",
      blurb: "Delivered to your door",
    },
  ],

  // General WhatsApp contact link (used by "WhatsApp Us" buttons). Delivery
  // itself is handled by Uber Eats / Bolt Food / Glovo — see `delivery` above.
  whatsappOrderUrl: `https://wa.me/254718414667?text=${encodeURIComponent(
    "Habari Amayas! I have a question, tafadhali.",
  )}`,
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL for a site path, e.g. absUrl("/menu") -> "https://…/menu". */
export function absUrl(path = "/"): string {
  const base = siteConfig.url;
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
