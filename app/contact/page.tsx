import Link from "next/link";
import { Clock, MapPin, Phone, Navigation, ShoppingBag } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons/social-icons";
import { buildMetadata } from "@/lib/metadata";
import { restaurantSchema, breadcrumbSchema, jsonLdString } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Contact & Location - Kilimani, Nairobi",
  description:
    "Visit Amaya's Swahili Kitchen at Titan Complex, Chaka Road, Kilimani, Nairobi. Call, message on WhatsApp, get directions, or order delivery via Uber Eats, Bolt Food and Glovo.",
  path: "/contact",
});

const ADDRESS = "Titan Complex, Chaka Road, Kilimani, Nairobi";
const PHONE_DISPLAY = "+254 718 414667";
const PHONE_TEL = "+254718414667";
const WHATSAPP_NUMBER = "254718 414667";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS,
)}`;

const HOURS = [
  { day: "Monday - Friday", time: "9:00 AM - 9:30 PM" },
  { day: "Saturday", time: "9:00 AM - 9:30 PM" },
  { day: "Sunday", time: "9:00 AM - 9:30 PM" },
];

export default function ContactPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      restaurantSchema(),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(graph) }}
      />
      <section className="border-b bg-gradient-to-b from-secondary/50 to-background">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Karibu</span>
          <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl md:text-5xl">
            Come say hello
          </h1>
          <p className="mx-auto mt-2.5 max-w-xl text-sm sm:text-base text-muted-foreground">
            Dine in, take away, or order for delivery - we're always a call away.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Map Location Card */}
          <div className="overflow-hidden rounded-2xl bg-card shadow-card">
            <Link
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open directions in Google Maps"
              className="group relative block aspect-[4/3] w-full overflow-hidden bg-secondary sm:aspect-[16/10]"
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 40%, oklch(0.85 0.06 65) 0, transparent 55%), radial-gradient(circle at 75% 65%, oklch(0.88 0.05 145) 0, transparent 50%), linear-gradient(135deg, oklch(0.96 0.01 75), oklch(0.92 0.02 90))",
                }}
              />
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full opacity-40"
                viewBox="0 0 400 300"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 120 Q100 90 200 130 T400 110"
                  stroke="oklch(0.55 0.03 55)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M0 200 Q120 180 240 220 T400 200"
                  stroke="oklch(0.55 0.03 55)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M80 0 L120 300"
                  stroke="oklch(0.6 0.03 55)"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M260 0 L240 300"
                  stroke="oklch(0.6 0.03 55)"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lifted ring-4 ring-primary/25 transition-transform group-hover:-translate-y-1">
                  <MapPin size={26} strokeWidth={2.5} />
                </div>
                <div className="mt-1 h-3 w-3 rotate-45 bg-primary" />
              </div>

              <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 flex items-center justify-between gap-2 rounded-xl bg-card/95 p-3 shadow-card backdrop-blur">
                <div className="min-w-0">
                  <p className="truncate font-display text-xs sm:text-sm font-black">Amaya's Kitchen</p>
                  <p className="truncate text-[11px] sm:text-xs text-muted-foreground">{ADDRESS}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-bold text-primary-foreground">
                  <Navigation size={13} />
                  <span>Directions</span>
                </span>
              </div>
            </Link>

            <div className="border-t p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Find us at
                  </p>
                  <p className="mt-1 font-display text-base sm:text-lg font-black leading-tight text-foreground">
                    {ADDRESS}
                  </p>
                </div>
              </div>
              <Link
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-foreground py-3 text-sm font-bold text-background transition-colors hover:bg-foreground/90 active:scale-98"
              >
                <Navigation size={16} />
                <span>Get Directions in Google Maps</span>
              </Link>
            </div>
          </div>

          {/* Details Column */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-card p-5 sm:p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Clock size={18} />
                </div>
                <h2 className="font-display text-lg sm:text-xl font-black">Operating Hours</h2>
              </div>
              <ul className="mt-4 divide-y divide-gray-100">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between py-2.5 sm:py-3">
                    <span className="text-sm font-semibold text-foreground">{h.day}</span>
                    <span className="text-xs sm:text-sm font-bold text-accent">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3.5 rounded-xl bg-secondary/70 p-3 text-xs leading-relaxed text-muted-foreground">
                Kitchen closes 30 minutes before closing time. Last delivery order 15 minutes before.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-5 sm:p-6 shadow-card">
              <h2 className="font-display text-lg sm:text-xl font-black">Quick Contact</h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Reservations, catering or a quick question - reach us here.
              </p>

              <div className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2">
                <Link
                  href={`tel:${PHONE_TEL}`}
                  className="group flex items-center gap-3 rounded-xl border bg-background p-3.5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card active:scale-98"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Phone size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Call us
                    </p>
                    <p className="truncate font-display text-sm font-black">{PHONE_DISPLAY}</p>
                  </div>
                </Link>

                <Link
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border bg-background p-3.5 transition-all hover:-translate-y-0.5 hover:border-whatsapp hover:shadow-card active:scale-98"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      WhatsApp
                    </p>
                    <p className="truncate font-display text-sm font-black">Message us</p>
                  </div>
                </Link>
              </div>

           
           <div className="mt-5 border-t border-gray-100 pt-4">
  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
    Follow the kitchen
  </p>
  <div className="mt-2.5 flex flex-wrap gap-2">
    <Link
      href="https://www.instagram.com/amayas.swahilikitchen/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-orange-500 hover:text-white"
    >
      <InstagramIcon size={18} />
    </Link>
    <Link
      href="https://www.facebook.com/p/Amayas-Swahili-Kitchen-61565742148330/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-orange-500 hover:text-white"
    >
      <FacebookIcon size={18} />
    </Link>
    <Link
      href="https://www.tiktok.com/@amayas.swahilikitchen"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="TikTok"
      className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-orange-500 hover:text-white"
    >
      <TikTokIcon size={18} />
    </Link>
  </div>
</div>

{/* New Order Online Section matching your styling */}
<div className="mt-5 border-t border-gray-100 pt-4">
  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
    Order Online
  </p>
  <div className="mt-2.5 flex flex-wrap gap-2">
    <Link
      href="https://www.ubereats.com/ke/store/amayas-swahili-kitchen-kilimani/LrDdv1L2VEWm1mp3YvRDZA?srsltid=AU7gw4VhbRADd4aMudlizdbqU-lBFaXgxzpEFJpDgauVXm0BPkH7l72e"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 items-center gap-2 rounded-full bg-secondary px-4 text-xs font-medium text-muted-foreground transition-colors hover:bg-orange-500 hover:text-white"
    >
      <ShoppingBag size={16} />
      Uber Eats
    </Link>
    <Link
      href="https://food.bolt.eu/en/320-nairobi/p/91916-amayas-swahili-kitchen/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 items-center gap-2 rounded-full bg-secondary px-4 text-xs font-medium text-muted-foreground transition-colors hover:bg-orange-500 hover:text-white"
    >
      <ShoppingBag size={16} />
      Bolt Food
    </Link>
    <Link
      href="https://glovoapp.com/en/ke/nairobi/stores/amayas-swahili-kitchen-nbo?utm_medium=organic&utm_campaign=google_reserve_place_order_action&utm_source=google"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 items-center gap-2 rounded-full bg-secondary px-4 text-xs font-medium text-muted-foreground transition-colors hover:bg-orange-500 hover:text-white"
    >
      <ShoppingBag size={16} />
      Glovo
    </Link>
  </div>
</div>
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
