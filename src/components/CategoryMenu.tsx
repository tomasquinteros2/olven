import Link from "next/link";
import { getCategories } from "@/lib/supabase/catalog";

export async function CategoryMenu() {
  const categories = await getCategories();
  return (
    <nav
      aria-label="Categorías del catálogo"
      className="mx-auto flex w-full max-w-md flex-col items-center gap-2.5 px-6"
    >
      {categories.map((category, index) => (
        <div key={category.slug} className="flex w-full flex-col items-center">
          {index > 0 ? (
            <span
              aria-hidden="true"
              className="mb-2.5 h-px w-16 bg-[#8d8178]/35"
            />
          ) : null}
          <Link
            href={`/catalogo/${category.slug}`}
            className="w-full rounded-full bg-[#8d8178]/78 px-6 py-3 text-center font-sans text-[15px] leading-tight tracking-wide text-[#f6f1ea] shadow-[0_8px_24px_rgba(90,70,50,0.12)] backdrop-blur-sm transition hover:bg-[#7e726a] hover:text-white"
          >
            {category.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
