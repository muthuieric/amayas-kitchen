"use client";

import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions";

const initialState = {
  message: "",
};

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="mx-auto max-w-sm px-4 py-12 sm:py-20">
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-red-700">Staff Portal</span>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
          Admin Login
        </h1>
      </div>

      <form action={formAction} className="space-y-5 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-bold text-slate-900">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter admin password"
            className="h-11 text-base sm:text-sm rounded-xl"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full min-h-[48px] rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-bold text-base shadow-sm transition-all"
        >
          Login
        </Button>
        {state?.message && (
          <p className="rounded-xl bg-red-50 border border-red-200 p-3 text-center text-xs sm:text-sm font-semibold text-red-600">
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
