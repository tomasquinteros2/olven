import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase/server";
import type { Category, Subcategory } from "@/types/catalog";

export async function getCategories(): Promise<Category[]> {
  if (!hasSupabaseConfig()) return [];
  const { data, error } = await createSupabaseServerClient()
    .from("categories").select("id, slug, label, description, created_at").order("label");
  if (error) throw new Error(`No se pudieron cargar las categorías: ${error.message}`);
  return data ?? [];
}

export async function getCategoryWithSubcategories(slug: string) {
  if (!hasSupabaseConfig()) return null;
  const supabase = createSupabaseServerClient();
  const { data: category, error } = await supabase
    .from("categories").select("id, slug, label, description, created_at").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`No se pudo cargar la categoría: ${error.message}`);
  if (!category) return null;
  const { data: subcategories, error: subcategoryError } = await supabase
    .from("subcategories").select("id, category_id, slug, label, created_at")
    .eq("category_id", category.id).order("label");
  if (subcategoryError) throw new Error(`No se pudieron cargar las subcategorías: ${subcategoryError.message}`);
  return { category: category as Category, subcategories: (subcategories ?? []) as Subcategory[] };
}

export async function getSubcategories(categoryId: string): Promise<Subcategory[]> {
  if (!hasSupabaseConfig()) return [];
  const { data, error } = await createSupabaseServerClient()
    .from("subcategories").select("id, category_id, slug, label, created_at")
    .eq("category_id", categoryId).order("label");
  if (error) throw new Error(`No se pudieron cargar las subcategorías: ${error.message}`);
  return data ?? [];
}
