import Link from "next/link";
import { getCategories } from "@/lib/supabase/catalog";

export async function CategoryMenu() {
  const categories = await getCategories();
  return (
    <nav
      aria-label="Categorías del catálogo"
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {categories.map((category, index) => (
        <Link
          key={category.slug}
          href={`/catalogo/${category.slug}`}
          className={`category-card category-card-${index + 1} group relative flex min-h-64 items-end overflow-hidden p-6 sm:min-h-80 sm:p-8`}
        >
          <span className="absolute inset-0 bg-[url('/logo_olven.png')] bg-cover bg-center opacity-20 mix-blend-multiply transition duration-700 group-hover:scale-110 group-hover:opacity-30" />
          <span className="absolute inset-0 bg-gradient-to-t from-[#171615]/85 via-[#252321]/35 to-transparent" />
          <span className="relative z-10 w-full">
            <span className="mb-3 block text-[10px] tracking-[0.32em] text-[#d4b887] uppercase">
              {String(index + 1).padStart(2, "0")} · Colección
            </span>
            <span className="flex items-center justify-between border-t border-white/25 pt-4 text-left text-2xl text-white sm:text-3xl">
              <span className="font-serif">{category.label}</span>
              <span className="text-lg font-light text-[#d4b887] transition duration-300 group-hover:translate-x-1">↗</span>
            </span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
