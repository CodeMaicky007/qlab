import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-dm-sans)] flex flex-col items-center justify-center text-center px-10">
      <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4">Error 404</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-[280px] font-light leading-[1.0] mb-4 text-[#1A1A18] dark:text-white">
        404
      </h1>
      <p className="text-[20px] text-[#6B6B67] dark:text-white/50 max-w-sm leading-relaxed mb-8">
       Me da a mi que tu no sabes ni donde te metes.
      </p>
      <Link
        href="/"
        className="text-[12px] tracking-widest uppercase text-[#1A1A18] dark:text-white border border-[#1A1A18]/30 dark:border-white/30 px-8 py-3 rounded-full hover:bg-[#1A1A18] dark:hover:bg-white hover:text-white dark:hover:text-[#0D0D0D] transition-all duration-300 no-underline"
      >
        Volver al inicio
      </Link>
    </main>
  );
}