"use client";

import { useFormState } from "react-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getReservations, uploadPhoto, updatePassword } from "@/lib/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

type Reservation = {
  name: string;
  date: string;
  time: string;
  guests: number;
};

function AdminDashboard({ reservations }: { reservations: Reservation[] }) {
  const [photoState, photoFormAction] = useFormState(uploadPhoto, {
    message: "",
  });

  const [passwordState, passwordFormAction] = useFormState(updatePassword, {
    message: "",
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="mb-6 font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
        Admin Dashboard
      </h1>

      <Tabs defaultValue="reservations" className="space-y-6">
        <div className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="inline-flex h-auto p-1.5 rounded-xl bg-gray-100/90 gap-1 min-w-full sm:min-w-0">
            <TabsTrigger
              value="reservations"
              className="flex-1 sm:flex-initial rounded-lg px-3.5 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:shadow-xs"
            >
              Reservations
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="flex-1 sm:flex-initial rounded-lg px-3.5 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:shadow-xs"
            >
              Photo Manager
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex-1 sm:flex-initial rounded-lg px-3.5 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:shadow-xs"
            >
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="reservations" className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-gray-200/80 bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Date</TableHead>
                  <TableHead className="font-bold">Time</TableHead>
                  <TableHead className="font-bold">Guests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                      No reservations yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  reservations.map((reservation, index) => (
                    <TableRow key={`${reservation.name}-${index}`}>
                      <TableCell className="font-semibold text-slate-900 whitespace-nowrap">
                        {reservation.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{reservation.date}</TableCell>
                      <TableCell className="whitespace-nowrap">{reservation.time}</TableCell>
                      <TableCell>{reservation.guests}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="photos">
          <div className="max-w-md rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-xs">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Upload Gallery Image</h2>
            <form action={photoFormAction} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-bold">Image File</Label>
                <Input id="image" name="image" type="file" className="text-sm rounded-xl" />
              </div>
              <Button type="submit" className="w-full sm:w-auto rounded-xl min-h-[44px] bg-orange-500 hover:bg-orange-600 text-white font-bold">
                Upload Image
              </Button>
              {photoState?.message && (
                <p className="text-sm font-semibold text-emerald-600">{photoState.message}</p>
              )}
            </form>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="max-w-md rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-xs">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Change Admin Password</h2>
            <form action={passwordFormAction} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-sm font-bold">New Password</Label>
                <Input id="new-password" name="new-password" type="password" className="h-11 text-base sm:text-sm rounded-xl" />
              </div>
              <Button type="submit" className="w-full sm:w-auto rounded-xl min-h-[44px] bg-orange-500 hover:bg-orange-600 text-white font-bold">
                Update Password
              </Button>
              {passwordState?.message && (
                <p className="text-sm font-semibold text-emerald-600">{passwordState.message}</p>
              )}
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    getReservations().then(setReservations);
  }, []);

  return <AdminDashboard reservations={reservations} />;
}
