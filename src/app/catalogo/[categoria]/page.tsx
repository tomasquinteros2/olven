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
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-7 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#67635e] uppercase transition hover:text-[#a18150]"
        >
          <span aria-hidden="true">←</span> Volver a OLVÉN
        </Link>

        <header className="mt-12 mb-14 border-b border-[#2e2c29]/10 pb-12">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <Image
                src="/logo_olven.png"
                alt="OLVÉN"
                width={64}
                height={64}
                className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
              />
              <span className="font-serif text-3xl tracking-[0.1em] text-[#292725] sm:text-4xl">
                OLVÉN
              </span>
            </div>
            <p className="hidden text-[10px] tracking-[0.3em] text-[#67635e] uppercase sm:block">
              The art of fragrance
            </p>
          </div>
          <p className="mt-14 text-[10px] tracking-[0.35em] text-[#a18150] uppercase">Colección OLVÉN</p>
          <h1 className="mt-3 font-serif text-6xl tracking-[-0.02em] text-[#292725] sm:text-8xl">
            {catalog.category.label}
          </h1>
          {catalog.category.description ? (
            <p className="mt-5 max-w-xl text-sm leading-7 tracking-wide text-[#67635e]">
              {catalog.category.description}
            </p>
          ) : null}
        </header>

        <PerfumeGrid perfumes={perfumes} subcategories={catalog.subcategories} />
      </div>
    </main>
  );
}
