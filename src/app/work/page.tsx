"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Cinema AI", "Reels", "Web Pages"];

const projects = [
  {
    id: "fast-universe",
    title: "Fast Universe",
    year: "2025",
    category: "Cinema AI",
    description: "Un universo donde las carreras son el foco principal del entretenimiento.",
    video: "/IA/videos/FastUniverse_c.mp4",
    size: "large",
  },
  {
    id: "have-fun",
    title: "¡Have Fun!",
    year: "2025",
    category: "Cinema AI",
    description: "Un niño descubre un videojuego donde controla a su padre de vuelta a casa.",
    video: "/IA/videos/HaveFun_c.mp4",
    size: "small",
  },
  {
    id: "rot",
    title: "ROT",
    year: "2025",
    category: "Cinema AI",
    description: "Un detective persigue a un ser maligno que le tiende una trampa.",
    video: "/IA/videos/ROT_c.mp4",
    size: "small",
  },
  {
    id: "showreel",
    title: "Showreel 2025",
    year: "2025",
    category: "Reels",
    description: "Compilación de los mejores momentos cinematográficos de QLab.",
    video: "/IA/videos/showreel.mp4",
    size: "large",
  },
];

function VideoCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.8;
      videoRef.current.play();
    }
    setPlaying(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.pause();
    }
    setPlaying(false);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play(); setPlaying(true); }
    else { vid.pause(); setPlaying(false); }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (vid?.requestFullscreen) vid.requestFullscreen();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group bg-[#111]"
      style={{ aspectRatio: project.size === "large" ? "16/9" : "4/3" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={project.video}
        muted
        loop
        playsInline
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

      <div className="absolute top-4 left-4 flex gap-2">
        <span className="text-[10px] tracking-widest uppercase text-white/80 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm bg-black/20">
          {project.category}
        </span>
      </div>

      <span className="absolute top-4 right-4 text-[10px] tracking-widest text-white/40 uppercase">
        {project.year}
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[32px] font-light text-white leading-tight mb-1">
          {project.title}
        </h2>
        <p className="text-[12px] text-white/50 leading-relaxed mb-4 transition-all duration-300" style={{ opacity: hovered ? 1 : 0.6 }}>
          {project.description}
        </p>
        <div className="flex items-center justify-between transition-all duration-300" style={{ opacity: hovered ? 1 : 0 }}>
          <button onClick={togglePlay} className="flex items-center gap-2 text-white/70 text-[11px] tracking-widest uppercase hover:text-white transition-colors">
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="4" height="12" rx="1"/><rect x="8" y="1" width="4" height="12" rx="1"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M2 1.5l10 5.5-10 5.5V1.5z"/></svg>
            )}
            {playing ? "Pause" : "Play"}
          </button>
          <button onClick={handleFullscreen} className="flex items-center gap-2 text-white/70 text-[11px] tracking-widest uppercase hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M1 1h4V3H3v2H1V1zm8 0h4v4h-2V3H9V1zM1 9h2v2h2v2H1V9zm10 2h-2v2h4V9h-2v2z"/></svg>
            Fullscreen
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <main className="min-h-screen font-[family-name:var(--font-dm-sans)] bg-[#0D0D0D] text-white">

      {/* Header */}
      <div className="px-10 pt-28 pb-10 border-b border-white/10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-widest uppercase text-white/30 mb-4"
        >
          Selected work
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[family-name:var(--font-cormorant)] text-[52px] font-light leading-[1.1] mb-10"
        >
          Proyectos <em>QLab</em>
        </motion.h1>

        {/* Pill Nav */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-2 flex-wrap"
        >
          <div className="flex gap-2 bg-white/5 border border-white/10 rounded-full p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="relative px-5 py-2 text-[12px] tracking-wide rounded-full transition-colors duration-200"
                style={{ color: active === cat ? "#0D0D0D" : "rgba(255,255,255,0.5)" }}
              >
                {active === cat && (
                  <motion.div
                    layoutId="pill"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Grid */}
      <section className="px-10 py-10">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-32 text-white/30 text-[14px] tracking-wide"
            >
              No hay proyectos en esta categoría todavía.
            </motion.div>
          ) : (
            <motion.div key={active}>
              {filtered.length === 1 ? (
                <VideoCard project={filtered[0]} index={0} />
              ) : filtered.length === 2 ? (
                <div className="grid grid-cols-2 gap-4">
                  {filtered.map((p, i) => <VideoCard key={p.id} project={p} index={i} />)}
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <VideoCard project={filtered[0]} index={0} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {filtered.slice(1, 3).map((p, i) => <VideoCard key={p.id} project={p} index={i + 1} />)}
                  </div>
                  {filtered[3] && (
                    <div>
                      <VideoCard project={filtered[3]} index={3} />
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Footer */}
      <footer className="px-10 py-7 border-t border-white/10 flex justify-between items-center mt-10">
        <span className="text-[12px] text-white/30 tracking-wide">© 2025 QLab</span>
        <span className="text-[12px] text-white/30 tracking-wide">AI · Cinema · Story</span>
      </footer>

    </main>
  );
}