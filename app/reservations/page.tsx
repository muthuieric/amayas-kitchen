import { buildMetadata } from "@/lib/metadata";
import ReservationsForm from "@/components/ReservationsForm";

export const metadata = buildMetadata({
  title: "Reserve a Table - Amayas Swahili Kitchen, Kilimani",
  description:
    "Book a table at Amayas Swahili Kitchen in Kilimani, Nairobi. Authentic Swahili food, open daily 7:00 AM – 9:30 PM. Confirm your reservation via WhatsApp.",
  path: "/reservations",
  keywords: [
    "restaurant reservation Kilimani",
    "book a table Nairobi",
    "Swahili restaurant booking",
    "Amayas Swahili Kitchen",
  ],
});

export default function ReservationsPage() {
  return <ReservationsForm />;
}
