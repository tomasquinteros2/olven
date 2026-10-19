"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const BUCKET = "perfumes_images";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export type CreatePerfumeState = { ok: boolean; message: string };

function getStoragePath(imageUrl: string) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = imageUrl.indexOf(marker);
  return index === -1 ? null : decodeURIComponent(imageUrl.slice(index + marker.length));
}

function validateImage(image: FormDataEntryValue | null) {
  if (!(image instanceof File) || image.size === 0) return "Subí una imagen del perfume.";
  if (!ALLOWED_TYPES.has(image.type)) return "Usá una imagen JPG, PNG, WEBP o AVIF.";
  if (image.size > MAX_FILE_SIZE) return "La imagen no puede superar los 5 MB.";
  return null;
}

export async function createPerfume(_prev: CreatePerfumeState, formData: FormData): Promise<CreatePerfumeState> {
  const name = String(formData.get("name") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim() || null;
  const priceValue = String(formData.get("price") ?? "").trim();
  const price = priceValue ? Number(priceValue) : null;
  const numericPrice = Number(priceValue);
  const occasion = String(formData.get("occasion") ?? "").trim() || null;
  const notes = String(formData.get("notes") ?? "").split(",").map((note) => note.trim()).filter(Boolean);
  const category = String(formData.get("category") ?? "").trim();
  const subcategoryId = String(formData.get("subcategory_id") ?? "").trim();
  const image = formData.get("image");
  if (!name) return { ok: false, message: "Ingresá el nombre del perfume." };
  if (priceValue && (!Number.isFinite(numericPrice) || numericPrice < 0)) return { ok: false, message: "Ingresá un precio válido." };
  if (!category || !subcategoryId) return { ok: false, message: "Seleccioná una categoría y una subcategoría." };
  const imageError = validateImage(image);
  if (imageError) return { ok: false, message: imageError };

  try {
    const supabase = createSupabaseServerClient();
    const extension = (image as File).name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${category}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(
      filePath, Buffer.from(await (image as File).arrayBuffer()), { contentType: (image as File).type, upsert: false },
    );
    if (uploadError) return { ok: false, message: `Error al subir la imagen: ${uploadError.message}` };
    const publicUrl = supabase.storage.from(BUCKET).getPublicUrl(filePath).data.publicUrl;
    const { error: insertError } = await supabase.from("perfumes").insert({ name, subtitle, category, subcategory_id: subcategoryId, price, occasion, notes, image_url: publicUrl });
    if (insertError) {
      const cleanup = await supabase.storage.from(BUCKET).remove([filePath]);
      return { ok: false, message: `Error al guardar el perfume: ${insertError.message}${cleanup.error ? `. También falló la limpieza: ${cleanup.error.message}` : ""}` };
    }
    revalidatePath(`/catalogo/${category}`);
    revalidatePath("/admin");
    return { ok: true, message: "Perfume guardado correctamente." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "No se pudo guardar el perfume." };
  }
}

export async function updatePerfume(_prev: CreatePerfumeState, formData: FormData): Promise<CreatePerfumeState> {
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim() || null;
  const priceValue = String(formData.get("price") ?? "").trim();
  const price = priceValue ? Number(priceValue) : null;
  const numericPrice = Number(priceValue);
  const occasion = String(formData.get("occasion") ?? "").trim() || null;
  const notes = String(formData.get("notes") ?? "").split(",").map((note) => note.trim()).filter(Boolean);
  const category = String(formData.get("category") ?? "").trim();
  const subcategoryId = String(formData.get("subcategory_id") ?? "").trim();
  const image = formData.get("image");
  if (!id || !name || !category || !subcategoryId) return { ok: false, message: "Completá nombre, categoría y subcategoría." };
  if (priceValue && (!Number.isFinite(numericPrice) || numericPrice < 0)) return { ok: false, message: "Ingresá un precio válido." };
  if (image instanceof File && image.size > 0) {
    const imageError = validateImage(image);
    if (imageError) return { ok: false, message: imageError };
  }
  const supabase = createSupabaseServerClient();
  const { data: current, error: currentError } = await supabase.from("perfumes").select("image_url, category").eq("id", id).single();
  if (currentError || !current) return { ok: false, message: "No se encontró el perfume." };
  let imageUrl = current.image_url as string;
  let newPath: string | null = null;
  if (image instanceof File && image.size > 0) {
    const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
    newPath = `${category}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from(BUCKET).upload(newPath, Buffer.from(await image.arrayBuffer()), { contentType: image.type, upsert: false });
    if (error) return { ok: false, message: `Error al subir la nueva imagen: ${error.message}` };
    imageUrl = supabase.storage.from(BUCKET).getPublicUrl(newPath).data.publicUrl;
  }
  const { error: updateError } = await supabase.from("perfumes").update({ name, subtitle, category, subcategory_id: subcategoryId, price, occasion, notes, image_url: imageUrl }).eq("id", id);
  if (updateError) {
    if (newPath) await supabase.storage.from(BUCKET).remove([newPath]);
    return { ok: false, message: `No se pudo actualizar el perfume: ${updateError.message}` };
  }
  const oldPath = getStoragePath(current.image_url as string);
  if (newPath && oldPath) await supabase.storage.from(BUCKET).remove([oldPath]);
  revalidatePath("/admin");
  revalidatePath(`/catalogo/${category}`);
  return { ok: true, message: "Perfume actualizado correctamente." };
}

export async function deletePerfume(_prev: CreatePerfumeState, formData: FormData): Promise<CreatePerfumeState> {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return { ok: false, message: "No se indicó el perfume." };
  const supabase = createSupabaseServerClient();
  const { data: perfume, error: readError } = await supabase.from("perfumes").select("image_url, category").eq("id", id).single();
  if (readError || !perfume) return { ok: false, message: "No se encontró el perfume." };
  const { error } = await supabase.from("perfumes").delete().eq("id", id);
  if (error) return { ok: false, message: `No se pudo eliminar el perfume: ${error.message}` };
  const path = getStoragePath(perfume.image_url as string);
  if (path) {
    const cleanup = await supabase.storage.from(BUCKET).remove([path]);
    if (cleanup.error) return { ok: false, message: `Perfume eliminado, pero no se pudo borrar su imagen: ${cleanup.error.message}` };
  }
  revalidatePath("/admin");
  revalidatePath(`/catalogo/${perfume.category}`);
  return { ok: true, message: "Perfume eliminado correctamente." };
}
