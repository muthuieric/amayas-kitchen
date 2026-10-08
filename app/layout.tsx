import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileOrderBar } from "@/components/MobileOrderBar";
import { Chatbot } from "@/components/Chatbot";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "Amaya's Swahili Kitchen",
  description: "Authentic Coastal Flavors in the Heart of Kilimani",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
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
        </CartProvider>
      </body>
    </html>
  );
}
