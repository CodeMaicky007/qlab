"use client";
import { motion } from "framer-motion";

const contacts = [
  {
    label: "Email",
    value: "ac.miguelangel.vega@gmail.com",
    href: "mailto:ac.miguelangel.vega@gmail.com",
  },
  {
    label: "Teléfono",
    value: "+34 660 38 14 13",
    href: "tel:+34660381413",
  },
  {
    label: "GitHub",
    value: "CodeMaicky007",
    href: "https://github.com/CodeMaicky007",
  },
  {
    label: "Vercel",
    value: "qlab-eight.vercel.app",
    href: "https://qlab-eight.vercel.app",
  },
];

export default function Contact() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-dm-sans)] bg-[#FAFAF8] dark:bg-[#0D0D0D] transition-colors duration-300">

      {/* Hero */}
      <section className="px-10 pt-40 pb-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-6"
        >
          Contact
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[80px] font-black leading-[1.0] mb-8 text-[#1A1A18] dark:text-white"
        >
          Hablemos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[16px] text-[#6B6B67] dark:text-white/50 max-w-md mx-auto leading-relaxed"
        >
          ¿Tienes un proyecto en mente? Estoy abierto a colaboraciones, encargos y nuevas ideas.
        </motion.p>
      </section>

      {/* Contactos */}
      <section className="px-10 py-20 max-w-3xl mx-auto">
        {contacts.map((contact, i) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex justify-between items-center py-8 border-b border-[#1A1A18]/10 dark:border-white/10 group no-underline"
          >
            <span className="text-[11px] tracking-widest uppercase text-[#A8A8A4]">
              {contact.label}
            </span>
            <span className="text-[18px] font-bold text-[#1A1A18] dark:text-white group-hover:text-[#6B6B67] dark:group-hover:text-white/50 transition-colors">
              {contact.value}
            </span>
          </motion.a>
        ))}
      </section>

      {/* CTA */}
      <section className="px-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#1A1A18] dark:bg-white rounded-2xl p-16 max-w-2xl mx-auto"
        >
          <h2 className="text-[42px] font-black text-white dark:text-[#1A1A18] mb-4">
            ¿Empezamos?
          </h2>
          <p className="text-[14px] text-white/60 dark:text-[#1A1A18]/60 mb-8">
            Mándame un correo y te respondo en menos de 24 horas.
          </p>
          <a
            href="mailto:ac.miguelangel.vega@gmail.com"
            className="inline-block text-[12px] tracking-widest uppercase bg-white dark:bg-[#1A1A18] text-[#1A1A18] dark:text-white px-8 py-3 rounded-full hover:opacity-80 transition-opacity no-underline font-bold"
          >
            Enviar email
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-10 py-7 border-t border-[#1A1A18]/10 dark:border-white/10 flex justify-between items-center">
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">© 2025 QLab</span>
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">AI · Cinema · Story</span>
      </footer>

    </main>
  );
}