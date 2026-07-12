"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { useState } from "react";
import {
  ImageUp,
  LayoutDashboard,
  Lock,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";

import { CATEGORIES, MENU_ITEMS, type Category, type Product } from "@/lib/menu-data";
import { formatKes } from "@/lib/format";

interface ProductForm {
  name: string;
  description: string;
  price: string;
  category: Category;
}

interface LoginViewProps {
  onLogin: () => void;
}

interface DashboardProps {
  onLogout: () => void;
}

const emptyForm: ProductForm = { name: "", description: "", price: "", category: CATEGORIES[0] };

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  return isAuthed ? (
    <Dashboard onLogout={() => setIsAuthed(false)} />
  ) : (
    <LoginView onLogin={() => setIsAuthed(true)} />
  );
}

function LoginView({ onLogin }: LoginViewProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onLogin();
        }}
        className="w-full max-w-sm rounded-2xl bg-card p-8 shadow-lifted"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Lock size={22} />
        </div>
        <h1 className="mt-4 text-center font-display text-2xl font-black">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Amaya's Swahili Kitchen dashboard
        </p>

        <label className="mt-6 block text-sm font-semibold">
          Email
          <input
            type="email"
            required
            placeholder="admin@amayas.co.ke"
            className="mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Password
          <input
            type="password"
            required
            placeholder="Password"
            className="mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Sign In
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Mock login - Supabase Auth pending integration.
        </p>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: DashboardProps) {
  const [products, setProducts] = useState<Product[]>(MENU_ITEMS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description, price: String(p.price), category: p.category });
    setModalOpen(true);
  };

  const save = () => {
    const price = Number(form.price) || 0;
    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, name: form.name, description: form.description, price, category: form.category }
            : p,
        ),
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: `item-${Date.now()}`,
          name: form.name,
          description: form.description,
          price,
          category: form.category,
          image: prev[0]?.image ?? "",
        },
      ]);
    }
    setModalOpen(false);
  };

  const remove = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard size={18} />
            </div>
            <p className="truncate font-display font-black">
              Amaya's <span className="text-accent">Admin</span>
            </p>
          </div>
          <button
            onClick={onLogout}
            className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-black sm:text-3xl">Menu Inventory</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {products.length} items - Changes are local until backend is connected
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-card transition-colors hover:bg-primary-hover"
          >
            <Plus size={16} /> Add Item
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5 font-bold">Dish</th>
                  <th className="px-5 py-3.5 font-bold">Category</th>
                  <th className="px-5 py-3.5 font-bold">Price</th>
                  <th className="px-5 py-3.5 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-secondary/30">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={p.name}
                            width={800}
                            height={600}
                            sizes="44px"
                            className="h-11 w-11 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground">
                            <UtensilsCrossed size={16} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-bold">{p.name}</p>
                          <p className="max-w-[260px] truncate text-xs text-muted-foreground">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-bold text-accent">{formatKes(p.price)}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => openEdit(p)}
                          aria-label={`Edit ${p.name}`}
                          className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => remove(p.id)}
                          aria-label={`Delete ${p.name}`}
                          className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-4">
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-card p-6 shadow-lifted sm:rounded-2xl">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-black">
                {editingId ? "Edit Item" : "Add New Item"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary"
              >
                <X size={18} />
              </button>
            </div>

            <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                save();
              }}
              className="mt-5 space-y-4"
            >
              <label className="block text-sm font-semibold">
                Product Name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Beef Pilau"
                  className="mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                />
              </label>

              <label className="block text-sm font-semibold">
                Description
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short, mouth-watering description"
                  className="mt-1.5 w-full resize-none rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-semibold">
                  Price (KES)
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="800"
                    className="mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Category
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                    className="mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div>
                <p className="text-sm font-semibold">Dish Image</p>
                <label className="mt-1.5 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed bg-background px-4 py-8 text-center transition-colors hover:border-primary hover:bg-secondary/40">
                  <ImageUp size={24} className="text-primary" />
                  <span className="text-sm font-semibold">Click to upload image</span>
                  <span className="text-xs text-muted-foreground">
                    JPG or PNG - Uploads to Cloudflare R2 (pending integration)
                  </span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={() => remove(editingId)}
                    className="flex items-center gap-1.5 rounded-xl border border-destructive/40 px-4 py-3 text-sm font-bold text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  {editingId ? "Save Changes" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
