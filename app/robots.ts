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
      // Be explicit with the big answer/AI crawlers so our FAQ + menu data
      // is eligible for generative answers (AEO / GEO).
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "GPTBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
