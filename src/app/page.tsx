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
        <div className="bg-[#F0EEE9] rounded-md aspect-video flex items-center justify-center relative group cursor-pointer hover:bg-[#E5E3DD] transition-colors">
          <div className="w-11 h-11 rounded-full border border-[#1A1A18]/25 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[12px] border-l-[#6B6B67] ml-1" />
          </div>
          <span className="absolute bottom-4 left-4 text-[11px] tracking-widest text-[#A8A8A4] uppercase">
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
            { title: "The Void", year: "2025 · Short film", w: "60%" },
            { title: "Golf Course", year: "2025 · Cinematic", w: "30%" },
            { title: "Project 03", year: "2025 · Upcoming", w: "45%" },
          ].map((project) => (
            <div key={project.title} className="cursor-pointer group">
              <div className="aspect-[4/3] bg-[#F0EEE9] rounded group-hover:bg-[#E5E3DD] transition-colors flex items-center justify-center">
                <div className="h-px bg-[#1A1A18]/25" style={{ width: project.w }} />
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