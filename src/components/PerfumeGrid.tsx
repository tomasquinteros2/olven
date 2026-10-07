import { PerfumeCard } from "@/components/PerfumeCard";
import type { Subcategory } from "@/types/catalog";
import type { Perfume } from "@/types/perfume";

export function PerfumeGrid({ perfumes, subcategories }: { perfumes: Perfume[]; subcategories: Subcategory[] }) {
  if (perfumes.length === 0) {
    return (
      <div className="rounded-3xl border border-[#d8cfc4] bg-white/40 px-6 py-16 text-center">
        <p className="font-serif text-2xl text-[#2b2420]">Catálogo en preparación</p>
        <p className="mt-3 text-sm tracking-wide text-[#6d6259]">
          Todavía no hay perfumes cargados en esta categoría.
        </p>
      </div>
    );
  }

  const groups = subcategories
    .map((subcategory) => ({
      id: subcategory.id,
      label: subcategory.label,
      perfumes: perfumes.filter((perfume) => perfume.subcategory_id === subcategory.id),
    }))
    .filter((group) => group.perfumes.length > 0);
  const ungrouped = perfumes.filter(
    (perfume) => !perfume.subcategory_id || !subcategories.some((item) => item.id === perfume.subcategory_id),
  );

  if (ungrouped.length > 0) {
    groups.push({ id: "uncategorized", label: "Otros perfumes", perfumes: ungrouped });
  }

  return (
    <div className="space-y-16">
      {groups.map((group, index) => (
        <section key={group.id} className="scroll-mt-8">
          <div className="mb-7 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-[#8d8178]/30 sm:block"
            />
            <div className="text-center">
              <p className="mb-1 text-[10px] tracking-[0.3em] text-[#8d8178] uppercase">
                {String(index + 1).padStart(2, "0")} · Selección
              </p>
              <h2 className="font-serif text-3xl tracking-[0.1em] text-[#2b2420] sm:text-4xl">
                {group.label}
              </h2>
              <p className="mt-1 text-[10px] tracking-[0.18em] text-[#8d8178] uppercase">
                {group.perfumes.length} {group.perfumes.length === 1 ? "fragancia" : "fragancias"}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-[#8d8178]/30 sm:block"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {group.perfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
