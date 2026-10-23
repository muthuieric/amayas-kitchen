import { siteConfig, absUrl } from "@/lib/site";
import { MENU_ITEMS, CATEGORIES } from "@/lib/menu-data";
import siteContent from "@/data/site-content.json";

/**
 * JSON-LD structured data for Amayas Swahili Kitchen.
 *
 * Three goals, one module:
 *  - SEO:  classic rich results (Restaurant, FAQ, Menu, BreadcrumbList).
 *  - GEO:  a single, consistent `@id`-linked entity graph so generative
 *          engines (Google AI Overviews, Perplexity, ChatGPT) can resolve the
 *          business, its location, hours, menu and ordering channels.
 *  - AEO:  FAQPage + speakable, self-contained factual statements so answer
 *          engines can quote us directly.
 *
 * Compliance note: `aggregateRating` / `review` are only emitted when genuine,
 * on-page testimonials exist (see data/site-content.json). We never invent
 * ratings — Google penalises fabricated review markup.
 */

const ID = {
  org: `${siteConfig.url}/#organization`,
  website: `${siteConfig.url}/#website`,
  restaurant: `${siteConfig.url}/#restaurant`,
  menu: `${siteConfig.url}/menu#menu`,
} as const;

const DAY = siteConfig.dayOfWeek;

/* ------------------------------------------------------------------ */
/* Organization                                                        */
/* ------------------------------------------------------------------ */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ID.org,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}/#logo`,
      url: absUrl("/logo.png"),
      width: 207,
      height: 194,
      caption: siteConfig.name,
    },
    image: absUrl("/logo.png"),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
      siteConfig.social.x,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
      ...siteConfig.delivery.map((d) => d.url),
    ].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "reservations",
        areaServed: "KE",
        availableLanguage: ["en", "sw"],
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: "KE",
        availableLanguage: ["en", "sw"],
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* WebSite + SearchAction                                              */
/* ------------------------------------------------------------------ */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": ID.org },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/menu?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ------------------------------------------------------------------ */
/* Restaurant (FoodEstablishment) — the central entity                 */
/* ------------------------------------------------------------------ */
export function restaurantSchema() {
  const a = siteConfig.address;

  const openingHoursSpecification = DAY.map((day) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${day}`,
    opens: siteConfig.openingHours.opens,
    closes: siteConfig.openingHours.closes,
  }));

  const geo = {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  };

  const menu = { "@id": ID.menu };
  const acceptsReservations = absUrl("/reservations");

  // Ordering actions: delivery is handled by the three partners (Uber Eats,
  // Bolt Food, Glovo) — we deliberately do NOT advertise our own delivery.
  // Direct WhatsApp is a contact channel, not a delivery-order action.
  const orderActions = siteConfig.delivery.map((p) => ({
    "@type": "OrderAction",
    name: `Order delivery via ${p.name}`,
    target: {
      "@type": "EntryPoint",
      urlTemplate: p.url,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
  }));

  const potentialAction = [
    ...orderActions,
    {
      "@type": "ReserveAction",
      name: "Book a table",
      target: {
        "@type": "EntryPoint",
        urlTemplate: acceptsReservations,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Table reservation" },
    },
  ];

  // NOTE (senior-SEO compliance): we deliberately DO NOT emit `review` /
  // `aggregateRating` markup. Google's review-snippet guidelines forbid
  // "self-serving reviews" for LocalBusiness/Organization (testimonials
  // collected on the business's own site), and violating this risks a manual
  // structured-data penalty that would hurt a business with this much traffic.
  // The visible testimonials still help conversion and answer engines as plain
  // text. If the business later imports verified Google Reviews via API, the
  // AggregateRating markup can be re-enabled here.

  return {
    "@type": ["Restaurant", "FoodEstablishment", "LocalBusiness"],
    "@id": ID.restaurant,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    image: [absUrl("/logo.png"), absUrl("/amaya-01.jpg"), absUrl("/amaya-04.jpg")],
    logo: { "@id": `${siteConfig.url}/#logo` },
    telephone: siteConfig.phone,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: siteConfig.currenciesAccepted,
    paymentAccepted: siteConfig.paymentAccepted,
    servesCuisine: siteConfig.cuisines,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.streetAddress,
      addressLocality: a.addressLocality,
      addressRegion: a.addressRegion,
      postalCode: a.postalCode,
      addressCountry: a.addressCountry,
    },
    geo,
    hasMap: siteConfig.directionsUrl,
    openingHoursSpecification,
    menu,
    acceptsReservations: true,
    hasMenu: menu,
    hasDeliveryMethod: `${siteConfig.url}/#delivery`,
    areaServed: [
      { "@type": "City", name: "Nairobi" },
      { "@type": "Place", name: "Kilimani" },
    ],
    parentOrganization: { "@id": ID.org },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
      siteConfig.social.x,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
      ...siteConfig.delivery.map((d) => d.url),
    ].filter(Boolean),
    potentialAction,
    // AEO: content we explicitly allow answer engines to read aloud.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };
}


/* ------------------------------------------------------------------ */
/* Delivery service node (referenced by hasDeliveryMethod)             */
/* ------------------------------------------------------------------ */
export function deliveryServiceSchema() {
  return {
    "@type": "Service",
    "@id": `${siteConfig.url}/#delivery`,
    name: "Delivery from Amayas Swahili Kitchen",
    serviceType: "Food delivery",
    provider: { "@id": ID.restaurant },
    areaServed: { "@type": "City", name: "Nairobi" },
    availableChannel: siteConfig.delivery.map((p) => ({
      "@type": "ServiceChannel",
      name: p.name,
      serviceUrl: p.url,
      availableLanguage: siteConfig.language,
    })),
    hoursAvailable: DAY.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day}`,
      opens: siteConfig.openingHours.opens,
      closes: siteConfig.openingHours.closes,
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Menu (Menu / MenuSection / MenuItem)                                */
/* ------------------------------------------------------------------ */
export function menuSchema() {
  return {
    "@type": "Menu",
    "@id": ID.menu,
    name: `${siteConfig.name} Menu`,
    inLanguage: siteConfig.language,
    about: { "@id": ID.restaurant },
    hasMenuSection: CATEGORIES.map((category) => ({
      "@type": "MenuSection",
      name: category,
      hasMenuItem: MENU_ITEMS.filter((i) => i.category === category).map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        ...(item.vegetarian ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
        ...(item.spicy ? { keywords: "spicy" } : {}),
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: siteConfig.currenciesAccepted,
          availability: "https://schema.org/InStock",
        },
      })),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* FAQPage (AEO)                                                       */
/* ------------------------------------------------------------------ */
export function faqSchema() {
  const faqs = siteContent.faqs ?? [];
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
        inLanguage: siteConfig.language,
      },
    })),
  };
}

/* ------------------------------------------------------------------ */
/* BreadcrumbList                                                      */
/* ------------------------------------------------------------------ */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absUrl(t.path),
    })),
  };
}

/** Full site graph for the homepage / root layout. */
export function rootGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      restaurantSchema(),
      deliveryServiceSchema(),
      menuSchema(),
      faqSchema(),
    ].filter(Boolean),
  };
}

/** Serialize a schema object to a safe JSON string for a <script> tag. */
export function jsonLdString(schema: unknown): string {
  return JSON.stringify(schema);
}

