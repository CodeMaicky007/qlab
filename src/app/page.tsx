"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Image from "next/image";
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
    desc: "Creamos prototipos y webs de alta fidelidad con animaciones fluidas y diseño profesional sin escribir una sola línea de CSS.",
    img: "/img/1.framer.png",
  },
  {
    name: "Higgsfield Cinema",
    category: "IA cinematográfica",
    desc: "Generamos imágenes y videos con estética de cine real — iluminación, color y composición de nivel profesional usando IA.",
    img: "/img/2.higgsfield.png",
  },
  {
    name: "Claude AI",
    category: "Narrativa & código",
    desc: "Desarrollamos narrativas, guiones y código de producción con el modelo de IA más avanzado del mercado.",
    img: "/img/3.claude.jpg",
  },
  {
    name: "Kling 3.0",
    category: "Generación de video",
    desc: "Producimos video cinematográfico con IA — movimiento de cámara, personajes consistentes y calidad 4K en segundos.",
    img: "/img/4.kling3.0.png",
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
    <main className="font-[family-name:var(--font-dm-sans)] bg-[#FAFAF8] dark:bg-[#0D0D0D] transition-colors duration-300" style={{ minHeight: "200vh" }}>

      {/* Hero */}
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

      {/* Canvas Three.js */}
      <div
        ref={containerRef}
        className="w-full relative"
        style={{ height: "70vh", overflow: "visible" }}
      />

      {/* Proceso */}
      <section className="px-10 py-20 border-t border-[#1A1A18]/10 dark:border-white/10">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4">Cómo trabajamos</p>
          <h2 className="text-[48px] font-black leading-[1.1] text-[#1A1A18] dark:text-white flex items-center justify-center gap-3 flex-wrap">
            El proceso de
            <RotatingText
              texts={["Concepto", "Generación", "Edición", "Entrega"]}
              mainClassName="text-[48px] font-black italic text-[#1A1A18] dark:text-white overflow-hidden"
              splitLevelClassName="overflow-hidden"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {proceso.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border-t border-[#1A1A18]/10 dark:border-white/10 pt-6"
            >
              <p className="text-[11px] tracking-widest text-[#A8A8A4] mb-4">{step.num}</p>
              <h3 className="text-[24px] font-bold mb-3 text-[#1A1A18] dark:text-white">{step.title}</h3>
              <p className="text-[12px] text-[#6B6B67] dark:text-white/50 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Herramientas — layout alternado */}
      <section className="border-t border-[#1A1A18]/10 dark:border-white/10">
        <div className="px-10 py-20">
          <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-3">Stack tecnológico</p>
          <h2 className="text-[42px] font-black leading-[1.1] text-[#1A1A18] dark:text-white mb-20">
            Herramientas
          </h2>
        </div>

        {herramientas.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={`grid grid-cols-2 border-t border-[#1A1A18]/10 dark:border-white/10 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}
          >
            {i % 2 === 0 ? (
              <>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F0EEE9] dark:bg-white/5">
                  <Image
                    src={tool.img}
                    alt={tool.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex flex-col justify-center px-16 py-16">
                  <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4">{tool.category}</p>
                  <h3 className="text-[42px] font-black text-[#1A1A18] dark:text-white mb-6">{tool.name}</h3>
                  <p className="text-[14px] text-[#6B6B67] dark:text-white/50 leading-relaxed">{tool.desc}</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center px-16 py-16">
                  <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4">{tool.category}</p>
                  <h3 className="text-[42px] font-black text-[#1A1A18] dark:text-white mb-6">{tool.name}</h3>
                  <p className="text-[14px] text-[#6B6B67] dark:text-white/50 leading-relaxed">{tool.desc}</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F0EEE9] dark:bg-white/5">
                  <Image
                    src={tool.img}
                    alt={tool.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </>
            )}
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="px-10 py-7 border-t border-[#1A1A18]/10 dark:border-white/10 flex justify-between items-center">
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">© 2025 QLab</span>
        <span className="text-[12px] text-[#A8A8A4] tracking-wide">AI · Cinema · Story</span>
      </footer>

    </main>
  );
}