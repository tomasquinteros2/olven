import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <main className="home-canvas flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-4xl tracking-[0.16em]">Categoría no encontrada</h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[#8d8178] px-6 py-3 text-sm tracking-[0.18em] text-white uppercase"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
