import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * robots.txt — allow full crawling of public marketing pages while keeping
 * private/admin, API and checkout routes out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = [
    "/admin",
    "/api/",
    "/checkout",
    "/cart",
    "/_next/",
    "/*?q=",
    "/*?srsltid=",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      // Googlebot-Image needs unrestricted access to brand icons and favicons
      // so Google Search displays the custom brand favicon instead of the generic globe icon.
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/favicon*", "/icon*", "/apple-icon*", "/logo.png"],
        disallow: ["/admin"],
      },
      // Explicit access for AI answer engines and search bots (GEO/AEO).
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "PerplexityBot",
          "Google-Extended",
          "ClaudeBot",
          "Applebot-Extended",
          "bingbot",
        ],
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
