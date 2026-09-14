"use client";

import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createReservation } from "@/lib/actions";
import { blockedDates } from "@/config/reservations";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const initialState: any = {
  message: "",
  errors: {},
};

export default function ReservationsPage() {
  const [state, formAction] = useFormState(createReservation, initialState);
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 md:py-20">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-red-700">
          Book a Table
        </span>
        <h1 className="mt-1 font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Make a Reservation
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Join us for an unforgettable coastal dining experience in Kilimani. Karibu chakula!
        </p>
      </div>

      <form action={formAction} className="mt-8 space-y-6 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-8">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-bold text-slate-900">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="e.g. Amani Mwangi"
            className="h-11 text-base sm:text-sm rounded-xl"
            required
          />
          {state.errors?.name && (
            <p className="text-xs font-semibold text-red-600">{state.errors.name}</p>
          )}
        </div>

        {/* Date & Time: 1 col on mobile, 2 cols on md+ */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-bold text-slate-900">
              Reservation Date
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              required
              readOnly
              value={date?.toISOString().split("T")[0] || ""}
              className="h-11 text-base sm:text-sm rounded-xl"
            />
            <div className="mt-2 flex justify-center overflow-x-auto rounded-xl border border-gray-200 bg-gray-50/50 p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) =>
                  blockedDates.includes(d.toISOString().split("T")[0])
                }
                className="rounded-md"
              />
            </div>
            {state.errors?.date && (
              <p className="text-xs font-semibold text-red-600">{state.errors.date}</p>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-bold text-slate-900">
                Time
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
                className="h-11 text-base sm:text-sm rounded-xl"
                required
              />
              {state.errors?.time && (
                <p className="text-xs font-semibold text-red-600">{state.errors.time}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests" className="text-sm font-bold text-slate-900">
                Number of Guests
              </Label>
              <Input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="20"
                placeholder="2"
                className="h-11 text-base sm:text-sm rounded-xl"
                required
              />
              {state.errors?.guests && (
                <p className="text-xs font-semibold text-red-600">{state.errors.guests}</p>
              )}
            </div>

            <div className="rounded-xl bg-orange-50/70 border border-orange-200/60 p-4 text-xs text-orange-800 leading-relaxed">
              <p className="font-bold">Reservation Policy</p>
              <p className="mt-1 text-orange-700/90">
                Tables are held for up to 15 minutes past your reserved time. For parties larger than 8, please call us directly.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full min-h-[48px] rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-bold text-base shadow-sm transition-all"
        >
          Book Reservation
        </Button>

        {state.message && (
          <p className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center text-sm font-bold text-emerald-700">
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
