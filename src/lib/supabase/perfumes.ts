import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase/server";
import type { Perfume } from "@/types/perfume";

export async function getAllPerfumes(): Promise<Perfume[]> {
  if (!hasSupabaseConfig()) return [];
  const { data, error } = await createSupabaseServerClient()
    .from("perfumes")
    .select("id, name, subtitle, category, subcategory_id, image_url, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`No se pudieron cargar los perfumes: ${error.message}`);
  return data ?? [];
}

export async function getPerfumesByCategory(category: string): Promise<Perfume[]> {
  if (!hasSupabaseConfig()) {
    return [];
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("perfumes")
    .select("id, name, subtitle, category, subcategory_id, image_url, created_at, subcategory:subcategories(id, label)")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`No se pudieron cargar los perfumes: ${error.message}`);
  }

  return data ?? [];
}
