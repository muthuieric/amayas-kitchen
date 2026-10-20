import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLdString } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Reserve a Table - Book Your Swahili Dining Experience",
  description:
    "Book a table at Amaya's Swahili Kitchen in Kilimani, Nairobi. Reserve for lunch or dinner, choose your occasion, and we'll have your table ready. Open daily 9:00 AM – 9:30 PM.",
  path: "/reservations",
  keywords: [
    "book a table Kilimani",
    "restaurant reservations Nairobi",
    "Swahili dining Nairobi",
    "dinner reservation Kilimani",
  ],
});

export default function ReservationsLayout({ children }: { children: ReactNode }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Reservations", path: "/reservations" },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(graph) }}
      />
      {children}
    </>
  );
}
