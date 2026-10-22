import Image from "next/image";
import { CategoryMenu } from "@/components/CategoryMenu";
import { HomeDecor } from "@/components/HomeDecor";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="home-canvas relative min-h-screen overflow-hidden">
      <HomeDecor />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-5 py-6 sm:px-10 sm:py-8 lg:px-16">
        <header className="flex items-center justify-between border-b border-[#2e2c29]/10 pb-4 sm:pb-5">
          <span className="text-[9px] font-medium tracking-[0.3em] text-[#a18150] uppercase sm:text-[10px] sm:tracking-[0.42em]">Maison OLVÉN</span>
          <span className="hidden text-[10px] tracking-[0.3em] text-[#67635e] uppercase sm:block">The art of fragrance</span>
        </header>

        <div className="grid items-center gap-10 py-12 sm:gap-12 sm:py-14 lg:min-h-[72vh] lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-20">
          <div className="max-w-xl">
            <p className="mb-5 text-[9px] font-medium tracking-[0.3em] text-[#a18150] uppercase sm:mb-6 sm:text-[10px] sm:tracking-[0.42em]">Perfumería de autor</p>
            <h1 className="font-serif text-[4.25rem] leading-[0.88] tracking-[-0.04em] text-[#292725] sm:text-8xl">
              El arte
              <span className="block italic text-[#a18150]">de sentir.</span>
            </h1>
            <p className="mt-6 max-w-md text-[13px] leading-6 tracking-wide text-[#67635e] sm:mt-8 sm:text-sm sm:leading-7">
              Una selección curada de fragancias para quienes convierten cada
              presencia en una firma inolvidable.
            </p>
            <a href="#colecciones" className="mt-8 inline-flex min-h-11 items-center gap-4 border-b border-[#a18150] pb-3 text-[10px] font-medium tracking-[0.22em] text-[#292725] uppercase transition hover:gap-6 sm:mt-10 sm:text-[11px] sm:tracking-[0.28em]">
              Explorar colecciones
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-5 rounded-full border border-[#a18150]/30 sm:inset-16" />
            <Image
              src="/logo_olven.png"
              alt="OLVÉN - The Art of Fragrance"
              width={700}
              height={700}
              priority
              className="relative z-10 mx-auto aspect-square w-[68%] rounded-full object-cover shadow-[0_30px_80px_rgba(44,38,31,0.2)] sm:w-[78%]"
            />
            <span className="absolute bottom-2 left-0 z-20 text-[9px] tracking-[0.25em] text-[#67635e] uppercase sm:bottom-12 sm:text-[10px] sm:tracking-[0.32em]">01 / OLVÉN</span>
          </div>
        </div>

        <section id="colecciones" className="border-t border-[#2e2c29]/10 py-12 sm:py-24">
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-[#a18150] uppercase">La colección</p>
              <h2 className="mt-3 font-serif text-4xl leading-none text-[#292725] sm:text-5xl">Encontrá tu esencia</h2>
            </div>
            <span className="hidden text-[10px] tracking-[0.25em] text-[#67635e] uppercase sm:block">03 universos olfativos</span>
          </div>
          <CategoryMenu />
        </section>
      </section>
    </main>
  );
}
