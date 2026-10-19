"use client";

import Image from "next/image";
import { useActionState, useMemo, useState } from "react";
import { deletePerfume, updatePerfume, type CreatePerfumeState } from "@/lib/actions/perfumes";
import type { Category, Subcategory } from "@/types/catalog";
import type { Perfume } from "@/types/perfume";

const initialState: CreatePerfumeState = { ok: false, message: "" };

function PerfumeEditor({ perfume, categories, subcategories }: {
  perfume: Perfume;
  categories: Category[];
  subcategories: Subcategory[];
}) {
  const [category, setCategory] = useState(perfume.category);
  const [updateState, updateAction, updating] = useActionState(updatePerfume, initialState);
  const [deleteState, deleteAction, deleting] = useActionState(deletePerfume, initialState);
  const visibleSubcategories = useMemo(
    () => subcategories.filter((item) => item.category_id === categories.find((c) => c.slug === category)?.id),
    [category, categories, subcategories],
  );

  return (
    <article className="rounded-3xl bg-white/60 p-5 ring-1 ring-black/5">
      <div className="flex flex-col gap-5 sm:flex-row">
        <Image src={perfume.image_url} alt={perfume.name} width={96} height={120} className="h-28 w-24 rounded-2xl object-cover" />
        <form action={updateAction} className="grid flex-1 gap-3 sm:grid-cols-2">
          <input type="hidden" name="id" value={String(perfume.id)} />
          <input name="name" required defaultValue={perfume.name} className="rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-2 outline-none" />
          <input name="subtitle" defaultValue={perfume.subtitle ?? ""} placeholder="Subtítulo (opcional)" className="rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-2 outline-none" />
          <input name="price" type="number" min="0" step="0.01" defaultValue={perfume.price ?? ""} placeholder="Precio (ARS)" className="rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-2 outline-none" />
          <input name="occasion" defaultValue={perfume.occasion ?? ""} placeholder="Ocasión (ej. noche)" className="rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-2 outline-none" />
          <input name="notes" defaultValue={perfume.notes.join(", ")} placeholder="Notas separadas por comas" className="rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-2 outline-none" />
          <select name="category" required value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-2 outline-none">
            {categories.map((item) => <option key={item.id} value={item.slug}>{item.label}</option>)}
          </select>
          <select name="subcategory_id" required defaultValue={perfume.subcategory_id ?? ""} className="rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-2 outline-none">
            <option value="" disabled>Subcategoría</option>
            {visibleSubcategories.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="rounded-2xl border border-dashed border-[#d8cfc4] px-3 py-2 text-sm" />
          <button disabled={updating} className="w-fit rounded-full bg-[#8d8178] px-5 py-2 text-sm text-white disabled:opacity-60">{updating ? "Guardando..." : "Guardar cambios"}</button>
          {updateState.message ? <p className={updateState.ok ? "text-emerald-700 sm:col-span-2" : "text-red-700 sm:col-span-2"}>{updateState.message}</p> : null}
        </form>
        <form action={deleteAction} className="mt-3">
          <input type="hidden" name="id" value={String(perfume.id)} />
          <button disabled={deleting} className="rounded-full border border-red-300 px-5 py-2 text-sm text-red-700 disabled:opacity-60">{deleting ? "Eliminando..." : "Eliminar perfume"}</button>
          {deleteState.message ? <p className={deleteState.ok ? "mt-2 text-emerald-700" : "mt-2 text-red-700"}>{deleteState.message}</p> : null}
        </form>
      </div>
    </article>
  );
}

export function AdminPerfumeManager({ perfumes, categories, subcategories }: {
  perfumes: Perfume[];
  categories: Category[];
  subcategories: Subcategory[];
}) {
  if (perfumes.length === 0) {
    return <p className="mb-16 rounded-3xl bg-white/50 p-6 text-center text-[#6d6259]">Todavía no hay perfumes cargados.</p>;
  }
  return (
    <section className="mb-16 space-y-4">
      {perfumes.map((perfume) => <PerfumeEditor key={perfume.id} perfume={perfume} categories={categories} subcategories={subcategories} />)}
    </section>
  );
}
