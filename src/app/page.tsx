import Image from "next/image";
import { CategoryMenu } from "@/components/CategoryMenu";
import { HomeDecor } from "@/components/HomeDecor";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="home-canvas relative min-h-screen overflow-hidden">
      <HomeDecor />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-5 py-8 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between border-b border-[#2e2c29]/10 pb-5">
          <span className="text-[10px] font-medium tracking-[0.42em] text-[#a18150] uppercase">Maison OLVÉN</span>
          <span className="hidden text-[10px] tracking-[0.3em] text-[#67635e] uppercase sm:block">The art of fragrance</span>
        </header>

        <div className="grid min-h-[72vh] items-center gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-20">
          <div className="max-w-xl">
            <p className="mb-6 text-[10px] font-medium tracking-[0.42em] text-[#a18150] uppercase">Perfumería de autor</p>
            <h1 className="font-serif text-6xl leading-[0.88] tracking-[-0.03em] text-[#292725] sm:text-8xl">
              El arte
              <span className="block italic text-[#a18150]">de sentir.</span>
            </h1>
            <p className="mt-8 max-w-md text-sm leading-7 tracking-wide text-[#67635e]">
              Una selección curada de fragancias para quienes convierten cada
              presencia en una firma inolvidable.
            </p>
            <a href="#colecciones" className="mt-10 inline-flex items-center gap-4 border-b border-[#a18150] pb-3 text-[11px] font-medium tracking-[0.28em] text-[#292725] uppercase transition hover:gap-6">
              Explorar colecciones
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-8 rounded-full border border-[#a18150]/30 sm:inset-16" />
            <Image
              src="/logo_olven.png"
              alt="OLVÉN - The Art of Fragrance"
              width={700}
              height={700}
              priority
              className="relative z-10 mx-auto aspect-square w-[78%] rounded-full object-cover shadow-[0_30px_80px_rgba(44,38,31,0.2)]"
            />
            <span className="absolute bottom-5 left-0 z-20 text-[10px] tracking-[0.32em] text-[#67635e] uppercase sm:bottom-12">01 / OLVÉN</span>
          </div>
        </div>

        <section id="colecciones" className="border-t border-[#2e2c29]/10 py-16 sm:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-[#a18150] uppercase">La colección</p>
              <h2 className="mt-3 font-serif text-4xl text-[#292725] sm:text-5xl">Encontrá tu esencia</h2>
            </div>
            <span className="hidden text-[10px] tracking-[0.25em] text-[#67635e] uppercase sm:block">03 universos olfativos</span>
          </div>
          <CategoryMenu />
        </section>
      </section>
    </main>
  );
}
