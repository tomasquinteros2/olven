import Link from "next/link";

export default function NotFound() {
  return (
    <main className="home-canvas flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] tracking-[0.5em] text-[#6d6259] uppercase">OLVÉN</p>
      <h1 className="mt-4 font-serif text-4xl tracking-[0.16em]">Página no encontrada</h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[#8d8178] px-6 py-3 text-sm tracking-[0.18em] text-white uppercase"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
