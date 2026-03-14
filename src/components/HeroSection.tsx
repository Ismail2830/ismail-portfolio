"use client";
import { motion } from "framer-motion";
import Link from "next/link";

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
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl"
      >
        <p className="font-mono text-accent text-sm mb-4 tracking-widest uppercase">
          Hello World — I&apos;m
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          <span className="gradient-text">Ismail</span>
          <br />
          <span className="text-white">Ait Rehail</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-mono mb-8">
          Full-Stack Developer
        </p>
        <p className="text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Building modern, scalable web applications from Rabat, Morocco. Passionate about clean code, great UX, and turning ideas into products.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#projects"
            className="px-6 py-3 bg-accent text-white font-mono rounded-lg hover:bg-accent/80 transition-all duration-200 shadow-lg shadow-accent/30"
          >
            View Projects →
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-accent/40 text-accent font-mono rounded-lg hover:border-accent transition-all duration-200"
          >
            Contact Me
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="font-mono text-xs tracking-widest">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent" />
      </motion.div>
    </section>
  );
}
