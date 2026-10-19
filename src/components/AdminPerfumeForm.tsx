"use client";

import { useActionState, useMemo, useState } from "react";
import type { Category, Subcategory } from "@/types/catalog";
import {
  createPerfume,
  type CreatePerfumeState,
} from "@/lib/actions/perfumes";

const initialState: CreatePerfumeState = {
  ok: false,
  message: "",
};

export function AdminPerfumeForm({ categories, subcategories }: { categories: Category[]; subcategories: Subcategory[] }) {
  const [categorySlug, setCategorySlug] = useState("");
  const [state, formAction, pending] = useActionState(
    createPerfume,
    initialState,
  );
  const selectedCategory = categories.find((category) => category.slug === categorySlug);
  const visibleSubcategories = useMemo(
    () => subcategories.filter((subcategory) => subcategory.category_id === selectedCategory?.id),
    [selectedCategory?.id, subcategories],
  );

  return (
    <form
      action={formAction}
      className="mx-auto w-full max-w-3xl space-y-5 rounded-3xl bg-white/65 p-6 shadow-[0_16px_40px_rgba(90,70,50,0.1)] ring-1 ring-black/5 sm:p-8"
    >
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm tracking-wide text-[#5d534c]">
          Nombre del perfume
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Ej. Oud Imperial"
          className="w-full rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-3 text-[#2b2420] outline-none transition focus:border-[#8d8178] focus:ring-2 focus:ring-[#8d8178]/30"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm tracking-wide text-[#5d534c]">
            Precio <span className="text-xs text-[#8d8178]">(ARS, opcional)</span>
          </label>
          <input id="price" name="price" type="number" min="0" step="0.01" placeholder="Ej. 85000" className="w-full rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-3 text-[#2b2420] outline-none focus:border-[#8d8178] focus:ring-2 focus:ring-[#8d8178]/30" />
        </div>
        <div className="space-y-2">
          <label htmlFor="occasion" className="block text-sm tracking-wide text-[#5d534c]">Ocasión de uso</label>
          <input id="occasion" name="occasion" type="text" placeholder="Ej. Noche, oficina, diario" className="w-full rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-3 text-[#2b2420] outline-none focus:border-[#8d8178] focus:ring-2 focus:ring-[#8d8178]/30" />
        </div>
        <div className="space-y-2">
          <label htmlFor="notes" className="block text-sm tracking-wide text-[#5d534c]">Notas</label>
          <input id="notes" name="notes" type="text" placeholder="Ej. Oud, vainilla, ámbar" className="w-full rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-3 text-[#2b2420] outline-none focus:border-[#8d8178] focus:ring-2 focus:ring-[#8d8178]/30" />
          <p className="text-xs text-[#8d8178]">Separá las notas con comas.</p>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subtitle" className="block text-sm tracking-wide text-[#5d534c]">
          Subtítulo <span className="text-xs text-[#8d8178]">(opcional)</span>
        </label>
        <input
          id="subtitle"
          name="subtitle"
          type="text"
          placeholder="Ej. Eau de Parfum intenso"
          className="w-full rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-3 text-[#2b2420] outline-none transition focus:border-[#8d8178] focus:ring-2 focus:ring-[#8d8178]/30"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="category"
          className="block text-sm tracking-wide text-[#5d534c]"
        >
          Categoría
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue=""
          onChange={(event) => setCategorySlug(event.target.value)}
          className="w-full appearance-none rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-3 text-[#2b2420] outline-none transition focus:border-[#8d8178] focus:ring-2 focus:ring-[#8d8178]/30"
        >
          <option value="" disabled>
            Seleccioná una categoría
          </option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="subcategory_id" className="block text-sm tracking-wide text-[#5d534c]">
          Subcategoría
        </label>
        <select id="subcategory_id" name="subcategory_id" required defaultValue=""
          className="w-full appearance-none rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-3 text-[#2b2420] outline-none">
          <option value="" disabled>Seleccioná una subcategoría</option>
          {visibleSubcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="block text-sm tracking-wide text-[#5d534c]">
          Imagen del perfume
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          required
          className="w-full rounded-2xl border border-dashed border-[#d8cfc4] bg-white/70 px-4 py-4 text-sm text-[#5d534c] file:mr-4 file:rounded-full file:border-0 file:bg-[#8d8178] file:px-4 file:py-2 file:text-sm file:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#8d8178] px-6 py-3.5 tracking-[0.18em] text-white uppercase transition hover:bg-[#7a6f67] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Guardando..." : "Guardar"}
      </button>

      {state.message ? (
        <p
          className={`text-center text-sm ${
            state.ok ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
