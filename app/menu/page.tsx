import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { menuSchema, breadcrumbSchema, jsonLdString } from "@/lib/structured-data";
import { MenuGallery } from "@/components/MenuGallery";

export const metadata = buildMetadata({
  title: "Menu - Swahili Pilau, Biryani, Mshikaki & Grills",
  description:
    "Browse Amaya's full Swahili menu: beef pilau, chicken biryani, mbuzi wet fry, samaki wa kupaka, mshikaki, chapati and more. Order via WhatsApp, Uber Eats, Bolt Food or Glovo.",
  path: "/menu",
  keywords: [
    "Swahili menu Nairobi",
    "pilau menu Kilimani",
    "mshikaki Nairobi",
    "samaki wa kupaka",
    "chapati Kilimani",
    "Halal Kenyan food",
  ],
});

export default function MenuPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      menuSchema(),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Menu", path: "/menu" },
      ]),
    ],
  };

  return (
    <div className="pt-6 sm:pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(graph) }}
      />

      {/* Hero header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          The Menu
        </span>
        <h1 className="mt-2 font-display text-3xl font-black sm:text-5xl leading-tight">
          Every dish, made fresh
        </h1>
        <p className="mt-2.5 max-w-xl text-sm sm:text-base text-muted-foreground">
          Tap any menu image below to view it larger and read the prices clearly.
          Order via WhatsApp, Uber Eats, Bolt Food or Glovo.
        </p>
      </div>

      <MenuGallery />
    </div>
  );
}
