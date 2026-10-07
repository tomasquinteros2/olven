import Image from "next/image";
import type { Perfume } from "@/types/perfume";

export function PerfumeCard({ perfume }: { perfume: Perfume }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white/55 shadow-[0_12px_30px_rgba(90,70,50,0.08)] ring-1 ring-black/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(90,70,50,0.14)]">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#efe6d9]">
        <Image
          src={perfume.image_url}
          alt={perfume.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-4 py-4 text-center">
        <h2 className="font-serif text-lg tracking-[0.12em] text-[#2b2420]">
          {perfume.name}
        </h2>
        {perfume.subtitle ? (
          <p className="mt-1 text-[10px] tracking-[0.18em] text-[#8d8178] uppercase">
            {perfume.subtitle}
          </p>
        ) : null}
      </div>
    </article>
  );
}
