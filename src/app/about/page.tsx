import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-dm-sans)]">

      {/* Nav */}
      <nav className="flex justify-between items-center px-10 py-7 border-b border-[#1A1A18]/10">
        <Link href="/" className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-widest no-underline text-[#1A1A18]">
          QLab
        </Link>
        <ul className="flex gap-8 text-[13px] text-[#6B6B67] tracking-wide list-none">
          <li><Link href="/work" className="hover:text-[#1A1A18] transition-colors text-[#6B6B67] no-underline">Work</Link></li>
          <li><Link href="/about" className="text-[#1A1A18] no-underline">About</Link></li>
          <li><Link href="/contact" className="hover:text-[#1A1A18] transition-colors text-[#6B6B67] no-underline">Contact</Link></li>
        </ul>
      </nav>

      {/* Hero */}
      <div className="px-10 pt-16 pb-12 border-b border-[#1A1A18]/10 grid grid-cols-2 gap-16 items-end">
        <div>
          <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4">About</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-[52px] font-light leading-[1.1] mb-6">
            Miguel Ángel<br /><em>Vega González</em>
          </h1>
          <p className="text-[14px] text-[#6B6B67] leading-relaxed max-w-md">
            Técnico en Sistemas Microinformáticos y Redes con base en Electricidad y Electrónica. 
            Apasionado por la intersección entre tecnología y narrativa visual — construyo webs 
            y produzco contenido cinematográfico con inteligencia artificial.
          </p>
        </div>
        <div className="flex flex-col gap-4 pb-2">
          <div className="flex justify-between text-[13px] py-4 border-b border-[#1A1A18]/10">
            <span className="text-[#A8A8A4] tracking-wide uppercase text-[11px]">Ubicación</span>
            <span>España</span>
          </div>
          <div className="flex justify-between text-[13px] py-4 border-b border-[#1A1A18]/10">
            <span className="text-[#A8A8A4] tracking-wide uppercase text-[11px]">Disponibilidad</span>
            <span>Abierto a proyectos</span>
          </div>
          <div className="flex justify-between text-[13px] py-4 border-b border-[#1A1A18]/10">
            <span className="text-[#A8A8A4] tracking-wide uppercase text-[11px]">Experiencia</span>
            <span>1 año laboral</span>
          </div>
        </div>
      </div>

      {/* Estudios */}
      <div className="px-10 py-14 border-b border-[#1A1A18]/10 grid grid-cols-4 gap-10">
        <div>
          <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-6">Formación</p>
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-8">
          <div>
            <p className="text-[13px] font-normal mb-1">Sistemas Microinformáticos y Redes</p>
            <p className="text-[11px] text-[#A8A8A4] tracking-wide">2 años · Ciclo Formativo de Grado Medio</p>
            <p className="text-[12px] text-[#6B6B67] mt-2 leading-relaxed">
              Administración de redes, configuración de sistemas operativos, mantenimiento de equipos y soporte técnico.
            </p>
          </div>
          <div>
            <p className="text-[13px] font-normal mb-1">Electricidad y Electrónica</p>
            <p className="text-[11px] text-[#A8A8A4] tracking-wide">2 años · Ciclo Formativo de Grado Medio</p>
            <p className="text-[12px] text-[#6B6B67] mt-2 leading-relaxed">
              Instalaciones eléctricas, circuitos electrónicos, automatización y sistemas de control industrial.
            </p>
          </div>
        </div>
      </div>

      {/* Habilidades */}
      <div className="px-10 py-14 border-b border-[#1A1A18]/10 grid grid-cols-4 gap-10">
        <div>
          <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-6">Habilidades</p>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-6">
          {[
            { area: "Desarrollo Web", skills: ["Next.js", "React", "Tailwind CSS", "HTML & CSS", "Git & GitHub"] },
            { area: "IA & Producción", skills: ["Kling 3", "ElevenLabs", "Sync.so", "Claude AI", "Higgsfield Cinema"] },
            { area: "Sistemas & Redes", skills: ["Windows Server", "Linux", "Redes TCP/IP", "Soporte técnico", "Mantenimiento"] },
            { area: "Edición & Video", skills: ["DaVinci Resolve", "L-Cut & J-Cut", "Color Grading", "Exportación 4K"] },
            { area: "Diseño & Prototipado", skills: ["Figma", "Framer", "Cursor IDE"] },
            { area: "Electrónica", skills: ["Circuitos eléctricos", "Automatización", "PLC", "Instalaciones"] },
          ].map((block) => (
            <div key={block.area}>
              <p className="text-[12px] font-normal mb-3">{block.area}</p>
              <ul className="flex flex-col gap-1">
                {block.skills.map((s) => (
                  <li key={s} className="text-[12px] text-[#6B6B67]">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies */}
      <div className="px-10 py-14 border-b border-[#1A1A18]/10 grid grid-cols-4 gap-10">
        <div>
          <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-6">Intereses</p>
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-8">
          <div>
            <p className="text-[13px] font-normal mb-2">Creación de páginas web</p>
            <p className="text-[12px] text-[#6B6B67] leading-relaxed">
              Diseño y desarrollo de interfaces desde cero, explorando nuevas tecnologías y herramientas del ecosistema web moderno.
            </p>
          </div>
          <div>
            <p className="text-[13px] font-normal mb-2">Producción cinematográfica con IA</p>
            <p className="text-[12px] text-[#6B6B67] leading-relaxed">
              Creación de cortometrajes y contenido visual usando modelos de IA generativa, con especial interés en la estética cinematográfica de los años 70.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-10 py-7 border-t border-[#1A1A18]/10 flex justify-between items-center">
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">© 2025 QLab</span>
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">AI · Cinema · Story</span>
      </footer>

    </main>
  );
}