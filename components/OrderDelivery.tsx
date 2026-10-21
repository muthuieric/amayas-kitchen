import Link from "next/link";
import { ArrowUpRight, Bike, MapPin, MessageCircle, Store, UtensilsCrossed } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Prominent "Dine In or Get It Delivered" conversion band.
 *
 * Shows the two ways to eat at Amayas — at the restaurant or delivered via
 * Uber Eats, Bolt Food and Glovo (plus direct WhatsApp). Paired with the
 * OrderAction structured data in lib/structured-data.ts, this makes our
 * ordering channels unambiguous to both customers and search/answer engines.
 */
export function OrderDelivery() {
  return (
    <section
      id="order-delivery"
      className="scroll-mt-16 border-y border-gray-200 bg-gradient-to-b from-orange-50/60 to-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-red-700">
            Two Ways to Enjoy Amayas
          </span>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Dine in or get it delivered
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base" data-speakable>
            Eat with us in Kilimani, or have your Swahili favourites delivered hot to
            your door via Uber Eats, Bolt Food and Glovo. Open daily{" "}
            {siteConfig.hoursDisplay.replace("Daily ", "")}.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* Dine In / Takeaway card */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-red-700/10 text-red-700">
                <Store size={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-black text-slate-900">Dine In &amp; Takeaway</h3>
                <p className="text-xs text-slate-500">Titan Complex, Chaka Road, Kilimani</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Sit down to our full Swahili spread, or grab it to go. Reserve a table and
              we&apos;ll have it ready for you.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/reservations"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-red-800 active:scale-95"
              >
                <UtensilsCrossed size={16} />
                Book a Table
              </Link>
              <Link
                href="/contact"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-gray-50 active:scale-95"
              >
                <MapPin size={16} />
                Directions
              </Link>
            </div>
          </div>

          {/* Delivery partners card */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-500/10 text-orange-600">
                <Bike size={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-black text-slate-900">
                  Delivered to Your Door
                </h3>
                <p className="text-xs text-slate-500">Order on your favourite app</p>
              </div>
            </div>

            <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
              {siteConfig.delivery.map((partner) => (
                <li key={partner.name}>
                  <Link
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-gray-50/60 p-4 transition-all hover:border-orange-300 hover:bg-white hover:shadow-sm"
                  >
                    <span className="flex items-center justify-between">
                      <span
                        aria-hidden="true"
                        className="grid h-8 w-8 place-items-center rounded-lg text-sm font-black text-white"
                        style={{ backgroundColor: partner.color }}
                      >
                        {partner.name.charAt(0)}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:text-orange-500"
                      />
                    </span>
                    <span className="mt-3 block text-sm font-bold text-slate-900">
                      {partner.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">{partner.blurb}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <Link
                href={siteConfig.whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:brightness-95 active:scale-95"
              > 
               <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
                {/* <MessageCircle size={16} /> */}
                <span>WhatsApp Us</span>
              </Link>
              <p className="text-center text-xs text-slate-500 sm:text-left">
                or call{" "}
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="font-bold text-slate-700 underline decoration-orange-400 underline-offset-2"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

