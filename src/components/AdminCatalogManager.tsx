"use client";

import { useActionState } from "react";
import { createCategory, createSubcategory, deleteCategory, deleteSubcategory, updateCategory, updateSubcategory, type CatalogState } from "@/lib/actions/catalog";
import type { Category, Subcategory } from "@/types/catalog";

const initialState: CatalogState = { ok: false, message: "" };

export function AdminCatalogManager({ categories, subcategories }: { categories: Category[]; subcategories: Subcategory[] }) {
  const [categoryState, categoryAction, categoryPending] = useActionState(createCategory, initialState);
  const [subcategoryState, subcategoryAction, subcategoryPending] = useActionState(createSubcategory, initialState);
  const runUpdateCategory = async (formData: FormData) => { await updateCategory(initialState, formData); };
  const runDeleteCategory = async (formData: FormData) => { await deleteCategory(initialState, formData); };
  const runUpdateSubcategory = async (formData: FormData) => { await updateSubcategory(initialState, formData); };
  const runDeleteSubcategory = async (formData: FormData) => { await deleteSubcategory(initialState, formData); };

  return (
    <section className="mb-16 grid gap-5 lg:grid-cols-2">
      <form action={categoryAction} className="space-y-4 rounded-3xl bg-white/65 p-6 shadow-[0_12px_30px_rgba(90,70,50,0.06)] ring-1 ring-black/5">
        <div>
          <h3 className="font-serif text-2xl text-[#2b2420]">Nueva categoría</h3>
          <p className="mt-1 text-xs text-[#8d8178]">Un grupo principal del catálogo.</p>
        </div>
        <input name="label" required placeholder="Ej. Perfumes de autor" className="w-full rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-3 outline-none" />
        <textarea name="description" rows={3} placeholder="Mini descripción de la categoría (opcional)" className="w-full resize-none rounded-2xl border border-[#d8cfc4] bg-white/80 px-4 py-3 outline-none" />
        <button disabled={categoryPending} className="rounded-full bg-[#8d8178] px-5 py-3 text-sm tracking-wide text-white disabled:opacity-60">
          {categoryPending ? "Creando..." : "Crear categoría"}
        </button>
        {categoryState.message ? <p className={categoryState.ok ? "text-emerald-700" : "text-red-700"}>{categoryState.message}</p> : null}
      </form>
      <form action={subcategoryAction} className="space-y-4 rounded-3xl bg-white/65 p-6 shadow-[0_12px_30px_rgba(90,70,50,0.06)] ring-1 ring-black/5">
        <div>
          <h3 className="font-serif text-2xl text-[#2b2420]">Nueva subcategoría</h3>
          <p className="mt-1 text-xs text-[#8d8178]">Un grupo dentro de una categoría.</p>
        </div>
        <select name="category_id" required defaultValue="" className="w-full rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-3 outline-none">
          <option value="" disabled>Elegí una categoría</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
        </select>
        <input name="label" required placeholder="Ej. Perfumes de noche" className="w-full rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-3 outline-none" />
        <button disabled={subcategoryPending} className="rounded-full bg-[#8d8178] px-5 py-3 text-sm tracking-wide text-white disabled:opacity-60">
          {subcategoryPending ? "Creando..." : "Crear subcategoría"}
        </button>
        {subcategoryState.message ? <p className={subcategoryState.ok ? "text-sm text-emerald-700" : "text-sm text-red-700"}>{subcategoryState.message}</p> : null}
      </form>
      <div className="space-y-6 rounded-3xl bg-white/65 p-6 shadow-[0_12px_30px_rgba(90,70,50,0.06)] ring-1 ring-black/5 lg:col-span-2">
        <div>
          <h3 className="font-serif text-2xl text-[#2b2420]">Editar estructura</h3>
          <p className="mt-1 text-xs text-[#8d8178]">Los elementos con perfumes asociados no se pueden eliminar.</p>
        </div>
        <div>
          <h4 className="mb-3 text-[10px] font-medium tracking-[0.25em] text-[#8d8178] uppercase">Categorías</h4>
          <div className="space-y-2">{categories.map((category) => <div key={category.id} className="flex flex-wrap items-center gap-2 rounded-2xl bg-white/60 p-2">
          <form action={runUpdateCategory} className="flex flex-1 gap-2">
            <input type="hidden" name="id" value={category.id} />
            <input name="label" defaultValue={category.label} className="min-w-48 flex-1 rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-2" />
            <textarea name="description" defaultValue={category.description ?? ""} rows={2} placeholder="Descripción (opcional)" className="min-w-48 flex-1 resize-none rounded-2xl border border-[#d8cfc4] bg-white/80 px-4 py-2" />
            <button className="rounded-full border border-[#8d8178] px-4 py-2 text-sm">Editar</button>
          </form>
          <form action={runDeleteCategory}><input type="hidden" name="id" value={category.id} /><button className="rounded-full border border-red-300 px-4 py-2 text-sm text-red-700">Eliminar</button></form>
        </div>)}</div>
        </div>
        <div>
          <h4 className="mb-3 text-[10px] font-medium tracking-[0.25em] text-[#8d8178] uppercase">Subcategorías</h4>
          <div className="space-y-2">{subcategories.map((subcategory) => <div key={subcategory.id} className="flex flex-wrap items-center gap-2 rounded-2xl bg-white/60 p-2">
          <form action={runUpdateSubcategory} className="flex flex-1 gap-2">
            <input type="hidden" name="id" value={subcategory.id} />
            <input name="label" defaultValue={subcategory.label} className="min-w-48 flex-1 rounded-full border border-[#d8cfc4] bg-white/80 px-4 py-2" />
            <button className="rounded-full border border-[#8d8178] px-4 py-2 text-sm">Editar</button>
          </form>
          <form action={runDeleteSubcategory}><input type="hidden" name="id" value={subcategory.id} /><button className="rounded-full border border-red-300 px-4 py-2 text-sm text-red-700">Eliminar</button></form>
        </div>)}</div>
        </div>
      </div>
    </section>
  );
}
