"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { blockedDates } from "@/config/reservations";

const LUNCH_SLOTS = ["12:00", "12:30", "13:00", "13:30", "14:00"];
const DINNER_SLOTS = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

const WHATSAPP_NUMBER = "254718414667";

/** Format a Date as YYYY-MM-DD in LOCAL time (toISOString shifts timezone). */
function toLocalISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export default function ReservationsPage() {
  // No database, no server action: the booking is sent straight to WhatsApp.
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("19:00");
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);

  const formattedDate = date ? toLocalISODate(date) : "";

  // Build the pre-filled WhatsApp booking message (client-side only —
  // nothing is stored anywhere).
  const whatsappUrl = (() => {
    const lines = [
      "Habari Amaya's! I'd like to book a table from your website:",
      "",
      `Name: ${name.trim() || "-"}`,
      phone.trim() ? `Phone: ${phone.trim()}` : null,
      `Date: ${formattedDate}`,
      `Time: ${selectedTime}`,
      `Guests: ${guests}`,
      specialRequests.trim() ? `Notes: ${specialRequests.trim()}` : null,
      "",
      "Please confirm my reservation!",
    ].filter(Boolean);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  })();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError("Please enter your name so we can note the booking.");
      return;
    }
    setNameError("");
    // Opens WhatsApp with the reservation pre-filled — nothing is saved.
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  // After submitting: confirmation panel (also a fallback link in case the
  // browser blocked the new tab).
  if (sent) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-20 animate-in fade-in zoom-in-95 duration-300">
        <div className="rounded-3xl border border-orange-500 bg-white p-6 sm:p-10 text-center shadow-xl">

          <span className="inline-block rounded-full bg-orange-500 border border-orange-500 px-3 py-1 text-xs font-bold text-white">
            Ready to send • On WhatsApp
          </span>

          <h1 className="mt-3 font-display text-2xl sm:text-3xl font-black text-slate-900">
            Karibu Amaya&apos;s!
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Your booking details are ready, <strong>{name.trim()}</strong>. If WhatsApp did not open automatically, tap the button below — we will confirm your table there.
          </p>

          {/* Details Ticket */}
          <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-left divide-y divide-gray-200/60 text-xs sm:text-sm">
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Date</span>
              <span className="font-bold text-slate-900">{formattedDate}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Time Slot</span>
              <span className="font-bold text-slate-900">{selectedTime}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Party Size</span>
              <span className="font-bold text-slate-900">{guests} Guests</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-orange-600 transition-all"
            >
              <span>Send Booking via WhatsApp</span>
            </Link>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="text-xs font-semibold text-slate-500 underline underline-offset-2 hover:text-slate-800"
            >
              Change my details
            </button>
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
        onSubmit={handleSubmit}
        className="mt-8 space-y-8 rounded-3xl border border-gray-200/80 bg-white p-5 sm:p-8 shadow-sm"
      >
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
        </div>

        {/* 4. Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Amani Mwangi"
              className="h-11 text-sm rounded-xl"
              required
            />
            {nameError && (
              <p className="text-xs font-semibold text-red-600">{nameError}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Phone Number (for confirmation)
            </Label>
            <Input
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="e.g. Birthday celebration, anniversary, high chair needed, dietary restrictions..."
            className="h-11 text-sm rounded-xl"
          />
        </div>

        {/* Policy Notice */}
        <div className="rounded-2xl bg-orange-50/70 border border-orange-200/60 p-4 text-xs text-orange-900 leading-relaxed">
          <p className="font-bold">How it works</p>
          <p className="mt-1 text-orange-800/90">
            Tap the button below and WhatsApp will open with your booking details pre-filled. Send the message and we will reply there to confirm your table. Tables are held for up to 15 minutes past your reserved time.
          </p>
        </div>

        {/* Submit CTA */}
        <Button
          type="submit"
          className="w-full min-h-[50px] rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-bold text-base shadow-sm transition-all"
        >
          Send Booking via WhatsApp for {guests} {guests === 1 ? "Guest" : "Guests"}
        </Button>
      </form>
    </div>
  );
}