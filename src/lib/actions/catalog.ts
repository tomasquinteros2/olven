"use server";

import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/categories";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CatalogState = { ok: boolean; message: string };

export async function createCategory(_prev: CatalogState, formData: FormData): Promise<CatalogState> {
  const label = String(formData.get("label") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  if (!label) return { ok: false, message: "Ingresá el nombre de la categoría." };
  const slug = slugify(label);
  if (!slug) return { ok: false, message: "El nombre no permite generar un identificador válido." };
  const { error } = await createSupabaseServerClient().from("categories").insert({ label, slug, description });
  if (error) return { ok: false, message: `No se pudo crear la categoría: ${error.message}` };
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, message: "Categoría creada correctamente." };
}

export async function createSubcategory(_prev: CatalogState, formData: FormData): Promise<CatalogState> {
  const categoryId = String(formData.get("category_id") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  if (!categoryId || !label) return { ok: false, message: "Seleccioná una categoría e ingresá un nombre." };
  const slug = slugify(label);
  const { error } = await createSupabaseServerClient().from("subcategories").insert({ category_id: categoryId, label, slug });
  if (error) return { ok: false, message: `No se pudo crear la subcategoría: ${error.message}` };
  revalidatePath("/admin");
  return { ok: true, message: "Subcategoría creada correctamente." };
}

export async function updateCategory(_prev: CatalogState, formData: FormData): Promise<CatalogState> {
  const id = String(formData.get("id") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  if (!id || !label) return { ok: false, message: "Datos incompletos." };
  const supabase = createSupabaseServerClient();
  const { data: current, error: currentError } = await supabase.from("categories").select("slug").eq("id", id).single();
  if (currentError) return { ok: false, message: `No se pudo editar: ${currentError.message}` };
  const slug = slugify(label);
  const { error } = await supabase.from("categories").update({ label, slug, description }).eq("id", id);
  if (error) return { ok: false, message: `No se pudo editar: ${error.message}` };
  if (current.slug !== slug) {
    const { error: perfumesError } = await supabase.from("perfumes").update({ category: slug }).eq("category", current.slug);
    if (perfumesError) return { ok: false, message: `La categoría cambió, pero no se pudieron actualizar sus perfumes: ${perfumesError.message}` };
  }
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, message: "Categoría actualizada." };
}

export async function deleteCategory(_prev: CatalogState, formData: FormData): Promise<CatalogState> {
  const id = String(formData.get("id") ?? "");
  const { error } = await createSupabaseServerClient().from("categories").delete().eq("id", id);
  if (error) return { ok: false, message: "No se puede eliminar una categoría con subcategorías o perfumes asociados." };
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, message: "Categoría eliminada." };
}

export async function updateSubcategory(_prev: CatalogState, formData: FormData): Promise<CatalogState> {
  const id = String(formData.get("id") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  if (!id || !label) return { ok: false, message: "Datos incompletos." };
  const { error } = await createSupabaseServerClient().from("subcategories").update({ label, slug: slugify(label) }).eq("id", id);
  if (error) return { ok: false, message: `No se pudo editar: ${error.message}` };
  revalidatePath("/admin");
  return { ok: true, message: "Subcategoría actualizada." };
}

export async function deleteSubcategory(_prev: CatalogState, formData: FormData): Promise<CatalogState> {
  const id = String(formData.get("id") ?? "");
  const { error } = await createSupabaseServerClient().from("subcategories").delete().eq("id", id);
  if (error) return { ok: false, message: "No se puede eliminar una subcategoría con perfumes asociados." };
  revalidatePath("/admin");
  return { ok: true, message: "Subcategoría eliminada." };
}
