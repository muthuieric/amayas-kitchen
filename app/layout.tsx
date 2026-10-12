import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileOrderBar } from "@/components/MobileOrderBar";
import { Chatbot } from "@/components/Chatbot";
import { PwaRegister } from "@/components/PwaRegister";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "Amaya's Swahili Kitchen",
  description: "Authentic Coastal Flavors in the Heart of Kilimani",
  manifest: "/manifest.webmanifest",
  applicationName: "Amaya's Swahili Kitchen",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Amaya's",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Amaya's Swahili Kitchen",
    description: "Authentic Coastal Flavors in the Heart of Kilimani",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EA580C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="font-sans bg-gray-50 text-slate-900 flex flex-col min-h-screen overflow-x-hidden antialiased"
      >
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

