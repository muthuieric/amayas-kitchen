"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

const dummyReservations = [
  {
    name: "John Doe",
    date: "2024-07-15",
    time: "18:00",
    guests: 2,
  },
  {
    name: "Jane Smith",
    date: "2024-07-16",
    time: "19:30",
    guests: 4,
  },
];

const reservationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.coerce.number().min(1, "At least one guest is required"),
});

export async function createReservation(formData: FormData) {
  const validatedFields = reservationSchema.safeParse({
    name: formData.get("name"),
    date: formData.get("date"),
    time: formData.get("time"),
    guests: formData.get("guests"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // TODO: Check if the requested Date/Time already exists in the Reservation table.
  // TODO: If it exists, return an error: 'This time slot is already booked.'
  // TODO: If it's free, save it to the PostgreSQL database.

  return {
    message: "Reservation created successfully!",
  };
}

export async function getReservations() {
  return dummyReservations;
}

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      message: "Password is required.",
    };
  }

  if (validatedFields.data.password === process.env.ADMIN_PASSWORD) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    cookies().set("session", "admin", { expires, httpOnly: true });
    redirect("/admin");
  } else {
    return {
      message: "Invalid password.",
    };
  }
}

const photoSchema = z.object({
  image: z.any(),
});

export async function uploadPhoto(prevState: any, formData: FormData) {
  const validatedFields = photoSchema.safeParse({
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    return {
      message: "Image is required.",
    };
  }

  console.log("File to upload:", validatedFields.data.image.name);

  // TODO: Upload image to Cloudflare R2 and save URL to PostgreSQL.

  return {
    message: "Image uploaded successfully!",
  };
}

const updatePasswordSchema = z.object({
  "new-password": z.string().min(1, "New password is required"),
});

export async function updatePassword(prevState: any, formData: FormData) {
  const validatedFields = updatePasswordSchema.safeParse({
    "new-password": formData.get("new-password"),
  });

  if (!validatedFields.success) {
    return {
      message: "New password is required.",
    };
  }

  const hashedPassword = await bcrypt.hash(
    validatedFields.data["new-password"],
    10
  );

  console.log("Hashed password:", hashedPassword);

  // TODO: Update password in the database.

  return {
    message: "Password updated successfully!",
  };
}
