import type { ImageLoaderProps } from "next/image";

export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  const cloudName = "f399qaca"; // TODO: Reemplazar con el Cloud Name real

  // Cloudinary Fetch requires an absolute remote URL. Keep local public assets
  // available directly while catalog images are fetched through Cloudinary.
  if (src.startsWith("/")) return src;

  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

  return `https://res.cloudinary.com/${cloudName}/image/fetch/${params.join(",")}/${src}`;
}
