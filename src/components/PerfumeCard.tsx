"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Perfume } from "@/types/perfume";

export function PerfumeCard({ perfume }: { perfume: Perfume }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <article className="group flex flex-col border-b border-[#2e2c29]/10 pb-6 transition duration-300 hover:-translate-y-1">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a18150] focus-visible:ring-offset-4"
          aria-label={`Ver detalles de ${perfume.name}`}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe9e5]">
            <Image
              src={perfume.image_url}
              alt={perfume.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition duration-700 group-hover:scale-105 group-hover:-translate-y-1"
            />
            <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center bg-gradient-to-t from-[#1e1d1b]/80 to-transparent px-4 pb-5 pt-12 transition duration-300 group-hover:translate-y-0">
              <span className="border-b border-[#d4b887] pb-2 text-[10px] tracking-[0.28em] text-white uppercase">
                Ver detalles
              </span>
            </div>
          </div>
          <div className="px-1 pt-5">
            <p className="text-[9px] tracking-[0.28em] text-[#a18150] uppercase">OLVÉN fragrance</p>
            <h2 className="mt-2 font-serif text-xl leading-none tracking-[0.02em] text-[#292725] sm:text-2xl">
              {perfume.name}
            </h2>
            {perfume.subtitle ? (
              <p className="mt-1 text-[9px] leading-4 tracking-[0.12em] text-[#67635e] uppercase sm:text-[10px] sm:tracking-[0.16em]">
                {perfume.subtitle}
              </p>
            ) : null}
            {perfume.price !== null ? (
              <p className="mt-4 text-sm font-medium tracking-[0.08em] text-[#292725]">
                {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(perfume.price)}
              </p>
            ) : null}
          </div>
        </button>
      </article>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e1d1b]/70 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`perfume-title-${perfume.id}`}
            className="modal-enter relative grid max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[#f8f7f4] shadow-[0_25px_80px_rgba(30,29,27,0.3)] sm:max-h-[90vh] sm:rounded-none sm:grid-cols-2"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f7f4]/90 text-xl text-[#292725] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a18150]"
              aria-label="Cerrar detalles"
            >
              ×
            </button>
            <div className="relative min-h-64 bg-[#ebe9e5] sm:min-h-[30rem]">
              <Image
                src={perfume.image_url}
                alt={perfume.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 pt-8 sm:p-10">
              <p className="text-[10px] tracking-[0.3em] text-[#a18150] uppercase">OLVÉN fragrance</p>
              <h2 id={`perfume-title-${perfume.id}`} className="mt-3 font-serif text-4xl leading-none text-[#292725] sm:text-5xl">
                {perfume.name}
              </h2>
              {perfume.subtitle ? <p className="mt-2 text-xs tracking-[0.16em] text-[#67635e] uppercase">{perfume.subtitle}</p> : null}
              <div className="mt-8 space-y-5 border-t border-[#2e2c29]/10 pt-6 text-sm text-[#67635e]">
                {perfume.occasion ? (
                  <div>
                    <p className="text-[10px] tracking-[0.22em] text-[#a18150] uppercase">Ocasión</p>
                    <p className="mt-1">{perfume.occasion}</p>
                  </div>
                ) : null}
                {perfume.notes.length > 0 ? (
                  <div>
                    <p className="text-[10px] tracking-[0.22em] text-[#a18150] uppercase">Notas olfativas</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {perfume.notes.map((note) => (
                        <span key={note} className="border border-[#a18150]/40 px-3 py-1 text-xs text-[#292725]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                {perfume.price !== null ? (
                  <div>
                    <p className="text-[10px] tracking-[0.22em] text-[#a18150] uppercase">Precio</p>
                    <p className="mt-1 text-base font-medium text-[#292725]">
                      {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(perfume.price)}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
