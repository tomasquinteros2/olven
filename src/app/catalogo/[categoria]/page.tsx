import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PerfumeGrid } from "@/components/PerfumeGrid";
import { getCategoryWithSubcategories } from "@/lib/supabase/catalog";
import { getPerfumesByCategory } from "@/lib/supabase/perfumes";

type CatalogPageProps = {
  params: Promise<{ categoria: string }>;
};

export const dynamic = "force-dynamic";

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { categoria } = await params;
  const catalog = await getCategoryWithSubcategories(categoria);
  if (!catalog) {
    notFound();
  }

  const perfumes = await getPerfumesByCategory(categoria);

  return (
    <main className="home-canvas relative min-h-screen">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-8">
        <Link
          href="/"
          className="text-xs tracking-[0.28em] text-[#6d6259] uppercase transition hover:text-[#2b2420]"
        >
          ← Inicio
        </Link>

        <header className="mt-8 mb-12 text-center">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <Image
                src="/logo_olven.png"
                alt="OLVÉN"
                width={64}
                height={64}
                className="h-14 w-14 rounded-full object-cover sm:h-16 sm:w-16"
              />
              <span className="font-serif text-3xl tracking-[0.16em] text-[#1c1917] sm:text-5xl">
                OLVÉN
              </span>
            </div>
            <p className="font-serif text-sm italic tracking-[0.08em] text-[#6d6259] sm:text-xl">
              the art of fragance
            </p>
          </div>
          <h1 className="mt-3 font-serif text-4xl tracking-[0.14em] text-[#1c1917] sm:text-5xl">
            {catalog.category.label}
          </h1>
          {catalog.category.description ? (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 tracking-wide text-[#6d6259]">
              {catalog.category.description}
            </p>
          ) : null}
        </header>

        <PerfumeGrid perfumes={perfumes} subcategories={catalog.subcategories} />
      </div>
    </main>
  );
}
