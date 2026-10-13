"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions";

const initialState = {
  message: "",
};

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div className="mx-auto max-w-sm px-4 py-14 sm:py-24">
      <div className="text-center mb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 mb-3 border border-orange-500/20">
          <Lock size={22} />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-red-700">
          Staff Portal
        </span>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
          Admin Login
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Sign in to manage table reservations and kitchen settings.
        </p>
      </div>

      <form
        action={formAction}
        className="space-y-5 rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Admin Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter password (e.g. AmayaAdmin2024!)"
            className="h-11 text-base sm:text-sm rounded-xl focus:ring-orange-500"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full min-h-[48px] rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-bold text-sm sm:text-base shadow-sm transition-all"
        >
          Sign In to Dashboard
        </Button>

        {state?.message && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-center text-xs sm:text-sm font-semibold text-red-700 animate-in fade-in duration-200">
            {state.message}
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-slate-400 border-t border-gray-100">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>Protected with HMAC-SHA256 JWT & Rate Limiting</span>
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
