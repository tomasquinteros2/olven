import Link from "next/link";
import { AdminPerfumeForm } from "@/components/AdminPerfumeForm";
import { AdminCatalogManager } from "@/components/AdminCatalogManager";
import { AdminPerfumeManager } from "@/components/AdminPerfumeManager";
import { getCategories, getSubcategories } from "@/lib/supabase/catalog";
import { getAllPerfumes } from "@/lib/supabase/perfumes";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const categories = await getCategories();
  const subcategories = (await Promise.all(
    categories.map((category) => getSubcategories(category.id)),
  )).flat();
  const perfumes = await getAllPerfumes();
  return (
    <main className="home-canvas relative min-h-screen">
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="flex items-center justify-between border-b border-[#d8cfc4]/70 pb-5">
          <Link
            href="/"
            className="text-xs tracking-[0.22em] text-[#6d6259] uppercase transition hover:text-[#2b2420]"
          >
            ← Inicio
          </Link>
          <span className="rounded-full bg-[#8d8178]/10 px-3 py-1 text-[10px] tracking-[0.2em] text-[#6d6259] uppercase">
            Administración
          </span>
        </div>

        <header className="py-10 sm:py-14">
          <p className="text-[11px] tracking-[0.45em] text-[#6d6259] uppercase">
            OLVÉN · Panel de control
          </p>
          <h1 className="mt-3 font-serif text-5xl tracking-[0.08em] text-[#1c1917] sm:text-6xl">
            Catálogo
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#6d6259]">
            Organizá categorías, subcategorías y perfumes desde un solo lugar.
            Los cambios se reflejan automáticamente en el catálogo público.
          </p>
          <nav className="mt-7 flex flex-wrap gap-2 text-xs tracking-wide text-[#6d6259]">
            <a href="#organizacion" className="rounded-full border border-[#d8cfc4] px-4 py-2 transition hover:bg-white/60">Organización</a>
            <a href="#perfumes" className="rounded-full border border-[#d8cfc4] px-4 py-2 transition hover:bg-white/60">Perfumes cargados</a>
            <a href="#nuevo-perfume" className="rounded-full border border-[#8d8178] bg-[#8d8178] px-4 py-2 text-white transition hover:bg-[#7a6f67]">+ Nuevo perfume</a>
          </nav>
        </header>

        <section id="organizacion" className="scroll-mt-6">
          <div className="mb-5">
            <p className="text-[10px] tracking-[0.3em] text-[#8d8178] uppercase">01 · Estructura</p>
            <h2 className="mt-1 font-serif text-3xl text-[#2b2420]">Organización del catálogo</h2>
          </div>
          <AdminCatalogManager categories={categories} subcategories={subcategories} />
        </section>

        <section id="perfumes" className="scroll-mt-6">
          <div className="mb-5">
            <p className="text-[10px] tracking-[0.3em] text-[#8d8178] uppercase">02 · Inventario</p>
            <h2 className="mt-1 font-serif text-3xl text-[#2b2420]">Perfumes cargados</h2>
          </div>
          <AdminPerfumeManager perfumes={perfumes} categories={categories} subcategories={subcategories} />
        </section>

        <section id="nuevo-perfume" className="scroll-mt-6">
          <div className="mb-5">
            <p className="text-[10px] tracking-[0.3em] text-[#8d8178] uppercase">03 · Alta</p>
            <h2 className="mt-1 font-serif text-3xl text-[#2b2420]">Agregar un perfume</h2>
          </div>
          <AdminPerfumeForm categories={categories} subcategories={subcategories} />
        </section>
      </div>
    </main>
  );
}
