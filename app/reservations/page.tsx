
"use client";

import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createReservation } from "@/lib/actions";
import { blockedDates } from "@/config/reservations";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const initialState = {
  message: null,
  errors: {},
};

export default function ReservationsPage() {
  const [state, formAction] = useFormState(createReservation, initialState);
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto max-w-2xl py-24">
      <h1 className="mb-8 text-4xl font-bold">Make a Reservation</h1>
      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
          {state.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              required
              disabled
              value={date?.toISOString().split("T")[0]}
            />
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                blockedDates.includes(date.toISOString().split("T")[0])
              }
              className="rounded-md border"
            />
            {state.errors?.date && (
              <p className="text-sm text-red-500">{state.errors.date}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" name="time" type="time" required />
            {state.errors?.time && (
              <p className="text-sm text-red-500">{state.errors.time}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests</Label>
          <Input id="guests" name="guests" type="number" min="1" required />
          {state.errors?.guests && (
            <p className="text-sm text-red-500">{state.errors.guests}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Book Reservation
        </Button>
        {state.message && (
          <p className="text-sm text-green-500">{state.message}</p>
        )}
      </form>
    </div>
  );
}
