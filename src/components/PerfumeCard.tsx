import Image from "next/image";
import type { Perfume } from "@/types/perfume";

export function PerfumeCard({ perfume }: { perfume: Perfume }) {
  return (
    <article className="group flex flex-col border-b border-[#2e2c29]/10 pb-6 transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe9e5]">
        <Image
          src={perfume.image_url}
          alt={perfume.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105 group-hover:-translate-y-1"
        />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center bg-gradient-to-t from-[#1e1d1b]/80 to-transparent px-4 pb-5 pt-12 transition duration-300 group-hover:translate-y-0">
          <span className="border-b border-[#d4b887] pb-2 text-[10px] tracking-[0.28em] text-white uppercase"><span className="ml-2 text-[#d4b887]"></span></span>
        </div>
      </div>
      <div className="px-1 pt-5">
        <p className="text-[9px] tracking-[0.28em] text-[#a18150] uppercase">OLVÉN fragrance</p>
        <h2 className="mt-2 font-serif text-2xl tracking-[0.02em] text-[#292725]">
          {perfume.name}
        </h2>
        {perfume.subtitle ? (
          <p className="mt-1 text-[10px] tracking-[0.16em] text-[#67635e] uppercase">
            {perfume.subtitle}
          </p>
        ) : null}
        {perfume.price !== null ? (
          <p className="mt-4 text-sm font-medium tracking-[0.08em] text-[#292725]">
            {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(perfume.price)}
          </p>
        ) : null}
      </div>
    </article>
  );
}
