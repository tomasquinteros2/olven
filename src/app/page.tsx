import Image from "next/image";
import { CategoryMenu } from "@/components/CategoryMenu";
import { HomeDecor } from "@/components/HomeDecor";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="home-canvas relative min-h-screen overflow-hidden">
      <HomeDecor />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 py-10">
        <Image
          src="/logo_olven.png"
          alt="OLVÉN - The Art of Fragrance"
          width={500}
          height={500}
          priority
          className="h-64 w-64 rounded-full object-cover shadow-[0_18px_45px_rgba(45,35,25,0.16)] sm:h-80 sm:w-80"
        />

        <div className="mt-10 w-full sm:mt-12">
          <CategoryMenu />
        </div>
      </section>
    </main>
  );
}
