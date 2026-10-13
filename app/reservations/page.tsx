"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Compass,
  MapPin,
  Minus,
  PartyPopper,
  Plus,
  Sparkles,
  Users,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { createReservation } from "@/lib/actions";
import { blockedDates } from "@/config/reservations";
import { WHATSAPP_NUMBER } from "@/lib/menu-data";

const LUNCH_SLOTS = ["12:00", "12:30", "13:00", "13:30", "14:00"];
const DINNER_SLOTS = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

const SEATING_ZONES = [
  {
    id: "Courtyard",
    name: "🌿 Coastal Courtyard",
    desc: "Open-air garden breeze & coastal ambiance",
  },
  {
    id: "Lounge",
    name: "🛋️ Spice Lounge",
    desc: "Intimate indoor booths & warm lighting",
  },
  {
    id: "ChefTable",
    name: "👨‍🍳 Chef's Window",
    desc: "View of flame grills & live cooking",
  },
];

const initialState: any = {
  message: "",
  errors: {},
};

export default function ReservationsPage() {
  const [state, formAction] = useFormState(createReservation, initialState);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("19:00");
  const [guests, setGuests] = useState<number>(2);
  const [seatingZone, setSeatingZone] = useState<string>("Courtyard");
  const [occasion, setOccasion] = useState<string>("Casual Dining");

  const formattedDate = date ? date.toISOString().split("T")[0] : "";

  // If successfully booked
  if (state?.success && state?.data) {
    const booking = state.data;
    const specialLine = booking.specialRequests
      ? `\n• Notes: ${booking.specialRequests}`
      : "";
    const whatsappMsg = `Habari Amaya's! 🍽️ New table reservation from your website:\n• Ref: ${booking.bookingRef}\n• Name: ${booking.name}\n• Phone: ${booking.phone}\n• Date: ${booking.date}\n• Time: ${booking.time}\n• Party: ${booking.guests} Guests\n• Seating: ${booking.seatingZone}${specialLine}\n\nPlease confirm my reservation!`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-20 animate-in fade-in zoom-in-95 duration-300">
        <div className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-10 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-5">
            <CheckCircle2 size={36} />
          </div>

          <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
            Booking Confirmed • Ref #{booking.bookingRef}
          </span>

          <h1 className="mt-3 font-display text-2xl sm:text-3xl font-black text-slate-900">
            Karibu Amaya&apos;s!
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            We have reserved your table, <strong>{booking.name}</strong>. A warm Swahili culinary welcome awaits you in Kilimani.
          </p>

          {/* Details Ticket */}
          <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-left divide-y divide-gray-200/60 text-xs sm:text-sm">
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Date</span>
              <span className="font-bold text-slate-900">{booking.date}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Time Slot</span>
              <span className="font-bold text-slate-900">{booking.time}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Party Size</span>
              <span className="font-bold text-slate-900">{booking.guests} Guests</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Seating Area</span>
              <span className="font-bold text-orange-700">{booking.seatingZone}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#128C7E] transition-all"
            >
              <span>Confirm Instant Booking via WhatsApp</span>
            </Link>
            <Link
              href="/menu"
              className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-orange-600 transition-all"
            >
              <span>Explore The Menu In Advance</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Page Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-red-700">
          Book a Table
        </span>
        <h1 className="mt-1 font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Reserve Your Dining Experience
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base max-w-xl">
          Join us for authentic coastal flavors, charcoal grills, and heartfelt hospitality in Kilimani, Nairobi.
        </p>
      </div>

      <form
        action={formAction}
        className="mt-8 space-y-8 rounded-3xl border border-gray-200/80 bg-white p-5 sm:p-8 shadow-sm"
      >
        {/* Hidden inputs synced with interactive UI */}
        <input type="hidden" name="date" value={formattedDate} />
        <input type="hidden" name="time" value={selectedTime} />
        <input type="hidden" name="guests" value={guests} />
        <input type="hidden" name="seatingZone" value={seatingZone} />

        {/* 1. Guest Party Size Stepper & Quick Pills */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users size={16} className="text-orange-600" />
              <span>Party Size</span>
            </Label>
            <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full">
              {guests} {guests === 1 ? "Guest" : "Guests"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[1, 2, 4, 6, 8].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setGuests(num)}
                className={`min-h-[40px] px-4 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                  guests === num
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                }`}
              >
                {num} {num === 1 ? "person" : "people"}
              </button>
            ))}

            {/* Custom counter stepper */}
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/80 p-1 ml-auto">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-700 shadow-xs hover:bg-gray-100 active:scale-90"
                aria-label="Decrease guests"
              >
                <Minus size={13} />
              </button>
              <span className="w-5 text-center text-xs font-black text-slate-900">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(20, g + 1))}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-700 shadow-xs hover:bg-gray-100 active:scale-90"
                aria-label="Increase guests"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
          {state.errors?.guests && (
            <p className="text-xs font-semibold text-red-600">{state.errors.guests}</p>
          )}
        </div>

        {/* 2. Date Selection (Calendar Grid) */}
        <div className="space-y-3">
          <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CalendarIcon size={16} className="text-orange-600" />
            <span>Select Date</span>
            {formattedDate && (
              <span className="text-xs font-normal text-slate-500 ml-1">
                ({new Date(formattedDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })})
              </span>
            )}
          </Label>

          <div className="flex justify-center overflow-x-auto rounded-2xl border border-gray-200/80 bg-gray-50/40 p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return d < today || blockedDates.includes(d.toISOString().split("T")[0]);
              }}
              className="rounded-md"
            />
          </div>
          {state.errors?.date && (
            <p className="text-xs font-semibold text-red-600">{state.errors.date}</p>
          )}
        </div>

        {/* 3. Time Slot Picker (Lunch & Dinner) */}
        <div className="space-y-3">
          <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock size={16} className="text-orange-600" />
            <span>Choose Time Slot</span>
          </Label>

          <div className="space-y-3">
            {/* Lunch */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Lunch Service (12:00 PM – 3:00 PM)
              </span>
              <div className="flex flex-wrap gap-2">
                {LUNCH_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      selectedTime === slot
                        ? "bg-orange-500 text-white shadow-xs"
                        : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Dinner */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Dinner Service (6:00 PM – 1:00 PM)
              </span>
              <div className="flex flex-wrap gap-2">
                {DINNER_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      selectedTime === slot
                        ? "bg-orange-500 text-white shadow-xs"
                        : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {state.errors?.time && (
            <p className="text-xs font-semibold text-red-600">{state.errors.time}</p>
          )}
        </div>

        {/* 4. Seating Zone Preference */}
        <div className="space-y-3">
          <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Compass size={16} className="text-orange-600" />
            <span>Seating Preference</span>
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SEATING_ZONES.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() => setSeatingZone(zone.id)}
                className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all ${
                  seatingZone === zone.id
                    ? "border-orange-500 bg-orange-50/60 ring-1 ring-orange-500"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="font-bold text-xs sm:text-sm text-slate-900">{zone.name}</span>
                <span className="mt-1 text-[11px] text-slate-500 leading-tight">{zone.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Amani Mwangi"
              className="h-11 text-sm rounded-xl"
              required
            />
            {state.errors?.name && (
              <p className="text-xs font-semibold text-red-600">{state.errors.name}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Phone Number (for SMS confirmation)
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="e.g. +254 718 414667"
              className="h-11 text-sm rounded-xl"
            />
          </div>
        </div>

        {/* Special Requests */}
        <div className="space-y-1.5">
          <Label htmlFor="specialRequests" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Special Requests / Occasion (Optional)
          </Label>
          <Input
            id="specialRequests"
            name="specialRequests"
            placeholder="e.g. Birthday celebration, anniversary, high chair needed, dietary restrictions..."
            className="h-11 text-sm rounded-xl"
          />
        </div>

        {/* Policy Notice */}
        <div className="rounded-2xl bg-orange-50/70 border border-orange-200/60 p-4 text-xs text-orange-900 leading-relaxed">
          <p className="font-bold">Reservation Guarantee</p>
          <p className="mt-1 text-orange-800/90">
            Tables are held for up to 15 minutes past your reserved time. Instant confirmation will be sent directly to your screen and can be forwarded to WhatsApp.
          </p>
        </div>

        {/* Submit CTA */}
        <Button
          type="submit"
          className="w-full min-h-[50px] rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-bold text-base shadow-sm transition-all"
        >
          Confirm Reservation for {guests} {guests === 1 ? "Guest" : "Guests"}
        </Button>
      </form>
    </div>
  );
}
