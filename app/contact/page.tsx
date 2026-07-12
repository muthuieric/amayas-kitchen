import Link from "next/link";
import { Clock, Facebook, Instagram, MapPin, Navigation, Phone } from "lucide-react";

export const metadata = {
  title: "Contact & Location - Amaya's Swahili Kitchen",
  description:
    "Visit Amaya's Swahili Kitchen at Titan Complex, Chaka Road, Kilimani, Nairobi. Call, message on WhatsApp, or get directions.",
  openGraph: {
    title: "Contact - Amaya's Swahili Kitchen",
    description: "Find us in Kilimani - hours, directions and phone.",
  },
};

const ADDRESS = "Titan Complex, Chaka Road, Kilimani, Nairobi";
const PHONE_DISPLAY = "+254 712 345 678";
const PHONE_TEL = "+254712345678";
const WHATSAPP_NUMBER = "254712345678";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS,
)}`;

const HOURS = [
  { day: "Monday - Friday", time: "10:00 AM - 10:00 PM" },
  { day: "Saturday", time: "10:00 AM - 10:00 PM" },
  { day: "Sunday", time: "11:00 AM - 9:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b bg-gradient-to-b from-secondary/50 to-background">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Karibu</span>
          <h1 className="mt-2 font-display text-4xl font-black sm:text-5xl">Come say hello</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Dine in, take away, or order for delivery - we're always a call away.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
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

              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-xl bg-card/95 p-3 shadow-card backdrop-blur">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-black">Amaya's Kitchen</p>
                  <p className="truncate text-xs text-muted-foreground">{ADDRESS}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">
                  <Navigation size={14} /> Directions
                </span>
              </div>
            </Link>

            <div className="border-t p-5">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    Find us at
                  </p>
                  <p className="mt-1 font-display text-lg font-black leading-tight">{ADDRESS}</p>
                </div>
              </div>
              <Link
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-3 text-sm font-bold text-background transition-colors hover:bg-foreground/90"
              >
                <Navigation size={16} /> Get Directions
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Clock size={18} />
                </div>
                <h2 className="font-display text-xl font-black">Operating Hours</h2>
              </div>
              <ul className="mt-5 divide-y">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex items-center justify-between py-3">
                    <span className="text-sm font-semibold text-foreground">{h.day}</span>
                    <span className="text-sm font-bold text-accent">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg bg-secondary/70 p-3 text-xs text-muted-foreground">
                Kitchen closes 30 minutes before closing time. Last delivery order 15 minutes before.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-6 shadow-card">
              <h2 className="font-display text-xl font-black">Quick Contact</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Reservations, catering or a quick question - reach us here.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href={`tel:${PHONE_TEL}`}
                  className="group flex items-center gap-3 rounded-xl border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Phone size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      Call us
                    </p>
                    <p className="truncate font-display text-sm font-black">{PHONE_DISPLAY}</p>
                  </div>
                </Link>

                <Link
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-whatsapp hover:shadow-card"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      WhatsApp
                    </p>
                    <p className="truncate font-display text-sm font-black">Message us</p>
                  </div>
                </Link>
              </div>

              <div className="mt-6 border-t pt-5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Follow the kitchen
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Instagram size={18} />
                  </Link>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Facebook size={18} />
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
