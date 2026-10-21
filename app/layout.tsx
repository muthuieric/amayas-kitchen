import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileOrderBar } from "@/components/MobileOrderBar";
import { Chatbot } from "@/components/Chatbot";
import { PwaRegister } from "@/components/PwaRegister";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/lib/cart-context";
import { siteConfig } from "@/lib/site";
import { rootGraph, jsonLdString } from "@/lib/structured-data";
import { OG_IMAGE } from "@/lib/metadata";

/** Fully-qualified, SEO/GEO/AEO-complete default metadata (root). */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Authentic Swahili Food in Kilimani, Nairobi`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Restaurant",
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-KE": siteConfig.url,
    },
  },
  /** Google Search Console ownership verification (set GOOGLE_SITE_VERIFICATION in .env). */
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        other: {
          "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} | Authentic Swahili Food in Kilimani, Nairobi`,
    description: siteConfig.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Authentic Swahili Food in Kilimani`,
    description: siteConfig.description,
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.shortName,
  },
  formatDetection: { telephone: true, address: true, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EA580C",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-KE">
      <head />
      <body
        className="font-sans bg-gray-50 text-slate-900 flex flex-col min-h-screen overflow-x-hidden antialiased"
        suppressHydrationWarning
      >
        {/* Google Analytics 4 — pageviews tracked on every client-side navigation. */}
        <GoogleAnalytics />
        {/* Vercel Web Analytics — counts visitors and page views after deployment. */}
        <Analytics />
        {/* Site-wide JSON-LD entity graph: Organization, WebSite, Restaurant
            (with hours, geo, ordering actions), Delivery service, Menu, FAQ.
            This powers classic rich results AND generative/AI answers. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(rootGraph()) }}
        />
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileOrderBar />
          <Chatbot />
          <PwaRegister />
        </CartProvider>
      </body>
    </html>
  );
}

