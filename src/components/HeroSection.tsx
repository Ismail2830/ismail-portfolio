"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(108,99,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* 3D animated core — sits behind the text, full-bleed */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* dark vignette so the headline stays readable over the 3D */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,15,26,0.55)_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl pointer-events-none"
      >
        <p className="font-mono text-accent text-sm mb-4 tracking-widest uppercase">
          Hello World — I&apos;m
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
          <span className="gradient-text">Ismail</span>
          <br />
          <span className="text-white">Ait Rehail</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-mono mb-8">
          Full-Stack Developer
        </p>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Building modern, scalable web applications from Rabat, Morocco. Passionate about clean code, great UX, and turning ideas into products.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap pointer-events-auto">
          <a
            href="#projects"
            className="px-6 py-3 bg-accent text-white font-mono rounded-lg hover:bg-accent/80 transition-all duration-200 shadow-lg shadow-accent/30"
          >
            View Projects →
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-accent/40 text-accent font-mono rounded-lg hover:border-accent transition-all duration-200 backdrop-blur-sm"
          >
            Contact Me
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="font-mono text-xs tracking-widest">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent" />
      </motion.div>
    </section>
  );
}
