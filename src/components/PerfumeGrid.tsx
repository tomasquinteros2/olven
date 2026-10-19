"use client";

import { useMemo, useState } from "react";
import { PerfumeCard } from "@/components/PerfumeCard";
import type { Subcategory } from "@/types/catalog";
import type { Perfume } from "@/types/perfume";

export function PerfumeGrid({ perfumes, subcategories }: { perfumes: Perfume[]; subcategories: Subcategory[] }) {
  const [search, setSearch] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [occasion, setOccasion] = useState("");
  const [note, setNote] = useState("");
  const occasions = useMemo(
    () => Array.from(new Set(perfumes.map((perfume) => perfume.occasion).filter((value): value is string => Boolean(value)))).sort(),
    [perfumes],
  );
  const notes = useMemo(
    () => Array.from(new Set(perfumes.flatMap((perfume) => perfume.notes))).sort(),
    [perfumes],
  );
  const filteredPerfumes = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return perfumes.filter((perfume) => {
      const searchable = [perfume.name, perfume.subtitle, perfume.occasion, ...perfume.notes]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();
      return (
        (!normalizedSearch || searchable.includes(normalizedSearch)) &&
        (!subcategory || perfume.subcategory_id === subcategory) &&
        (!occasion || perfume.occasion === occasion) &&
        (!note || perfume.notes.includes(note))
      );
    });
  }, [note, occasion, perfumes, search, subcategory]);

  const clearFilters = () => {
    setSearch("");
    setSubcategory("");
    setOccasion("");
    setNote("");
  };

  if (perfumes.length === 0) {
    return (
      <div className="border border-[#2e2c29]/10 bg-white/35 px-6 py-20 text-center">
        <p className="font-serif text-3xl text-[#292725]">Catálogo en preparación</p>
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
      perfumes: filteredPerfumes.filter((perfume) => perfume.subcategory_id === subcategory.id),
    }))
    .filter((group) => group.perfumes.length > 0);
  const ungrouped = filteredPerfumes.filter(
    (perfume) => !perfume.subcategory_id || !subcategories.some((item) => item.id === perfume.subcategory_id),
  );

  if (ungrouped.length > 0) {
    groups.push({ id: "uncategorized", label: "Otros perfumes", perfumes: ungrouped });
  }

  return (
    <div className="space-y-14">
      <section aria-label="Buscar y filtrar perfumes" className="border-y border-[#2e2c29]/10 py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#a18150]" aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar en la colección..." aria-label="Buscar perfumes" className="w-full border-b border-[#2e2c29]/20 bg-transparent py-3 pl-7 text-sm outline-none transition placeholder:text-[#96918a] focus:border-[#a18150]" />
          </div>
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-3 text-[10px] font-medium tracking-[0.25em] text-[#292725] uppercase [&::-webkit-details-marker]:hidden">
              <span className="border border-[#2e2c29]/20 px-4 py-3 transition group-open:border-[#a18150]">Filtrar <span className="ml-3 text-[#a18150]">+</span></span>
            </summary>
            <div className="mt-4 grid gap-3 border border-[#2e2c29]/10 bg-[#f8f7f4] p-4 sm:grid-cols-3 lg:absolute lg:right-0 lg:z-20 lg:w-[560px] lg:shadow-[0_20px_50px_rgba(40,35,29,0.12)]">
              <select value={subcategory} onChange={(event) => setSubcategory(event.target.value)} aria-label="Filtrar por subcategoría o género" className="border border-[#2e2c29]/15 bg-transparent px-3 py-3 text-xs outline-none focus:border-[#a18150]">
                <option value="">Subcategoría</option>
                {subcategories.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
              <select value={occasion} onChange={(event) => setOccasion(event.target.value)} aria-label="Filtrar por ocasión" className="border border-[#2e2c29]/15 bg-transparent px-3 py-3 text-xs outline-none focus:border-[#a18150]">
                <option value="">Ocasión</option>
                {occasions.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <select value={note} onChange={(event) => setNote(event.target.value)} aria-label="Filtrar por nota" className="border border-[#2e2c29]/15 bg-transparent px-3 py-3 text-xs outline-none focus:border-[#a18150]">
                <option value="">Nota olfativa</option>
                {notes.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <button type="button" onClick={clearFilters} className="border border-[#a18150] px-3 py-3 text-[10px] tracking-[0.2em] text-[#292725] uppercase transition hover:bg-[#a18150] hover:text-white sm:col-span-3">Limpiar filtros</button>
            </div>
          </details>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          <button type="button" onClick={() => setSubcategory("")} className={`whitespace-nowrap px-4 py-2 text-[10px] tracking-[0.18em] uppercase transition ${!subcategory ? "bg-[#292725] text-white" : "border border-[#2e2c29]/15 text-[#67635e] hover:border-[#a18150]"}`}>Todo</button>
          {subcategories.map((item) => (
            <button type="button" key={item.id} onClick={() => setSubcategory(item.id)} className={`whitespace-nowrap px-4 py-2 text-[10px] tracking-[0.18em] uppercase transition ${subcategory === item.id ? "bg-[#292725] text-white" : "border border-[#2e2c29]/15 text-[#67635e] hover:border-[#a18150]"}`}>{item.label}</button>
          ))}
        </div>
        <p className="mt-4 text-[10px] tracking-[0.22em] text-[#a18150] uppercase">{filteredPerfumes.length} {filteredPerfumes.length === 1 ? "perfume encontrado" : "perfumes encontrados"}</p>
      </section>

      {filteredPerfumes.length === 0 ? (
        <div className="border border-[#2e2c29]/10 bg-white/35 px-6 py-20 text-center">
          <p className="font-serif text-3xl text-[#292725]">No encontramos perfumes</p>
          <p className="mt-3 text-sm tracking-wide text-[#6d6259]">Probá cambiar los filtros o el texto de búsqueda.</p>
        </div>
      ) : null}

      <div className="space-y-16">
      {groups.map((group, index) => (
        <section key={group.id} className="scroll-mt-8">
          <div className="mb-8 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-[#2e2c29]/15 sm:block"
            />
            <div className="text-center">
              <p className="mb-1 text-[10px] tracking-[0.3em] text-[#a18150] uppercase">
                {String(index + 1).padStart(2, "0")} · Selección
              </p>
              <h2 className="font-serif text-3xl tracking-[0.02em] text-[#292725] sm:text-4xl">
                {group.label}
              </h2>
              <p className="mt-1 text-[10px] tracking-[0.18em] text-[#67635e] uppercase">
                {group.perfumes.length} {group.perfumes.length === 1 ? "fragancia" : "fragancias"}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-[#2e2c29]/15 sm:block"
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
    </div>
  );
}
