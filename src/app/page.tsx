"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import SplitText from "@/components/SplitText";
import RotatingText from "@/components/RotatingText";

const gallery = [
  "/IA/TutoyFrancesco.jpeg",
  "/IA/Carson.png",
  "/IA/Tuto.png",
  "/IA/Francesco.png",
  "/IA/Cesar.png",
  "/IA/TutoyFrancesco.jpeg",
  "/IA/Carson.png",
  "/IA/Tuto.png",
];

const proceso = [
  { num: "01", title: "Concepto", desc: "Definimos la narrativa, los personajes y el universo visual del proyecto." },
  { num: "02", title: "Generación", desc: "Producimos los assets visuales con modelos de IA — imágenes, voces y movimiento." },
  { num: "03", title: "Edición", desc: "Montamos, colorizamos y sincronizamos en DaVinci Resolve con técnicas cinematográficas." },
  { num: "04", title: "Entrega", desc: "Exportamos en la resolución y formato adecuados para cada plataforma." },
];

const herramientas = [
  {
    name: "Framer",
    category: "Diseño web",
    desc: "Webs de alta fidelidad con animaciones fluidas.",
    img: "/img/1.framer.png",
    // ocupa 2 columnas arriba a la izquierda
    gridClass: "col-span-2 row-span-1",
  },
  {
    name: "Higgsfield",
    category: "IA cinematográfica",
    desc: "Imágenes y videos con estética de cine real.",
    img: "/img/2.higgsfield.png",
    gridClass: "col-span-1 row-span-2",
  },
  {
    name: "Claude AI",
    category: "Narrativa & código",
    desc: "Narrativas, guiones y código con el mejor modelo del mercado.",
    img: "/img/3.claude.jpg",
    gridClass: "col-span-1 row-span-1",
  },
  {
    name: "Kling 3.0",
    category: "Generación de video",
    desc: "Video cinematográfico 4K con IA en segundos.",
    img: "/img/4.kling3.0.png",
    gridClass: "col-span-2 row-span-1",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const gap = 10;
    const curve = 15;

    function getWidth(gap: number) { return 1 + gap / 100; }

    function getPlaneWidth(el: HTMLElement, camera: THREE.PerspectiveCamera) {
      const vFov = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(vFov / 2) * camera.position.z;
      const aspect = el.clientWidth / el.clientHeight;
      const width = height * aspect;
      return el.clientWidth / width;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 20);
    camera.position.z = 1.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    el.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(1, 0.65, 20, 20);
    const planeSpace = getPlaneWidth(el, camera) * getWidth(gap);
    const totalImage = Math.ceil(el.clientWidth / planeSpace) + 1 + gallery.length;
    const initialOffset = Math.ceil(el.clientWidth / (2 * planeSpace) - 0.5);

    const allImages: string[] = [...gallery];
    for (let i = gallery.length; i < totalImage; i++) {
      allImages.push(gallery[i % gallery.length]);
    }

    const planes: THREE.Mesh[] = [];

    allImages.forEach((image, i) => {
      const loader = new THREE.TextureLoader();
      loader.load(image, (texture) => {
        const material = new THREE.ShaderMaterial({
          uniforms: { tex: { value: texture }, curve: { value: curve } },
          transparent: true,
          vertexShader: `
            uniform float curve;
            varying vec2 vertexUV;
            void main(){
              vertexUV = uv;
              vec3 newPosition = position;
              float distanceFromCenter = abs(modelMatrix*vec4(position, 1.0)).x;
              newPosition.y *= 1.0 + (curve/100.0)*pow(distanceFromCenter,2.0);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D tex;
            varying vec2 vertexUV;
            void main(){
              vec2 uv = vertexUV;
              float radius = 0.06;
              vec2 d = abs(uv - 0.5) - (0.5 - radius);
              float dist = length(max(d, 0.0)) - radius;
              float alpha = 1.0 - smoothstep(-0.005, 0.005, dist);
              vec4 color = texture2D(tex, uv);
              gl_FragColor = vec4(color.rgb, color.a * alpha);
            }
          `,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = -1 * (i - initialOffset) * getWidth(gap);
        mesh.frustumCulled = false;
        planes.push(mesh);
        scene.add(mesh);
      });
    });

    let previousScrollY = window.scrollY;
    let smoothedScroll = window.scrollY;
    let rafId: number;

    const animate = () => {
      smoothedScroll += (window.scrollY - smoothedScroll) * 0.1;
      const scrollDelta = smoothedScroll - previousScrollY;
      const direction = scrollDelta > 0 ? 1 : -1;
      const deltaAmount = Math.abs(scrollDelta) * 0.01;
      const planeWidth = getWidth(gap);
      const loopWidth = planeWidth * planes.length;

      planes.forEach((plane) => {
        plane.position.x += direction * deltaAmount;
        if (plane.position.x > loopWidth / 2) plane.position.x -= loopWidth;
        else if (plane.position.x < -loopWidth / 2) plane.position.x += loopWidth;
      });

      previousScrollY = smoothedScroll;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <main className="font-[family-name:var(--font-dm-sans)] bg-[#FAFAF8] dark:bg-[#0D0D0D] transition-colors duration-300">

      {/* ── HERO ── */}
      <section className="flex flex-col items-center justify-center text-center px-10 pt-44 pb-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4"
        >
          Visual storytelling · AI Production
        </motion.p>
        <h1 className="text-[80px] font-black leading-[1.0] mb-4 text-[#1A1A18] dark:text-white">
          <SplitText text="Cinematic AI Studio" delay={0.08} startDelay={1.2} />
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[13px] text-[#6B6B67] dark:text-white/50 max-w-md leading-relaxed mb-8"
        >
          QLab produce contenido cinematográfico con inteligencia artificial.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link
            href="/work"
            className="text-[12px] tracking-widest uppercase text-[#1A1A18] dark:text-white border border-[#1A1A18]/30 dark:border-white/30 px-8 py-3 rounded-full hover:bg-[#1A1A18] dark:hover:bg-white hover:text-white dark:hover:text-[#0D0D0D] transition-all duration-300 no-underline"
          >
            Ver proyectos
          </Link>
        </motion.div>
      </section>

      {/* ── CARRUSEL 3D ── */}
      <div
        ref={containerRef}
        className="w-full relative"
        style={{ height: "70vh", overflow: "visible" }}
      />

      {/* ── PROCESO ── */}
      <section
        style={{ minHeight: "100vh" }}
        className="flex flex-col items-center justify-center px-10 text-center border-t border-[#1A1A18]/10 dark:border-white/10 bg-[#FAFAF8] dark:bg-[#0D0D0D]"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-6"
        >
          Cómo trabajamos
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[64px] font-black leading-[1.0] text-[#1A1A18] dark:text-white flex items-center gap-4 flex-wrap justify-center"
        >
          El proceso de
          <RotatingText
            texts={["Concepto", "Generación", "Edición", "Entrega"]}
            mainClassName="text-[64px] font-black italic text-[#1A1A18] dark:text-white overflow-hidden"
            splitLevelClassName="overflow-hidden"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.h2>
      </section>

      {proceso.map((step, i) => (
        <section
          key={step.num}
          style={{ minHeight: "100vh" }}
          className={`flex items-center px-20 border-t border-[#1A1A18]/10 dark:border-white/10 bg-[#FAFAF8] dark:bg-[#0D0D0D] ${
            i % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <p className="text-[11px] tracking-widest uppercase mb-6 text-[#A8A8A4]">
              {step.num}
            </p>
            <h3 className="text-[72px] font-black leading-[1.0] mb-6 text-[#1A1A18] dark:text-white">
              {step.title}
            </h3>
            <p className="text-[16px] leading-relaxed text-[#6B6B67] dark:text-white/50">
              {step.desc}
            </p>
          </motion.div>
        </section>
      ))}

      {/* ── HERRAMIENTAS — BENTO ── */}
      <section className="border-t border-[#1A1A18]/10 dark:border-white/10 bg-[#FAFAF8] dark:bg-[#0D0D0D] px-8 py-24">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4"
          >
            Stack tecnológico
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-[64px] font-black text-[#1A1A18] dark:text-white"
          >
            Herramientas
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "340px 340px",
            gap: "12px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {herramientas.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={tool.gridClass}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(26,26,24,0.08)",
                cursor: "pointer",
              }}
            >
              {/* Imagen de fondo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.img}
                alt={tool.name}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                }}
                className="bento-img"
              />

              {/* Overlay degradado */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                  zIndex: 1,
                }}
              />

              {/* Texto sobre la imagen */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "28px",
                  zIndex: 2,
                }}
              >
                <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "6px" }}>
                  {tool.category}
                </p>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "white", marginBottom: "6px", lineHeight: 1.1 }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                  {tool.desc}
                </p>
              </div>

              {/* Hover scale en imagen */}
              <style>{`
                .bento-img { transform: scale(1); }
                *:hover > .bento-img { transform: scale(1.05); }
              `}</style>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-10 py-7 border-t border-[#1A1A18]/10 dark:border-white/10 flex justify-between items-center bg-[#FAFAF8] dark:bg-[#0D0D0D]">
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">© 2025 QLab</span>
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">AI · Cinema · Story</span>
      </footer>

    </main>
  );
}