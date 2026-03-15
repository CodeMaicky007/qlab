"use client";
import { motion } from "framer-motion";

const skills = [
  { area: "Desarrollo Web", items: ["Next.js", "React", "Tailwind CSS", "HTML & CSS", "Git & GitHub"] },
  { area: "IA & Producción", items: ["Kling 3", "ElevenLabs", "Sync.so", "Claude AI", "Higgsfield Cinema"] },
  { area: "Sistemas & Redes", items: ["Windows Server", "Linux", "Redes TCP/IP", "Soporte técnico", "Mantenimiento"] },
  { area: "Edición & Video", items: ["DaVinci Resolve", "L-Cut & J-Cut", "Color Grading", "Exportación 4K"] },
  { area: "Diseño & Prototipado", items: ["Figma", "Framer", "Cursor IDE"] },
  { area: "Electrónica", items: ["Circuitos eléctricos", "Automatización", "PLC", "Instalaciones"] },
];

export default function About() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-dm-sans)] bg-[#FAFAF8] dark:bg-[#0D0D0D] transition-colors duration-300">

      {/* Hero */}
      <section className="px-10 pt-40 pb-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-6"
        >
          About
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-[family-name:var(--font-cormorant)] text-[80px] font-light leading-[1.0] mb-8 text-[#1A1A18] dark:text-white"
        >
          Miguel Ángel<br /><em>Vega González</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[16px] text-[#6B6B67] dark:text-white/50 max-w-xl mx-auto leading-relaxed"
        >
          Técnico en Sistemas Microinformáticos y Redes con base en Electricidad y Electrónica. 
          Apasionado por la intersección entre tecnología y narrativa visual.
        </motion.p>
      </section>

      {/* Stats */}
      <section className="px-10 pb-32">
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { num: "1", label: "Año de experiencia laboral" },
            { num: "4", label: "Años de formación técnica" },
            { num: "4+", label: "Proyectos cinematográficos" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-white/5 rounded-2xl p-8 text-center shadow-sm border border-[#1A1A18]/5 dark:border-white/10"
            >
              <p className="font-[family-name:var(--font-cormorant)] text-[56px] font-light text-[#1A1A18] dark:text-white leading-none mb-2">{stat.num}</p>
              <p className="text-[12px] text-[#A8A8A4] tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bio */}
      <section className="px-10 py-32 bg-white dark:bg-white/5 border-y border-[#1A1A18]/5 dark:border-white/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-6">Quién soy</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[42px] font-light leading-[1.1] text-[#1A1A18] dark:text-white mb-6">
              Tecnología &<br /><em>narrativa visual</em>
            </h2>
            <p className="text-[14px] text-[#6B6B67] dark:text-white/50 leading-relaxed">
              Construyo webs y produzco contenido cinematográfico con inteligencia artificial, 
              combinando conocimientos técnicos de redes y electrónica con una visión creativa 
              inspirada en la estética cinematográfica de los años 70.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col gap-0"
          >
            {[
              { label: "Ubicación", value: "España" },
              { label: "Disponibilidad", value: "Abierto a proyectos" },
              { label: "Experiencia", value: "1 año laboral" },
              { label: "Especialidad", value: "IA · Web · Cinema" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-5 border-b border-[#1A1A18]/10 dark:border-white/10">
                <span className="text-[11px] tracking-widest uppercase text-[#A8A8A4]">{item.label}</span>
                <span className="text-[13px] text-[#1A1A18] dark:text-white">{item.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Formación */}
      <section className="px-10 py-32">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4 text-center"
          >
            Formación
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-[family-name:var(--font-cormorant)] text-[48px] font-light text-center text-[#1A1A18] dark:text-white mb-16"
          >
            Base <em>técnica</em>
          </motion.h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                title: "Sistemas Microinformáticos y Redes",
                duration: "2 años · CFGM",
                desc: "Administración de redes, configuración de sistemas operativos, mantenimiento de equipos y soporte técnico.",
              },
              {
                title: "Electricidad y Electrónica",
                duration: "2 años · CFGM",
                desc: "Instalaciones eléctricas, circuitos electrónicos, automatización y sistemas de control industrial.",
              },
            ].map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-white/5 rounded-2xl p-8 shadow-sm border border-[#1A1A18]/5 dark:border-white/10 hover:shadow-md transition-shadow"
              >
                <p className="text-[15px] font-normal mb-2 text-[#1A1A18] dark:text-white">{e.title}</p>
                <p className="text-[11px] text-[#A8A8A4] tracking-wide mb-4">{e.duration}</p>
                <p className="text-[12px] text-[#6B6B67] dark:text-white/50 leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Habilidades */}
      <section className="px-10 py-32 bg-white dark:bg-white/5 border-y border-[#1A1A18]/5 dark:border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4 text-center"
          >
            Habilidades
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-[family-name:var(--font-cormorant)] text-[48px] font-light text-center text-[#1A1A18] dark:text-white mb-16"
          >
            Stack <em>completo</em>
          </motion.h2>
          <div className="grid grid-cols-3 gap-6">
            {skills.map((block, i) => (
              <motion.div
                key={block.area}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-[#FAFAF8] dark:bg-[#0D0D0D] rounded-2xl p-6 border border-[#1A1A18]/5 dark:border-white/10 hover:border-[#1A1A18]/20 dark:hover:border-white/20 transition-colors"
              >
                <p className="text-[13px] font-normal mb-4 text-[#1A1A18] dark:text-white">{block.area}</p>
                <ul className="flex flex-col gap-2">
                  {block.items.map((s) => (
                    <li key={s} className="text-[12px] text-[#6B6B67] dark:text-white/50 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#A8A8A4] inline-block flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intereses */}
      <section className="px-10 py-32">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4 text-center"
          >
            Intereses
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-[family-name:var(--font-cormorant)] text-[48px] font-light text-center text-[#1A1A18] dark:text-white mb-16"
          >
            Lo que me <em>mueve</em>
          </motion.h2>
          <div className="grid grid-cols-2 gap-8">
            {[
              {
                title: "Creación de páginas web",
                desc: "Diseño y desarrollo de interfaces desde cero, explorando nuevas tecnologías y herramientas del ecosistema web moderno.",
              },
              {
                title: "Producción cinematográfica con IA",
                desc: "Creación de cortometrajes y contenido visual usando modelos de IA generativa, con especial interés en la estética cinematográfica de los años 70.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-white/5 rounded-2xl p-10 shadow-sm border border-[#1A1A18]/5 dark:border-white/10 hover:shadow-md transition-shadow"
              >
                <p className="font-[family-name:var(--font-cormorant)] text-[32px] font-light mb-4 text-[#1A1A18] dark:text-white">{item.title}</p>
                <p className="text-[13px] text-[#6B6B67] dark:text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-10 py-7 border-t border-[#1A1A18]/10 dark:border-white/10 flex justify-between items-center">
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">© 2025 QLab</span>
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">AI · Cinema · Story</span>
      </footer>

    </main>
  );
}