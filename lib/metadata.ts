import type { Metadata } from "next";
import { siteConfig, absUrl } from "@/lib/site";

/** Shared Open Graph image descriptor (1200×630) for rich link previews. */
export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Amayas Swahili Kitchen — authentic Swahili cuisine in Kilimani, Nairobi",
};

/**
 * Build per-page metadata that stays consistent with the global defaults:
 * canonical URL, Open Graph, Twitter card and keyword coverage. This keeps
 * SEO, GEO and AEO signals aligned across every route.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: absUrl(path) },
    openGraph: {
      title,
      description,
      url: absUrl(path),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image.png"],
    },
  };
}
