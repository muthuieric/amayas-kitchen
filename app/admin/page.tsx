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
    message: null,
  });

  const [passwordState, passwordFormAction] = useFormState(updatePassword, {
    message: null,
  });

  return (
    <div className="container mx-auto py-24">
      <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>
      <Tabs defaultValue="reservations">
        <TabsList>
          <TabsTrigger value="reservations">Reservation Manager</TabsTrigger>
          <TabsTrigger value="photos">Photo Manager</TabsTrigger>
          <TabsTrigger value="settings">Admin Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="reservations">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Guests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.name}>
                  <TableCell>{reservation.name}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>{reservation.guests}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="photos">
          <form action={photoFormAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">Upload Image</Label>
              <Input id="image" name="image" type="file" />
            </div>
            <Button type="submit">Upload</Button>
            {photoState?.message && (
              <p className="text-sm text-green-500">{photoState.message}</p>
            )}
          </form>
        </TabsContent>
        <TabsContent value="settings">
          <form action={passwordFormAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" name="new-password" type="password" />
            </div>
            <Button type="submit">Update Password</Button>
            {passwordState?.message && (
              <p className="text-sm text-green-500">{passwordState.message}</p>
            )}
          </form>
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
}absContent>
        <TabsContent value="settings">
          <p>Admin Settings</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
