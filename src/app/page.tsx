import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-dm-sans)]">

      {/* Nav */}
      <nav className="flex justify-between items-center px-10 py-7 border-b border-[#1A1A18]/10">
        <span className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-widest">
          QLab
        </span>
        <ul className="flex gap-8 text-[13px] text-[#6B6B67] tracking-wide list-none">
          <li className="cursor-pointer hover:text-[#1A1A18] transition-colors">Work</li>
          <li className="cursor-pointer hover:text-[#1A1A18] transition-colors">About</li>
          <li className="cursor-pointer hover:text-[#1A1A18] transition-colors">Contact</li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="grid grid-cols-2 gap-10 px-10 pt-20 pb-16 items-end">
        <div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-[62px] font-light leading-[1.08] mb-6">
            Cinematic<br /><em>AI</em><br />Studio
          </h1>
          <p className="text-[12px] text-[#6B6B67] tracking-widest uppercase">
            Visual storytelling · AI Production
          </p>
        </div>
        <div className="rounded-md aspect-video overflow-hidden relative">
          <video
            src="/IA/videos/Movie.mov"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-4 left-4 text-[11px] tracking-widest text-white/60 uppercase">
            Showreel 2025
          </span>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-10 h-px bg-[#1A1A18]/10" />

      {/* Works */}
      <section className="px-10 py-12">
        <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-8">
          Selected work
        </p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "Golf Course", year: "2025 · Cinematic", img: "/IA/TutoyFrancesco.jpeg" },
            { title: "Carson", year: "2025 · Character", img: "/IA/Carson.png" },
            { title: "Tuto", year: "2025 · Portrait", img: "/IA/Tuto.png" },
          ].map((project) => (
            <div key={project.title} className="cursor-pointer group">
              <div className="aspect-[4/3] rounded overflow-hidden relative">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-3">
                <p className="text-[13px] font-normal">{project.title}</p>
                <p className="text-[11px] text-[#A8A8A4] tracking-wide">{project.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-10 py-7 border-t border-[#1A1A18]/10 flex justify-between items-center">
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">© 2025 QLab</span>
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">AI · Cinema · Story</span>
      </footer>

    </main>
  );
}