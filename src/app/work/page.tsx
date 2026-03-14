"use client";
import Link from "next/link";
import { useRef, useState } from "react";

const projects = [
  {
    id: "fast-universe",
    title: "Fast Universe",
    year: "2025",
    category: "Sci-Fi · Action",
    description: "Un universo donde las carreras son el foco principal del entretenimiento. Velocidad, adrenalina y libertad sin límites.",
    video: "/IA/videos/FastUniverse_c.mp4",
  },
  {
    id: "have-fun",
    title: "¡Have Fun!",
    year: "2025",
    category: "Drama · Comedy",
    description: "Un niño encuentra un casete antiguo y descubre un videojuego donde controla a su padre de vuelta a casa, enfrentando todo tipo de adversidades.",
    video: "/IA/videos/HaveFun_c.mp4",
  },
  {
    id: "rot",
    title: "ROT",
    year: "2025",
    category: "Thriller · Dark",
    description: "Un detective persigue a un ser maligno, sin saber que la cacería se ha invertido y él mismo es la presa.",
    video: "/IA/videos/ROT_c.mp4",
  },
  {
    id: "showreel",
    title: "Showreel 2025",
    year: "2025",
    category: "QLab · Reel",
    description: "Compilación de los mejores momentos cinematográficos producidos por QLab durante 2025.",
    video: "/IA/videos/showreel.mp4",
  },
];

function VideoCard({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setPlaying(true);
    } else {
      vid.pause();
      setPlaying(false);
    }
  };

  const handleFullscreen = () => {
    const vid = videoRef.current;
    if (vid?.requestFullscreen) vid.requestFullscreen();
  };

  return (
    <div className="aspect-video rounded overflow-hidden relative group/video">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />

      {/* Controles — aparecen al hover */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
        
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 text-white text-[11px] tracking-widest uppercase hover:text-white/70 transition-colors"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="1" width="4" height="12" rx="1"/>
              <rect x="8" y="1" width="4" height="12" rx="1"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M2 1.5l10 5.5-10 5.5V1.5z"/>
            </svg>
          )}
          {playing ? "Pause" : "Play"}
        </button>

        {/* Fullscreen */}
        <button
          onClick={handleFullscreen}
          className="flex items-center gap-2 text-white text-[11px] tracking-widest uppercase hover:text-white/70 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M1 1h4V3H3v2H1V1zm8 0h4v4h-2V3H9V1zM1 9h2v2h2v2H1V9zm10 2h-2v2h4V9h-2v2z"/>
          </svg>
          Fullscreen
        </button>

      </div>
    </div>
  );
}

export default function Work() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-dm-sans)]">

      {/* Nav */}
      <nav className="flex justify-between items-center px-10 py-7 border-b border-[#1A1A18]/10">
        <Link href="/" className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-widest no-underline text-[#1A1A18]">
          QLab
        </Link>
        <ul className="flex gap-8 text-[13px] text-[#6B6B67] tracking-wide list-none">
          <li><Link href="/work" className="text-[#1A1A18] no-underline">Work</Link></li>
          <li><Link href="/about" className="hover:text-[#1A1A18] transition-colors no-underline text-[#6B6B67]">About</Link></li>
          <li><Link href="/contact" className="hover:text-[#1A1A18] transition-colors no-underline text-[#6B6B67]">Contact</Link></li>
        </ul>
      </nav>

      {/* Header */}
      <div className="px-10 pt-16 pb-12 border-b border-[#1A1A18]/10">
        <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4">Selected work</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-[48px] font-light leading-[1.1]">
          Proyectos <em>QLab</em>
        </h1>
      </div>

      {/* Projects */}
      <section className="px-10 py-12 flex flex-col gap-0">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="grid grid-cols-2 gap-10 py-12 border-b border-[#1A1A18]/10 items-center group"
          >
            {i % 2 === 0 ? (
              <>
                <VideoCard src={project.video} />
                <div>
                  <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-3">{project.category} · {project.year}</p>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] font-light mb-4">{project.title}</h2>
                  <p className="text-[14px] text-[#6B6B67] leading-relaxed">{project.description}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-3">{project.category} · {project.year}</p>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] font-light mb-4">{project.title}</h2>
                  <p className="text-[14px] text-[#6B6B67] leading-relaxed">{project.description}</p>
                </div>
                <VideoCard src={project.video} />
              </>
            )}
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="px-10 py-7 border-t border-[#1A1A18]/10 flex justify-between items-center">
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">© 2025 QLab</span>
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">AI · Cinema · Story</span>
      </footer>

    </main>
  );
}