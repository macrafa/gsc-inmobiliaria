import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2 className="mb-2 text-xl font-bold text-ink">Prueba de paleta</h2>
        <p className="text-brand font-semibold">Texto en color brand (debe verse teal)</p>
        <button className="mt-3 rounded-md bg-brand px-3 py-1.5 font-semibold text-white hover:bg-brand-hover">
          Botón brand
        </button>      
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}