import fs from "fs/promises";
import path from "path";

export interface Reservation {
  id: string;
  bookingRef: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingZone: string;
  specialRequests?: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

const RESERVATIONS_FILE_PATH = path.join(process.cwd(), "data", "reservations.json");

/**
 * Loads all reservations from persistent JSON storage
 */
export async function getStoredReservations(): Promise<Reservation[]> {
  try {
    const fileContent = await fs.readFile(RESERVATIONS_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent);
    if (!Array.isArray(data)) {
      return [];
    }
    // Return sorted by date/time ascending, or fallback to createdAt descending
    return data.sort((a, b) => {
      const dateTimeA = `${a.date}T${a.time || "00:00"}`;
      const dateTimeB = `${b.date}T${b.time || "00:00"}`;
      return dateTimeB.localeCompare(dateTimeA);
    });
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // File doesn't exist yet, initialize it
      await fs.writeFile(RESERVATIONS_FILE_PATH, "[]", "utf-8");
      return [];
    }
    console.error("Error reading reservations file:", error);
    return [];
  }
}

/**
 * Appends a new reservation and persists it to data/reservations.json
 */
export async function addReservation(input: {
  name: string;
  phone?: string;
  date: string;
  time: string;
  guests: number;
  seatingZone?: string;
  specialRequests?: string;
}): Promise<Reservation> {
  const currentReservations = await getStoredReservations();

  const randomRefNum = Math.floor(1000 + Math.random() * 9000);
  const newReservation: Reservation = {
    id: `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    bookingRef: `AK-${randomRefNum}`,
    name: input.name.trim(),
    phone: input.phone?.trim() || "Not provided",
    date: input.date,
    time: input.time,
    guests: Number(input.guests),
    seatingZone: input.seatingZone || "Courtyard",
    specialRequests: input.specialRequests?.trim() || "",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  const updatedReservations = [newReservation, ...currentReservations];
  await fs.writeFile(
    RESERVATIONS_FILE_PATH,
    JSON.stringify(updatedReservations, null, 2),
    "utf-8"
  );

  return newReservation;
}

/**
 * Updates status of an existing reservation
 */
export async function updateReservationStatus(
  id: string,
  status: "confirmed" | "pending" | "cancelled"
): Promise<Reservation | null> {
  const currentReservations = await getStoredReservations();
  const index = currentReservations.findIndex((r) => r.id === id);

  if (index === -1) {
    return null;
  }

  currentReservations[index].status = status;
  await fs.writeFile(
    RESERVATIONS_FILE_PATH,
    JSON.stringify(currentReservations, null, 2),
    "utf-8"
  );

  return currentReservations[index];
}

/**
 * Deletes a reservation by ID
 */
export async function deleteStoredReservation(id: string): Promise<boolean> {
  const currentReservations = await getStoredReservations();
  const filtered = currentReservations.filter((r) => r.id !== id);

  if (filtered.length === currentReservations.length) {
    return false;
  }

  await fs.writeFile(
    RESERVATIONS_FILE_PATH,
    JSON.stringify(filtered, null, 2),
    "utf-8"
  );

  return true;
}
