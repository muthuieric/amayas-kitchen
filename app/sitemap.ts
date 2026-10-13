import type { MetadataRoute } from "next";
import { siteConfig, absUrl } from "@/lib/site";

/**
 * sitemap.xml — every public, indexable page. Admin/API routes are excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/menu", priority: 0.9, changeFrequency: "weekly" },
    { path: "/reservations", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  ];

  return pages.map((p) => ({
    url: absUrl(p.path),
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
