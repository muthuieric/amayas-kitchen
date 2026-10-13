"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

// NOTE: We intentionally DO NOT store reservations anywhere. There is no
// database on this project. Reservations (and food orders) are sent straight
// to the restaurant's WhatsApp. See app/reservations/page.tsx, which builds
// the pre-filled WhatsApp message client-side.

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
    // Next 15+/React 19: cookies() is async — await it before setting.
    const cookieStore = await cookies();
    cookieStore.set("session", "admin", { expires, httpOnly: true });
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