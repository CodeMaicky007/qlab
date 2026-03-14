"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";

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
  { name: "Kling 3", category: "Generación de video" },
  { name: "ElevenLabs", category: "Síntesis de voz" },
  { name: "Sync.so", category: "Lip sync" },
  { name: "DaVinci Resolve", category: "Edición & color" },
  { name: "Higgsfield Cinema", category: "IA cinematográfica" },
  { name: "Claude AI", category: "Narrativa & código" },
  { name: "Framer", category: "Diseño web" },
  { name: "Next.js", category: "Desarrollo web" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const gap = 10;
    const curve = 15;

    function getWidth(gap: number) {
      return 1 + gap / 100;
    }

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
          uniforms: {
            tex: { value: texture },
            curve: { value: curve },
          },
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
    <main className="font-[family-name:var(--font-dm-sans)]" style={{ minHeight: "200vh" }}>

      {/* Nav */}
      <nav className="flex justify-between items-center px-10 py-7 border-b border-[#1A1A18]/10">
        <span className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-widest">
          QLab
        </span>
        <ul className="flex gap-8 text-[13px] text-[#6B6B67] tracking-wide list-none">
          <li><Link href="/work" className="hover:text-[#1A1A18] transition-colors text-[#6B6B67] no-underline">Work</Link></li>
          <li><Link href="/about" className="hover:text-[#1A1A18] transition-colors text-[#6B6B67] no-underline">About</Link></li>
          <li><Link href="/contact" className="hover:text-[#1A1A18] transition-colors text-[#6B6B67] no-underline">Contact</Link></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-10 pt-16 pb-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-4"
        >
          Visual storytelling · AI Production
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-[family-name:var(--font-cormorant)] text-[80px] font-light leading-[1.0] mb-4"
        >
          Cinematic <em>AI</em> Studio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[13px] text-[#6B6B67] max-w-md leading-relaxed mb-8"
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
            className="text-[12px] tracking-widest uppercase text-[#1A1A18] border border-[#1A1A18]/30 px-8 py-3 rounded-full hover:bg-[#1A1A18] hover:text-white transition-all duration-300 no-underline"
          >
            Ver proyectos
          </Link>
        </motion.div>
      </section>

      {/* Canvas Three.js */}
      <div
        ref={containerRef}
        className="w-full "
        style={{ height: "70vh", overflow: "visible" }}
      />

      {/* Proceso */}
      <section className="px-10 py-20 border-t border-[#1A1A18]/10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-3">Cómo trabajamos</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[42px] font-light leading-[1.1]">
              El <em>proceso</em>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {proceso.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border-t border-[#1A1A18]/10 pt-6"
            >
              <p className="text-[11px] tracking-widest text-[#A8A8A4] mb-4">{step.num}</p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-[24px] font-light mb-3">{step.title}</h3>
              <p className="text-[12px] text-[#6B6B67] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Herramientas */}
      <section className="px-10 py-20 border-t border-[#1A1A18]/10">
        <div className="mb-16">
          <p className="text-[11px] tracking-widest uppercase text-[#A8A8A4] mb-3">Stack tecnológico</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[42px] font-light leading-[1.1]">
            <em>Herramientas</em>
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {herramientas.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="border border-[#1A1A18]/10 rounded-lg px-6 py-5 hover:border-[#1A1A18]/30 transition-colors"
            >
              <p className="text-[14px] font-normal mb-1">{tool.name}</p>
              <p className="text-[11px] text-[#A8A8A4] tracking-wide">{tool.category}</p>
            </motion.div>
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