"use client";

import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions";

const initialState = {
  message: null,
};

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="container mx-auto max-w-sm py-24">
      <h1 className="mb-8 text-4xl font-bold">Admin Login</h1>
      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </form>
    </div>
  );
}
